#!/usr/bin/python3
"""
   handler for restful api actions for User object
"""

from api.v1.routes import app_views
from flask import jsonify, request, abort
from models import storage
from models.user import User


@app_views.route('/users/', strict_slashes=False)
def get_users():
    """
    retrieves the list of all user objects from storage engine
    """
    users = storage.all(User)
    users_list = []
    for user in users.values():
        users_list.append(user.to_dict())
    return jsonify(users_list)


@app_views.route('/users/', methods=['POST'], strict_slashes=False)
def register_user():
    """
    add new user object to the database
    """
    req = request.get_json()
    if not isinstance(req, dict):
        abort(400, "not a JSON")
    if 'email' not in req:
        abort(400, "email is required")
    if 'username' not in req:
        abort(400, "username is required")
    if 'password_hash' not in req:
        abort(400, "password is required")

    new_user = User(**request.json)
    new_user.save_user()
    return jsonify(new_user.to_dict()), 201


@app_views.route('/users/<user_id>', methods=['GET'], strict_slashes=False)
def get_user(user_id):
    """get specific user with given id"""
    user = storage.get(User, user_id)
    if not user:
        abort(404)
    return jsonify(user.to_dict())
