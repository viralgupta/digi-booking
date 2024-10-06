import cv2
from picamera2 import Picamera2
import time
import requests
import base64
import cloudinary
import cloudinary.uploader
import cloudinary.api
import uuid
from rpi_lcd import LCD
 
lcd = LCD()
 
piCam = Picamera2()
piCam.preview_configuration.main.size=(800,600)
piCam.preview_configuration.main.format="RGB888"
piCam.preview_configuration.align()
piCam.configure("preview")
piCam.start()
 
cloudname = "dwlv8kxbb"
cloudapi = "648166168569674"
cloudsecret = "RNUXeAIc2-12z_0EI_LkGQ9Ci20"
config = cloudinary.config(secure=True, cloud_name=cloudname, api_key=cloudapi, api_secret=cloudsecret)
 
face_cascade = cv2.CascadeClassifier('./haarcascade_frontalface_default.xml')
 
detectFaces = True
 
eventid = '6519e11d23000edf069e2a3b'
eventName = "TedX"
 
def display(text, line):
	if(line == 1):
		lcd.text(text,1)
	else:
		lcd.text(text,2)
 
def sendFrame(frame):
	uid = str(uuid.uuid4())
	retval, buff = cv2.imencode('.jpg', frame)
	jpgastext = base64.b64encode(buff)
	base64_string = "data:image/jpeg;base64," + jpgastext.decode("utf-8")	
	cloudinary.uploader.upload(base64_string, public_id=uid)
	url = cloudinary.CloudinaryImage(uid).build_url()
	formdata = {
		"eventid": eventid,
		"downloadurl": url
	}
	response = requests.post("https://j2l1xdlz-5000.inc1.devtunnels.ms/api/event/verifyeventbyurl", json=formdata)
	res = response.json()
	print(res)
	return res["message"]
 
def detect_face(img):
	face_found = False
	coord = face_cascade.detectMultiScale(img)
	if len(coord) > 0:
		face_found = True;
		for (x,y,w,h) in coord:
			img = cv2.rectangle(img, (x,y), (x+w,y+h), (0,255,0), 5)
	return img, face_found
 
def confirmFace():
	display("Wait 3 Sec..", 2)
	time.sleep(1)
	display("Wait 2 Sec..", 2)
	time.sleep(1)
	display("Wait 1 Sec..", 2)
	time.sleep(1)
	display("Capturing...", 2)
	frame2 = piCam.capture_array()
	frame, faceFound = detect_face(frame2)
	if(faceFound):
		display("Fetching Details..", 2)
		message = sendFrame(frame)
		display(message, 2)
		time.sleep(2)
		return
	else:
		display("No Face Found...", 2)
		time.sleep(2)
		return
 
while True:
	try:
		display("Event: "+eventName, 1)
		display("Scanning...", 2)
		frame = piCam.capture_array()
		if(detectFaces):
			frame, faceFound = detect_face(frame)
			print(faceFound)
			if(faceFound):
				detectFaces = False
				confirmFace()
				detectFaces = True
	except KeyboardInterrupt:
		lcd.clear()
		time.sleep(2)
		exit()