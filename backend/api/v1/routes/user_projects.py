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
        return jsonify({"msg": "Login before requesting to join"})

    project = storage.get(Project, id=project_id)
    if not project:
        return jsonify({"msg": "project not found"})
    if user_id == project.creator_id:
        return jsonify({"msg": "not allowed to request to a project you own"})

    existing_application = storage.exists(UserProject, user_id=user_id,
                                          project_id=project.id)
    if existing_application:
        return jsonify({"msg": "already applied to this project"})

    data = request.get_json()
    if not isinstance(data, dict):
        abort(400, "Not a json")
    if 'role' not in data:
        abort(400, 'role is required')

    # user_project = UserProject(user_id=user.id,
    #                            project_id=project.id,
    #                            role=data['role']
    #                            )
    # user_project.save_user_project()

    return jsonify({"msg": "request to join submitted"})
