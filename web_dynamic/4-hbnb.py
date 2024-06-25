# web_dynamic/4-hbnb.py
from flask import Flask, render_template
from models import storage
from api.v1.views import app_views
from flask_cors import CORS
import os

app = Flask(__name__)
app.register_blueprint(app_views)
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})

@app.teardown_appcontext
def teardown_db(exception):
    """Close storage session"""
    storage.close()

@app.route('/4-hbnb', strict_slashes=False)
def hbnb():
    """Render the main HBNB page"""
    return render_template('4-hbnb.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
