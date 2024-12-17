from flask import Flask, request, render_template, send_from_directory, redirect, url_for
from pymongo import MongoClient
import os
import gridfs

# Initialize Flask app
app = Flask(__name__, static_folder='../front-end', template_folder='../front-end')
app.config['UPLOAD_FOLDER'] = 'uploads'

# MongoDB connection
client = MongoClient('mongodb://localhost:27017/')
db = client['echoVIT']  # Name of your database
fs = gridfs.GridFS(db)  # Use GridFS for handling large files

# Ensure upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Serve HTML
@app.route('/')
def index():
    return render_template('notes.html')  # Render the front-end HTML file

# Route to serve CSS
@app.route('/notes.css')
def notes_css():
    return send_from_directory('../front-end', 'notes.css')

# Route to serve JS
@app.route('/notes.js')
def notes_js():
    return send_from_directory('../front-end', 'notes.js')

# File upload route
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return redirect(request.url)
    file = request.files['file']
    if file.filename == '':
        return redirect(request.url)
    if file:
        file_id = fs.put(file, filename=file.filename)
        print(f"File uploaded with ID: {file_id}")
        return redirect(url_for('index'))
    return redirect(request.url)

# File search route
@app.route('/search', methods=['GET'])
def search_file():
    filename = request.args.get('filename')
    if filename:
        files = fs.find({"filename": {"$regex": filename, "$options": 'i'}})
        return render_template('notes.html', files=files)  # Pass files to the front-end
    return render_template('notes.html', files=[])

# File download route
@app.route('/download/<file_id>', methods=['GET'])
def download_file(file_id):
    file = fs.get(file_id)
    return send_from_directory(app.config['UPLOAD_FOLDER'], file.filename)

if __name__ == '__main__':
    app.run(debug=True)
