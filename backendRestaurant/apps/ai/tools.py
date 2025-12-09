import os
import json
from langchain.tools import Tool
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.schema import Document
from apps.menu.services import get_all_menu_items

# --- Menu Data Tool (dynamic, uses DB) ---
def menu_lookup(query: str) -> str:
    query = query.lower()
    items = get_all_menu_items()
    results = [item for item in items if query in item.name.lower() or (item.description and query in item.description.lower())]
    if not results:
        return "Aucun plat trouvé pour votre recherche."
    return "\n".join([f"{item.name} ({item.price}€): {item.description}" for item in results])

menu_tool = Tool(
    name="MenuLookup",
    func=menu_lookup,
    description="Recherche les plats du menu du restaurant (base de données réelle). Fournissez une requête (nom ou description) pour obtenir les plats correspondants."
)

# --- Table Reservation Workflow ---
def reservation_workflow(input_data):
    missing = []
    for field in ["name", "date", "time", "people"]:
        if not input_data.get(field):
            missing.append(field)
    if missing:
        return f"Merci de préciser: {', '.join(missing)}."
    return f"Réservation confirmée pour {input_data['people']} personnes au nom de {input_data['name']} le {input_data['date']} à {input_data['time']}."

reservation_tool = Tool(
    name="TableReservation",
    func=reservation_workflow,
    description="Gère la réservation de table. Fournit un dict avec name, date, time, people. Pose des questions pour compléter les infos."
)

# --- Food Ordering Workflow ---
def food_ordering_workflow(input_data):
    if not input_data.get("items"):
        return "Quels plats souhaitez-vous commander ?"
    if not input_data.get("name"):
        return "À quel nom passer la commande ?"
    items_str = ", ".join([f"{item['qty']}x {item['name']}" for item in input_data['items']])
    return f"Commande confirmée: {items_str} au nom de {input_data['name']}."

food_ordering_tool = Tool(
    name="FoodOrdering",
    func=food_ordering_workflow,
    description="Gère la commande de plats. Fournit un dict avec items (liste de plats/quantités) et nom. Pose des questions pour compléter."
)

# --- FAQ Retriever Tool (RAG) ---
def load_faq_retriever():
    faq_path = os.path.join(os.path.dirname(__file__), "faq.json")
    with open(faq_path, "r", encoding="utf-8") as f:
        faq_data = json.load(f)
    docs = [
        Document(
            page_content=item["question"] + "\n" + item["answer"],
            metadata={"question": item["question"], "answer": item["answer"]},
        )
        for item in faq_data
    ]
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = Chroma.from_documents(docs, embeddings, collection_name="faq")
    retriever = vectorstore.as_retriever(search_kwargs={"k": 1})
    return retriever

faq_retriever = load_faq_retriever()

def faq_tool_func(query: str) -> str:
    docs = faq_retriever.get_relevant_documents(query)
    if not docs:
        return "Je n'ai pas trouvé de réponse dans la FAQ."
    return docs[0].metadata.get("answer", docs[0].page_content)

faq_tool = Tool(
    name="FAQRetriever",
    func=faq_tool_func,
    description="Recherche une réponse à partir de la FAQ du restaurant. Posez une question sur le restaurant, les horaires, la livraison, etc."
)

# --- Contextual Recommendation Tool ---
def recommend_menu_items(preference: str) -> str:
    """
    Recommend menu items based on a user preference (e.g., vegetarian, spicy, low-calorie, chef's special).
    """
    preference = preference.lower()
    items = get_all_menu_items()
    filtered = []
    # Simple keyword-based filtering (extend with tags or ML as needed)
    for item in items:
        desc = (item.description or "").lower()
        name = item.name.lower()
        if preference in name or preference in desc:
            filtered.append(item)
        elif preference == "vegetarian" and ("vegetarien" in desc or "vegetarian" in desc):
            filtered.append(item)
        elif preference == "spicy" and ("spicy" in desc or "épicé" in desc):
            filtered.append(item)
        elif preference == "chef" and ("chef" in desc or "special" in desc or "spécial" in desc):
            filtered.append(item)
        # Add more rules as needed
    if not filtered:
        return f"Aucun plat trouvé pour la préférence '{preference}'."
    return "\n".join([f"{item.name} ({item.price}€): {item.description}" for item in filtered])

recommendation_tool = Tool(
    name="MenuRecommendation",
    func=recommend_menu_items,
    description="Recommande des plats du menu en fonction d'une préférence utilisateur (ex: végétarien, épicé, spécial chef, etc.)."
)
