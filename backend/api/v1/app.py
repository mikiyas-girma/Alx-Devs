#!/usr/bin/pytho3
""" restful service with flask application """

from os import getenv
from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager
from models import storage
from api.v1.routes import app_views
from flask_cors import CORS
from flask_mail import Mail, Message

app = Flask(__name__)
CORS(app, supports_credentials=True,
     resources={r"/api/v1/*": {"origins": ["http://localhost:5173", "https://mikiyas-girma.github.io",
                                           "http://localhost:5000", "http://127.0.0.1:5000"]}})


app.register_blueprint(app_views)
app.url_map.strict_slashes = False
app.config['JWT_SECRET_KEY'] = getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.config['JWT_ACCESS_COOKIE_PATH'] = '/'
app.config['JWT_COOKIE_CSRF_PROTECT'] = True
app.config['JWT_COOKIE_SECURE'] = True

app.config['MAIL_SERVER'] = 'smtp.postmarkapp.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = getenv('POSTMARK_API_TOKEN')
app.config['MAIL_PASSWORD'] = getenv('POSTMARK_API_TOKEN')
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_DEFAULT_SENDER'] = getenv('MAIL_USERNAME')

mail = Mail(app)

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


@app.route('/api/v1/send-email', methods=['POST'],
           strict_slashes=False)
def send_email():
    """send email to the user"""
    req = request.get_json()
    if not isinstance(req, dict):
        return jsonify({"msg": "Not a json"}), 400
    if 'email' not in req:
        return jsonify({"msg": "email is required"}), 400
    if 'subject' not in req:
        return jsonify({"msg": "subject is required"}), 400
    if 'body' not in req:
        return jsonify({"msg": "body is required"}), 400

    msg = Message(req['subject'], sender=getenv('MAIL_USERNAME'),
                  recipients=["mikiyasgirmaet@gmail.com"])
    msg.body = req['body']
    mail.send(msg)
    return jsonify({"msg": "email sent"}), 200


if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
