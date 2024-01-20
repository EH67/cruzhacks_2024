import requests
import uuid

url = 'http://localhost:8080'

def test_upload_event():
    event_uuid = '12345uuid'
    with open('graph.png', 'rb') as infile:
        # upload the json
        req_url = f'{url}/UploadEventJson/{event_uuid}'
        res = requests.post(req_url, json={'test': 'hi'})
        print(res.text)

        # upload the image
        req_url = f'{url}/UploadImage/{event_uuid}'
        res = requests.post(req_url, files={'file': infile})
        print(res.text)

test_upload_event()