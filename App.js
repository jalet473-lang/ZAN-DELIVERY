import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ZAN DELIVERY</Text>
      <Text style={styles.subtitle}>Karibu Zanzibar Delivery!</Text>
      <Text style={styles.subtitle}>App Ipo Sawa ✅</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Anza Kuagiza</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
