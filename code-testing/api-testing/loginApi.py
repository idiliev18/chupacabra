import requests


class LoginApi:
    def __init__(self):
        self._url = "http://localhost:4000/api/login"

    def postRequest(self, info):
        request = requests.post(self._url, data = info)
        return request

