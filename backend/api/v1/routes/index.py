#!/usr/bin/python3
"""
   api view for several blueprints
"""

from models import storage
from models.user import User
from flask import jsonify
from api.v1.routes import app_views


@app_views.route('/status')
def views_status():
    """returns the status of api views"""
    return jsonify({"status": "OK"})
