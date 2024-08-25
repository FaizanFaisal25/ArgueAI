from langchain_community.tools.tavily_search import TavilySearchResults

def get_tavily_tool(max_results=2):
    return TavilySearchResults(max_results=max_results)