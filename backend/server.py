from flask import Flask, jsonify, request
from flask_cors import CORS
import vertexai
import json
from vertexai.preview import generative_models
from vertexai.preview.generative_models import GenerativeModel, ChatSession

import pathlib
import textwrap
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown


def to_markdown(text):
  text = text.replace('•', '  *')
  return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))

genai.configure(api_key='AIzaSyA1_HyCycvJGbC3e6oMf34Rku_g3SvlKJs')

# for m in genai.list_models():
#   if 'generateContent' in m.supported_generation_methods:
#     print(m.name)

# model = genai.GenerativeModel('gemini-pro')
# response = model.generate_content("What is the meaning of life?")
# print(response)
# to_markdown(response.text)
model = genai.GenerativeModel("gemini-pro")
chat = model.start_chat()

def get_chat_response(chat: ChatSession, prompt: str,  generation_config={
        "max_output_tokens": 20,
        "temperature": 0.4,
        "top_p": 1,
        "top_k": 10
    }) -> str:
    response = chat.send_message(prompt)
    return response.text

# prompt = "Hello."
# string=print(get_chat_response(chat, prompt))
limit = "  Respond in less than 20 words"
prompt = "You will introduce yourself as AIngvar, the users friendly Swedish helping chatbot. Speak in English. And you will only answer questions relating to IKEA, and assist as an IKEA designer"+limit
print(get_chat_response(chat, prompt))


app = Flask(__name__)
CORS(app)


# @app.route("/response", methods=['POST'])
# def response():
#     # data = request.json
#     return{'data': 'Receieved'}
    
@app.route("/chatbot", methods=['GET', 'POST'])
def chatbot():
    if request.method == "POST":
        obj = json.loads(request.data)
        for key in obj:
            # prompt = obj[key]
            return jsonify({
                'message':get_chat_response(chat, key+limit)
            })
        # print(request.form.get('message'))
    #     return jsonify({
    #     'message': get_chat_response(chat,request.form.get('message'))
    # })
    if request.method == 'GET':
        return jsonify({
        'message': get_chat_response(chat,prompt)
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080)

