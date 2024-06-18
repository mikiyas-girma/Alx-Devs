#!/usr/bin/python3
"""user service module for user related operations"""

from models.user import User


class UserService:
    """ user service class containing methods for user operations
    """

    @classmethod
    def create_user(data):
        """creates a new user"""
        new_user = User(
            id='serid12',
            name='mikeser',
            username='sirusername',
            skills={
                'frontend': ['React', 'Tailwindcss'],
                'backend': ['Flask', 'Django']
            }
        )
        User.save_user(new_user)
        return new_user
