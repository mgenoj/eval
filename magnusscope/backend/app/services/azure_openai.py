# services/azure_openai.py
import os
from langchain.llms import OpenAI

class InternalLLMClient:
    def __init__(self):
        self.llm = OpenAI(
            openai_api_key=os.getenv("INTERNAL_LLM_KEY"),
            openai_api_base=os.getenv("INTERNAL_LLM_ENDPOINT"),
        )

    async def generate_text(self, prompt):
        response = self.llm(prompt)
        return response
