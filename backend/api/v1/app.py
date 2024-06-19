#!/usr/bin/pytho3
""" restful service with flask application """

from flask import Flask, jsonify
# from models import storage
from api.v1.routes import app_views

app = Flask(__name__)
app.register_blueprint(app_views)
app.url_map.strict_slashes = False


# @app.teardown_appcontext
# def do_teardown(self):
#     """ close the storage engine """
#     storage.close()


@app.errorhandler(404)
def page_not_found(e):
    """ handler for 404 error """
    msg = {"error": "Not found"}
    return jsonify(msg), 404


@app.route('/api')
def api():
    """status of the api"""
    return jsonify({"status": "working"})


if __name__ == "__main__":
    app.run(debug=True)
