#!/usr/bin/python3
"""
   handler for restful api actions for User object
"""

from api.v1.routes import app_views
from flask import jsonify, request, abort, make_response
from flask_jwt_extended import (
                    create_access_token, jwt_required, get_csrf_token,
                    get_jwt_identity, unset_jwt_cookies)
from models import storage
from models.user import User
from datetime import timedelta, datetime
import os
from werkzeug.utils import secure_filename
from flask import current_app


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
        return jsonify({"msg": "Not a json"}), 400
    if 'email' not in req:
        return jsonify({"msg": "email is required"}), 400
    if 'username' not in req:
        return jsonify({"msg": "username is required"}), 400
    if 'password' not in req:
        return jsonify({"msg": "password is required"}), 400

    if storage.get(User, username=req['username']):
        return jsonify({"msg": "user with this username already exists"}), 400
    if User.get_by_email(User, req['email']):
        return jsonify({"msg": "user with this email already exists"}), 400

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


@app_views.route('/users/<user_id>', methods=['PATCH'], strict_slashes=False)
@jwt_required()
def update_user(user_id):
    """update user with given id"""

    user_id = get_jwt_identity()

    user = storage.get(User, id=user_id)
    if not user:
        abort(404)
    req = request.get_json()
    if not isinstance(req, dict):
        return jsonify({"msg": "Not a json"}), 400

    if 'username' in req:
        existing_user = storage.get(User, username=req['username'])
        if existing_user and existing_user.id != user.id:
            return jsonify({"msg": "user with this username already exists"}), 400

    if 'email' in req:
        existing_user = User.get_by_email(User, req['email'])
        if existing_user and existing_user.id != user.id:
            return jsonify({"msg": "user with this email already exists"}), 400

    for key, value in req.items():
        if key not in ['id']:
            setattr(user, key, value)
    user.save_user()
    return jsonify(user.to_dict())


@app_views.route('/upload_image', methods=['POST'], strict_slashes=False)
@jwt_required()
def upload_image():
    """upload image for user"""
    user_id = get_jwt_identity()
    user = storage.get(User, id=user_id)
    if not user:
        abort(404)
    if 'image' not in request.files:
        return jsonify({"msg": "No image file"}), 400
    image = request.files['image']
    if image.filename == '':
        return jsonify({"msg": "No selected file"}), 400

    filename = secure_filename(image.filename)
    unique_filename = f"{user.id}_{filename}"

    root = os.path.dirname(os.path.dirname(os.path.dirname(current_app.root_path)))

    public_dir = os.path.join(root, 'frontend', 'public')
    if not os.path.exists(public_dir):
        os.makedirs(public_dir)
    image_path = os.path.join(public_dir, unique_filename)

    image.save(image_path)

    user_image_url = f"/public/{unique_filename}"
    user.image = user_image_url
    user.save_user()

    return jsonify({"img_url": user_image_url, "user": user.to_dict()})


@app_views.route('/login', methods=['POST', 'GET'], strict_slashes=False)
def login():
    """
       authenticates the user to access protected page
    """

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
                                       expires_delta=timedelta(hours=4))
    response = make_response(jsonify({"msg": "Login successfull",
                                      "user": user.to_dict()}), 200)

    cookie_expiration = timedelta(hours=4)
    expires_at = datetime.now() + cookie_expiration

    # set_access_cookies(response, access_token)
    response.set_cookie('access_token_cookie', access_token, httponly=True,
                        secure=True, samesite='None',
                        max_age=cookie_expiration.total_seconds(),
                        expires=expires_at)

    response.set_cookie('csrf_access_token', get_csrf_token(access_token),
                        httponly=False, secure=True, samesite='None',
                        max_age=cookie_expiration.total_seconds(),
                        expires=expires_at)
    # ret_user = make_response(jsonify(user.to_dict()), 200)
    # ret_user.headers['access_token'] = access_token
    return response


@app_views.route('/logout', methods=['POST'], strict_slashes=False)
@jwt_required()
def logout():
    """ log out the user and delete the access token cookie
    """
    response = make_response(jsonify({"msg": "Logout successful"}), 200)
    unset_jwt_cookies(response)

    return response
