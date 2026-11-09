

import { View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useState, useEffect } from 'react';

export default function App(){
  const [page, setPage] = useState('login');
  const [role, setRole] = useState(null);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [users, setUsers] = useState([
    {phone:'0776042014', pass:'0776042014', name:'BOSS ADMIN', role:'admin'},
    {phone:'0712345678', pass:'1234', name:'Mgahawa Forodhani', role:'mgahawa'},
    {phone:'0765432109', pass:'1234', name:'Dereva Juma', role:'driver'},
  ]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedPay, setSelectedPay] = useState('CASH');
  const [now, setNow] = useState(Date.now());
  const [orders, setOrders] = useState([]);

  useEffect(()=>{ const i=setInterval(()=>setNow(Date.now()),1000); return ()=>clearInterval(i); },[]);

  const canCancel = (o) => (now - o.createdAt) < 120000 && o.status!=='CANCELED' && o.status!=='Delivered';
  const timeLeft = (o) => Math.max(0, 120 - Math.floor((now - o.createdAt)/1000));

  const login = () => {
    if(phone==='0776042014' && password==='0776042014'){ setCurrentUser({phone:'0776042014', name:'BOSS ADMIN', role:'admin'}); setRole('admin'); return; }
    const u = users.find(x=>x.phone===phone && x.pass===password);
    if(u){ setCurrentUser(u); setRole(u.role); }
    else { Alert.alert('Sio sahihi', 'Mgahawa: 0712345678 / 1234\nDereva: 0765432109 / 1234\nAdmin: 0776042014 / 0776042014'); }
  };

  const register = () => {
    if(!phone || !password || !name){ Alert.alert('Jaza zote'); return; }
    const newU = {phone, pass:password, name, role:'customer'};
    setUsers([...users, newU]); setCurrentUser(newU); setRole('customer');
  };

  const cancelOrder = (id, who) => {
    const o = orders.find(x=>x.id===id);
    if(!canCancel(o)){ Alert.alert('Muda umeisha - 2min tu'); return; }
    Alert.alert('Cancel?', 'Mkato 1000 TZS kwa usumbufu', [
      {text:'Hapana'}, {text:'CANCEL', onPress:()=> setOrders(orders.map(x=> x.id===id ? {...x, status:'CANCELED', canceledBy:who, penalty:1000} : x))}
    ]);
  };

  const updateStatus = (id, s) => {
    setOrders(orders.map(o=> o.id===id ? {...o, status:s, driverPhone: role==='driver' ? currentUser.phone : o.driverPhone} : o));
  };

  if(!role){
    return (
      <ScrollView style={{flex:1, backgroundColor:'#0A2342', padding:20}} contentContainerStyle={{flexGrow:1, justifyContent:'center'}}>
        <View style={{backgroundColor:'#0B3D91', padding:20, borderRadius:18, alignItems:'center'}}><Text style={{color:'white', fontSize:26, fontWeight:'900'}}>ZAN DELIVERY</Text><Text style={{color:'#FF7A00', fontWeight:'700'}}>Mix by YAS - 0776042014</Text></View>
        <View style={{backgroundColor:'white', padding:16, borderRadius:16, marginTop:16}}>
          <Text style={{fontWeight:'800'}}>Namba ya Simu</Text><TextInput value={phone} onChangeText={setPhone} placeholder="07XXXXXXXX" keyboardType="phone-pad" style={{backgroundColor:'#eee', padding:12, borderRadius:10, marginTop:6}}/>
          <Text style={{fontWeight:'800', marginTop:10}}>Password</Text><TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="1234" style={{backgroundColor:'#eee', padding:12, borderRadius:10, marginTop:6}}/>
          <TouchableOpacity onPress={login} style={{backgroundColor:'#0B3D91', padding:14, borderRadius:12, marginTop:14, alignItems:'center'}}><Text style={{color:'white', fontWeight:'900'}}>INGIA</Text></TouchableOpacity>
          <Text style={{fontWeight:'800', marginTop:14}}>Jisajili Mteja Mpya</Text>
          <TextInput value={name} onChangeText={setName} placeholder="Jina lako" style={{backgroundColor:'#eee', padding:12, borderRadius:10, marginTop:6}}/>
          <TouchableOpacity onPress={register} style={{backgroundColor:'#FF7A00', padding:14, borderRadius:12, marginTop:10, alignItems:'center'}}><Text style={{color:'white', fontWeight:'900'}}>JISAJILI</Text></TouchableOpacity>
          <View style={{backgroundColor:'#FFF3E0', padding:10, borderRadius:10, marginTop:12}}><Text style={{fontSize:10}}>Kujaribu: Mgahawa 0712345678/1234, Dereva 0765432109/1234, Admin 0776042014/0776042014</Text></View>
        </View>
      </ScrollView>
    );
  }

  if(role==='admin'){
    const active = orders.filter(o=>o.status!=='CANCELED'); const canceled = orders.filter(o=>o.status==='CANCELED');
    const profit = active.length*4000 + canceled.reduce((s,o)=>s+o.penalty,0);
    return (
      <ScrollView style={{flex:1, backgroundColor:'#0A2342', padding:12}}>
        <TouchableOpacity onPress={()=>setRole(null)}><Text style={{color:'#FF7A00'}}>← Toka Admin</Text></TouchableOpacity>
        <View style={{backgroundColor:'#FF7A00', padding:14, borderRadius:14, marginTop:8}}><Text style={{color:'white', fontWeight:'900'}}>👑 ADMIN - 0776042014 - Faida {profit} TZS</Text><Text style={{color:'white', fontSize:11}}>Active {active.length} - Canceled {canceled.length} - Mkato 1000 kila cancel</Text></View>
        {orders.map(o=>(
          <View key={o.id} style={{backgroundColor: o.status==='CANCELED' ? '#FFCCCC' : 'white', padding:10, borderRadius:10, marginTop:6}}>
            <Text style={{fontWeight:'700'}}>#{o.id} {o.food} - {o.status} {o.canceledBy ? `by ${o.canceledBy}` : ''}</Text><Text style={{fontSize:10}}>{o.customer} {o.customerPhone} - {o.pay} via {o.receiver} - {o.price+o.delivery} - {o.penalty ? `Mkato ${o.penalty}` : ''}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }

  if(role==='customer'){
    return (
      <ScrollView style={{flex:1, backgroundColor:'#f5f7fb', padding:12}}>
        <TouchableOpacity onPress={()=>setRole(null)}><Text>← Toka {currentUser.name}</Text></TouchableOpacity>
        <Text style={{fontWeight:'900', marginTop:8}}>Chagua Malipo - Mix by YAS</Text>
        <View style={{flexDirection:'row', gap:6, marginTop:6, flexWrap:'wrap'}}>
          {['CASH','M-Pesa','Tigo Pesa','Airtel Money'].map(p=>(
            <TouchableOpacity key={p} onPress={()=>setSelectedPay(p)} style={{padding:8, borderRadius:20, backgroundColor: selectedPay===p ? '#0B3D91' : 'white', borderWidth:1, borderColor:'#ddd'}}><Text style={{fontSize:10, color: selectedPay===p ? 'white' : 'black'}}>{p}</Text></TouchableOpacity>
          ))}
        </View>
        {[{name:'Biriani Kuku', price:15000},{name:'Pizza', price:12000},{name:'Zanzibar Mix', price:10000}].map((f,i)=>(
          <View key={i} style={{backgroundColor:'white', padding:12, borderRadius:12, marginTop:8, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View><Text style={{fontWeight:'800'}}>{f.name}</Text><Text style={{color:'#FF7A00'}}>{f.price+3000} TZS</Text></View>
            <TouchableOpacity onPress={()=>{
              const rec = selectedPay==='CASH' ? 'Dereva' : Math.random()>0.5 ? 'Mgahawa' : 'Dereva';
              const nO = {id: Math.floor(Math.random()*9000)+1000, customer:currentUser.name, customerPhone:currentUser.phone, food:f.name, price:f.price, delivery:3000, status:'NEW', pay:selectedPay, receiver:rec, createdAt: Date.now(), canceledBy:null, penalty:0, mgahawaPhone:'0712345678', driverPhone:''};
              setOrders([nO, ...orders]); Alert.alert('Oda imetumwa', `${f.name} - ${selectedPay} via ${rec}`);
            }} style={{backgroundColor:'#FF7A00', padding:10, borderRadius:8}}><Text style={{color:'white', fontWeight:'800'}}>ORDER {selectedPay}</Text></TouchableOpacity>
          </View>
        ))}
        <Text style={{fontWeight:'800', marginTop:12}}>Oda Zangu - Cancel 2min</Text>
        {orders.filter(o=>o.customerPhone===currentUser.phone).map(o=>(
          <View key={o.id} style={{backgroundColor:'white', padding:10, borderRadius:10, marginTop:6, borderLeftWidth:3, borderLeftColor: o.status==='CANCELED' ? 'red' : '#0B3D91'}}>
            <Text style={{fontWeight:'700'}}>#{o.id} {o.food} - {o.status} - {o.pay} via {o.receiver}</Text><Text style={{fontSize:10}}>{canCancel(o) ? `Cancel ${timeLeft(o)}s` : o.status}</Text>
            {canCancel(o) && <TouchableOpacity onPress={()=>cancelOrder(o.id,'MTEJA')} style={{backgroundColor:'red', padding:6, borderRadius:6, marginTop:4, alignItems:'center'}}><Text style={{color:'white', fontSize:10}}>CANCEL - 1000 MKATO</Text></TouchableOpacity>}
          </View>
        ))}
      </ScrollView>
    );
  }

  if(role==='mgahawa'){
    return (
      <ScrollView style={{flex:1, backgroundColor:'#f5f7fb', padding:12}}>
        <TouchableOpacity onPress={()=>setRole(null)}><Text>← Toka</Text></TouchableOpacity>
        <Text style={{fontWeight:'900', marginTop:8}}>MGAHAWA {currentUser.name}</Text>
        {orders.filter(o=>o.status!=='Delivered' && o.status!=='CANCELED').map(o=>(
          <View key={o.id} style={{backgroundColor:'white', padding:10, borderRadius:10, marginTop:6}}>
            <Text style={{fontWeight:'700'}}>#{o.id} {o.food} - {o.pay} {o.receiver} - {o.status}</Text><Text style={{fontSize:10}}>{o.receiver==='Mgahawa' ? `POKEA ${o.price} ${o.pay}` : 'Dereva ataleta'} - {canCancel(o) ? `${timeLeft(o)}s` : ''}</Text>
            <View style={{flexDirection:'row', gap:6, marginTop:4}}>
              {o.status==='NEW' && <TouchableOpacity onPress={()=>updateStatus(o.id,'Preparing')} style={{flex:1, backgroundColor:'#0B3D91', padding:8, borderRadius:6, alignItems:'center'}}><Text style={{color:'white', fontSize:10}}>KUBALI</Text></TouchableOpacity>}
              {o.status==='Preparing' && <TouchableOpacity onPress={()=>updateStatus(o.id,'Ready')} style={{flex:1, backgroundColor:'green', padding:8, borderRadius:6, alignItems:'center'}}><Text style={{color:'white', fontSize:10}}>TAYARI</Text></TouchableOpacity>}
              {canCancel(o) && <TouchableOpacity onPress={()=>cancelOrder(o.id,'MGAHAWA')} style={{flex:1, backgroundColor:'red', padding:8, borderRadius:6, alignItems:'center'}}><Text style={{color:'white', fontSize:10}}>CANCEL</Text></TouchableOpacity>}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }

  if(role==='driver'){
    return (
      <ScrollView style={{flex:1, backgroundColor:'#f5f7fb', padding:12}}>
        <TouchableOpacity onPress={()=>setRole(null)}><Text>← Toka</Text></TouchableOpacity>
        <Text style={{fontWeight:'900', marginTop:8}}>DEREVA {currentUser.name}</Text>
        {orders.filter(o=>o.status==='Ready' || o.status==='In Route' || o.status==='NEW').filter(o=>o.status!=='CANCELED').map(o=>(
          <View key={o.id} style={{backgroundColor:'white', padding:10, borderRadius:10, marginTop:6}}>
            <Text style={{fontWeight:'700'}}>#{o.id} {o.food} - {o.status} - {o.pay} via {o.receiver}</Text><Text style={{fontSize:10}}>{o.receiver==='Dereva' ? `WEWE KUSANYA ${o.price+o.delivery} ${o.pay}` : 'Mgahawa ameshapewa'}</Text>
            <View style={{flexDirection:'row', gap:6, marginTop:4}}>
              {o.status==='Ready' && <TouchableOpacity onPress={()=>updateStatus(o.id,'In Route')} style={{flex:1, backgroundColor:'#0B3D91', padding:8, borderRadius:6, alignItems:'center'}}><Text style={{color:'white', fontSize:10}}>CHUKUA</Text></TouchableOpacity>}
              {o.status==='In Route' && <TouchableOpacity onPress={()=>updateStatus(o.id,'Delivered')} style={{flex:1, backgroundColor:'green', padding:8, borderRadius:6, alignItems:'center'}}><Text style={{color:'white', fontSize:10}}>FIKISHA</Text></TouchableOpacity>}
              {canCancel(o) && <TouchableOpacity onPress={()=>cancelOrder(o.id,'DEREVA')} style={{flex:1, backgroundColor:'red', padding:8, borderRadius:6, alignItems:'center'}}><Text style={{color:'white', fontSize:10}}>CANCEL</Text></TouchableOpacity>}
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }
}