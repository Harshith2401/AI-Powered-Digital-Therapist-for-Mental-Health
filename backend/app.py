from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

# Fix: Add parent directory to sys.path so load_model.py can be found

# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from load_model import get_bot_response  # Remove "backend."
 # Now correctly imports the function

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_input = data.get("message")

    if not user_input:
        return jsonify({"error": "No message provided"}), 400

    bot_response = get_bot_response(user_input)
    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
