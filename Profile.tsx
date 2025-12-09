import { View, Text, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Profile() {
  const [logged, setLogged] = useState(false);
  // À connecter à l'API d'authentification
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      {logged ? (
        <>
          <Text style={styles.info}>Bienvenue, utilisateur !</Text>
          <Button title="Se déconnecter" color="#10b981" onPress={() => setLogged(false)} />
        </>
      ) : (
        <Button title="Se connecter" color="#fbbf24" onPress={() => setLogged(true)} />
      )}
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
  info: {
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
});
