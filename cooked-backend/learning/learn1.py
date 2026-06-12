import requests

response = requests.get("https://jsonplaceholder.typicode.com/users/1")

print(type(response.text))
print(type(response.json()))