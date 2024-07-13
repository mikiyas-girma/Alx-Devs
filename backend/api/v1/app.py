#!/usr/bin/pytho3
""" restful service with flask application """

from os import getenv
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from models import storage
from api.v1.routes import app_views
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True,
     resources={r"/api/v1/*": {"origins": ["http://localhost:5173", "https://mikiyas-girma.github.io",
                                           "http://localhost:5000"]}})


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
    msg = {"error": e.description}
    return jsonify(msg), 404


@app.errorhandler(400)
def bad_request(e):
    """ handler for 400 error """
    msg = {"error": e.description}
    return jsonify(msg), 400


@app.errorhandler(401)
def unauthorized(e):
    """ handler for 401 error """
    msg = {"error": e.description}
    return jsonify(msg), 401


@app.errorhandler(403)
def forbidden(e):
    """ handler for 403 error """
    msg = {"error": e.description}
    return jsonify(msg), 403


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
