#!/usr/bin/python3
"""module for serialization and deserialization process"""

import json
import os
from importlib import import_module


class FileStorage:
    """
    filestorage class containing methods for working with files
    """

    __file_path = 'file.json'
    __user_objects = {}
    __project__objects = {}

    def __init__(self):
        """initializes file storage instance"""
        self.User = import_module('models.user').User

    def all_users(self):
        """returns all the stored objects"""
        return self.__user_objects

    def new_user(self, user):
        """stores new user that is not stored previously"""
        user_id = f"{user.__class__.__name__}.{user.id}"
        self.__user_objects[user_id] = user

    def save_user(self):
        """encodes the stored objects and saves it json file"""
        user_dict = {}
        for key, value in self.__user_objects.items():
            user_dict[key] = value.to_dict()
        with open(self.__file_path, 'w', encoding='utf-8') as file:
            json.dump(user_dict, file)

    def reload_user(self):
        """decodes json file to usable python objects"""
        if os.path.isfile(self.__file_path):
            with open(self.__file_path, 'r', encoding='utf-8') as file:
                file_content = file.read()
            if file_content:
                user_dict = json.loads(file_content)
                user_objs = {}
                for key, value in user_dict.items():
                    user_objs[key] = self.User(**value)
                self.__user_objects = user_objs
