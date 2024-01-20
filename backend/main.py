from flask import Flask, jsonify, request, send_file
from google.cloud import storage
import io

app = Flask(__name__)

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os

# Use the application default credentials.
cred = credentials.ApplicationDefault()

# initialize firebase app
firebase_admin.initialize_app(cred)
db = firestore.client()

# get bucket name from env vars
bucket_name = os.environ.get('BUCKET_NAME')
if not bucket_name:
    print("ERROR: BUCKET NAME NOT DEFINED")
    exit(1)

def upload_bytes_to_gcs (bucket, blob, bytes_to_upload):
    '''
    Helper function for uploading bytes (image file bytes for this project) to Google Cloud Storage
    '''

    # Initialize a client
    client = storage.Client()

    # Get the bucket
    bucket = client.get_bucket(bucket_name)

    # Create a blob (object) in the bucket
    blob = bucket.blob(blob)

    # Upload the bytes to the blob
    res = blob.upload_from_string(bytes_to_upload, content_type="image/png")

    print(f"response is {res}")
    return res

def get_gcs_blob(bucket_name, blob_name):
    """
    Get a Google Cloud Storage blob.

    Args:
    - bucket_name (str): The name of the GCS bucket.
    - blob_name (str): The name of the blob (object) within the bucket.

    Returns:
    - google.cloud.storage.blob.Blob: The GCS blob object or None if not found.
    """
    # Initialize a client
    client = storage.Client()

    # Get the bucket
    bucket = client.get_bucket(bucket_name)

    # Get the blob (object) within the bucket
    blob = bucket.blob(blob_name)

    # Check if the blob exists
    if not blob.exists():
        print(f"Blob '{blob_name}' not found in bucket '{bucket_name}'.")
        return None

    return blob

def get_image_bytes(bucket_name, blob_name):
    blob = get_gcs_blob(bucket_name, blob_name)
    if not blob:
        return None
    
    return blob.download_as_bytes()

def create_event_to_firebase (collection_name, document_name, json_to_dump):
    doc_ref = db.collection(collection_name).document(document_name)
    res = doc_ref.set(json_to_dump)
    print(res)

def get_all_document_names(collection_name):
    # Reference to the collection
    collection_ref = db.collection(collection_name)

    # Get all documents in the collection
    documents = collection_ref.get()

    # Extract document names
    document_names = [doc.id for doc in documents]

    return document_names

@app.route('/')
def hello_world():
    return jsonify(message='Hello, World!')

@app.route('/AllEvents', methods=['GET'])
def all_events_get():
    pass

@app.route('/UploadEventJson/<uuid>', methods=['POST'])
def upload_event_json_post(uuid):
    try:
        data = request.get_json(force=True)
        
        # if tags is not in json, add 1
        if 'tags' not in data:
            data['tags'] = []

        # add the rest of the columns if they don't exist yet
        columns = ['club_or_affiliation', 'eventname', 'date', 'time', 'flyer', 'social_link', 'location']
        for col in columns:
            if col not in data:
                data[col] = None

        # assemble flyer link
        data['flyer'] = 'gs://'

        # TODO upload to firebase (uuid as the document)
        create_event_to_firebase('events', uuid, data)

        # return at the very least the uuid (see if that's posisble to get)
        return data, 200
    except Exception as e:
        print(f"Exception in /UploadEventJson: {e}")
        return {"exception": str(e)}, 400
    

@app.route('/FetchImage/<uuid>', methods=['GET'])
def fetch_image_json_get(uuid):
    img_bytes = get_image_bytes(bucket_name, f'{uuid}.img')
    # res = send_file(img_bytes, mimetype='image/png')
    # print(res)
    # return res, 200
    # Return the image bytes as a file response
    return send_file(
        io.BytesIO(img_bytes),
        mimetype='image/png',  # Adjust mimetype as per your image type
        as_attachment=True,
        download_name=f'{uuid.split("/")[-1]}.png'  # Use the last part of the blob_name as the download name
    )

@app.route('/UploadImage/<uuid>', methods=['POST'])
def upload_event_image_post(uuid):
    # get image bytes
    bytes_to_send = request.data

    # assemble blob name
    blob_name = f'{uuid}.png'

    # upload file to GCS
    upload_bytes_to_gcs(bucket_name, blob_name, bytes_to_send)

    return {}, 200

@app.route('/AllClubs', methods=['GET'])
def all_clubs_get():
    club_names = get_all_document_names('clubs')
    print(f'club_names are {club_names}')
    return {'clubs': club_names}, 200

@app.route('/QueryEvent', methods=['POST'])
def query_event_post():
    data = request.get_json(force=True)
    clubs_ref = firestore.client().collection('club_or_affiliation')
    selected = []
    result_strings = []

    for club in data:
        query = clubs_ref.where('name', '==', club).stream()
        for event in query:
            selected.append(event)  # check

    if not selected:
        return f'query: {type(query)} - none found'
            
    return {'selected_events': selected}, 200 #response 

if __name__ == '__main__':
    app.run(debug=True, port=8080)


'''
TODO
1. figure out how to get all the data for events (database design, fetching all info)
2. fetch the image somehow


submit button function:
- generate the UUID of event here
- first API: upload json with UUID
- second API: upload image with UUID (be sure to write back to db)
'''