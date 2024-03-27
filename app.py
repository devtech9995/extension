from flask import Flask, request, jsonify
import os
import urllib.request
import soundfile
import speech_recognition as sr
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
@app.route('/', methods=["GET", "POST"])
def backend():
    src = request.json['src']
    
    # Download the audio file from the URL
    urllib.request.urlretrieve(src, os.getcwd()+"\\1.wav")

    # Read the audio file and convert it to PCM_16 format
    data, samplerate = soundfile.read('1.wav')
    soundfile.write('2.wav', data, samplerate, subtype='PCM_16')

    # Recognize the text from the audio file using Google Speech Recognition
    r = sr.Recognizer()
    with sr.AudioFile("2.wav") as source:
        audio_data = r.record(source)
        text = r.recognize_google(audio_data, language='jpn')

    # Return the recognized text
    return jsonify({'text': text})

if __name__ == '__main__':
    app.run("localhost", 5000)