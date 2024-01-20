import requests
import uuid

url = 'http://localhost:8080'

def test_upload_event():
    event_uuid = '12345uuid'
    with open('graph.png', 'rb') as infile:
        # upload the json
        req_url = f'{url}/UploadEventJson/{event_uuid}'
        req_json = {
            "club_or_affiliation": "TSA",
            "eventname": "Boba making",
            "date": "1/19/2024",
            "time": "15:00",
            "flyer": "gs://cruzhack-24.appspot.com/graph.png",
            "social_link": "insta/discord",
            "location": "C9 Community Room",
            "tags": ["tag 1", "tag2"]
        }
        res = requests.post(req_url, json=req_json)
        print(res.text)

        # upload the image
        req_url = f'{url}/UploadImage/{event_uuid}'
        # res = requests.post(req_url, files={'file': infile})
        res = requests.post(req_url, data=infile)
        print(res.text)

test_upload_event()