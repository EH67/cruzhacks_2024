# script for dumping all the club info into firebase (web scraped by chloe!)

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import json

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


    
def create_club_to_firebase (collection_name, document_name, json_to_dump):
    doc_ref = db.collection(collection_name).document(document_name)
    res = doc_ref.set(json_to_dump)
    print(res)

# access the file
with open("clubs.json", "r") as f:
    data = json.load(f)
for name, info in data.items():
    print(name)
    create_club_to_firebase('clubs', name, {'insta': info})
'''sample: create_club_to_firebase('clubs', 'Taiwanese Student Association', {'insta': '@ucsc_tsa'})'''