import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert } from 'react-native';

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
        <Text style={{fontSize:70}}>🛵</Text>
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
          <TouchableOpacity style={[s.btn,{backgroundColor:'green', marginTop:5}]} onPress={() => setOrders(orders.map(x => x.id===o.id ? {...x, status:'Tayari Kuchukuliwa'} : x))}><Text style={s.btnT}>TAYARI KWA KUCHUKULIWA</Text></TouchableOpacity></View>
        ))}
        <TouchableOpacity style={s.back} onPress={() => setScreen('roles')}><Text>⬅ Badilisha Role</Text></TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={s.bg}>
      <View style={s.header}><Text style={s.hT}>ADMIN - WEWE 👑</Text><Text style={s.hSub}>Pesa LIVE - {phone}</Text></View>
      <View style={s.moneyBox}><Text style={{color:'white', fontSize:16}}>JUMLA LEO</Text><Text style={{color:'#FF8C00', fontSize:32, fontWeight:'bold'}}>{totalPesa.toLocaleString()} TZS</Text></View>
      <View style={s.card}><Text>Source 1 - Commission Mgahawa (20%): {commission.toLocaleString()} TZS</Text></View>
      <View style={s.card}><Text>Source 2 - Delivery Fee: {deliveryFee.toLocaleString()} TZS</Text></View>
      <View style={s.card}><Text>Source 3 - Matangazo / Kodi Dereva: {ads.toLocaleString()} TZS</Text></View>
      <Text style={s.sec}>Oda Zote LIVE</Text>
      {orders.map(o => (<View key={o.id} style={s.card}><Text style={s.bold}>#{o.id} {o.item}</Text><Text>{o.mteja} - {o.status} - {o.total.toLocaleString()} TZS</Text></View>))}
      <TouchableOpacity style={s.back} onPress={() => setScreen('roles')}><Text>⬅ Badilisha Role</Text></TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  bg:{flex:1, backgroundColor:'#f2f2f2'}, center:{flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'#fff', padding:20},
  title:{fontSize:28, fontWeight:'bold'}, sub:{color:'green', marginTop:5, marginBottom:15},
  input:{borderWidth:1, borderColor:'#ddd', width:'100%', padding:12, borderRadius:8, marginBottom:12},
  btn:{backgroundColor:'#FF8C00', padding:12, borderRadius:8, alignItems:'center', marginTop:8},
  btnT:{color:'white', fontWeight:'bold'}, roleBtn:{backgroundColor:'#0B3D91', padding:15, borderRadius:10, width:'100%', marginTop:10, alignItems:'center'},
  header:{backgroundColor:'#0B3D91', padding:25, paddingTop:45}, hT:{color:'white', fontSize:24, fontWeight:'bold'}, hSub:{color:'#FF8C00', marginTop:4},
  card:{backgroundColor:'white', margin:10, marginHorizontal:15, padding:15, borderRadius:10},
  bold:{fontWeight:'bold', fontSize:16}, price:{color:'#0B3D91', fontWeight:'bold', marginTop:5},
  sec:{fontSize:18, fontWeight:'bold', margin:15}, back:{padding:15, alignItems:'center'},
  moneyBox:{backgroundColor:'#0B3D91', margin:15, padding:20, borderRadius:12, alignItems:'center'}
});
