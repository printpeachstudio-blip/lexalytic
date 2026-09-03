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

LI_VERSION = '202508'

def li_headers(extra={}):
    h = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json',
        'LinkedIn-Version': LI_VERSION,
        'X-Restli-Protocol-Version': '2.0.0',
    }
    h.update(extra)
    return h

image_urn = None

if os.path.exists(image_file):
    print(f'Found image: {image_file}')
    try:
        # Step 1: Initialize upload
        init_data = json.dumps({
            "initializeUploadRequest": {
                "owner": f"urn:li:person:{member_id}"
            }
        }).encode('utf-8')

        req = urllib.request.Request(
            'https://api.linkedin.com/rest/images?action=initializeUpload',
            data=init_data
        )
        for k, v in li_headers().items():
            req.add_header(k, v)

        resp = urllib.request.urlopen(req)
        resp_data = json.loads(resp.read())
        upload_url = resp_data['value']['uploadUrl']
        image_urn = resp_data['value']['image']
        print(f'Got upload URL. Image URN: {image_urn}')

        # Step 2: Upload binary - NO LinkedIn-Version header on this request
        with open(image_file, 'rb') as f:
            img_bytes = f.read()

        upload_req = urllib.request.Request(upload_url, data=img_bytes, method='PUT')
        upload_req.add_header('Content-Type', 'image/png')
        urllib.request.urlopen(upload_req)
        print('Image uploaded successfully')

    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f'Image upload failed {e.code}: {body} - posting text only')
        image_urn = None
    except Exception as e:
        print(f'Image error: {e} - posting text only')
        image_urn = None
else:
    print(f'No image at {image_file} - posting text only')

# Build post using newer /rest/posts endpoint
if image_urn:
    payload = {
        "author": f"urn:li:person:{member_id}",
        "commentary": post_text,
        "visibility": "PUBLIC",
        "distribution": {
            "feedDistribution": "MAIN_FEED",
            "targetEntities": [],
            "thirdPartyDistributionChannels": []
        },
        "content": {
            "media": {
                "title": "Lexalytic",
                "id": image_urn
            }
        },
        "lifecycleState": "PUBLISHED",
        "isReshareDisabledByAuthor": False
    }
    endpoint = 'https://api.linkedin.com/rest/posts'
else:
    # Fall back to ugcPosts for text-only (known working)
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
    endpoint = 'https://api.linkedin.com/v2/ugcPosts'

data = json.dumps(payload).encode('utf-8')
req = urllib.request.Request(endpoint, data=data)
for k, v in li_headers().items():
    req.add_header(k, v)

try:
    resp = urllib.request.urlopen(req)
    body = resp.read()
    result = json.loads(body) if body else {}
    print(f'Posted successfully to {endpoint}')
except urllib.error.HTTPError as e:
    error_body = e.read().decode()
    print(f'Error {e.code}: {error_body}')
    if 'DUPLICATE_POST' in error_body:
        print('Duplicate - skipping')
        exit(0)
    exit(1)
