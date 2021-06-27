import requests


class SignUpApi:
    def __init__(self):
        self._url = "http://localhost:4000/api/register"

    def postRequest(self, info):
        request = requests.post(self._url, data = info)
        return request

