import unittest
from signUpApi import SignUpApi


class TestSignUpApi(unittest.TestCase):
    def setUp(self):
        super(TestSignUpApi, self).setUp()

        # Create an instance of the api
        self._Api = SignUpApi()

        self._RegisterData1 = {
            "firstName" : "Gosho",
            "lastName" : "Qnkov",
            "age" : 23,
            "city" : "Burgas",
            "phone" : "+359894444321",
            "email" : "qnko@gmail.bg",
            "username" : "QnkoPicha",
            "password" : "Qnko"
        }

        self._RegisterData2 = {
            "firstName": "Petur",
            "lastName": "Georgiev",
            "age": 39,
            "city": "Burgas",
            "phone": "+359894444322",
            "email": "qnko@abv.com",
            "username": "PeshoHaka",
            "password": "simpvamzapesho"
        }

        self._RegisterData3 = {
            "firstName": "Fiki",
            "lastName": "Petrov",
            "age": 26,
            "city": "Burgas",
            "phone": "+359894444323",
            "email": "pesho@pesho.bg",
            "username": "FikiPetrov",
            "password": "simpforpesho"
        }

    """
    Checks if the api returns 200 success code
    when given truthful register information.
    Tests should pass if the return code is 200.
    """

    def test_register1(self):
        self.assertEqual(self._Api.postRequest(self._RegisterData1).status_code, 200)

    def test_register2(self):
        self.assertEqual(self._Api.postRequest(self._RegisterData2).status_code, 200)

    def test_register3(self):
        self.assertEqual(self._Api.postRequest(self._RegisterData3).status_code, 200)

    ##########################################################################################################

    """
    Tests which check what code does the api return do not make sense
    since the api is made to not return anything
    if any field of the information, given to the api, is not present or incorrect.
    Therefore there will not be done any tests on this behaviour of the api.
    More information will be presented in the documentation.
    """

    ##########################################################################################################

    """
    Checks whether the api returns 'register-failure'
    which means there is a user with those credentials.
    Tests should pass if the credentials are already in the database
    """
    def test_register4(self):
        self.assertEqual(self._Api.postRequest(self._RegisterData1).json()['type'], "register-failure")

    def test_register5(self):
        self.assertEqual(self._Api.postRequest(self._RegisterData2).json()['type'], "register-failure")

    def test_register6(self):
        self.assertEqual(self._Api.postRequest(self._RegisterData3).json()['type'], "register-failure")

    ##########################################################################################################

    """
    Tests which check whether the api can successfully register credentials in the database can not be automated
    since you will need new credentials everytime you register them,
    making it meaningless for the tests to be automated.
    Therefore those tests will be manually made and presented in the documentation for the project.
    """

    ##########################################################################################################

if __name__ == "__main__":
    unittest.main()