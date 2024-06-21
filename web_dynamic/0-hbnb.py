from flask import Flask, render_template
import uuid
import os

app = Flask(__name__)

@app.route('/0-hbnb/')
def hbnb():
    cache_id = str(uuid.uuid4())
    try:
        template_file = '0-hbnb.html'
        if not os.path.exists(f'templates/{template_file}'):
            template_file = '8-hbnb.html'
    except FileNotFoundError:
        template_file = '8-hbnb.html'

    return render_template(template_file, cache_id=cache_id)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
