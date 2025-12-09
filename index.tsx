import { Text, View, Image, ScrollView, StyleSheet } from "react-native";

export default function Index() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <Image source={require('../assets/Food/sandwich1.jpg')} style={styles.heroImage} />
        <Text style={styles.title}>Lunch Purchase</Text>
        <Text style={styles.subtitle}>Le principal restaurant en ligne B2C pour vos besoins</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quelques plats populaires</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image source={require('../assets/Food/burgerTacosPizza.jpeg')} style={styles.foodCard} />
          <Image source={require('../assets/Food/cheeseCakeFraise.jpg')} style={styles.foodCard} />
          <Image source={require('../assets/Food/kFriedChicken.avif')} style={styles.foodCard} />
          <Image source={require('../assets/Food/couscousPoulet.jpg')} style={styles.foodCard} />
          <Image source={require('../assets/Food/salade1.jpeg')} style={styles.foodCard} />
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Boissons</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image source={require('../assets/Food/boisson1.jpg')} style={styles.foodCard} />
          <Image source={require('../assets/Food/boisson2.jpg')} style={styles.foodCard} />
          <Image source={require('../assets/Food/boisson3.webp')} style={styles.foodCard} />
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Découvrez plus dans le menu !</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 24,
    backgroundColor: '#fffbe6',
  },
  heroImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fbbf24',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 12,
  },
  foodCard: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: '#eee',
  },
});
