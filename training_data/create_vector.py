import requests

url = "https://kc7b0uh2z8sobq-8000.proxy.runpod.net"
path = "/create_control_vector_job"

body = {
  "name": "Michael_new_new_vector",
  "characteristic": "You are Michael the regional manager of a paper company.",
  "auth_token": "some_token",
  "custom_dataset": [],
  "use_sae": False
}

with open('Michael-sales.txt', 'r') as file:
    ds_lines = file.readlines()

for line in range(len(ds_lines)):
    if ds_lines[line].startswith('POSITIVE:'):
        body['custom_dataset'].append({
            'positive': ds_lines[line][len('POSITIVE:'):].strip(),
            'negative': ds_lines[line+1][len('NEGATIVE:'):].strip()
        })

response = requests.post(url + path, json=body)

if response.status_code == 200:
            print("Request was successful.")
            print("Request: ", body)
            print("Response:", response.json())
else:
            print("Request failed.")
            print("Status code:", response.status_code)
            print("Response:", response.text)
