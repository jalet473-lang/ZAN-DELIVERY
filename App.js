import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput, Alert } from 'react-native';

const MENU = [
  { id: 1, name: 'Biriani Kuku', price: 15000, shop: 'Forodhani Food' },
  { id: 2, name: 'Pizza', price: 20000, shop: 'Stone Pizza' },
  { id: 3, name: 'Mishkaki (5)', price: 12000, shop: 'Forodhani Food' },
  { id: 4, name: 'Zanzibar Mix', price: 18000, shop: 'Stone Pizza' },
];

export default function App() {
  const [screen, setScreen] = useState('login');
  const [phone, setPhone] = useState('0776042014');
  const [orders, setOrders] = useState([
    { id: 2832, mteja: 'Ali - Forodhani', item: 'Biriani Kuku', total: 18000, status: 'NEW', shop: 'Forodhani Food' },
    { id: 2833, mteja: 'Fatma - Stone Town', item: 'Pizza', total: 23000, status: 'Cooking', shop: 'Stone Pizza' },
  ]);

  const commission = orders.length * 3000;
  const deliveryFee = orders.length * 1000;
  const ads = 25000;
  const totalPesa = commission + deliveryFee + ads;

  const orderNow = (item) => {
    const newOrder = { id: Math.floor(Math.random()*9000)+1000, mteja: 'Wewe - ' + phone, item: item.name, total: item.price + 3000, status: 'NEW', shop: item.shop };
    setOrders([newOrder, ...orders]);
    Alert.alert('Asante!', item.name + ' imeagizwa! Dereva anakujia.');
  };

  if (screen === 'login') {
    return (
      <View style={s.center}>
        <Image source={require('./zan-logo.png')} style={s.logo} resizeMode="contain" />
        <Text style={s.title}>ZAN DELIVERY</Text>
        <Text style={s.sub}>Iko Sawa Sasa ✅</Text>
        <TextInput style={s.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" placeholder="Namba ya Simu" />
        <TouchableOpacity style={s.btn} onPress={() => setScreen('roles')}><Text style={s.btnT}>INGIA</Text></TouchableOpacity>
      </View>
    );
  }

  if (screen === 'roles') {
    return (
      <View style={s.center}>
        <Text style={s.title}>Wewe ni Nani?</Text>
        <Text style={s.sub}>Chagua Role Yako</Text>
        {[
          { label: '👤 MTEJA - Agiza Chakula', to: 'mteja' },
          { label: '🛵 DEREVA - Pokea Oda', to: 'dereva' },
          { label: '🍽️ MGAHAWA - Pika Oda', to: 'mgahawa' },
          { label: '👑 ADMIN - Ona Pesa', to: 'admin' },
        ].map(r => (
          <TouchableOpacity key={r.to} style={s.roleBtn} onPress={() => setScreen(r.to)}><Text style={s.btnT}>{r.label}</Text></TouchableOpacity>
        ))}
        <TouchableOpacity onPress={() => setScreen('login')}><Text style={{marginTop:15, color:'#666'}}>Rudi Nyuma</Text></TouchableOpacity>
      </View>
    );
  }

  if (screen === 'mteja') {
    return (
      <ScrollView style={s.bg}>
        <View style={s.header}><Text style={s.hT}>ZAN DELIVERY</Text><Text style={s.hSub}>Chagua Chakula - Zanzibar</Text></View>
        {MENU.map(m => (
          <View key={m.id} style={s.card}>
            <Text style={s.bold}>{m.name}</Text><Text>{m.shop}</Text>
            <Text style={s.price}>{m.price.toLocaleString()} TZS + Delivery 3,000</Text>
            <TouchableOpacity style={s.btn} onPress={() => orderNow(m)}><Text style={s.btnT}>ORDER SASA</Text></TouchableOpacity>
          </View>
        ))}
        <Text style={s.sec}>Oda Zangu ({orders.length})</Text>
        {orders.map(o => (<View key={o.id} style={s.card}><Text style={s.bold}>#{o.id} - {o.item}</Text><Text>{o.mteja} - {o.status}</Text></View>))}
        <TouchableOpacity style={s.back} onPress={() => setScreen('roles')}><Text>⬅ Badilisha Role</Text></TouchableOpacity>
      </ScrollView>
    );
  }

  if (screen === 'dereva') {
    return (
      <ScrollView style={s.bg}>
        <View style={s.header}><Text style={s.hT}>DEREVA APP 🛵</Text><Text style={s.hSub}>Oda za Kupeleka</Text></View>
        {orders.map(o => (
          <View key={o.id} style={s.card}><Text style={s.bold}>#{o.id} - {o.item}</Text><Text>{o.mteja}</Text><Text>Malipo Yako: 2,000 TZS</Text>
          <TouchableOpacity style={s.btn} onPress={() => setOrders(orders.map(x => x.id===o.id ? {...x, status:'Delivered ✅'} : x))}><Text style={s.btnT}>{o.status === 'Delivered ✅' ? 'IMESHAFIKISHWA ✅' : 'NACHUKUA - NIMEFIKISHA'}</Text></TouchableOpacity></View>
        ))}
        <TouchableOpacity style={s.back} onPress={() => setScreen('roles')}><Text>⬅ Badilisha Role</Text></TouchableOpacity>
      </ScrollView>
    );
  }

  if (screen === 'mgahawa') {
    return (
      <ScrollView style={s.bg}>
        <View style={s.header}><Text style={s.hT}>MGAHAWA APP 🍽️</Text><Text style={s.hSub}>Oda Zinazoingia Jikoni</Text></View>
        {orders.map(o => (
          <View key={o.id} style={s.card}><Text style={s.bold}>#{o.id} - {o.item}</Text><Text>{o.mteja} - {o.status}</Text>
          <TouchableOpacity style={s.btn} onPress={() => setOrders(orders.map(x => x.id===o.id ? {...x, status:'Cooking - 15min'} : x))}><Text style={s.btnT}>KUBALI - INAPIKWA</Text></TouchableOpacity>
          <TouchableOpac
