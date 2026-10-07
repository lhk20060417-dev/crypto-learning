---
layout: default
title: 首页
nav_order: 0
---

<style>
.hero-wrap{position:relative;width:100vw;margin-left:calc(50% - 50vw);height:calc(100vh - 60px);min-height:540px;overflow:hidden;background:#070b14;}
#hero-canvas{position:absolute;inset:0;width:100%;height:100%;display:block;}
.hero-title{position:absolute;left:0;right:0;top:44%;transform:translateY(-50%);text-align:center;pointer-events:none;padding:0 1rem;}
.hero-eyebrow{color:#3f5d85;font-size:.72rem;letter-spacing:.5em;margin-bottom:1.1rem;font-weight:600;}
.hero-title h1{color:#e8f4ff;font-size:clamp(2rem,6vw,4.6rem);font-weight:700;letter-spacing:.22em;margin:0;text-shadow:0 0 34px rgba(77,208,225,.5);}
.hero-title .sub{color:#4dd0e1;font-size:clamp(.85rem,1.6vw,1.1rem);margin-top:1.1rem;letter-spacing:.2em;text-shadow:0 0 14px rgba(77,208,225,.4);}
.hero-title .motto{color:#54719e;font-size:.72rem;margin-top:1.6rem;letter-spacing:.42em;}
.hero-node{position:absolute;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;gap:7px;text-decoration:none;z-index:2;}
.hero-node .dot{width:13px;height:13px;border-radius:50%;background:#0e1626;border:1.5px solid rgba(120,200,255,.55);box-shadow:0 0 12px rgba(96,225,255,.25);transition:all .35s ease;}
.hero-node .tag{font-size:.85rem;color:#9db8de;letter-spacing:.1em;padding:4px 14px;border:1px solid rgba(120,180,255,.22);border-radius:999px;background:rgba(10,16,28,.6);backdrop-filter:blur(6px);transition:all .35s ease;white-space:nowrap;}
.hero-node:hover .tag,.hero-node:focus .tag{color:#eaf7ff;border-color:rgba(120,230,255,.7);background:rgba(16,30,48,.85);box-shadow:0 0 18px rgba(96,225,255,.3);}
.hero-node:hover .dot,.hero-node:focus .dot{background:#4dd0e1;border-color:#bdf3ff;box-shadow:0 0 22px rgba(120,235,255,.9);}
.hero-node.is-lit .dot{background:#4dd0e1;border-color:#d5f8ff;box-shadow:0 0 26px rgba(140,240,255,1);}
.hero-node.is-lit .tag{color:#f0fbff;border-color:rgba(140,235,255,.75);box-shadow:0 0 16px rgba(96,225,255,.35);}
.scroll-hint{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;color:#54719e;font-size:.66rem;letter-spacing:.42em;z-index:2;pointer-events:none;}
.scroll-hint .chev{width:14px;height:14px;border-right:1.5px solid #54719e;border-bottom:1.5px solid #54719e;transform:rotate(45deg);animation:hintFloat 2.2s ease-in-out infinite;}
@keyframes hintFloat{0%,100%{transform:rotate(45deg) translate(0,0);opacity:.45;}50%{transform:rotate(45deg) translate(5px,5px);opacity:1;}}
.stats-band{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1px;background:rgba(90,140,220,.14);border:1px solid rgba(90,140,220,.14);border-radius:14px;overflow:hidden;margin:2.2rem 0;}
.stat-cell{background:#0a101c;padding:1.8rem 1rem;text-align:center;}
.stat-num{color:#e8f4ff;font-size:2.4rem;font-weight:700;letter-spacing:.02em;text-shadow:0 0 18px rgba(77,208,225,.35);}
.stat-num .plus{color:#4dd0e1;}
.stat-label{color:#54719e;font-size:.74rem;letter-spacing:.24em;margin-top:.5rem;}
.rv{opacity:0;transform:translateY(26px);transition:opacity .8s ease,transform .8s ease;}
.rv-in{opacity:1;transform:none;}
@media (max-width:640px){
  .hero-wrap{height:calc(100vh - 52px);min-height:480px;}
  .hero-title{top:40%;}
  .hero-eyebrow{letter-spacing:.3em;}
  .hero-title .motto{display:none;}
  .hero-node .tag{font-size:.68rem;padding:2px 8px;}
  .hero-node .dot{width:10px;height:10px;}
  .stat-num{font-size:1.8rem;}
}
@media (prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none;}.scroll-hint .chev{animation:none;}}
</style>

<div class="hero-wrap">
  <canvas id="hero-canvas"></canvas>
  <div class="hero-title">
    <div class="hero-eyebrow">CRYPTO LEARNING SYSTEM</div>
    <h1>虚拟货币学习系统</h1>
    <div class="sub">从 0 到 1 的系统化学习路径</div>
    <div class="motto">CHAOS → STRUCTURE → VERIFY → RESET</div>
  </div>
  <a class="hero-node" data-x="11" data-y="28" href="{{ '/01-basics/' | relative_url }}"><span class="dot"></span><span class="tag">认知地基</span></a>
  <a class="hero-node" data-x="24" data-y="72" href="{{ '/02-trading/' | relative_url }}"><span class="dot"></span><span class="tag">交易基础</span></a>
  <a class="hero-node" data-x="42" data-y="16" href="{{ '/03-strategies/' | relative_url }}"><span class="dot"></span><span class="tag">策略全集</span></a>
  <a class="hero-node" data-x="60" data-y="78" href="{{ '/04-advanced/' | relative_url }}"><span class="dot"></span><span class="tag">进阶生态</span></a>
  <a class="hero-node" data-x="79" data-y="24" href="{{ '/05-practice/' | relative_url }}"><span class="dot"></span><span class="tag">实战复盘</span></a>
  <a class="hero-node" data-x="90" data-y="60" href="{{ '/06-indicators/' | relative_url }}"><span class="dot"></span><span class="tag">指标大全</span></a>
  <div class="scroll-hint"><span>SCROLL TO EXPLORE</span><span class="chev"></span></div>
</div>
<script src="{{ '/hero-animation.js' | relative_url }}"></script>

<div class="stats-band">
  <div class="stat-cell"><div class="stat-num"><span class="count" data-to="66">0</span></div><div class="stat-label">篇教程与词条</div></div>
  <div class="stat-cell"><div class="stat-num"><span class="count" data-to="22">0</span></div><div class="stat-label">个技术指标详解</div></div>
  <div class="stat-cell"><div class="stat-num"><span class="count" data-to="130">0</span><span class="plus">+</span></div><div class="stat-label">道随堂测验</div></div>
  <div class="stat-cell"><div class="stat-num"><span class="count" data-to="40">0</span><span class="plus">s</span></div><div class="stat-label">AI 交易点评</div></div>
</div>

<script>
document.addEventListener('DOMContentLoaded',function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('rv-in');io.unobserve(e.target);}});},{threshold:.15});
  document.querySelectorAll('h2,p,ol,ul,blockquote').forEach(function(el){if(!el.closest('.hero-wrap')){el.classList.add('rv');io.observe(el);}});
  var co=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;co.unobserve(e.target);
    var el=e.target,to=+el.dataset.to,t0=null;
    function step(t){if(!t0)t0=t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step);}
    requestAnimationFrame(step);});},{threshold:.4});
  document.querySelectorAll('.count').forEach(function(el){co.observe(el);});
});
</script>

> 上方的六个发光节点就是学习地图：扫描光束周期性扫过整个网络——被光照亮的，就是此刻值得你专注的部分。点击任意节点直接进入对应阶段；移动鼠标可以扰动粒子。

## 学习阶段
1. [第一阶段：认知地基](01-basics/)
2. [第二阶段：交易基础](02-trading/)
3. [第三阶段：交易策略全集](03-strategies/)
4. [第四阶段：进阶与生态](04-advanced/)
5. [第五阶段：实战与复盘](05-practice/)
6. [附录：指标与理论大全](06-indicators/)

## 使用说明
- 每节先看目标
- 再看概念和例子
- 最后做测验
- 答完展开答案
- 错题记录到错题本

## 进度追踪

### 第一阶段：认知地基
- [ ] 第 1 节：货币与法币
- [ ] 第 2 节：区块链
- [ ] 第 3 节：比特币
- [ ] 第 4 节：以太坊
- [ ] 第 5 节：钱包
- [ ] 第 6 节：交易所
- [ ] 第 7 节：链上
- [ ] 第 8 节：稳定币
- [ ] 第 9 节：安全
- [ ] 阶段测验

### 第二阶段：交易基础
- [ ] 第 1 节：现货交易
- [ ] 第 2 节：K 线基础
- [ ] 第 3 节：支撑与阻力
- [ ] 第 4 节：常用指标
- [ ] 第 5 节：仓位管理
- [ ] 第 6 节：风险控制
- [ ] 第 7 节：交易心理
- [ ] 阶段测验

### 第三阶段：交易策略全集
- [ ] 第 1 节：趋势跟踪
- [ ] 第 2 节：突破交易
- [ ] 第 3 节：回调买入
- [ ] 第 4 节：网格交易
- [ ] 第 5 节：定投（DCA）
- [ ] 第 6 节：套利
- [ ] 第 7 节：对冲
- [ ] 第 8 节：马丁格尔（警惕）
- [ ] 第 9 节：海龟交易法
- [ ] 第 10 节：策略风格匹配
- [ ] 第 11 节：量化入门
- [ ] 阶段测验

### 第四阶段：进阶与生态
- [ ] 第 1 节：DeFi
- [ ] 第 2 节：NFT
- [ ] 第 3 节：Layer 2
- [ ] 第 4 节：跨链桥
- [ ] 第 5 节：稳定币机制
- [ ] 第 6 节：监管与合规
- [ ] 第 7 节：代币经济学
- [ ] 阶段测验

### 第五阶段：实战与复盘
- [ ] 第 1 节：模拟盘
- [ ] 第 2 节：小资金实盘
- [ ] 第 3 节：交易日志
- [ ] 第 4 节：定期复盘
- [ ] 第 5 节：迭代系统

### 附录：指标与理论大全（22 词条）
- [ ] 流动性
- [ ] RSI 相对强弱
- [ ] MACD
- [ ] 布林带
- [ ] 左侧交易 vs 右侧交易
- [ ] 道氏理论
- [ ] 江恩理论
- [ ] 均线与葛兰碧八大法则
- [ ] ADX 趋向指标
- [ ] KDJ
- [ ] 随机指标与威廉指标
- [ ] CCI 商品通道指数
- [ ] OBV 与量价关系
- [ ] 艾略特波浪理论
- [ ] 斐波那契回撤与扩展
- [ ] 威科夫方法
- [ ] 缠论
- [ ] 箱体理论与达瓦斯操作法
- [ ] 趋势线与通道
- [ ] 缺口理论
- [ ] 背离综合
- [ ] SAR 与一目均衡表
