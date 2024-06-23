#!/usr/bin/pytho3
""" restful service with flask application """

from os import getenv
from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from models import storage
from api.v1.routes import app_views

app = Flask(__name__)
app.register_blueprint(app_views)
app.url_map.strict_slashes = False
app.config['JWT_SECRET_KEY'] = getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_COOKIE_SECURE'] = True

jwt = JWTManager(app)


@app.teardown_appcontext
def do_teardown(self):
    """ close the storage engine """
    storage.close()


@app.errorhandler(404)
def page_not_found(e):
    """ handler for 404 error """
    msg = {"error": "Not found"}
    return jsonify(msg), 404


@jwt.unauthorized_loader
def unauthorized_req(callbackdata):
    """used to return when a custom message when a request is made
    with invalid or missing token
    """
    return jsonify({"msg": "Invalid token or token missing"}), 401


@app.route('/api')
def api():
    """status of the api"""
    return jsonify({"status": "working"})


if __name__ == "__main__":
    app.run(debug=True)
