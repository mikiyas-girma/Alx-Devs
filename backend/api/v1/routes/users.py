#!/usr/bin/python3
"""
   handler for restful api actions for User object
"""

from api.v1.routes import app_views
from flask import jsonify
from models import storage
from models.user import User


@app_views.route('/users/')
def get_users():
    """
    retrieves the list of all user objects from storage engine
    """
    users = storage.all(User)
    print("usrs : ", users)
    users_list = []
    for user in users.values():
        users_list.append(user.to_dict())
    print("usrs list: ", users_list)
    return jsonify(users_list)
