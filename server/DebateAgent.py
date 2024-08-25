from langchain_openai import ChatOpenAI
from langchain_community.tools.tavily_search import TavilySearchResults
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent
from dotenv import load_dotenv

load_dotenv()

class DebateAgent:
    def __init__(self, system_message: str):
        # Initialize the model and tools
        self.model = ChatOpenAI(model="gpt-3.5-turbo")
        self.memory = MemorySaver()
        self.search = TavilySearchResults(max_results=2)
        self.tools = [self.search]
        self.agent_executor = create_react_agent(self.model, self.tools, checkpointer=self.memory)
        
        # Initialize chat history with system message
        self.chat_history = [SystemMessage(content=system_message)]
    
    def add_human_message(self, content: str):
        # Add a human message to the chat history
        self.chat_history.append(HumanMessage(content=content))
    
    def get_ai_response(self):
        # Get the AI response based on the current chat history
        config = {"configurable": {"thread_id": "abc123"}}
        final_message = ""
        
        for chunk in self.agent_executor.stream(
            {"messages": self.chat_history}, config
        ):
            final_message = chunk
        
        response = final_message['agent']['messages'][0].content
        self.chat_history.append(AIMessage(content=response))
        return response

    def get_chat_history(self):
        return self.chat_history
