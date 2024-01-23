from flask import Flask

app = Flask(__name__)

@app.route("/chatbot")
def chatbot():
    return {"chatbot": ["prompt", "response"]}

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8000)
