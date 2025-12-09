import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

const plats = [
  { name: 'Burger Tacos Pizza', img: require('../assets/Food/burgerTacosPizza.jpeg') },
  { name: 'Cheesecake Fraise', img: require('../assets/Food/cheeseCakeFraise.jpg') },
  { name: 'Poulet Frit', img: require('../assets/Food/kFriedChicken.avif') },
  { name: 'Couscous Poulet', img: require('../assets/Food/couscousPoulet.jpg') },
  { name: 'Salade Fraîche', img: require('../assets/Food/salade1.jpeg') },
  { name: 'Sandwich', img: require('../assets/Food/sandwich1.jpg') },
  { name: 'Pizza Pepperoni', img: require('../assets/Food/pizzaPepperoni.webp') },
  { name: 'Ramen Maison', img: require('../assets/Food/ramenMaison.jpg') },
];

export default function Menu() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Text style={styles.title}>Menu</Text>
      <View style={styles.grid}>
        {plats.map((plat, idx) => (
          <View key={idx} style={styles.card}>
            <Image source={plat.img} style={styles.img} />
            <Text style={styles.name}>{plat.name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginTop: 32,
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  card: {
    width: 150,
    margin: 8,
    backgroundColor: '#fffbe6',
    borderRadius: 16,
    alignItems: 'center',
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});
