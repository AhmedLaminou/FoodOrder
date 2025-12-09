import { View, Text, StyleSheet } from 'react-native';

export default function Cart() {
  // À connecter plus tard avec le backend/panier
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votre Panier</Text>
      <Text style={styles.empty}>Votre panier est vide.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 16,
  },
  empty: {
    fontSize: 18,
    color: '#888',
  },
});
