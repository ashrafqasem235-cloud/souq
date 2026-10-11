var U='https://ggojrafcwxhuwvknbjcf.supabase.co',K='sb_publishable_co6fcLmhRcvWnj72qEy2pg_--VQ6nLV';
function sb(p,body){
var h={apikey:K,'Content-Type':'application/json'};
if(body){h.Prefer='return=representation'}
return fetch(U+'/rest/v1/'+p,{method:body?'POST':'GET',headers:h,body:body?JSON.stringify(body):undefined}).then(function(r){
if(!r.ok){return r.text().then(function(t){throw new Error(r.status+' '+t)})}
return r.json()})}
var C=[['phones','موبايلات','📱'],['furniture','أثاث','🛋️'],['home','أغراض بيت','🏠'],['other','أخرى','📦']];
var L=[],S=[],ok=false,tb='ads',cc='all',qa='',qs='';
function $(i){return document.getElementById(i)}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function cat(i){return C.find(function(c){return c[0]===i})||C[3]}
function mn(n){return Number(n).toLocaleString('en-US')}
function dg(s){return String(s||'').replace(/\D/g,'')}
function img(s){return /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+\/=]+$/.test(s||'')?s:''}
function fL(r){return{id:r.id,title:r.title,cat:r.cat,price:r.price,cur:r.cur||'$',desc:r.description||'',area:r.area||'',name:r.seller_name||'',phone:dg(r.phone),img:img(r.image)}}
function fS(r){return{id:r.id,name:r.name,spec:r.spec,area:r.area,addr:r.addr||'',phone:dg(r.phone),map:r.map_url||'',hours:r.hours||''}}
function setSt(m,bad){var s=$('st');if(!m){s.hidden=true;return}s.hidden=false;s.className='status'+(bad?' bad':'');s.innerHTML=esc(m)+(bad?'<button type="button" class="ghost" data-a="retry">حاول مرة ثانية</button>':'')}
function loadAll(){
setSt('جاري تحميل البيانات...');
Promise.all([sb('listings?select=*&order=id.desc&limit=200'),sb('shops?select=*&order=id.desc&limit=200')]).then(function(r){
L=r[0].map(fL);S=r[1].map(fS);ok=true;setSt('');drawL();drawS()
}).catch(function(x){setSt('ما قدرنا نحمّل البيانات. السبب: '+String(x&&x.message).slice(0,150),true)})}
function drawCats(){
$('cats').innerHTML=[['all','الكل','']].concat(C).map(function(c){return '<button type="button" class="cat'+(cc===c[0]?' on':'')+'" data-a="cat" data-id="'+c[0]+'">'+(c[2]?c[2]+' ':'')+esc(c[1])+'</button>'}).join('');
$('f-cat').innerHTML=C.map(function(c){return '<option value="'+c[0]+'">'+c[2]+' '+esc(c[1])+'</option>'}).join('')}
function drawL(){
var k=qa.trim().toLowerCase();
var l=L.filter(function(a){return(cc==='all'||a.cat===cc)&&(!k||(a.title+' '+a.desc).toLowerCase().indexOf(k)>=0)});
$('cnt').textContent=ok?l.length+' إعلان':'';
if(!ok){$('grid').innerHTML='';return}
if(!l.length){$('grid').innerHTML='<div class="empty" style="grid-column:1/-1">'+(L.length?'ما لقينا إعلانات. جرّب كلمة ثانية.':'ما فيه إعلانات للحين. كن أول من ينشر إعلان!')+'</div>';return}
$('grid').innerHTML=l.map(function(a){return '<button type="button" class="card" data-a="view" data-id="'+a.id+'"><div class="pic">'+(a.img?'<img src="'+esc(a.img)+'" alt="">':cat(a.cat)[2])+'</div><div class="meta"><p class="t">'+esc(a.title)+'</p><span class="p">'+mn(a.price)+' '+esc(a.cur)+'</span><div class="sub">'+esc(a.area||cat(a.cat)[1])+'</div></div></button>'}).join('')}
function view(id){
var a=L.find(function(x){return x.id===id});if(!a)return;
$('vt').textContent=a.title;
$('vb').innerHTML='<div class="pic" style="font-size:80px;border-radius:10px;margin-bottom:12px">'+(a.img?'<img src="'+esc(a.img)+'" alt="">':cat(a.cat)[2])+'</div><p><span class="p" style="font-size:20px">'+mn(a.price)+' '+esc(a.cur)+'</span></p>'+(a.desc?'<p>'+esc(a.desc)+'</p>':'')+'<p class="note">'+esc(cat(a.cat)[1])+' · '+esc(a.name||'بائع')+(a.area?' · '+esc(a.area):'')+'</p><div class="acts"><a class="b" href="https://wa.me/'+a.phone+'" target="_blank" rel="noopener">واتساب</a><a class="b c" href="tel:+'+a.phone+'">اتصال</a></div><div class="offer"><label for="of">تبي تتفاوض؟ اكتب السعر اللي يناسبك</label><div class="row"><input id="of" type="number" inputmode="decimal" min="0" step="any" placeholder="سعرك"><button type="button" data-a="offer" data-id="'+a.id+'">أرسل العرض</button></div><p class="note">يفتح واتساب برسالة جاهزة للبائع، وهو يرد عليك ويتفقون.</p></div>';
$('vd').showModal()}
function offer(id){
var a=L.find(function(x){return x.id===id}),v=parseFloat($('of').value);
if(!a||!(v>0)){$('of').focus();return}
var m='السلام عليكم، شفت إعلانك "'+a.title+'" بسعر '+mn(a.price)+' '+a.cur+'. ممكن آخذه بـ '+mn(v)+' '+a.cur+'؟';
window.open('https://wa.me/'+a.phone+'?text='+encodeURIComponent(m),'_blank','noopener')}
function shrink(f,cb){
var r=new FileReader();
r.onload=function(){
var i=new Image();
i.onload=function(){
function mk(m,q){var s=Math.min(1,m/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=Math.round(i.width*s);c.height=Math.round(i.height*s);c.getContext('2d').drawImage(i,0,0,c.width,c.height);return c.toDataURL('image/jpeg',q)}
var o=mk(640,.8);if(o.length>390000){o=mk(480,.6)}
cb(o.length<=390000?o:'')};
i.onerror=function(){cb('')};
i.src=r.result};
r.onerror=function(){cb('')};
r.readAsDataURL(f)}
function addAd(){
var t=$('f-title').value.trim(),p=parseFloat($('f-price').value),ph=dg($('f-phone').value),er=$('addErr');
if(t.length<2){er.textContent='اكتب اسم الشي اللي تبيعه.';return}
if(!(p>0)){er.textContent='اكتب سعراً أكبر من صفر.';return}
if(ph.length<8||ph.length>15){er.textContent='اكتب رقم واتساب صحيح مع رمز الدولة.';return}
er.textContent='';
var b=$('addBtn');b.disabled=true;b.textContent='جاري النشر...';
var f=$('f-img').files[0];
function go(im){
sb('listings',{title:t,cat:$('f-cat').value,price:p,cur:$('f-cur').value.trim()||'$',description:$('f-desc').value.trim()||null,area:$('f-area').value.trim()||null,seller_name:$('f-name').value.trim()||null,phone:ph,image:im||null}).then(function(r){
L.unshift(fL(r[0]));
['f-title','f-price','f-desc','f-area','f-name','f-phone','f-img'].forEach(function(i){$(i).value=''});
$('addDlg').close();cc='all';qa='';$('q').value='';drawCats();drawL()
}).catch(function(x){er.textContent='ما اننشر الإعلان. السبب: '+String(x&&x.message).slice(0,120)}).then(function(){b.disabled=false;b.textContent='انشر الإعلان'})}
if(f){shrink(f,go)}else{go('')}}
function mu(s){return/^https?:\/\//i.test(s.map)?s.map:'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(s.name+' '+(s.addr||s.area))}
function drawS(){
var k=qs.trim().toLowerCase();
var l=S.filter(function(s){return !k||(s.name+' '+s.spec+' '+s.area+' '+s.addr).toLowerCase().indexOf(k)>=0});
$('scnt').textContent=ok?l.length+' محل':'';
if(!ok){$('slist').innerHTML='';return}
if(!l.length){$('slist').innerHTML='<div class="empty">'+(S.length?'ما لقينا محلات. جرّب كلمة ثانية.':'ما فيه محلات مسجلة للحين. سجّل محلك أول واحد!')+'</div>';return}
$('slist').innerHTML=l.map(function(s){return '<div class="shop"><h3>'+esc(s.name)+'</h3><span class="spec">'+esc(s.spec)+'</span><p>📍 '+esc(s.area)+(s.addr?' · '+esc(s.addr):'')+'</p>'+(s.hours?'<p>🕘 '+esc(s.hours)+'</p>':'')+'<div class="acts"><a class="b" href="https://wa.me/'+s.phone+'" target="_blank" rel="noopener">واتساب</a><a class="b c" href="tel:+'+s.phone+'">اتصال</a><a class="b m" href="'+esc(mu(s))+'" target="_blank" rel="noopener">الموقع</a></div></div>'}).join('')}
function addShop(){
var n=$('s-name').value.trim(),sp=$('s-spec').value.trim(),ar=$('s-area').value.trim(),ph=dg($('s-phone').value),mp=$('s-map').value.trim(),er=$('shopErr');
if(n.length<2){er.textContent='اكتب اسم المحل.';return}
if(sp.length<2){er.textContent='اكتب شنو اختصاص المحل.';return}
if(ar.length<2){er.textContent='اكتب المنطقة أو الحي.';return}
if(ph.length<8||ph.length>15){er.textContent='اكتب رقم هاتف صحيح مع رمز الدولة.';return}
if(mp&&!/^https?:\/\//i.test(mp)){er.textContent='رابط الخريطة لازم يبدأ بـ https://';return}
er.textContent='';
var b=$('shopBtn');b.disabled=true;b.textContent='جاري التسجيل...';
sb('shops',{name:n,spec:sp,area:ar,addr:$('s-addr').value.trim()||null,phone:ph,map_url:mp||null,hours:$('s-hours').value.trim()||null}).then(function(r){
S.unshift(fS(r[0]));
['s-name','s-spec','s-area','s-addr','s-map','s-hours','s-phone'].forEach(function(i){$(i).value=''});
$('shopDlg').close();qs='';$('sq').value='';drawS()
}).catch(function(x){er.textContent='ما انسجل المحل. السبب: '+String(x&&x.message).slice(0,120)}).then(function(){b.disabled=false;b.textContent='سجّل المحل'})}
function setTab(t){
tb=t;$('v-ads').hidden=t!=='ads';$('v-shops').hidden=t!=='shops';
$('t-ads').className='tab'+(t==='ads'?' on':'');$('t-shops').className='tab'+(t==='shops'?' on':'');
$('hb').textContent=t==='ads'?'+ أضف إعلان':'+ سجّل محلك'}
document.addEventListener('click',function(ev){
var b=ev.target.closest('[data-a]');if(!b){return}
var a=b.getAttribute('data-a'),id=+b.getAttribute('data-id');
if(a==='tab'){setTab(b.getAttribute('data-id'))}
else if(a==='primary'){if(tb==='ads'){$('addErr').textContent='';$('addDlg').showModal()}else{$('shopErr').textContent='';$('shopDlg').showModal()}}
else if(a==='close'){b.closest('dialog').close()}
else if(a==='cat'){cc=b.getAttribute('data-id');drawCats();drawL()}
else if(a==='view'){view(id)}
else if(a==='offer'){offer(id)}
else if(a==='add'){addAd()}
else if(a==='addshop'){addShop()}
else if(a==='retry'){loadAll()}
});
$('q').oninput=function(){qa=this.value;drawL()};
$('sq').oninput=function(){qs=this.value;drawS()};
drawCats();drawL();drawS();loadAll();
