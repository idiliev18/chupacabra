import requests

class Api:
    def __init__(self):
        self._ulrWithoutRoute = "http://localhost:3000/api/login"
        self._route = None
        self._url = None

    @property
    def url(self):
        return self._url

    @url.setter
    def url(self, route):
        self._url = self._ulrWithoutRoute + route


if __name__ == "__main__":
    Api = Api()
