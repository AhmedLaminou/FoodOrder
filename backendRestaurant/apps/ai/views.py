from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .agents import basic_agent

agent = basic_agent()

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .agents import basic_agent

agent = basic_agent()

@csrf_exempt
def ask_ai(request):
    if request.method != "POST":
        return JsonResponse({"error": "Only POST allowed"}, status=405)

    try:
        data = json.loads(request.body)
        question = data.get("question", "")
        chat_history = data.get("chat_history", [])
        persona = data.get("persona", "waiter")
        if not question:
            return JsonResponse({"error": "Empty question"}, status=400)
        agent = basic_agent(chat_history=chat_history, persona=persona)
        result = agent.invoke({
            "input": question,
        })
        print(f"🧠 IA RESULT ({persona}):", result)

        if isinstance(result, dict) and "output" in result:
            return JsonResponse({"response": result["output"]})
        else:
            return JsonResponse({"response": str(result)})
    except Exception as e:
        print("❌ AI ERROR:", e)
        return JsonResponse({"error": str(e)}, status=500)
