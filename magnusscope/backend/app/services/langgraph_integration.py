# app/services/langgraph_integration.py
from langgraph import Agent

class LangGraphAgent:
    def __init__(self):
        self.agent = Agent()

    def use_agent(self, task):
        result = self.agent.run(task)
        return result
