/* ============================================================
 * 虚拟货币学习系统 · 首页 Hero 动画 v2
 * 粒子网络 + 扫描光束 + 可交互阶段节点 + 鼠标扰动
 * 纯 Canvas 2D，零依赖，单文件
 * ============================================================ */
(function () {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CFG = {
    density: 24000,
    maxParticles: 150,
    linkDist: 115,
    beamWidth: 100,
    beamSpeed: 1.5,
    trailAlpha: 0.2,
    mouseRadius: 130,   // 鼠标影响半径
    mouseForce: 0.06    // 鼠标扰动强度
  };

  var W = 0, H = 0, particles = [], nodes = [],
      beamX = -140, rafId = null, visible = true,
      mouse = { x: -9999, y: -9999 };

  /* ---------- 尺寸 ---------- */
  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.max(1, Math.floor(W * dpr));
    canvas.height = Math.max(1, Math.floor(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seedParticles();
    readNodes();
  }

  /* ---------- 漂移粒子 ---------- */
  function seedParticles() {
    var n = Math.min(CFG.maxParticles, Math.round((W * H) / CFG.density));
    particles = [];
    for (var i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        hx: 0, hy: 0,          // 鼠标扰动产生的位移（带弹簧回位）
        r: Math.random() * 1.4 + 0.8,
        tw: Math.random() * Math.PI * 2
      });
    }
  }

  /* ---------- 阶段节点（DOM 同步） ---------- */
  function readNodes() {
    nodes = [];
    var els = canvas.parentNode.querySelectorAll('.hero-node');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      nodes.push({
        el: el,
        x: parseFloat(el.getAttribute('data-x')) / 100 * W,
        y: parseFloat(el.getAttribute('data-y')) / 100 * H,
        lit: false
      });
    }
  }

  function beamBoost(x) {
    var d = Math.abs(x - beamX);
    if (d > CFG.beamWidth) return 0;
    var t = 1 - d / CFG.beamWidth;
    return t * t;
  }

  /* ---------- 主绘制 ---------- */
  function drawFrame(stepMotion) {
    ctx.fillStyle = 'rgba(7, 11, 20, ' + CFG.trailAlpha + ')';
    ctx.fillRect(0, 0, W, H);

    var i, j, p, q, dx, dy, dist, boost, alpha, mdx, mdy, mdist;

    if (stepMotion) {
      beamX += CFG.beamSpeed;
      if (beamX > W + 140) beamX = -140;
    }

    /* 粒子运动 + 鼠标扰动 */
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      if (stepMotion) {
        p.x += p.vx; p.y += p.vy; p.tw += 0.03;
        // 鼠标排斥/吸引的弹簧位移
        mdx = p.x - mouse.x; mdy = p.y - mouse.y;
        mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < CFG.mouseRadius && mdist > 0.01) {
          var f = (1 - mdist / CFG.mouseRadius) * CFG.mouseForce;
          p.hx += (mdx / mdist) * f * 10;
          p.hy += (mdy / mdist) * f * 10;
        }
        p.hx *= 0.9; p.hy *= 0.9;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
      }
    }

    /* 粒子-粒子连线 */
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      var px = p.x + p.hx, py = p.y + p.hy;
      boost = beamBoost(px);
      for (j = i + 1; j < particles.length; j++) {
        q = particles[j];
        var qx = q.x + q.hx, qy = q.y + q.hy;
        dx = px - qx; dy = py - qy;
        if (dx > CFG.linkDist || dx < -CFG.linkDist ||
            dy > CFG.linkDist || dy < -CFG.linkDist) continue;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > CFG.linkDist) continue;
        alpha = (1 - dist / CFG.linkDist) * 0.22;
        var mb = beamBoost((px + qx) / 2);
        if (mb > 0) alpha += mb * 0.5;
        ctx.strokeStyle = (mb > 0.25 || boost > 0.3)
          ? 'rgba(120, 235, 255, ' + Math.min(alpha, 0.85) + ')'
          : 'rgba(88, 138, 215, ' + alpha + ')';
        ctx.lineWidth = (mb > 0.25) ? 1.1 : 0.7;
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(qx, qy); ctx.stroke();
      }
      /* 粒子-节点连线（节点是网络的一部分） */
      for (j = 0; j < nodes.length; j++) {
        var nd = nodes[j];
        dx = px - nd.x; dy = py - nd.y;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CFG.linkDist * 1.15) {
          var nb = Math.max(beamBoost(nd.x), nd.lit ? 0.7 : 0);
          alpha = (1 - dist / (CFG.linkDist * 1.15)) * (0.16 + nb * 0.4);
          ctx.strokeStyle = 'rgba(110, 200, 255, ' + alpha + ')';
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(nd.x, nd.y); ctx.stroke();
        }
      }
    }

    /* 粒子本体 */
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      var bx = p.x + p.hx, by = p.y + p.hy;
      boost = beamBoost(bx);
      var glow = 0.5 + 0.22 * Math.sin(p.tw) + boost * 0.45;
      ctx.fillStyle = boost > 0.2
        ? 'rgba(185, 242, 255, ' + Math.min(glow, 1) + ')'
        : 'rgba(135, 182, 252, ' + glow + ')';
      ctx.beginPath();
      ctx.arc(bx, by, p.r + boost * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    /* 节点光晕（canvas 侧） */
    for (i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      var nBoost = Math.max(beamBoost(node.x), node.lit ? 0.8 : 0);
      if (nBoost > 0.03) {
        var R = 26 + nBoost * 26;
        var g = ctx.createRadialGradient(node.x, node.y, 2, node.x, node.y, R);
        g.addColorStop(0, 'rgba(96, 225, 255, ' + (0.4 * nBoost) + ')');
        g.addColorStop(1, 'rgba(96, 225, 255, 0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(node.x, node.y, R, 0, Math.PI * 2); ctx.fill();
      }
      // 同步 DOM 高亮状态
      var lit = beamBoost(node.x) > 0.35;
      if (lit !== node.lit) {
        node.lit = lit;
        node.el.classList.toggle('is-lit', lit);
      }
    }

    /* 扫描光束 */
    if (beamX > -140 && beamX < W + 140) {
      var grad = ctx.createLinearGradient(beamX - CFG.beamWidth, 0, beamX, 0);
      grad.addColorStop(0, 'rgba(77, 208, 225, 0)');
      grad.addColorStop(1, 'rgba(77, 208, 225, 0.09)');
      ctx.fillStyle = grad;
      ctx.fillRect(beamX - CFG.beamWidth, 0, CFG.beamWidth, H);
      var core = ctx.createLinearGradient(beamX - 2, 0, beamX + 2, 0);
      core.addColorStop(0, 'rgba(150, 240, 255, 0)');
      core.addColorStop(0.5, 'rgba(200, 250, 255, 0.5)');
      core.addColorStop(1, 'rgba(150, 240, 255, 0)');
      ctx.fillStyle = core;
      ctx.fillRect(beamX - 2, 0, 4, H);
    }
  }

  /* ---------- 鼠标 ---------- */
  canvas.parentNode.addEventListener('pointermove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentNode.addEventListener('pointerleave', function () {
    mouse.x = -9999; mouse.y = -9999;
  });

  /* ---------- 循环控制 ---------- */
  function loop() {
    if (!visible) { rafId = null; return; }
    drawFrame(true);
    rafId = requestAnimationFrame(loop);
  }
  function start() { if (rafId === null && !reducedMotion) rafId = requestAnimationFrame(loop); }
  function stop() { if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; } }

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0.02 }).observe(canvas);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else if (visible) start();
  });
  window.addEventListener('resize', resize);

  /* ---------- 启动 ---------- */
  resize();
  ctx.fillStyle = 'rgba(7, 11, 20, 1)';
  ctx.fillRect(0, 0, W, H);
  if (reducedMotion) { beamX = W * 0.5; drawFrame(false); }
  else start();
})();
