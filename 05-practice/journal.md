---
layout: default
title: 交易日志提交
parent: 第五阶段：实战与复盘
nav_order: 6
---

# 交易日志提交

在这里提交每一笔交易的想法，AI 教练会从消息面和技术面两个角度给你点评。分析结果自动写入你的 Google 表格。

<form id="journal-form" onsubmit="return submitJournal(event)" style="max-width:640px;">

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
    <label style="grid-column:1/3;">交易想法（你的分析逻辑，越详细点评越准）
      <textarea id="jf-thoughts" required rows="4" style="width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;"></textarea>
    </label>
    <label>币种
      <input id="jf-coin" required placeholder="如 BTC / ETH" style="width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;">
    </label>
    <label>方向
      <select id="jf-direction" style="width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;">
        <option>买入做多</option><option>卖出做空</option><option>观望</option>
      </select>
    </label>
    <label>入场价
      <input id="jf-entry" type="number" step="any" style="width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;">
    </label>
    <label>仓位（金额或比例）
      <input id="jf-position" placeholder="如 1万 / 总资金5%" style="width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;">
    </label>
    <label>止损价
      <input id="jf-stop" type="number" step="any" style="width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;">
    </label>
    <label>止盈价
      <input id="jf-takeprofit" type="number" step="any" style="width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;">
    </label>
  </div>

  <button type="submit" style="padding:10px 28px;background:#0b5fff;color:#fff;border:none;border-radius:6px;cursor:pointer;">提交给 AI 教练</button>
  <span id="jf-status" style="margin-left:12px;color:#666;"></span>
</form>

<script>
// ⚠️ 部署后把下面的占位 URL 换成你的 Apps Script Web App 地址
var APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_URL";

function submitJournal(ev) {
  ev.preventDefault();
  var status = document.getElementById('jf-status');
  if (APPS_SCRIPT_URL === "YOUR_APPS_SCRIPT_URL") {
    status.textContent = "服务尚未配置：请先把 Apps Script 部署后获得的 URL 填入本页。";
    return false;
  }
  status.textContent = "提交中…";
  var payload = {
    date: new Date().toLocaleString(),
    coin: document.getElementById('jf-coin').value,
    direction: document.getElementById('jf-direction').value,
    entry: document.getElementById('jf-entry').value,
    stop: document.getElementById('jf-stop').value,
    takeProfit: document.getElementById('jf-takeprofit').value,
    position: document.getElementById('jf-position').value,
    thoughts: document.getElementById('jf-thoughts').value
  };
  fetch(APPS_SCRIPT_URL, {
    method: "POST",
    // 用 text/plain 避免触发跨域预检请求
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload)
  }).then(function (r) { return r.json(); }).then(function () {
    status.textContent = "✓ 已提交，AI 分析会写入你的 Google 表格（约需 10–30 秒）";
    document.getElementById('journal-form').reset();
  }).catch(function () {
    status.textContent = "提交失败，请检查网络后重试";
  });
  return false;
}
</script>

## 使用流程

1. 每笔交易**下单前**在这里写下你的分析逻辑（币种、方向、价位、仓位、想法）
2. 点击提交，数据进入你的 Google 表格
3. 约 10–30 秒后刷新表格，在"AI分析"列看到教练点评
4. 交易结束后把"结果"补进表格，复盘时对照当初的想法和 AI 的提醒

> 提示：想法写得越具体（为什么这个价位、依据什么信号、止损逻辑是什么），AI 的点评就越有针对性。

---

[返回第五阶段目录](index)
