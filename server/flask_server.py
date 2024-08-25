from flask import Flask, request, jsonify
from debate_agent import DebateAgent  # Assuming the DebateAgent class is saved in debate_agent.py

app = Flask(__name__)

# Initialize agents
system_message_sam = "You are a professional debator named Sam. You are arguing against the motion that 'The internet is a force for good'. Refer to Bob's points when arguing. The messages provided to you will be Bob's arguments."
system_message_bob = "You are a professional debator named Bob. You are arguing for the motion that 'The internet is a force for good'. Your arguments will be provided in the chat history."

agent_sam = DebateAgent(system_message_sam)
agent_bob = DebateAgent(system_message_bob)

@app.route('/message', methods=['POST'])
def handle_message():
    data = request.json
    if not data or 'agent' not in data or 'message' not in data:
        return jsonify({'error': 'Invalid request'}), 400
    
    agent_name = data['agent']
    message_content = data['message']
    
    if agent_name == 'Sam':
        agent_sam.add_human_message(f"Bob: {message_content}")
        response = agent_sam.get_ai_response()
        return jsonify({'response': response})
    elif agent_name == 'Bob':
        agent_bob.add_human_message(f"Sam: {message_content}")
        response = agent_bob.get_ai_response()
        return jsonify({'response': response})
    else:
        return jsonify({'error': 'Unknown agent'}), 400

if __name__ == '__main__':
    app.run(debug=True)
