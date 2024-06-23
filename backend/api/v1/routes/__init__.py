#!/usr/bin/python3
"""
    blueprint for the api
"""

from flask import Blueprint


app_views = Blueprint('app_views', __name__, url_prefix='/api/v1')

from api.v1.routes.index import *  # noqa
from api.v1.routes import users  # noqa
from api.v1.routes import projects  # noqa
from api.v1.routes import user_projects  # noqa
