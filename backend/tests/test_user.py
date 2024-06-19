import unittest
from unittest.mock import patch
from models.user import User
from models import storage  # noqa
from services.user_service import UserService

# mike = User()
# mike.save_user()
UserService.create_user()
# print(mike)
# mike.save_user()
# print("------ ------ -----")
# print("reloading user from a file")
# user_infile = storage.reload()
# for key, value in user_infile.items():
#     print(key, value)


class TestUser(unittest.TestCase):
    def setUp(self):
        self.user = User()

    def test_user_attributes(self):
        self.assertEqual(self.user.name, 'User1')
        self.assertEqual(self.user.username, 'username1')
        self.assertEqual(self.user.email, 'user1@gmail.com')
        self.assertEqual(self.user.password_hash, '12345')
        self.assertEqual(self.user.skills, 'skills in json')
        self.assertEqual(self.user.team_count, 10)

    @patch('models.storage.save')
    def test_save_user(self, mock_save_user):
        self.user.save_user()
        mock_save_user.assert_called_once()

    def test_to_dict(self):
        user_dict = self.user.to_dict()
        self.assertIsInstance(user_dict, dict)
        self.assertEqual(user_dict['name'], 'User1')
        self.assertEqual(user_dict['username'], 'username1')
        self.assertEqual(user_dict['email'], 'user1@gmail.com')
        self.assertEqual(user_dict['password_hash'], '12345')
        self.assertEqual(user_dict['skills'], 'skills in json')
        self.assertEqual(user_dict['team_count'], 10)
        self.assertTrue('id' in user_dict)


if __name__ == '__main__':
    unittest.main()
