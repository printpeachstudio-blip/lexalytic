import os, json, urllib.request, datetime

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

payload = {
    "author": f"urn:li:person:{member_id}",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
        "com.linkedin.ugc.ShareContent": {
            "shareCommentary": {
                "text": post_text
            },
            "shareMediaCategory": "NONE"
        }
    },
    "visibility": {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
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
