from flask import Flask, jsonify, request
from flask_cors import CORS  # Add this import
import pandas as pd
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)
CORS(app)  # Allow all origins by default

# Load the dataset once the Flask app starts
data = pd.read_csv('dataaset.csv')  # Ensure dataset.csv is in the same folder as this file
X = data['Temperature'].values.reshape(-1, 1)  # Temperature
y = data['FanSpeed'].values  # Fan Speed

# Train a simple linear regression model
model = LinearRegression()
model.fit(X, y)

@app.route('/predict', methods=['GET'])
def predict():
    temp = request.args.get('temperature', type=float)

    if temp is None:
        return jsonify({'error': 'Temperature parameter is missing'}), 400

    # Predict the fan speed for the given temperature
    predicted_speed = model.predict(np.array([[temp]]))[0]

    return jsonify({'temperature': temp, 'predicted_fan_speed': predicted_speed})

if __name__ == '__main__':
    app.run(debug=True)
