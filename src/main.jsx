// ── PART 1: Constants, Helpers, Atoms ──────────────────────────
// Paste this at the TOP of your App.jsx file

import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

// ─── PASSWORDS ────────────────────────────────────────────────────
const STAFF_PASSWORD = "FC2026Staff";
const VOLUNTEER_PASSWORD = "BuddyUp2026";
const PARENT_PASSWORD = "SunCircle26";

// ─── INITIAL DATA ─────────────────────────────────────────────────
const INITIAL_CHILDREN = [
  { id:1, name:"Daniel", photo:"🎵", photoUrl:null, ageGroup:"Tweens (9–12)", interests:["Music","Swimming","Running"], personalityTips:"Very energetic and loves to move!", communicationTips:"Avoid sensory-heavy environments. Keep things calm and predictable.", favoriteActivities:"Swimming, running, listening to music, numbers", volunteerNotes:"Loves numbers — try counting games. Music in the background helps him feel at ease." },
  { id:2, name:"Alan", photo:"🎧", photoUrl:null, ageGroup:"Young Kids (5–8)", interests:["Sensory Play","Quiet Activities"], personalityTips:"Loves sensory experiences but needs a calm, low-stimulation environment.", communicationTips:"Avoid loud or crowded places. Speak softly and give him time to process.", favoriteActivities:"Sensory play, calm one-on-one activities", volunteerNotes:"Never push him into noisy group settings. Headphones nearby give him security." },
  { id:3, name:"Noa", photo:"✨", photoUrl:null, ageGroup:"Teens (13–17)", interests:["Social Connection","Feeling Included"], personalityTips:"Loves feeling cool and socially accepted. Treat her like a peer.", communicationTips:"Don't baby her. Ask her opinions and make her feel in-the-know.", favoriteActivities:"Socializing, hanging out, being included", volunteerNotes:"Compliment her genuinely. Let her lead the activity sometimes." },
  { id:4, name:"Emma", photo:"🎨", photoUrl:null, ageGroup:"Tweens (9–12)", interests:["Painting","Conversation"], personalityTips:"Lights up when spoken to directly. Very receptive to one-on-one attention.", communicationTips:"Talk TO her, not around her.", favoriteActivities:"Painting, being talked to, one-on-one time", volunteerNotes:"Start a painting session — she'll open right up." },
  { id:5, name:"Sophie", photo:"✏️", photoUrl:null, ageGroup:"Young Kids (5–8)", interests:["Drawing"], personalityTips:"Sweet and creative. Very close with Mrs. Angela. Uses noise-cancelling headphones.", communicationTips:"Gentle and calm approach. Let her lead with drawing.", favoriteActivities:"Drawing, quiet creative time", volunteerNotes:"Mentioning Mrs. Angela helps her feel safe." },
  { id:6, name:"Gabby", photo:"👸", photoUrl:null, ageGroup:"Young Kids (5–8)", interests:["Singing","Drawing","Stickers","The Little Mermaid"], personalityTips:"Bubbly, talkative, loves princesses and stickers. Not big on sharing.", communicationTips:"Give her a moment to shine before redirecting.", favoriteActivities:"Singing, drawing, princess play, stickers", volunteerNotes:"Bring stickers — instant best friends! Obsessed with The Little Mermaid." },
  { id:7, name:"Roman", photo:"🍪", photoUrl:null, ageGroup:"Tweens (9–12)", interests:["Swimming","Cookies","Birthdays"], personalityTips:"Very relaxed. Knows everyone's birthday. Gives hugs when calm.", communicationTips:"Keep the vibe chill. Just good company.", favoriteActivities:"Swimming, cookies, relaxing, birthday trivia", volunteerNotes:"Let him sort his cookies — it's his thing." },
  { id:8, name:"Alex", photo:"🏃‍♀️", photoUrl:null, ageGroup:"Tweens (9–12)", interests:["Painting","Playground","Swimming","Hide & Seek"], personalityTips:"Super energetic. Will ask your birthday and remember it.", communicationTips:"Remind her to drink water and use the bathroom. Remind her to share.", favoriteActivities:"Painting, hide & seek, playground, swimming", volunteerNotes:"Keep wipes handy if painting!" },
  { id:9, name:"Michael", photo:"🎂", photoUrl:null, ageGroup:"Tweens (9–12)", interests:["Birthdays","People"], personalityTips:"Knows everyone's birthday — his superpower for connecting.", communicationTips:"Let him ask about your birthday — it's an important ritual.", favoriteActivities:"Remembering birthdays, socializing", volunteerNotes:"Tell him your birthday on the first meeting." },
  { id:10, name:"Sara", photo:"📱", photoUrl:null, ageGroup:"Teens (13–17)", interests:["Socializing","Phone Numbers"], personalityTips:"Friendly and outgoing. Loves to collect phone numbers to feel connected.", communicationTips:"Follow org guidelines on sharing personal contact info.", favoriteActivities:"Talking, making friends, texting", volunteerNotes:"She may ask for your number — respond kindly and redirect." },
  { id:11, name:"Vera", photo:"🌸", photoUrl:null, ageGroup:"Tweens (9–12)", interests:["Girly Activities","Participating"], personalityTips:"Nonverbal but very eager to participate. Very feminine and expressive.", communicationTips:"Use gestures and visual cues. Never assume she isn't understanding.", favoriteActivities:"Girly crafts, dress-up, group activities", volunteerNotes:"Her face will tell you how she feels." },
  { id:12, name:"Lee", photo:"🤗", photoUrl:null, ageGroup:"Young Kids (5–8)", interests:["All Activities","Physical Connection"], personalityTips:"Nonverbal and very tactile — loves physical closeness.", communicationTips:"Be physically present and responsive.", favoriteActivities:"Any and all activities", volunteerNotes:"Your full attention is the greatest gift you can give Lee." },
  { id:13, name:"Diana", photo:"💬", photoUrl:null, ageGroup:"Teens (13–17)", interests:["Texting","Socializing","Feeling Included"], personalityTips:"Social butterfly. Feeling included is very important to her.", communicationTips:"Always bring her into group conversations.", favoriteActivities:"Texting, talking, group hangouts", volunteerNotes:"Make her feel like an insider. Say 'Diana, what do you think?'" },
  { id:14, name:"Ariella", photo:"🎶", photoUrl:null, ageGroup:"Tweens (9–12)", interests:["Singing","Jewish Songs"], personalityTips:"Takes time to warm up. Once she trusts you, she opens up beautifully.", communicationTips:"If she gets fussy, remind her to count to 10 and use her indoor voice.", favoriteActivities:"Singing, especially Jewish songs", volunteerNotes:"Let her lead with music. Patience is key — she's worth the warm-up." },
];

const INITIAL_PAIRINGS = [
  {volunteerId:"v1",childId:4},{volunteerId:"v1",childId:5},
  {volunteerId:"v2",childId:8},{volunteerId:"v2",childId:7},
  {volunteerId:"v3",childId:14},{volunteerId:"v3",childId:6},
  {volunteerId:"v5",childId:3},{volunteerId:"v5",childId:13},
  {volunteerId:"v6",childId:2},{volunteerId:"v6",childId:12},
];

const SEED_VOLUNTEERS = [
  {id:"v1",name:"Jessica M.",emoji:"👩",skills:["Arts & Crafts","Calm energy"],online:false,checkedIn:false,approved:false,matches:[4,5],photos:[]},
  {id:"v2",name:"Carlos R.",emoji:"👨",skills:["Sports","High energy"],online:false,checkedIn:true,approved:false,matches:[8,7],photos:[]},
  {id:"v3",name:"Taylor S.",emoji:"🧑",skills:["Music","Socializing"],online:false,checkedIn:false,approved:false,matches:[14,6],photos:[]},
  {id:"v4",name:"Priya K.",emoji:"👩",skills:["Calm energy","Creative"],online:false,checkedIn:false,approved:false,matches:[],photos:[]},
  {id:"v5",name:"Jordan L.",emoji:"🧑",skills:["Teens","Conversation"],online:false,checkedIn:true,approved:false,matches:[3,13],photos:[]},
  {id:"v6",name:"Maria G.",emoji:"👩",skills:["Young Kids","Nurturing"],online:false,checkedIn:false,approved:false,matches:[2,12],photos:[]},
];

const AGE_GROUPS = ["Young Kids (5–8)","Tweens (9–12)","Teens (13–17)"];
const PHOTO_OPTIONS = ["🎵","🎧","✨","🎨","✏️","👸","🍪","🏃‍♀️","🎂","📱","🌸","🤗","💬","🎶","⚽","🎮","📚","🌟","🦋","🎯","🌈","🦁","🎪","🎭"];

const SURVEY_QUESTIONS = [
  {id:"energy",question:"What's your energy style?",options:["High energy — I love active games & movement","Calm & relaxed — I prefer quieter activities","Mix of both"]},
  {id:"interests",question:"Which best describes your interests?",options:["Sports, swimming, outdoor play","Arts, music, singing, creativity","Socializing, conversation, connection","Sensory-friendly, calm, quiet activities"],multi:true},
  {id:"ageComfort",question:"Which age group do you feel most comfortable with?",options:["Young Kids (5–8)","Tweens (9–12)","Teens (13–17)","Any age"]},
  {id:"style",question:"How would you describe your interaction style?",options:["Silly and playful","Calm and nurturing","Mentor-like and encouraging","Peer-like and cool"]},
];

const PARENT_QUESTIONS = [
  {id:"personality",question:"How would you describe your child's personality?",options:["Very energetic and active","Calm and quiet","Social and outgoing","Shy at first but warms up quickly","A mix depending on the day"],additionalInfo:true},
  {id:"communication",question:"How does your child best communicate?",options:["Verbally — loves to talk","Nonverbal — uses gestures/expressions","Mix of both","Through activity (drawing, music, play)"],additionalInfo:true},
  {id:"sensory",question:"Does your child have any sensory sensitivities?",options:["Yes — sensitive to loud noise","Yes — sensitive to touch/textures","Yes — sensitive to crowds","No sensory sensitivities","Not sure"],additionalInfo:true},
  {id:"interests",question:"What does your child love most?",options:["Arts & crafts, drawing, painting","Music, singing, dancing","Sports, swimming, outdoor play","Socializing and making friends","Quiet, calm activities"],multi:true,additionalInfo:true},
  {id:"medical",question:"Does your child have any medical needs we should be aware of?",options:["Allergies (food or environmental)","Medication taken during program hours","Seizures or neurological conditions","Dietary restrictions","No medical concerns at this time"],multi:true,additionalInfo:true,additionalInfoLabel:"Please describe any allergies, medications, dosages, emergency procedures, or anything staff should know in case of an incident:"},
  {id:"notes",question:"Anything else you'd like your child's volunteer to know?",options:["They need a lot of patience and gentle reminders","They love physical affection (hugs, high fives)","They take time to warm up — please don't rush them","They have a great sense of humor — lean into it!","They do best with clear, simple instructions"],additionalInfo:true},
];

// ─── HELPERS ──────────────────────────────────────────────────────
function matchScore(vol, child) {
  let s=0;
  (vol.interests||[]).forEach(vi=>child.interests.forEach(ci=>{
    if(vi.toLowerCase().includes(ci.toLowerCase())||ci.toLowerCase().includes(vi.toLowerCase())) s+=3;
  }));
  if(vol.ageComfort===child.ageGroup||vol.ageComfort==="Any age") s+=4;
  if(vol.energy?.includes("High energy")&&child.interests.some(i=>["Swimming","Running","Playground","Hide & Seek"].includes(i))) s+=2;
  if(vol.energy?.includes("Calm")&&child.interests.some(i=>["Drawing","Painting","Quiet Activities","Sensory Play"].includes(i))) s+=2;
  return s;
}
function computeMatches(answers,children) {
  const interests=[];
  (answers.interests||[]).forEach(opt=>{
    if(opt.includes("Sports")) interests.push("Swimming","Running","Playground");
    if(opt.includes("Arts")) interests.push("Painting","Drawing","Singing","Music");
    if(opt.includes("Socializing")) interests.push("Socializing","Conversation","Feeling Included");
    if(opt.includes("Sensory")) interests.push("Sensory Play","Quiet Activities");
  });
  return children.map(c=>({...c,score:matchScore({...answers,interests},c)})).sort((a,b)=>b.score-a.score);
}

// ─── UI ATOMS ─────────────────────────────────────────────────────
function Tag({label,color="#dbeafe",text="#1d4ed8"}) {
  return <span style={{background:color,color:text,borderRadius:20,padding:"2px 10px",fontSize:11,fontFamily:"'Nunito',sans-serif",fontWeight:700}}>{label}</span>;
}

function Logo({small=false}) {
  const s=small?40:60;
  return (
    <div style={{textAlign:"center"}}>
      <svg viewBox="0 0 100 100" width={s} height={s}>
        <path d="M 50 10 A 38 38 0 0 1 88 48" fill="none" stroke="#5eb8b0" strokeWidth="8" strokeLinecap="round"/>
        <path d="M 88 52 A 38 38 0 0 1 52 90" fill="none" stroke="#5eb8b0" strokeWidth="8" strokeLinecap="round"/>
        <path d="M 48 90 A 38 38 0 0 1 10 52" fill="none" stroke="#5eb8b0" strokeWidth="8" strokeLinecap="round"/>
        <path d="M 10 48 A 38 38 0 0 1 46 10" fill="none" stroke="#5eb8b0" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="50" cy="10" r="7" fill="#2e3a6e"/>
        <circle cx="50" cy="90" r="7" fill="#2e3a6e"/>
      </svg>
      <div style={{fontFamily:"'Fredoka One',cursive",fontSize:small?18:26,color:"#2e3a6e",lineHeight:1.1}}>Friendship</div>
      <div style={{fontFamily:"'Fredoka One',cursive",fontSize:small?18:26,color:"#5eb8b0",lineHeight:1.1}}>Circle</div>
      {!small&&<><div style={{color:"#cbd5e1",fontSize:12,fontWeight:700,letterSpacing:2,margin:"6px 0 2px"}}>✦ ✦ ✦</div><div style={{fontFamily:"'Fredoka One',cursive",fontSize:18,color:"#2563eb"}}>Buddy Up! 🤝</div></>}
    </div>
  );
}

function PhotoUpload({label,onUpload,currentUrl,small=false}) {
  const ref=useRef();
  const handle=e=>{
    const f=e.target.files[0];
    if(!f) return;
    const r=new FileReader();
    r.onload=ev=>onUpload(ev.target.result);
    r.readAsDataURL(f);
  };
  return (
    <div style={{marginBottom:12}}>
      {label&&<div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#1d4ed8",marginBottom:6}}>{label}</div>}
      <div onClick={()=>ref.current.click()} style={{border:"2px dashed #93c5fd",borderRadius:12,padding:small?"10px":"16px",textAlign:"center",cursor:"pointer",background:"#f0f7ff",transition:"all 0.15s"}}
        onMouseEnter={e=>e.currentTarget.style.background="#dbeafe"} onMouseLeave={e=>e.currentTarget.style.background="#f0f7ff"}>
        {currentUrl
          ?<img src={currentUrl} alt="upload" style={{maxHeight:small?60:100,maxWidth:"100%",borderRadius:8,objectFit:"cover"}}/>
          :<div><div style={{fontSize:28,marginBottom:4}}>📷</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#60a5fa",fontWeight:700}}>Click to upload photo</div></div>
        }
      </div>
      <input ref={ref} type="file" accept="image/*" onChange={handle} style={{display:"none"}}/>
    </div>
  );
}

function SurveyFlow({questions,onComplete,submitLabel="Submit ✨"}) {
  const [step,setStep]=useState(0);
  const [answers,setAnswers]=useState({});
  const [extras,setExtras]=useState({});
  const q=questions[step];
  const chosen=answers[q.id];
  const hasAnswer=q.multi?(chosen||[]).length>0:!!chosen;
  const select=val=>{
    if(q.multi){const c=answers[q.id]||[];setAnswers({...answers,[q.id]:c.includes(val)?c.filter(v=>v!==val):[...c,val]});}
    else setAnswers({...answers,[q.id]:val});
  };
  const handleComplete=()=>{
    const merged={...answers};
    Object.entries(extras).forEach(([k,v])=>{ if(v.trim()) merged[k+"_extra"]=v.trim(); });
    onComplete(merged);
  };
  return (
    <div>
      <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#60a5fa",marginBottom:5}}>Question {step+1} of {questions.length}</div>
      <div style={{background:"#dbeafe",borderRadius:100,height:5,marginBottom:20}}>
        <div style={{background:"linear-gradient(90deg,#2563eb,#60a5fa)",height:"100%",borderRadius:100,width:`${((step+1)/questions.length)*100}%`,transition:"width 0.4s"}}/>
      </div>
      <div style={{fontFamily:"'Fredoka One',cursive",fontSize:19,color:"#1e3a8a",marginBottom:14,lineHeight:1.3}}>{q.question}</div>
      <div style={{display:"flex",flexDirection:"column",gap:7}}>
        {q.options.map(opt=>{
          const active=q.multi?(chosen||[]).includes(opt):chosen===opt;
          return <button key={opt} onClick={()=>select(opt)} style={{background:active?"linear-gradient(135deg,#2563eb,#60a5fa)":"white",color:active?"white":"#374151",border:active?"2px solid #2563eb":"2px solid #e5e7eb",borderRadius:10,padding:"11px 14px",textAlign:"left",fontFamily:"'Nunito',sans-serif",fontSize:13,fontWeight:700,cursor:"pointer"}}>{opt}</button>;
        })}
      </div>
      {q.additionalInfo&&(
        <div style={{marginTop:14}}>
          <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#0d9488",marginBottom:5}}>
            ✏️ {q.additionalInfoLabel||"Additional info (optional)"}
          </div>
          <textarea value={extras[q.id]||""} onChange={e=>setExtras({...extras,[q.id]:e.target.value})}
            placeholder="Type any extra details you'd like staff to know…" rows={3}
            style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",borderRadius:10,border:"2px solid #99f6e4",fontFamily:"'Nunito',sans-serif",fontSize:13,outline:"none",resize:"vertical",background:"#f0fdfa",color:"#134e4a"}}/>
        </div>
      )}
      <div style={{display:"flex",gap:10,marginTop:16}}>
        {step>0&&<button onClick={()=>setStep(s=>s-1)} style={{flex:1,background:"white",border:"2px solid #e5e7eb",borderRadius:10,padding:"10px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,color:"#6b7280",cursor:"pointer"}}>← Back</button>}
        <button disabled={!hasAnswer} onClick={()=>step<questions.length-1?setStep(s=>s+1):handleComplete()} style={{flex:2,background:hasAnswer?"linear-gradient(135deg,#2563eb,#60a5fa)":"#e5e7eb",color:hasAnswer?"white":"#9ca3af",border:"none",borderRadius:10,padding:"10px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:hasAnswer?"pointer":"not-allowed"}}>
          {step<questions.length-1?"Next →":submitLabel}
        </button>
      </div>
    </div>
  );
}

function PasswordGate({role,correctPassword,onSuccess,onBack}) {
  const [pw,setPw]=useState("");
  const [err,setErr]=useState("");
  const check=()=>{
    if(pw===correctPassword){onSuccess();}
    else{setErr("Incorrect password. Please try again.");setPw("");}
  };
  const colors={Staff:{bg:"linear-gradient(135deg,#1e3a8a,#2563eb)"},Volunteer:{bg:"linear-gradient(135deg,#2563eb,#60a5fa)"},Parent:{bg:"linear-gradient(135deg,#0d9488,#5eb8b0)"}};
  const c=colors[role]||colors.Volunteer;
  return (
    <div style={{padding:24,maxWidth:380,margin:"0 auto"}}>
      <Logo/>
      <div style={{marginTop:28,background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{background:c.bg,borderRadius:12,padding:"14px 16px",marginBottom:18,textAlign:"center"}}>
          <div style={{fontFamily:"'Fredoka One',cursive",fontSize:18,color:"white"}}>{role} Portal 🔒</div>
          <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"rgba(255,255,255,0.8)"}}>Enter your access password to continue</div>
        </div>
        <input value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()}
          type="password" placeholder="Enter password (10 characters)"
          style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:10,border:"2px solid #e5e7eb",fontFamily:"'Nunito',sans-serif",fontSize:14,outline:"none",marginBottom:8,letterSpacing:2}}/>
        {err&&<div style={{color:"#dc2626",fontFamily:"'Nunito',sans-serif",fontSize:12,marginBottom:8}}>{err}</div>}
        <button onClick={check} style={{width:"100%",background:"linear-gradient(135deg,#2563eb,#60a5fa)",color:"white",border:"none",borderRadius:10,padding:"12px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,cursor:"pointer",marginBottom:10}}>Enter →</button>
        <button onClick={onBack} style={{width:"100%",background:"white",border:"2px solid #e5e7eb",borderRadius:10,padding:"10px 0",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:13,color:"#6b7280",cursor:"pointer"}}>← Back</button>
      </div>
    </div>
  );
}

function ChildModal({child,onClose,onEdit,isStaff=false}) {
  if(!child) return null;
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,30,60,0.5)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={onClose}>
      <div style={{background:"white",borderRadius:24,padding:28,maxWidth:480,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.25)",position:"relative",maxHeight:"88vh",overflowY:"auto"}} onClick={e=>e.stopPropagation()}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"#eff6ff",border:"none",borderRadius:50,width:30,height:30,cursor:"pointer",fontSize:15,color:"#2563eb"}}>✕</button>
        {isStaff&&<button onClick={()=>onEdit(child)} style={{position:"absolute",top:14,right:52,background:"#fef3c7",border:"none",borderRadius:8,padding:"5px 10px",cursor:"pointer",fontSize:12,fontFamily:"'Nunito',sans-serif",fontWeight:800,color:"#92400e"}}>✏️ Edit</button>}
        {child.photoUrl?<img src={child.photoUrl} alt={child.name} style={{width:80,height:80,borderRadius:50,objectFit:"cover",marginBottom:8,border:"3px solid #dbeafe"}}/>:<div style={{fontSize:52,marginBottom:8}}>{child.photo}</div>}
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:26,color:"#1e3a8a"}}>{child.name}</div>
        <div style={{fontSize:13,color:"#60a5fa",marginBottom:16,fontFamily:"'Nunito',sans-serif"}}>{child.ageGroup}</div>
        {child.medicalNotes&&(
          <div style={{background:"#fff1f2",border:"2px solid #fca5a5",borderRadius:10,padding:"9px 13px",marginBottom:10,fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#991b1b",lineHeight:1.6}}>
            <strong>🏥 Medical / Allergy Alert:</strong> {child.medicalNotes}
          </div>
        )}
        {[["💡 Personality",child.personalityTips],["🗣️ Communication",child.communicationTips],["🎉 Activities",child.favoriteActivities],["📝 Volunteer Notes",child.volunteerNotes]].map(([l,v])=>(
          <div key={l} style={{marginBottom:10}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:12,color:"#1d4ed8",marginBottom:3}}>{l}</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#374151",background:"#f0f7ff",borderRadius:10,padding:"8px 12px",lineHeight:1.6}}>{v}</div>
          </div>
        ))}
        {!isStaff&&<div style={{background:"#fef3c7",borderRadius:10,padding:"8px 12px",marginTop:4,fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#92400e"}}>ℹ️ Only staff can edit child profiles.</div>}
        <div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:10}}>{child.interests.map(i=><Tag key={i} label={i}/>)}</div>
      </div>
    </div>
  );
}

function ChildFormModal({child,onClose,onSave}) {
  const blank={name:"",photo:"🌟",photoUrl:null,ageGroup:"Tweens (9–12)",interests:"",personalityTips:"",communicationTips:"",favoriteActivities:"",volunteerNotes:""};
  const [form,setForm]=useState(child?{...child,interests:(child.interests||[]).join(", ")}:blank);
  const set=(k,v)=>setForm(f=>({...f,[k]:v}));
  const valid=form.name.trim()&&form.personalityTips.trim()&&form.volunteerNotes.trim();
  const handleSave=()=>{
    if(!valid) return;
    onSave({...form,interests:form.interests.split(",").map(s=>s.trim()).filter(Boolean),id:child?child.id:Date.now()});
  };
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(20,30,60,0.6)",zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} onClick={onClose}>
      <div style={{background:"white",borderRadius:20,padding:24,maxWidth:500,width:"100%",maxHeight:"90vh",overflowY:"auto",boxShadow:"0 20px 60px rgba(0,0,0,0.3)"}} onClick={e=>e.stopPropagation()}>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:20,color:"#1e3a8a",marginBottom:2}}>{child?"✏️ Edit Child Profile":"➕ Add New Child"}</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#6b7280",marginBottom:16}}>🔒 Staff only · Changes sync to all users immediately</div>
        <PhotoUpload label="CHILD PHOTO (optional)" currentUrl={form.photoUrl} onUpload={url=>set("photoUrl",url)}/>
        <div style={{marginBottom:12}}>
          <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#1d4ed8",marginBottom:6}}>EMOJI ICON (fallback)</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{PHOTO_OPTIONS.map(p=><button key={p} onClick={()=>set("photo",p)} style={{fontSize:20,background:form.photo===p?"#dbeafe":"#f9fafb",border:form.photo===p?"2px solid #2563eb":"2px solid #e5e7eb",borderRadius:8,padding:"3px 7px",cursor:"pointer"}}>{p}</button>)}</div>
        </div>
        {[{label:"FULL NAME *",key:"name",placeholder:"Child's name"},{label:"INTERESTS (comma-separated)",key:"interests",placeholder:"e.g. Music, Swimming, Drawing"},{label:"PERSONALITY TIPS *",key:"personalityTips",ta:true},{label:"COMMUNICATION TIPS",key:"communicationTips",ta:true},{label:"FAVORITE ACTIVITIES",key:"favoriteActivities",ta:true},{label:"VOLUNTEER NOTES *",key:"volunteerNotes",ta:true}].map(({label,key,placeholder,ta})=>(
          <div key={key} style={{marginBottom:10}}>
            <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#1d4ed8",marginBottom:4}}>{label}</div>
            {ta?<textarea value={form[key]} onChange={e=>set(key,e.target.value)} placeholder={placeholder} rows={2} style={{width:"100%",boxSizing:"border-box",padding:"8px 11px",borderRadius:9,border:"2px solid #e5e7eb",fontFamily:"'Nunito',sans-serif",fontSize:13,outline:"none",resize:"vertical"}}/>
              :<input value={form[key]} onChange={e=>set(key,e.target.value)} placeholder={placeholder} style={{width:"100%",boxSizing:"border-box",padding:"8px 11px",borderRadius:9,border:"2px solid #e5e7eb",fontFamily:"'Nunito',sans-serif",fontSize:13,outline:"none"}}/>}
          </div>
        ))}
        <div style={{marginBottom:16}}>
          <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#1d4ed8",marginBottom:6}}>AGE GROUP</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{AGE_GROUPS.map(g=><button key={g} onClick={()=>set("ageGroup",g)} style={{padding:"5px 11px",borderRadius:20,border:"2px solid",borderColor:form.ageGroup===g?"#2563eb":"#e5e7eb",background:form.ageGroup===g?"#2563eb":"white",color:form.ageGroup===g?"white":"#6b7280",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11,cursor:"pointer"}}>{g}</button>)}</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onClose} style={{flex:1,background:"white",border:"2px solid #e5e7eb",borderRadius:10,padding:"10px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,color:"#6b7280",cursor:"pointer"}}>Cancel</button>
          <button onClick={handleSave} disabled={!valid} style={{flex:2,background:valid?"linear-gradient(135deg,#2563eb,#60a5fa)":"#e5e7eb",color:valid?"white":"#9ca3af",border:"none",borderRadius:10,padding:"10px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:valid?"pointer":"not-allowed"}}>{child?"Save Changes ✓":"Add Child ✓"}</button>
        </div>
      </div>
    </div>
  );
}
// ── PART 2: Parent Portal ──────────────────────────────────────
// Paste this AFTER Part 1

function ParentPlatform({onAddChild}) {
  const [screen,setScreen]=useState("intro");
  const [childName,setChildName]=useState("");
  const [childPhotoUrl,setChildPhotoUrl]=useState(null);
  const [childAge,setChildAge]=useState("Tweens (9–12)");
  const [surveyAnswers,setSurveyAnswers]=useState(null);

  const handleSurveyComplete=(answers)=>{
    setSurveyAnswers(answers);
    const interests=[];
    (answers.interests||[]).forEach(opt=>{
      if(opt.includes("Arts")) interests.push("Painting","Drawing");
      if(opt.includes("Music")) interests.push("Music","Singing");
      if(opt.includes("Sports")) interests.push("Swimming","Running","Playground");
      if(opt.includes("Social")) interests.push("Socializing","Feeling Included");
      if(opt.includes("Quiet")) interests.push("Quiet Activities","Calm Activities");
    });
    const extra=(key)=>answers[key+"_extra"]?` Additional detail: "${answers[key+"_extra"]}"`:""
    const personalityTips=[answers.personality?`Parent describes child as: ${answers.personality}.`:"",extra("personality")].filter(Boolean).join(" ");
    const communicationTips=[answers.communication?`Communication style: ${answers.communication}.`:"",extra("communication"),answers.sensory&&answers.sensory!=="No sensory sensitivities"?`Sensory note: ${answers.sensory}.`:"",extra("sensory")].filter(Boolean).join(" ");
    const medicalNotes=[answers.medical&&answers.medical.length>0&&!answers.medical.includes("No medical concerns at this time")?`⚠️ Medical needs: ${(answers.medical||[]).join(", ")}.`:"",extra("medical")].filter(Boolean).join(" ");
    const volunteerNotes=[answers.notes?`Parent's tip: ${answers.notes}.`:"",extra("notes"),medicalNotes?`\n🏥 Medical: ${medicalNotes}`:""].filter(Boolean).join(" ");
    const newChild={
      id:Date.now(),name:childName.trim(),photo:"🌟",photoUrl:childPhotoUrl,
      ageGroup:childAge,interests:interests.length?interests:["Social Connection"],
      personalityTips:personalityTips||"Parent-submitted profile.",
      communicationTips:communicationTips||"See parent notes.",
      favoriteActivities:[...interests].join(", ")||"To be discovered!",
      volunteerNotes:volunteerNotes||"New participant — get to know them!",
      medicalNotes:medicalNotes||"",
      addedByParent:true,
    };
    onAddChild(newChild);
    setScreen("done");
  };

  if(screen==="intro") return (
    <div style={{padding:24,maxWidth:420,margin:"0 auto"}}>
      <Logo/>
      <div style={{marginTop:24,background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{fontSize:40,textAlign:"center",marginBottom:8}}>👨‍👩‍👧</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:22,color:"#0d9488",textAlign:"center",marginBottom:6}}>Parent Portal</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6b7280",textAlign:"center",lineHeight:1.7,marginBottom:20}}>Help us get to know your child before their first Sun Circle session! Your answers will go directly to our staff and help us make the perfect volunteer pairing.</div>
        <button onClick={()=>setScreen("form")} style={{width:"100%",background:"linear-gradient(135deg,#0d9488,#5eb8b0)",color:"white",border:"none",borderRadius:12,padding:"13px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,cursor:"pointer"}}>Get Started →</button>
      </div>
    </div>
  );

  if(screen==="form") return (
    <div style={{padding:24,maxWidth:420,margin:"0 auto"}}>
      <Logo/>
      <div style={{marginTop:24,background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:20,color:"#0d9488",marginBottom:4}}>Tell us about your child</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#6b7280",marginBottom:16}}>This info stays with staff only and helps us care for your child.</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#0d9488",marginBottom:5}}>CHILD'S NAME</div>
        <input value={childName} onChange={e=>setChildName(e.target.value)} placeholder="First name"
          style={{width:"100%",boxSizing:"border-box",padding:"10px 13px",borderRadius:10,border:"2px solid #e5e7eb",fontFamily:"'Nunito',sans-serif",fontSize:14,outline:"none",marginBottom:14}}/>
        <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#0d9488",marginBottom:6}}>AGE GROUP</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:14}}>
          {AGE_GROUPS.map(g=><button key={g} onClick={()=>setChildAge(g)} style={{padding:"5px 11px",borderRadius:20,border:"2px solid",borderColor:childAge===g?"#0d9488":"#e5e7eb",background:childAge===g?"#0d9488":"white",color:childAge===g?"white":"#6b7280",fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11,cursor:"pointer"}}>{g}</button>)}
        </div>
        <PhotoUpload label="CHILD PHOTO (optional)" currentUrl={childPhotoUrl} onUpload={setChildPhotoUrl}/>
        <div style={{background:"#f0fdfa",border:"2px solid #99f6e4",borderRadius:10,padding:"9px 12px",marginBottom:16,fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#0f766e"}}>🔒 Photos are only visible to Friendship Circle staff.</div>
        <button onClick={()=>childName.trim()&&setScreen("survey")} disabled={!childName.trim()} style={{width:"100%",background:childName.trim()?"linear-gradient(135deg,#0d9488,#5eb8b0)":"#e5e7eb",color:childName.trim()?"white":"#9ca3af",border:"none",borderRadius:12,padding:"12px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:14,cursor:childName.trim()?"pointer":"not-allowed"}}>Continue to Questions →</button>
      </div>
    </div>
  );

  if(screen==="survey") return (
    <div style={{padding:24,maxWidth:440,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:18}}>
        <div style={{fontSize:40,marginBottom:6}}>❓</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:20,color:"#0d9488",marginBottom:4}}>About {childName}</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#6b7280",lineHeight:1.6}}>Just a few questions to help our volunteers connect with your child. There are no wrong answers!</div>
      </div>
      <div style={{background:"white",borderRadius:20,padding:22,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <SurveyFlow questions={PARENT_QUESTIONS} onComplete={handleSurveyComplete} submitLabel="Submit Profile ✓"/>
      </div>
    </div>
  );

  return (
    <div style={{padding:24,maxWidth:420,margin:"0 auto",textAlign:"center"}}>
      <Logo/>
      <div style={{marginTop:24,background:"white",borderRadius:20,padding:32,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{fontSize:52,marginBottom:10}}>🎉</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:24,color:"#0d9488",marginBottom:8}}>Thank you!</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:14,color:"#6b7280",lineHeight:1.7,marginBottom:16}}>{childName}'s profile has been added to our system. Our staff will review it and make sure their volunteer buddy is the perfect match. We can't wait to meet them! 💙</div>
        <div style={{background:"#f0fdfa",border:"2px solid #99f6e4",borderRadius:10,padding:"10px 14px",fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#0f766e",lineHeight:1.6}}>📋 Your information is only shared with Friendship Circle staff — never with other parents or volunteers directly.</div>
      </div>
    </div>
  );
}
// ── PART 3: Volunteer Portal ───────────────────────────────────
// Paste this AFTER Part 2

function VolunteerPlatform({volunteers,setVolunteers,pairings,children}) {
  const [screen,setScreen]=useState("login");
  const [currentVol,setCurrentVol]=useState(null);
  const [loginName,setLoginName]=useState("");
  const [loginErr,setLoginErr]=useState("");
  const [regName,setRegName]=useState("");
  const [regEmoji,setRegEmoji]=useState("🙋");
  const [selectedChild,setSelectedChild]=useState(null);
  const [checkedIn,setCheckedIn]=useState(false);
  const [showPhotoUpload,setShowPhotoUpload]=useState(false);
  const [photoCaption,setPhotoCaption]=useState("");
  const [uploadNotif,setUploadNotif]=useState("");
  const emojis=["🙋","👦","👧","🧑","👩","👨","🧒"];

  const handleLogin=()=>{
    const f=volunteers.find(v=>v.name.toLowerCase()===loginName.toLowerCase());
    if(!f){setLoginErr("Name not found. Please register first.");return;}
    setCurrentVol(f);setCheckedIn(f.approved?true:f.checkedIn?"pending":false);setScreen("home");setLoginErr("");
  };
  const handleRegister=()=>{
    if(!regName.trim()) return;
    const nv={id:"v"+Date.now(),name:regName.trim(),emoji:regEmoji,skills:[],online:false,checkedIn:false,approved:false,matches:[],photos:[]};
    setVolunteers(prev=>[...prev,nv]);setCurrentVol(nv);setScreen("survey");
  };
  const handleSurveyComplete=(answers)=>{
    const matched=computeMatches(answers,children);
    const topIds=matched.slice(0,3).map(c=>c.id);
    const interests=[];
    (answers.interests||[]).forEach(opt=>{
      if(opt.includes("Sports")) interests.push("Sports","Swimming");
      if(opt.includes("Arts")) interests.push("Arts","Music");
      if(opt.includes("Socializing")) interests.push("Socializing");
      if(opt.includes("Sensory")) interests.push("Calm Activities");
    });
    setVolunteers(prev=>prev.map(v=>v.id===currentVol.id?{...v,skills:interests,matches:topIds}:v));
    setCurrentVol(prev=>({...prev,skills:interests,matches:topIds}));
    setScreen("thankyou");
  };
  const handleCheckIn=()=>{
    if(checkedIn===true||checkedIn==="approved"){
      setCheckedIn(false);
      setVolunteers(prev=>prev.map(v=>v.id===currentVol.id?{...v,checkedIn:false,approved:false,online:false}:v));
    } else {
      setCheckedIn("pending");
      setVolunteers(prev=>prev.map(v=>v.id===currentVol.id?{...v,checkedIn:true,approved:false,online:false}:v));
    }
  };

  useEffect(()=>{
    if(!currentVol) return;
    const updated=volunteers.find(v=>v.id===currentVol.id);
    if(updated?.approved&&checkedIn==="pending"){setCheckedIn(true);setCurrentVol(prev=>({...prev,approved:true,online:true}));}
  },[volunteers]);

  const handlePhotoUpload=(url)=>{
    const entry={url,caption:photoCaption,timestamp:new Date().toLocaleTimeString(),volunteerId:currentVol.id,volunteerName:currentVol.name};
    setVolunteers(prev=>prev.map(v=>v.id===currentVol.id?{...v,photos:[...(v.photos||[]),entry]}:v));
    setPhotoCaption("");setShowPhotoUpload(false);
    setUploadNotif("📸 Photo shared with staff!");
    setTimeout(()=>setUploadNotif(""),3000);
  };

  const isApproved=currentVol?volunteers.find(v=>v.id===currentVol.id)?.approved||false:false;
  const myChildren=currentVol?pairings.filter(p=>p.volunteerId===currentVol.id).map(p=>children.find(c=>c.id===p.childId)).filter(Boolean):[];
  const myMatches=currentVol?children.filter(c=>(currentVol.matches||[]).includes(c.id)):[];

  if(screen==="login") return (
    <div style={{padding:24,maxWidth:400,margin:"0 auto"}}>
      <Logo/>
      <div style={{marginTop:24,background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:22,color:"#1e3a8a",marginBottom:4}}>Welcome Back!</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6b7280",marginBottom:16}}>Sign in with your name to continue.</div>
        <input value={loginName} onChange={e=>setLoginName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} placeholder="Your full name"
          style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:10,border:"2px solid #e5e7eb",fontFamily:"'Nunito',sans-serif",fontSize:14,outline:"none",marginBottom:8}}/>
        {loginErr&&<div style={{color:"#dc2626",fontFamily:"'Nunito',sans-serif",fontSize:12,marginBottom:8}}>{loginErr}</div>}
        <button onClick={handleLogin} style={{width:"100%",background:"linear-gradient(135deg,#2563eb,#60a5fa)",color:"white",border:"none",borderRadius:10,padding:"12px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,cursor:"pointer",marginBottom:12}}>Sign In →</button>
        <div style={{textAlign:"center",fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6b7280"}}>New volunteer? <span onClick={()=>setScreen("register")} style={{color:"#2563eb",fontWeight:800,cursor:"pointer"}}>Register here</span></div>
      </div>
    </div>
  );

  if(screen==="register") return (
    <div style={{padding:24,maxWidth:400,margin:"0 auto"}}>
      <Logo/>
      <div style={{marginTop:24,background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:22,color:"#1e3a8a",marginBottom:4}}>Join Buddy Up! 🤝</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6b7280",marginBottom:16}}>Create your volunteer profile in seconds.</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#1d4ed8",marginBottom:5}}>YOUR NAME</div>
        <input value={regName} onChange={e=>setRegName(e.target.value)} placeholder="Full name"
          style={{width:"100%",boxSizing:"border-box",padding:"11px 14px",borderRadius:10,border:"2px solid #e5e7eb",fontFamily:"'Nunito',sans-serif",fontSize:14,outline:"none",marginBottom:14}}/>
        <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#1d4ed8",marginBottom:7}}>PICK YOUR AVATAR</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16}}>
          {emojis.map(e=><button key={e} onClick={()=>setRegEmoji(e)} style={{fontSize:22,background:regEmoji===e?"#dbeafe":"#f9fafb",border:regEmoji===e?"2px solid #2563eb":"2px solid #e5e7eb",borderRadius:10,padding:"5px 9px",cursor:"pointer"}}>{e}</button>)}
        </div>
        <button onClick={handleRegister} disabled={!regName.trim()} style={{width:"100%",background:regName.trim()?"linear-gradient(135deg,#2563eb,#60a5fa)":"#e5e7eb",color:regName.trim()?"white":"#9ca3af",border:"none",borderRadius:10,padding:"12px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:14,cursor:regName.trim()?"pointer":"not-allowed",marginBottom:12}}>Continue to Matching Quiz →</button>
        <div style={{textAlign:"center",fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6b7280"}}>Already registered? <span onClick={()=>setScreen("login")} style={{color:"#2563eb",fontWeight:800,cursor:"pointer"}}>Sign in</span></div>
      </div>
    </div>
  );

  if(screen==="survey") return (
    <div style={{padding:24,maxWidth:440,margin:"0 auto"}}>
      <div style={{textAlign:"center",marginBottom:18}}>
        <div style={{fontSize:40,marginBottom:5}}>💫</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:21,color:"#1e3a8a",marginBottom:4}}>One-Time Matching Quiz</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#6b7280",lineHeight:1.6}}>We'll use your answers to suggest the best-fit kids. You'll never have to retake this!</div>
      </div>
      <div style={{background:"#fffbeb",border:"2px solid #fcd34d",borderRadius:12,padding:"11px 14px",marginBottom:9,display:"flex",gap:9}}>
        <span style={{fontSize:18}}>🌟</span>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#92400e",lineHeight:1.6}}><strong>A heads up:</strong> Our younger kids (ages 5–8) bring so much joy — and they also need extra patience and creativity. If you're newer to working with kids, tweens and teens can be a wonderful start!</div>
      </div>
      <div style={{background:"#eff6ff",border:"2px solid #93c5fd",borderRadius:12,padding:"11px 14px",marginBottom:14,display:"flex",gap:9}}>
        <span style={{fontSize:18}}>💙</span>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#1e40af",lineHeight:1.6}}><strong>Just so you know:</strong> Your results are a <em>guideline</em> — staff make all official pairings. We truly appreciate you sharing your preferences!</div>
      </div>
      <div style={{background:"white",borderRadius:20,padding:22,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <SurveyFlow questions={SURVEY_QUESTIONS} onComplete={handleSurveyComplete} submitLabel="Find My Matches! ✨"/>
      </div>
    </div>
  );

  if(screen==="thankyou") return (
    <div style={{padding:24,maxWidth:420,margin:"0 auto",textAlign:"center"}}>
      <Logo/>
      <div style={{marginTop:24,background:"white",borderRadius:20,padding:28,boxShadow:"0 4px 20px rgba(0,0,0,0.08)"}}>
        <div style={{fontSize:52,marginBottom:10}}>🎉</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:24,color:"#1e3a8a",marginBottom:8}}>Thank you for volunteering!</div>
        <div style={{fontFamily:"'Nunito',sans-serif",fontSize:13,color:"#6b7280",lineHeight:1.7,marginBottom:16}}>You're officially part of the Friendship Circle family. 💙 Your quiz results have been saved — our staff will use them to make the best possible pairings. We're so grateful for your time and heart.</div>
        <div style={{background:"#eff6ff",border:"2px solid #93c5fd",borderRadius:10,padding:"10px 13px",marginBottom:16,fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#1e40af",lineHeight:1.6}}>📋 Your matches are a <strong>guideline</strong> — official pairings confirmed by staff before each session.</div>
        <button onClick={()=>setScreen("home")} style={{width:"100%",background:"linear-gradient(135deg,#2563eb,#60a5fa)",color:"white",border:"none",borderRadius:12,padding:"13px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:15,cursor:"pointer"}}>Go to My Dashboard →</button>
      </div>
    </div>
  );

  // HOME SCREEN
  return (
    <div style={{maxWidth:480,margin:"0 auto"}}>
      <div style={{background:"white",borderBottom:"2px solid #eff6ff",padding:"16px 20px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <span style={{fontSize:30}}>{currentVol?.emoji}</span>
          <div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:17,color:"#1e3a8a"}}>Hi, {currentVol?.name?.split(" ")[0]}!</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:isApproved?"#059669":checkedIn==="pending"?"#d97706":"#9ca3af",fontWeight:700}}>{isApproved?"🟢 Checked In & Approved":checkedIn==="pending"?"⏳ Awaiting Approval":"⚫ Not Checked In"}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:6}}>
          <button onClick={()=>setShowPhotoUpload(true)} style={{background:"#f0f7ff",border:"none",borderRadius:8,padding:"5px 10px",fontFamily:"'Nunito',sans-serif",fontSize:11,fontWeight:700,color:"#2563eb",cursor:"pointer"}}>📸 Share Photo</button>
          <button onClick={()=>{setScreen("login");setCurrentVol(null);setCheckedIn(false);}} style={{background:"#f1f5f9",border:"none",borderRadius:8,padding:"5px 10px",fontFamily:"'Nunito',sans-serif",fontSize:11,fontWeight:700,color:"#6b7280",cursor:"pointer"}}>Sign Out</button>
        </div>
      </div>

      {uploadNotif&&<div style={{background:"#dbeafe",border:"2px solid #60a5fa",borderRadius:10,padding:"9px 14px",margin:"10px 16px 0",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:"#1e3a8a",fontSize:13}}>{uploadNotif}</div>}

      <div style={{padding:"16px 14px"}}>
        {checkedIn==="pending"?(
          <div style={{background:"linear-gradient(135deg,#fffbeb,#fef3c7)",border:"2px solid #fcd34d",borderRadius:18,padding:18,marginBottom:18,textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:7}}>⏳</div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:17,color:"#92400e",marginBottom:4}}>Waiting for staff approval…</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#b45309",marginBottom:12,lineHeight:1.6}}>Your check-in request was sent! A staff member will confirm your arrival shortly.</div>
            <button onClick={handleCheckIn} style={{background:"white",color:"#dc2626",border:"2px solid #fca5a5",borderRadius:10,padding:"9px 20px",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:12,cursor:"pointer"}}>Cancel Check-In</button>
          </div>
        ):(
          <div style={{background:isApproved?"linear-gradient(135deg,#ecfdf5,#d1fae5)":"linear-gradient(135deg,#eff6ff,#dbeafe)",border:isApproved?"2px solid #34d399":"2px solid #93c5fd",borderRadius:18,padding:18,marginBottom:18,textAlign:"center"}}>
            <div style={{fontSize:32,marginBottom:7}}>{isApproved?"✅":"📍"}</div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:17,color:isApproved?"#065f46":"#1e3a8a",marginBottom:4}}>{isApproved?"You're checked in & approved!":"Ready to arrive?"}</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:isApproved?"#047857":"#3b82f6",marginBottom:12}}>{isApproved?"Staff confirmed you're here. Have a great session! 🌟":"Tap below when you arrive at the program."}</div>
            {isApproved&&myChildren.length>0&&(
              <div style={{background:"white",border:"2px solid #6ee7b7",borderRadius:10,padding:"10px 12px",marginBottom:12,textAlign:"left"}}>
                <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#065f46",marginBottom:7}}>🤝 YOU'VE BEEN PAIRED WITH:</div>
                {myChildren.map(c=>(
                  <div key={c.id} onClick={()=>setSelectedChild(c)} style={{display:"flex",alignItems:"center",gap:9,background:"#f0fdf4",borderRadius:9,padding:"7px 9px",marginBottom:5,cursor:"pointer"}}>
                    {c.photoUrl?<img src={c.photoUrl} style={{width:32,height:32,borderRadius:50,objectFit:"cover"}} alt={c.name}/>:<span style={{fontSize:22}}>{c.photo}</span>}
                    <div style={{flex:1}}>
                      <div style={{fontFamily:"'Fredoka One',cursive",fontSize:14,color:"#065f46"}}>{c.name}</div>
                      <div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#34d399"}}>{c.ageGroup} · Tap for tips</div>
                    </div>
                    <span style={{fontSize:13,color:"#34d399"}}>→</span>
                  </div>
                ))}
              </div>
            )}
            {isApproved&&myChildren.length===0&&<div style={{background:"white",border:"2px solid #6ee7b7",borderRadius:10,padding:"10px 12px",marginBottom:12,fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#065f46"}}>⏳ Staff are finalizing your pairing — check back shortly!</div>}
            <button onClick={handleCheckIn} style={{background:isApproved?"white":"linear-gradient(135deg,#2563eb,#60a5fa)",color:isApproved?"#dc2626":"white",border:isApproved?"2px solid #fca5a5":"none",borderRadius:10,padding:"10px 24px",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:13,cursor:"pointer"}}>{isApproved?"Check Out":"✅ Check In Now"}</button>
          </div>
        )}

        {myChildren.length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#1e3a8a",marginBottom:8}}>👧 My Kids This Session</div>
            {myChildren.map(c=>(
              <div key={c.id} onClick={()=>setSelectedChild(c)} style={{background:"white",border:"2px solid #dbeafe",borderRadius:12,padding:12,marginBottom:7,display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
                {c.photoUrl?<img src={c.photoUrl} style={{width:40,height:40,borderRadius:50,objectFit:"cover"}} alt={c.name}/>:<span style={{fontSize:28}}>{c.photo}</span>}
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:15,color:"#1e3a8a"}}>{c.name}</div>
                  <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#60a5fa"}}>{c.ageGroup}</div>
                </div>
                <span style={{color:"#2563eb",fontSize:15}}>→</span>
              </div>
            ))}
          </div>
        )}

        {myMatches.length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#1e3a8a",marginBottom:3}}>⭐ Your Best Matches</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#6b7280",marginBottom:8}}>Based on your one-time quiz results</div>
            {myMatches.map((c,i)=>(
              <div key={c.id} onClick={()=>setSelectedChild(c)} style={{background:i===0?"linear-gradient(135deg,#fff8e7,#fff3d0)":"white",border:i===0?"2px solid #f59e0b":"2px solid #e8e4f0",borderRadius:12,padding:12,marginBottom:7,display:"flex",alignItems:"center",gap:10,cursor:"pointer"}}>
                {c.photoUrl?<img src={c.photoUrl} style={{width:36,height:36,borderRadius:50,objectFit:"cover"}} alt={c.name}/>:<span style={{fontSize:26}}>{c.photo}</span>}
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Fredoka One',cursive",fontSize:14,color:"#1e3a8a"}}>{c.name}</div>
                  <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#60a5fa"}}>{c.ageGroup}</div>
                </div>
                {i===0&&<Tag label="⭐ Top" color="#fef3c7" text="#92400e"/>}
              </div>
            ))}
          </div>
        )}
      </div>

      {showPhotoUpload&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,30,60,0.5)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowPhotoUpload(false)}>
          <div style={{background:"white",borderRadius:20,padding:26,maxWidth:400,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:20,color:"#1e3a8a",marginBottom:2}}>📸 Share a Photo</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:12,color:"#6b7280",marginBottom:14}}>🔒 Photos are only shared with Friendship Circle staff — never with other volunteers or parents.</div>
            <PhotoUpload onUpload={handlePhotoUpload}/>
            <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#1d4ed8",marginBottom:5}}>ADD A CAPTION (optional)</div>
            <input value={photoCaption} onChange={e=>setPhotoCaption(e.target.value)} placeholder="e.g. Painting time with Emma!"
              style={{width:"100%",boxSizing:"border-box",padding:"9px 12px",borderRadius:9,border:"2px solid #e5e7eb",fontFamily:"'Nunito',sans-serif",fontSize:13,outline:"none",marginBottom:14}}/>
            <button onClick={()=>setShowPhotoUpload(false)} style={{width:"100%",background:"white",border:"2px solid #e5e7eb",borderRadius:10,padding:"10px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,color:"#6b7280",cursor:"pointer"}}>Cancel</button>
          </div>
        </div>
      )}

      <ChildModal child={selectedChild} onClose={()=>setSelectedChild(null)} isStaff={false}/>
    </div>
  );
}
// ── PART 4: Staff Portal + Root App ───────────────────────────
// Paste this AFTER Part 3. This is the final section.

function StaffPlatform({volunteers,setVolunteers,pairings,setPairings,children,setChildren}) {
  const [activeView,setActiveView]=useState("pairings");
  const [showAddModal,setShowAddModal]=useState(false);
  const [newPairing,setNewPairing]=useState({volunteerId:"",childId:""});
  const [notification,setNotification]=useState("");
  const [selectedChild,setSelectedChild]=useState(null);
  const [showChildForm,setShowChildForm]=useState(false);
  const [childToEdit,setChildToEdit]=useState(null);

  const notify=msg=>{setNotification(msg);setTimeout(()=>setNotification(""),3500);};
  const onlineVols=volunteers.filter(v=>v.online&&v.approved);
  const pendingVols=volunteers.filter(v=>v.checkedIn&&!v.approved);
  const unpairedChildren=children.filter(c=>!pairings.some(p=>p.childId===c.id));
  const allPhotos=volunteers.flatMap(v=>(v.photos||[]).map(p=>({...p,volunteerEmoji:v.emoji})));

  const approveVol=(id)=>{setVolunteers(prev=>prev.map(v=>v.id===id?{...v,approved:true,online:true}:v));notify(`✅ ${volunteers.find(v=>v.id===id)?.name} approved!`);};
  const denyVol=(id)=>{setVolunteers(prev=>prev.map(v=>v.id===id?{...v,checkedIn:false,approved:false,online:false}:v));notify(`❌ ${volunteers.find(v=>v.id===id)?.name}'s check-in declined.`);};
  const handleSaveChild=(data)=>{
    if(childToEdit){setChildren(prev=>prev.map(c=>c.id===data.id?data:c));notify("✅ Profile updated & synced!");}
    else{setChildren(prev=>[...prev,data]);notify("✅ New child added & visible to all!");}
    setShowChildForm(false);setChildToEdit(null);
  };
  const addPairing=()=>{
    if(!newPairing.volunteerId||!newPairing.childId) return;
    setPairings(prev=>[...prev,{volunteerId:newPairing.volunteerId,childId:parseInt(newPairing.childId)}]);
    notify("✅ Pairing added!");setShowAddModal(false);setNewPairing({volunteerId:"",childId:""});
  };
  const volPairings=volunteers.map(v=>({...v,children:pairings.filter(p=>p.volunteerId===v.id).map(p=>children.find(c=>c.id===p.childId)).filter(Boolean)}));

  return (
    <div style={{maxWidth:680,margin:"0 auto"}}>
      <div style={{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",padding:"16px 20px",display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:26}}>🖥️</span>
        <div><div style={{fontFamily:"'Fredoka One',cursive",fontSize:19,color:"white"}}>Staff Dashboard</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#bfdbfe",fontWeight:600}}>Sun Circle Program · Live View</div></div>
        <div style={{marginLeft:"auto",display:"flex",gap:5,alignItems:"center"}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:"#34d399"}}/>
          <span style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#34d399",fontWeight:700}}>{onlineVols.length} Online</span>
        </div>
      </div>

      {notification&&<div style={{background:"#dbeafe",border:"2px solid #60a5fa",borderRadius:9,padding:"9px 14px",margin:"10px 14px 0",fontFamily:"'Nunito',sans-serif",fontWeight:700,color:"#1e3a8a",fontSize:12}}>{notification}</div>}

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7,padding:"14px 14px 0"}}>
        {[{label:"Online",value:onlineVols.length,color:"#059669",bg:"#ecfdf5",emoji:"🟢"},{label:"Pending",value:pendingVols.length,color:"#d97706",bg:"#fffbeb",emoji:"⏳"},{label:"Paired",value:[...new Set(pairings.map(p=>p.childId))].length,color:"#2563eb",bg:"#eff6ff",emoji:"🤝"},{label:"Unpaired",value:unpairedChildren.length,color:"#dc2626",bg:"#fef2f2",emoji:"⚠️"}].map(s=>(
          <div key={s.label} style={{background:s.bg,borderRadius:11,padding:"9px 6px",textAlign:"center"}}>
            <div style={{fontSize:16}}>{s.emoji}</div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:20,color:s.color}}>{s.value}</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:800,color:s.color}}>{s.label}</div>
          </div>
        ))}
      </div>

      {pendingVols.length>0&&(
        <div style={{margin:"10px 14px 0",background:"#fffbeb",border:"2px solid #fcd34d",borderRadius:11,padding:"10px 13px"}}>
          <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#92400e",marginBottom:7}}>⏳ PENDING APPROVALS ({pendingVols.length})</div>
          {pendingVols.map(v=>(
            <div key={v.id} style={{background:"white",border:"1px solid #fde68a",borderRadius:9,padding:"8px 10px",marginBottom:5,display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:20}}>{v.emoji}</span>
              <div style={{flex:1}}><div style={{fontFamily:"'Fredoka One',cursive",fontSize:13,color:"#1e3a8a"}}>{v.name}</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#92400e"}}>Requesting check-in</div></div>
              <button onClick={()=>approveVol(v.id)} style={{background:"#d1fae5",border:"none",borderRadius:7,padding:"4px 10px",fontFamily:"'Nunito',sans-serif",fontSize:11,fontWeight:800,color:"#065f46",cursor:"pointer"}}>✅ Approve</button>
              <button onClick={()=>denyVol(v.id)} style={{background:"#fee2e2",border:"none",borderRadius:7,padding:"4px 10px",fontFamily:"'Nunito',sans-serif",fontSize:11,fontWeight:800,color:"#dc2626",cursor:"pointer"}}>✕ Deny</button>
            </div>
          ))}
        </div>
      )}

      {onlineVols.length>0&&(
        <div style={{margin:"10px 14px 0",background:"#ecfdf5",border:"2px solid #34d399",borderRadius:11,padding:"9px 13px"}}>
          <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#065f46",marginBottom:5}}>🟢 CHECKED IN</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
            {onlineVols.map(v=><div key={v.id} style={{background:"white",border:"1px solid #6ee7b7",borderRadius:20,padding:"3px 10px",display:"flex",alignItems:"center",gap:5}}><span style={{fontSize:14}}>{v.emoji}</span><span style={{fontFamily:"'Nunito',sans-serif",fontWeight:700,fontSize:11,color:"#065f46"}}>{v.name}</span></div>)}
          </div>
        </div>
      )}

      <div style={{display:"flex",gap:6,padding:"11px 14px 0",flexWrap:"wrap"}}>
        {[["pairings","📋 Pairings"],["roster","👥 Roster"],["unpaired","⚠️ Unpaired"],["children","👧 Children"],["photos","📸 Photos"]].map(([id,label])=>(
          <button key={id} onClick={()=>setActiveView(id)} style={{flex:1,minWidth:60,padding:"7px 3px",borderRadius:9,border:"2px solid",borderColor:activeView===id?"#2563eb":"#e5e7eb",background:activeView===id?"#2563eb":"white",color:activeView===id?"white":"#6b7280",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:10,cursor:"pointer"}}>{label}</button>
        ))}
      </div>

      <div style={{padding:"11px 14px 24px"}}>
        {activeView==="pairings"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
              <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#1e3a8a"}}>This Session's Pairings</div>
              <button onClick={()=>setShowAddModal(true)} style={{background:"linear-gradient(135deg,#2563eb,#60a5fa)",color:"white",border:"none",borderRadius:8,padding:"6px 11px",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,cursor:"pointer"}}>+ Add Pairing</button>
            </div>
            {volPairings.filter(v=>v.children.length>0).map(v=>(
              <div key={v.id} style={{background:"white",border:v.online?"2px solid #34d399":"2px solid #dbeafe",borderRadius:13,padding:13,marginBottom:9}}>
                <div style={{display:"flex",alignItems:"center",gap:9,marginBottom:7}}>
                  <span style={{fontSize:20}}>{v.emoji}</span>
                  <div style={{flex:1}}><div style={{fontFamily:"'Fredoka One',cursive",fontSize:14,color:"#1e3a8a"}}>{v.name}</div></div>
                  <div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:7,height:7,borderRadius:"50%",background:v.online?"#34d399":"#d1d5db"}}/><span style={{fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:700,color:v.online?"#059669":"#9ca3af"}}>{v.online?"Online":"Offline"}</span></div>
                </div>
                {v.children.map(child=>(
                  <div key={child.id} style={{display:"flex",alignItems:"center",gap:9,background:"#f0f7ff",borderRadius:9,padding:"7px 9px",marginBottom:5}}>
                    {child.photoUrl?<img src={child.photoUrl} style={{width:28,height:28,borderRadius:50,objectFit:"cover"}} alt={child.name}/>:<span style={{fontSize:18}}>{child.photo}</span>}
                    <div style={{flex:1}}><div style={{fontFamily:"'Fredoka One',cursive",fontSize:13,color:"#1e3a8a"}}>{child.name}</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#60a5fa"}}>{child.ageGroup}</div></div>
                    <button onClick={()=>setSelectedChild(child)} style={{background:"#dbeafe",border:"none",borderRadius:6,padding:"3px 7px",fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:800,color:"#1d4ed8",cursor:"pointer"}}>View</button>
                    <button onClick={()=>setPairings(prev=>prev.filter(p=>!(p.volunteerId===v.id&&p.childId===child.id)))} style={{background:"#fee2e2",border:"none",borderRadius:6,padding:"3px 7px",fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:800,color:"#dc2626",cursor:"pointer"}}>✕</button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeView==="roster"&&(
          <div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#1e3a8a",marginBottom:9}}>All Volunteers</div>
            {volunteers.map(v=>(
              <div key={v.id} style={{background:"white",border:v.online?"2px solid #34d399":"2px solid #e5e7eb",borderRadius:11,padding:11,marginBottom:7,display:"flex",alignItems:"center",gap:9}}>
                <span style={{fontSize:24}}>{v.emoji}</span>
                <div style={{flex:1}}><div style={{fontFamily:"'Fredoka One',cursive",fontSize:14,color:"#1e3a8a"}}>{v.name}</div><div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:2}}>{v.skills.slice(0,2).map(s=><Tag key={s} label={s}/>)}</div></div>
                <div style={{display:"flex",alignItems:"center",gap:3}}><div style={{width:8,height:8,borderRadius:"50%",background:v.online?"#34d399":"#d1d5db"}}/><span style={{fontFamily:"'Nunito',sans-serif",fontSize:11,fontWeight:700,color:v.online?"#059669":"#9ca3af"}}>{v.online?"Online":"Offline"}</span></div>
              </div>
            ))}
          </div>
        )}

        {activeView==="unpaired"&&(
          <div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#1e3a8a",marginBottom:3}}>Kids Without a Buddy</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#6b7280",marginBottom:9}}>These children still need to be paired for this session.</div>
            {unpairedChildren.length===0
              ?<div style={{background:"#d1fae5",borderRadius:13,padding:20,textAlign:"center"}}><div style={{fontSize:30,marginBottom:5}}>🎉</div><div style={{fontFamily:"'Fredoka One',cursive",fontSize:17,color:"#065f46"}}>All kids are paired!</div></div>
              :unpairedChildren.map(c=>(
                <div key={c.id} style={{background:"white",border:"2px solid #fde68a",borderRadius:11,padding:11,marginBottom:7,display:"flex",alignItems:"center",gap:9}}>
                  {c.photoUrl?<img src={c.photoUrl} style={{width:32,height:32,borderRadius:50,objectFit:"cover"}} alt={c.name}/>:<span style={{fontSize:24}}>{c.photo}</span>}
                  <div style={{flex:1}}><div style={{fontFamily:"'Fredoka One',cursive",fontSize:14,color:"#1e3a8a"}}>{c.name}</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#60a5fa"}}>{c.ageGroup}{c.addedByParent?" · 👨‍👩‍👧 Parent-submitted":""}</div></div>
                  <button onClick={()=>setSelectedChild(c)} style={{background:"#dbeafe",border:"none",borderRadius:6,padding:"4px 9px",fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:800,color:"#1d4ed8",cursor:"pointer"}}>Profile</button>
                </div>
              ))
            }
          </div>
        )}

        {activeView==="children"&&(
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}>
              <div><div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#1e3a8a"}}>Child Database</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#6b7280"}}>🔒 Staff only · Changes sync to all users</div></div>
              <button onClick={()=>{setChildToEdit(null);setShowChildForm(true);}} style={{background:"linear-gradient(135deg,#2563eb,#60a5fa)",color:"white",border:"none",borderRadius:8,padding:"6px 11px",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,cursor:"pointer"}}>+ Add Child</button>
            </div>
            {children.map(c=>(
              <div key={c.id} style={{background:"white",border:"2px solid #dbeafe",borderRadius:11,padding:11,marginBottom:7,display:"flex",alignItems:"center",gap:9}}>
                {c.photoUrl?<img src={c.photoUrl} style={{width:36,height:36,borderRadius:50,objectFit:"cover"}} alt={c.name}/>:<span style={{fontSize:24}}>{c.photo}</span>}
                <div style={{flex:1}}><div style={{fontFamily:"'Fredoka One',cursive",fontSize:14,color:"#1e3a8a"}}>{c.name}</div><div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#60a5fa",marginBottom:2}}>{c.ageGroup}{c.addedByParent?" · 👨‍👩‍👧 Parent-submitted":""}</div><div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{c.interests.slice(0,3).map(i=><Tag key={i} label={i}/>)}</div></div>
                <div style={{display:"flex",flexDirection:"column",gap:4}}>
                  <button onClick={()=>setSelectedChild(c)} style={{background:"#dbeafe",border:"none",borderRadius:6,padding:"3px 8px",fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:800,color:"#1d4ed8",cursor:"pointer"}}>View</button>
                  <button onClick={()=>{setChildToEdit(c);setShowChildForm(true);}} style={{background:"#fef3c7",border:"none",borderRadius:6,padding:"3px 8px",fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:800,color:"#92400e",cursor:"pointer"}}>✏️ Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeView==="photos"&&(
          <div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#1e3a8a",marginBottom:3}}>📸 Volunteer Photos</div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#6b7280",marginBottom:9}}>🔒 Submitted by volunteers — staff eyes only.</div>
            {allPhotos.length===0
              ?<div style={{background:"#f9fafb",borderRadius:13,padding:24,textAlign:"center",color:"#9ca3af",fontFamily:"'Nunito',sans-serif",fontSize:13}}>No photos submitted yet.</div>
              :<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(140px,1fr))",gap:10}}>
                {allPhotos.map((p,i)=>(
                  <div key={i} style={{background:"white",border:"2px solid #dbeafe",borderRadius:11,overflow:"hidden"}}>
                    <img src={p.url} alt="volunteer photo" style={{width:"100%",height:100,objectFit:"cover"}}/>
                    <div style={{padding:"7px 9px"}}>
                      <div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,fontWeight:700,color:"#1e3a8a"}}>{p.volunteerEmoji} {p.volunteerName}</div>
                      {p.caption&&<div style={{fontFamily:"'Nunito',sans-serif",fontSize:10,color:"#6b7280",marginTop:2}}>{p.caption}</div>}
                      <div style={{fontFamily:"'Nunito',sans-serif",fontSize:9,color:"#9ca3af",marginTop:2}}>{p.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            }
          </div>
        )}
      </div>

      {showAddModal&&(
        <div style={{position:"fixed",inset:0,background:"rgba(20,30,60,0.5)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20}} onClick={()=>setShowAddModal(false)}>
          <div style={{background:"white",borderRadius:18,padding:24,maxWidth:380,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.25)"}} onClick={e=>e.stopPropagation()}>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:19,color:"#1e3a8a",marginBottom:14}}>➕ Add Pairing</div>
            {[{label:"Volunteer",key:"volunteerId",opts:volunteers.map(v=>({val:v.id,label:`${v.name} ${v.online?"🟢":""}`}))},{label:"Child",key:"childId",opts:children.map(c=>({val:c.id,label:`${c.name} (${c.ageGroup})`}))}].map(({label,key,opts})=>(
              <div key={key} style={{marginBottom:11}}>
                <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,color:"#1d4ed8",marginBottom:4}}>{label.toUpperCase()}</div>
                <select value={newPairing[key]} onChange={e=>setNewPairing({...newPairing,[key]:e.target.value})} style={{width:"100%",padding:"9px 11px",borderRadius:9,border:"2px solid #e5e7eb",fontFamily:"'Nunito',sans-serif",fontSize:12,outline:"none"}}>
                  <option value="">-- Select {label} --</option>
                  {opts.map(o=><option key={o.val} value={o.val}>{o.label}</option>)}
                </select>
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:14}}>
              <button onClick={()=>setShowAddModal(false)} style={{flex:1,background:"white",border:"2px solid #e5e7eb",borderRadius:9,padding:"10px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,color:"#6b7280",cursor:"pointer"}}>Cancel</button>
              <button onClick={addPairing} style={{flex:2,background:"linear-gradient(135deg,#2563eb,#60a5fa)",color:"white",border:"none",borderRadius:9,padding:"10px 0",fontFamily:"'Nunito',sans-serif",fontWeight:800,cursor:"pointer"}}>Confirm ✓</button>
            </div>
          </div>
        </div>
      )}
      {showChildForm&&<ChildFormModal child={childToEdit} onClose={()=>{setShowChildForm(false);setChildToEdit(null);}} onSave={handleSaveChild}/>}
      <ChildModal child={selectedChild} onClose={()=>setSelectedChild(null)} onEdit={(c)=>{setChildToEdit(c);setShowChildForm(true);setSelectedChild(null);}} isStaff={true}/>
    </div>
  );
}

// ─── ROOT APP ──────────────────────────────────────────────────────
export default function App() {
  const [view,setView]=useState("split");
  const [volunteers,setVolunteers]=useState(SEED_VOLUNTEERS);
  const [pairings,setPairings]=useState(INITIAL_PAIRINGS);
  const [children,setChildren]=useState(INITIAL_CHILDREN);
  const [volPwOk,setVolPwOk]=useState(false);
  const [staffPwOk,setStaffPwOk]=useState(false);
  const [parentPwOk,setParentPwOk]=useState(false);

  useEffect(()=>{
    const link=document.createElement("link");
    link.href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap";
    link.rel="stylesheet";
    document.head.appendChild(link);
  },[]);

  const renderVolunteer=()=>{
    if(!volPwOk) return <PasswordGate role="Volunteer" correctPassword={VOLUNTEER_PASSWORD} onSuccess={()=>setVolPwOk(true)} onBack={()=>setVolPwOk(false)}/>;
    return <VolunteerPlatform volunteers={volunteers} setVolunteers={setVolunteers} pairings={pairings} children={children}/>;
  };
  const renderStaff=()=>{
    if(!staffPwOk) return <PasswordGate role="Staff" correctPassword={STAFF_PASSWORD} onSuccess={()=>setStaffPwOk(true)} onBack={()=>setStaffPwOk(false)}/>;
    return <StaffPlatform volunteers={volunteers} setVolunteers={setVolunteers} pairings={pairings} setPairings={setPairings} children={children} setChildren={setChildren}/>;
  };
  const renderParent=()=>{
    if(!parentPwOk) return <PasswordGate role="Parent" correctPassword={PARENT_PASSWORD} onSuccess={()=>setParentPwOk(true)} onBack={()=>setParentPwOk(false)}/>;
    return <ParentPlatform onAddChild={(c)=>setChildren(prev=>[...prev,c])}/>;
  };

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#eff6ff 0%,#f0f9ff 50%,#f8fbff 100%)",fontFamily:"'Nunito',sans-serif"}}>
      <div style={{background:"#1e3a8a",padding:"9px 14px",display:"flex",alignItems:"center",justifyContent:"center",gap:7,flexWrap:"wrap"}}>
        <span style={{fontFamily:"'Nunito',sans-serif",fontSize:11,color:"#93c5fd",fontWeight:700,marginRight:3}}>👁️ Preview:</span>
        {[["split","⚡ Split"],["volunteer","📱 Volunteer"],["staff","🖥️ Staff"],["parent","👨‍👩‍👧 Parent"]].map(([id,label])=>(
          <button key={id} onClick={()=>setView(id)} style={{background:view===id?"white":"transparent",color:view===id?"#1e3a8a":"#bfdbfe",border:view===id?"none":"2px solid #3b82f6",borderRadius:20,padding:"4px 12px",fontFamily:"'Nunito',sans-serif",fontWeight:800,fontSize:11,cursor:"pointer"}}>{label}</button>
        ))}
      </div>

      {view==="split"&&(
        <div style={{display:"flex",minHeight:"calc(100vh - 42px)"}}>
          <div style={{flex:1,borderRight:"3px solid #dbeafe",minWidth:0,overflow:"auto"}}>
            <div style={{background:"#2563eb",textAlign:"center",padding:"6px 0"}}><span style={{fontFamily:"'Fredoka One',cursive",fontSize:12,color:"white"}}>📱 Volunteer View</span></div>
            <div style={{paddingTop:14}}>{renderVolunteer()}</div>
          </div>
          <div style={{flex:1,minWidth:0,overflow:"auto"}}>
            <div style={{background:"#1e3a8a",textAlign:"center",padding:"6px 0"}}><span style={{fontFamily:"'Fredoka One',cursive",fontSize:12,color:"white"}}>🖥️ Staff View</span></div>
            {renderStaff()}
          </div>
        </div>
      )}
      {view==="volunteer"&&<div style={{paddingTop:16,minHeight:"calc(100vh - 42px)"}}>{renderVolunteer()}</div>}
      {view==="staff"&&(
        <div style={{minHeight:"calc(100vh - 42px)"}}>
          <div style={{background:"white",padding:"18px 20px",borderBottom:"2px solid #eff6ff",textAlign:"center"}}><Logo/></div>
          {renderStaff()}
        </div>
      )}
      {view==="parent"&&(
        <div style={{minHeight:"calc(100vh - 42px)",paddingTop:16}}>
          {renderParent()}
        </div>
      )}
    </div>
  );
}
if (false) {

const SAMPLE_CHILDREN = [
  {
    id: 1,
    name: "Maya Chen",
    age: 7,
    photo: "🌸",
    interests: ["Drawing", "Dinosaurs", "Puzzles"],
    personalityTips: "Maya is shy at first — give her time to warm up. She loves when you draw together.",
    communicationTips: "Responds best to calm, quiet voices. Avoid loud environments at first.",
    favoriteActivities: "Arts & crafts, coloring, looking at picture books",
    volunteerNotes: "Loves stickers as rewards. Gets overwhelmed in large groups — best 1-on-1.",
    ageGroup: "Young Kids (5–8)",
  },
  {
    id: 2,
    name: "Elijah Torres",
    age: 11,
    photo: "⚽",
    interests: ["Soccer", "Video Games", "Space"],
    personalityTips: "Super energetic and loves to move. Channel that energy into games and sports.",
    communicationTips: "Direct and clear instructions work best. He's a visual learner.",
    favoriteActivities: "Outdoor games, Legos, anything competitive",
    volunteerNotes: "Loves trivia and facts about space. Great conversation starter.",
    ageGroup: "Tweens (9–12)",
  },
  {
    id: 3,
    name: "Sofia Patel",
    age: 9,
    photo: "🎵",
    interests: ["Music", "Dancing", "Animals"],
    personalityTips: "Very social and warm. Will likely approach you first. Loves to perform!",
    communicationTips: "Loves encouragement and clapping. Responds beautifully to praise.",
    favoriteActivities: "Singing, rhythm games, pretend play",
    volunteerNotes: "Bring a song or a simple instrument — instant connection.",
    ageGroup: "Tweens (9–12)",
  },
  {
    id: 4,
    name: "Noah Williams",
    age: 6,
    photo: "🚂",
    interests: ["Trains", "Cars", "Building Blocks"],
    personalityTips: "Needs routine and predictability. Transitions can be hard — give advance warning.",
    communicationTips: "Simple, short sentences. Use visuals when possible.",
    favoriteActivities: "Train sets, sorting games, lining up toys",
    volunteerNotes: "Talking about his train collection is the best icebreaker.",
    ageGroup: "Young Kids (5–8)",
  },
  {
    id: 5,
    name: "Aisha Johnson",
    age: 14,
    photo: "📚",
    interests: ["Reading", "Baking", "Photography"],
    personalityTips: "Thoughtful and creative. Loves deep conversations and feels seen when you listen.",
    communicationTips: "Treats her like a peer — she's perceptive and notices when she's being talked down to.",
    favoriteActivities: "Book discussions, creative writing, baking projects",
    volunteerNotes: "Ask her about her favorite books — she'll light up. Great for calm 1-on-1 time.",
    ageGroup: "Teens (13–17)",
  },
  {
    id: 6,
    name: "Lucas Kim",
    age: 13,
    photo: "🎮",
    interests: ["Gaming", "Anime", "Chess"],
    personalityTips: "Reserved but warms up quickly over shared interests. Dry humor once comfortable.",
    communicationTips: "Don't push conversation — let him lead. Comfortable with silence.",
    favoriteActivities: "Strategy games, drawing characters, watching anime",
    volunteerNotes: "Knows every chess opening. Challenge him to a game!",
    ageGroup: "Teens (13–17)",
  },
];

const AGE_GROUPS = ["Young Kids (5–8)", "Tweens (9–12)", "Teens (13–17)"];

const SURVEY_QUESTIONS = [
  {
    id: "energy",
    question: "What's your energy style?",
    options: ["High energy — I love active games & movement", "Calm & relaxed — I prefer quieter activities", "Mix of both"],
  },
  {
    id: "interests",
    question: "Which of these most describes your interests?",
    options: ["Sports, games, outdoors", "Arts, music, creativity", "Reading, learning, puzzles", "Tech, gaming, building"],
    multi: true,
  },
  {
    id: "ageComfort",
    question: "Which age group do you feel most comfortable with?",
    options: ["Young Kids (5–8)", "Tweens (9–12)", "Teens (13–17)", "Any age"],
  },
  {
    id: "style",
    question: "How would you describe your interaction style?",
    options: ["Silly and playful", "Calm and nurturing", "Mentor-like and encouraging", "Peer-like and cool"],
  },
];

function matchScore(volunteer, child) {
  let score = 0;
  const interests = volunteer.interests || [];
  child.interests.forEach((ci) => {
    const ciLower = ci.toLowerCase();
    interests.forEach((vi) => {
      if (vi.toLowerCase().includes(ciLower) || ciLower.includes(vi.toLowerCase())) score += 3;
    });
  });
  if (volunteer.ageComfort === child.ageGroup || volunteer.ageComfort === "Any age") score += 4;
  if (volunteer.energy?.includes("High energy") && child.interests.some(i => ["Soccer","Dancing","Outdoor"].includes(i))) score += 2;
  if (volunteer.energy?.includes("Calm") && child.interests.some(i => ["Reading","Drawing","Puzzles","Chess"].includes(i))) score += 2;
  return score;
}

// ─── Child Card ───────────────────────────────────────────────────
function ChildCard({ child, highlight, onClick }) {
  return (
    <div
      onClick={() => onClick(child)}
      style={{
        background: highlight ? "linear-gradient(135deg, #fff8e7 0%, #fff3d0 100%)" : "white",
        border: highlight ? "2px solid #f59e0b" : "2px solid #e8e4f0",
        borderRadius: 16,
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.2s ease",
        boxShadow: highlight ? "0 4px 20px rgba(245,158,11,0.25)" : "0 2px 8px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = highlight ? "0 4px 20px rgba(245,158,11,0.25)" : "0 2px 8px rgba(0,0,0,0.06)"; }}
    >
      {highlight && (
        <div style={{ position: "absolute", top: 10, right: 10, background: "#f59e0b", color: "white", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>
          ⭐ Great Match
        </div>
      )}
      <div style={{ fontSize: 40, marginBottom: 8 }}>{child.photo}</div>
      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: "#2d1b69", marginBottom: 2 }}>{child.name}</div>
      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#7c6fa0", marginBottom: 10 }}>Age {child.age} · {child.ageGroup}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {child.interests.map(i => (
          <span key={i} style={{ background: "#ede9f7", color: "#5b21b6", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{i}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Child Detail Modal ───────────────────────────────────────────
function ChildModal({ child, onClose }) {
  if (!child) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(20,10,50,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div style={{ background: "white", borderRadius: 24, padding: 36, maxWidth: 500, width: "100%", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", position: "relative" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "#f3f0ff", border: "none", borderRadius: 50, width: 32, height: 32, cursor: "pointer", fontSize: 16, color: "#5b21b6" }}>✕</button>
        <div style={{ fontSize: 56, marginBottom: 8 }}>{child.photo}</div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, color: "#2d1b69" }}>{child.name}</div>
        <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#7c6fa0", marginBottom: 20 }}>Age {child.age} · {child.ageGroup}</div>

        {[
          { label: "💡 Personality Tips", value: child.personalityTips },
          { label: "🗣️ Communication Tips", value: child.communicationTips },
          { label: "🎉 Favorite Activities", value: child.favoriteActivities },
          { label: "📝 Volunteer Notes", value: child.volunteerNotes },
        ].map(({ label, value }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: "#5b21b6", marginBottom: 4 }}>{label}</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 14, color: "#374151", background: "#f9f7ff", borderRadius: 10, padding: "10px 14px", lineHeight: 1.6 }}>{value}</div>
          </div>
        ))}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {child.interests.map(i => (
            <span key={i} style={{ background: "#ede9f7", color: "#5b21b6", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Survey ───────────────────────────────────────────────────────
function Survey({ onComplete }) {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const q = SURVEY_QUESTIONS[step];
  const total = SURVEY_QUESTIONS.length;

  const select = (val) => {
    if (q.multi) {
      const curr = answers[q.id] || [];
      setAnswers({ ...answers, [q.id]: curr.includes(val) ? curr.filter(v => v !== val) : [...curr, val] });
    } else {
      setAnswers({ ...answers, [q.id]: val });
    }
  };

  const chosen = answers[q.id];
  const hasAnswer = q.multi ? (chosen || []).length > 0 : !!chosen;

  const finish = () => {
    const interests = [];
    (answers.interests || []).forEach(opt => {
      if (opt.includes("Sports")) interests.push("Soccer", "Outdoor");
      if (opt.includes("Arts")) interests.push("Drawing", "Music", "Dancing");
      if (opt.includes("Reading")) interests.push("Reading", "Puzzles", "Chess");
      if (opt.includes("Tech")) interests.push("Gaming", "Building Blocks");
    });
    onComplete({ ...answers, interests });
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 13, color: "#7c6fa0", marginBottom: 6 }}>
        Question {step + 1} of {total}
      </div>
      <div style={{ background: "#ede9f7", borderRadius: 100, height: 6, marginBottom: 28 }}>
        <div style={{ background: "linear-gradient(90deg, #7c3aed, #c084fc)", height: "100%", borderRadius: 100, width: `${((step + 1) / total) * 100}%`, transition: "width 0.4s ease" }} />
      </div>
      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: "#2d1b69", marginBottom: 20, lineHeight: 1.3 }}>{q.question}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {q.options.map(opt => {
          const active = q.multi ? (chosen || []).includes(opt) : chosen === opt;
          return (
            <button key={opt} onClick={() => select(opt)} style={{
              background: active ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "white",
              color: active ? "white" : "#374151",
              border: active ? "2px solid #7c3aed" : "2px solid #e5e7eb",
              borderRadius: 12,
              padding: "14px 20px",
              textAlign: "left",
              fontFamily: "'Nunito', sans-serif",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}>{opt}</button>
          );
        })}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
        {step > 0 && (
          <button onClick={() => setStep(step - 1)} style={{ flex: 1, background: "white", border: "2px solid #e5e7eb", borderRadius: 12, padding: "12px 0", fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 15, color: "#6b7280", cursor: "pointer" }}>← Back</button>
        )}
        <button disabled={!hasAnswer} onClick={() => step < total - 1 ? setStep(step + 1) : finish()} style={{
          flex: 2,
          background: hasAnswer ? "linear-gradient(135deg, #7c3aed, #a855f7)" : "#e5e7eb",
          color: hasAnswer ? "white" : "#9ca3af",
          border: "none",
          borderRadius: 12,
          padding: "12px 0",
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 15,
          cursor: hasAnswer ? "pointer" : "not-allowed",
          transition: "all 0.2s ease",
        }}>
          {step < total - 1 ? "Next →" : "Find My Match! ✨"}
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────
function AppPreview() {
  const [tab, setTab] = useState("rolodex");
  const [selectedChild, setSelectedChild] = useState(null);
  const [filterGroup, setFilterGroup] = useState("All");
  const [search, setSearch] = useState("");
  const [surveyDone, setSurveyDone] = useState(false);
  const [matches, setMatches] = useState([]);
  const [volunteerAnswers, setVolunteerAnswers] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleSurveyComplete = (answers) => {
    setVolunteerAnswers(answers);
    const scored = SAMPLE_CHILDREN
      .map(c => ({ ...c, score: matchScore(answers, c) }))
      .sort((a, b) => b.score - a.score);
    setMatches(scored);
    setSurveyDone(true);
  };

  const filtered = SAMPLE_CHILDREN.filter(c => {
    const matchGroup = filterGroup === "All" || c.ageGroup === filterGroup;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.interests.some(i => i.toLowerCase().includes(search.toLowerCase()));
    return matchGroup && matchSearch;
  });

  const topMatchIds = matches.slice(0, 2).map(m => m.id);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #f5f3ff 0%, #fdf4ff 50%, #fef9ee 100%)", fontFamily: "'Nunito', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a855f7 100%)", padding: "28px 24px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 4 }}>🌟</div>
        <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 28, color: "white", letterSpacing: 0.5 }}>Friendship Circle</div>
        <div style={{ color: "#e9d5ff", fontSize: 13, marginTop: 2, fontWeight: 600 }}>Volunteer Connection Hub</div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: "white", borderBottom: "2px solid #ede9f7", position: "sticky", top: 0, zIndex: 10 }}>
        {[
          { id: "rolodex", label: "👥 Children", },
          { id: "groups", label: "🗂️ Age Groups" },
          { id: "survey", label: "💫 Match Me" },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex: 1,
            padding: "14px 0",
            border: "none",
            background: "none",
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 13,
            color: tab === t.id ? "#7c3aed" : "#9ca3af",
            borderBottom: tab === t.id ? "3px solid #7c3aed" : "3px solid transparent",
            cursor: "pointer",
            transition: "all 0.15s",
          }}>{t.label}</button>
        ))}
      </div>

      <div style={{ padding: "24px 16px", maxWidth: 680, margin: "0 auto" }}>

        {/* ── ROLODEX TAB ── */}
        {tab === "rolodex" && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <input
                placeholder="🔍  Search by name or interest…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px", borderRadius: 12, border: "2px solid #e5e7eb", fontFamily: "'Nunito', sans-serif", fontSize: 14, outline: "none", background: "white" }}
              />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {["All", ...AGE_GROUPS].map(g => (
                <button key={g} onClick={() => setFilterGroup(g)} style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: "2px solid",
                  borderColor: filterGroup === g ? "#7c3aed" : "#e5e7eb",
                  background: filterGroup === g ? "#7c3aed" : "white",
                  color: filterGroup === g ? "white" : "#6b7280",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                }}>{g}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
              {filtered.map(c => (
                <ChildCard key={c.id} child={c} highlight={surveyDone && topMatchIds.includes(c.id)} onClick={setSelectedChild} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", color: "#9ca3af", padding: 40, fontFamily: "'Nunito', sans-serif" }}>No children found matching your search.</div>
            )}
          </div>
        )}

        {/* ── AGE GROUPS TAB ── */}
        {tab === "groups" && (
          <div>
            {AGE_GROUPS.map(group => {
              const kids = SAMPLE_CHILDREN.filter(c => c.ageGroup === group);
              const colors = { "Young Kids (5–8)": { bg: "#fef3c7", accent: "#d97706", emoji: "🌈" }, "Tweens (9–12)": { bg: "#ede9f7", accent: "#7c3aed", emoji: "🎯" }, "Teens (13–17)": { bg: "#ecfdf5", accent: "#059669", emoji: "⚡" } };
              const c = colors[group];
              return (
                <div key={group} style={{ marginBottom: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 22 }}>{c.emoji}</span>
                    <span style={{ fontFamily: "'Fredoka One', cursive", fontSize: 20, color: c.accent }}>{group}</span>
                    <span style={{ background: c.bg, color: c.accent, borderRadius: 20, padding: "2px 10px", fontSize: 12, fontWeight: 800 }}>{kids.length} kids</span>
                  </div>
                  <div style={{ background: c.bg, borderRadius: 16, padding: 16 }}>
                    {kids.map(kid => (
                      <div key={kid.id} onClick={() => setSelectedChild(kid)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", background: "white", borderRadius: 12, marginBottom: 8, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", transition: "all 0.15s" }}
                        onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                        onMouseLeave={e => e.currentTarget.style.transform = ""}>
                        <span style={{ fontSize: 28 }}>{kid.photo}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 16, color: "#2d1b69" }}>{kid.name}</div>
                          <div style={{ fontSize: 12, color: "#7c6fa0", fontWeight: 600 }}>Age {kid.age} · {kid.interests.slice(0, 2).join(", ")}</div>
                        </div>
                        <span style={{ color: c.accent, fontSize: 18 }}>→</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── SURVEY / MATCH TAB ── */}
        {tab === "survey" && (
          <div>
            {!surveyDone ? (
              <div>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>💫</div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: "#2d1b69", marginBottom: 6 }}>Volunteer Matching Survey</div>
                  <div style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>Answer a few quick questions and we'll find the children you'll connect with best!</div>
                </div>
                <Survey onComplete={handleSurveyComplete} />
              </div>
            ) : (
              <div>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>🎉</div>
                  <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 24, color: "#2d1b69", marginBottom: 6 }}>Your Best Matches!</div>
                  <div style={{ color: "#6b7280", fontSize: 14 }}>Based on your interests, these children are great fits for you:</div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, marginBottom: 28 }}>
                  {matches.slice(0, 3).map((c, i) => (
                    <div key={c.id} onClick={() => setSelectedChild(c)} style={{
                      background: i === 0 ? "linear-gradient(135deg, #fff8e7, #fff3d0)" : "white",
                      border: i === 0 ? "2px solid #f59e0b" : "2px solid #e8e4f0",
                      borderRadius: 16, padding: "20px", cursor: "pointer",
                      boxShadow: i === 0 ? "0 4px 20px rgba(245,158,11,0.2)" : "0 2px 8px rgba(0,0,0,0.06)",
                      transition: "all 0.2s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                      onMouseLeave={e => e.currentTarget.style.transform = ""}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <span style={{ fontSize: 36 }}>{c.photo}</span>
                        <span style={{ background: i === 0 ? "#f59e0b" : "#7c3aed", color: "white", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 800 }}>
                          {i === 0 ? "⭐ Top Match" : i === 1 ? "✨ #2" : "💚 #3"}
                        </span>
                      </div>
                      <div style={{ fontFamily: "'Fredoka One', cursive", fontSize: 18, color: "#2d1b69" }}>{c.name}</div>
                      <div style={{ fontSize: 12, color: "#7c6fa0", marginBottom: 8, fontWeight: 600 }}>Age {c.age} · {c.ageGroup}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {c.interests.map(interest => (
                          <span key={interest} style={{ background: "#ede9f7", color: "#5b21b6", borderRadius: 20, padding: "2px 8px", fontSize: 11, fontWeight: 700 }}>{interest}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => { setSurveyDone(false); setMatches([]); }} style={{
                  width: "100%",
                  background: "white",
                  border: "2px solid #e5e7eb",
                  borderRadius: 12,
                  padding: "12px 0",
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  color: "#6b7280",
                  cursor: "pointer",
                  fontSize: 14,
                }}>↩ Retake Survey</button>
              </div>
            )}
          </div>
        )}
      </div>

      <ChildModal child={selectedChild} onClose={() => setSelectedChild(null)} />
    </div>
  );
}
}

createRoot(document.getElementById("root")).render(<App />);