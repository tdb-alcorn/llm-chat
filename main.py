from flask import Flask, render_template, make_response, request
from langchain import OpenAI, ConversationChain

llm = OpenAI(temperature=0)
conversation = ConversationChain(llm=llm, verbose=True)

conversation.predict(input="Hi there!")

app = Flask('app', static_folder='static')


@app.route('/')
def index():
  return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
  body = request.get_json()
  message = body['message']
  result = conversation.predict(input=message)
  response = make_response({'message':result})
  return response


app.run(host='0.0.0.0', port=8080)
