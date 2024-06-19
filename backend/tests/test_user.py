import unittest
from unittest.mock import patch
from models.user import User
from models import storage  # noqa
from services.user_service import UserService  # noqa

# mike = User()
# mike.save_user()
# UserService.create_user()
# print(mike)
# mike.save_user()
# print("------ ------ -----")
# print("reloading user from a file")
# user_infile = storage.reload()
# for key, value in user_infile.items():
#     print(key, value)


class TestUser(unittest.TestCase):
    def setUp(self):
        self.user = User(name="testmike",
                         email="testemail@gmail.com")

    @patch('models.storage.save')
    def test_save_user(self, mock_save_user):
        self.user.save_user()
        mock_save_user.assert_called_once()

    def test_to_dict(self):
        user_dict = self.user.to_dict()
        self.assertIsInstance(user_dict, dict)
        self.assertTrue('id' in user_dict)


if __name__ == '__main__':
    unittest.main()
