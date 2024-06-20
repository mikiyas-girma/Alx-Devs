#!/usr/bin/python3
"""
   handler for restful api actions for User object
"""

from api.v1.routes import app_views
from flask import jsonify, request, abort, make_response
from flask_jwt_extended import (
                    create_access_token, jwt_required, get_csrf_token,
                    get_jwt_identity, set_access_cookies, unset_jwt_cookies)
from models import storage
from models.user import User
from datetime import timedelta


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
    if 'password' not in req:
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


@app_views.route('/login', methods=['POST'], strict_slashes=False)
def login():
    """
       authenticates the user to access protected page
    """
    print("login api")
    req = request.get_json()
    if not isinstance(req, dict):
        abort(400, "Not a json")
    if 'username' not in req:
        abort(400, "username is missing")
    if 'password' not in req:
        abort(400, "missing password")

    user = storage.get(User, username=req['username'])
    if not user or not user.check_password(req['password']):
        return jsonify({"msg": "invalid username or password"}), 401

    access_token = create_access_token(identity=user.id,
                                       expires_delta=timedelta(days=1))
    response = make_response(jsonify({"msg": "Login successfull"}), 200)
    set_access_cookies(response, access_token)

    response.set_cookie('csrf_access_token', get_csrf_token(access_token),
                        httponly=False, secure=True, samesite='Lax')
    return response


@app_views.route('/logout', methods=['POST'], strict_slashes=False)
@jwt_required()
def logout():
    """ log out the user and delete the access token cookie
    """
    response = make_response(jsonify({"msg": "Logout successful"}), 200)
    unset_jwt_cookies(response)

    return response


@app_views.route('/projects/', methods=['GET'], strict_slashes=False)
@jwt_required()
def create_project():
    """
        create a project where users are able to join
    """
    current_user_id = get_jwt_identity()
    user = storage.get(User, id=current_user_id)
    if not user:
        return jsonify({"msg": "You are not authorized to access this"})
    return jsonify({"msg": "project created successfully"}), 200
