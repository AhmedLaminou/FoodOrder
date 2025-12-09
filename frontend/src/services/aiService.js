export const askAI = async (question) => {
  const res = await fetch("http://localhost:8000/ai/api/ask/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });


  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      throw new Error(data.error || "Erreur inconnue du serveur.");
    } else {
      const text = await res.text();
      throw new Error(text || "Erreur inconnue du serveur.");
    }
  }
  if (contentType && contentType.includes("application/json")) {
    return await res.json();
  } else {
    throw new Error("La réponse du serveur n'est pas au format JSON.");
  }
};