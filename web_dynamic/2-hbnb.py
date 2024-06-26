# File: web_dynamic/2-hbnb.py

#!/usr/bin/python3
from flask import Flask, render_template
from models import storage

app = Flask(__name__)

@app.route('/2-hbnb', strict_slashes=False)
def hbnb():
    amenities = storage.all('Amenity').values()
    return render_template('2-hbnb.html', amenities=amenities)

@app.teardown_appcontext
def teardown_db(exception):
    storage.close()

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
