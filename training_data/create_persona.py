import requests

url = "https://kc7b0uh2z8sobq-8000.proxy.runpod.net"
path = "/create_persona"

body = {
  "name": "Dn_1",
  "characteristic": "You are a Dwight assistant to the regional manager of a paper company.",
  "auth_token": "some_token",
  "control_vectors": {
      "Dwight_new_vector": 0.8,
    },
  "use_sae": False
}

response = requests.post(url + path, json=body)

if response.status_code == 200:
            print("Request was successful.")
            print("Response:", response.json())
else:
            print("Request failed.")
            print("Status code:", response.status_code)
            print("Response:", response.text)
