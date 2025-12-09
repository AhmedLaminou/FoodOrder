// Exemple d'adaptateur d'API pour le mobile
// À adapter selon les endpoints Django REST de ton backend

const API_URL = 'http://localhost:8000/api'; // À adapter selon l'IP de ton backend

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Erreur de connexion');
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${API_URL}/products/`);
  if (!res.ok) throw new Error('Erreur chargement produits');
  return res.json();
}

export async function addToCart(productId: number, quantity = 1) {
  // ...
}

// Ajoute ici d'autres fonctions pour le panier, commandes, etc.
