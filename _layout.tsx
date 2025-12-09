import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: "home",
  Menu: "restaurant",
  Cart: "cart",
  Profile: "person",
  Login: "log-in",
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconName = icons[route.name] || "ellipse";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fbbf24",
        tabBarInactiveTintColor: "#888",
        headerShown: false,
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Accueil" }} />
      <Tabs.Screen name="Menu" options={{ title: "Menu" }} />
      <Tabs.Screen name="Cart" options={{ title: "Panier" }} />
      <Tabs.Screen name="Profile" options={{ title: "Profil" }} />
      <Tabs.Screen name="Login" options={{ title: "Connexion" }} />
    </Tabs>
  );
}
