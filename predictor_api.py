# predictor_api.py
from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)
model = joblib.load('crop_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = [data['N'], data['P'], data['K'], data['temperature'], data['humidity'], data['ph'], data['rainfall']]
    prediction = model.predict([features])
    return jsonify({'recommended_crop': prediction[0]})

if __name__ == '__main__':
    app.run(port=5000)
