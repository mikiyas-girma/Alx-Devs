#!/usr/bin/python3
"""
User model
"""
import uuid


class User:
    """ user class containing several methods for user functionality
    """

    def __init__(self, *args, **kwargs):
        """Instantiates new user """
        from models import storage
        if len(kwargs) > 0:
            for key, value in kwargs.items():
                self.__setattr__(key, value)
        else:
            self.id = str(uuid.uuid4())
            self.name = 'User1'
            self.username = 'username1'
            self.email = 'user1@gmail.com'
            self.password = '12345'
            self.skills = 'skills in json'
            self.team_count = 10
            storage.new_user(self)

    def save_user(self):
        """stores the user to storage engine"""
        from models import storage
        storage.save_user()

    def __str__(self):
        """prints user readable string representation of User model"""
        return f"[{self.__class__.__name__}] ({self.id}) {self.__dict__}"

    def to_dict(self):
        """return the dictionary representation of the user class"""
        dict = {}
        dict = self.__dict__.copy()
        return dict
