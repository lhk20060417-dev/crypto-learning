---
layout: default
title: 实盘分析室
nav_order: 7
---

<style>
.lab-sec{margin:2.4rem 0;}
.lab-h{display:flex;align-items:baseline;gap:.8rem;margin-bottom:1rem;}
.lab-h .no{color:#2c4266;font-size:.78rem;letter-spacing:.3em;font-weight:600;}
.lab-h h2{margin:0;font-size:1.35rem;letter-spacing:.1em;}
.lab-h .en{color:#3f5d85;font-size:.68rem;letter-spacing:.3em;}
.tick-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;}
.tick{border:1px solid rgba(90,140,220,.16);border-radius:14px;padding:1rem 1.1rem;background:linear-gradient(160deg,rgba(14,22,38,.7),rgba(8,13,24,.5));}
.tick .sym{color:#9db8de;font-size:.72rem;letter-spacing:.18em;display:flex;justify-content:space-between;}
.tick .sym .src{color:#2c4266;font-size:.6rem;}
.tick .price{color:#e8f4ff;font-size:1.45rem;font-weight:700;margin-top:.45rem;font-variant-numeric:tabular-nums;transition:color .3s;}
.tick .chg{font-size:.78rem;margin-top:.25rem;font-variant-numeric:tabular-nums;}
.tick .chg.up{color:#3ddc97;}.tick .chg.dn{color:#ff6b81;}
.tick-src-line{color:#3f5d85;font-size:.68rem;letter-spacing:.14em;margin-top:.7rem;}
.lab-drop{border:1.5px dashed rgba(120,180,255,.35);border-radius:16px;padding:2rem 1.5rem;text-align:center;background:rgba(10,16,28,.4);transition:border-color .3s,background .3s;cursor:pointer;}
.lab-drop:hover,.lab-drop.over{border-color:rgba(120,230,255,.8);background:rgba(16,30,48,.6);}
.lab-drop .big{color:#9db8de;font-size:.95rem;letter-spacing:.1em;}
.lab-drop .small{color:#4a648c;font-size:.72rem;margin-top:.5rem;letter-spacing:.06em;}
.lab-or{color:#3f5d85;font-size:.7rem;letter-spacing:.3em;text-align:center;margin:1rem 0;}
#lab-paste{width:100%;min-height:120px;background:#0a101c;border:1px solid rgba(90,140,220,.2);border-radius:12px;color:#cfe3ff;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.78rem;padding:.9rem 1rem;resize:vertical;}
#lab-paste:focus{outline:none;border-color:rgba(120,230,255,.7);}
.lab-btns{display:flex;flex-wrap:wrap;gap:.7rem;margin-top:1rem;}
.lab-btn{border:1px solid rgba(120,200,255,.4);border-radius:999px;background:rgba(16,30,48,.7);color:#9fd8ff;font-size:.8rem;letter-spacing:.14em;padding:.6rem 1.4rem;cursor:pointer;transition:all .3s;}
.lab-btn:hover{border-color:rgba(120,230,255,.9);color:#fff;box-shadow:0 0 16px rgba(96,225,255,.25);}
.lab-btn.primary{background:linear-gradient(135deg,#0e3a4d,#123a5c);border-color:rgba(120,230,255,.6);color:#eaf9ff;font-weight:600;}
.lab-btn.primary:hover{box-shadow:0 0 22px rgba(96,225,255,.4);}
.lab-btn:disabled{opacity:.35;cursor:not-allowed;box-shadow:none;}
.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin-top:1.2rem;}
.kpi{border:1px solid rgba(90,140,220,.16);border-radius:12px;padding:.9rem 1rem;background:rgba(10,16,28,.55);}
.kpi .k{color:#54719e;font-size:.66rem;letter-spacing:.22em;}
.kpi .v{color:#e8f4ff;font-size:1.4rem;font-weight:700;margin-top:.3rem;font-variant-numeric:tabular-nums;}
.kpi .v.pos{color:#3ddc97;}.kpi .v.neg{color:#ff6b81;}
#lab-table-wrap{margin-top:1.2rem;overflow-x:auto;}
#lab-table{width:100%;border-collapse:collapse;font-size:.76rem;}
#lab-table th{color:#54719e;font-weight:600;letter-spacing:.12em;text-align:left;padding:.5rem .7rem;border-bottom:1px solid rgba(90,140,220,.25);}
#lab-table td{color:#b9d2f2;padding:.45rem .7rem;border-bottom:1px solid rgba(90,140,220,.1);font-variant-numeric:tabular-nums;white-space:nowrap;}
#lab-table tr:hover td{background:rgba(16,30,48,.5);}
#lab-msg{color:#ff9db0;font-size:.78rem;margin-top:.8rem;min-height:1.2em;}
#lab-ok{color:#3ddc97;font-size:.78rem;margin-top:.8rem;min-height:1.2em;}
.brain-card{border:1px solid rgba(120,180,255,.25);border-radius:18px;padding:1.6rem 1.8rem;background:linear-gradient(150deg,rgba(14,24,42,.85),rgba(8,13,24,.7));box-shadow:0 10px 40px rgba(0,0,0,.4);}
.brain-top{display:flex;flex-wrap:wrap;align-items:center;gap:1.4rem;}
.brain-lv{width:86px;height:86px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;border:2px solid rgba(120,230,255,.55);box-shadow:0 0 24px rgba(96,225,255,.3),inset 0 0 18px rgba(96,225,255,.12);flex-shrink:0;}
.brain-lv .n{color:#eaf9ff;font-size:1.5rem;font-weight:800;line-height:1;}
.brain-lv .t{color:#4dd0e1;font-size:.56rem;letter-spacing:.2em;margin-top:.25rem;}
.brain-name{color:#eaf4ff;font-size:1.3rem;font-weight:700;letter-spacing:.08em;}
.brain-sub{color:#6d8ab5;font-size:.74rem;letter-spacing:.12em;margin-top:.35rem;}
.brain-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:.7rem;}
.brain-tag{border:1px solid rgba(120,200,255,.35);color:#9fd8ff;border-radius:999px;font-size:.68rem;letter-spacing:.1em;padding:.28rem .85rem;}
.brain-empty{color:#4a648c;font-size:.82rem;letter-spacing:.06em;line-height:1.9;}
.bar-row{display:grid;grid-template-columns:64px 1fr 44px;align-items:center;gap:.8rem;margin-top:.7rem;}
.bar-row .bl{color:#6d8ab5;font-size:.72rem;letter-spacing:.18em;}
.bar-row .bv{color:#e8f4ff;font-size:.8rem;font-weight:700;text-align:right;font-variant-numeric:tabular-nums;}
.bar-track{height:8px;border-radius:999px;background:rgba(90,140,220,.12);overflow:hidden;}
.bar-fill{height:100%;border-radius:999px;background:linear-gradient(90deg,#1c6e8c,#4dd0e1);box-shadow:0 0 10px rgba(77,208,225,.5);width:0;transition:width 1.2s cubic-bezier(.2,.8,.3,1);}
.lab-note{color:#4a648c;font-size:.72rem;letter-spacing:.05em;line-height:1.9;border-left:2px solid rgba(90,140,220,.3);padding-left:1rem;margin-top:1.4rem;}
@media (max-width:640px){.brain-card{padding:1.2rem 1rem;}.kpi .v{font-size:1.15rem;}}
</style>

<div class="lab-h"><span class="no">01</span><h2>实时行情</h2><span class="en">LIVE PRICES</span></div>
<div class="tick-grid" id="tick-grid"></div>
<div class="tick-src-line" id="tick-src">正在连接行情源…</div>

<div class="lab-sec">
<div class="lab-h"><span class="no">02</span><h2>上传实盘记录</h2><span class="en">UPLOAD TRADES</span></div>
<div class="lab-drop" id="lab-drop">
  <div class="big">把 CSV / JSON 文件拖到这里，或点击选择文件</div>
  <div class="small">支持列：日期, 币种, 方向, 价格, 数量, 盈亏, 备注（中英文表头均可）</div>
  <input type="file" id="lab-file" accept=".csv,.json,.txt" style="display:none">
</div>
<div class="lab-or">—— 或直接粘贴 ——</div>
<textarea id="lab-paste" placeholder="日期,币种,方向,价格,数量,盈亏,备注&#10;2026-09-30,BTC,买,62000,0.01,120,突破回踩买入&#10;2026-10-02,ETH,卖,2450,0.5,-80,止损离场"></textarea>
<div class="lab-btns">
  <button class="lab-btn primary" id="lab-analyze">分析本次记录</button>
  <button class="lab-btn" id="lab-sample">填入示例数据</button>
  <button class="lab-btn" id="lab-clear">清空粘贴区</button>
</div>
<div id="lab-msg"></div>
<div class="kpi-grid" id="kpi-grid" style="display:none"></div>
<div id="lab-table-wrap"></div>
</div>

<div class="lab-sec">
<div class="lab-h"><span class="no">03</span><h2>我的交易画像</h2><span class="en">TRADEBRAIN</span></div>
<div class="brain-card" id="brain-card"></div>
<div class="lab-btns">
  <button class="lab-btn primary" id="lab-ai" disabled>🧠 AI 深度分析（DeepSeek）</button>
  <button class="lab-btn" id="lab-reset">清空画像</button>
</div>
<div id="lab-ok"></div>
<div class="lab-note">
  画像只保存在你自己的浏览器里（localStorage），不会上传到任何地方；只有你点击「AI 深度分析」时，画像摘要和本次记录才会通过 GitHub Issue 发给 DeepSeek 分析，点评以评论形式出现在 Issue 里。「培养交易大模型」= 画像随每次上传累积进化，分析会带上全部历史画像，越用越懂你。
</div>
</div>

<script>
document.addEventListener('DOMContentLoaded',function(){
'use strict';
var $=function(s){return document.querySelector(s);};
var fmt=function(n,d){return n==null||isNaN(n)?'—':Number(n).toLocaleString('en-US',{minimumFractionDigits:d==null?2:d,maximumFractionDigits:d==null?2:d});};

/* ========== 01 实时行情：多源容错 ========== */
var COINS=[{id:'bitcoin',sym:'BTC',okx:'BTC-USDT',bin:'BTCUSDT'},{id:'ethereum',sym:'ETH',okx:'ETH-USDT',bin:'ETHUSDT'},{id:'solana',sym:'SOL',okx:'SOL-USDT',bin:'SOLUSDT'},{id:'binancecoin',sym:'BNB',okx:'BNB-USDT',bin:'BNBUSDT'},{id:'ripple',sym:'XRP',okx:'XRP-USDT',bin:'XRPUSDT'},{id:'dogecoin',sym:'DOGE',okx:'DOGE-USDT',bin:'DOGEUSDT'}];
var grid=$('#tick-grid'),srcLine=$('#tick-src');
grid.innerHTML=COINS.map(function(c){return '<div class="tick"><div class="sym"><span>'+c.sym+'/USDT</span><span class="src" id="src-'+c.sym+'"></span></div><div class="price" id="p-'+c.sym+'">—</div><div class="chg" id="c-'+c.sym+'"></div></div>';}).join('');
function setPrice(sym,price,chg,src){
  var el=$('#p-'+sym),old=parseFloat(el.getAttribute('data-v')||'0');
  el.textContent='$'+fmt(price,price<1?4:2);el.setAttribute('data-v',price);
  if(old){el.style.color=price>old?'#3ddc97':(price<old?'#ff6b81':'#e8f4ff');setTimeout(function(){el.style.color='#e8f4ff';},700);}
  var ce=$('#c-'+sym);
  if(chg!=null){ce.textContent=(chg>=0?'▲ +':'▼ ')+fmt(chg,2)+'%';ce.className='chg '+(chg>=0?'up':'dn');}
  var se=$('#src-'+sym);if(se)se.textContent=src;
}
function binance(){var syms='['+COINS.map(function(c){return '"'+c.bin+'"';}).join(',')+']';
  return fetch('https://api.binance.com/api/v3/ticker/24hr?symbols='+encodeURIComponent(syms)).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(arr){
    arr.forEach(function(t){var c=COINS.filter(function(x){return x.bin===t.symbol;})[0];if(c)setPrice(c.sym,+t.lastPrice,+t.priceChangePercent,'Binance');});
    srcLine.textContent='数据源：Binance · 每 30 秒自动刷新';});}
function okx(){return fetch('https://www.okx.com/api/v5/market/tickers?instType=SPOT').then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(d){
  d.data.forEach(function(t){var c=COINS.filter(function(x){return x.okx===t.instId;})[0];if(c)setPrice(c.sym,+t.last,+t.open24h==0?null:(+t.last/t.open24h-1)*100,'OKX');});
  srcLine.textContent='数据源：OKX · 每 30 秒自动刷新';});}
function gecko(){var ids=COINS.map(function(c){return c.id;}).join(',');
  return fetch('https://api.coingecko.com/api/v3/simple/price?ids='+ids+'&vs_currencies=usd&include_24hr_change=true').then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(d){
  COINS.forEach(function(c){if(d[c.id])setPrice(c.sym,d[c.id].usd,d[c.id].usd_24h_change,'CoinGecko');});
  srcLine.textContent='数据源：CoinGecko · 每 30 秒自动刷新';});}
function refresh(){binance().catch(function(){return okx();}).catch(function(){return gecko();}).catch(function(){srcLine.textContent='所有行情源都连不上（可能被网络环境拦截）。数据功能不受影响，稍后会自动重试。';});}
refresh();setInterval(refresh,30000);

/* ========== 02 解析与统计 ========== */
var COLMAP={date:/日期|时间|date|time/i,symbol:/币种|交易对|代码|symbol|pair|coin/i,side:/方向|买卖|类型|side|direction|type/i,price:/价格|price/i,amount:/数量|仓位|amount|qty|quantity|vol/i,pnl:/盈亏|收益|pnl|profit|roe/i,note:/备注|理由|原因|想法|note|reason/i};
var lastBatch=null,lastParsed=[];
function parseText(text){
  text=text.trim();if(!text)return null;
  if(text[0]==='['||text[0]==='{'){try{var j=JSON.parse(text);return normalize(Array.isArray(j)?j:(j.trades||j.records||[]));}catch(e){return null;}}
  var lines=text.split(/\r?\n/).filter(function(l){return l.trim();});
  var delim=lines[0].indexOf('\t')>-1?'\t':(lines[0].split(';').length>lines[0].split(',').length?';':',');
  var rows=lines.map(function(l){return l.split(delim).map(function(c){return c.trim();});});
  var head=rows[0],idx={},hasHead=false;
  Object.keys(COLMAP).forEach(function(k){head.forEach(function(h,i){if(idx[k]==null&&COLMAP[k].test(h))idx[k]=i;});});
  hasHead=idx.pnl!=null||idx.symbol!=null;
  var dataRows=hasHead?rows.slice(1):rows;
  if(!hasHead){idx={date:0,symbol:1,side:2,price:3,amount:4,pnl:5,note:6};}
  return normalize(dataRows.map(function(r){
    var o={};Object.keys(idx).forEach(function(k){o[k]=r[idx[k]];});return o;}));
}
function normalize(list){
  return list.map(function(r){
    var g=function(){for(var i=0;i<arguments.length;i++){var v=r[arguments[i]];if(v!=null&&v!=='')return v;}return '';};
    var side=String(g('side','方向','类型')).toLowerCase();
    return {
      date:String(g('date','日期','时间')).slice(0,20),
      symbol:String(g('symbol','币种','交易对')).toUpperCase().replace(/USDT|\/USD$/,''),
      side:/卖|空|short|sell/.test(side)?'空':(/买|多|long|buy/.test(side)?'多':'—'),
      price:parseFloat(g('price','价格'))||null,
      amount:parseFloat(g('amount','数量','qty'))||null,
      pnl:parseFloat(String(g('pnl','盈亏','收益')).replace(/[%\s]/g,'')),
      note:String(g('note','备注','理由','原因','想法')).slice(0,60)
    };
  }).filter(function(r){return r.symbol||r.pnl!=null||r.date;});
}
function stats(trades){
  var withPnl=trades.filter(function(t){return t.pnl!=null&&!isNaN(t.pnl);});
  var n=withPnl.length,wins=withPnl.filter(function(t){return t.pnl>0;}),losses=withPnl.filter(function(t){return t.pnl<0;});
  var gw=wins.reduce(function(s,t){return s+t.pnl;},0),gl=Math.abs(losses.reduce(function(s,t){return s+t.pnl;},0));
  var cum=0,peak=0,dd=0;withPnl.forEach(function(t){cum+=t.pnl;peak=Math.max(peak,cum);dd=Math.max(dd,peak-cum);});
  var bySym={};withPnl.forEach(function(t){bySym[t.symbol]=(bySym[t.symbol]||0)+t.pnl;});
  return {n:n,total:withPnl.reduce(function(s,t){return s+t.pnl;},0),
    winRate:n?wins.length/n*100:null,payoff:losses.length&&wins.length?(gw/wins.length)/(gl/losses.length):null,
    pf:gl>0?gw/gl:(gw>0?99:null),maxDD:dd,gw:gw,gl:gl,
    avg:n?withPnl.reduce(function(s,t){return s+t.pnl;},0)/n:null,
    notes:trades.filter(function(t){return t.note;}).length,bySym:bySym,
    best:withPnl.length?Math.max.apply(null,withPnl.map(function(t){return t.pnl;})):null,
    worst:withPnl.length?Math.min.apply(null,withPnl.map(function(t){return t.pnl;})):null};
}
function renderBatch(st,trades){
  $('#kpi-grid').style.display='grid';
  var k=function(label,val,cls){return '<div class="kpi"><div class="k">'+label+'</div><div class="v '+(cls||'')+'">'+val+'</div></div>';};
  $('#kpi-grid').innerHTML=
    k('笔数',st.n)+k('总盈亏',(st.total>=0?'+':'')+fmt(st.total),st.total>=0?'pos':'neg')+
    k('胜率',st.winRate==null?'—':fmt(st.winRate,1)+'%')+k('盈亏比',st.payoff==null?'—':fmt(st.payoff,2))+
    k('利润因子',st.pf==null?'—':(st.pf>=99?'∞':fmt(st.pf,2)))+k('最大回撤',fmt(st.maxDD))+k('单笔期望',st.avg==null?'—':fmt(st.avg));
  var rows=trades.slice(0,12).map(function(t){
    return '<tr><td>'+t.date+'</td><td>'+t.symbol+'</td><td>'+t.side+'</td><td>'+fmt(t.price,t.price<1?4:2)+'</td><td>'+(t.amount==null?'—':t.amount)+'</td><td style="color:'+(t.pnl>0?'#3ddc97':t.pnl<0?'#ff6b81':'#b9d2f2')+'">'+(t.pnl==null||isNaN(t.pnl)?'—':(t.pnl>0?'+':'')+fmt(t.pnl))+'</td><td>'+(t.note||'')+'</td></tr>';
  }).join('');
  $('#lab-table-wrap').innerHTML=trades.length?'<table id="lab-table"><thead><tr><th>日期</th><th>币种</th><th>方向</th><th>价格</th><th>数量</th><th>盈亏</th><th>备注</th></tr></thead><tbody>'+rows+'</tbody></table>'+(trades.length>12?'<div class="lab-or">仅预览前 12 行，分析使用全部数据</div>':''):'';
}
function analyze(){
  var text=$('#lab-paste').value,msg=$('#lab-msg');msg.textContent='';
  var trades=parseText(text);
  if(!trades||!trades.length){msg.textContent='没有解析到有效记录。请检查格式：第一行表头（日期,币种,方向,价格,数量,盈亏,备注），或点「填入示例数据」看看长什么样。';return;}
  var st=stats(trades);
  if(!st.n){msg.textContent='解析到了 '+trades.length+' 行，但没有可用的「盈亏」列——复盘分析至少需要盈亏数据。';renderBatch(st,trades);return;}
  lastBatch=st;lastParsed=trades;renderBatch(st,trades);
  trainBrain(st,trades);
  msg.textContent='';$('#lab-ok').textContent='已解析 '+trades.length+' 行，其中 '+st.n+' 笔有盈亏数据。画像已更新。';
}

/* ========== 03 TradeBrain 画像 ========== */
var KEY='tradebrain_v1';
function loadBrain(){try{return JSON.parse(localStorage.getItem(KEY))||null;}catch(e){return null;}}
function saveBrain(b){localStorage.setItem(KEY,JSON.stringify(b));}
function trainBrain(st,trades){
  var b=loadBrain()||{uploads:0,trades:0,wins:0,gw:0,gl:0,total:0,maxDD:0,notes:0,batches:[]};
  b.uploads++;b.trades+=st.n;b.wins+=Math.round(st.winRate/100*st.n);
  b.gw+=st.gw;b.gl+=st.gl;b.total+=st.total;b.maxDD=Math.max(b.maxDD,st.maxDD);b.notes+=st.notes;
  b.batches.push({d:new Date().toISOString().slice(0,10),n:st.n,total:Math.round(st.total*100)/100,wr:Math.round(st.winRate*10)/10});
  if(b.batches.length>12)b.batches=b.batches.slice(-12);
  saveBrain(b);renderBrain();
}
function brainCalc(b){
  var wr=b.trades?b.wins/b.trades*100:null;
  var pf=b.gl>0?b.gw/b.gl:(b.gw>0?99:null);
  var payoff=b.gl>0&&b.wins>0?(b.gw/b.wins)/(b.gl/Math.max(1,b.trades-b.wins)):null;
  var avgTradesPerUp=b.uploads?b.trades/b.uploads:0;
  var noteRate=b.trades?b.notes/b.trades*100:0;
  var ddRatio=b.gw>0?b.maxDD/b.gw:1;
  var dims={
    '经验':Math.min(100,Math.round(Math.sqrt(b.trades)*10)),
    '盈利':pf==null?10:(pf>=99?95:pf>=2?90:pf>=1.5?78:pf>=1.2?64:Math.max(15,Math.round(pf*50))),
    '风控':ddRatio<=0.1?90:ddRatio<=0.25?70:ddRatio<=0.5?50:30,
    '纪律':Math.round(Math.min(50,b.uploads*10)+noteRate*0.5),
    '一致性':wr==null?10:Math.max(10,Math.round(100-Math.abs(wr-50)*1.6))
  };
  var tags=[];
  if(pf!=null&&pf>=1.5&&wr>=45)tags.push('稳健盈利');
  if(payoff!=null&&payoff>=2)tags.push('让利润奔跑');
  if(payoff!=null&&payoff<0.9&&b.trades>=10)tags.push('止盈过急');
  if(ddRatio>0.5&&b.trades>=10)tags.push('回撤偏深');
  if(wr!=null&&wr<35&&b.trades>=20)tags.push('情绪化交易?');
  if(b.trades>=10&&noteRate<30)tags.push('记录不完整');
  if(!tags.length)tags.push('潜力新星');
  var lv=b.trades>=700?8:b.trades>=400?7:b.trades>=200?6:b.trades>=100?5:b.trades>=50?4:b.trades>=25?3:b.trades>=10?2:1;
  var persona=tags[0]==='稳健盈利'?'稳健的趋势跟随者':tags[0]==='让利润奔跑'?'耐心型波段选手':tags[0]==='止盈过急'?'积极的短线选手':tags[0]==='回撤偏深'?'激进型进攻选手':tags[0]==='情绪化交易?'?'需要修炼心态的勇士':'正在进化的交易者';
  return {wr:wr,pf:pf,payoff:payoff,ddRatio:ddRatio,noteRate:noteRate,dims:dims,tags:tags.slice(0,4),lv:lv,persona:persona};
}
function renderBrain(){
  var card=$('#brain-card'),b=loadBrain();
  if(!b||!b.trades){card.innerHTML='<div class="brain-empty">还没有画像。上传第一批实盘记录，TradeBrain 会开始为你累积交易画像：<br>· 每次上传都会进化等级与称号<br>· 五个维度：经验 / 盈利 / 风控 / 纪律 / 一致性<br>· 标签系统识别你的交易风格与弱点<br>· 画像会喂给 DeepSeek，AI 点评越来越懂你</div>';$('#lab-ai').disabled=true;return;}
  var c=brainCalc(b);
  card.innerHTML='<div class="brain-top"><div class="brain-lv"><div class="n">Lv.'+c.lv+'</div><div class="t">TRADER</div></div><div><div class="brain-name">'+c.persona+'</div><div class="brain-sub">累计 '+b.trades+' 笔 · '+b.uploads+' 次上传 · 总盈亏 '+(b.total>=0?'+':'')+fmt(b.total)+'</div><div class="brain-tags">'+c.tags.map(function(t){return '<span class="brain-tag">'+t+'</span>';}).join('')+'</div></div></div>'+
  '<div style="margin-top:1.2rem">'+Object.keys(c.dims).map(function(k){return '<div class="bar-row"><span class="bl">'+k+'</span><div class="bar-track"><div class="bar-fill" data-w="'+c.dims[k]+'"></div></div><span class="bv">'+c.dims[k]+'</span></div>';}).join('')+'</div>'+
  '<div class="lab-or" style="margin-top:1rem">'+(b.batches.map(function(x){return x.d+' 上传 '+x.n+' 笔';}).join('　·　'))+'</div>';
  requestAnimationFrame(function(){setTimeout(function(){card.querySelectorAll('.bar-fill').forEach(function(el){el.style.width=el.getAttribute('data-w')+'%';});},60);});
  $('#lab-ai').disabled=false;
}
$('#lab-ai').addEventListener('click',function(){
  var b=loadBrain();if(!b||!lastBatch){$('#lab-msg').textContent='请先上传并分析一批记录。';return;}
  var c=brainCalc(b);
  var rows=lastParsed.filter(function(t){return t.pnl!=null&&!isNaN(t.pnl);}).slice(-30).map(function(t){
    return '| '+t.date+' | '+t.symbol+' | '+t.side+' | '+(t.pnl>0?'+':'')+t.pnl+' | '+(t.note||'—')+' |';}).join('\n');
  var body='## 实盘分析请求（第 '+b.uploads+' 次）\n\n### 交易画像（TradeBrain 累积）\n'
    +'- 等级：Lv.'+c.lv+' '+c.persona+'\n- 累计：'+b.trades+' 笔 / 胜率 '+fmt(c.wr,1)+'% / 利润因子 '+(c.pf>=99?'∞':fmt(c.pf,2))+' / 最大回撤 '+fmt(b.maxDD)+'\n'
    +'- 风格标签：'+c.tags.join('、')+'\n'
    +'- 维度：经验 '+c.dims['经验']+' / 盈利 '+c.dims['盈利']+' / 风控 '+c.dims['风控']+' / 纪律 '+c.dims['纪律']+' / 一致性 '+c.dims['一致性']+'\n\n'
    +'### 最近记录（最多 30 笔）\n| 日期 | 币种 | 方向 | 盈亏 | 备注 |\n|---|---|---|---|---|\n'+(rows||'（无）')
    +'\n\n### 请分析\n1. 结合画像指出我最核心的 1-2 个问题\n2. 给出下周就能执行的具体改进动作\n';
  var title='【实盘分析】'+new Date().toISOString().slice(0,10)+' 第'+b.uploads+'次';
  window.open('https://github.com/lhk20060417-dev/crypto-learning/issues/new?labels='+encodeURIComponent('实盘分析')+'&title='+encodeURIComponent(title)+'&body='+encodeURIComponent(body),'_blank');
  $('#lab-ok').textContent='已在 GitHub 打开预填好的分析请求，点击「Create」后约 40 秒，DeepSeek 点评会作为评论出现在 Issue 里（需要 GitHub 通知或稍后回来看）。';
});
$('#lab-reset').addEventListener('click',function(){localStorage.removeItem(KEY);lastBatch=null;lastParsed=[];renderBrain();$('#lab-ok').textContent='画像已清空。';});
renderBrain();

/* ========== 交互绑定 ========== */
$('#lab-analyze').addEventListener('click',analyze);
$('#lab-sample').addEventListener('click',function(){$('#lab-paste').value='日期,币种,方向,价格,数量,盈亏,备注\n2026-09-22,BTC,买,61200,0.02,260,趋势回踩买入\n2026-09-24,BTC,卖,62800,0.02,180,到达目标止盈\n2026-09-26,ETH,买,2380,1,-120,追涨被套止损\n2026-09-28,SOL,买,148,20,340,突破买入\n2026-09-30,ETH,卖,2460,1,90,反弹减仓\n2026-10-01,BTC,买,63500,0.01,-200,假突破止损\n2026-10-02,SOL,卖,155,20,160,分批止盈\n2026-10-03,BTC,卖,64100,0.01,150,移动止盈';analyze();});
$('#lab-clear').addEventListener('click',function(){$('#lab-paste').value='';$('#lab-msg').textContent='';});
var drop=$('#lab-drop'),file=$('#lab-file');
drop.addEventListener('click',function(){file.click();});
drop.addEventListener('dragover',function(e){e.preventDefault();drop.classList.add('over');});
drop.addEventListener('dragleave',function(){drop.classList.remove('over');});
drop.addEventListener('drop',function(e){e.preventDefault();drop.classList.remove('over');var f=e.dataTransfer.files[0];if(f)readFile(f);});
file.addEventListener('change',function(){if(file.files[0])readFile(file.files[0]);});
function readFile(f){var r=new FileReader();r.onload=function(){$('#lab-paste').value=r.result;analyze();};r.readAsText(f);}
});
</script>
