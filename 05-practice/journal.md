---
layout: default
title: 交易日志提交
parent: 第五阶段：实战与复盘
nav_order: 6
---

# 交易日志提交

填写你的交易想法，点击提交后会生成一篇**交易日志**（GitHub Issue）。确认创建后，AI 教练会在 1–2 分钟内把你的点评发到日志评论区。

<form id="journal-form" onsubmit="return submitJournal(event)" style="max-width:640px;">

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
    <label style="grid-column:1/3;">交易想法（你的分析逻辑，越详细点评越准）
      <textarea id="jf-thoughts" required rows="4" style="width:100%;margin-top:4px;padding:8px;border:1px solid #ccc;border-radius:6px;" placeholder="为什么在这个位置做这笔交易？依据什么信号？止损逻辑是什么？"></textarea>
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

  <button type="submit" style="padding:10px 28px;">提交给 AI 教练</button>
  <span id="jf-status" style="margin-left:12px;color:#666;"></span>
</form>

<script>
function submitJournal(ev) {
  ev.preventDefault();
  var v = function (id) { return document.getElementById(id).value.trim(); };
  var now = new Date();
  var dateStr = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

  var title = '交易日志｜' + v('jf-coin') + ' ' + v('jf-direction') + ' ' + dateStr;

  var body = [
    '## 交易记录',
    '- 日期：' + dateStr,
    '- 币种：' + v('jf-coin'),
    '- 方向：' + v('jf-direction'),
    '- 入场价：' + (v('jf-entry') || '未填写'),
    '- 止损价：' + (v('jf-stop') || '未填写'),
    '- 止盈价：' + (v('jf-takeprofit') || '未填写'),
    '- 仓位：' + (v('jf-position') || '未填写'),
    '',
    '## 交易想法',
    v('jf-thoughts'),
    '',
    '## 交易结果（平仓后回来补充）',
    '- 平仓价：',
    '- 盈亏：',
    '- 复盘：'
  ].join('\n');

  var url = 'https://github.com/lhk20060417-dev/crypto-learning/issues/new'
    + '?labels=' + encodeURIComponent('交易日志')
    + '&title=' + encodeURIComponent(title)
    + '&body=' + encodeURIComponent(body);

  document.getElementById('jf-status').textContent = '已生成日志，请在打开的新页面点绿色「Create」按钮确认';
  window.open(url, '_blank');
  return false;
}
</script>

## 使用流程

1. 每笔交易**下单前**在这里写下分析逻辑，点击提交
2. 浏览器会打开预填好的日志页面 → 点绿色 **Create** 确认（已登录 GitHub，一步到位）
3. 等 1–2 分钟，**AI 教练点评**会自动出现在日志评论区
4. 平仓后回到日志，把「交易结果」补充完整——想法 vs 结果 vs AI 提醒，就是最有价值的复盘材料
5. [查看全部交易日志 →](https://github.com/lhk20060417-dev/crypto-learning/issues?q=label%3A%E4%BA%A4%E6%98%93%E6%97%A5%E5%BF%97)

> 提示：想法写得越具体，AI 的点评就越有针对性。日志是公开的（仓库是 Public），**不要填写真实的资金总额**。

---

[返回第五阶段目录](index)
