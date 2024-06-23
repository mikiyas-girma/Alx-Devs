#!/usr/bin/python3
"""
    api request handler related with project objects
"""

from api.v1.routes import app_views
from flask import jsonify, request, abort, make_response  # noqa
from models import storage
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.user import User
from models.project import Project


@app_views.route('/projects/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_projects():
    """
        get a list of already created projects
    """
    current_user_id = get_jwt_identity()
    user = storage.get(User, id=current_user_id)
    if not user:
        return jsonify({"msg": "You are not authorized to access this"})
    projects = storage.all(Project)
    projects_list = []

    for project in projects.values():
        projects_list.append(project.to_dict())

    return jsonify(projects_list)


@app_views.route('/projects/', methods=['POST'], strict_slashes=False)
@jwt_required()
def create_project():
    """
        create a project where users are can be able to join
    """
    data = request.get_json()
    if not isinstance(data, dict):
        abort(400, 'Not a json')
    if 'title' not in data:
        abort(400, 'project title is required')
    if 'description' not in data:
        abort(400, "description is required")

    current_user_id = get_jwt_identity()
    user = storage.get(User, id=current_user_id)
    if not user:
        return jsonify({"msg": "You are not authorized to access"})

    new_project = Project(creator_id=current_user_id, **request.json)
    new_project.save_project()

    return jsonify(new_project.to_dict(), {"user_id": current_user_id}), 201
