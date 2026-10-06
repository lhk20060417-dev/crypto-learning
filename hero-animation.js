/* ============================================================
 * 虚拟货币学习系统 · 首页 Hero 动画
 * 粒子网络 + 扫描光束：混沌 → 结构 → 验证 → 重置
 * 纯 Canvas 2D，零依赖，单文件
 * ============================================================ */
(function () {
  var canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var CFG = {
    density: 26000,   // 每多少平方像素 1 个粒子（自动按尺寸换算数量）
    maxParticles: 160,
    linkDist: 118,    // 粒子连线距离
    beamWidth: 90,    // 光束影响范围（px）
    beamSpeed: 1.4,   // 光束速度（px/帧）
    trailAlpha: 0.22  // 拖尾衰减（越小拖尾越长）
  };

  var W = 0, H = 0, particles = [], beamX = -120, rafId = null, visible = true;

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.max(1, Math.floor(W * dpr));
    canvas.height = Math.max(1, Math.floor(H * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    seed();
  }

  function seed() {
    var n = Math.min(CFG.maxParticles, Math.round((W * H) / CFG.density));
    particles = [];
    for (var i = 0; i < n; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.9,
        tw: Math.random() * Math.PI * 2   // 闪烁相位
      });
    }
  }

  function beamBoost(x) {
    // 距光束越近越亮：0（远）~ 1（ beam 上）
    var d = Math.abs(x - beamX);
    if (d > CFG.beamWidth) return 0;
    var t = 1 - d / CFG.beamWidth;
    return t * t;
  }

  function drawFrame(stepMotion) {
    // 拖尾：半透明背景覆盖，旧画面逐渐“沉寂”
    ctx.fillStyle = 'rgba(8, 12, 22, ' + CFG.trailAlpha + ')';
    ctx.fillRect(0, 0, W, H);

    var i, j, p, q, dx, dy, dist, boost, alpha;

    // 粒子漂移
    if (stepMotion) {
      for (i = 0; i < particles.length; i++) {
        p = particles[i];
        p.x += p.vx; p.y += p.vy;
        p.tw += 0.03;
        if (p.x < -20) p.x = W + 20; else if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20; else if (p.y > H + 20) p.y = -20;
      }
      beamX += CFG.beamSpeed;
      if (beamX > W + 120) beamX = -120;   // 一轮扫描结束 → 循环重置
    }

    // 网络连线
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      boost = beamBoost(p.x);
      for (j = i + 1; j < particles.length; j++) {
        q = particles[j];
        dx = p.x - q.x; dy = p.y - q.y;
        if (dx > CFG.linkDist || dx < -CFG.linkDist ||
            dy > CFG.linkDist || dy < -CFG.linkDist) continue;
        dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > CFG.linkDist) continue;
        alpha = (1 - dist / CFG.linkDist) * 0.28;
        var midBoost = beamBoost((p.x + q.x) / 2);
        if (midBoost > 0) alpha += midBoost * 0.55;
        ctx.strokeStyle = midBoost > 0.25
          ? 'rgba(120, 235, 255, ' + Math.min(alpha, 0.9) + ')'
          : 'rgba(90, 140, 220, ' + alpha + ')';
        ctx.lineWidth = midBoost > 0.25 ? 1.1 : 0.7;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.stroke();
      }
    }

    // 粒子本体
    for (i = 0; i < particles.length; i++) {
      p = particles[i];
      boost = beamBoost(p.x);
      var glow = 0.55 + 0.25 * Math.sin(p.tw) + boost * 0.45;
      ctx.fillStyle = boost > 0.2
        ? 'rgba(190, 245, 255, ' + Math.min(glow, 1) + ')'
        : 'rgba(140, 190, 255, ' + glow + ')';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + boost * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    // 扫描光束本体
    if (beamX > -120 && beamX < W + 120) {
      var grad = ctx.createLinearGradient(beamX - CFG.beamWidth, 0, beamX, 0);
      grad.addColorStop(0, 'rgba(77, 208, 225, 0)');
      grad.addColorStop(1, 'rgba(77, 208, 225, 0.10)');
      ctx.fillStyle = grad;
      ctx.fillRect(beamX - CFG.beamWidth, 0, CFG.beamWidth, H);
      // 光束前沿亮线
      var core = ctx.createLinearGradient(beamX - 2, 0, beamX + 2, 0);
      core.addColorStop(0, 'rgba(150, 240, 255, 0)');
      core.addColorStop(0.5, 'rgba(200, 250, 255, 0.55)');
      core.addColorStop(1, 'rgba(150, 240, 255, 0)');
      ctx.fillStyle = core;
      ctx.fillRect(beamX - 2, 0, 4, H);
    }
  }

  function loop() {
    if (!visible) { rafId = null; return; }
    drawFrame(true);
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (rafId === null && !reducedMotion) {
      rafId = requestAnimationFrame(loop);
    }
  }

  function stop() {
    if (rafId !== null) { cancelAnimationFrame(rafId); rafId = null; }
  }

  // 离开视口时暂停，省电省 CPU
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0.02 }).observe(canvas);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
    else if (visible) start();
  });
  window.addEventListener('resize', resize);

  // 初始化：减动效偏好则只画一帧静态结构
  resize();
  ctx.fillStyle = 'rgba(8, 12, 22, 1)';
  ctx.fillRect(0, 0, W, H);
  if (reducedMotion) { beamX = W * 0.55; drawFrame(false); }
  else start();
})();
