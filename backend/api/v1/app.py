#!/usr/bin/pytho3
""" restful service with flask application """

from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/api')
def api():
    """status of the api"""
    return jsonify({"status": "working"})


if __name__ == "__main__":
    app.run(debug=True)
