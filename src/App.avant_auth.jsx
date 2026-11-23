import React, { useEffect, useMemo, useState } from "react";
import {
  Home, ClipboardList, MapPin, UserRound, Bell, Menu, X, LogOut,
  Truck, CalendarDays, Clock3, CreditCard, History, AlertTriangle,
  Users, Settings, Plus, CheckCircle2, Leaf, Search, ChevronRight,
  PackageCheck, Phone, Trash2, CircleHelp, Wallet, Navigation
} from "lucide-react";
import { getClients } from "./services/api";

const initialRequests = [
  { id: "EC-1024", type: "Collecte planifiée", zone: "Jouvence", address: "Jouvence, Yaoundé", date: "2026-11-22", time: "08:00", status: "Programmée", amount: 1500, owner: "Utilisateur démo" },
  { id: "EC-1023", type: "Collecte express", zone: "Mendong", address: "Mendong, Yaoundé", date: "2026-11-19", time: "14:30", status: "Terminée", amount: 2500, owner: "Utilisateur démo" },
  { id: "EC-1022", type: "Collecte planifiée", zone: "Biyem-Assi", address: "Biyem-Assi, Yaoundé", date: "2026-11-16", time: "09:00", status: "Terminée", amount: 1500, owner: "Utilisateur démo" }
];
const zones = ["Jouvence", "Mendong", "Biyem-Assi", "Essos", "Bastos", "Mvan", "Nlongkak"];
const money = n => `${Number(n).toLocaleString("fr-FR")} FCFA`;
const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

export default function App() {
  const [role, setRole] = useState(() => localStorage.getItem("ec_role") || "Utilisateur");
  const [user, setUser] = useState(() => read("ec_user", { name: "Utilisateur démo", email: "demo@ecocollecte.cm", phone: "" }));
  const [requests, setRequests] = useState(() => read("ec_requests", initialRequests));
  const [page, setPage] = useState("Accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [notifications, setNotifications] = useState(() => read("ec_notifications", [
    { id: 1, text: "Bienvenue sur EcoCollecte !", date: "Aujourd’hui" },
    { id: 2, text: "Votre demande EC-1024 est programmée.", date: "Aujourd’hui" }
  ]));

  useEffect(() => { localStorage.setItem("ec_role", role); }, [role]);
  useEffect(() => { localStorage.setItem("ec_user", JSON.stringify(user)); }, [user]);
  useEffect(() => { localStorage.setItem("ec_requests", JSON.stringify(requests)); }, [requests]);
  useEffect(() => { localStorage.setItem("ec_notifications", JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => {
    const handler = e => { e.preventDefault(); setInstallPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);
  const toast = msg => { setNotice(msg); window.setTimeout(() => setNotice(""), 3200); };
  const go = p => { setPage(p); setMenuOpen(false); };
  const nav = [
    ["Accueil", Home], ["Demandes de collecte", ClipboardList], ["Suivi", MapPin],
    ["Historique", History], ["Notifications", Bell], ["Mon profil", UserRound]
  ];
  const adminNav = [
    ["Tableau de bord", Home], ["Clients", Users], ["Missions", ClipboardList], ["Éboueurs", Users],
    ["Camions", Truck], ["Zones et tarifs", Settings], ["Incidents", AlertTriangle]
  ];
  const collectorNav = [["Mes missions", ClipboardList], ["Suivi des missions", Navigation], ["Signaler un incident", AlertTriangle], ["Mon profil", UserRound]];
  const items = role === "Gestionnaire" ? adminNav : role === "Éboueur" ? collectorNav : nav;
  const createRequest = data => {
    const item = { ...data, id: `EC-${Math.floor(1000 + Math.random()*9000)}`, status: "En attente de paiement", owner: user.name };
    setRequests(prev => [item, ...prev]);
    setNotifications(prev => [{ id: Date.now(), text: `Nouvelle demande ${item.id} créée.`, date: "À l’instant" }, ...prev]);
    setShowForm(false); go("Demandes de collecte");
    toast("Demande enregistrée. Procédez au paiement pour la confirmer.");
  };
  const updateStatus = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    toast(`Statut mis à jour : ${status}`);
  };
  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
      <div className="brand"><span className="brand-icon"><Leaf size={22}/></span><span>Eco<span>Collecte</span><small>Ville plus propre, vie meilleure</small></span></div>
      <div className="role-box"><span>Mode de démonstration</span><select value={role} onChange={e => {setRole(e.target.value); go("Accueil");}}><option>Utilisateur</option><option>Éboueur</option><option>Gestionnaire</option></select></div>
      <div className="nav-label">MENU PRINCIPAL</div>
      {items.map(([label, Icon]) => <button key={label} className={`nav-item ${page===label ? "active":""}`} onClick={()=>go(label)}><Icon size={18}/>{label}</button>)}
      <div className="sidebar-bottom"><div className="help-card"><CircleHelp size={20}/><b>Besoin d’aide ?</b><p>Notre équipe est disponible pour vous accompagner.</p><a href="tel:+237600000000"><Phone size={14}/> Contacter le support</a></div><button className="logout" onClick={()=>toast("Vous êtes toujours en mode démonstration.")}><LogOut size={17}/> Déconnexion</button></div>
    </aside>
    {menuOpen && <div className="scrim" onClick={()=>setMenuOpen(false)} />}
    <main className="main">
      <header className="topbar"><button className="mobile-menu icon-btn" onClick={()=>setMenuOpen(true)}><Menu/></button><div className="breadcrumb">EcoCollecte <ChevronRight size={14}/> <b>{page}</b></div><div className="top-actions"><button className="icon-btn notification-btn" onClick={()=>go("Notifications")}><Bell size={19}/>{notifications.length>0 && <i/>}</button><div className="avatar">{(user.name||"U").charAt(0).toUpperCase()}</div><div className="user-meta"><b>{user.name}</b><small>{role}</small></div></div></header>
      <div className="content">
        {page==="Accueil" || page==="Tableau de bord" ? <Dashboard role={role} requests={requests} go={go} onNew={()=>setShowForm(true)} toast={toast}/> :
         page==="Demandes de collecte" ? <Requests requests={requests} query={query} setQuery={setQuery} onNew={()=>setShowForm(true)} role={role} updateStatus={updateStatus}/> :
         page==="Suivi" || page==="Suivi des missions" || page==="Mes missions" ? <Tracking requests={requests} role={role} updateStatus={updateStatus}/> :
         page==="Historique" ? <HistoryPage requests={requests}/> :
         page==="Notifications" ? <Notifications notifications={notifications} clear={()=>setNotifications([])}/> :
         page==="Mon profil" ? <Profile user={user} setUser={setUser} toast={toast}/> :
         page==="Clients" ? <Clients/> : page==="Éboueurs" ? <Staff/> : page==="Camions" ? <Trucks/> :
         page==="Zones et tarifs" ? <Zones/> : page==="Incidents" || page==="Signaler un incident" ? <Incidents toast={toast}/> :
         <Dashboard role={role} requests={requests} go={go} onNew={()=>setShowForm(true)} toast={toast}/>}
      </div>
      <footer>© 2026 EcoCollecte · Application de collecte des déchets</footer>
    </main>
    {showForm && <RequestModal onClose={()=>setShowForm(false)} onSubmit={createRequest}/>}
    {notice && <div className="toast"><CheckCircle2 size={18}/>{notice}</div>}
    {installPrompt && <button className="install-floating" onClick={async()=>{installPrompt.prompt(); await installPrompt.userChoice; setInstallPrompt(null);}}>Installer l’application</button>}
  </div>;
}

function PageTitle({eyebrow, title, subtitle, action}) {
  return <div className="page-title"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>;
}
function Dashboard({role, requests, go, onNew, toast}) {
  const pending = requests.filter(r=>!["Terminée","Annulée"].includes(r.status)).length;
  const completed = requests.filter(r=>r.status==="Terminée").length;
  return <>
    <PageTitle eyebrow="VOTRE ESPACE" title={`Bonjour${role==="Utilisateur" ? " !" : `, ${role.toLowerCase()} !`}`} subtitle="Retrouvez ici les informations essentielles de votre activité." action={role==="Utilisateur" ? <button className="btn primary" onClick={onNew}><Plus size={17}/> Nouvelle collecte</button> : null}/>
    <section className="hero"><div><span className="hero-tag"><Leaf size={14}/> ENSEMBLE POUR UN ENVIRONNEMENT SAIN</span><h2>Une ville propre commence<br/>par un geste simple.</h2><p>Demandez une collecte, suivez son évolution et contribuez à garder votre quartier propre.</p><button className="btn light" onClick={role==="Utilisateur"?onNew:()=>go(role==="Gestionnaire"?"Missions":"Mes missions")}>{role==="Utilisateur"?"Programmer une collecte":"Consulter les missions"} <ChevronRight size={16}/></button></div><div className="hero-art"><div className="sun"/><div className="hill h1"/><div className="hill h2"/><div className="bin"><div/><i/><i/><i/></div><span className="spark s1">✦</span><span className="spark s2">✦</span></div></section>
    <div className="stats-grid">
      <Stat icon={ClipboardList} label="Total des demandes" value={requests.length} color="green"/>
      <Stat icon={Clock3} label="En cours" value={pending} color="orange"/>
      <Stat icon={CheckCircle2} label="Collectes terminées" value={completed} color="blue"/>
      <Stat icon={MapPin} label="Zones couvertes" value={zones.length} color="purple"/>
    </div>
    <div className="section-heading"><div><h2>{role==="Utilisateur"?"Mes dernières demandes":"Activité récente"}</h2><p>Consultez rapidement les dernières opérations.</p></div><button className="text-btn" onClick={()=>go(role==="Utilisateur"?"Demandes de collecte":"Missions")}>Tout voir <ChevronRight size={15}/></button></div>
    <RequestTable requests={requests.slice(0,4)} compact/>
    <div className="bottom-cards"><div className="info-card"><div className="round-icon green-bg"><CalendarDays/></div><div><b>Collecte planifiée</b><p>Choisissez une date et un créneau adaptés à votre disponibilité.</p></div><button onClick={onNew}>Programmer <ChevronRight size={15}/></button></div><div className="info-card"><div className="round-icon orange-bg"><Truck/></div><div><b>Collecte express</b><p>Besoin d’un enlèvement rapide ? Faites une demande express.</p></div><button onClick={onNew}>Demander <ChevronRight size={15}/></button></div></div>
  </>;
}
function Stat({icon:Icon,label,value,color}) {return <div className="stat-card"><div className={`stat-icon ${color}`}><Icon size={20}/></div><div><strong>{value}</strong><span>{label}</span></div></div>}
function Requests({requests,query,setQuery,onNew,role,updateStatus}) {
  const filtered = requests.filter(r=>[r.id,r.zone,r.status,r.type].join(" ").toLowerCase().includes(query.toLowerCase()));
  return <><PageTitle eyebrow="GESTION DES COLLECTES" title="Demandes de collecte" subtitle="Retrouvez et gérez les demandes de collecte." action={role==="Utilisateur"?<button className="btn primary" onClick={onNew}><Plus size={17}/> Nouvelle demande</button>:null}/>
    <div className="filter-row"><div className="searchbox"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher une demande, une zone..."/></div><span className="result-count">{filtered.length} demande(s)</span></div>
    <RequestTable requests={filtered} role={role} updateStatus={updateStatus}/>
  </>;
}
function RequestTable({requests,compact=false,role,updateStatus}) {
  return <div className="table-card"><div className="table-wrap"><table><thead><tr><th>RÉFÉRENCE</th><th>TYPE</th><th>ZONE</th><th>DATE / HEURE</th><th>STATUT</th><th>{compact?"":"MONTANT"}</th>{role!=="Utilisateur"&&!compact&&<th>ACTION</th>}</tr></thead><tbody>{requests.length===0?<tr><td colSpan="7" className="empty">Aucune demande trouvée.</td></tr>:requests.map(r=><tr key={r.id}><td><b className="ref">{r.id}</b></td><td>{r.type}</td><td>{r.zone}</td><td>{r.date}<small className="cell-sub">{r.time}</small></td><td><Status value={r.status}/></td><td>{compact?"":money(r.amount)}</td>{role!=="Utilisateur"&&!compact&&<td><select className="status-select" value={r.status} onChange={e=>updateStatus(r.id,e.target.value)}><option>En attente de paiement</option><option>Programmée</option><option>En cours</option><option>Terminée</option><option>Annulée</option></select></td>}</tr>)}</tbody></table></div></div>;
}
function Status({value}) {let cls=value==="Terminée"?"done":value==="En cours"?"progress":value==="Annulée"?"cancel":value==="En attente de paiement"?"wait":"planned";return <span className={`status ${cls}`}><i/>{value}</span>}
function Tracking({requests,role,updateStatus}) {
  const active=requests.filter(r=>!["Terminée","Annulée"].includes(r.status));
  return <><PageTitle eyebrow="SUIVI EN TEMPS RÉEL" title={role==="Utilisateur"?"Suivi de mes collectes":"Suivi des missions"} subtitle="Visualisez l’état d’avancement des opérations de collecte."/>
    {active.length===0?<div className="empty-panel"><PackageCheck size={38}/><h3>Aucune collecte en cours</h3><p>Les nouvelles demandes apparaîtront ici.</p></div>:active.map(r=><div className="tracking-card" key={r.id}><div className="tracking-head"><div><span className="ref">{r.id}</span><h3>{r.type}</h3><p><MapPin size={14}/>{r.address}</p></div><Status value={r.status}/></div><div className="tracking-details"><span><CalendarDays size={16}/>{r.date}</span><span><Clock3 size={16}/>{r.time}</span><span><Wallet size={16}/>{money(r.amount)}</span></div><div className="progress-line"><span style={{width:r.status==="En cours"?"68%":r.status==="Programmée"?"35%":"12%"}}/></div><div className="steps"><span className="reached">Demande créée</span><span className={["Programmée","En cours"].includes(r.status)?"reached":""}>Programmée</span><span className={r.status==="En cours"?"reached":""}>Collecte en cours</span><span>Terminée</span></div>{role!=="Utilisateur"&&<div className="tracking-actions"><button className="btn outline small" onClick={()=>updateStatus(r.id,"En cours")}>Démarrer</button><button className="btn primary small" onClick={()=>updateStatus(r.id,"Terminée")}>Marquer terminée</button></div>}</div>)}
  </>;
}
function HistoryPage({requests}) {const done=requests.filter(r=>["Terminée","Annulée"].includes(r.status));return <><PageTitle eyebrow="ARCHIVES" title="Historique des collectes" subtitle="Consultez les demandes déjà traitées ou annulées."/><RequestTable requests={done}/></>}
function Notifications({notifications,clear}) {return <><PageTitle eyebrow="INFORMATIONS" title="Notifications" subtitle="Les dernières nouvelles concernant vos collectes." action={<button className="btn outline" onClick={clear}>Tout effacer</button>}/><div className="notification-list">{notifications.length===0?<div className="empty-panel"><Bell size={35}/><h3>Aucune notification</h3><p>Vous êtes à jour.</p></div>:notifications.map(n=><div className="notification-item" key={n.id}><div className="round-icon green-bg"><Bell size={18}/></div><div><b>{n.text}</b><small>{n.date}</small></div></div>)}</div></>}
function Profile({user,setUser,toast}) {const [form,setForm]=useState(user);return <><PageTitle eyebrow="PARAMÈTRES DU COMPTE" title="Mon profil" subtitle="Gérez vos informations personnelles."/><div className="form-card profile-form"><div className="profile-avatar">{(user.name||"U").charAt(0).toUpperCase()}</div><label>Nom complet<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Adresse e-mail<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Téléphone<input value={form.phone||""} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+237..."/></label><button className="btn primary" onClick={()=>{setUser(form);toast("Profil mis à jour.");}}>Enregistrer les modifications</button></div></>}
function Staff() {const [staff,setStaff]=useState(["Paul M.","Jean N.","Marie F."]);const [name,setName]=useState("");return <><PageTitle eyebrow="RESSOURCES HUMAINES" title="Gestion des éboueurs" subtitle="Liste indicative des agents affectés aux collectes."/><div className="inline-add"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Nom de l’agent"/><button className="btn primary" onClick={()=>{if(name.trim()){setStaff([...staff,name.trim()]);setName("");}}}><Plus size={16}/> Ajouter</button></div><div className="staff-grid">{staff.map((s,i)=><div className="staff-card" key={i}><div className="avatar large">{s.charAt(0)}</div><div><b>{s}</b><small>Agent de collecte · {i===0?"Disponible":"Affecté"}</small></div><span className="status done">Actif</span></div>)}</div></>}
function Trucks() {const [trucks,setTrucks]=useState(["Camion EC-01","Camion EC-02"]);return <><PageTitle eyebrow="PARC AUTOMOBILE" title="Gestion des camions" subtitle="Suivez les véhicules utilisés pour les opérations." action={<button className="btn primary" onClick={()=>setTrucks([...trucks,`Camion EC-0${trucks.length+1}`])}><Plus size={16}/> Ajouter un camion</button>}/><div className="staff-grid">{trucks.map((t,i)=><div className="staff-card" key={t}><div className="round-icon green-bg"><Truck/></div><div><b>{t}</b><small>{i===1?"En maintenance":"Disponible"}</small></div><Status value={i===1?"En cours":"Programmée"}/></div>)}</div></>}
function Zones() {const [list,setList]=useState(zones);const [zone,setZone]=useState("");return <><PageTitle eyebrow="COUVERTURE DU SERVICE" title="Zones et tarifs" subtitle="Zones desservies et tarifs indicatifs des collectes."/><div className="inline-add"><input value={zone} onChange={e=>setZone(e.target.value)} placeholder="Nom d’une nouvelle zone"/><button className="btn primary" onClick={()=>{if(zone.trim()){setList([...list,zone.trim()]);setZone("");}}}><Plus size={16}/> Ajouter une zone</button></div><div className="zone-grid">{list.map((z,i)=><div className="zone-card" key={`${z}-${i}`}><div className="round-icon green-bg"><MapPin/></div><b>{z}</b><span className="zone-price">À partir de {money(1500)}</span><small>Zone desservie</small></div>)}</div><div className="price-note"><b>Tarifs de démonstration</b><p>Collecte planifiée : 1 500 FCFA · Collecte express : 2 500 FCFA. Les montants doivent être validés par le gestionnaire avant la mise en production.</p></div></>}
function Incidents({toast}) {const [type,setType]=useState("Retard de collecte");const [desc,setDesc]=useState("");return <><PageTitle eyebrow="QUALITÉ DU SERVICE" title="Signaler un incident" subtitle="Signalez un problème rencontré pendant une opération de collecte."/><div className="form-card incident-form"><label>Type d’incident<select value={type} onChange={e=>setType(e.target.value)}><option>Retard de collecte</option><option>Collecte non effectuée</option><option>Dégradation / matériel</option><option>Autre problème</option></select></label><label>Description<textarea rows="5" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Décrivez brièvement le problème..."/></label><button className="btn primary" onClick={()=>{if(!desc.trim()){toast("Veuillez décrire l’incident.");return;}setDesc("");toast("Incident enregistré (démonstration).");}}>Envoyer le signalement</button></div></>}
function RequestModal({onClose,onSubmit}) {const [type,setType]=useState("Collecte planifiée");const [zone,setZone]=useState("Jouvence");const [address,setAddress]=useState("");const [date,setDate]=useState("2026-11-22");const [time,setTime]=useState("08:00");const amount=type==="Collecte express"?2500:1500;return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><div className="modal"><div className="modal-head"><div><span className="eyebrow">NOUVELLE OPÉRATION</span><h2>Demander une collecte</h2></div><button className="icon-btn" onClick={onClose}><X/></button></div><form onSubmit={e=>{e.preventDefault();onSubmit({type,zone,address:address||zone+", Yaoundé",date,time,amount});}}><label>Type de collecte<select value={type} onChange={e=>setType(e.target.value)}><option>Collecte planifiée</option><option>Collecte express</option></select></label><label>Zone<select value={zone} onChange={e=>setZone(e.target.value)}>{zones.map(z=><option key={z}>{z}</option>)}</select></label><label>Adresse précise<input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Quartier, rue, repère..."/></label><div className="two-fields"><label>Date souhaitée<input type="date" value={date} min="2026-11-20" onChange={e=>setDate(e.target.value)} required/></label><label>Créneau horaire<input type="time" value={time} onChange={e=>setTime(e.target.value)} required/></label></div><div className="amount-row"><span>Montant estimatif</span><b>{money(amount)}</b></div><p className="fine-print">Le paiement est simulé dans cette version de démonstration. La demande sera enregistrée localement sur cet appareil.</p><div className="modal-actions"><button type="button" className="btn outline" onClick={onClose}>Annuler</button><button type="submit" className="btn primary">Confirmer la demande <ChevronRight size={16}/></button></div></form></div></div>}


function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getClients()
      .then(setClients)
      .catch(() => setError("Impossible de récupérer les clients. Vérifiez que le backend fonctionne."))
      .finally(() => setLoading(false));
  }, []);

  return <>
    <PageTitle
      eyebrow="GESTION DES UTILISATEURS"
      title="Clients"
      subtitle="Consultez les clients enregistrés dans EcoCollecte."
    />

    {loading ? (
      <p>Chargement des clients...</p>
    ) : error ? (
      <div className="form-card">{error}</div>
    ) : clients.length === 0 ? (
      <div className="form-card">Aucun client enregistré pour le moment.</div>
    ) : (
      <div className="staff-grid">
        {clients.map(client => (
          <div className="staff-card" key={client.id}>
            <div className="avatar large">
              {(client.nom || "C").charAt(0).toUpperCase()}
            </div>
            <div>
              <b>{client.nom}</b>
              <small>{client.email}</small>
              <small>Téléphone : {client.telephone || "Non renseigné"}</small>
              <small>Adresse : {client.adresse || "Non renseignée"}</small>
            </div>
            <span className="status done">Client</span>
          </div>
        ))}
      </div>
    )}
  </>;
}
