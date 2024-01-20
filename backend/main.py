from flask import Flask, jsonify, request
from google.cloud import storage

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

#######################################3 THIS IS THE CODE FOR UPLOADING DATA TO FIREBASE
# doc_ref = db.collection("events").document("2")
# res = doc_ref.set(
#     {
#     "club_or_affiliation": "TSA",
#     "eventname": "Boba making",
#     "date": "1/19/2024",
#     "time": "15:00",
#     "flyer": "gs://cruzhack-24.appspot.com/graph.png",
#     "social_link": "insta/discord",
#     "location": "C9 Community Room",
#     "tags": ["tag 1", "tag2"]
#     }
#     )
# print(res)

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

def create_event_to_firebase (collection_name, document_name, json_to_dump):
    doc_ref = db.collection(collection_name).document(document_name)
    res = doc_ref.set(json_to_dump)
    print(res)

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
    
@app.route('/UploadImage/<uuid>', methods=['POST'])
def upload_event_image_post(uuid):
    # get image bytes
    bytes_to_send = request.data

    # assemble blob name
    blob_name = f'{uuid}.png'

    # upload file to GCS
    upload_bytes_to_gcs(bucket_name, blob_name, bytes_to_send)

    return {}, 200

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