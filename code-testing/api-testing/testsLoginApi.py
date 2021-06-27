from loginApi import LoginApi
import unittest


class TestLoginApi(unittest.TestCase):
    def setUp(self):
        super(TestLoginApi, self).setUp()

        # Create an instance of the api
        self._Api = LoginApi()

        # False login data
        self._LoginData1 = {
            "email": "qnko@qnko.cb",
            "password": "qnko"
        }
        self._LoginData2 = {
            "email" : "qnko.cb1",
            "password" : "qnko"
        }
        self._LoginData3 = {
            "email": "qnko.bg",
            "password": "qnko"
        }

        # True login data
        self._LoginData4 = {
            "email" : "qnko@cb.qnko",
            "password" : "qnko"
        }
        self._LoginData5 = {
            "email": "qnko@abv.bg",
            "password": "qnko"
        }
        self._LoginData6 = {
            "email": "qnko@abv.bg",
            "password": "qnko"
        }

    """
    Checks if the api returns 200 success code
    when given false login information.
    Tests should pass if the return code is 200
    """
    def test_login1(self):
        self.assertEqual(self._Api.postRequest(self._LoginData1).status_code, 200)

    def test_login2(self):
        self.assertEqual(self._Api.postRequest(self._LoginData2).status_code, 200)

    def test_login3(self):
        self.assertEqual(self._Api.postRequest(self._LoginData3).status_code, 200)

    """
    Checks whether the api returns 'login-failure',
    which means there are no records for that user in the database.
    Tests should pass if the login information is not truthful,
    which it is not.
    """

    def test_login4(self):
        self.assertEqual(self._Api.postRequest(self._LoginData1).json()['type'], 'login-failure')

    def test_login5(self):
        self.assertEqual(self._Api.postRequest(self._LoginData2).json()['type'], 'login-failure')

    def test_login6(self):
        self.assertEqual(self._Api.postRequest(self._LoginData3).json()['type'], 'login-failure')

    """
    Checks whether the api returns 200
    when given true login information.
    Tests should pass if the return code is 200.
    """

    def test_login7(self):
        self.assertEqual(self._Api.postRequest(self._LoginData4).status_code, 200)

    def test_login8(self):
        self.assertEqual(self._Api.postRequest(self._LoginData5).status_code, 200)

    def test_login9(self):
        self.assertEqual(self._Api.postRequest(self._LoginData6).status_code, 200)

    """
    Checks whether the api returns 'login-success'
    which means there is a user with those credentials.
    Tests should pass if the.
    """

    def test_login10(self):
        self.assertEqual(self._Api.postRequest(self._LoginData4).json()['type'], 'login-success')

    def test_login11(self):
        self.assertEqual(self._Api.postRequest(self._LoginData5).json()['type'], 'login-success')

    def test_login12(self):
        self.assertEqual(self._Api.postRequest(self._LoginData6).json()['type'], 'login-success')


if __name__ == "__main__":
    unittest.main()
