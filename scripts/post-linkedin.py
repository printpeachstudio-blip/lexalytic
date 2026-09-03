import os, json, urllib.request, datetime, calendar

token = os.environ['LINKEDIN_ACCESS_TOKEN']
member_id = os.environ['LINKEDIN_MEMBER_ID']
today = datetime.date.today().isoformat()

with open('data/linkedin-posts.txt', 'r') as f:
    content = f.read()

posts = {}
current_date = None
current_lines = []

for line in content.split('\n'):
    stripped = line.strip()
    if stripped.startswith('#'):
        continue
    if len(stripped) == 10 and stripped[4] == '-' and stripped[7] == '-':
        if current_date and current_lines:
            posts[current_date] = '\n'.join(current_lines).strip()
        current_date = stripped
        current_lines = []
    else:
        if current_date:
            current_lines.append(line)

if current_date and current_lines:
    posts[current_date] = '\n'.join(current_lines).strip()

post_text = posts.get(today)

if not post_text:
    print(f'No post scheduled for {today}')
    exit(0)

print(f'Posting for {today}:')
print(post_text[:100] + '...')

dt = datetime.date.today()
month_abbr = calendar.month_abbr[dt.month].lower()
day = dt.strftime('%d')
image_file = f'data/post-images/post-{month_abbr}{day}.png'

image_asset_urn = None

if os.path.exists(image_file):
    print(f'Found image: {image_file}')
    try:
        # Use legacy Assets API - works with w_member_social
        register_payload = json.dumps({
            "registerUploadRequest": {
                "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
                "owner": f"urn:li:person:{member_id}",
                "serviceRelationships": [{
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent"
                }]
            }
        }).encode('utf-8')

        req = urllib.request.Request(
            'https://api.linkedin.com/v2/assets?action=registerUpload',
            data=register_payload
        )
        req.add_header('Authorization', f'Bearer {token}')
        req.add_header('Content-Type', 'application/json')
        req.add_header('X-Restli-Protocol-Version', '2.0.0')

        resp = urllib.request.urlopen(req)
        reg_data = json.loads(resp.read())
        upload_url = reg_data['value']['uploadMechanism']['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest']['uploadUrl']
        image_asset_urn = reg_data['value']['asset']
        print(f'Got upload URL. Asset URN: {image_asset_urn}')

        # Upload binary
        with open(image_file, 'rb') as f:
            img_bytes = f.read()

        upload_req = urllib.request.Request(upload_url, data=img_bytes, method='PUT')
        upload_req.add_header('Authorization', f'Bearer {token}')
        upload_req.add_header('Content-Type', 'image/png')
        urllib.request.urlopen(upload_req)
        print('Image uploaded successfully')

    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f'Image upload failed {e.code}: {body} - posting text only')
        image_asset_urn = None
    except Exception as e:
        print(f'Image error: {e} - posting text only')
        image_asset_urn = None
else:
    print(f'No image at {image_file} - posting text only')

# Build post payload
if image_asset_urn:
    payload = {
        "author": f"urn:li:person:{member_id}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": post_text},
                "shareMediaCategory": "IMAGE",
                "media": [{
                    "status": "READY",
                    "description": {"text": "Lexalytic"},
                    "media": image_asset_urn,
                    "title": {"text": "Lexalytic"}
                }]
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }
else:
    payload = {
        "author": f"urn:li:person:{member_id}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": post_text},
                "shareMediaCategory": "NONE"
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"}
    }

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request('https://api.linkedin.com/v2/ugcPosts', data=data)
req.add_header('Authorization', f'Bearer {token}')
req.add_header('Content-Type', 'application/json')
req.add_header('X-Restli-Protocol-Version', '2.0.0')

try:
    resp = urllib.request.urlopen(req)
    body = resp.read()
    result = json.loads(body) if body else {}
    print(f'Posted successfully: {result}')
except urllib.error.HTTPError as e:
    error_body = e.read().decode()
    print(f'Error {e.code}: {error_body}')
    if 'DUPLICATE_POST' in error_body:
        print('Duplicate - skipping')
        exit(0)
    exit(1)
