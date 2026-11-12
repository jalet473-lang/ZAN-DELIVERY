import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: 'bold' }}>ZAN DELIVERY</Text>
      <Text style={{ fontSize: 18, marginTop: 20 }}>Karibu Boss!</Text>
      <Text style={{ fontSize: 14, marginTop: 10, color: 'green' }}>App Iko Sawa Sasa ✅</Text>
    </View>
  );
}
