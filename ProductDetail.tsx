import { View, Text, Image, StyleSheet, Button } from 'react-native';

// Exemple de données, à remplacer par un fetch réel
const product = {
  name: 'Burger Tacos Pizza',
  img: require('../assets/Food/burgerTacosPizza.jpeg'),
  description: 'Un délicieux burger avec tacos et pizza, le tout en un !',
  price: 8.99,
};

export default function ProductDetail() {
  return (
    <View style={styles.container}>
      <Image source={product.img} style={styles.img} />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.price}>{product.price} €</Text>
      <Button title="Ajouter au panier" color="#10b981" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 24,
  },
  img: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#10b981',
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
