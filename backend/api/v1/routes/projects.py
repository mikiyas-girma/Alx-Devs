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
from models.userproject import UserProject


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


@app_views.route('/projects/<project_id>/', methods=['GET'],
                 strict_slashes=False)
@jwt_required()
def get_project(project_id):
    """
        get a project with specified id
    """
    current_user_id = get_jwt_identity()
    user = storage.get(User, id=current_user_id)
    if not user:
        return jsonify({"msg": "You are not authorized to access this"})
    project = storage.get(Project, id=project_id)
    if not project:
        return jsonify({"msg": "project not found"}), 404

    return jsonify(project.to_dict())


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
    user.team_count += 1
    storage.save()

    user_project = UserProject(user_id=current_user_id,
                               project_id=new_project.id,
                               role='Owner',
                               status='approved')
    user_project.save_user_project()

    return jsonify({"msg": "project created successfully",
                    "project": new_project.to_dict()}), 201


@app_views.route('/projects/<project_id>/', methods=['DELETE'],
                 strict_slashes=False)
@jwt_required()
def remove_project(project_id):
    """ allows to remove a project with specified id """

    user_id = get_jwt_identity()
    project = storage.get(Project, id=project_id)

    if not user_id:
        return jsonify({"msg": "Login First before attempting"}), 401
    if not project:
        return jsonify({"msg": "project not found"}), 404
    if not user_id == project.creator_id:
        return jsonify({"msg": "Permission denied"}), 403

    user_projects = storage.filter_all(UserProject, project_id=project_id,
                                       status='approved')
    for user_project in user_projects:
        user = user_project.user
        user.team_count -= 1
        storage.new(user)

    storage.delete(project)
    storage.save()

    return jsonify({"msg": "project deleted successfully"}), 200
