#!/usr/bin/python3
""" Starts a Flash Web Application """
from models import storage
from flask import Flask, render_template
from api.v1.views import app_views
from flask_cors import CORS
import os

app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})


@app.teardown_appcontext
def close_db(error):
    """ Close Storage """
    storage.close()


@app.route('/100-hbnb', strict_slashes=False)
def hbnb():
    """ HBNB is alive! """
    return render_template('100-hbnb.html')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
