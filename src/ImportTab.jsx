import { useState } from "react";

function parseCSV(text){
  const rows=[];let row=[],cell="",inQ=false;
  for(let i=0;i<text.length;i++){
    const c=text[i],n=text[i+1];
    if(inQ){
      if(c==='"'&&n==='"'){cell+='"';i++;}
      else if(c==='"'){inQ=false;}
      else cell+=c;
    } else {
      if(c==='"') inQ=true;
      else if(c===","){row.push(cell);cell="";}
      else if(c==="\n"||c==="\r"){
        if(c==="\r"&&n==="\n") i++;
        row.push(cell);cell="";
        if(row.some(x=>x.trim()!=="")) rows.push(row);
        row=[];
      } else cell+=c;
    }
  }
  row.push(cell);
  if(row.some(x=>x.trim()!=="")) rows.push(row);
  return rows;
}

function csvToVolunteers(text,program){
  const rows=parseCSV(text.replace(/^\uFEFF/,""));
  if(rows.length<2) return {list:[],headers:[]};
  const headers=rows[0].map(h=>h.trim().toLowerCase());
  const find=(...keys)=>headers.findIndex(h=>keys.some(k=>h.includes(k)));
  const iFirst=find("first name","firstname","first");
  const iLast=find("last name","lastname","surname");
  const iFull=headers.findIndex(h=>h==="name"||h==="full name"||h==="volunteer");
  const iPhone=find("phone","mobile","cell");
  const iEmail=find("email");
  const list=rows.slice(1).map((r,i)=>{
    const first=iFirst>=0?(r[iFirst]||"").trim():"";
    const last=iLast>=0?(r[iLast]||"").trim():"";
    const full=(first||last)?(first+" "+last).trim():(iFull>=0?(r[iFull]||"").trim():"");
    return {
      id:"vl"+Date.now()+"_"+i,
      name:full,
      phone:iPhone>=0?(r[iPhone]||"").trim():"",
      email:iEmail>=0?(r[iEmail]||"").trim():"",
      emoji:"🙋",skills:[],programs:[program],
      online:false,checkedIn:false,approved:false,matches:[],photos:[],
      importedFromVL:true,
    };
  }).filter(v=>v.name);
  return {list,headers};
}

const keyOf=v=>v.phone?v.phone.replace(/\D/g,""):(v.email||v.name).toLowerCase().replace(/\s/g,"");

export default function ImportTab({volunteers,setVolunteers,notify}){
  const [program,setProgram]=useState("Sun Circle");
  const [preview,setPreview]=useState([]);
  const [headers,setHeaders]=useState([]);
  const [fileText,setFileText]=useState("");

  const readFile=(f)=>{
    const r=new FileReader();
    r.onload=ev=>{
      const text=ev.target.result;
      setFileText(text);
      const out=csvToVolunteers(text,program);
      setPreview(out.list);setHeaders(out.headers);
    };
    r.readAsText(f);
  };

  const changeProgram=(p)=>{
    setProgram(p);
    if(fileText){
      const out=csvToVolunteers(fileText,p);
      setPreview(out.list);setHeaders(out.headers);
    }
  };

  const confirmImport=()=>{
    const index=new Map();
    volunteers.forEach((v,i)=>index.set(keyOf(v),i));
    const updated=[...volunteers];
    let added=0,merged=0;
    preview.forEach(nv=>{
      const k=keyOf(nv);
      if(index.has(k)){
        const i=index.get(k);
        updated[i]={...updated[i],
          programs:[...new Set([...(updated[i].programs||[]),...nv.programs])],
          phone:updated[i].phone||nv.phone,
          email:updated[i].email||nv.email};
        merged++;
      } else {
        index.set(k,updated.length);
        updated.push(nv);
        added++;
      }
    });
    setVolunteers(updated);
    notify("✅ Imported: "+added+" new, "+merged+" already existed");
    setPreview([]);setFileText("");setHeaders([]);
  };

  const box={fontFamily:"'Nunito',sans-serif"};
  return (
    <div>
      <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#1e3a8a",marginBottom:3}}>📥 Import from VolunteerLocal</div>
      <div style={{...box,fontSize:11,color:"#6b7280",marginBottom:10}}>
        1) Pick the program. 2) Upload the CSV you exported. 3) Review, then confirm.
      </div>
      <select value={program} onChange={e=>changeProgram(e.target.value)}
        style={{...box,width:"100%",padding:"9px 11px",borderRadius:9,border:"2px solid #e5e7eb",fontSize:13,marginBottom:10}}>
        {["Sun Circle","Social Circle","Volunteer Opportunities (8th Grade+)"].map(p=><option key={p} value={p}>{p}</option>)}
      </select>
      <input type="file" accept=".csv" onChange={e=>{const f=e.target.files[0];if(f)readFile(f);}} style={{marginBottom:12}}/>

      {fileText&&preview.length===0&&(
        <div style={{...box,background:"#fef2f2",border:"2px solid #fca5a5",borderRadius:10,padding:12,fontSize:12,color:"#991b1b"}}>
          Found 0 volunteers. The column headings in your file are: <strong>{headers.join(", ")||"(none found)"}</strong>.
          Send that list to Claude and the importer can be adjusted.
        </div>
      )}

      {preview.length>0&&(
        <div style={{background:"white",border:"2px solid #dbeafe",borderRadius:12,padding:12}}>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:15,color:"#1e3a8a",marginBottom:6}}>Found {preview.length} volunteers</div>
          {preview.slice(0,5).map(v=>(
            <div key={v.id} style={{...box,fontSize:12,color:"#374151",marginBottom:3}}>• {v.name} {v.phone?"· "+v.phone:""} {v.email?"· "+v.email:""}</div>
          ))}
          {preview.length>5&&<div style={{...box,fontSize:11,color:"#6b7280"}}>…and {preview.length-5} more</div>}
          <button onClick={confirmImport}
            style={{...box,marginTop:10,width:"100%",background:"linear-gradient(135deg,#2563eb,#60a5fa)",color:"white",border:"none",borderRadius:9,padding:"10px 0",fontWeight:800,cursor:"pointer"}}>
            Import {preview.length} volunteers ✓
          </button>
        </div>
      )}
    </div>
  );
}
