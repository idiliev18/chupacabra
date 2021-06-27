from loginapi import LoginApi
import unittest
import requests


class TestLoginApi(unittest.TestCase):
    def setUp(self):
        super(TestLoginApi, self).setUp()
        self._LoginData1 = {
            "email": "qnko@qnko.cb",
            "password": "qnko"
        }
        self._Api = LoginApi()

    def test_login1(self):
        self.assertEqual(self._Api.postRequest(self._LoginData1).status_code, 200)


if __name__ == "__main__":
    unittest.main()
