# Modified content route from 2-hbnb.py
from flask import Flask, render_template
from models import storage
import uuid

app = Flask(__name__)

@app.teardown_appcontext
def teardown(exception):
    """Remove the current SQLAlchemy Session."""
    storage.close()

@app.route('/3-hbnb', strict_slashes=False)
def display_hbnb():
    """Display the main HBNB page."""
    cache_id = uuid.uuid4()
    return render_template('3-hbnb.html', cache_id=cache_id)

if __name__ == "__main__":
    app.run(host="0.0.0.0")
