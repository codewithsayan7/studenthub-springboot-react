import React,{useEffect,useState} from 'react';
const API='http://localhost:8080/api/students';
const blank={name:'',email:'',department:'Computer Science',semester:1,cgpa:0};
export default function App(){
 const [items,setItems]=useState([]),[q,setQ]=useState(''),[form,setForm]=useState(blank),[editing,setEditing]=useState(null),[error,setError]=useState('');
 async function load(){try{let r=await fetch(API+(q?'?q='+encodeURIComponent(q):''));setItems(await r.json());}catch{setError('Cannot reach API. Start Docker Compose and refresh.');}}
 useEffect(()=>{load()},[q]);
 async function save(e){e.preventDefault();setError('');let r=await fetch(editing?API+'/'+editing:API,{method:editing?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...form,semester:Number(form.semester),cgpa:Number(form.cgpa)})});if(!r.ok){let x=await r.json().catch(()=>({}));setError(x.error||'Could not save student');return;}setForm(blank);setEditing(null);load();}
 function edit(s){setEditing(s.id);setForm({name:s.name,email:s.email,department:s.department,semester:s.semester,cgpa:s.cgpa});}
 async function remove(id){if(confirm('Delete this student?')){await fetch(API+'/'+id,{method:'DELETE'});load();}}
 return <main><header><div><span className="eyebrow">ACADEMIC ADMINISTRATION</span><h1>StudentHub</h1><p>Manage students, departments and academic performance.</p></div><div className="count">{items.length}<small>students shown</small></div></header>
 <section className="panel"><h2>{editing?'Update student':'Add a student'}</h2><form onSubmit={save} className="form">
 <input required placeholder="Full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
 <input required type="email" placeholder="Email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
 <input required placeholder="Department" value={form.department} onChange={e=>setForm({...form,department:e.target.value})}/>
 <input required type="number" min="1" max="8" placeholder="Semester" value={form.semester} onChange={e=>setForm({...form,semester:e.target.value})}/>
 <input required type="number" min="0" max="10" step=".01" placeholder="CGPA" value={form.cgpa} onChange={e=>setForm({...form,cgpa:e.target.value})}/>
 <button>{editing?'Save changes':'Add student'}</button>{editing&&<button type="button" className="secondary" onClick={()=>{setEditing(null);setForm(blank)}}>Cancel</button>}</form>{error&&<p className="error">{error}</p>}</section>
 <section className="panel"><div className="toolbar"><h2>Student directory</h2><input placeholder="Search name or email…" value={q} onChange={e=>setQ(e.target.value)}/></div>
 <div className="tablewrap"><table><thead><tr><th>Student</th><th>Department</th><th>Semester</th><th>CGPA</th><th>Actions</th></tr></thead><tbody>{items.map(s=><tr key={s.id}><td><b>{s.name}</b><small>{s.email}</small></td><td>{s.department}</td><td>{s.semester}</td><td><span className="score">{Number(s.cgpa).toFixed(2)}</span></td><td><button className="small secondary" onClick={()=>edit(s)}>Edit</button> <button className="small danger" onClick={()=>remove(s.id)}>Delete</button></td></tr>)}</tbody></table>{!items.length&&<p className="empty">No students yet. Add the first record above.</p>}</div></section>
 <footer>StudentHub · React + Spring Boot + PostgreSQL</footer></main>}
