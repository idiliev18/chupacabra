import requests

class SignUpApi:
    def __init__(self):
        self._url = "http://localhost:4000/api/register"
        self._signUpData = {
            "firstName" : "Gosho",
            "lastName" : "Qnkov",
            "age" : 23,
            "city" : "Burgas",
            "phone" : "+359894448690",
            "email" : "qnko@qnko.cb1",
            "username" : "Qnko_123"
        }

    def _postRequest(self, info):
        request = requests.post(self._url, data = info )
        return request

    def Test(self):
        print(self._postRequest(self._signUpData))


