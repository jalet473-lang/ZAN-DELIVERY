// ZAN DELIVERY - FINAL LAUNCH V2 - DARK MODE + FINGERPRINT + PASSWORD OPTIONS + GRID DASHBOARD
// Logo: zan-logo.png
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert, Image, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADMIN = { simu: '0776042014', password: 'ZAN2026', jina: 'Admin ZAN' };
const SABABU = ['Sina muda sasa', 'Vifaa vimeisha', 'Eneo mbali sana', 'Bei ndogo sana', 'Duka limefungwa'];

export default function App() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [maoniList, setMaoniList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [screen, setScreen] = useState('welcome');
  const [role, setRole] = useState('mteja');
  const [jina, setJina] = useState('');
  const [simu, setSimu] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ujuzi, setUjuzi] = useState('');
  const [beiKuanzia, setBeiKuanzia] = useState('');
  const [eneo, setEneo] = useState('');
  const [gali, setGali] = useState('');
  const [transport, setTransport] = useState('mwenyewe');
  const [safariAina, setSafariAina] = useState('peleka-tu');
  const [maelezo, setMaelezo] = useState('');
  const [promo, setPromo] = useState('');
  const [customFood, setCustomFood] = useState('');
  const [customQty, setCustomQty] = useState('1');
  const [kataaSababu, setKataaSababu] = useState('');
  const [kataaOther, setKataaOther] = useState('');
  const [showKataa, setShowKataa] = useState(null);
  const [maoni, setMaoni] = useState('');
  const [chat, setChat] = useState('');
  // MPYA
  const [darkMode, setDarkMode] = useState(false);
  const [fingerprintOn, setFingerprintOn] = useState(false);
  const [savedUser, setSavedUser] = useState(null);
  const [dashTab, setDashTab] = useState('grid'); // grid | chakula | fundi | dereva | oda | calculator | maoni | settings
  const [km, setKm] = useState('');
  const [calcResult, setCalcResult] = useState(null);
 // ZAN DELIVERY - LIPA NAMBA + COMMISSION
const [lipaNamba, setLipaNamba] = useState('');
const [zanLipaNamba, setZanLipaNamba] = useState('0776042014');
const [deniLililolipwa, setDeniLililolipwa] = useState({});
  // RANGI - DARK / LIGHT
  const C = darkMode ? {
    blue: '#1E90FF', deepBlue: '#FFFFFF', lightBlue: '#2A2A2A', orange: '#FF7A00', orangeLight: '#3A2A1A',
    white: '#2B2B2B', bg: '#1A1A1A', dark: '#FFFFFF', gray: '#BBBBBB', green: '#22C55E', red: '#FF5555', purple: '#A78BFA', card: '#2B2B2B', border: '#444'
  } : {
    blue: '#007AFF', deepBlue: '#0A1F44', lightBlue: '#EAF3FF', orange: '#FF7A00', orangeLight: '#FFF1E0',
    white: '#FFFFFF', bg: '#F0F6FF', dark: '#111827', gray: '#6B7280', green: '#22C55E', red: '#EF4444', purple: '#7C3AED', card: '#FFFFFF', border: '#E5E7EB'
  };

  useEffect(() => {
    (async () => {
      const u = await AsyncStorage.getItem('zan_users_final');
      const o = await AsyncStorage.getItem('zan_orders_final');
      const m = await AsyncStorage.getItem('zan_maoni_final');
      const s = await AsyncStorage.getItem('zan_session_final');
      const d = await AsyncStorage.getItem('zan_dark');
      const f = await AsyncStorage.getItem('zan_fingerprint');
      const sv = await AsyncStorage.getItem('zan_saved_user');
      if (u) setUsers(JSON.parse(u));
      if (o) setOrders(JSON.parse(o));
      if (m) setMaoniList(JSON.parse(m));
      if (d) setDarkMode(JSON.parse(d));
      if (f) setFingerprintOn(JSON.parse(f));
      if (sv) setSavedUser(JSON.parse(sv));
      if (s) { setCurrentUser(JSON.parse(s)); setScreen('home'); }
    })();
  }, []);

  const saveUsers = async (l) => { setUsers(l); await AsyncStorage.setItem('zan_users_final', JSON.stringify(l)); };
  const saveOrders = async (l) => { setOrders(l); await AsyncStorage.setItem('zan_orders_final', JSON.stringify(l)); };
  const toggleDark = async (v) => { setDarkMode(v); await AsyncStorage.setItem('zan_dark', JSON.stringify(v)); };
  const toggleFinger = async (v) => {
    setFingerprintOn(v); await AsyncStorage.setItem('zan_fingerprint', JSON.stringify(v));
    if (v && currentUser) await AsyncStorage.setItem('zan_saved_user', JSON.stringify(currentUser));
    Alert.alert(v ? 'Fingerprint Imewashwa' : 'Fingerprint Imezimwa', v ? 'Sasa utaweza kuingia kwa kidole' : 'Utaingia kwa password tu');
  };
  const loginWithFinger = async () => {
    if (!savedUser) { Alert.alert('Hakuna Akaunti', 'Ingia kwanza na password, halafu washa Fingerprint kwenye Settings'); return; }
    // Kwenye Snack hii ni simulated - kwenye App halisi hapa ndipo kidole kinachunguzwa
    Alert.alert('👆 Weka Kidole...', 'Inathibitisha...', [{ text: 'Thibitisha', onPress: async () => {
      setCurrentUser(savedUser); setScreen('home'); await AsyncStorage.setItem('zan_session_final', JSON.stringify(savedUser));
      Alert.alert('Karibu ' + savedUser.jina, 'Umeingia kwa Fingerprint');
    }}, { text: 'Ghairi' }]);
  };

  const goBack = () => { if (screen === 'home' && dashTab !== 'grid') { setDashTab('grid'); return; } setScreen('welcome'); };
  const goNext = () => {
    if (screen === 'welcome') setScreen('register');
    else if (screen === 'register') setScreen('login');
    else if (screen === 'login') setScreen('register');
    else setScreen('home');
  };

  const handleRegister = async () => {
    if (!jina || !simu || !password) { Alert.alert('Kosa', 'Jaza jina, simu na password'); return; }
    if (simu.length < 10) { Alert.alert('Kosa', 'Namba si sahihi'); return; }
    if (users.find(x => x.simu === simu) || simu === ADMIN.simu) { Alert.alert('Namba Isha tumika!', 'Ingia au tumia namba nyingine'); return; }
    const nu = { id: Date.now().toString(), jina, simu, password, role, ujuzi: role === 'fundi' ? ujuzi : '', beiKuanzia: role === 'fundi' ? beiKuanzia : '', eneo, gali: role === 'dereva' ? gali : '', rating: 5 };
    const list = [...users, nu]; await saveUsers(list);
    await AsyncStorage.setItem('zan_session_final', JSON.stringify(nu));
    await AsyncStorage.setItem('zan_saved_user', JSON.stringify(nu)); setSavedUser(nu);
    setCurrentUser(nu); setScreen('home'); Alert.alert('Karibu ' + jina, 'Umefanikiwa kama ' + role.toUpperCase());
  };
  const handleLogin = async () => {
    if (simu === ADMIN.simu && password === ADMIN.password) { const a = { ...ADMIN, role: 'admin' }; setCurrentUser(a); setScreen('home'); await AsyncStorage.setItem('zan_session_final', JSON.stringify(a)); return; }
    const f = users.find(x => x.simu === simu && x.password === password);
    if (!f) { Alert.alert('Kosa', 'Simu au password sio sahihi'); return; }
    setCurrentUser(f); setScreen('home'); await AsyncStorage.setItem('zan_session_final', JSON.stringify(f));
    await AsyncStorage.setItem('zan_saved_user', JSON.stringify(f)); setSavedUser(f);
  };
  const handleResetPassword = async () => {
    if (!simu || !newPassword || !confirmPassword) { Alert.alert('Kosa', 'Jaza simu, password mpya na thibitisha'); return; }
    if (newPassword !== confirmPassword) { Alert.alert('Kosa', 'Password mpya hazifanani'); return; }
    if (newPassword.length < 4) { Alert.alert('Kosa', 'Password mpya iwe angalau herufi 4'); return; }
    if (simu === ADMIN.simu) { Alert.alert('Kosa', 'Password ya Admin haiwezi kubadilishwa hapa'); return; }
    const f = users.find(x => x.simu === simu);
    if (!f) { Alert.alert('Kosa', 'Hakuna akaunti yenye namba hii. Jisajili kwanza'); return; }
    const list = users.map(x => x.simu === simu ? { ...x, password: newPassword } : x);
    await saveUsers(list);
    setPassword(newPassword); setNewPassword(''); setConfirmPassword('');
    Alert.alert('Hongera!', 'Password imebadilishwa. Sasa ingia na password mpya');
    setScreen('login');
  };
  const logout = async () => { await AsyncStorage.removeItem('zan_session_final'); setCurrentUser(null); setScreen('welcome'); setSimu(''); setPassword(''); setDashTab('grid'); };

  const agiza = async (item, muuzaji, isCustom = false) => {
    let safariText = transport === 'mwenyewe' ? 'Mteja ataenda mwenyewe' : transport === 'mteja-analipia' ? `Dereva - MTEJA atalipia - ${safariAina === 'peleka-rudisha' ? 'MPELEKE + UMRUDISHE' : 'MPELEKE TU'}` : `Dereva - MUUZAJI atalipia - ${safariAina === 'peleka-rudisha' ? 'PELEKA + RUDISHA' : 'PELEKA TU'} - Free Delivery`;
    let beiFinal = item.beiKuanzia || item.bei || 'Kujadiliwa';
    if (promo.toUpperCase() === 'ZAN10') beiFinal = typeof beiFinal === 'number' ? Math.round(beiFinal * 0.9) : beiFinal + ' - Punguzo 10% ZAN10';
    const no = { id: '#' + Math.floor(1000 + Math.random() * 9000), mteja: currentUser.jina, mtejaSimu: currentUser.simu, muuzaji: muuzaji.jina, muuzajiSimu: muuzaji.simu, muuzajiRole: muuzaji.role, item: isCustom ? `Custom: ${customFood} x${customQty}` : (item.jina || item.ujuzi || 'Huduma'), bei: beiFinal, transport, safariAina, safariText, naniAnalipia: transport === 'mwenyewe' ? 'hakuna' : transport === 'mteja-analipia' ? 'mteja' : 'muuzaji', maelezo, status: 'Inasubiri', dereva: null, time: new Date().toLocaleString() };
    await saveOrders([...orders, no]); Alert.alert('Oda Imetumwa!', `${no.item}\n${safariText}`); setMaelezo(''); setCustomFood(''); setDashTab('oda');
  };
  const kubaliOda = async (o) => { const l = orders.map(x => x.id === o.id ? { ...x, status: 'Imekubaliwa', dereva: currentUser.role === 'dereva' ? currentUser.jina : x.dereva } : x); await saveOrders(l); Alert.alert('Sawa', 'Umeikubali'); };
  const itaDereva = async (o) => { const l = orders.map(x => x.id === o.id ? { ...x, status: 'Dereva Anatafutwa', naniAnalipia: 'muuzaji', safariText: x.safariText + ' | Muuzaji ameita Dereva' } : x); await saveOrders(l); Alert.alert('Dereva Ameitwa', 'Wewe utalipia, Mteja Free Delivery'); };
  const kataaOda = async (o) => {
    const f = kataaSababu === 'other' ? kataaOther : kataaSababu;
    if (!f) { Alert.alert('Chagua sababu'); return; }
    const l = orders.map(x => x.id === o.id ? { ...x, status: 'IMEKATAA', sababuKukataa: f } : x);
    await saveOrders(l); setShowKataa(null); setKataaSababu(''); setKataaOther(''); Alert.alert('Imekataliwa', f);
  };
  const malizaOda = async (o) => { const l = orders.map(x => x.id === o.id ? { ...x, status: 'Imeshafika / Imemalika' } : x); await saveOrders(l); };
  const tumaMaoni = async () => {
    if (!maoni) return;
    const m = { id: Date.now().toString(), jina: currentUser.jina, role: currentUser.role, maoni };
    const l = [...maoniList, m]; setMaoniList(l); await AsyncStorage.setItem('zan_maoni_final', JSON.stringify(l)); setMaoni(''); Alert.alert('Asante!', 'Maoni yamepokelewa');
  };
  const calcDelivery = () => {
    const k = parseFloat(km) || 0;
    const fee = 1000 + (k * 500);
    setCalcResult({ km: k, fee, total: fee });
  };

  const Logo = ({ big = false }) => (
    <View style={{ alignItems: 'center', marginVertical: big ? 8 : 4 }}>
      <Image source={require('./zan-logo.png')} style={{ width: big ? 200 : 120, height: big ? 200 : 120, resizeMode: 'contain' }} />
    </View>
  );
  const Header = ({ title }) => (
    <View style={styles(C).header}>
      <TouchableOpacity onPress={goBack} style={styles(C).navBtn}><Text style={styles(C).navText}>← Back</Text></TouchableOpacity>
      <Text style={styles(C).headerTitle}>{title}</Text>
      <TouchableOpacity onPress={() => toggleDark(!darkMode)} style={[styles(C).navBtn, { backgroundColor: C.orange, borderColor: C.orange }]}><Text style={{ color: '#fff', fontWeight: 'bold' }}>{darkMode ? '☀️' : '🌙'}</Text></TouchableOpacity>
    </View>
  );

  const s = styles(C);

  if (screen === 'welcome') return (
    <ScrollView style={s.container}>
      <Header title="ZAN DELIVERY" />
      <View style={s.hero3d}><Logo big /><Text style={s.heroTitle}>Chakula • Fundi • Dereva</Text><Text style={s.heroSub}>Haraka, Salama, Zanzibar Yote</Text></View>
      <Text style={s.cardTitle}>Wewe ni nani?</Text>
      {['mteja', 'fundi', 'mgahawa', 'dereva'].map(r => (
        <TouchableOpacity key={r} style={s.role3d} onPress={() => { setRole(r); setScreen('register'); }}>
          <Text style={s.roleIcon}>{r === 'mteja' ? '🛒' : r === 'fundi' ? '🔧' : r === 'mgahawa' ? '🍔' : '🛵'}</Text>
          <View><Text style={s.roleText}>{r === 'mteja' ? 'MTEJA' : r === 'fundi' ? 'FUNDI' : r === 'mgahawa' ? 'MGAHAWA' : 'DEREVA'}</Text><Text style={{ color: C.gray, fontSize: 12 }}>{r === 'mteja' ? 'Naagiza Chakula / Fundi' : r === 'fundi' ? 'Nafanya Kazi' : r === 'mgahawa' ? 'Nauza Chakula' : 'Nafikisha Oda'}</Text></View>
          <Text style={{ marginLeft: 'auto', fontSize: 20, color: C.blue }}>›</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => setScreen('login')}><Text style={{ color: C.blue, textAlign: 'center', marginTop: 16, fontWeight: 'bold' }}>Nina Akaunti Tayari - Ingia</Text></TouchableOpacity>
      {fingerprintOn && savedUser && (
        <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.deepBlue }]} onPress={loginWithFinger}><Text style={s.mainBtnText}>👆 INGIA NA FINGERPRINT - {savedUser.jina}</Text></TouchableOpacity>
      )}
      <Text style={s.footer}>Admin: 0776042014 / ZAN2026</Text>
    </ScrollView>
  );

  if (screen === 'forgot') return (
    <ScrollView style={s.container}>
      <Header title="RESET PASSWORD" /><Logo />
      <Text style={s.logoBig}>Umesahau Password?</Text>
      <Text style={{ textAlign: 'center', color: C.gray, marginTop: 6 }}>Andika namba uliyojisajilia, halafu password mpya</Text>
      <Text style={s.label}>Namba ya Simu</Text><TextInput style={s.input3d} value={simu} onChangeText={setSimu} placeholder="07XX XXX XXX" keyboardType="phone-pad" placeholderTextColor={C.gray} />
      <Text style={s.label}>Password Mpya</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput style={[s.input3d, { flex: 1 }]} value={newPassword} onChangeText={setNewPassword} placeholder="Password mpya" secureTextEntry={!showPass} placeholderTextColor={C.gray} />
        <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{ marginLeft: 8 }}><Text style={{ fontSize: 22 }}>{showPass ? '👁️' : '🙈'}</Text></TouchableOpacity>
      </View>
      <Text style={s.label}>Thibitisha Password Mpya</Text><TextInput style={s.input3d} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Andika tena" secureTextEntry={!showPass} placeholderTextColor={C.gray} />
      <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.orange }]} onPress={handleResetPassword}><Text style={s.mainBtnText}>BADILISHA PASSWORD</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen('login')}><Text style={{ textAlign: 'center', marginTop: 12, color: C.blue }}>Nimekumbuka - Rudi Kuingia</Text></TouchableOpacity>
    </ScrollView>
  );

  if (screen === 'register' || screen === 'login') return (
    <ScrollView style={s.container}>
      <Header title={screen === 'register' ? 'JISAJILI' : 'INGIA'} /><Logo />
      <Text style={s.logoBig}>{screen === 'register' ? 'Jisajili kama ' + role.toUpperCase() : 'Karibu Tena'}</Text>
      <Text style={s.label}>Jina Kamili</Text><TextInput style={s.input3d} value={jina} onChangeText={setJina} placeholder="Mfano: Juma Ali" placeholderTextColor={C.gray} />
      <Text style={s.label}>Namba ya Simu</Text><TextInput style={s.input3d} value={simu} onChangeText={setSimu} placeholder="07XX XXX XXX" keyboardType="phone-pad" placeholderTextColor={C.gray} />
      <Text style={s.label}>Password</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput style={[s.input3d, { flex: 1 }]} value={password} onChangeText={setPassword} placeholder="****" secureTextEntry={!showPass} placeholderTextColor={C.gray} />
        <TouchableOpacity onPress={() => setShowPass(!showPass)} style={{ marginLeft: 8 }}><Text style={{ fontSize: 22 }}>{showPass ? '👁️' : '🙈'}</Text></TouchableOpacity>
      </View>
      {screen === 'login' && (
        <>
          <TouchableOpacity onPress={() => setScreen('forgot')}><Text style={{ textAlign: 'right', marginTop: 8, color: C.orange, fontWeight: 'bold' }}>Umesahau Password? Bonyeza Hapa →</Text></TouchableOpacity>
          {fingerprintOn && savedUser && (
            <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.deepBlue }]} onPress={loginWithFinger}><Text style={s.mainBtnText}>👆 INGIA NA FINGERPRINT</Text></TouchableOpacity>
          )}
        </>
      )}
      {screen === 'register' && role === 'fundi' && (<>
        <Text style={s.label}>Ujuzi Wako</Text><TextInput style={s.input3d} value={ujuzi} onChangeText={setUjuzi} placeholder="Umeme, Plumbing..." placeholderTextColor={C.gray} />
        <Text style={s.label}>Bei ya Kuanzia (TZS)</Text><TextInput style={s.input3d} value={beiKuanzia} onChangeText={setBeiKuanzia} placeholder="Mfano: 5000" keyboardType="numeric" placeholderTextColor={C.gray} />
      </>)}
      {screen === 'register' && role === 'dereva' && (<><Text style={s.label}>Una Gari Gani?</Text><TextInput style={s.input3d} value={gali} onChangeText={setGali} placeholder="Bajaji / Pikipiki / Gari" placeholderTextColor={C.gray} /></>)}
      {screen === 'register' && <><Text style={s.label}>Eneo Lako</Text><TextInput style={s.input3d} value={eneo} onChangeText={setEneo} placeholder="Mjini, Mbuzini..." placeholderTextColor={C.gray} /></>}
      <TouchableOpacity style={s.mainBtn3d} onPress={screen === 'register' ? handleRegister : handleLogin}><Text style={s.mainBtnText}>{screen === 'register' ? 'JISAJILI' : 'INGIA'}</Text></TouchableOpacity>
      <TouchableOpacity onPress={() => setScreen(screen === 'register' ? 'login' : 'register')}><Text style={{ textAlign: 'center', marginTop: 12, color: C.blue }}>{screen === 'register' ? 'Nina akaunti - Ingia' : 'Sina akaunti - Jisajili'}</Text></TouchableOpacity>
    </ScrollView>
  );

  const fundis = users.filter(u => u.role === 'fundi');
  const migahawa = users.filter(u => u.role === 'mgahawa');
  const madereva = users.filter(u => u.role === 'dereva');
  const myOrders = orders.filter(o => o.mtejaSimu === currentUser.simu || o.muuzajiSimu === currentUser.simu || currentUser.role === 'admin' || (currentUser.role === 'dereva' && o.status === 'Dereva Anatafutwa'));
  const sampleFood = [
    { jina: 'Stone Pizza', muuzaji: 'Stone Pizza', bei: 20000, desc: 'Pizza cheese • 4.5 (18 reviews)' },
    { jina: 'Biriani Kuku', muuzaji: 'Forodhani Food', bei: 15000, desc: 'Biriani Kuku • 4.8 • Bithaa' },
  ];

  // ===== GRID TILE - KAMA PICHA ULIOYOTUMA =====
  const Tile = ({ icon, label, onPress, color }) => (
    <TouchableOpacity onPress={onPress} style={[s.tile, { backgroundColor: C.card, borderColor: C.border }]}>
      <Text style={{ fontSize: 36 }}>{icon}</Text>
      <Text style={[s.tileLabel, { color: C.dark }]}>{label}</Text>
      {color && <View style={{ width: 30, height: 4, backgroundColor: color, borderRadius: 2, marginTop: 6 }} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={s.container}>
      <Header title="DASHBOARD" />
      <View style={s.topBar}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={require('./zan-logo.png')} style={{ width: 44, height: 44, borderRadius: 22, marginRight: 10 }} />
          <View style={{ flex: 1 }}><Text style={{ fontWeight: 'bold', fontSize: 16, color: C.dark }}>Karibu {currentUser.jina} 👋</Text><Text style={{ color: C.gray, fontSize: 12 }}>{currentUser.role.toUpperCase()} • {currentUser.simu} • ⭐ {currentUser.rating || 5}</Text></View>
          <TouchableOpacity onPress={() => toggleDark(!darkMode)} style={{ backgroundColor: darkMode ? '#FFF' : '#111', padding: 8, borderRadius: 20 }}><Text>{darkMode ? '☀️' : '🌙'}</Text></TouchableOpacity>
        </View>
      </View>

      {/* GRID DASHBOARD - KAMA PICHA */}
      {dashTab === 'grid' && (
        <>
          <View style={s.dashRow}>
            <View style={[s.dash3d, { backgroundColor: C.blue }]}><Text style={s.dashNum}>{users.length}</Text><Text style={s.dashLabel}>Watumiaji</Text></View>
            <View style={[s.dash3d, { backgroundColor: C.orange }]}><Text style={s.dashNum}>{orders.length}</Text><Text style={s.dashLabel}>Oda Zote</Text></View>
            <View style={[s.dash3d, { backgroundColor: C.green }]}><Text style={s.dashNum}>{orders.filter(o => o.status.includes('Imeshafika')).length}</Text><Text style={s.dashLabel}>Zimefika</Text></View>
          </View>

          {currentUser.role === 'mteja' && (
            <View style={s.promoBox}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: C.dark }}>🎁 PROMO CODE - ZAN10 = -10%</Text>
              <View style={{ flexDirection: 'row', marginTop: 8 }}>
                <TextInput style={[s.input3d, { flex: 1, marginTop: 0 }]} value={promo} onChangeText={setPromo} placeholder="Mfano: ZAN10" placeholderTextColor={C.gray} />
                <TouchableOpacity style={[s.mainBtn3d, { marginTop: 0, marginLeft: 8, paddingHorizontal: 18 }]} onPress={() => Alert.alert(promo.toUpperCase() === 'ZAN10' ? 'Promo Imekubaliwa!' : 'Promo si sahihi', promo.toUpperCase() === 'ZAN10' ? 'Utapata punguzo 10%' : 'Jaribu ZAN10')}><Text style={s.mainBtnText}>APPLY</Text></TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={s.cardTitle}>Chagua Huduma</Text>
          <View style={s.grid}>
            <Tile icon="🍔" label="Agiza Chakula" color={C.orange} onPress={() => setDashTab('chakula')} />
            <Tile icon="🔧" label="Fundi" color={C.blue} onPress={() => setDashTab('fundi')} />
            <Tile icon="🛵" label="Dereva" color={C.green} onPress={() => setDashTab('dereva')} />
            <Tile icon="📦" label="Oda Zangu" color={C.purple} onPress={() => setDashTab('oda')} />
            <Tile icon="🧮" label="Calculator" color={C.blue} onPress={() => setDashTab('calculator')} />
            <Tile icon="💬" label="Maoni / Complaints" color={C.red} onPress={() => setDashTab('maoni')} />
            <Tile icon="🎁" label="Promo / Benefit" color={C.orange} onPress={() => { Alert.alert('Benefit', 'Tumia ZAN10 kupata -10% kwa oda yako ya kwanza'); }} />
            <Tile icon="📄" label="Statement" color={C.blue} onPress={() => setDashTab('oda')} />
            <Tile icon="⚙️" label="Settings" color={C.gray} onPress={() => setDashTab('settings')} />
          </View>

          {currentUser.role === 'admin' && (<>
            <Text style={s.cardTitle}>👑 ADMIN - Watu Wote ({users.length})</Text>
            {users.map(u => <Text key={u.id} style={{ color: C.dark }}>• {u.jina} - {u.role} - {u.simu} - {u.eneo}</Text>)}
            <Text style={{ marginTop: 10, fontWeight: 'bold', color: C.dark }}>Maoni ({maoniList.length}):</Text>
            {maoniList.map(m => <Text key={m.id} style={{ color: C.dark }}>• {m.jina}: {m.maoni}</Text>)}
          </>)}
        </>
      )}

      {/* CHAKULA */}
      {dashTab === 'chakula' && currentUser.role === 'mteja' && (<>
        <Text style={s.cardTitle}>🍔 Migahawa</Text>
        {migahawa.length === 0 ? sampleFood.map((f, i) => (
          <View key={i} style={s.card3d}><Text style={{ fontWeight: 'bold', fontSize: 16, color: C.dark }}>{f.muuzaji}</Text><Text style={{ color: C.gray }}>{f.desc}</Text><Text style={{ fontWeight: 'bold', color: C.blue, marginTop: 4 }}>{f.jina} - {f.bei} TZS • Delivery 1,000</Text><TouchableOpacity style={s.mainBtn3d} onPress={() => agiza({ jina: f.jina, bei: f.bei }, { jina: f.muuzaji, simu: '0711111111', role: 'mgahawa' })}><Text style={s.mainBtnText}>ORDER SASA</Text></TouchableOpacity></View>
        )) : migahawa.map(m => (
          <View key={m.id} style={s.card3d}><Text style={{ fontWeight: 'bold', fontSize: 16, color: C.dark }}>{m.jina}</Text><Text style={{ color: C.gray }}>📍 {m.eneo} • ⭐ {m.rating}</Text>
            <Text style={{ marginTop: 6, fontWeight: 'bold', color: C.dark }}>Chagua Usafiri:</Text>
            {[{ k: 'mwenyewe', t: '🚶 Nitachukua Mwenyewe' }, { k: 'mteja-analipia', t: '🛵 Niite Dereva - Mimi Nitalipia' }, { k: 'muuzaji-analipia', t: '🎁 Mgahawa Amlipie - Free Delivery' }].map(o => (<TouchableOpacity key={o.k} style={[s.transportOpt, transport === o.k && s.transportActive]} onPress={() => setTransport(o.k)}><Text style={{ color: C.dark }}>{o.t}</Text></TouchableOpacity>))}
            <Text style={{ marginTop: 10, fontWeight: 'bold', color: C.dark }}>Safari:</Text>
            <TouchableOpacity style={[s.transportOpt, safariAina === 'peleka-tu' && s.transportActive]} onPress={() => setSafariAina('peleka-tu')}><Text style={{ color: C.dark }}>➡️ Peleka Tu</Text></TouchableOpacity>
            <TouchableOpacity style={[s.transportOpt, safariAina === 'peleka-rudisha' && s.transportActive]} onPress={() => setSafariAina('peleka-rudisha')}><Text style={{ color: C.dark }}>🔁 Peleka + Rudisha</Text></TouchableOpacity>
            <TouchableOpacity style={s.mainBtn3d} onPress={() => agiza({ jina: 'Oda ya Chakula', bei: 'Kujadiliwa' }, m)}><Text style={s.mainBtnText}>AGIZA CHAKULA</Text></TouchableOpacity></View>
        ))}
        <View style={s.card3d}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: C.dark }}>✍️ ANDIKA CHAKULA UNAKOTAKA + IDADI + TAREHE</Text>
          <TextInput style={s.input3d} placeholder="Mfano: Samaki wa Kukaanga..." value={customFood} onChangeText={setCustomFood} placeholderTextColor={C.gray} />
          <TextInput style={s.input3d} placeholder="Idadi - Mfano: 1, 2, 3" value={customQty} onChangeText={setCustomQty} keyboardType="numeric" placeholderTextColor={C.gray} />
          <TextInput style={s.input3d} placeholder="Maelezo / Tarehe - Mfano: Leo saa 2" value={maelezo} onChangeText={setMaelezo} placeholderTextColor={C.gray} />
          <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.orange }]} onPress={() => { if (!customFood) { Alert.alert('Andika chakula kwanza'); return; } agiza({ jina: 'Custom', bei: 'Kujadiliwa' }, { jina: 'Mgahawa yeyote', simu: '0711111111', role: 'mgahawa' }, true); }}><Text style={s.mainBtnText}>TUMA ODA YA CUSTOM / KESHO</Text></TouchableOpacity>
        </View>
      </>)}

      {/* FUNDI */}
      {dashTab === 'fundi' && (<>
        <Text style={s.cardTitle}>🔧 Fundi Wapo ({fundis.length})</Text>
        {fundis.length === 0 && <Text style={{ color: C.dark }}>Hakuna Fundi bado. Jisajili kama Fundi uone hapa.</Text>}
        {fundis.map(f => (
          <View key={f.id} style={s.card3d}><Text style={{ fontWeight: 'bold', fontSize: 16, color: C.dark }}>{f.jina} • {f.ujuzi}</Text><Text style={{ color: C.gray }}>📍 {f.eneo || 'Zanzibar'} • ⭐ {f.rating}</Text><Text style={{ color: C.blue, fontWeight: 'bold' }}>Bei inaanzia {f.beiKuanzia || 'Kujadiliwa'} TZS</Text>
            <Text style={{ marginTop: 8, fontWeight: 'bold', color: C.dark }}>Chagua Usafiri:</Text>
            {[{ k: 'mwenyewe', t: '🚶 Nitaenda Mwenyewe' }, { k: 'mteja-analipia', t: '🛵 Niite Dereva - Mimi Nitalipia' }, { k: 'muuzaji-analipia', t: '🎁 Fundi Amlipie Dereva' }].map(o => (<TouchableOpacity key={o.k} style={[s.transportOpt, transport === o.k && s.transportActive]} onPress={() => setTransport(o.k)}><Text style={{ color: C.dark }}>{o.t}</Text></TouchableOpacity>))}
            <Text style={{ marginTop: 10, fontWeight: 'bold', color: C.dark }}>Safari ya Fundi:</Text>
            <TouchableOpacity style={[s.transportOpt, safariAina === 'peleka-tu' && s.transportActive]} onPress={() => setSafariAina('peleka-tu')}><Text style={{ color: C.dark }}>➡️ Mpeleke Tu - One Way</Text></TouchableOpacity>
            <TouchableOpacity style={[s.transportOpt, safariAina === 'peleka-rudisha' && s.transportActive]} onPress={() => setSafariAina('peleka-rudisha')}><Text style={{ color: C.dark }}>🔁 Mpeleke + Umrudishe - Round Trip</Text></TouchableOpacity>
            <TextInput style={s.input3d} placeholder="Eleza tatizo..." value={maelezo} onChangeText={setMaelezo} placeholderTextColor={C.gray} />
            <TouchableOpacity style={s.mainBtn3d} onPress={() => agiza(f, f)}><Text style={s.mainBtnText}>MUITE FUNDI HUYU</Text></TouchableOpacity></View>
        ))}
      </>)}

      {/* DEREVA */}
      {dashTab === 'dereva' && (<>
        <Text style={s.cardTitle}>🛵 Dereva Wapo ({madereva.length})</Text>
        {madereva.map(d => (
          <View key={d.id} style={s.card3d}><Text style={{ fontWeight: 'bold', color: C.dark }}>{d.jina} - {d.gali}</Text><Text style={{ color: C.gray }}>📍 {d.eneo} • ⭐ {d.rating}</Text><TouchableOpacity style={s.mainBtn3d} onPress={() => agiza({ jina: 'Safari ya Dereva', bei: 'Kujadiliwa' }, d)}><Text style={s.mainBtnText}>NIITE DEREVA HUYU</Text></TouchableOpacity></View>
        ))}
      </>)}

      {/* CALCULATOR */}
      {dashTab === 'calculator' && (
        <View style={s.card3d}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: C.dark }}>🧮 CALCULATOR - Bei ya Delivery</Text>
          <Text style={{ color: C.gray, marginTop: 4 }}>Bei ya Msingi 1,000 TZS + 500 TZS kwa kila KM</Text>
          <Text style={s.label}>Umbali (KM)</Text>
          <TextInput style={s.input3d} placeholder="Mfano: 5" value={km} onChangeText={setKm} keyboardType="numeric" placeholderTextColor={C.gray} />
          <TouchableOpacity style={s.mainBtn3d} onPress={calcDelivery}><Text style={s.mainBtnText}>HESABU BEI</Text></TouchableOpacity>
          {calcResult && (
            <View style={{ marginTop: 12, backgroundColor: C.lightBlue, padding: 12, borderRadius: 12 }}>
              <Text style={{ color: C.dark, fontWeight: 'bold' }}>Umbali: {calcResult.km} KM</Text>
              <Text style={{ color: C.dark, fontWeight: 'bold', fontSize: 18 }}>Delivery: {calcResult.fee} TZS</Text>
              <Text style={{ color: C.gray }}>Ukitumia ZAN10, unapata -10%</Text>
            </View>
          )}
        </View>
      )}

      {/* MAONI / COMPLAINTS */}
      {dashTab === 'maoni' && (
        <View style={s.card3d}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: C.dark }}>💬 Maoni / Complaints</Text>
          <TextInput style={s.input3d} placeholder="Mfano: Dereva alichelewa..." value={maoni} onChangeText={setMaoni} multiline placeholderTextColor={C.gray} />
          <TouchableOpacity style={s.mainBtn3d} onPress={tumaMaoni}><Text style={s.mainBtnText}>TUMA MAONI</Text></TouchableOpacity>
          {maoniList.map(m => <Text key={m.id} style={{ marginTop: 6, color: C.dark }}>• {m.jina} ({m.role}): {m.maoni}</Text>)}
        </View>
      )}

      {/* SETTINGS - PASSWORD + FINGERPRINT + DARK MODE */}
      {dashTab === 'settings' && (
        <View style={s.card3d}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: C.dark }}>⚙️ Settings</Text>
          <View style={s.settingRow}>
            <Text style={{ color: C.dark, fontWeight: 'bold' }}>🌙 Dark Mode</Text>
            <Switch value={darkMode} onValueChange={toggleDark} trackColor={{ false: '#ccc', true: C.orange }} />
          </View>
          <View style={s.settingRow}>
            <Text style={{ color: C.dark, fontWeight: 'bold' }}>👆 Fingerprint Login</Text>
            <Switch value={fingerprintOn} onValueChange={toggleFinger} trackColor={{ false: '#ccc', true: C.blue }} />
          </View>
          <Text style={{ color: C.gray, fontSize: 12 }}>Fingerprint ikishawashwa, utaweza kuingia kwa kidole bila password</Text>
          <Text style={[s.label, { marginTop: 16 }]}>Badilisha Password Hapa</Text>
          <TextInput style={s.input3d} placeholder="Password Mpya" value={newPassword} onChangeText={setNewPassword} secureTextEntry={!showPass} placeholderTextColor={C.gray} />
          <TextInput style={s.input3d} placeholder="Thibitisha Password Mpya" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={!showPass} placeholderTextColor={C.gray} />
          <TouchableOpacity onPress={() => setShowPass(!showPass)}><Text style={{ color: C.blue, marginTop: 6 }}>{showPass ? '👁️ Ficha Password' : '🙈 Onyesha Password'}</Text></TouchableOpacity>
          <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.orange }]} onPress={async () => {
            if (!newPassword || newPassword !== confirmPassword) { Alert.alert('Kosa', 'Password hazifanani'); return; }
            const list = users.map(x => x.simu === currentUser.simu ? { ...x, password: newPassword } : x);
            await saveUsers(list); setNewPassword(''); setConfirmPassword(''); Alert.alert('Hongera', 'Password imebadilishwa');
          }}><Text style={s.mainBtnText}>BADILISHA PASSWORD YANGU</Text></TouchableOpacity>
          <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.red }]} onPress={async () => { await AsyncStorage.clear(); setUsers([]); setOrders([]); setMaoniList([]); Alert.alert('Imesafishwa'); }}><Text style={s.mainBtnText}>FUTA DATA ZOTE (Admin)</Text></TouchableOpacity>
        </View>
      )}

      {/* ODA */}
      {dashTab === 'oda' && (<>
        <Text style={s.cardTitle}>📦 Oda Zangu ({myOrders.length})</Text>
        {myOrders.map(o => (
          <View key={o.id} style={s.card3d}>
            <Text style={{ fontWeight: 'bold', color: C.dark }}>{o.id} - {o.item} - {o.bei} TZS</Text>
            <Text style={{ color: C.dark }}>Mteja: {o.mteja} • Muuzaji: {o.muuzaji}</Text>
            <Text style={{ color: C.dark }}>Usafiri: {o.safariText}</Text>
            <Text style={{ color: C.dark }}>Status: {o.status}</Text>
            {o.status === 'IMEKATAA' && <Text style={{ color: C.red }}>❌ Imekataliwa: {o.sababuKukataa}</Text>}
            <Text style={{ color: C.dark }}>Dereva: {o.dereva || 'Hajapatikana bado'}</Text>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TextInput style={[s.input3d, { flex: 1, marginTop: 0 }]} placeholder="Chat na Dereva..." value={chat} onChangeText={setChat} placeholderTextColor={C.gray} />
              <TouchableOpacity style={[s.mainBtn3d, { marginTop: 0, marginLeft: 6, paddingHorizontal: 12 }]} onPress={() => { Alert.alert('Chat Imetumwa', chat || 'Mambo Dereva?'); setChat(''); }}><Text style={s.mainBtnText}>TUMA</Text></TouchableOpacity>
            </View>
            {currentUser.role !== 'mteja' && currentUser.role !== 'admin' && (<>
              {o.status === 'Inasubiri' && <><TouchableOpacity style={s.mainBtn3d} onPress={() => kubaliOda(o)}><Text style={s.mainBtnText}>KUBALI ODA</Text></TouchableOpacity><TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.red }]} onPress={() => setShowKataa(o.id)}><Text style={s.mainBtnText}>❌ KATAA ODA</Text></TouchableOpacity></>}
              {showKataa === o.id && (
                <View style={{ backgroundColor: '#FFF0F0', padding: 10, borderRadius: 10, marginTop: 8 }}>
                  <Text style={{ fontWeight: 'bold' }}>Kwa nini unakataa?</Text>
                  {SABABU.map(sb => (<TouchableOpacity key={sb} style={[s.transportOpt, kataaSababu === sb && s.transportActive]} onPress={() => setKataaSababu(sb)}><Text>{sb}</Text></TouchableOpacity>))}
                  <TouchableOpacity style={[s.transportOpt, kataaSababu === 'other' && s.transportActive]} onPress={() => setKataaSababu('other')}><Text>✍️ Other - Andika Mwenyewe</Text></TouchableOpacity>
                  {kataaSababu === 'other' && <TextInput style={s.input3d} placeholder="Andika sababu..." value={kataaOther} onChangeText={setKataaOther} />}
                  <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.red }]} onPress={() => kataaOda(o)}><Text style={s.mainBtnText}>THIBITISHA KUKATAA</Text></TouchableOpacity>
                </View>
              )}
              {(currentUser.role === 'mgahawa' || currentUser.role === 'fundi') && o.status === 'Imekubaliwa' && <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.orange }]} onPress={() => itaDereva(o)}><Text style={s.mainBtnText}>📞 ITA DEREVA - MIMI NITALIPIA</Text></TouchableOpacity>}
              {currentUser.role === 'dereva' && o.status === 'Dereva Anatafutwa' && <TouchableOpacity style={s.mainBtn3d} onPress={() => kubaliOda(o)}><Text style={s.mainBtnText}>NIMEKUBALI KUFIKISHA</Text></TouchableOpacity>}
              {o.status !== 'Imeshafika / Imemalika' && o.status !== 'IMEKATAA' && <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.green }]} onPress={() => malizaOda(o)}><Text style={s.mainBtnText}>MALIZA KAZI</Text></TouchableOpacity>}
            </>)}
            {currentUser.role === 'mteja' && o.status === 'Inasubiri' && <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.red }]} onPress={async () => { const l = orders.filter(x => x.id !== o.id); await saveOrders(l); Alert.alert('Oda Imekuwa Cancel'); }}><Text style={s.mainBtnText}>CANCEL</Text></TouchableOpacity>}
            {currentUser.role === 'mteja' && <View style={{ flexDirection: 'row', marginTop: 8 }}>{[1, 2, 3, 4, 5].map(st => (<TouchableOpacity key={st} onPress={() => Alert.alert('Asante!', `Umempa nyota ${st} ${o.muuzaji}`)}><Text style={{ fontSize: 22 }}>⭐</Text></TouchableOpacity>))}</View>}
          </View>
        ))}
      </>)}

      {dashTab !== 'grid' && (
        <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.deepBlue }]} onPress={() => setDashTab('grid')}><Text style={s.mainBtnText}>← RUDI KWENYE DASHBOARD</Text></TouchableOpacity>
      )}
      <TouchableOpacity style={[s.mainBtn3d, { backgroundColor: C.deepBlue, marginTop: 20 }]} onPress={logout}><Text style={s.mainBtnText}>TOKA</Text></TouchableOpacity>
      <Text style={s.footer}>ZAN DELIVERY • ZANZIBAR • Launch 2026</Text>
    </ScrollView>
  );
}

const styles = (C) => StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: C.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 10 },
  navBtn: { backgroundColor: C.white, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 20, borderWidth: 1, borderColor: C.border, elevation: 3 },
  navText: { fontWeight: 'bold', fontSize: 14, color: C.dark },
  headerTitle: { fontWeight: 'bold', fontSize: 15, letterSpacing: 1, color: C.blue },
  topBar: { backgroundColor: C.card, padding: 12, borderRadius: 16, elevation: 3 },
  hero3d: { backgroundColor: C.card, padding: 18, borderRadius: 20, alignItems: 'center', elevation: 6 },
  heroTitle: { fontSize: 18, fontWeight: 'bold', color: C.deepBlue, marginTop: 8 },
  heroSub: { color: C.gray, marginTop: 2 },
  logoBig: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 10, color: C.deepBlue },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: C.deepBlue },
  label: { fontWeight: 'bold', marginTop: 12, color: C.dark },
  input3d: { backgroundColor: C.card, color: C.dark, borderWidth: 1, borderColor: C.border, borderRadius: 14, padding: 13, marginTop: 6, elevation: 2 },
  mainBtn3d: { backgroundColor: C.blue, padding: 15, borderRadius: 14, marginTop: 12, alignItems: 'center', elevation: 5 },
  mainBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  role3d: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.card, padding: 16, borderRadius: 18, marginTop: 10, elevation: 4 },
  roleIcon: { fontSize: 28, marginRight: 12 },
  roleText: { fontSize: 16, fontWeight: 'bold', color: C.deepBlue },
  card3d: { backgroundColor: C.card, padding: 16, borderRadius: 18, marginTop: 12, elevation: 4 },
  promoBox: { backgroundColor: C.orangeLight, padding: 14, borderRadius: 16, marginTop: 14, borderWidth: 1, borderColor: '#FFD8A8' },
  transportOpt: { padding: 11, borderWidth: 1, borderColor: C.border, borderRadius: 12, marginTop: 6, backgroundColor: C.card },
  transportActive: { borderColor: C.blue, backgroundColor: C.lightBlue },
  dashRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  dash3d: { flex: 1, padding: 14, borderRadius: 16, marginHorizontal: 3, alignItems: 'center', elevation: 5 },
  dashNum: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  dashLabel: { color: '#fff', fontSize: 12 },
  footer: { textAlign: 'center', color: '#999', marginVertical: 20, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tile: { width: '31%', aspectRatio: 1, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 12, elevation: 4, padding: 8 },
  tileLabel: { fontSize: 12, fontWeight: 'bold', textAlign: 'center', marginTop: 8 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
});
