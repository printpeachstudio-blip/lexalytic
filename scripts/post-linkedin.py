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

# Check for matching PNG image
dt = datetime.date.today()
month_abbr = calendar.month_abbr[dt.month].lower()
day = dt.strftime('%d')
image_file = f'data/post-images/post-{month_abbr}{day}.png'

image_urn = None

if os.path.exists(image_file):
    print(f'Found image: {image_file}')
    try:
        # Step 1: Initialize image upload
        init_payload = json.dumps({
            "initializeUploadRequest": {
                "owner": f"urn:li:person:{member_id}"
            }
        }).encode('utf-8')

        req = urllib.request.Request(
            'https://api.linkedin.com/rest/images?action=initializeUpload',
            data=init_payload
        )
        req.add_header('Authorization', f'Bearer {token}')
        req.add_header('Content-Type', 'application/json')
        req.add_header('LinkedIn-Version', '202401')
        req.add_header('X-Restli-Protocol-Version', '2.0.0')

        resp = urllib.request.urlopen(req)
        init_data = json.loads(resp.read())
        upload_url = init_data['value']['uploadUrl']
        image_urn = init_data['value']['image']
        print(f'Upload URL received, URN: {image_urn}')

        # Step 2: Upload PNG
        with open(image_file, 'rb') as f:
            img_data = f.read()

        upload_req = urllib.request.Request(upload_url, data=img_data, method='PUT')
        upload_req.add_header('Content-Type', 'image/png')
        urllib.request.urlopen(upload_req)
        print('Image uploaded successfully')

    except Exception as e:
        print(f'Image upload failed: {e} - posting text only')
        image_urn = None
else:
    print(f'No image found at {image_file} - posting text only')

# Build payload
if image_urn:
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
                    "media": image_urn,
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
    result = json.loads(resp.read())
    print(f'Posted successfully: {result}')
except urllib.error.HTTPError as e:
    error_body = e.read().decode()
    print(f'Error {e.code}: {error_body}')
    if 'DUPLICATE_POST' in error_body:
        print('Duplicate - skipping')
        exit(0)
    exit(1)
