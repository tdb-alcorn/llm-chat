from flask import Flask, render_template, make_response, request, Markup
# from langchain import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.schema import (AIMessage, HumanMessage)

starting_prompt = "Hi there! I'm studying for the SAT. Can you help me practice one question at a time?"

chatbot = ChatOpenAI(model="gpt-4", temperature=0, verbose=True)

messages = list()

messages.append(HumanMessage(content=starting_prompt))
initial_message = chatbot(messages)
messages.append(initial_message)

app = Flask('app', static_folder='static')

def render_newlines(s):
  return s.replace('\n', '<br>')

@app.route('/')
def index():
  return render_template('index.html', initial_message=Markup(render_newlines(initial_message.content)))


@app.route('/chat', methods=['POST'])
def chat():
  body = request.get_json()
  message = body['message']
  messages.append(HumanMessage(content=message))
  result = chatbot(messages)
  print(result)
  messages.append(result)
  response = make_response({'message': result.content})
  return response


app.run(host='0.0.0.0', port=8080)
