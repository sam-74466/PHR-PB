"use strict";
(()=>{
const C=window.SITE||{},$=id=>document.getElementById(id),T0=Date.now();
if(location.protocol==="http:"&&!/^(localhost|127\.0\.0\.1)$/.test(location.hostname))location.replace("https://"+location.host+location.pathname+location.search+location.hash);
const ls={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const M=[["Breaker machine","🔨","Heavy","Demolition and chipping through concrete, slabs and walls."],["Drill machine","🔩","Power tools","Corded drill for masonry, wood and metal."],["Angle grinder","⚙️","Power tools","Cutting and grinding metal, tiles and concrete."],["Cordless drill","🔋","Cordless","No cable, no socket. Drill anywhere on site."],["Cordless grinder","🪛","Cordless","Battery grinder for quick cuts at height or off-grid."],["Construction site crane","🏗️","Heavy","Lift material to upper floors safely."],["Diesel generator 1 kW","⚡","Heavy","Backup power for tools and lights on site."],["Zoola (suspended platform)","🧗","Access","Reach facade work, painting and waterproofing on tall walls."],["Ladder","🪜","Access","Sturdy ladders for indoor and outdoor work."],["Painting machine","🎨","Finishing","Fast, even coats on walls and ceilings."],["Pressure pump cleaning","💦","Finishing","High-pressure washing for floors, walls and vehicles."]];
const cats=["All",...new Set(M.map(m=>m[2]))],sel=new Set(),F={name:"nm",phone:"ph",machines:"mc",location:"lc"};let cur="All";
$("y").textContent=new Date().getFullYear();
$("tk").innerHTML=(M.map(m=>m[0].toUpperCase()).join("<i>✦</i>")+"<i>✦</i>").repeat(2);
function draw(){$("fl").innerHTML=cats.map(c=>`<button class="f" aria-pressed="${c==cur}" data-c="${c}">${c}</button>`).join("");
$("gr").innerHTML=M.filter(m=>cur=="All"||m[2]==cur).map(m=>`<article class="card"><div class="ic" aria-hidden="true">${m[1]}</div><h3>${m[0]}</h3><p>${m[3]}</p><span class="rate">Daily rate on request</span><button class="b ${sel.has(m[0])?"on":""}" data-m="${m[0]}" aria-pressed="${sel.has(m[0])}">${sel.has(m[0])?"Added ✓":"Add to enquiry"}</button></article>`).join("");}
function cart(){const n=sel.size;$("ct").classList.toggle("show",n>0);$("cn").textContent=n+(n==1?" machine":" machines")+" selected";$("mc").value=[...sel].join(", ");}
document.addEventListener("click",e=>{const f=e.target.closest(".f"),b=e.target.closest("[data-m]");
if(f){cur=f.dataset.c;draw();}
if(b){const k=b.dataset.m;sel.has(k)?sel.delete(k):sel.add(k);draw();cart();}});
$("send").onclick=()=>{$("quote").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});setTimeout(()=>$("nm").focus({preventScroll:true}),400);};
/* quote form: validation + spam protection */
function setErr(k,msg){const i=$(F[k]);$("e-"+F[k]).textContent=msg||"";i.setAttribute("aria-invalid",msg?"true":"false");}
$("qf").addEventListener("submit",async e=>{e.preventDefault();
const f=e.target,v=n=>f.elements[n].value.trim(),st=$("fs");
const d={name:v("name"),phone:v("phone").replace(/[\s-]/g,"").replace(/^(\+91|91|0)(?=\d{10}$)/,""),machines:v("machines"),location:v("location")},er={};
if(!/^[\p{L}][\p{L} .'-]{1,59}$/u.test(d.name))er.name="Enter your name using letters only (2 to 60 characters).";
if(!/^[6-9]\d{9}$/.test(d.phone))er.phone="Enter a valid 10-digit Indian mobile number.";
if(d.machines.length<3)er.machines="Tell us which machines you need.";
if(d.location.length>120)er.location="Keep the location under 120 characters.";
Object.keys(F).forEach(k=>setErr(k,er[k]));
const bad=Object.keys(er)[0];if(bad){$(F[bad]).focus();st.textContent="Please fix the highlighted fields.";return;}
if(v("website")){st.textContent="Thanks. We will contact you soon.";f.reset();return;}
if(Date.now()-T0<4000||/https?:\/\/|www\./i.test(d.machines+" "+d.location)){st.textContent="We could not send this. Please call or WhatsApp us.";return;}
if(Date.now()-(+ls.get("pr_last")||0)<30000){st.textContent="Please wait 30 seconds before sending again.";return;}
const btn=f.querySelector("button[type=submit]");btn.disabled=true;st.textContent="Sending...";
try{
if(C.formEndpoint){const r=await fetch(C.formEndpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(d)});if(!r.ok)throw new Error("send failed");st.textContent="Sent. We will call you soon.";}
else{const t=`New quote request\nName: ${d.name}\nPhone: ${d.phone}\nMachines: ${d.machines}\nSite: ${d.location||"-"}`;window.open("https://wa.me/"+C.phone+"?text="+encodeURIComponent(t),"_blank","noopener");st.textContent="Opening WhatsApp so you can send your request.";}
ls.set("pr_last",String(Date.now()));if(window.gtag)window.gtag("event","generate_lead");
f.reset();sel.clear();draw();cart();
}catch(x){st.textContent="Could not send. Please call "+(C.phone||"us")+" or try again.";}
btn.disabled=false;});
/* cookie consent + analytics (only after Accept) */
function loadGA(){if(!/^G-[A-Z0-9]{4,}$/.test(C.gaId||"")||window.__ga)return;window.__ga=1;window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};window.gtag("js",new Date());window.gtag("config",C.gaId,{anonymize_ip:true});const s=document.createElement("script");s.async=true;s.src="https://www.googletagmanager.com/gtag/js?id="+C.gaId;document.head.appendChild(s);}
const ck=$("ck"),setC=v=>{ls.set("pr_consent",v);ck.hidden=true;if(v==="yes")loadGA();};
$("ca").onclick=()=>setC("yes");$("cr").onclick=()=>setC("no");$("cs").onclick=()=>{ck.hidden=false;$("ca").focus();};
const cc=ls.get("pr_consent");if(cc==="yes")loadGA();else if(cc===null)ck.hidden=false;
/* card tilt (mouse only) */
document.addEventListener("pointermove",e=>{const c=e.target.closest&&e.target.closest(".card");if(!c||e.pointerType!=="mouse")return;const r=c.getBoundingClientRect();c.style.transform=`perspective(700px) rotateY(${((e.clientX-r.left)/r.width-.5)*8}deg) rotateX(${-((e.clientY-r.top)/r.height-.5)*8}deg)`;});
document.addEventListener("pointerout",e=>{const c=e.target.closest&&e.target.closest(".card");if(c)c.style.transform="";});
draw();cart();
})();
