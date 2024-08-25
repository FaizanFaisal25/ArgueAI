# Library Imports
from flask import Flask, request, jsonify
# File Imports
from utils.DebateAgent import DebateAgent  # Assuming the DebateAgent class is saved in debate_agent.py
from utils.prompts import initialize_debater_prompt
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

print("Server started")

DebateAgent_1 = None
DebateAgent_2 = None
message_count = 0
conversation_limit = 10

@app.route('/', methods=['GET'])
def test():
    return jsonify({'message': 'Server is up and running!'}), 200

# Define your endpoint to initialize agents
@app.route('/initialize_agents', methods=['POST'])
def initialize_agents():
    # Extract data from the request
    data = request.json
    print(data)

    # Extract relevant information
    topic = data.get('motion', "The internet is a force for good")
    agent_name_1 = data.get('forName')
    agent_name_2 = data.get('againstName')

    # Initialize system prompts of agents
    agent_1_sys_prompt = initialize_debater_prompt(agent_name_1, "in favor of", topic, agent_name_2)
    agent_2_sys_prompt = initialize_debater_prompt(agent_name_2, "against", topic, agent_name_1)

    global DebateAgent_1
    global DebateAgent_2

    print("Agent 1 Prompt: ", agent_1_sys_prompt)
    
    # Initialize the agents
    DebateAgent_1 = DebateAgent(system_message=agent_1_sys_prompt, opponent_name=agent_name_2)
    DebateAgent_2 = DebateAgent(system_message=agent_2_sys_prompt, opponent_name=agent_name_1)

    # Return a response
    return jsonify({
        "system_message_1": agent_1_sys_prompt,
        "system_message_2": agent_2_sys_prompt
    }), 200

@app.route('/message', methods=['POST'])
def handle_message():
    global message_count
    global DebateAgent_1
    global DebateAgent_2

    data = request.json
    print("DATA---->", data)
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
            return jsonify({'response': chat_response, 'agent_index': 0}), 200

    return jsonify({'error': 'Invalid agent index'}), 400


if __name__ == '__main__':
    app.run(debug=False, port=9988)
