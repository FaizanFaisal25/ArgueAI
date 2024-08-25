# Library Imports
from flask import Flask, request, jsonify
from flask_cors import CORS
# File Imports
from utils.DebateAgent import DebateAgent  # Assuming the DebateAgent class is saved in debate_agent.py
from utils.prompts import initialize_debater_prompt

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DebateAgent_1 = None
DebateAgent_2 = None
message_count = 0
conversation_limit = 10


# Define your endpoint to initialize agents
@app.route('/initialize_agents', methods=['POST'])
def initialize_agents():
    # Extract data from the request
    data = request.json

    # Extract relevant information
    topic = data.get('topic', "The internet is a force for good")
    agent_name_1 = data.get('name_1')
    agent_name_2 = data.get('name_2')

    # Initialize system prompts of agents
    agent_1_sys_prompt = initialize_debater_prompt(agent_name_1, "in favor of", topic, agent_name_2)
    agent_2_sys_prompt = initialize_debater_prompt(agent_name_2, "against", topic, agent_name_1)

    global DebateAgent_1
    global DebateAgent_2
    
    # Initialize the agents
    DebateAgent_1 = DebateAgent(system_message=agent_1_sys_prompt, opponent_name=agent_name_2)
    DebateAgent_2 = DebateAgent(system_message=agent_2_sys_prompt, opponent_name=agent_name_1)

    # Return a response
    return jsonify({
        "system_message_1": agent_1_sys_prompt,
        "system_message_2": agent_2_sys_prompt
    })
@app.route('/message', methods=['POST'])
def handle_message():
    global message_count
    global DebateAgent_1
    global DebateAgent_2

    data = request.json
    if not data or 'agent_index' not in data or 'message' not in data:
        return jsonify({'error': 'Invalid request'}), 400
    
    if message_count >= conversation_limit:
        return jsonify({'error': 'Conversation limit reached'}), 400

    agent_index = data['agent_index']
    message_content = data['message']

    if message_count == 0:
        DebateAgent_1.add_first_message(content="Make your opening statement in favour of the motion.")
        chat_response = DebateAgent_1.get_ai_response()
        message_count += 1
        return jsonify({'response': chat_response, 'agent_index': 0})

    if agent_index in [0, 1]:
        if agent_index == 1:
            DebateAgent_2.add_opponent_message(content=message_content)
            chat_response = DebateAgent_2.get_ai_response()
            message_count += 1
            return jsonify({'response': chat_response, 'agent_index': 1})
        
        if agent_index == 0:
            DebateAgent_1.add_opponent_message(content=message_content)
            chat_response = DebateAgent_1.get_ai_response()
            message_count += 1
            return jsonify({'response': chat_response, 'agent_index': 0})

    return jsonify({'error': 'Invalid agent index'}), 400


if __name__ == '__main__':
    app.run(debug=True)
