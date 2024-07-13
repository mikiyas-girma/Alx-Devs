#!/usr/bin/python3
"""
    module for api handlers related with user_projects model
"""

from api.v1.routes import app_views
from flask import jsonify, request, abort, make_response  # noqa
from models import storage
from flask_jwt_extended import get_jwt_identity, jwt_required
from models.user import User
from models.project import Project
from models.userproject import UserProject


@app_views.route('/projects/<project_id>/join/', methods=['POST'],
                 strict_slashes=False)
@jwt_required()
def ask_tojoin(project_id):
    """
        method to facilitate for a user to request a project team
    """
    user_id = get_jwt_identity()
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"msg": "Login before requesting to join"}), 401

    project = storage.get(Project, id=project_id)
    if not project:
        return jsonify({"msg": "project not found"}), 404
    if user_id == project.creator_id:
        return jsonify({"msg": "not allowed to request to a project you own"}), 401  # noqa

    existing_application = storage.filter_one(UserProject, user_id=user_id,
                                              project_id=project_id)
    if existing_application:
        return jsonify({"msg": "You already applied to this project"}), 401

    data = request.get_json()
    if not isinstance(data, dict):
        abort(400, "Not a json")
    if 'role' not in data:
        abort(400, 'role is required')

    user_project = UserProject(user_id=user.id,
                               project_id=project.id,
                               role=data['role']
                               )
    user_project.save_user_project()

    return jsonify({"msg": "request to join submitted"}), 201


@app_views.route('/projects/<project_id>/leave/', methods=['POST'],
                 strict_slashes=False)
@jwt_required()
def leave_project(project_id):
    """
        to allow a user to cancel there pending request or leave a project
    """
    user_id = get_jwt_identity()
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"msg": "login first to get access"}), 401

    existing_application = storage.filter_one(UserProject, user_id=user_id,
                                              project_id=project_id)
    if not existing_application:
        return jsonify({"msg": "You are not part of this yet"}), 401

    if existing_application.role == 'Owner':
        return jsonify({"msg": "Please Give ownership to another person first"}), 403  # noqa

    if existing_application.status == 'approved':
        user.team_count -= 1

    storage.delete(existing_application)
    storage.save()

    return jsonify({"msg": "You have leaved the project successfully"}), 200


@app_views.route('/user_projects/<user_project_id>/approve',
                 methods=['PATCH'], strict_slashes=False)
@jwt_required()
def approve_request(user_project_id):
    """to allow project owner to (approve) request and add user
        requested to a team
    """
    user_id = get_jwt_identity()
    user_project = storage.filter_one(UserProject, id=user_project_id)

    if not user_project:
        return jsonify({"msg": "Request not found"}), 404

    approver = storage.filter_one(UserProject, user_id=user_id,
                                  project_id=user_project.project_id)

    if not approver.role == "Owner":
        return jsonify({"msg": "Permission denied"}), 403
    if user_project.status == 'approved':
        return ({"msg": "Already approved"}), 200

    user_project.status = 'approved'
    user = storage.filter_one(User, id=user_project.user_id)
    user.team_count += 1

    storage.save()

    return jsonify({"msg": "Successfully approved the request"}), 200


@app_views.route('/user_projects/<user_project_id>/reject',
                 methods=['DELETE'], strict_slashes=False)
@jwt_required()
def reject_request(user_project_id):
    """to allow project owner to (reject) request and add user
        requested to a team
    """
    user_id = get_jwt_identity()
    user_project = storage.filter_one(UserProject, id=user_project_id)

    if not user_project:
        return jsonify({"msg": "Request not found"}), 404

    approver = storage.filter_one(UserProject, user_id=user_id,
                                  project_id=user_project.project_id)

    if not approver.role == "Owner":
        return jsonify({"msg": "Permission denied"}), 403
    if user_project.role == 'Owner':
        return ({"msg": "You can't remove Owner"}), 401

    user = storage.filter_one(User, id=user_project.user_id)
    storage.delete(user_project)
    user.team_count -= 1

    storage.save()

    return jsonify({"msg": "Successfully removed the user"}), 200


@app_views.route('/user_projects/<project_id>/team',
                 methods=['GET'], strict_slashes=False)
@jwt_required()
def get_team(project_id):
    """to get the team of a project"""
    user_id = get_jwt_identity()
    user = storage.get(User, id=user_id)
    if not user:
        return jsonify({"msg": "login first to get access"}), 401

    project = storage.get(Project, id=project_id)
    if not project:
        return jsonify({"msg": "project not found"}), 404

    # if user_id != project.creator_id:
    #     return jsonify({"msg": "Permission denied"}), 403

    team = storage.filter_all(UserProject, project_id=project_id)
    team = [user_project.to_dict() for user_project in team]

    user_ids = [member['user_id'] for member in team]

    team_members = {}
    for user_id in user_ids:
        user = storage.get(User, id=user_id)
        team_members[user_id] = user.to_dict()

    return jsonify({"team": team, "team_members": team_members}), 200
