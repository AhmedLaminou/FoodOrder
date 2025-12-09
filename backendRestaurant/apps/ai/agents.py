import os
from dotenv import load_dotenv

# Use the same .env as settings.py
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(BASE_DIR,  'sth.env')
load_dotenv(dotenv_path)

from langchain_openai import ChatOpenAI
from langchain_community.agent_toolkits.load_tools import load_tools
from langchain.agents import initialize_agent, AgentType
from langchain.memory import ConversationBufferMemory
from .tools import menu_tool, reservation_tool, food_ordering_tool, faq_tool, recommendation_tool


def basic_agent(chat_history=None, persona=None):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables.")

    # Persona system prompts
    persona_prompts = {
        "waiter": "You are an expert restaurant waiter. Be helpful, polite, and knowledgeable about the menu and service.",
        "chef": "You are the restaurant's chef. Answer with culinary expertise, suggest dishes, and explain ingredients or cooking methods.",
        "sommelier": "You are the restaurant's sommelier. Give expert wine advice and suggest pairings for dishes.",
    }
    persona = persona or "waiter"
    system_prompt = persona_prompts.get(persona, persona_prompts["waiter"])

    llm = ChatOpenAI(
        temperature=0,
        openai_api_key=api_key,
        openai_api_base="https://openrouter.ai/api/v1",
        model="mistralai/mistral-7b-instruct",
    )
    tools = load_tools(["llm-math"], llm=llm)
    tools.extend([menu_tool, reservation_tool, food_ordering_tool, faq_tool, recommendation_tool])
    memory = ConversationBufferMemory(return_messages=True)
    # Add system prompt as the very first message
    from langchain.schema import SystemMessage
    memory.chat_memory.add_message(SystemMessage(content=system_prompt))
    # Populate memory with chat_history if provided
    if chat_history:
        for msg in chat_history:
            memory.chat_memory.add_message(msg)
    return initialize_agent(
        tools=tools,
        llm=llm,
        agent=AgentType.CONVERSATIONAL_REACT_DESCRIPTION,
        verbose=False,
        handle_parsing_errors=True,
        memory=memory,
    )