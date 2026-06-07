/**
 * Rapid City Digital – iPod Widget
 * Drop <script src="ipod-widget.js"></script> into any page.
 * Customize TRACKS below with your Suno audio URLs.
 */
(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // TRACKS  ←  Add your Suno audio URLs and song names here
  // ─────────────────────────────────────────────────────────────────────────
  var TRACKS = [
    {
      title: 'Rapid City Rising',
      artist: 'Rapid City Digital',
      src: '',   // ← paste Suno .mp3 URL
      hue: 210
    },
    {
      title: 'Digital Dreams',
      artist: 'Rapid City Digital',
      src: '',
      hue: 270
    },
    {
      title: 'Social Signal',
      artist: 'Rapid City Digital',
      src: '',
      hue: 150
    },
    {
      title: 'Brand New Wave',
      artist: 'Rapid City Digital',
      src: '',
      hue: 30
    },
    {
      title: 'Content King',
      artist: 'Rapid City Digital',
      src: '',
      hue: 340
    },
    {
      title: 'Marketing Magic',
      artist: 'Rapid City Digital',
      src: '',
      hue: 185
    },
    {
      title: 'Click & Convert',
      artist: 'Rapid City Digital',
      src: '',
      hue: 50
    },
    {
      title: 'Scroll Stop',
      artist: 'Rapid City Digital',
      src: '',
      hue: 310
    }
  ];

  // ─────────────────────────────────────────────────────────────────────────
  // STYLES
  // ─────────────────────────────────────────────────────────────────────────
  var CSS = [
    '#rcd-ipod-widget,#rcd-ipod-widget *{box-sizing:border-box;margin:0;padding:0;}',

    /* ── wrapper ── */
    '#rcd-ipod-widget{',
    '  position:fixed;bottom:24px;right:24px;z-index:2147483647;',
    '  font-family:-apple-system,"Helvetica Neue",Helvetica,Arial,sans-serif;',
    '  user-select:none;-webkit-user-select:none;',
    '}',

    /* ── toggle button ── */
    '#rcd-ipod-toggle{',
    '  position:absolute;bottom:0;right:0;width:52px;height:52px;',
    '  border-radius:50%;border:none;cursor:pointer;',
    '  background:linear-gradient(145deg,#f4f4f4,#d4d4d4);',
    '  box-shadow:0 4px 14px rgba(0,0,0,.38),0 0 0 1px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.75);',
    '  display:flex;align-items:center;justify-content:center;',
    '  transition:transform .15s,box-shadow .15s;',
    '}',
    '#rcd-ipod-toggle:hover{transform:scale(1.08);box-shadow:0 6px 20px rgba(0,0,0,.42),0 0 0 1px rgba(0,0,0,.14),inset 0 1px 0 rgba(255,255,255,.75);}',
    '#rcd-ipod-toggle:active{transform:scale(.95);}',
    '#rcd-ipod-toggle svg{width:22px;height:22px;fill:#555;}',

    /* ── toast ── */
    '#rcd-ipod-toast{',
    '  position:absolute;bottom:62px;right:0;',
    '  background:rgba(0,0,0,.82);color:#fff;font-size:11px;',
    '  padding:6px 12px;border-radius:20px;white-space:nowrap;',
    '  opacity:0;transform:translateY(6px);pointer-events:none;',
    '  transition:opacity .22s,transform .22s;',
    '}',
    '#rcd-ipod-toast.rcd-show{opacity:1;transform:translateY(0);}',

    /* ── ipod body ── */
    '#rcd-ipod-device{',
    '  position:absolute;bottom:64px;right:0;',
    '  width:234px;',
    '  background:linear-gradient(160deg,#fafafa 0%,#ebebeb 45%,#d6d6d6 100%);',
    '  border-radius:28px;',
    '  box-shadow:',
    '    0 0 0 1px rgba(0,0,0,.18),',
    '    0 28px 72px rgba(0,0,0,.58),',
    '    0 8px 22px rgba(0,0,0,.22),',
    '    inset 0 1px 0 rgba(255,255,255,.88),',
    '    inset 0 -1px 0 rgba(0,0,0,.08);',
    '  padding-bottom:20px;',
    '  transform-origin:bottom right;',
    '}',
    /* hide: fast ease-in, shrinks to nothing toward the toggle button */
    '#rcd-ipod-device.rcd-hidden{transform:scale(.03);opacity:0;pointer-events:none;transition:transform .26s cubic-bezier(.55,.06,.68,.19),opacity .18s ease;}',
    /* show: bouncy pop up from toggle corner */
    '#rcd-ipod-device.rcd-visible{transform:scale(1);opacity:1;pointer-events:all;transition:transform .4s cubic-bezier(.34,1.56,.64,1),opacity .3s ease;}',

    /* toggle button bounce when iPod hides into it */
    '@keyframes rcdCatch{0%{transform:scale(1)}45%{transform:scale(1.28)}100%{transform:scale(1)}}',
    '#rcd-ipod-toggle.rcd-catch{animation:rcdCatch .32s ease;}',

    /* ── top bar (hold switch + jack + hide button) ── */
    '.rcd-top-bar{height:30px;display:flex;align-items:center;padding:0 14px 0 18px;gap:10px;}',
    '.rcd-hide-btn{margin-left:auto;background:rgba(0,0,0,.12);border:none;border-radius:8px;padding:3px 8px;font-size:9px;font-weight:700;color:#888;cursor:pointer;letter-spacing:.6px;text-transform:uppercase;line-height:1;transition:background .15s,color .15s;}',
    '.rcd-hide-btn:hover{background:rgba(0,0,0,.22);color:#555;}',
    '.rcd-hide-btn:active{background:rgba(0,0,0,.3);}',
    '.rcd-jack{width:8px;height:8px;border-radius:50%;background:radial-gradient(circle,#555,#333);box-shadow:0 1px 2px rgba(0,0,0,.5);}',
    '.rcd-hold-track{width:28px;height:10px;border-radius:5px;background:linear-gradient(180deg,#c5c5c5,#aaa);position:relative;box-shadow:inset 0 1px 2px rgba(0,0,0,.3);}',
    '.rcd-hold-track::after{content:"";position:absolute;left:2px;top:1px;width:12px;height:8px;border-radius:4px;background:linear-gradient(180deg,#e6e6e6,#c6c6c6);box-shadow:0 1px 1px rgba(0,0,0,.28);}',

    /* ── screen bezel ── */
    '.rcd-screen-bezel{',
    '  margin:0 14px;border-radius:7px;padding:3px;',
    '  background:linear-gradient(180deg,#999,#bbb 28%,#aaa 72%,#888);',
    '  box-shadow:0 2px 6px rgba(0,0,0,.38),inset 0 1px 0 rgba(255,255,255,.28);',
    '}',

    /* ── screen ── */
    '.rcd-screen{',
    '  background:#141420;border-radius:4px;height:140px;',
    '  overflow:hidden;position:relative;',
    '  box-shadow:inset 0 0 0 1px rgba(0,0,0,.5);',
    '}',

    /* ── screen views ── */
    '.rcd-view{position:absolute;inset:0;display:flex;flex-direction:column;transition:opacity .18s;}',
    '.rcd-view.rcd-off{opacity:0;pointer-events:none;}',

    /* ── status bar ── */
    '.rcd-status{',
    '  background:linear-gradient(180deg,#2b4878,#1a3260);',
    '  padding:3px 7px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;',
    '}',
    '.rcd-status-title{font-size:10px;font-weight:700;color:#fff;letter-spacing:.4px;text-transform:uppercase;}',

    /* ── battery ── */
    '.rcd-battery{width:18px;height:9px;border:1.5px solid #aaa;border-radius:2px;position:relative;}',
    '.rcd-battery::before{content:"";position:absolute;inset:1px;width:72%;background:linear-gradient(90deg,#58d058,#3ab03a);border-radius:1px;}',
    '.rcd-battery::after{content:"";position:absolute;right:-4px;top:50%;transform:translateY(-50%);width:2.5px;height:5px;background:#aaa;border-radius:0 1px 1px 0;}',

    /* ── menu ── */
    '.rcd-menu-view{background:linear-gradient(180deg,#141420,#0c0c18);}',
    '.rcd-menu-list{flex:1;overflow:hidden;}',
    '.rcd-item{',
    '  padding:3px 8px;font-size:10.5px;color:#ccc;',
    '  display:flex;align-items:center;gap:5px;',
    '  white-space:nowrap;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.04);',
    '  cursor:pointer;',
    '}',
    '.rcd-item.rcd-sel{background:linear-gradient(180deg,#1d63cc,#1448a2);color:#fff;}',
    '.rcd-item-icon{font-size:8.5px;opacity:.55;flex-shrink:0;}',
    '.rcd-item.rcd-sel .rcd-item-icon{opacity:1;}',
    '.rcd-item-label{flex:1;overflow:hidden;text-overflow:ellipsis;}',
    '.rcd-item-num{font-size:9px;opacity:.4;flex-shrink:0;}',

    /* ── now playing ── */
    '.rcd-np-view{background:#0c0c18;}',
    '.rcd-np-body{flex:1;display:flex;padding:5px 8px 3px;gap:8px;overflow:hidden;min-height:0;}',
    '.rcd-np-art{',
    '  width:60px;height:60px;border-radius:4px;flex-shrink:0;',
    '  position:relative;overflow:hidden;',
    '  box-shadow:0 2px 8px rgba(0,0,0,.55);',
    '}',
    '.rcd-np-art-note{',
    '  position:absolute;inset:0;display:flex;align-items:center;justify-content:center;',
    '  font-size:26px;opacity:.75;',
    '}',
    '.rcd-np-info{flex:1;display:flex;flex-direction:column;justify-content:center;min-width:0;gap:2px;}',
    '.rcd-np-title{font-size:10.5px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
    '.rcd-np-artist{font-size:9.5px;color:#777;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',

    /* ── speaker bars ── */
    '.rcd-bars{display:flex;align-items:flex-end;gap:1.5px;height:10px;margin-top:4px;}',
    '.rcd-bar{width:2.5px;background:#4a9af0;border-radius:1px;}',
    '.rcd-bars.rcd-playing .rcd-bar:nth-child(1){animation:rcdB1 .75s ease infinite;}',
    '.rcd-bars.rcd-playing .rcd-bar:nth-child(2){animation:rcdB2 .55s ease infinite;}',
    '.rcd-bars.rcd-playing .rcd-bar:nth-child(3){animation:rcdB3 .85s ease infinite;}',
    '@keyframes rcdB1{0%,100%{height:3px}50%{height:9px}}',
    '@keyframes rcdB2{0%,100%{height:8px}50%{height:3px}}',
    '@keyframes rcdB3{0%,100%{height:5px}50%{height:9px}}',

    /* ── progress ── */
    '.rcd-progress-area{padding:0 8px 5px;flex-shrink:0;}',
    '.rcd-progress-track{height:4px;background:rgba(255,255,255,.14);border-radius:2px;overflow:hidden;margin-bottom:3px;cursor:pointer;}',
    '.rcd-progress-fill{height:100%;border-radius:2px;transition:width .5s linear;}',
    '.rcd-times{display:flex;justify-content:space-between;font-size:8.5px;color:#555;}',

    /* ── click wheel ── */
    '.rcd-wheel-wrap{display:flex;justify-content:center;padding:14px 0 0;}',
    '.rcd-wheel{',
    '  width:172px;height:172px;border-radius:50%;',
    '  background:radial-gradient(circle at 36% 34%,#eaeaea 0%,#d4d4d4 38%,#bcbcbc 68%,#acacac 100%);',
    '  position:relative;cursor:pointer;',
    '  box-shadow:',
    '    0 0 0 1px rgba(0,0,0,.2),',
    '    0 7px 22px rgba(0,0,0,.38),',
    '    inset 0 1px 0 rgba(255,255,255,.65),',
    '    inset 0 -1px 0 rgba(0,0,0,.1);',
    '  touch-action:none;',
    '}',

    /* wheel button labels */
    '.rcd-wbtn{position:absolute;font-weight:700;color:#6a6a6a;pointer-events:none;transition:color .12s;}',
    '.rcd-w-menu{top:10px;left:50%;transform:translateX(-50%);font-size:7.5px;letter-spacing:1px;}',
    '.rcd-w-back{left:10px;top:50%;transform:translateY(-50%);font-size:16px;}',
    '.rcd-w-fwd {right:10px;top:50%;transform:translateY(-50%);font-size:16px;}',
    '.rcd-w-play{bottom:12px;left:50%;transform:translateX(-50%);font-size:15px;}',

    /* flash feedback */
    '.rcd-wheel.rcd-fl-menu .rcd-w-menu,',
    '.rcd-wheel.rcd-fl-back .rcd-w-back,',
    '.rcd-wheel.rcd-fl-fwd  .rcd-w-fwd,',
    '.rcd-wheel.rcd-fl-play .rcd-w-play{color:#222;}',

    /* center button */
    '.rcd-center{',
    '  position:absolute;width:68px;height:68px;border-radius:50%;',
    '  background:radial-gradient(circle at 36% 30%,#ddd 0%,#c2c2c2 48%,#b2b2b2 100%);',
    '  top:50%;left:50%;transform:translate(-50%,-50%);',
    '  box-shadow:0 0 0 1px rgba(0,0,0,.16),0 3px 8px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.52),inset 0 -1px 0 rgba(0,0,0,.1);',
    '  cursor:pointer;transition:background .1s,box-shadow .1s;',
    '}',
    '.rcd-center:active,.rcd-center.rcd-pressed{',
    '  background:radial-gradient(circle at 36% 30%,#ccc 0%,#b0b0b0 48%,#a0a0a0 100%);',
    '  box-shadow:0 0 0 1px rgba(0,0,0,.22),0 1px 4px rgba(0,0,0,.28),inset 0 1px 2px rgba(0,0,0,.2);',
    '}',

    /* ── bottom dock connector ── */
    '.rcd-connector-wrap{display:flex;justify-content:center;padding:10px 0 0;}',
    '.rcd-connector{width:40px;height:8px;background:linear-gradient(180deg,#b2b2b2,#929292);border-radius:3px;box-shadow:inset 0 1px 2px rgba(0,0,0,.28);}'
  ].join('\n');

  // ─────────────────────────────────────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────────────────────────────────────
  var VISIBLE = 9;   // menu rows visible at once
  var SCROLL_DEG = 18; // degrees rotation per scroll step

  var state = {
    open: false,
    view: 'menu',
    track: 0,
    sel: 0,
    scroll: 0,
    playing: false,
    progress: 0,
    duration: 0
  };

  var audio, els, toastTimer;
  var dragging = false, lastAngle = null, angleDelta = 0;

  // ─────────────────────────────────────────────────────────────────────────
  // BOOT
  // ─────────────────────────────────────────────────────────────────────────
  function boot() {
    injectCSS();
    buildDOM();
    bindEvents();
    initAudio();
    renderScreen();
  }

  function injectCSS() {
    var s = document.createElement('style');
    s.id = 'rcd-ipod-css';
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // DOM
  // ─────────────────────────────────────────────────────────────────────────
  function buildDOM() {
    var w = document.createElement('div');
    w.id = 'rcd-ipod-widget';
    w.innerHTML =
      '<div id="rcd-ipod-toast"></div>' +

      '<div id="rcd-ipod-device" class="rcd-hidden">' +
        '<div class="rcd-top-bar">' +
          '<div class="rcd-jack"></div>' +
          '<div class="rcd-hold-track"></div>' +
          '<button class="rcd-hide-btn" id="rcd-hide-btn">Hide</button>' +
        '</div>' +

        '<div class="rcd-screen-bezel"><div class="rcd-screen">' +

          /* ── menu view ── */
          '<div class="rcd-view rcd-menu-view" id="rcd-view-menu">' +
            '<div class="rcd-status">' +
              '<span class="rcd-status-title">Rapid City Digital</span>' +
              '<div class="rcd-battery"></div>' +
            '</div>' +
            '<div class="rcd-menu-list" id="rcd-menu-list"></div>' +
          '</div>' +

          /* ── now playing view ── */
          '<div class="rcd-view rcd-np-view rcd-off" id="rcd-view-np">' +
            '<div class="rcd-status">' +
              '<span class="rcd-status-title" id="rcd-np-count">1 of ' + TRACKS.length + '</span>' +
              '<div class="rcd-battery"></div>' +
            '</div>' +
            '<div class="rcd-np-body">' +
              '<div class="rcd-np-art" id="rcd-np-art"><div class="rcd-np-art-note">♫</div></div>' +
              '<div class="rcd-np-info">' +
                '<div class="rcd-np-title" id="rcd-np-title"></div>' +
                '<div class="rcd-np-artist" id="rcd-np-artist"></div>' +
                '<div class="rcd-bars" id="rcd-bars">' +
                  '<div class="rcd-bar" style="height:3px"></div>' +
                  '<div class="rcd-bar" style="height:7px"></div>' +
                  '<div class="rcd-bar" style="height:5px"></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="rcd-progress-area">' +
              '<div class="rcd-progress-track" id="rcd-prog-track">' +
                '<div class="rcd-progress-fill" id="rcd-prog-fill" style="width:0%"></div>' +
              '</div>' +
              '<div class="rcd-times"><span id="rcd-t-cur">0:00</span><span id="rcd-t-tot">0:00</span></div>' +
            '</div>' +
          '</div>' +

        '</div></div>' +

        '<div class="rcd-wheel-wrap">' +
          '<div class="rcd-wheel" id="rcd-wheel">' +
            '<span class="rcd-wbtn rcd-w-menu">MENU</span>' +
            '<span class="rcd-wbtn rcd-w-back">⏮</span>' +
            '<span class="rcd-wbtn rcd-w-fwd">⏭</span>' +
            '<span class="rcd-wbtn rcd-w-play">▶⏸</span>' +
            '<div class="rcd-center" id="rcd-center"></div>' +
          '</div>' +
        '</div>' +

        '<div class="rcd-connector-wrap"><div class="rcd-connector"></div></div>' +
      '</div>' +

      '<button id="rcd-ipod-toggle" title="Rapid City Digital Music Player">' +
        '<svg viewBox="0 0 24 24"><path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/></svg>' +
      '</button>';

    document.body.appendChild(w);

    els = {
      device:    w.querySelector('#rcd-ipod-device'),
      toggle:    w.querySelector('#rcd-ipod-toggle'),
      toast:     w.querySelector('#rcd-ipod-toast'),
      menuView:  w.querySelector('#rcd-view-menu'),
      menuList:  w.querySelector('#rcd-menu-list'),
      npView:    w.querySelector('#rcd-view-np'),
      npCount:   w.querySelector('#rcd-np-count'),
      npTitle:   w.querySelector('#rcd-np-title'),
      npArtist:  w.querySelector('#rcd-np-artist'),
      npArt:     w.querySelector('#rcd-np-art'),
      bars:      w.querySelector('#rcd-bars'),
      progTrack: w.querySelector('#rcd-prog-track'),
      progFill:  w.querySelector('#rcd-prog-fill'),
      tCur:      w.querySelector('#rcd-t-cur'),
      tTot:      w.querySelector('#rcd-t-tot'),
      wheel:     w.querySelector('#rcd-wheel'),
      center:    w.querySelector('#rcd-center'),
      hideBtn:   w.querySelector('#rcd-hide-btn')
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // AUDIO
  // ─────────────────────────────────────────────────────────────────────────
  function initAudio() {
    audio = new Audio();
    audio.volume = 0.8;
    audio.addEventListener('timeupdate', function () {
      state.progress = audio.currentTime;
      state.duration = audio.duration || 0;
      refreshProgress();
    });
    audio.addEventListener('loadedmetadata', function () {
      state.duration = audio.duration;
      refreshProgress();
    });
    audio.addEventListener('ended', function () { nextTrack(); });
    audio.addEventListener('error', function () { toast('Audio unavailable'); });
    loadTrack(0, false);
  }

  function loadTrack(idx, play) {
    state.track = idx;
    state.progress = 0;
    var t = TRACKS[idx];
    if (t.src) {
      audio.src = t.src;
      audio.load();
    } else {
      audio.src = '';
      state.duration = 0;
    }
    state.playing = false;
    if (play) startPlay();
    renderNP();
    refreshProgress();
    setBars(false);
  }

  function startPlay() {
    if (!TRACKS[state.track].src) {
      toast('Add Suno URL to this track');
      return;
    }
    audio.play().then(function () {
      state.playing = true;
      setBars(true);
      renderNP();
    }).catch(function () {
      toast('Tap play to start');
    });
  }

  function stopPlay() {
    audio.pause();
    state.playing = false;
    setBars(false);
    renderNP();
  }

  function togglePlay() {
    if (state.playing) stopPlay(); else startPlay();
  }

  function nextTrack() {
    var n = (state.track + 1) % TRACKS.length;
    loadTrack(n, state.playing);
    moveSel(n);
  }

  function prevTrack() {
    if (audio.currentTime > 3) { audio.currentTime = 0; return; }
    var p = (state.track - 1 + TRACKS.length) % TRACKS.length;
    loadTrack(p, state.playing);
    moveSel(p);
  }

  function moveSel(idx) {
    state.sel = idx;
    clampScroll();
    renderMenu();
  }

  function setBars(on) {
    if (on) els.bars.classList.add('rcd-playing');
    else els.bars.classList.remove('rcd-playing');
  }

  function refreshProgress() {
    var pct = state.duration > 0 ? (state.progress / state.duration) * 100 : 0;
    els.progFill.style.width = pct + '%';
    els.tCur.textContent = fmt(state.progress);
    els.tTot.textContent = fmt(state.duration);
  }

  function fmt(s) {
    if (!s || isNaN(s)) return '0:00';
    return Math.floor(s / 60) + ':' + ('0' + Math.floor(s % 60)).slice(-2);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  function renderScreen() { renderMenu(); renderNP(); showView(state.view); }

  function renderMenu() {
    var end = Math.min(state.scroll + VISIBLE, TRACKS.length);
    var html = '';
    for (var i = state.scroll; i < end; i++) {
      var t = TRACKS[i];
      var sel = i === state.sel ? ' rcd-sel' : '';
      var icon = (i === state.track && state.playing) ? '▶' : '♪';
      html += '<div class="rcd-item' + sel + '" data-i="' + i + '">' +
        '<span class="rcd-item-icon">' + icon + '</span>' +
        '<span class="rcd-item-label">' + esc(t.title) + '</span>' +
        '<span class="rcd-item-num">' + (i + 1) + '</span>' +
        '</div>';
    }
    els.menuList.innerHTML = html;
  }

  function renderNP() {
    var t = TRACKS[state.track];
    els.npTitle.textContent  = t.title;
    els.npArtist.textContent = t.artist;
    els.npCount.textContent  = (state.track + 1) + ' of ' + TRACKS.length;
    var h = t.hue || 210;
    els.npArt.style.background =
      'linear-gradient(135deg,hsl(' + h + ',68%,24%),hsl(' + (h + 40) + ',58%,14%))';
    els.progFill.style.background = 'hsl(' + h + ',70%,58%)';
  }

  function showView(v) {
    state.view = v;
    if (v === 'menu') {
      els.menuView.classList.remove('rcd-off');
      els.npView.classList.add('rcd-off');
    } else {
      els.npView.classList.remove('rcd-off');
      els.menuView.classList.add('rcd-off');
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // MENU NAVIGATION
  // ─────────────────────────────────────────────────────────────────────────
  function selUp() {
    if (state.sel > 0) { state.sel--; clampScroll(); renderMenu(); }
  }

  function selDown() {
    if (state.sel < TRACKS.length - 1) { state.sel++; clampScroll(); renderMenu(); }
  }

  function clampScroll() {
    if (state.sel < state.scroll) state.scroll = state.sel;
    if (state.sel >= state.scroll + VISIBLE) state.scroll = state.sel - VISIBLE + 1;
  }

  function selectItem() {
    loadTrack(state.sel, true);
    showView('nowplaying');
    renderNP();
  }

  // ─────────────────────────────────────────────────────────────────────────
  // CLICK WHEEL
  // ─────────────────────────────────────────────────────────────────────────
  function wheelAngle(e) {
    var r = els.wheel.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var pt = e.touches ? e.touches[0] : e;
    return Math.atan2(pt.clientY - cy, pt.clientX - cx) * 180 / Math.PI;
  }

  function wheelZone(e) {
    var r = els.wheel.getBoundingClientRect();
    var cr = els.center.getBoundingClientRect();
    var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    var pt = e.touches ? e.touches[0] : e;
    var dx = pt.clientX - cx, dy = pt.clientY - cy;
    var dist = Math.sqrt(dx * dx + dy * dy);
    var cRad = cr.width / 2;
    var wRad = r.width / 2;

    if (dist < cRad) return 'center';
    if (dist > wRad * 0.9) return null;

    var a = Math.atan2(dy, dx) * 180 / Math.PI; // -180..180
    if (a >= -135 && a < -45)  return 'menu';
    if (a >= -45  && a <  45)  return 'fwd';
    if (a >=  45  && a < 135)  return 'play';
    return 'back';
  }

  function onWheelDown(e) {
    if (wheelZone(e) === 'center') return;
    dragging   = true;
    lastAngle  = wheelAngle(e);
    angleDelta = 0;
    e.preventDefault();
  }

  function onWheelMove(e) {
    if (!dragging) return;
    var a = wheelAngle(e);
    var d = a - lastAngle;
    if (d >  180) d -= 360;
    if (d < -180) d += 360;
    angleDelta += d;
    lastAngle   = a;

    while (angleDelta >= SCROLL_DEG) {
      angleDelta -= SCROLL_DEG;
      if (state.view === 'menu') selDown();
    }
    while (angleDelta <= -SCROLL_DEG) {
      angleDelta += SCROLL_DEG;
      if (state.view === 'menu') selUp();
    }
    e.preventDefault();
  }

  function onWheelUp(e) {
    if (!dragging) return;
    dragging = false;
    if (Math.abs(angleDelta) < 6) doWheelClick(e);
    lastAngle  = null;
    angleDelta = 0;
  }

  function doWheelClick(e) {
    var z = wheelZone(e);
    switch (z) {
      case 'menu':
        flash('menu');
        if (state.view === 'nowplaying') { showView('menu'); renderMenu(); }
        break;
      case 'back':
        flash('back');
        prevTrack();
        if (state.view === 'nowplaying') renderNP();
        break;
      case 'fwd':
        flash('fwd');
        nextTrack();
        if (state.view === 'nowplaying') renderNP();
        break;
      case 'play':
        flash('play');
        togglePlay();
        if (state.view === 'nowplaying') renderNP();
        break;
      case 'center':
        onCenter();
        break;
    }
  }

  function onCenter() {
    els.center.classList.add('rcd-pressed');
    setTimeout(function () { els.center.classList.remove('rcd-pressed'); }, 140);
    if (state.view === 'menu') selectItem();
    else { togglePlay(); renderNP(); }
  }

  function flash(zone) {
    var cls = 'rcd-fl-' + zone;
    els.wheel.classList.add(cls);
    setTimeout(function () { els.wheel.classList.remove(cls); }, 180);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // SHOW / HIDE
  // ─────────────────────────────────────────────────────────────────────────
  function toggleDevice() {
    state.open = !state.open;
    if (state.open) {
      els.device.classList.remove('rcd-hidden');
      els.device.classList.add('rcd-visible');
    } else {
      els.device.classList.remove('rcd-visible');
      els.device.classList.add('rcd-hidden');
      // toggle button bounces to show where the iPod shrank into
      els.toggle.classList.remove('rcd-catch');
      void els.toggle.offsetWidth; // force reflow so re-adding class retriggers animation
      els.toggle.classList.add('rcd-catch');
      els.toggle.addEventListener('animationend', function h() {
        els.toggle.classList.remove('rcd-catch');
        els.toggle.removeEventListener('animationend', h);
      });
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TOAST
  // ─────────────────────────────────────────────────────────────────────────
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.classList.add('rcd-show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { els.toast.classList.remove('rcd-show'); }, 2600);
  }

  // ─────────────────────────────────────────────────────────────────────────
  // EVENTS
  // ─────────────────────────────────────────────────────────────────────────
  function bindEvents() {
    els.toggle.addEventListener('click', toggleDevice);
    els.hideBtn.addEventListener('click', toggleDevice);

    els.wheel.addEventListener('mousedown',  onWheelDown);
    els.wheel.addEventListener('touchstart', onWheelDown, { passive: false });
    document.addEventListener('mousemove',   onWheelMove);
    document.addEventListener('touchmove',   onWheelMove, { passive: false });
    document.addEventListener('mouseup',     onWheelUp);
    document.addEventListener('touchend',    onWheelUp);

    els.center.addEventListener('click', function (e) {
      e.stopPropagation();
      onCenter();
    });

    els.progTrack.addEventListener('click', function (e) {
      if (!state.duration) return;
      var r = els.progTrack.getBoundingClientRect();
      audio.currentTime = ((e.clientX - r.left) / r.width) * state.duration;
    });

    els.menuList.addEventListener('click', function (e) {
      var item = e.target.closest('.rcd-item');
      if (!item) return;
      state.sel = +item.dataset.i;
      selectItem();
    });

    /* keyboard shortcuts when widget is open */
    document.addEventListener('keydown', function (e) {
      if (!state.open) return;
      switch (e.key) {
        case 'ArrowUp':    selUp();    renderMenu(); break;
        case 'ArrowDown':  selDown();  renderMenu(); break;
        case 'Enter':
          if (state.view === 'menu') selectItem();
          else { togglePlay(); renderNP(); }
          break;
        case 'Escape':
          if (state.view === 'nowplaying') { showView('menu'); renderMenu(); }
          else toggleDevice();
          break;
        case ' ':
          if (state.view === 'nowplaying') { e.preventDefault(); togglePlay(); renderNP(); }
          break;
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // UTIL
  // ─────────────────────────────────────────────────────────────────────────
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ─────────────────────────────────────────────────────────────────────────
  // START
  // ─────────────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

}());
