/* 薯约 Demo · app.js
   小红书风格 SPA：hash 路由 + 事件委托 + localStorage 持久化
   全部数据为虚构演示，无真实交易。 */
'use strict';

/* ---------- 基础工具 ---------- */
const $ = (s, r) => (r || document).querySelector(s);
const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
const esc = v => String(v == null ? '' : v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = n => {
  n = Number(n) || 0;
  if (n >= 10000) return (n / 10000).toFixed(1).replace(/\.0$/, '') + 'w';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  return String(n);
};
const hueAva = (t, hue) => `<span class="ava" style="background:hsl(${hue},62%,80%);color:hsl(${hue},45%,32%)">${esc(t)}</span>`;
const sleep = ms => new Promise(r => setTimeout(r, ms));

function toast(txt) {
  const root = $('#toast-root');
  if (!root) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = txt;
  root.appendChild(t);
  setTimeout(() => { t.classList.add('bye'); }, 1800);
  setTimeout(() => { t.remove(); }, 2300);
}

function openModal(html, cls) {
  $('#modal-root').innerHTML =
    `<div class="modal-back" data-act="modalBackdrop"><div class="modal-card ${cls || ''}">${html}</div></div>`;
  document.body.classList.add('modal-open');
}
function closeModal() {
  $('#modal-root').innerHTML = '';
  document.body.classList.remove('modal-open');
}

/* ---------- 常量 ---------- */
const STEPS = ['已购买', '待商家确认', '预约已确认', '已到店', '已核销'];
const STATUS_META = {
  awaiting:  { label: '待商家确认', step: 1, tone: 'warn', desc: '商家确认后会同步到这里（模拟）' },
  confirmed: { label: '预约已确认', step: 2, tone: 'ok',   desc: '到店当天记得提前一点出发' },
  arrived:   { label: '已到店',     step: 3, tone: 'info', desc: '向店员出示核销码即可完成体验' },
  redeemed:  { label: '已核销',     step: 4, tone: 'done', desc: '体验完成，欢迎留下评价与反馈' },
  cancelled: { label: '已取消',     step: -1, tone: 'dim',  desc: '已取消 · 模拟全额退款（虚构）' },
};
const CATS = [
  { k: 'all', label: '全部' }, { k: 'food', label: '美食' }, { k: 'craft', label: '手作' },
  { k: 'sport', label: '运动' }, { k: 'cafe', label: '探店' }, { k: 'outdoor', label: '户外' },
];
const CAT_LABEL = { food: '美食', craft: '手作', sport: '运动', cafe: '探店', outdoor: '户外' };
const ACT_IC = { food: '🍽', craft: '🏺', sport: '🏸', cafe: '☕', outdoor: '🥾' };
/* ---------- 同好活动（act）工具：状态机与规范化 ---------- */
const ACT_META = {
  open: { label: '报名中', tone: 'ok' },
  full: { label: '已满员', tone: 'warn' },
  closed: { label: '已截止', tone: 'dim' },
};
function actDlStr(off) {
  const d = new Date(Date.now() + off * DAY_MS);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function actDlLabel(dl) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(dl || ''));
  if (!m) return String(dl || '待定');
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return (m[1] === String(new Date().getFullYear()) ? '' : m[1] + '年') + (+m[2]) + '月' + (+m[3]) + '日 周' + WEEK[d.getDay()];
}
function actDlTs(a) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(a.dl || ''));
  if (!m) return Date.now() + 3 * DAY_MS;
  return new Date(+m[1], +m[2] - 1, +m[3], 23, 59, 59).getTime();
}
/* 状态：full（人数满） > closed（报名截止） > open */
function actState(a) {
  if (a.members.length >= a.cap) return 'full';
  return Date.now() > actDlTs(a) ? 'closed' : 'open';
}
function actById(id) { return S.acts.find(a => a.id === id); }
function actsOf(noteId) { return S.acts.filter(a => a.noteId === noteId); }
function actJoined(a) { return a.members.some(m => m.self); }
/* 活动数据清洗：字段补齐 + 上限 clamp + self 唯一化；来源笔记不存在则丢弃 */
function actNorm(a) {
  if (!a || typeof a !== 'object') return null;
  const noteId = String(a.noteId || '');
  if (!noteId || !DATA.notes.some(n => n.id === noteId)) return null;
  let selfSeen = false;
  const members = (Array.isArray(a.members) ? a.members : [])
    .filter(m => m && typeof m === 'object' && typeof m.nick === 'string' && m.nick.trim())
    .map(m => {
      if (m.self && !selfSeen) { selfSeen = true; return { nick: m.nick.slice(0, 12), hue: +m.hue || 6, self: true }; }
      return { nick: m.nick.slice(0, 12), hue: +m.hue || 6, self: false };
    });
  const host = (a.host && typeof a.host === 'object' && typeof a.host.nick === 'string' && a.host.nick.trim())
    ? { nick: a.host.nick.slice(0, 12), hue: +a.host.hue || 6 }
    : { nick: '薯友', hue: 6 };
  return {
    id: String(a.id || ''), noteId,
    prodId: a.prodId ? String(a.prodId) : null,
    theme: String(a.theme || '一起去的体验').slice(0, 40),
    time: String(a.time || '时间待定').slice(0, 40),
    cap: Math.min(20, Math.max(2, +a.cap || 6)),
    cost: String(a.cost || '费用口径见活动说明（演示）').slice(0, 80),
    dl: /^\d{4}-\d{2}-\d{2}$/.test(String(a.dl || '')) ? String(a.dl) : actDlStr(3),
    rules: String(a.rules || '发起人补充中').slice(0, 200),
    host, members, mine: !!a.mine, t: +a.t || Date.now(),
    /* 组合链路：找搭子活动可关联一个拼团（双向链：groupon.actId ↔ act.groupId），可为空 */
    groupId: a.groupId && String(a.groupId) || null,
  };
}
const SORTS = [
  { k: 'rec', label: '推荐' }, { k: 'new', label: '最新' }, { k: 'hot', label: '最热' },
];
const FB_TAGS = ['环境出片', '套餐兑现度高', '服务贴心', '仪式感在线', '想再来'];
const DAY_MS = 86400000;
const WEEK = '日一二三四五六';

/* ---------- 状态 ---------- */
const LS = {
  orders: 'shuyu_orders_v1', events: 'shuyu_events_v1',
  social: 'shuyu_social_v1', follow: 'shuyu_follow_v1', acts: 'shuyu_acts_v1',
  groupons: 'shuyu_groupons_v1',
};
function lsGet(k, def) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch (e) { return def; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* 忽略 */ } }

const S = {
  route: { key: 'home', id: null },
  home: { ch: 'discover', sort: 'rec', cat: 'all' },
  search: { q: '', input: '', tab: 'all', submitted: false, hist: [], from: 'home', focusPending: false },
  co: null,        /* 下单草稿 {pid, di, slot, perk} */
  rs: null,        /* 改约草稿 {oid, di, slot} */
  rate: 0, fbTags: [], fbText: '',
  orders: [], events: [],
  social: { likes: [], favs: [] },
  follow: false,
  acts: [],       /* 同好活动（报名记录，与商品订单分开存储互不替代） */
  groupons: [],   /* 同好拼团（成团后解锁拼团价；未成团按原价，与找搭子分开） */
  scroll: {},
};
function persist() {
  lsSet(LS.orders, S.orders);
  lsSet(LS.events, S.events.slice(-60));
  lsSet(LS.social, S.social);
  lsSet(LS.follow, S.follow);
  lsSet(LS.acts, S.acts);
  lsSet(LS.groupons, S.groupons);
}
/* 兼容旧版本写入的订单数据：补齐缺失字段，避免渲染时崩溃（如 o.items.map） */
function normOrder(o) {
  if (!o || typeof o !== 'object' || !o.id) return null;
  o.id = String(o.id);
  const p = prodById(o.pid);
  if (!Array.isArray(o.items)) o.items = (p ? p.items : []).map(i => ({ emoji: i.emoji, name: i.name, qty: i.qty }));
  o.resched = +o.resched || 0;
  o.price = +o.price || (p ? p.price : 0);
  o.rated = !!o.rated;
  o.perkRequested = !!o.perkRequested;
  if (!['none', 'requested', 'locked', 'granted'].includes(o.perkState)) o.perkState = o.perkRequested ? 'requested' : 'none';
  o.perkName = o.perkName || '';
  if (!STATUS_META[o.status]) o.status = 'awaiting';
  o.dateLabel = o.dateLabel || '时间待定';
  o.slot = o.slot || '';
  o.dateTs = +o.dateTs || Date.now();
  o.createdAt = +o.createdAt || Date.now();
  o.fb = o.fb || null;
  o.name = o.name || (p ? p.name : '套餐订单');
  o.gid = o.gid ? String(o.gid) : '';
  o.gLabel = o.gLabel || '';
  o.coverKey = COVER[o.coverKey] ? o.coverKey : (p && COVER[p.coverKey] ? p.coverKey : 'pasta');
  o.img = o.img || (p && p.img) || '';   /* 实景图快照：无则回退插画（兼容历史订单） */
  o.typeLabel = o.typeLabel || (p ? p.typeLabel : '体验套餐');
  o.origRef = o.origRef || (p ? p.origRef : '');
  o.people = o.people || (p ? p.people : '2 人');
  return o;
}
function restore() {
  const rawOrders = lsGet(LS.orders, []);
  S.orders = (Array.isArray(rawOrders) ? rawOrders : []).map(normOrder).filter(Boolean);
  /* 旧版本可能写入非数组/异构结构，全部防御性清洗 */
  const rawEvents = lsGet(LS.events, []);
  S.events = (Array.isArray(rawEvents) ? rawEvents : [])
    .filter(e => e && typeof e === 'object' && e.txt)
    .map(e => ({ t: +e.t || Date.now(), txt: String(e.txt), oid: e.oid ? String(e.oid) : null }));
  const rawSocial = lsGet(LS.social, {});
  S.social = (rawSocial && typeof rawSocial === 'object' && !Array.isArray(rawSocial)) ? {
    likes: Array.isArray(rawSocial.likes) ? rawSocial.likes.filter(x => typeof x === 'string') : [],
    favs: Array.isArray(rawSocial.favs) ? rawSocial.favs.filter(x => typeof x === 'string') : [],
  } : { likes: [], favs: [] };
  S.follow = !!lsGet(LS.follow, false);
  /* 同好活动：种子以 data.js 为准重建（升级即生效），保留本机报名状态；用户自建从本机恢复 */
  const rawActs = lsGet(LS.acts, []);
  const storedActs = Array.isArray(rawActs) ? rawActs : [];
  const seenAct = {};
  S.acts = [];
  DATA.acts.forEach(seed => {
    const a = actNorm(JSON.parse(JSON.stringify(seed)));
    if (!a) return;
    const local = storedActs.find(x => x && typeof x === 'object' && x.id === seed.id);
    if (local && Array.isArray(local.members) && local.members.some(m => m && m.self)) {
      a.members.push({ nick: '我', hue: 6, self: true });
    }
    seenAct[a.id] = 1;
    S.acts.push(a);
  });
  storedActs.forEach(x => {
    if (!x || typeof x !== 'object' || !x.id || seenAct[x.id]) return;
    const a = actNorm(x);
    if (a) { seenAct[a.id] = 1; S.acts.push(a); }
  });
  /* 同好拼团：种子以 data.js 为准重建，保留本机参团状态；用户自建从本机恢复 */
  const rawGs = lsGet(LS.groupons, []);
  const storedGs = Array.isArray(rawGs) ? rawGs : [];
  const seenG = {};
  S.groupons = [];
  (DATA.groupons || []).forEach(seed => {
    const g = grouponNorm(JSON.parse(JSON.stringify(seed)));
    if (!g) return;
    const local = storedGs.find(x => x && typeof x === 'object' && x.id === seed.id);
    if (local && Array.isArray(local.members) && local.members.some(m => m && m.self)) {
      if (g.members.length < (prodById(g.prodId) || {}).groupon.size) g.members.push({ nick: '我', hue: 6, self: true });
    }
    seenG[g.id] = 1;
    S.groupons.push(g);
  });
  storedGs.forEach(x => {
    if (!x || typeof x !== 'object' || !x.id || seenG[x.id]) return;
    const g = grouponNorm(x);
    if (g) { seenG[x.id] = 1; S.groupons.push(g); }
  });
  /* 组合链路：acts 与 groupons 加载完毕后清洗双向关联 */
  linkSanitize();
}

/* ---------- 数据工具 ---------- */
const noteById = id => DATA.notes.find(n => n.id === id);
const prodById = id => DATA.products.find(p => p.id === id);
const orderBy = id => S.orders.find(o => o.id === id);

/* 附近距离：按 id 稳定生成的伪随机（虚构演示） */
function distOf(id) {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 997;
  return (0.4 + (h % 28) / 10).toFixed(1);
}

function dayLabel(ts) {
  const d = new Date(ts);
  return `${d.getMonth() + 1}月${d.getDate()}日 · 周${WEEK[d.getDay()]}`;
}
/* 未来 n 个可选日期（跳过周一公休） */
function nextDays(n) {
  const out = [];
  let t = new Date().setHours(0, 0, 0, 0);
  while (out.length < n) {
    const d = new Date(t);
    if (d.getDay() !== 1) out.push({ ts: t, label: dayLabel(t), short: `${d.getMonth() + 1}/${d.getDate()}`, week: `周${WEEK[d.getDay()]}` });
    t += DAY_MS;
  }
  return out;
}
const ALL_DAYS = nextDays(21);

/* 权益时段校验：slot 是否落在 perk.window 内 */
function perkSlotOk(perk, slot) {
  if (!perk || !slot) return true;
  const m = (perk.window || '').match(/(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/);
  if (!m) return true;
  return m[1] <= slot && slot <= m[2];
}

function nowTime() {
  const d = new Date();
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}
function logEv(kind, txt, oid) {
  S.events.push({ at: Date.now(), time: nowTime(), kind, txt, oid: oid || null });
  persist();
}

function createOrder(prod, day, slot, perkRequested, gr) {
  const gOk = !!(gr && gr.id && prod.groupon && gr.prodId === prod.id);
  const o = {
    id: 'o' + Date.now().toString(36) + Math.floor(Math.random() * 90 + 10),
    pid: prod.id,
    name: prod.name, typeLabel: prod.typeLabel, price: gOk ? prod.groupon.price : prod.price, origRef: prod.origRef,
    gid: gOk ? String(gr.id) : '',
    gLabel: gOk ? `同好拼团「${gr.note || prod.name}」` : '',
    people: prod.people, coverKey: prod.coverKey, img: prod.img || '',   /* 实景图快照 */
    items: prod.items.map(i => ({ emoji: i.emoji, name: i.name, qty: i.qty })),
    dateTs: day.ts, dateLabel: day.label, slot,
    perkRequested: !!perkRequested,
    perkName: perkRequested && prod.perks[0] ? prod.perks[0].name : '',
    perkState: perkRequested ? 'requested' : 'none',  /* requested -> locked -> granted */
    status: 'awaiting', resched: 0,
    createdAt: Date.now(), rated: false, fb: null,
  };
  S.orders.unshift(o);
  logEv('order', `已下单「${o.name}」· ${o.dateLabel} ${o.slot}（模拟支付 ¥${o.price}）`, o.id);
  if (gOk) {
    const gp = prod.groupon;
    logEv('groupon', `拼团成团价下单：${gp.size} 人团「${gr.note || prod.name}」· 参团 ${gp.size} 人 ≠ 已付款，本单 ¥${gp.price}（拼团价演示）`, o.id);
  }
  if (perkRequested) logEv('order', `已申请权益「${o.perkName}」，等待商家确认（模拟权益）`, o.id);
  persist();
  return o;
}
function orderEvts(oid) { return S.events.filter(e => e.oid === oid); }
function orderPerkLabel(o) {
  if (o.perkState === 'none') return '';
  if (o.perkState === 'granted') return '已兑现';
  if (o.perkState === 'locked') return '已确认保留';
  return '待商家确认';
}
function redeemCode(oid) {
  let h = 0;
  for (const c of oid) h = (h * 37 + c.charCodeAt(0)) % 999983;
  return 'SY-' + String(100000 + (h % 900000));
}

/* ---------- 同好拼团 ---------- */
const GR_META = {
  open: { label: '拼团中', tone: 'ok' },
  full: { label: '已成团', tone: 'warn' },
  fail: { label: '未成团', tone: 'dim' },
};
/* 拼团数据清洗：商品必须有拼团配置；成员去重截断；gid 挂钩订单计数 */
function grouponNorm(g) {
  if (!g || typeof g !== 'object' || !g.id || !g.prodId) return null;
  const p = prodById(g.prodId);
  if (!p || !p.groupon) return null;
  const size = p.groupon.size;
  g.id = String(g.id);
  g.note = String(g.note || '').slice(0, 40);
  /* 体验主题（演示配置，存主题名）：老数据无此字段 → 空串，不影响展示 */
  g.topic = g.topic == null ? '' : String(g.topic).slice(0, 20);
  g.fromNoteId = g.fromNoteId && noteById(g.fromNoteId) ? String(g.fromNoteId) : null;
  g.dlTs = +g.dlTs || Date.now();
  g.fullAt = +g.fullAt || 0;
  g.paidDemo = Math.max(0, Math.min(size, +g.paidDemo || 0));
  if (!Array.isArray(g.members)) g.members = [];
  let hasSelf = false;
  g.members = g.members.filter(m => m && typeof m === 'object' && m.nick)
    .map(m => ({ nick: String(m.nick).slice(0, 12), hue: +m.hue || 6, self: !!m.self }))
    .filter(m => { if (m.self) { if (hasSelf) return false; hasSelf = true; } return true; })
    .slice(0, size);
  g.host = (g.host && typeof g.host === 'object' && g.host.nick)
    ? { nick: String(g.host.nick).slice(0, 12), hue: +g.host.hue || 6 } : null;
  if (!g.host) g.host = g.members[0] ? { nick: g.members[0].nick, hue: g.members[0].hue } : { nick: '演示用户', hue: 6 };
  g.mine = !!g.mine;
  g.t = +g.t || Date.now();
  /* 组合链路：拼团可关联一个找搭子活动（双向链：g.actId ↔ act.groupId），可为空 */
  g.actId = g.actId && String(g.actId) || null;
  return g;
}
/* 双向关联清洗：g.actId 与 act.groupId 必须互相指认才有效（防止单边残留死链） */
function linkSanitize() {
  S.acts.forEach(a => {
    if (a.groupId && !S.groupons.some(g => g.id === a.groupId && g.actId === a.id)) a.groupId = null;
  });
  S.groupons.forEach(g => {
    if (g.actId && !S.acts.some(a => a.id === g.actId && a.groupId === g.id)) g.actId = null;
  });
}
const grouponById = id => S.groupons.find(g => g.id === id);
/* 组合链路：商品的「组局源笔记」— 先看 sourceNoteId（需 actOK，如 p4→n8），
   再反查挂接该商品的 actOK 笔记（如 p13→n20，经 productId 反查，不占用 sourceNoteId 的同款语义） */
function actSrcNoteOf(p) {
  if (!p) return null;
  const direct = p.sourceNoteId ? noteById(p.sourceNoteId) : null;
  if (direct && direct.actOK) return direct;
  return DATA.notes.find(n => n.productId === p.id && n.actOK) || null;
}
const grouponsOf = pid => S.groupons.filter(g => g.prodId === pid);
const grouponJoined = g => !!(g && g.members.some(m => m.self));
/* 拼团体验主题：来自商品 groupon.topics（演示配置）；只显示本商品自己的主题，不跨品类混用 */
const grouponTopicsOf = p => (p && p.groupon && Array.isArray(p.groupon.topics))
  ? p.groupon.topics.filter(t => t && t.name).map(t => ({ name: String(t.name).slice(0, 20), desc: String(t.desc || '').slice(0, 40) }))
  : [];
const grouponTopicDesc = (p, name) => {
  const t = grouponTopicsOf(p).find(x => x.name === name);
  return t ? t.desc : '';
};
/* 状态：满员 = full；超时未满 = fail；其余 open */
function grouponState(g) {
  const p = prodById(g.prodId);
  const size = p && p.groupon ? p.groupon.size : 2;
  if (g.members.length >= size) return 'full';
  return Date.now() > g.dlTs ? 'fail' : 'open';
}
/* 已按拼团价下单人数：真实订单（非取消） + 种子演示口径 paidDemo（仅成员范围） */
function grouponPaid(g) {
  const p = prodById(g.prodId);
  const size = p && p.groupon ? p.groupon.size : 2;
  const real = S.orders.filter(o => o.gid === g.id && o.status !== 'cancelled').length;
  return Math.min(size, real + (g.paidDemo || 0));
}
function grouponDlLabel(g) {
  const d = new Date(g.dlTs);
  const st = grouponState(g);
  const base = `${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  if (st === 'open') {
    const h = Math.max(1, Math.round((g.dlTs - Date.now()) / 3600000));
    return `${base} 截止（剩约 ${h} 小时）`;
  }
  return `${base} 截止`;
}

/* ---------- 搜索 ---------- */
const HOT = () => (DATA.hotSearch || ['生日约会', '松露意面', '适合拍照的咖啡馆', '博主同款套餐', '周末Brunch', '手冲咖啡']);

function noteText(n) {
  return [n.title, (n.paras || []).join(' '), (n.dishes || []).map(d => d.name + d.note).join(' '),
    (n.topics || []).join(' '), (n.scenes || []).join(' '), n.author.name, n.author.desc || '',
    n.productId ? (prodById(n.productId) || {}).name || '' : ''].join(' ');
}
function prodText(p) {
  const src = p.sourceNoteId ? noteById(p.sourceNoteId) : null;
  return [p.name, p.typeLabel, p.tagline, p.items.map(i => i.name + i.desc).join(' '),
    (p.scenes || []).join(' '), (p.reasons || []).join(' '),
    (p.perks || []).map(k => k.name + k.desc).join(' '), src ? src.title : ''].join(' ');
}
/* 查询分词：空格切分 + 滑动二元组（中文友好） */
function tokens(q) {
  const out = [];
  String(q || '').trim().toLowerCase().split(/\s+/).filter(Boolean).forEach(t => {
    out.push(t);
    if (t.length >= 2) for (let i = 0; i < t.length - 1; i++) out.push(t.slice(i, i + 2));
  });
  return Array.from(new Set(out));
}
function scoreOf(text, toks, boost) {
  let s = 0;
  for (const t of toks) { if (text.toLowerCase().includes(t)) s += boost; }
  return s;
}
function searchNotes(q) {
  const toks = tokens(q);
  if (!toks.length) return [];
  return DATA.notes.map(n => {
    const s = scoreOf(n.title, toks, 5) + scoreOf((n.topics || []).join(' ') + (n.scenes || []).join(' '), toks, 2)
      + scoreOf(noteText(n), toks, 1);
    return { n, s };
  }).filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s || b.n.stats.like - a.n.stats.like)
    .map(x => x.n);
}
function searchProds(q) {
  const toks = tokens(q);
  if (!toks.length) return [];
  return DATA.products.map(p => ({ p, s: scoreOf(p.name, toks, 5) + scoreOf(prodText(p), toks, 1) }))
    .filter(x => x.s > 0).sort((a, b) => b.s - a.s).map(x => x.p);
}
function suggestFor(input) {
  const q = String(input || '').trim().toLowerCase();
  if (!q) return [];
  const pool = (DATA.searchSuggest || []).concat(DATA.notes.map(n => n.title), DATA.products.map(p => p.name));
  const seen = new Set();
  const out = [];
  for (const t of pool) {
    const low = String(t).toLowerCase();
    if (low.includes(q) && !seen.has(t)) { seen.add(t); out.push(t); }
    if (out.length >= 8) break;
  }
  return out;
}
function runSearch(q) {
  q = String(q || '').trim();
  if (!q) { toast('想搜点什么？先输入关键词'); return; }
  S.search.input = q;
  S.search.q = q;
  S.search.submitted = true;
  S.search.hist = [q].concat(S.search.hist.filter(h => h !== q)).slice(0, 12);
  render();
  const inp = $('#search-input');
  if (inp && document.activeElement === inp) inp.blur();
}

/* ---------- 路由 ---------- */
const SUB_PAGES = new Set(['note', 'product', 'checkout', 'order', 'voucher', 'search', 'aimatch', 'act', 'groupon']);
function parseHash() {
  const path = (location.hash || '#/').replace(/^#\/?/, '');
  const parts = path.split('/').filter(Boolean);
  let key = parts[0] || 'home';
  if (key === 'orders' || key === 'cards' || key === 'voucher') key = 'voucher';
  if (key === 'ai') key = 'home';
  return { key, id: parts[1] || null };
}
function tabOf(r) {
  if (r.key === 'order' || r.key === 'voucher') return 'me';
  if (r.key === 'discover' || r.key === 'msg' || r.key === 'me') return r.key;
  if (r.key === 'search') return S.search.from === 'discover' ? 'discover' : 'home';
  return 'home';
}
const NAV_STACK = [];
function go(hash) {
  if (location.hash === hash) { render(); return; }
  NAV_STACK.push(location.hash || '#/');
  if (NAV_STACK.length > 30) NAV_STACK.shift();
  location.hash = hash;
  /* 双保险：hashchange 监听器也会再渲染一次（幂等），即使个别环境不触发 hashchange 也能立即切页 */
  S.route = parseHash(); onPageEnter(); render();
}
function goBack() {
  const prev = NAV_STACK.pop() || '#/';
  if (location.hash === prev) { render(); return; }
  location.hash = prev;
}
let lastRouteKey = null;
function onPageEnter() {
  if (lastRouteKey) S.scroll[lastRouteKey] = window.scrollY || 0;
  const r = S.route;
  if (r.key === 'checkout') {
    const p = prodById(r.id);
    if (!p) { location.hash = '#/'; return; }
    if (!S.co || S.co.pid !== p.id) S.co = { pid: p.id, di: 0, slot: null, perk: false };
  }
  if (r.key === 'search' && lastRouteKey === null) S.search.from = 'home';
  lastRouteKey = r.key;
}

/* ---------- 组件 ---------- */
/* 场景封面：数据带 img（实景演示照片）时优先用照片，否则回退内联插画 COVER */
function phCover(o, key) {
  const im = o && o.img;
  if (im) {
    const alt = esc((o && (o.title || o.name)) || '体验场景照片（演示素材）');
    return `<img class="ph" src="${im}" alt="${alt}" loading="lazy">`;
  }
  return COVER[(o && (key || o.coverKey)) || key] || COVER.pasta;
}
function noteCard(n, opts) {
  opts = opts || {};
  const liked = S.social.likes.includes(n.id);
  const dist = opts.dist ? `<span class="cover-dist">📍${opts.dist} km</span>` : '';
  const book = n.productId ? `<a class="nc-book" href="#/product/${n.productId}">可约同款</a>` : '';
  return `<div class="note-card">
    <a class="nc-main" href="#/note/${n.id}">
      <div class="nc-cover" style="aspect-ratio:${n.ratio}">${phCover(n)}${dist}</div>
      <div class="nc-title">${esc(n.title)}</div>
    </a>
    <div class="nc-foot">${hueAva(n.author.avatar, n.author.hue)}<span class="nc-name">${esc(n.author.name)}</span>${book}<span class="nc-like${liked ? ' on' : ''}">🤍 ${fmt(n.stats.like + (liked ? 1 : 0))}</span></div>
  </div>`;
}
function noteList(notes, opts) {
  if (!notes.length) return '<div class="feed-empty">这个分类暂时没有内容，换个筛选试试</div>';
  return `<div class="note-list">${notes.map(n => noteCard(n, opts)).join('')}</div>`;
}
function prodRow(p) {
  const itemsBrief = p.items.slice(0, 3).map(i => i.name).join(' · ') + (p.items.length > 3 ? ' 等' : '');
  return `<div class="prod-row">
    <div class="pr-cover">${phCover(p)}</div>
    <div class="pr-body">
      <div class="pr-name">${esc(p.name)}<span class="pr-type">${esc(p.typeLabel)}</span></div>
      <div class="pr-items">${esc(itemsBrief)}</div>
      <div class="pr-foot"><span class="pr-price">¥${p.price}<s>¥${p.origRef}</s><i>${esc(p.people)}</i></span>
        <a class="pr-btn" href="#/product/${p.id}">查看体验</a></div>
    </div>
  </div>`;
}
function feedNotes() {
  const h = S.home;
  let list = DATA.notes.slice();
  if (h.ch === 'follow') {
    if (!S.follow) return null;
    list = list.filter(n => n.productId);
  } else {
    if (h.cat !== 'all') list = list.filter(n => n.cat === h.cat);
  }
  if (h.ch === 'nearby' && h.sort === 'rec') {
    list.sort((a, b) => parseFloat(distOf(a.id)) - parseFloat(distOf(b.id)));
  } else if (h.sort === 'new') {
    list.reverse();
  } else if (h.sort === 'hot') {
    list.sort((a, b) => b.stats.like - a.stats.like);
  }
  return list;
}

/* ---------- 页面：首页 ---------- */
function homeHtml() {
  const h = S.home;
  const notes = feedNotes();
  const chs = [
    { k: 'follow', t: '关注' }, { k: 'discover', t: '发现' }, { k: 'nearby', t: '附近' },
  ];
  let body = '';
  if (notes === null) {
    body = `<div class="follow-empty">
      <div class="fe-emoji">🪴</div>
      <p>关注的博主和商家会出现在这里</p>
      <p class="fe-sub">先去「发现」逛逛，或关注木屿餐厅（虚构商家）</p>
      <div class="fe-btns">
        <span class="od-btn" data-act="homeChannel" data-x="discover">去发现</span>
        <span class="od-btn pri" data-act="follow">关注木屿餐厅</span>
      </div></div>`;
  } else {
    const dist = h.ch === 'nearby';
    body = noteList(notes, { dist });
  }
  return `
  <header class="home-top">
    <span class="brand">薯约</span>
    <div class="home-search" data-act="openSearch">
      <span class="hs-ico">🔍</span><span class="hs-ph">搜索探店、菜品、约会灵感</span>
    </div>
    <a class="home-msg" href="#/msg" aria-label="消息">💬</a>
  </header>
  <nav class="ch-tabs">${chs.map(c =>
    `<span class="ch-tab${h.ch === c.k ? ' on' : ''}" data-act="homeChannel" data-x="${c.k}">${c.t}</span>`).join('')}
  </nav>
  ${h.ch === 'follow' ? '' : `
  <div class="cat-row">${CATS.map(c =>
    `<span class="f-chip${h.cat === c.k ? ' on' : ''}" data-act="catFilter" data-x="${c.k}">${c.label}</span>`).join('')}
  </div>
  <div class="sort-row">
    ${SORTS.map(s => `<span class="sort-chip${h.sort === s.k ? ' on' : ''}" data-act="sortPick" data-x="${s.k}">${s.label}</span>`).join('')}
    ${h.ch === 'nearby' && h.sort === 'rec' ? '<span class="near-hint">按距离排序</span>' : ''}
  </div>`}
  ${body}
  <div class="feed-foot">— 内容为虚构演示数据 · 薯约 Demo —</div>`;
}

/* ---------- 页面：发现 ---------- */
function discoverHtml() {
  const hot = DATA.notes.slice().sort((a, b) => b.stats.like - a.stats.like).slice(0, 6);
  return `
  <header class="page-top"><span class="pt-title">发现</span></header>
  <div class="home-search disc-search" data-act="openSearch">
    <span class="hs-ico">🔍</span><span class="hs-ph">搜索探店、菜品、约会灵感</span>
  </div>
  <div class="sec-title">话题墙</div>
  <div class="topic-wall">${(DATA.topicGrid || []).map(t =>
    `<div class="topic-cell" data-act="topicSearch" data-x="${esc(t.tag)}"><span class="tw-emoji">${t.emoji}</span><span class="tw-tag">${esc(t.tag)}</span></div>`).join('')}
  </div>
  <div class="sec-title">热门笔记 🔥</div>
  ${noteList(hot)}
  <div class="feed-foot">— 话题与篇数均由演示数据聚合 —</div>`;
}

/* ---------- 页面：搜索 ---------- */
function searchHtml() {
  const se = S.search;
  return `
  <header class="se-top">
    <span class="pt-back" data-act="back">‹</span>
    <div class="se-input-wrap">
      <span class="hs-ico">🔍</span>
      <input id="search-input" class="se-input" placeholder="搜索探店、菜品、约会灵感" value="${esc(se.input)}" autocomplete="off">
      <span id="se-clear" class="se-clear${se.input ? '' : ' hide'}" data-act="clearInput">×</span>
    </div>
    <span class="se-go" data-act="searchGo">搜索</span>
  </header>
  <div id="search-body">${searchBodyHtml()}</div>`;
}
function searchBodyHtml() {
  const se = S.search;
  if (!se.submitted) {
    return se.input ? suggestHtml(se.input) : hotHistHtml();
  }
  return resultsHtml();
}
function hotHistHtml() {
  const hot = HOT();
  return `
  ${S.search.hist.length ? `
  <div class="sh-sec">
    <div class="sh-title"><span>搜索历史</span><span class="sh-clear" data-act="clearHist">清空</span></div>
    <div class="sh-chips">${S.search.hist.map(h => `<span class="sh-chip" data-act="histGo" data-x="${esc(h)}">${esc(h)}</span>`).join('')}</div>
  </div>` : '<div class="sh-sec"><div class="sh-title"><span>搜索历史</span><span class="sh-clear dim">暂无</span></div></div>'}
  <div class="sh-sec">
    <div class="sh-title"><span>热门搜索</span></div>
    <div class="sh-chips">${hot.map((h, i) =>
      `<span class="sh-chip${i < 2 ? ' hot' : ''}" data-act="hotGo" data-x="${esc(h)}">${i < 2 ? '🔥 ' : ''}${esc(h)}</span>`).join('')}</div>
  </div>`;
}
function suggestHtml(input) {
  const list = suggestFor(input);
  const rows = list.length
    ? list.map(t => `<div class="sg-row" data-act="suggestGo" data-x="${esc(t)}"><span class="sg-ico">🔍</span><span>${esc(t)}</span></div>`).join('')
    : `<div class="sg-none">没有相关联想，直接点「搜索」试试「${esc(input)}」</div>`;
  return `<div class="sh-sec"><div class="sh-title"><span>搜索联想</span></div>${rows}</div>`;
}
function resultsHtml() {
  const se = S.search;
  const notes = searchNotes(se.q);
  const prods = searchProds(se.q);
  const tabs = [
    { k: 'all', t: '综合' }, { k: 'notes', t: '笔记' }, { k: 'prods', t: '同款体验' },
  ];
  let body = '';
  if (se.tab === 'notes') {
    body = notes.length ? noteList(notes) : emptyHtml(se.q);
  } else if (se.tab === 'prods') {
    body = prods.length ? prods.map(prodRow).join('') : emptyHtml(se.q);
  } else {
    if (!notes.length && !prods.length) body = emptyHtml(se.q);
    else {
      body = (notes.length ? `<div class="sec-title">相关笔记</div>${noteList(notes)}` : '') +
        (prods.length ? `<div class="sec-title">同款体验</div>${prods.map(prodRow).join('')}` : '');
    }
  }
  return `<nav class="res-tabs">${tabs.map(t =>
    `<span class="res-tab${se.tab === t.k ? ' on' : ''}" data-act="searchTab" data-x="${t.k}">${t.t}</span>`).join('')}</nav>${body}`;
}
function emptyHtml(q) {
  return `<div class="search-empty">
    <div class="se2-emoji">🔍</div>
    <p>没有找到「${esc(q)}」的相关内容</p>
    <p class="fe-sub">换个关键词试试，或看看大家都在搜什么</p>
    <div class="sh-chips">${HOT().slice(0, 4).map(h =>
      `<span class="sh-chip" data-act="hotGo" data-x="${esc(h)}">${esc(h)}</span>`).join('')}</div>
  </div>`;
}

/* ---------- 页面：消息 ---------- */
function msgHtml() {
  const noticeRows = S.events.slice().reverse().slice(0, 8).map(e => {
    const icon = { order: '🎫', confirm: '✅', reminder: '⏰', arrive: '🙋', redeem: '🧾', resched: '🔁', cancel: '❌', rate: '⭐', groupon: '🧩' }[e.kind] || '🎫';
    return `<div class="mr-row"><span class="mr-ic">${icon}</span>
      <div class="mr-body"><div class="mr-name">订单与预约</div><div class="mr-text">${esc(e.txt)}</div></div>
      <span class="mr-time">${esc(e.time || '')}</span></div>`;
  }).join('');
  return `
  <header class="page-top"><span class="pt-title">消息</span></header>
  ${(DATA.msgNotices || []).map(n => `<div class="msg-notice"><span class="mn-ic">${n.icon}</span>
    <div><div class="mn-title">${esc(n.title)}</div><div class="mn-text">${esc(n.text)}</div></div></div>`).join('')}
  <div class="sec-title">互动通知</div>
  ${(DATA.msgSamples || []).map(m => `<div class="mr-row">${hueAva(m.avatar, m.hue)}
    <div class="mr-body"><div class="mr-name">${esc(m.name)}</div><div class="mr-text">${esc(m.text)}</div></div>
    <span class="mr-time">${esc(m.at)}</span></div>`).join('')}
  <div class="sec-title">订单与预约通知</div>
  ${noticeRows || `<div class="msg-empty">暂无订单通知<br>下单一笔体验，状态变化会同步到这里（本地模拟）<br><a href="#/note/n7" class="msg-empty-link">从生日示例开始试试 →</a></div>`}`;
}

/* ---------- 页面：我 ---------- */
function meActRow(a) {
  const st = actState(a), M = ACT_META[st];
  return `<a class="bd-row" href="#/act/${a.id}">
    <span class="bd-ic">${a.mine ? '📌' : '🙋'}</span>
    <span class="bd-body"><span class="bd-name">${esc(a.theme)}</span>
      <span class="bd-sub">${esc(actDlLabel(a.dl))} · ${a.members.length}/${a.cap} 人 · ${M.label}</span></span>
    <span class="bd-cancel" data-act="${a.mine ? 'actCancel' : 'actLeave'}" data-x="${a.id}">${a.mine ? '解散' : '退出'}</span>
  </a>`;
}

function meGRow(g) {
  const p = prodById(g.prodId);
  const gp = p && p.groupon;
  const st = grouponState(g), M = GR_META[st];
  const booked = S.orders.some(o => o.gid === g.id && o.status !== 'cancelled');
  let btn = '';
  if (g.mine) btn = `<span class="bd-cancel" data-act="grouponCancelAsk" data-x="${g.id}">解散</span>`;
  else if (st === 'open' && grouponJoined(g)) btn = `<span class="bd-cancel" data-act="grouponLeave" data-x="${g.id}">退出</span>`;
  else if (st === 'full' && grouponJoined(g) && !booked) btn = `<span class="bd-cancel" data-act="grouponBook" data-x="${g.id}">去预约</span>`;
  return `<a class="bd-row" href="#/groupon/${g.id}">
    <span class="bd-ic">${g.mine ? '🧩' : '👥'}</span>
    <span class="bd-body"><span class="bd-name">${esc(g.note || p.name)}<i class="bd-sub">（${esc(p.name.slice(0, 12))}…）</i></span>
      <span class="bd-sub">${M.label} · ${g.members.length}/${gp.size} 人 · 拼团价 ¥${gp.price}${booked ? ' · 已下单' : ''}</span></span>
    ${btn}
  </a>`;
}

function meHtml() {
  const doing = S.orders.filter(o => ['awaiting', 'confirmed', 'arrived'].includes(o.status));
  const done = S.orders.filter(o => o.status === 'redeemed');
  const dead = S.orders.filter(o => o.status === 'cancelled');
  const cards = S.orders.filter(o => o.status !== 'cancelled');
  const ordRow = o => `<a class="or-row" href="#/order/${o.id}">
    <span class="or-cover">${phCover(o)}</span>
    <span class="or-body"><span class="or-name">${esc(o.name)}</span>
    <span class="or-sub">${esc(o.dateLabel)} ${o.slot} · ¥${o.price}</span></span>
    <span class="st-chip ${STATUS_META[o.status].tone}">${STATUS_META[o.status].label}</span></a>`;
  const perkCard = o => `<a class="pk-card" href="#/voucher/${o.id}">
    <span class="pk-ic">${o.status === 'redeemed' ? '🎁' : '🎫'}</span>
    <span class="pk-body"><span class="pk-name">${esc(o.perkName)}</span>
    <span class="pk-sub">来自「${esc(o.name)}」· ${esc(o.dateLabel)} ${o.slot}</span></span>
    <span class="st-chip ${STATUS_META[o.status].tone}">${STATUS_META[o.status].label}</span></a>`;
    const mineActs = S.acts.filter(a => a.mine);
  const joinedActs = S.acts.filter(a => !a.mine && actJoined(a));
  const mineGs = S.groupons.filter(g => g.mine);
  const joinedGs = S.groupons.filter(g => !g.mine && grouponJoined(g));
  return `
  <header class="page-top"><span class="pt-title">我</span></header>
  <div class="me-head">${hueAva('薯', 6)}
    <div class="me-info"><div class="me-name">薯约体验官</div><div class="me-desc">演示用户 · 数据仅存本机（虚构）</div></div>
  </div>
  <div class="me-stats">
    <div><b>${S.follow ? 1 : 0}</b><span>关注</span></div>
    <div><b>1</b><span>粉丝</span></div>
    <div><b>${S.orders.length}</b><span>订单</span></div>
    <div><b>${S.social.favs.length}</b><span>收藏</span></div>
  </div>
  <div class="me-card">
    <div class="me-card-title">我的预约</div>
    ${doing.length ? `<div class="me-sec-sub">进行中</div>${doing.map(ordRow).join('')}` : ''}
    ${done.length ? `<div class="me-sec-sub">已完成</div>${done.map(ordRow).join('')}` : ''}
    ${dead.length ? `<div class="me-sec-sub">已取消</div>${dead.map(ordRow).join('')}` : ''}
    ${!S.orders.length ? `<div class="msg-empty">还没有预约<br>去逛逛笔记，点「可约同款」试试<br><a href="#/note/n7" class="msg-empty-link">从生日示例开始 →</a></div>` : ''}
  </div>
  <div class="me-card">
    <div class="me-card-title">我的体验卡</div>
    ${cards.length ? cards.map(perkCard).join('') : `<div class="msg-empty">暂无体验卡<br>下单后这里会出现同一笔订单的体验凭证（本地模拟）</div>`}
  </div>
  <div class="me-card">
    <div class="me-card-title">我的同好活动</div>
    ${mineActs.length ? `<div class="me-sec-sub">我发起的</div>${mineActs.map(a => meActRow(a)).join('')}` : ''}
    ${joinedActs.length ? `<div class="me-sec-sub">我加入的</div>${joinedActs.map(a => meActRow(a)).join('')}` : ''}
    ${!mineActs.length && !joinedActs.length ? `<div class="msg-empty">暂无同好活动<br>在探店 / 手作 / 运动 / 户外笔记里点「发起活动」<br><a href="#/note/n12" class="msg-empty-link">从咖啡巡店示例开始 →</a></div>` : ''}
    <div class="me-sec-sub" style="margin-top:8px">活动报名与商品订单分开保存互不替代（演示数据仅存本机）</div>
  </div>
  <div class="me-card">
    <div class="me-card-title">我的拼团</div>
    ${mineGs.length ? `<div class="me-sec-sub">我发起的</div>${mineGs.map(meGRow).join('')}` : ''}
    ${joinedGs.length ? `<div class="me-sec-sub">我加入的</div>${joinedGs.map(meGRow).join('')}` : ''}
    ${!mineGs.length && !joinedGs.length ? `<div class="msg-empty">暂无拼团<br>在手作 / 运动类商品页点「发起拼团」<br><a href="#/product/p4" class="msg-empty-link">从陶艺拼团示例开始 →</a></div>` : ''}
    <div class="me-sec-sub" style="margin-top:8px">拼团是多人合买：成团解锁拼团价；报名找搭子、参团、下单三者分开（演示）</div>
  </div>
  <div class="me-foot">薯约 Demo · 虚构商家与价格 · 不产生真实交易<br>数据保存在浏览器 localStorage，可随时清空</div>`;
}

/* ---------- 页面：笔记详情 ---------- */
let SW = null; /* 当前 swiper 状态 */
function swiperHtml(n) {
  const hasPh = Array.isArray(n.photos) && n.photos.length;
  const slides = hasPh
    ? n.photos.map(p => `<div class="sw-slide"><img class="ph" src="${p}" alt="${esc(n.title)} 实景图（演示素材）" loading="lazy"></div>`)
    : (n.imageKeys || []).map((k, i) => `<div class="sw-slide">${i === 0 && n.img ? phCover(n) : COVER[k]}</div>`);
  const total = slides.length;
  return `<div class="sw-wrap" data-act="swTap">
    <div class="sw-track" id="sw-track">${slides.join('')}</div>
    ${total > 1 ? `<span class="sw-count"><i id="sw-idx">1</i>/${total}</span>
    <div class="sw-dots">${slides.map((_, i) => `<span class="sw-dot${i === 0 ? ' on' : ''}" data-act="swDot" data-x="${i}"></span>`).join('')}</div>` : ''}
  </div>`;
}
function bindSwiper(n) {
  const wrap = $('#sw-track');
  if (!wrap) { SW = null; return; }
  const total = (Array.isArray(n.photos) && n.photos.length ? n.photos : (n.imageKeys || [])).length;
  let x0 = null, dx = 0;
  SW = {
    idx: 0,
    apply() {
      wrap.style.transition = 'transform .25s ease';
      wrap.style.transform = `translateX(-${this.idx * 100}%)`;
      const c = $('#sw-idx'); if (c) c.textContent = this.idx + 1;
      $$('.sw-dot').forEach((d, i) => d.classList.toggle('on', i === this.idx));
    },
    next() { if (this.idx < total - 1) { this.idx++; this.apply(); } },
  };
  wrap.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; dx = 0; wrap.style.transition = 'none'; }, { passive: true });
  wrap.addEventListener('touchmove', e => {
    if (x0 == null) return;
    dx = e.touches[0].clientX - x0;
    wrap.style.transform = `translateX(calc(-${SW.idx * 100}% + ${dx}px))`;
  }, { passive: true });
  wrap.addEventListener('touchend', () => {
    if (x0 == null) return;
    if (dx < -40 && SW.idx < total - 1) SW.idx++;
    else if (dx > 40 && SW.idx > 0) SW.idx--;
    x0 = null; dx = 0;
    SW.apply();
  });
}
function noteHtml(n) {
  const liked = S.social.likes.includes(n.id);
  const faved = S.social.favs.includes(n.id);
  const p = n.productId ? prodById(n.productId) : null;
  return `
  <header class="page-top">
    <span class="pt-back" data-act="back">‹</span><span class="pt-title">笔记</span>
    <span class="pt-right" data-act="share">↗</span>
  </header>
  <div class="nd-author">${hueAva(n.author.avatar, n.author.hue)}
    <div class="nd-au-info"><div class="nd-au-name">${esc(n.author.name)}</div><div class="nd-au-desc">${esc(n.author.desc || '')}</div></div>
    <span class="follow-btn${S.follow ? ' on' : ''}" data-act="follow">${S.follow ? '已关注' : '关注'}</span>
  </div>
  ${swiperHtml(n)}
  <div class="nd-body">
    <h1 class="nd-title">${esc(n.title)}</h1>
    <div class="nd-meta">${(n.topics || []).map(t => `<span class="nd-topic">${esc(t)}</span>`).join('')}</div>
    ${(n.paras || []).map(t => `<p class="nd-para">${esc(t)}</p>`).join('')}
    ${(n.scenes || []).length ? `<div class="nd-scenes">${n.scenes.map(s => `<span class="nd-tag">${esc(s)}</span>`).join('')}</div>` : ''}
    ${p ? `<div class="sec-title">笔记同款 · 可直接预约</div>
      <div class="nd-prod">
        <span class="np-cover">${phCover(p)}</span>
        <span class="np-body"><span class="np-name">${esc(p.name)}<i class="np-type">${esc(p.typeLabel)}</i></span>
        <span class="np-price">¥${p.price}<s>¥${p.origRef}</s><i>${esc(p.people)}</i></span></span>
        <a class="np-btn" href="#/product/${p.id}">查看体验</a>
      </div>` : '<div class="nd-noprod">这篇笔记未挂团购链接<br>可用 AI 识别同款体验 · 按笔记内容匹配商品（演示）</div>'}
    <div class="ai-entry${p ? ' sub' : ''}" data-act="aiMatch" data-id="${n.id}">
      <span class="ai-entry-ic">🤖</span>
      <span class="ai-entry-body"><b>${p ? 'AI 换个相似体验' : 'AI 识别同款体验'}</b><i>${p ? '本笔记已挂团购链接 · 如想比一比，也可按笔记需求匹配其它相似体验' : '按这篇笔记识别体验项目 / 氛围 / 服务与关键需求，从现有商品中匹配'}</i></span>
      <span class="ai-entry-go">${p ? '看看 ›' : '识别一下 ›'}</span>
    </div>
    ${(n.actOK || actsOf(n.id).length) ? `
    <div class="sec-title">同好活动 · 一起去</div>
    <div class="act-block">
      ${actsOf(n.id).map(a => {
        const st = actState(a), M = ACT_META[st];
        return `<a class="act-row" href="#/act/${a.id}">
          <span class="act-row-ic">${ACT_IC[n.cat] || '👯'}</span>
          <span class="act-row-body"><b>${esc(a.theme)}</b>
            <i>${esc(a.time)} · 已报 ${a.members.length}/${a.cap} 人</i></span>
          <span class="act-chip ${M.tone}">${M.label}</span>
        </a>`;
      }).join('')}
      ${n.actOK ? `<div class="act-start" data-act="actForm" data-x="${n.id}">＋ 发起活动 · 找同好一起去</div>` : ''}
    </div>
    <div class="act-block-tip">活动报名与商品购买分开记录互不替代；报名 ≠ 下单（演示数据仅存本机）</div>` : ''}
    <div class="sec-title" id="cmt-anchor">评论 ${n.stats.cmt}</div>
    ${(n.comments || []).map(c => `<div class="cmt-row">${hueAva(c.avatar, c.hue)}
      <div class="cmt-body"><div class="cmt-name">${esc(c.name)}<span>${esc(c.at)}</span></div><div class="cmt-text">${esc(c.text)}</div></div></div>`).join('')}
    <div class="cmt-input" data-act="cmtInput">说点什么…（演示环境暂不支持发布）</div>
  </div>
  <div class="page-footbar">
    <div class="nf-acts">
      <span class="nf-btn${liked ? ' on' : ''}" data-act="noteLike" data-id="${n.id}">🤍<i>${fmt(n.stats.like + (liked ? 1 : 0))}</i></span>
      <span class="nf-btn${faved ? ' on' : ''}" data-act="noteFav" data-id="${n.id}">⭐<i>${fmt(n.stats.fav + (faved ? 1 : 0))}</i></span>
      <span class="nf-btn" data-act="noteCmt">💬<i>${n.stats.cmt}</i></span>
    </div>
    ${p ? `<a class="nf-main" href="#/product/${p.id}">去约同款 · ¥${p.price}</a>`
        : `<span class="nf-main" data-act="aiMatch" data-id="${n.id}">🤖 AI 识别同款体验</span>`}
  </div>`;
}

/* ---------- AI 笔记同款匹配（本地规则演示，非真实 AI 服务） ---------- */
/* 品类需求字段：pick = [正则, 展示值, 探测词]；探测词只与 DATA.products 已配置的
   items / perks / rules 文本做包含匹配，三态判断不臆造任何权益。 */
const AI_NEEDS = {
  food: [
    { key: 'dish', label: '想吃什么', pick: [
      [/(意面|松露)/, '意面 / 松露系', ['意面', '松露']],
      [/(牛排)/, '牛排', ['牛排']],
      [/(甜品|提拉米苏|蛋糕|拼盘)/, '甜品', ['甜品', '提拉米苏', '蛋糕', '拼盘']],
      [/(饮品|特调|气泡)/, '饮品', ['饮', '特调', '气泡']],
    ] },
    { key: 'people', label: '几个人', pick: [
      [/\d+\s*个?人|多人|一桌|家宴/, '多人聚餐', ['包间', '加位', '位', '多人']],
      [/(双人|两个人|两个人|对方|他|她|闺蜜|朋友)/, '2 人', ['双人', '2 人', '两人']],
      [/(一个人|独自|一人)/, '1 人', ['1 人', '单人']],
    ] },
    { key: 'scene', label: '什么场合', pick: [
      [/(生日)/, '生日', ['生日', '蜡烛']],
      [/(纪念日|约会)/, '约会 / 纪念日', ['约会', '纪念日']],
      [/(日常|下班|探店|午休)/, '日常探店', ['日常', '探店']],
    ] },
    { key: 'decor', label: '氛围布置', pick: [
      [/(布置|烛|氛围|生日)/, '要氛围布置', ['布置']],
      [/(不要|不需要|无所谓)/, '不设要求', []],
    ] },
  ],
  craft: [
    { key: 'project', label: '手作项目', pick: [
      [/(陶|拉坯|捏)/, '陶艺拉坯', ['拉坯', '陶', '釉', '泥']],
      [/(银|戒指|对戒)/, '银饰 DIY', ['银', '戒']],
    ] },
    { key: 'duration', label: '可投入时长', pick: [
      [/\d+\s*分钟|\d+\s*个?小时|时长/, '单次 1–3 小时', ['90 分钟', '小时', '分钟']],
      [/(一下午|半日|下午)/, '半天以内', ['小时', '90 分钟', '半日']],
      [/(晚上|晚场|下班)/, '晚间场次', ['晚']],
    ] },
    { key: 'material', label: '材料费口径', pick: [
      [/(材料|泥料|银料|费用|加钱|另算)/, '材料费要透明', ['材料', '泥料', '银料', '含']],
    ] },
    { key: 'finish', label: '成品怎么拿', pick: [
      [/(烧制|烧成|等|几周)/, '接受等待烧制', ['烧制', '烧成', '领取', '自取', '闪送']],
      [/(当天|带走)/, '希望当天带走', ['当天', '带走']],
    ] },
    { key: 'people', label: '几个人', pick: [
      [/(双人|闺蜜|情侣|两个人|结伴|朋友)/, '2 人同行', ['双人', '2 人', '拼台']],
      [/(一个人|独自|一人)/, '1 人', ['1 人', '单人']],
    ] },
  ],
  sport: [
    { key: 'proj', label: '运动项目', pick: [
      [/(普拉提|Reformer|器械床|垫上|核心训练|体态)/, '普拉提', ['普拉提', 'Reformer', '体态']],
      [/(羽毛球|球拍)/, '羽毛球', ['羽毛球', '球拍']],
      [/(攀岩|岩馆|上墙)/, '攀岩', ['攀岩', '线路']],
    ] },
    { key: 'level', label: '当前水平', pick: [
      [/(零基础|新手|第一次|没玩过|菜)/, '零基础 / 新手', ['零基础', '新手', '入门', '分级']],
      [/(进阶|熟练|老手)/, '进阶', ['进阶', '提高']],
    ] },
    { key: 'gear', label: '器材装备', pick: [
      [/(租|没有装备|空手|不用先买|自备)/, '需要现场租赁', ['租', '装备', '器材', '球拍']],
    ] },
    { key: 'coach', label: '教练 / 陪练', pick: [
      [/(教练|陪练|带练|带保护|指导|私教|老师|纠动作)/, '要教练带练', ['教练', '陪练', '保护', '指导']],
    ] },
    { key: 'class', label: '课程形式', pick: [
      [/(小班|私教课|一对一|大团课|团课)/, '小班 / 私教', ['小班', '私教', '一对一']],
    ] },
    { key: 'ppl', label: '开场人数', pick: [
      [/1\s*[–-]\s*2\s*人|人少|一个人|独行|自己/, '1–2 人即可开场', ['1 人', '单人', '2 人', '1 – 2 人']],
    ] },
    { key: 'time', label: '想什么时候去', pick: [
      [/(下班|晚上|晚场|20 点|夜)/, '工作日晚场', ['晚']],
      [/(周末|周六|周日)/, '周末', ['周末']],
    ] },
    { key: 'partner', label: '搭子情况', pick: [
      [/(搭子|结伴|一个人|拼|组队)/, '想找搭子 / 可拼', ['搭子', '拼', '结伴', '匹配']],
    ] },
  ],
  cafe: [
    { key: 'drink', label: '饮品偏好', pick: [
      [/(拉花|奶泡|拿铁|espresso)/, '拉花 / 奶系咖啡', ['拉花', '奶泡', '拿铁']],
      [/(手冲|单品|豆子)/, '手冲单品', ['手冲', '单品', '耶加']],
      [/(特调|无酒精|气泡)/, '特调饮品', ['特调', '气泡', '无酒精']],
    ] },
    { key: 'course', label: '讲解 / 课程', pick: [
      [/(讲解|课程|学|入门|讲)/, '要冲煮讲解 / 入门课', ['讲解', '课程', '教学', '品鉴']],
    ] },
    { key: 'class', label: '课程形式', pick: [
      [/(小班|私教|一对一|人少)/, '小班教学', ['小班', '手把手', '示范']],
    ] },
    { key: 'env', label: '环境要求', pick: [
      [/(出片|拍照|氛围|机位|灯串)/, '要出片 / 拍照友好', ['出片', '拍照', '吧台', '机位', '氛围']],
    ] },
    { key: 'time', label: '去的时间', pick: [
      [/(工作日|下午)/, '工作日下午', ['工作日', '下午']],
      [/(周末|上午|十点|早)/, '周末上午', ['周末', '上午', '早']],
    ] },
  ],
  outdoor: [
    { key: 'route', label: '路线强度', pick: [
      [/(入门|休闲|10 ?公里|10km|新手|轻松)/, '入门休闲级', ['入门', '休闲', '10 公里', '新手', '友好']],
    ] },
    { key: 'dur', label: '可投入时长', pick: [
      [/(半日|半天|一下午)/, '半日', ['半日', '半', '小时']],
    ] },
    { key: 'gear', label: '装备情况', pick: [
      [/(装备|登山鞋|清单|护膝|租|头盔|车)/, '需要装备清单 / 租赁', ['装备', '清单', '租', '头盔', '护膝']],
    ] },
    { key: 'meet', label: '集合交通', pick: [
      [/(集合|地铁|拼车|车费|交通)/, '希望含集合交通', ['集合', '拼车', '交通', '车费']],
    ] },
    { key: 'cost', label: '费用在意点', pick: [
      [/(保险|含|费用|加钱|另计)/, '费用口径要清晰', ['含', '保险', '费用', '另计']],
    ] },
    { key: 'partner', label: '搭子情况', pick: [
      [/(搭子|结伴|一个人|组队|同行)/, '想找搭子 / 组队', ['搭子', '组队', '同行', '匹配']],
    ] },
  ],
};
/* 需求三态对照文案（严格依据商品已配置数据，未命中 ≠ 商家不能提供） */
const AI_STATE_META = {
  included: { icon: '✅', label: '套餐已包含', tone: 'ok' },
  confirm:  { icon: '⚠️', label: '需商家确认', tone: 'warn' },
  excluded: { icon: '✖️', label: '未包含（现有数据未配置）', tone: 'dim' },
  na:       { icon: '—', label: '未设要求', tone: 'na' },
};

function aiNoteText(n) {
  return [n.title, (n.paras || []).join(' '),
    (n.dishes || []).map(d => d.name + ' ' + (d.note || '')).join(' '),
    (n.scenes || []).join(' '), (n.topics || []).join(' ')].join(' ');
}
/* 从笔记文本识别该品类的核心体验需求（本地规则，可手动修改） */
function aiExtractNeeds(n) {
  const fields = AI_NEEDS[n.cat] || [];
  const text = aiNoteText(n);
  return fields.map(f => {
    for (const [re, val, probes] of f.pick) {
      if (re.test(text)) return { key: f.key, label: f.label, value: val, probes };
    }
    return { key: f.key, label: f.label, value: '不设要求', probes: [] };
  });
}
/* 需求 vs 单个商品 → 三态对照。items 命中=已包含；perks/rules 命中=需商家确认 */
function aiMatchStates(p, needs) {
  const hay = {
    items: p.items.map(i => i.name + ' ' + (i.desc || '')).join(' '),
    perks: (p.perks || []).map(k => k.name + ' ' + (k.desc || '') + ' ' + (k.window || '')).join(' '),
    rules: Object.values(p.rules || {}).join(' ') + ' ' + (p.perkNoneNote || '') + ' ' + (p.priceNote || ''),
    slots: [p.people || ''].concat((p.slotGroups || []).map(g => g.name + ' ' + (g.times || []).join(' '))).join(' '),
  };
  return needs.map(nd => {
    if (!nd.probes.length) return { ...nd, state: 'na' };
    if (nd.probes.some(x => hay.items.includes(x))) return { ...nd, state: 'included' };
    if (nd.probes.some(x => hay.perks.includes(x))) return { ...nd, state: 'confirm', via: '权益' };
    if (nd.probes.some(x => hay.rules.includes(x))) return { ...nd, state: 'confirm', via: '规则' };
    if (nd.probes.some(x => hay.slots.includes(x))) return { ...nd, state: 'confirm', via: '场次/人数' };
    return { ...nd, state: 'excluded' };
  });
}
/* 跑一次匹配：同品类商品按需求命中打分，返回排序后的推荐 */
function aiRunMatch(n, needs) {
  const pool = DATA.products.filter(p => p.cat === n.cat);
  const scored = pool.map(p => {
    const states = aiMatchStates(p, needs);
    const inc = states.filter(s => s.state === 'included').length;
    const cfm = states.filter(s => s.state === 'confirm').length;
    let score = inc * 3 + cfm;
    if (n.productId === p.id || p.sourceNoteId === n.id) score += 2; /* 笔记同款加权 */
    return { p, states, score, inc, cfm };
  }).sort((a, b) => b.score - a.score || a.p.price - b.p.price);
  return scored;
}

/* ---------- 页面：AI 匹配结果 ---------- */
function aimatchHtml() {
  const r = S.route;
  const n = noteById(r.id);
  if (!n) return homeHtml();
  if (!S.ai || S.ai.noteId !== n.id) {
    S.ai = { noteId: n.id, needs: aiExtractNeeds(n), cursor: 0 };
  }
  const { needs, cursor } = S.ai;
  const recs = aiRunMatch(n, needs);
  const cur = recs.length ? recs[cursor % recs.length] : null;
  const sameShop = !!(cur && cur.p.sourceNoteId === n.id);
  const matchKind = sameShop
    ? { label: '原店同款', tip: '依据：演示数据中该商品与原笔记标注了同店关联' }
    : { label: '相似体验', tip: '与原笔记非同店同款：按识别出的需求匹配，未证实为原店或完全同款' };
  const incList = cur ? cur.states.filter(s => s.state === 'included').map(s => `${s.label}·${s.value}`) : [];
  const cfmList = cur ? cur.states.filter(s => s.state === 'confirm').map(s => `${s.label}·${s.value}`) : [];
  const nonList = cur ? cur.states.filter(s => s.state === 'excluded').map(s => `${s.label}·${s.value}`) : [];
  const catLabel = CAT_LABEL[n.cat] || n.cat;
  const actList = actsOf(n.id);
  const actEntryOK = n.actOK || actList.length > 0;
  return `
  <header class="page-top">
    <span class="pt-back" data-act="back">‹</span><span class="pt-title">AI 识别同款体验</span><span class="pt-right"></span>
  </header>
  <div class="am-source">
    <span class="am-src-cover">${phCover(n)}</span>
    <span class="am-src-body"><b>${esc(n.title)}</b>
      <i>${esc(catLabel)} · 来自 <a href="#/note/${n.id}">查看原笔记 ›</a></i></span>
  </div>
  <div class="am-demo-tip">🤖 AI 模拟演示模式：本页匹配由本地规则完成，未调用真实 AI 服务；结论仅依据下方演示商品数据，价格与权益均为虚构演示。</div>
  <div class="sec-title">识别出的核心体验需求（可修改）</div>
  <div class="am-needs">
    ${needs.map((nd, i) => `<label class="am-need">
      <span class="am-need-label">${esc(nd.label)}</span>
      <select class="ai-select" data-i="${i}">
        ${(AI_NEEDS[n.cat].find(f => f.key === nd.key) || { pick: [] }).pick
          .concat([[/^$/, '不设要求', []]])
          .map(([re, val]) => `<option value="${esc(val)}"${nd.value === val ? ' selected' : ''}>${esc(val)}</option>`).join('')}
      </select>
    </label>`).join('')}
    <span class="am-need-reset" data-act="aiReset" data-id="${n.id}">↺ 重新按笔记识别</span>
  </div>
  ${recs.length ? `
  <div class="sec-title">匹配结论 · 推荐 ${recs.length} 个${catLabel}体验</div>
  <div class="am-tabs">${recs.map((x, i) =>
    `<span class="am-tab${i === cursor % recs.length ? ' on' : ''}" data-act="aiSwitch" data-x="${i}">
      推荐 ${i + 1}${x.p.sourceNoteId === n.id ? ' · 原店同款' : ' · 相似体验'}</span>`).join('')}
  </div>
  ${cur ? `
  <div class="am-rec">
    <div class="am-rec-head">
      <span class="np-cover">${phCover(cur.p)}</span>
      <span class="np-body"><span class="np-name">${esc(cur.p.name)}<i class="np-type">${esc(cur.p.typeLabel)}</i></span>
        <span class="np-price">¥${cur.p.price}<s>¥${cur.p.origRef}</s><i>${esc(cur.p.people)}</i></span></span>
    </div>
    <div class="am-hit">命中 ${cur.inc} 项已包含需求${cur.cfm ? ` · ${cur.cfm} 项可协商确认` : ''} · ${sameShop ? '原店同款' : '按需求匹配'} · ${esc(cur.p.priceNote)}</div>
    <div class="am-kind ${sameShop ? 'same' : 'simi'}">
      <span class="am-kind-badge">${sameShop ? '🏷' : '🧭'} ${matchKind.label}</span>
      <span class="am-kind-tip">${matchKind.tip}</span>
    </div>
    <div class="am-why">
      <b>匹配理由</b>
      <i>从笔记识别出 ${cur.states.filter(s => s.state !== 'na').length} 项核心需求，逐项与现有商品权益数据对照：</i>
      <span>✅ 已覆盖 ${cur.inc} 项${incList.length ? '：' + esc(incList.join('、')) : ''}</span>
      ${cfmList.length ? `<span>⚠️ 需与商家确认 ${cur.cfm} 项：${esc(cfmList.join('、'))}（口径见下方对照）</span>` : ''}
      ${nonList.length ? `<span>✖️ 未包含 ${nonList.length} 项${nonList.length ? '：' + esc(nonList.join('、')) : ''}（现有演示数据未配置，不代表商家不能提供）</span>` : ''}
    </div>
    <div class="sec-title sm">权益与费用对照（三态）</div>
    <div class="am-states">
      ${cur.states.map(st => `<div class="am-state ${AI_STATE_META[st.state].tone}">
        <span class="am-st-icon">${AI_STATE_META[st.state].icon}</span>
        <span class="am-st-label">${esc(st.label)} · ${esc(st.value)}</span>
        <span class="am-st-tag">${AI_STATE_META[st.state].label}${st.via ? '（' + st.via + '口径）' : ''}</span>
      </div>`).join('')}
    </div>
    <div class="am-conclusion">
      结论：${cur.inc ? `「${esc(cur.p.name)}」已覆盖 ${cur.inc} 项核心需求${cur.cfm ? `，${cur.cfm} 项需求需在下单备注并与商家确认` : ''}` : `「${esc(cur.p.name)}」与你的需求重叠有限，可换一个推荐或修改需求后重新匹配`}
      。未包含项不代表商家不能提供，仅指现有演示数据未配置。
    </div>
    <div class="am-acts">
      <a class="am-go" href="#/product/${cur.p.id}">选它 · 去看商品详情并预约</a>
      <span class="am-alt" data-act="aiSwitchNext">换一个推荐 ›</span>
    </div>
  </div>` : ''}
  ${actEntryOK ? `
  <a class="am-buddy" href="#/note/${n.id}">
    <span class="ai-entry-ic">👯</span>
    <span class="ai-entry-body"><b>找同好一起 ${esc(catLabel)}</b><i>${actList.length ? actList.length + ' 场活动可加入 · 也可自己发起' : '发起一场 · 报名与下单分开（演示）'}</i></span>
    <span class="ai-entry-go">${actList.length ? '查看 ›' : '去发起 ›'}</span>
  </a>` : ''}
  <div class="am-foot">以上匹配不产生真实交易；确认商品后进入正常预约下单流程（同一链路）。可随时修改需求重新匹配。</div>
  ` : `
  <div class="msg-empty am-nomatch">这个品类暂时没有配置演示商品<br>AI 不强行推荐：去其它品类看看？<br><a href="#/" class="msg-empty-link">回首页逛逛 →</a></div>
  `}
  <div class="am-bar">
    <span class="am-bar-ghost" data-act="aiReset" data-id="${n.id}">重新匹配</span>
    <a class="am-bar-main" href="#/note/${n.id}">回笔记页</a>
  </div>`;
}

/* ---------- 页面：同好活动详情 ---------- */
function actHtml(a) {
  const n = noteById(a.noteId);
  const p = a.prodId ? prodById(a.prodId) : null;
  const st = actState(a), M = ACT_META[st];
  const joined = actJoined(a);
  const remain = Math.max(0, a.cap - a.members.length);
  let bar;
  if (a.mine) {
    bar = `<span class="am-bar-ghost" data-act="actCancel" data-x="${a.id}">解散活动</span>
      <a class="am-bar-main" href="#/note/${a.noteId}">回笔记页</a>`;
  } else if (st !== 'open') {
    bar = `<span class="am-bar-ghost" data-act="actShare" data-x="${a.id}">分享</span>
      <span class="am-bar-main dim">${st === 'full' ? '已满员 · 看看别的活动' : '报名已截止'}</span>`;
  } else if (joined) {
    bar = `<span class="am-bar-ghost" data-act="actShare" data-x="${a.id}">分享</span>
      <span class="am-bar-main dim" data-act="actLeave" data-x="${a.id}">已报名 · 点此退出</span>`;
  } else {
    bar = `<span class="am-bar-ghost" data-act="actShare" data-x="${a.id}">分享</span>
      <span class="am-bar-main" data-act="actJoin" data-x="${a.id}">报名加入 · 余 ${remain} 位</span>`;
  }
  return `
  <header class="page-top">
    <span class="pt-back" data-act="back">‹</span><span class="pt-title">同好活动</span>
    <span class="pt-right" data-act="actShare" data-x="${a.id}">分享</span>
  </header>
  <div class="am-source">
    <span class="am-src-cover">${phCover(n)}</span>
    <span class="am-src-body"><b>${esc(n ? n.title : '来源笔记已下线（演示）')}</b>
      <i>${n ? esc(CAT_LABEL[n.cat] || '') + ' · <a href="#/note/' + n.id + '">查看原笔记 ›</a>' : '演示数据'}</i></span>
  </div>
  <div class="act-hero">
    <div class="act-hero-top"><span class="act-chip ${M.tone}">${M.label}</span><span class="act-count">${a.members.length}/${a.cap} 人已报名</span></div>
    <h1 class="act-theme">${esc(a.theme)}</h1>
    <div class="act-meta">
      <div><span>🕘</span>集合：${esc(a.time)}</div>
      <div><span>⏳</span>报名截止：${esc(actDlLabel(a.dl))}${st === 'closed' ? '（已截止）' : ''}</div>
      <div><span>🙋</span>发起人：${esc(a.host.nick)}${a.mine && a.host.nick !== '我' ? '（我）' : ''}</div>
    </div>
  </div>
  ${p ? `<div class="sec-title">关联体验 · 报名后需单独下单</div>
    <div class="nd-prod">
      <span class="np-cover">${phCover(p)}</span>
      <span class="np-body"><span class="np-name">${esc(p.name)}<i class="np-type">${esc(p.typeLabel)}</i></span>
        <span class="np-price">¥${p.price}<s>¥${p.origRef}</s><i>${esc(p.people)}</i></span></span>
      <a class="np-btn" href="#/product/${p.id}">查看体验</a>
    </div>
    ${(() => {
      /* 组合链路：本活动若关联拼团，展示拼团进度卡（报名 ≠ 参团 ≠ 付款） */
      const g = a.groupId ? grouponById(a.groupId) : null;
      if (g && g.actId === a.id) {
        const gst = grouponState(g), MG = GR_META[gst];
        const gj = grouponJoined(g);
        return `<div class="sec-title">关联拼团 · 和搭子一起拼</div>
        <div class="gr-buddy">
          <a class="gr-buddy-main" href="#/groupon/${g.id}">
            <span class="act-chip ${MG.tone}">${MG.label}</span>
            <b>${esc(g.note)}</b>
            <i>🧩 ${g.members.length}/${prodById(g.prodId).groupon.size} 人已参团 · 拼团价 ¥${prodById(g.prodId).groupon.price}/人</i>
            <i>参团与搭子报名分开记录：成团/付款以拼团和各自订单为准</i>
          </a>
          <div class="gr-buddy-acts">
            ${gst === 'open' && !gj && !g.mine
              ? `<span class="od-btn pri" data-act="grouponJoin" data-x="${g.id}">加入这个拼团（演示）</span>`
              : `<span class="od-btn dim">${g.mine ? '我发起的拼团' : gj ? '已参团' : gst === 'full' ? '已成团' : '已结束'} · 点卡片看详情</span>`}
          </div>
        </div>`;
      }
      return p.groupon ? `<a class="act-gr-link" href="#/product/${p.id}">🧩 该体验可发起同好拼团 · ${p.groupon.size} 人成团享拼团价 ¥${p.groupon.price}/人 ›</a>` : '';
    })()}
    <div class="act-tip">报名 ≠ 购买：加入活动不会产生订单；参加活动的费用与权益口径以上方套餐页为准（虚构演示价）。</div>`
    : `<div class="act-tip">本活动未关联商品套餐，费用按发起人说明 AA 自理（演示数据）。</div>`}
  <div class="sec-title">费用说明</div>
  <div class="act-sec">${esc(a.cost)}</div>
  <div class="sec-title">活动规则</div>
  <div class="act-sec">${esc(a.rules)}</div>
  <div class="sec-title">已报名 ${a.members.length} 人</div>
  <div class="ac-members">
    ${a.members.map(m => `<span class="ac-member">${hueAva(m.nick.slice(0, 1), m.hue)}<i>${esc(m.nick)}${m.self && m.nick !== '我' ? '（我）' : ''}</i></span>`).join('')}
    ${st === 'open' && remain > 0 && !joined ? `<span class="ac-member ghost">＋ 还剩 ${remain} 个空位</span>` : ''}
  </div>
  <div class="am-foot">同好活动为本地演示：报名仅存本机，与商品订单分开记录互不替代；不产生真实社交或支付。分享链接为演示功能。</div>
  <div class="am-bar">${bar}</div>`;
}

/* ---------- 页面：同好拼团 ---------- */
function grouponHtml(g) {
  const p = prodById(g.prodId);
  const gp = p.groupon;
  const st = grouponState(g), M = GR_META[st];
  const joined = grouponJoined(g);
  const remain = Math.max(0, gp.size - g.members.length);
  const paid = grouponPaid(g);
  const pct = Math.min(100, Math.round(g.members.length / gp.size * 100));
  const srcId = g.fromNoteId || p.sourceNoteId || null;
  const n = srcId ? noteById(srcId) : null;
  let bar;
  if (st === 'fail') {
    bar = `<span class="am-bar-ghost" data-act="grouponShare" data-x="${g.id}">分享</span>
      <span class="am-bar-main" data-act="grouponForm" data-x="${p.id}">再发起一个拼团</span>`;
  } else if (st === 'full') {
    bar = joined
      ? `<span class="am-bar-ghost" data-act="grouponShare" data-x="${g.id}">分享</span>
        <span class="am-bar-main" data-act="grouponBook" data-x="${g.id}">成团价去预约 · ¥${gp.price}</span>`
      : `<span class="am-bar-ghost" data-act="grouponShare" data-x="${g.id}">分享</span>
        <span class="am-bar-main dim">已成团 · 去商品页看别的拼团</span>`;
  } else if (g.mine) {
    bar = `<span class="am-bar-ghost" data-act="grouponCancelAsk" data-x="${g.id}">解散</span>
      <span class="am-bar-main" data-act="grouponShare" data-x="${g.id}">邀请同好参团 · 还差 ${remain} 人</span>`;
  } else if (joined) {
    bar = `<span class="am-bar-ghost" data-act="grouponShare" data-x="${g.id}">分享</span>
      <span class="am-bar-main dim" data-act="grouponLeave" data-x="${g.id}">已参团 · 点此退出</span>`;
  } else {
    bar = `<span class="am-bar-ghost" data-act="grouponShare" data-x="${g.id}">分享</span>
      <span class="am-bar-main" data-act="grouponJoin" data-x="${g.id}">加入拼团 · 还差 ${remain} 人</span>`;
  }
  return `
  <header class="page-top">
    <span class="pt-back" data-act="back">‹</span><span class="pt-title">同好拼团</span>
    <span class="pt-right" data-act="grouponShare" data-x="${g.id}">分享</span>
  </header>
  <div class="am-source">
    <span class="am-src-cover">${phCover(n)}</span>
    <span class="am-src-body"><b>${esc(n ? n.title : '拼团体验')}</b>
      <i>${n ? esc(CAT_LABEL[n.cat] || '') + ' · <a href="#/note/' + n.id + '">查看原笔记 ›</a>' : '关联商品套餐'}</i></span>
  </div>
  <div class="act-hero">
    <div class="act-hero-top"><span class="act-chip ${M.tone}">${M.label}</span><span class="act-count">${g.members.length}/${gp.size} 人已参团</span></div>
    <h1 class="act-theme">${esc(g.note || p.name + ' 拼团')}</h1>
    ${g.topic ? `<div class="act-topic"><span class="act-topic-chip">🎯 本次主题 · ${esc(g.topic)}</span>
      <span class="act-topic-desc">${esc(grouponTopicDesc(p, g.topic) || '发起人自选主题（演示口径）')}</span></div>` : ''}
    <div class="act-meta">
      <div><span>🧩</span>拼团价：¥${gp.price}/人（单买 ¥${p.price}，演示价）</div>
      <div><span>⏳</span>成团截止：${esc(grouponDlLabel(g))}${st === 'fail' ? '（未成团）' : ''}</div>
      <div><span>🙋</span>发起人：${esc(g.host.nick)}${g.mine && g.host.nick !== '我' ? '（我）' : ''}</div>
    </div>
    <div class="gr-progress"><span style="width:${pct}%"></span></div>
  </div>
  <div class="sec-title">关联体验 · 成团后按拼团价预约</div>
  <div class="nd-prod">
    <span class="np-cover">${phCover(p)}</span>
    <span class="np-body"><span class="np-name">${esc(p.name)}<i class="np-type">${esc(p.typeLabel)}</i></span>
      <span class="np-price">¥${p.price}<s>¥${p.origRef}</s><i>${esc(p.people)}</i></span></span>
    <a class="np-btn" href="#/product/${p.id}">查看体验</a>
  </div>
  <div class="sec-title">本次拼什么 · 适合谁</div>
  <div class="act-sec">
    <div class="gr-rule-line"><b>体验主题</b><span>🎯 ${g.topic ? esc(g.topic) : '发起人没选主题 · 按通用拼团走（演示）'}</span></div>
    ${g.topic ? `<div class="gr-rule-line"><b>适合谁</b><span>${esc(grouponTopicDesc(p, g.topic) || '主题说明暂缺（演示口径）')}</span></div>` : ''}
    <div class="gr-rule-line"><b>拼的内容</b><span>${esc(p.name)} · 参团各下各的单，可各自预约，不强制一起到场</span></div>
    <div class="gr-rule-line"><b>不想拼</b><span>直接按原价 ¥${p.price} 预约即可，拼团只是多一个省钱选项（演示价）</span></div>
  </div>
  <div class="sec-title">优惠规则</div>
  <div class="act-sec">
    <div class="gr-rule-line"><b>拼团价</b><span>¥${gp.price}/人，比单买省 ¥${p.price - gp.price}（演示口径，非真实优惠）</span></div>
    <div class="gr-rule-line"><b>成团条件</b><span>${gp.size} 人参团 · 发起后 ${gp.dlHours} 小时内凑满</span></div>
    ${gp.perk ? `<div class="gr-rule-line"><b>成团权益</b><span>🎁 ${esc(gp.perk)}</span></div>` : ''}
    <div class="gr-rule-line"><b>未成团</b><span>超时自动结束，无需退出；想按原价去可直接预约，不受影响</span></div>
    <div class="gr-rule-line"><b>参团 ≠ 已付款</b><span>目前 ${paid}/${g.members.length || gp.size} 人已按拼团价下单${paid > 0 ? '（含演示口径）' : ''}</span></div>
  </div>
  <div class="sec-title">已参团 ${g.members.length} 人</div>
  <div class="ac-members">
    ${g.members.map(m => `<span class="ac-member">${hueAva(m.nick.slice(0, 1), m.hue)}<i>${esc(m.nick)}${m.self && m.nick !== '我' ? '（我）' : ''}</i></span>`).join('')}
    ${st === 'open' && remain > 0 && !joined ? `<span class="ac-member ghost">＋ 还差 ${remain} 人成团</span>` : ''}
  </div>
  ${(() => {
    /* 组合链路：找搭子区块 —— 已关联展示卡片；发起人/参团成员可为这团补开；均为可选项 */
    const act = g.actId ? S.acts.find(a => a.id === g.actId) : null;
    if (act) {
      const ast = actState(act);
      const ajoined = actJoined(act);
      const M2 = GR_META[ast] || GR_META.open;
      return `<div class="sec-title">找搭子同行 · 已关联</div>
      <div class="gr-buddy">
        <a class="gr-buddy-main" href="#/act/${act.id}">
          <span class="act-chip ${M2.tone}">${M2.label}</span>
          <b>${esc(act.theme)}</b>
          <i>⏰ ${esc(act.time)} · ${act.members.length}/${act.cap} 位搭子</i>
          <i>报名只约同行，不产生订单、不计入拼团成团数</i>
        </a>
        <div class="gr-buddy-acts">
          ${ajoined || act.mine
            ? `<span class="od-btn dim">已${act.mine ? '发起' : '报名'} · 点卡片看详情</span>`
            : ast === 'open'
              ? `<span class="od-btn pri" data-act="actJoin" data-x="${act.id}">报名搭子（演示）</span>`
              : `<span class="od-btn dim">报名${ast === 'full' ? '已满员' : '已截止'}</span>`}
        </div>
      </div>`;
    }
    if ((g.mine || joined) && st !== 'fail') {
      return `<div class="sec-title">找搭子同行 · 可选</div>
      <div class="gr-buddy">
        <div class="gr-buddy-hint">拼团管「一起买」，找搭子管「一起去」—— 这团还没带搭子活动，参团成员随时可补开一个（不强制）。</div>
        <div class="gr-buddy-acts"><span class="od-btn pri" data-act="actFormFromG" data-x="${g.id}">＋ 为这团开个找搭子</span></div>
      </div>`;
    }
    return '';
  })()}
  <div class="act-tip">拼团 ≠ 找搭子：拼团是多人一起买同款体验，成团解锁拼团价；找搭子只约同行、各自消费。两件事互不替代（演示口径）。</div>
  <div class="am-foot">同好拼团为本地演示：人数与拼团价来自配置数据，不构成真实库存或优惠承诺；成团后预约与订单走既有流程，不产生真实支付。</div>
  <div class="am-bar">${bar}</div>`;
}

/* ---------- 页面：套餐详情 ---------- */
function productHtml(p) {
  return `
  <header class="page-top">
    <span class="pt-back" data-act="back">‹</span><span class="pt-title">体验详情</span><span class="pt-right"></span>
  </header>
  <div class="pd-hero">${phCover(p)}</div>
  <div class="pd-body">
    <div class="pd-price">¥${p.price}<s>¥${p.origRef}</s></div>
    <div class="pd-pnote">${esc(p.priceNote)}</div>
    <h1 class="pd-name">${esc(p.name)}<span class="pd-type">${esc(p.typeLabel)}</span></h1>
    <p class="pd-tagline">${esc(p.tagline)}</p>
    <div class="pd-meta"><span>👤 ${esc(p.people)}</span>${(p.scenes || []).map(s => `<span class="nd-tag">${esc(s)}</span>`).join('')}</div>
    ${p.groupon ? `
    <div class="sec-title">同好拼团<span class="gr-sec-note">多人合买成团享拼团价 · 不拼团按原价直接预约</span></div>
    <div class="gr-card">
      <div class="gr-top">
        <span class="gr-price"><b>¥${p.groupon.price}</b><i>/人</i><em>单买 ¥${p.price}</em></span>
        <span class="gr-size">${p.groupon.size} 人成团</span>
      </div>
      ${p.groupon.perk ? `<div class="gr-perk">🎁 成团权益：${esc(p.groupon.perk)}</div>` : ''}
      ${(() => {
        const tp = grouponTopicsOf(p);
        if (!tp.length) return '';
        return `<div class="gr-themes">
          <div class="gr-th-head">🎯 体验主题 · 发起时选一个，同好一眼看懂这团玩什么</div>
          ${tp.map(t => `<span class="gr-theme"><b>${esc(t.name)}</b><i>${esc(t.desc)}</i></span>`).join('')}
        </div>`;
      })()}
      <div class="gr-rule">发起后 ${p.groupon.dlHours} 小时内凑满 ${p.groupon.size} 人即成团；成团后可按拼团价预约，未成团可继续原价预约，互不影响。</div>
      <div class="gr-start-row">
        <span class="gr-start" data-act="grouponForm" data-x="${p.id}">发起拼团</span>
        <span class="gr-tip-mini">拼团价与人数为演示配置，非真实优惠</span>
      </div>
      ${(() => {
        const list = grouponsOf(p.id).filter(x => grouponState(x) === 'open');
        if (!list.length) return '';
        return `<div class="gr-list-title">进行中的拼团 · 可直接加入</div>` + list.map(x => {
          const jc = grouponJoined(x) || x.mine;
          return `<a class="gr-ongoing" href="#/groupon/${x.id}">
            <span class="gr-og-body"><b>${esc(x.note || '同好拼团')}</b>
              <i>${x.topic ? '🎯 ' + esc(x.topic) + ' · ' : ''}${x.mine ? '我发起的 · ' : grouponJoined(x) ? '已参团 · ' : ''}${x.members.length}/${p.groupon.size} 人 · 还差 ${p.groupon.size - x.members.length} 人 · ${esc(grouponDlLabel(x))}</i></span>
            <span class="gr-og-btn${jc ? ' dim' : ''}">${x.mine ? '查看' : grouponJoined(x) ? '查看' : '去参团'}</span></a>`;
        }).join('');
      })()}
      <div class="gr-tip">拼团 ≠ 找搭子：拼团是一起买、解锁拼团价；找搭子是约同行、各自消费。两者分开互不影响（演示）。</div>
    </div>` : ''}
    ${(() => {
      /* 组合链路：商品页找搭子区块 —— 有组局源笔记（actOK）或已有本商品搭子活动才显示，可独立于拼团使用 */
      const src = actSrcNoteOf(p);
      const list = S.acts.filter(a => a.prodId === p.id).sort((x, y) => (actState(x) === 'open' ? -1 : 1) - (actState(y) === 'open' ? -1 : 1));
      if (!src && !list.length) return '';
      const openN = list.filter(a => actState(a) === 'open').length;
      return `<div class="sec-title">找搭子同行<span class="gr-sec-note">只约同行不产生订单 · 想拼团看上方拼团区</span></div>
    <div class="gr-card">
      ${list.length ? `<div class="gr-list-title">${openN ? '进行中的搭子活动 · ' + openN + ' 个' : '暂无进行中的活动'}</div>` + list.map(a => {
        const ast = actState(a), M2 = GR_META[ast] || GR_META.open;
        const j = actJoined(a) || a.mine;
        return `<a class="gr-ongoing" href="#/act/${a.id}">
          <span class="gr-og-body"><b>${esc(a.theme)}</b>
            <i><span class="act-chip mini ${M2.tone}">${M2.label}</span> ${a.groupId ? '🔗 关联拼团 · ' : ''}${esc(a.time)} · ${a.members.length}/${a.cap} 位搭子</i></span>
          <span class="gr-og-btn${j ? ' dim' : ''}">${j ? '查看' : '报名'}</span></a>`;
      }).join('') : `<div class="gr-rule">还没有搭子活动：想找同好结伴同行的，可以先发一个（发起和报名都不产生订单）。</div>`}
      ${src.actOK ? `<div class="gr-start-row">
        <span class="gr-start" data-act="actForm" data-x="${src.id}">发起找搭子</span>
        <span class="gr-tip-mini">报名与购买分开记录，互不替代（演示）</span>
      </div>` : ''}
    </div>`;
    })()}
    <div class="sec-title">套餐内容</div>
    ${p.items.map(i => `<div class="pd-item"><span class="pi-emoji">${i.emoji}</span>
      <span class="pi-name">${esc(i.name)} × ${i.qty}</span><span class="pi-desc">${esc(i.desc)}</span></div>`).join('')}
    <div class="sec-title">为什么值得约</div>
    <div class="pd-card">${p.reasons.map(r => `<div class="pd-reason">✅ ${esc(r)}</div>`).join('')}</div>
    ${p.perks.length ? `<div class="sec-title">体验权益（需商家确认）</div>
      ${p.perks.map(k => `<div class="perk-box">
        <div class="pb-name">🎫 ${esc(k.name)}</div>
        <div class="pb-desc">${esc(k.desc)}</div>
        <div class="pb-win">⏱ ${esc(k.window)}</div></div>`).join('')}`
      : `<div class="pd-card dim-card">${esc(p.perkNoneNote)}</div>`}
    <div class="sec-title">购买须知</div>
    <div class="pd-card pd-rules">
      <div><b>有效期</b><span>${esc(p.rules.validity)}</span></div>
      <div><b>使用</b><span>${esc(p.rules.use)}</span></div>
      <div><b>预约</b><span>${esc(p.rules.book)}</span></div>
      <div><b>改约</b><span>${esc(p.rules.change)}</span></div>
      <div><b>退款</b><span>${esc(p.rules.refund)}</span></div>
    </div>
    <div class="pd-src">💡 来源笔记：${p.sourceNoteId ? `<a href="#/note/${p.sourceNoteId}">《${esc((noteById(p.sourceNoteId) || {}).title || '')}》</a>` : '—'}</div>
    ${p.groupon ? (() => {
      const usable = grouponsOf(p.id).filter(x => grouponJoined(x) && grouponState(x) === 'full'
        && !S.orders.some(o => o.gid === x.id && o.status !== 'cancelled'));
      if (!usable.length) return '';
      return `<div class="gr-book-bar">🧩 你有已成团的拼团，可按拼团价 ¥${p.groupon.price} 预约 <a href="#/groupon/${usable[0].id}">去预约 ›</a></div>`;
    })() : ''}
  </div>
  <div class="page-footbar">
    <span class="pf-price">¥${p.price}<s>¥${p.origRef}</s></span>
    <span class="pf-main" data-act="toCheckout" data-x="${p.id}">选择时间并预约</span>
  </div>`;
}

/* ---------- 页面：下单 ---------- */
function checkoutHtml(p) {
  const co = S.co;
  const perk = p.perks[0] || null;
  const perkBad = co.perk && co.slot && !perkSlotOk(perk, co.slot);
  const ready = co.slot != null && !(co.perk && perkBad);
  /* 拼团成团价：仅当本单来自已满员且我已参团的拼团时生效 */
  const gr = co.gid ? grouponById(co.gid) : null;
  const gOk = !!(gr && p.groupon && gr.prodId === p.id && grouponState(gr) === 'full' && grouponJoined(gr));
  const unit = gOk ? p.groupon.price : p.price;
  return `
  <header class="page-top">
    <span class="pt-back" data-act="back">‹</span><span class="pt-title">确认预约</span><span class="pt-right"></span>
  </header>
  <div class="co-hero"><span class="co-cover">${phCover(p)}</span>
    <span class="co-info"><b>${esc(p.name)}</b><span>${esc(p.typeLabel)} · ${esc(p.people)}</span>
    <span class="co-price">¥${unit}${gOk ? '<i class="co-gr">拼团价</i>' : ''}</span></div>
  ${gOk ? `<div class="co-gr-tip">🧩 本单按拼团成团价 ¥${p.groupon.price}/人结算（拼团 ${p.groupon.size} 人已满 · 参团人数 ≠ 已付款人数 · 演示口径）</div>` : ''}
  <div class="co-sec"><div class="co-sec-title">选择到店日期（周一公休）</div>
    <div class="date-row">${ALL_DAYS.map((d, i) =>
      `<span class="dc${co.di === i ? ' on' : ''}" data-act="coPickDate" data-x="${i}"><i>${d.short}</i><em>${d.week}</em></span>`).join('')}</div>
  </div>
  <div class="co-sec"><div class="co-sec-title">选择到店时段</div>
    ${p.slotGroups.map(g => `<div class="sg-title">${esc(g.name)}</div>
      <div class="slot-row">${g.times.map(t => {
        const so = p.soldOut.includes(t);
        return `<span class="sc${co.slot === t ? ' on' : ''}${so ? ' so' : ''}" ${so ? '' : `data-act="coPickSlot" data-x="${t}"`}>${t}${so ? ' 售罄' : ''}</span>`;
      }).join('')}</div>`).join('')}
  </div>
  ${perk ? `<div class="co-sec"><div class="co-sec-title">体验权益（可选，需商家确认）</div>
    <div class="perk-box pick${co.perk ? ' on' : ''}" data-act="coTogglePerk">
      <span class="pc-check">${co.perk ? '✓' : ''}</span>
      <span class="pb-txt"><b>${esc(perk.name)}</b><span>${esc(perk.desc)}</span><em>⏱ ${esc(perk.window)}</em></span>
    </div>
    ${perkBad ? `<div class="co-warn">⚠ 所选时段不在权益适用范围（${esc(perk.window)}），请调整时段或取消勾选</div>` : ''}
    ${co.perk && !co.slot ? `<div class="co-warn dim">勾选权益后，请选择适用范围内的时段</div>` : ''}`
  : `<div class="co-sec"><div class="pd-card dim-card">${esc(p.perkNoneNote)}</div></div>`}
  <div class="co-sec"><div class="co-sec-title">费用明细</div>
    <div class="pd-card co-total">
      <div><b>套餐价</b><span>¥${p.price}（${esc(p.priceNote)}）</span></div>
      <div><b>权益</b><span>${perk ? (co.perk ? esc(perk.name) : '未选择') : '本套餐无附加权益'}</span></div>
      ${gOk
        ? `<div><b>拼团</b><span class="co-cut">-${p.price - p.groupon.price}（成团 ${p.groupon.size} 人 · 拼团价 ¥${p.groupon.price}/人，演示口径）</span></div>`
        : (gr && !gOk ? `<div><b>拼团</b><span class="dim">拼团未满或已失效 · 本单按原价</span></div>` : '')}
      <div><b>合计</b><span class="co-pay">¥${unit}</span></div>
    </div>
  </div>
  <div class="co-note">本页为模拟下单：不产生真实支付；预约需商家确认；勾选权益后能否提供以商家确认为准。${gOk ? '拼团价与成团人数为演示配置，非真实优惠。' : ''}</div>
  <div class="page-footbar">
    <span class="pf-price">¥${unit}</span>
    <span class="pf-main${ready ? '' : ' off'}" data-act="coSubmit" data-x="${p.id}">${ready ? '提交模拟订单' : '请选择日期与时段'}</span>
  </div>`;
}

/* ---------- 页面：订单详情 ---------- */
function orderHtml(o) {
  const m = STATUS_META[o.status];
  const alive = o.status !== 'cancelled';
  const steps = alive ? `<div class="st-steps">${STEPS.map((s, i) => {
    const done = i <= m.step;
    return `${i ? `<span class="st-line${i <= m.step ? ' done' : ''}"></span>` : ''}
      <span class="st-step"><i class="st-dot${done ? ' done' : ''}"></i><em>${s}</em></span>`;
  }).join('')}</div>` : '';
  const evts = orderEvts(o.id).slice().reverse().map(e =>
    `<div class="tl-row"><span>${esc(e.time)}</span><i>${esc(e.txt)}</i></div>`).join('');
  let acts = '';
  if (o.status === 'awaiting' || o.status === 'confirmed') {
    acts = `<div class="od-acts">
      <span class="od-btn" ${o.resched >= 2 ? '' : `data-act="openResched" data-id="${o.id}"`}>${o.resched >= 2 ? '改约已达上限' : `改约（${o.resched}/2）`}</span>
      <span class="od-btn warn" data-act="cancelAsk" data-id="${o.id}">取消订单</span></div>`;
    if (o.status === 'confirmed') {
      acts += `<div class="od-acts"><span class="od-btn pri" data-act="arrive" data-id="${o.id}">我到店了</span></div>`;
    }
  } else if (o.status === 'arrived') {
    acts = `<div class="od-acts"><span class="od-btn pri" data-act="openRedeem" data-id="${o.id}">出示核销码</span></div>`;
  } else if (o.status === 'redeemed' && !o.rated) {
    acts = rateFbHtml(o);
  } else if (o.status === 'redeemed') {
    acts = `<div class="od-done">已评价 · 感谢反馈${o.fb && o.fb.tags.length ? '「' + esc(o.fb.tags.join('、')) + '」' : ''}</div>`;
  } else if (o.status === 'cancelled') {
    acts = `<div class="od-acts"><span class="od-btn pri" data-act="toCheckout" data-x="${o.pid}">再约一次</span></div>`;
  }
  let mk = '';
  if (alive && o.status !== 'redeemed') {
    const mkBtns = {
      awaiting: `<span class="od-btn sm" data-act="merchantConfirm" data-id="${o.id}">模拟商家确认</span>`,
      confirmed: `<span class="od-btn sm" data-act="sendReminder" data-id="${o.id}">模拟发送到店提醒</span>`,
      arrived: `<span class="od-btn sm" data-act="doRedeem" data-id="${o.id}">模拟核销</span>`,
    }[o.status];
    mk = `<div class="mk-card"><div class="mk-title">商家端操作（演示，模拟商家行为）</div><div class="od-acts">${mkBtns}</div></div>`;
  }
  return `
  <header class="page-top">
    <span class="pt-back" data-act="back">‹</span><span class="pt-title">订单详情</span><span class="pt-right"></span>
  </header>
  <div class="od-hero ${m.tone}">
    <div class="od-label">${m.label}</div><div class="od-desc">${m.desc}</div>
  </div>
  ${steps}
  <div class="od-card">
    <div class="odc-row cover"><span class="od-cover">${phCover(o)}</span>
      <span><b>${esc(o.name)}</b><i>${esc(o.items.map(x => x.name).join(' · '))}</i></span></div>
    <div class="odc-rows">
      <div><b>编号</b><span>${o.id}</span></div>
      <div><b>金额</b><span>¥${o.price}（模拟支付）${o.gid ? ' · 拼团价' : ''}</span></div>
      ${o.gid ? `<div><b>拼团</b><span>${esc(o.gLabel || '同好拼团')} · <a href="#/groupon/${esc(o.gid)}">查看 ›</a></span></div>` : ''}
      <div><b>人数</b><span>${esc(o.people)}</span></div>
      <div><b>预约</b><span>${esc(o.dateLabel)} ${o.slot}</span></div>
      <div><b>权益</b><span>${o.perkRequested ? `${esc(o.perkName)} · ${orderPerkLabel(o)}` : '未选择'}</span></div>
    </div>
    <a class="odc-link" href="#/voucher/${o.id}">查看体验凭证 ›</a>
  </div>
  ${mk}
  ${acts}
  <div class="od-card"><div class="odc-title">动态</div>${evts || '<div class="tl-row"><span>--</span><i>暂无</i></div>'}</div>
  <div class="co-note">本订单为 Demo 模拟：无真实支付与退款；状态变化会同步到「消息」页。</div>`;
}
function rateFbHtml(o) {
  return `<div class="od-card fb-card">
    <div class="odc-title">体验如何？评价一下</div>
    <div class="fb-stars">${[1, 2, 3, 4, 5].map(i =>
      `<span class="fb-star${S.rate >= i ? ' on' : ''}" data-act="rate" data-x="${i}">★</span>`).join('')}</div>
    <div class="fb-tags">${FB_TAGS.map(t =>
      `<span class="f-chip${S.fbTags.includes(t) ? ' on' : ''}" data-act="fbTag" data-x="${esc(t)}">${t}</span>`).join('')}</div>
    <textarea id="fb-text" class="fb-text" placeholder="说说这次体验（演示环境仅本地保存）">${esc(S.fbText)}</textarea>
    <div class="od-acts"><span class="od-btn pri" data-act="submitFeedback" data-id="${o.id}">提交评价</span></div>
  </div>`;
}

/* ---------- 页面：体验凭证 ---------- */
function voucherHtml(o) {
  const m = STATUS_META[o.status];
  const mt = DATA.merchant;
  let act = '';
  if (o.status === 'awaiting') {
    act = `<div class="co-warn">⏳ 凭证待生效：商家确认预约后可到店使用</div>
      <div class="od-acts"><span class="od-btn pri" data-act="merchantConfirm" data-id="${o.id}">模拟商家确认</span></div>`;
  } else if (o.status === 'confirmed') {
    act = `<div class="od-acts"><span class="od-btn pri" data-act="arrive" data-id="${o.id}">我到店了</span></div>`;
  } else if (o.status === 'arrived') {
    act = `<div class="od-acts"><span class="od-btn pri" data-act="redeemAsk" data-id="${o.id}">模拟到店核销</span></div>`;
  } else if (o.status === 'redeemed') {
    act = `<div class="od-done">已核销 · 体验完成${o.rated ? ' · 已评价' : ''}</div>
      ${!o.rated ? `<div class="od-acts"><a class="od-btn pri" href="#/order/${o.id}">去订单页评价 ›</a></div>` : ''}`;
  } else {
    act = `<div class="od-done">订单已取消，凭证已失效</div>`;
  }
  return `
  <header class="page-top">
    <span class="pt-back" data-act="back">‹</span><span class="pt-title">体验凭证</span><span class="pt-right"></span>
  </header>
  <div class="od-hero ${m.tone}">
    <div class="od-label">${m.label}</div><div class="od-desc">${m.desc}</div>
  </div>
  <div class="od-card">
    <div class="odc-title">核销码</div>
    <div class="rc-box vk-box">
      <div class="rc-code">${redeemCode(o.id)}</div>
      <p class="rc-tip">到店后向店员出示此码核销；凭证与订单共用同一份本地数据</p>
    </div>
  </div>
  <div class="od-card">
    <div class="odc-row cover"><span class="od-cover">${phCover(o)}</span>
      <span><b>${esc(o.name)}</b><i>${esc(o.items.map(x => x.name).join(' · '))}</i></span></div>
    <div class="odc-rows">
      <div><b>编号</b><span>${o.id}</span></div>
      <div><b>金额</b><span>¥${o.price}（模拟支付）</span></div>
      <div><b>预约</b><span>${esc(o.dateLabel)} ${o.slot}</span></div>
      <div><b>权益</b><span>${o.perkRequested ? `${esc(o.perkName)} · ${orderPerkLabel(o)}` : '未选择'}</span></div>
    </div>
    <a class="odc-link" href="#/order/${o.id}">查看订单详情 ›</a>
  </div>
  ${act}
  <div class="od-card"><div class="odc-title">商家信息（虚构）</div>
    <div class="rv-rows">
      <div><b>商家</b><span>${esc(mt.shortName)} · ${esc(mt.name)}</span></div>
      <div><b>地址</b><span>${esc(mt.address)}</span></div>
      <div><b>营业</b><span>${esc(mt.hours)}</span></div>
    </div>
  </div>
  <div class="co-note">凭证为演示数据：无真实支付，商家与地址均为虚构，不构成预约确认。</div>`;
}

/* ---------- 渲染入口 ---------- */
const PAGE_WHITE = new Set(['note', 'product', 'checkout', 'order', 'voucher', 'search', 'aimatch', 'act', 'groupon']);
function render() {
  const r = S.route;
  let html = '';
  switch (r.key) {
    case 'home': html = homeHtml(); break;
    case 'discover': html = discoverHtml(); break;
    case 'msg': html = msgHtml(); break;
    case 'me': html = meHtml(); break;
    case 'note': {
      const n = noteById(r.id);
      if (!n) { location.hash = '#/'; return; }
      html = noteHtml(n);
      break;
    }
    case 'product': {
      const p = prodById(r.id);
      if (!p) { location.hash = '#/'; return; }
      html = productHtml(p);
      break;
    }
    case 'checkout': {
      const p = prodById(r.id);
      if (!p) { location.hash = '#/'; return; }
      html = checkoutHtml(p);
      break;
    }
    case 'order': {
      const o = orderBy(r.id);
      if (!o) { location.hash = '#/me'; return; }
      html = orderHtml(o);
      break;
    }
    case 'voucher': {
      const o = orderBy(r.id);
      if (!o) { location.hash = '#/me'; return; }
      html = voucherHtml(o);
      break;
    }
    case 'search': html = searchHtml(); break;
    case 'aimatch': {
      const n = noteById(r.id);
      if (!n) { location.hash = '#/'; return; }
      html = aimatchHtml();
      break;
    }
    case 'act': {
      const a = actById(r.id);
      if (!a) { location.hash = '#/'; return; }
      html = actHtml(a);
      break;
    }
    case 'groupon': {
      const g = grouponById(r.id);
      if (!g) { location.hash = '#/'; return; }
      html = grouponHtml(g);
      break;
    }
    default: html = homeHtml();
  }
  const app = $('#app');
  app.innerHTML = html;
  app.className = 'main' + (PAGE_WHITE.has(r.key) ? ' pg-white' : '');
  document.body.classList.toggle('subpage', SUB_PAGES.has(r.key));
  $$('.tabbar .tab').forEach(a => a.classList.toggle('on', a.dataset.tab === tabOf(r)));
  if (r.key === 'note') bindSwiper(noteById(r.id));
  if (r.key === 'search' && S.search.focusPending) {
    S.search.focusPending = false;
    setTimeout(() => { const i = $('#search-input'); if (i) i.focus(); }, 80);
  }
  const y = S.scroll[r.key] || 0;
  requestAnimationFrame(() => window.scrollTo(0, SUB_PAGES.has(r.key) && y === 0 ? 0 : y));
}

/* ---------- 事件委托 ---------- */
/* ---------- 发起活动弹窗（含组合链路：groupId 可选关联拼团） ---------- */
function openActFormModal(n, groupId) {
  const p = n.productId ? prodById(n.productId) : null;
  const g = groupId ? grouponById(groupId) : null;
  S.ac = { noteId: n.id, groupId: g ? g.id : null };
  const catLabel = CAT_LABEL[n.cat] || n.cat;
  const days = [];
  for (let i = 1; i <= 14; i++) {
    const d = new Date(Date.now() + i * DAY_MS);
    const v = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    days.push({ v, label: (d.getMonth() + 1) + '月' + d.getDate() + '日 · 周' + WEEK[d.getDay()] });
  }
  openModal(`<div class="mo-head"><span>发起活动 · ${esc(catLabel)}</span><span data-act="closeModal">×</span></div>
      <div class="mo-text">适合多人同行的笔记才可发起。报名与商品购买分开记录互不替代；本演示仅存本机，不产生真实报名。</div>
      ${g ? `<div class="gf-link-tip">🔗 该活动将关联拼团「${esc(g.note)}」· 搭子报名<b>不产生订单、不计成团人数</b>，成团/付款仍以拼团与各自订单为准</div>` : ''}
      <div class="bd-field"><div class="bd-fl">活动主题 *</div><input id="ac-theme" class="bd-input" placeholder="如：周六下午一起${esc(catLabel)}"></div>
      <div class="bd-field"><div class="bd-fl">集合时间 *</div><input id="ac-time" class="bd-input" placeholder="如：周六 14:00 · 地铁口集合"></div>
      <div class="bd-field"><div class="bd-fl">人数上限（2 – 20）</div><input id="ac-cap" class="bd-input" type="number" min="2" max="20" value="${g && p && p.groupon ? Math.min(20, p.groupon.size + 2) : 6}"></div>
      <div class="bd-field"><div class="bd-fl">费用说明</div><input id="ac-cost" class="bd-input" placeholder="${p ? '如：各自下单同款 ¥' + p.price + '（虚构演示价）' : '如：AA 自理 · 现场各自结算'}"></div>
      <div class="bd-field"><div class="bd-fl">报名截止</div><select id="ac-dl" class="bd-input">${days.map((d, i) => `<option value="${d.v}"${i === 2 ? ' selected' : ''}>${d.label}</option>`).join('')}</select></div>
      <div class="bd-field"><div class="bd-fl">活动规则</div><textarea id="ac-rules" class="bd-input" rows="2" placeholder="如：迟到 15 分钟不等；费用各自结算；成团后拉群（演示）"></textarea></div>
      <div class="od-acts"><span class="od-btn pri" data-act="actSubmit">发起（演示）</span></div>`);
}

const ACTIONS = {
  /* 导航 / 搜索 */
  back: () => goBack(),
  openSearch() {
    S.search.from = ['home', 'discover'].includes(S.route.key) ? S.route.key : 'home';
    S.search.input = '';
    S.search.submitted = false;
    S.search.focusPending = true;
    go('#/search');
  },
  searchGo() { runSearch($('#search-input') ? $('#search-input').value : S.search.input); },
  suggestGo: el => runSearch(el.dataset.x),
  hotGo: el => runSearch(el.dataset.x),
  histGo: el => runSearch(el.dataset.x),
  clearHist() { S.search.hist = []; S.search.focusPending = false; render(); },
  clearInput() {
    S.search.input = ''; S.search.submitted = false; S.search.focusPending = true;
    render();
  },
  searchTab: el => { S.search.tab = el.dataset.x; render(); },
  topicSearch: el => {
    S.search.input = el.dataset.x; S.search.q = el.dataset.x;
    S.search.submitted = true; S.search.tab = 'all';
    S.search.hist = [el.dataset.x].concat(S.search.hist.filter(h => h !== el.dataset.x)).slice(0, 12);
    go('#/search');
  },
  /* 首页频道 / 排序 / 分类 */
  homeChannel: el => { S.home.ch = el.dataset.x; render(); },
  sortPick: el => { S.home.sort = el.dataset.x; render(); },
  catFilter: el => { S.home.cat = el.dataset.x; render(); },
  /* 笔记互动 */
  noteLike(el) {
    const id = el.dataset.id;
    const i = S.social.likes.indexOf(id);
    if (i >= 0) S.social.likes.splice(i, 1); else S.social.likes.push(id);
    persist(); render();
  },
  noteFav(el) {
    const id = el.dataset.id;
    const i = S.social.favs.indexOf(id);
    if (i >= 0) { S.social.favs.splice(i, 1); toast('已取消收藏'); }
    else { S.social.favs.push(id); toast('已收藏，可在「我」页查看'); }
    persist(); render();
  },
  noteCmt() { const a = $('#cmt-anchor'); if (a) a.scrollIntoView({ behavior: 'smooth' }); },
  cmtInput() { toast('演示环境暂不支持发布评论'); },
  share() { toast('链接已复制（模拟）'); },
  follow() {
    S.follow = !S.follow;
    persist(); render();
    toast(S.follow ? '已关注木屿餐厅（虚构商家）' : '已取消关注');
  },
  swDot(el) { if (SW) { SW.idx = +el.dataset.x || 0; SW.apply(); } },
  swTap() { if (SW) SW.next(); },
  /* 下单 */
  toCheckout: el => {
    const pid = el.dataset.x;
    if (!S.co || S.co.pid !== pid) S.co = { pid, di: 0, slot: null, perk: false };
    else if (S.co.gid) delete S.co.gid;   /* 直接购买语义：清掉拼团上下文，按原价结算 */
    go('#/checkout/' + pid);
  },
  coPickDate: el => { S.co.di = +el.dataset.x; render(); },
  coPickSlot: el => { S.co.slot = el.dataset.x; render(); },
  coTogglePerk() { S.co.perk = !S.co.perk; render(); },
  coSubmit: el => {
    const p = prodById(el.dataset.x);
    if (!p || !S.co || S.co.pid !== p.id) { toast('请从套餐详情进入下单'); return; }
    if (!S.co.slot) { toast('请先选择预约日期与时段'); return; }
    if (S.co.perk && !perkSlotOk(p.perks[0], S.co.slot)) { toast('所选时段不在权益适用范围'); return; }
    /* 拼团价：仅已满员且我已参团的拼团生效；失效/未满按原价 */
    let gr = S.co.gid ? grouponById(S.co.gid) : null;
    if (gr && !(p.groupon && gr.prodId === p.id && grouponState(gr) === 'full' && grouponJoined(gr))) gr = null;
    const o = createOrder(p, ALL_DAYS[S.co.di], S.co.slot, S.co.perk, gr);
    S.co = null;
    toast(`下单成功（模拟支付 ¥${o.price}），等待商家确认`);
    go('#/order/' + o.id);
  },
  /* 订单流转（用户侧） */
  arrive: el => {
    const o = orderBy(el.dataset.id);
    if (!o) return;
    if (o.status !== 'confirmed') { toast(`当前状态「${STATUS_META[o.status].label}」不能标记到店`); return; }
    o.status = 'arrived';
    logEv('arrive', '你已到店，向店员出示核销码即可', o.id);
    persist(); render(); toast('已到店，出示核销码完成体验');
  },
  openRedeem: el => {
    const o = orderBy(el.dataset.id); if (!o) return;
    openModal(`<div class="mo-head"><span>核销码</span><span data-act="closeModal">×</span></div>
      <div class="rc-box"><div class="rc-code">${redeemCode(o.id)}</div>
      <p class="rc-tip">到店后向店员出示此码；也可在「体验凭证」页点「模拟到店核销」完成。</p>
      <div class="od-acts"><span class="od-btn pri" data-act="closeModal">知道了</span></div></div>`, 'center');
  },
  redeemAsk: el => {
    const o = orderBy(el.dataset.id); if (!o) return;
    if (o.status !== 'arrived') { toast(`当前状态「${STATUS_META[o.status].label}」不可核销`); return; }
    openModal(`<div class="mo-head"><span>到店核销</span><span data-act="closeModal">×</span></div>
      <p class="mo-text">确认到店核销「${esc(o.name)}」？核销后订单完成、不可重复核销。</p>
      <div class="od-acts"><span class="od-btn pri" data-act="doRedeem" data-id="${o.id}">确认核销</span>
      <span class="od-btn" data-act="closeModal">再想想</span></div>`, 'center');
  },
  doRedeem: el => {
    const o = orderBy(el.dataset.id); if (!o) return;
    if (o.status !== 'arrived') {
      toast(`该订单为「${STATUS_META[o.status].label}」，不可重复核销`);
      closeModal();
      return;
    }
    o.status = 'redeemed';
    if (o.perkRequested && o.perkState !== 'granted') o.perkState = 'granted';
    logEv('redeem', '已核销，体验完成', o.id);
    if (o.perkRequested) logEv('redeem', `权益「${o.perkName}」已兑现`, o.id);
    closeModal(); persist(); render();
    toast('核销完成，体验权益已兑现（如已申请）');
  },
  cancelAsk: el => {
    const o = orderBy(el.dataset.id);
    if (!o) return;
    if (!['awaiting', 'confirmed'].includes(o.status)) { toast('该订单当前状态不可取消'); return; }
    openModal(`<div class="mo-head"><span>取消订单</span><span data-act="closeModal">×</span></div>
      <p class="mo-text">确定取消「${esc(o.name)}」吗？核销前取消可模拟全额退款（虚构演示）。</p>
      <div class="od-acts"><span class="od-btn warn" data-act="doCancel" data-id="${o.id}">仍要取消</span>
      <span class="od-btn" data-act="closeModal">再想想</span></div>`, 'center');
  },
  doCancel: el => {
    const o = orderBy(el.dataset.id);
    if (!o) return;
    if (!['awaiting', 'confirmed'].includes(o.status)) { toast('该订单当前状态不可取消'); closeModal(); return; }
    o.status = 'cancelled';
    logEv('cancel', `订单已取消，模拟全额退款 ¥${o.price}`, o.id);
    closeModal(); persist(); render(); toast('已取消，模拟退款（虚构）');
  },
  /* 订单流转（商家侧演示） */
  merchantConfirm: el => {
    const o = orderBy(el.dataset.id);
    if (!o) return;
    if (o.status !== 'awaiting') { toast(`当前状态「${STATUS_META[o.status].label}」无需商家确认`); return; }
    o.status = 'confirmed';
    if (o.perkRequested && o.perkState === 'requested') o.perkState = 'locked';
    logEv('confirm', `商家已确认预约：${o.dateLabel} ${o.slot}`, o.id);
    if (o.perkRequested) logEv('confirm', `权益「${o.perkName}」已确认保留（模拟权益）`, o.id);
    persist(); render(); toast('商家已确认预约（模拟）');
  },
  sendReminder: el => {
    const o = orderBy(el.dataset.id); if (!o || o.status !== 'confirmed') return;
    logEv('reminder', `商家发送到店提醒：${o.dateLabel} ${o.slot}，请提前 10 分钟到店`, o.id);
    persist(); render(); toast('已模拟发送到店提醒，见「消息」页');
  },
  /* 改约 */
  openResched: el => {
    const o = orderBy(el.dataset.id); if (!o || o.resched >= 2) return;
    const p = prodById(o.pid);
    S.rs = { oid: o.id, di: 0, slot: null };
    openModal(`<div class="mo-head"><span>改约</span><span data-act="closeModal">×</span></div>
      <div class="rs-cur">当前：${esc(o.dateLabel)} ${o.slot}${o.perkRequested ? ' · 已含权益申请' : ''}<br>本单还可改约 ${2 - o.resched} 次，改约后需商家重新确认。</div>
      <div class="co-sec-title">选择新日期</div>
      <div class="date-row">${ALL_DAYS.map((d, i) =>
        `<span class="dc rs-dc${i === 0 ? ' on' : ''}" data-act="rsPickDate" data-x="${i}"><i>${d.short}</i><em>${d.week}</em></span>`).join('')}</div>
      <div class="co-sec-title">选择新时段</div>
      ${(p ? p.slotGroups : []).map(g => `<div class="sg-title">${esc(g.name)}</div>
        <div class="slot-row">${g.times.map(t => {
          const so = p && p.soldOut.includes(t);
          return `<span class="sc${so ? ' so' : ''}" ${so ? '' : `data-act="rsPickSlot" data-x="${t}"`}>${t}${so ? ' 售罄' : ''}</span>`;
        }).join('')}</div>`).join('')}
      <div id="rs-warn"></div>
      <div class="od-acts"><span class="od-btn pri" data-act="rsSubmit" data-id="${o.id}">确认改约</span></div>`);
  },
  rsPickDate: el => {
    if (!S.rs) return;
    S.rs.di = +el.dataset.x;
    $$('.rs-dc').forEach(d => d.classList.remove('on'));
    el.classList.add('on');
  },
  rsPickSlot: el => {
    if (!S.rs) return;
    S.rs.slot = el.dataset.x;
    $$('.modal-card .sc').forEach(s => s.classList.remove('on'));
    el.classList.add('on');
    const o = orderBy(S.rs.oid);
    const p = o ? prodById(o.pid) : null;
    const warn = $('#rs-warn');
    if (warn && o && o.perkRequested && p && p.perks[0] && !perkSlotOk(p.perks[0], el.dataset.x)) {
      warn.innerHTML = `<div class="co-warn">⚠ 新时段不在权益适用范围（${esc(p.perks[0].window)}），权益能否保留以商家确认为准</div>`;
    } else if (warn) warn.innerHTML = '';
  },
  rsSubmit: el => {
    const o = orderBy(el.dataset.id);
    if (!o || !S.rs || !S.rs.slot) { toast('请先选择新时段'); return; }
    if (o.resched >= 2) { toast('已达改约上限（2 次）'); return; }
    o.dateTs = ALL_DAYS[S.rs.di].ts;
    o.dateLabel = ALL_DAYS[S.rs.di].label;
    o.slot = S.rs.slot;
    o.status = 'awaiting';
    o.resched++;
    if (o.perkRequested && o.perkState === 'locked') o.perkState = 'requested';
    logEv('resched', `已改约至 ${o.dateLabel} ${o.slot}（第 ${o.resched}/2 次），等待商家重新确认`, o.id);
    S.rs = null;
    closeModal(); persist(); render();
    toast('已改约，等待商家重新确认');
  },
  /* 评价反馈 */
  rate: el => { S.rate = +el.dataset.x || 0; render(); },
  fbTag: el => {
    const t = el.dataset.x;
    const i = S.fbTags.indexOf(t);
    if (i >= 0) S.fbTags.splice(i, 1); else S.fbTags.push(t);
    render();
  },
  submitFeedback: el => {
    const o = orderBy(el.dataset.id); if (!o) return;
    if (!S.rate && !S.fbTags.length && !S.fbText.trim()) { toast('先打个分或选个标签吧'); return; }
    o.rated = true;
    o.fb = { rate: S.rate, tags: S.fbTags.slice(), text: S.fbText.trim() };
    logEv('rate', `完成评价${S.rate ? ' · ' + S.rate + ' 星' : ''}${S.fbTags.length ? ' · ' + S.fbTags.join('、') : ''}`, o.id);
    S.rate = 0; S.fbTags = []; S.fbText = '';
    persist(); render(); toast('感谢反馈（仅本地保存）');
  },
  closeModal: () => closeModal(),
  modalBackdrop: (el, e) => { if (e && e.target === el) closeModal(); },
  /* AI 同款匹配 */
  aiMatch: el => { S.ai = null; go('#/aimatch/' + el.dataset.id); },
  aiSwitch: el => { if (S.ai) { S.ai.cursor = +el.dataset.x || 0; render(); } },
  aiSwitchNext() {
    if (!S.ai) return;
    const n = noteById(S.ai.noteId); if (!n) return;
    const total = DATA.products.filter(p => p.cat === n.cat).length;
    if (total) { S.ai.cursor = (S.ai.cursor + 1) % total; render(); }
  },
  aiReset: el => { S.ai = { noteId: el.dataset.id, needs: aiExtractNeeds(noteById(el.dataset.id)), cursor: 0 }; render(); },
  /* 同好活动：发起 / 报名 / 退出 / 解散 / 分享（报名与商品订单分开记录） */
  actForm: el => {
    const n = noteById(el.dataset.x);
    if (!n) { toast('笔记不存在（演示数据）'); return; }
    if (!n.actOK) { toast('这篇笔记暂不适合发起活动'); return; }
    openActFormModal(n, null);
  },
  /* 组合链路：从拼团详情「开找搭子」— 活动创建后与该拼团互相关联 */
  actFormFromG: el => {
    const g = grouponById(el.dataset.x);
    if (!g) { toast('拼团不存在（演示数据）'); return; }
    if (g.actId && S.acts.some(a => a.id === g.actId)) { toast('这团已经有找搭子活动了'); go('#/act/' + g.actId); return; }
    const src = actSrcNoteOf(prodById(g.prodId));
    if (!src) { toast('这个体验暂时没有适合发起找搭子的笔记（演示数据）'); return; }
    openActFormModal(src, g.id);
  },
  actSubmit() {
    if (!S.ac) return;
    const n = noteById(S.ac.noteId);
    if (!n || !n.actOK) { toast('发起失败：笔记不可发起活动'); return; }
    const val = id => { const el = $(id); return el ? String(el.value || '').trim() : ''; };
    const theme = val('#ac-theme');
    if (!theme) { toast('请填写活动主题'); return; }
    const time = val('#ac-time');
    if (!time) { toast('请填写集合时间'); return; }
    const capRaw = parseInt(val('#ac-cap'), 10);
    const cap = Math.min(20, Math.max(2, capRaw || 6));
    const cost = val('#ac-cost') || (n.productId ? '各自下单同款套餐（价格见商品页，虚构演示）' : 'AA 自理 · 现场各自结算');
    const dlEl = $('#ac-dl');
    const dl = dlEl && /^\d{4}-\d{2}-\d{2}$/.test(dlEl.value) ? dlEl.value : actDlStr(3);
    const rules = val('#ac-rules') || '发起人补充中';
    /* 组合链路：发起时带了 groupId → 与该拼团建立双向关联（仍需对方未关联） */
    let gid = S.ac.groupId || null;
    const gLink = gid ? grouponById(gid) : null;
    if (gid && (!gLink || gLink.actId)) gid = null;
    const act = {
      id: 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      noteId: n.id, prodId: n.productId || null,
      theme: theme.slice(0, 40), time: time.slice(0, 40), cap, cost: cost.slice(0, 80), dl, rules: rules.slice(0, 200),
      host: { nick: '我', hue: 6 },
      members: [{ nick: '我', hue: 6, self: true }],
      mine: true, t: Date.now(),
      groupId: gid,
    };
    S.acts.push(act);
    if (gid) gLink.actId = act.id;
    persist();
    closeModal();
    logEv('act', `发起同好活动 · ${theme} · 上限${cap}人${gid ? ' · 已关联拼团「' + gLink.note + '」（报名不产生订单、不计成团数）' : ''}`);
    toast(gid ? '活动已发起并关联到拼团（演示）' : '活动已发起（演示数据，仅存本机）');
    go('#/act/' + act.id);
  },
  actJoin: el => {
    const a = actById(el.dataset.x);
    if (!a) return;
    const st = actState(a);
    if (st === 'closed') { toast('报名已截止，下次早点来'); return; }
    if (st === 'full') { toast('活动已满员（' + a.cap + '/' + a.cap + '）'); return; }
    if (actJoined(a)) { toast('你已报名过这场活动了'); return; }
    a.members.push({ nick: '我', hue: 6, self: true });
    persist(); render();
    logEv('act', `报名「${a.theme}」· 当前 ${a.members.length}/${a.cap} 人`);
    toast(`已报名 · 当前 ${a.members.length}/${a.cap} 人（演示，不产生订单）`);
  },
  actLeave: el => {
    const a = actById(el.dataset.x);
    if (!a) return;
    if (a.mine) { toast('你是发起人，如需取消请「解散活动」'); return; }
    const i = a.members.findIndex(m => m.self);
    if (i < 0) { toast('你尚未报名这场活动'); return; }
    a.members.splice(i, 1);
    persist(); render();
    logEv('act', `退出「${a.theme}」· 当前 ${a.members.length}/${a.cap} 人`);
    toast('已退出报名，空位已释放');
  },
  actCancel: el => {
    const a = actById(el.dataset.x);
    if (!a) return;
    if (!a.mine) { toast('只有发起人可以解散活动'); return; }
    /* 组合链路：解散活动时同步解除拼团侧的关联（拼团本身不受影响） */
    if (a.groupId) {
      const g = grouponById(a.groupId);
      if (g && g.actId === a.id) g.actId = null;
    }
    const i = S.acts.findIndex(x => x.id === a.id);
    if (i >= 0) S.acts.splice(i, 1);
    persist(); render();
    logEv('act', `解散「${a.theme}」`);
    toast('已解散活动并通知成员（演示）');
  },
  actShare: el => {
    const a = actById(el.dataset.x);
    if (!a) return;
    const link = location.href.split('#')[0] + '#/act/' + a.id;
    const show = () => openModal(`<div class="mo-head"><span>分享活动 · ${esc(a.theme)}</span><span data-act="closeModal">×</span></div>
      <div class="mo-text">演示功能：不产生真实分享。可手动复制下面的活动链接 ——</div>
      <div class="bd-field"><input class="bd-input" id="ac-link" readonly value="${esc(link)}"></div>
      <div class="od-acts"><span class="od-btn pri" data-act="actCopy" data-x="${esc(link)}">复制链接（演示）</span></div>`);
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(link).then(() => toast('活动链接已复制（演示）')).catch(show);
      } else { show(); }
    } catch (e) { show(); }
  },
  actCopy: el => {
    const link = el.dataset.x || '';
    const input = $('#ac-link');
    if (input) { input.select && input.select(); }
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(link).then(() => { closeModal(); toast('活动链接已复制（演示）'); }).catch(() => toast('复制失败，请手动长按复制'));
        return;
      }
      if (document.execCommand && input) { document.execCommand('copy'); closeModal(); toast('活动链接已复制（演示）'); return; }
      toast('当前环境不支持自动复制，请手动长按复制');
    } catch (e) { toast('复制失败，请手动长按复制'); }
  },
  /* ---------- 同好拼团动作 ---------- */
  grouponForm: el => {
    const p = prodById(el.dataset.x);
    if (!p || !p.groupon) { toast('这个体验暂不支持拼团'); return; }
    /* 同一商品同一时间只允许参加一个拼团（防重复占位） */
    const busy = grouponsOf(p.id).find(x => grouponJoined(x) && grouponState(x) === 'open');
    if (busy) {
      toast(`你已在这个体验的拼团里，先去邀请同好吧`);
      go('#/groupon/' + busy.id);
      return;
    }
    openModal(`<div class="mo-head"><span>发起拼团 · ${esc(p.name.slice(0, 16))}</span><span data-act="closeModal">×</span></div>
      <div class="mo-text">拼团是多人一起买同款体验：成团解锁拼团价，不参团也可随时按原价直接预约。演示数据仅存本机，不产生真实交易。</div>
      <div class="gr-confirm-card">
        <div><b>成团人数</b><span>${p.groupon.size} 人（发起后你算第 1 位，还差 ${p.groupon.size - 1} 人）</span></div>
        <div><b>拼团价</b><span>¥${p.groupon.price}/人（单买 ¥${p.price}，演示价）</span></div>
        <div><b>成团窗口</b><span>发起后 ${p.groupon.dlHours} 小时内凑满，超时未成团自动结束</span></div>
        ${p.groupon.perk ? `<div><b>成团权益</b><span>🎁 ${esc(p.groupon.perk)}</span></div>` : ''}
      </div>
      ${(() => {
        const tp = grouponTopicsOf(p);
        if (!tp.length) return '';
        return `<div class="bd-field"><div class="bd-fl">本次体验主题（选一个）</div>
          <div class="gt-chips" id="gf-topics">${tp.map(t => `<span class="gt-chip" data-act="gfTopic" data-x="${esc(t.name)}" data-d="${esc(t.desc)}">${esc(t.name)}</span>`).join('')}</div>
          <div class="gt-hint" id="gf-topic-hint">选了主题，同好一眼知道这团玩什么；不选就按通用拼团走</div></div>`;
      })()}
      <div class="bd-field"><div class="bd-fl">拼团宣言（选填）</div><input id="gf-note" class="bd-input" maxlength="40" placeholder="如：周末下午场优先，凑一台一起玩"></div>
      ${(() => {
        /* 组合链路：有组局源笔记（actOK）才提供「同时找搭子」开关，可选不强制 */
        const sn = actSrcNoteOf(p);
        if (!sn) return '';
        return `<div class="gf-combo" id="gf-combo" data-act="gfCombo" role="checkbox" aria-checked="false">
          <div class="gf-combo-box"><span class="gf-combo-dot"></span></div>
          <div class="gf-combo-txt"><b>同时发起「找搭子」</b><span>约有兴趣的同好提前组队，报名不产生订单、不占拼团名额；不勾选则只拼团</span></div>
        </div>
        <div class="gf-combo-extra" id="gf-combo-extra" style="display:none">
          <div class="bd-field"><div class="bd-fl">集合时间（勾选后必填）</div><input id="gf-act-time" class="bd-input" maxlength="40" placeholder="如：周六 14:00 集合"></div>
          <div class="bd-field"><div class="bd-fl">搭子小约定（选填）</div><textarea id="gf-act-rules" class="bd-input" rows="2" maxlength="200" placeholder="如：都玩过一次了，新人也带；费用各付各的"></textarea></div>
        </div>`;
      })()}
      <div class="od-acts"><span class="od-btn pri" data-act="grouponSubmit" data-x="${p.id}">确认发起（演示）</span></div>`);
  },
  /* 发起弹窗内：组合开关切换（找搭子为可选项，默认不开） */
  gfCombo: el => {
    const on = !el.classList.contains('on');
    el.classList.toggle('on', on);
    el.setAttribute('aria-checked', on ? 'true' : 'false');
    const extra = $('#gf-combo-extra');
    if (extra) extra.style.display = on ? '' : 'none';
  },
  /* 发起弹窗内：体验主题单选（点选高亮 + 提示说明切换，再点一次可取消） */
  gfTopic: el => {
    const on = el.classList.contains('on');
    el.parentElement.querySelectorAll('.gt-chip').forEach(c => c.classList.remove('on'));
    if (!on) el.classList.add('on');
    const hint = $('#gf-topic-hint');
    if (hint) hint.textContent = on ? '不选就按通用拼团走' : (el.dataset.d || '');
  },
  grouponSubmit: el => {
    const p = prodById(el.dataset.x);
    if (!p || !p.groupon) { toast('发起失败：该体验不支持拼团'); return; }
    const busy = grouponsOf(p.id).find(x => grouponJoined(x) && grouponState(x) === 'open');
    if (busy) { closeModal(); toast('你已在这个体验的拼团中'); go('#/groupon/' + busy.id); return; }
    const input = $('#gf-note');
    const note = (input ? String(input.value || '') : '').trim().slice(0, 40);
    const chip = $('#gf-topics .gt-chip.on');
    const topic = chip ? String(chip.dataset.x || '').trim().slice(0, 20) : '';
    /* 组合链路：勾了「同时找搭子」→ 校验集合时间，之后一并创建关联活动 */
    const comboEl = $('#gf-combo');
    const combo = !!(comboEl && comboEl.classList.contains('on'));
    const sn = actSrcNoteOf(p);
    let actTime = '';
    if (combo) {
      if (!sn || !sn.actOK) { toast('该体验暂不支持组合找搭子，先只发拼团'); }
      else {
        actTime = ($('#gf-act-time') ? String($('#gf-act-time').value || '') : '').trim().slice(0, 40);
        if (!actTime) { toast('勾了「同时找搭子」：请先填集合时间'); return; }
      }
    }
    const g = {
      id: 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
      prodId: p.id, fromNoteId: p.sourceNoteId || null,
      note: note || (topic ? `${topic} · ${p.name.slice(0, 10)}` : p.name.slice(0, 18) + ' 拼团'),
      topic: topic,
      dlTs: Date.now() + p.groupon.dlHours * 3600000,
      host: { nick: '我', hue: 6 },
      members: [{ nick: '我', hue: 6, self: true }],
      mine: true, t: Date.now(),
    };
    S.groupons.push(g);
    let act = null;
    if (combo && sn && sn.actOK && actTime) {
      /* 找搭子活动独立于拼团：报名不产生订单、不计入成团人数；容量 = 成团数 + 2（拼上的优先，想同去的也可报） */
      act = {
        id: 'ua' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
        noteId: sn.id, prodId: p.id,
        theme: (topic ? topic + ' · ' : '') + '拼团同行搭子',
        time: actTime,
        cap: Math.min(20, p.groupon.size + 2),
        cost: `拼团价 ¥${p.groupon.price}/人 · 搭子间费用各付各的（演示口径）`,
        rules: ($('#gf-act-rules') ? String($('#gf-act-rules').value || '').trim().slice(0, 200) : '') || '报名搭子只是约同行，付款/预约仍走各自订单（演示）',
        host: { nick: '我', hue: 6 },
        members: [{ nick: '我', hue: 6, self: true }],
        mine: true, t: Date.now(),
        groupId: g.id,   /* 双向链的另一半在下方补上 */
      };
      const actN = actNorm(act);
      if (actN) { S.acts.push(actN); act = actN; g.actId = act.id; }
    }
    persist();
    closeModal();
    logEv('groupon', `发起拼团「${g.note}」${topic ? ' · 主题 ' + topic : ''} · ${p.groupon.size} 人成团 · 拼团价 ¥${p.groupon.price}（演示）`);
    if (act) {
      logEv('act', `同步发起找搭子「${act.theme}」· ${actTime} · 报名不产生订单、不计成团数（演示）`);
      toast(`拼团 + 找搭子一起发起 · 搭子 ${actTime} 集合（演示）`);
    } else {
      toast(`拼团已发起${topic ? ' · ' + topic : ''} · ${p.groupon.dlHours} 小时内凑 ${p.groupon.size} 人成团（演示）`);
    }
    go('#/groupon/' + g.id);
  },
  grouponJoin: el => {
    const g = grouponById(el.dataset.x);
    if (!g) return;
    const p = prodById(g.prodId);
    if (!p || !p.groupon) { toast('拼团数据异常（演示）'); return; }
    const st = grouponState(g);
    if (st === 'fail') { toast('这个拼团已过期未成团，可以发起一个新的'); return; }
    if (st === 'full') { toast('这个拼团已成团（' + g.members.length + '/' + p.groupon.size + '）'); return; }
    if (grouponJoined(g)) { toast('你已在这个拼团里了'); return; }
    if (g.members.length >= p.groupon.size) { toast('拼团已满员'); return; }
    g.members.push({ nick: '我', hue: 6, self: true });
    const nowFull = g.members.length >= p.groupon.size;
    if (nowFull) g.fullAt = Date.now();
    persist(); render();
    if (nowFull) {
      logEv('groupon', `拼成团！「${g.note}」${g.members.length}/${p.groupon.size} 人 · 可按拼团价 ¥${p.groupon.price} 预约（演示）`);
      toast(`🎉 拼成团了！可按拼团价 ¥${p.groupon.price} 去预约（演示）`);
    } else {
      logEv('groupon', `加入拼团「${g.note}」· 当前 ${g.members.length}/${p.groupon.size} 人，还差 ${p.groupon.size - g.members.length} 人`);
      toast(`已参团 · 还差 ${p.groupon.size - g.members.length} 人成团（参团 ≠ 付款，演示）`);
    }
    /* 组合链路：这团若带关联找搭子活动，可顺手报名（报名不产生订单、不占成团名额），可跳过 */
    const act = g.actId ? S.acts.find(a => a.id === g.actId) : null;
    if (act && actState(act) === 'open' && !actJoined(act)) {
      openModal(`<div class="mo-head"><span>这团还带了找搭子活动</span><span data-act="closeModal">×</span></div>
        <p class="mo-text">「${esc(act.theme)}」· ${esc(act.time)} · 当前 ${act.members.length}/${act.cap} 人。报名只是约同行搭子：<b>不产生订单、不算成团人数</b>，付款仍走各自预约。</p>
        <div class="od-acts">
          <span class="od-btn" data-act="closeModal">先只拼团</span>
          <span class="od-btn pri" data-act="comboActJoin" data-x="${esc(act.id)}">同时报名搭子（演示）</span>
        </div>`);
    }
  },
  /* 组合确认弹窗：复用 actJoin 报名关联的找搭子活动 */
  comboActJoin: el => {
    const act = S.acts.find(a => a.id === el.dataset.x);
    closeModal();
    if (!act) { toast('找搭子活动已失效'); return; }
    ACTIONS.actJoin({ dataset: { x: act.id } });
  },
  grouponLeave: el => {
    const g = grouponById(el.dataset.x);
    if (!g) return;
    if (g.mine) { toast('你是发起人，如需取消请点「解散」'); return; }
    const st = grouponState(g);
    if (st === 'full') { toast('拼团已成团，成员资格已锁定（演示口径），如不预约按原价即可'); return; }
    const i = g.members.findIndex(m => m.self);
    if (i < 0) { toast('你尚未加入这个拼团'); return; }
    g.members.splice(i, 1);
    persist(); render();
    logEv('groupon', `退出拼团「${g.note}」· 当前 ${g.members.length}/${(prodById(g.prodId).groupon || {}).size} 人`);
    toast('已退出拼团，名额已释放');
  },
  grouponCancelAsk: el => {
    const g = grouponById(el.dataset.x);
    if (!g) return;
    if (!g.mine) { toast('只有发起人可以解散拼团'); return; }
    const p = prodById(g.prodId);
    const st = grouponState(g);
    openModal(`<div class="mo-head"><span>解散拼团</span><span data-act="closeModal">×</span></div>
      <p class="mo-text">确定解散「${esc(g.note)}」？${st === 'full'
        ? `拼团已成团（${g.members.length}/${p.groupon.size} 人），解散后成员的拼团价资格一并作废（演示）。`
        : `已参团的 ${g.members.length - 1} 位同好会收到通知（演示）。`}</p>
      <div class="od-acts">
        <span class="od-btn" data-act="closeModal">再想想</span>
        <span class="od-btn warn" data-act="grouponDoCancel" data-x="${g.id}">确认解散</span>
      </div>`);
  },
  grouponDoCancel: el => {
    const g = grouponById(el.dataset.x);
    if (!g || !g.mine) { toast('只有发起人可以解散拼团'); return; }
    const p = prodById(g.prodId);
    /* 组合链路：解散拼团时同步解除关联搭子活动的拼团侧引用（活动可继续独立报名） */
    if (g.actId) {
      const a = S.acts.find(x => x.id === g.actId);
      if (a && a.groupId === g.id) a.groupId = null;
    }
    const i = S.groupons.findIndex(x => x.id === g.id);
    if (i >= 0) S.groupons.splice(i, 1);
    persist();
    closeModal();
    logEv('groupon', `解散拼团「${g.note}」· 成员资格与拼团价一并作废（演示）`);
    toast('已解散拼团并通知成员（演示）');
    go('#/product/' + (g.prodId || (p && p.id) || ''));
  },
  grouponShare: el => {
    const g = grouponById(el.dataset.x);
    if (!g) return;
    const link = location.href.split('#')[0] + '#/groupon/' + g.id;
    const show = () => openModal(`<div class="mo-head"><span>分享拼团 · ${esc(g.note)}</span><span data-act="closeModal">×</span></div>
      <div class="mo-text">演示功能：不产生真实分享。可手动复制下面的拼团链接 ——</div>
      <div class="bd-field"><input class="bd-input" id="gf-link" readonly value="${esc(link)}"></div>
      <div class="od-acts"><span class="od-btn pri" data-act="grouponCopy" data-x="${esc(link)}">复制链接（演示）</span></div>`);
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(link).then(() => toast('拼团链接已复制（演示）')).catch(show);
      } else { show(); }
    } catch (e) { show(); }
  },
  grouponCopy: el => {
    const link = el.dataset.x || '';
    const input = $('#gf-link');
    if (input) { input.select && input.select(); }
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(link).then(() => { closeModal(); toast('拼团链接已复制（演示）'); }).catch(() => toast('复制失败，请手动长按复制'));
        return;
      }
      if (document.execCommand && input) { document.execCommand('copy'); closeModal(); toast('拼团链接已复制（演示）'); return; }
      toast('当前环境不支持自动复制，请手动长按复制');
    } catch (e) { toast('复制失败，请手动长按复制'); }
  },
  grouponBook: el => {
    const g = grouponById(el.dataset.x);
    if (!g) return;
    const p = prodById(g.prodId);
    if (!p || !p.groupon) { toast('该体验已下线拼团（演示）'); return; }
    if (grouponState(g) !== 'full') { toast('拼团未成团，暂不能按拼团价预约'); return; }
    if (!grouponJoined(g)) { toast('你没有参团，无法使用这个拼团价'); return; }
    if (S.orders.some(o => o.gid === g.id && o.status !== 'cancelled')) { toast('你已经用这个拼团下过单了（演示限 1 单）'); return; }
    S.co = { pid: p.id, gid: g.id, di: 0, slot: null, perk: false };
    go('#/checkout/' + p.id);
  },
};

document.addEventListener('click', e => {
  /* 先查 data-act（如链接内部的「解散/退出」小按钮），再走锚点导航 */
  const el = e.target.closest('[data-act]');
  if (el) {
    const fn = ACTIONS[el.dataset.act];
    if (fn) {
      e.preventDefault();
      try { fn(el, e); }
      catch (err) {
        console.error('[action:' + el.dataset.act + ']', err);
        toast('操作异常：' + (err && err.message ? err.message : '未知错误'));
      }
      return;
    }
  }
  const a = e.target.closest('a[href^="#"]');
  if (a) { e.preventDefault(); go(a.getAttribute('href')); }
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t && t.id === 'search-input') {
    S.search.input = t.value;
    S.search.submitted = false;
    const body = $('#search-body');
    if (body) body.innerHTML = searchBodyHtml();
    const c = $('#se-clear');
    if (c) c.classList.toggle('hide', !t.value);
    return;
  }
  if (t && t.id === 'fb-text') { S.fbText = t.value; return; }
  /* AI 匹配页：需求下拉即时生效 */
  if (t && t.classList && t.classList.contains('ai-select') && S.ai) {
    const i = +t.dataset.i;
    const nd = S.ai.needs[i];
    const n = noteById(S.ai.noteId);
    if (nd && n) {
      const f = (AI_NEEDS[n.cat] || []).find(x => x.key === nd.key);
      const opt = f ? f.pick.find(([re, val]) => val === t.value) : null;
      S.ai.needs[i] = opt ? { key: nd.key, label: nd.label, value: t.value, probes: opt[2] }
        : { key: nd.key, label: nd.label, value: t.value, probes: [] };
    }
    return;
  }
  if (t && t.id && t.id.startsWith('bd-')) { /* 搭子弹层输入，无需实时处理 */ }
});
document.addEventListener('change', e => {
  const t = e.target;
  if (t && t.classList && t.classList.contains('ai-select') && S.ai) {
    const i = +t.dataset.i;
    const nd = S.ai.needs[i];
    const n = noteById(S.ai.noteId);
    if (nd && n) {
      const f = (AI_NEEDS[n.cat] || []).find(x => x.key === nd.key);
      const opt = f ? f.pick.find(([re, val]) => val === t.value) : null;
      S.ai.needs[i] = opt ? { key: nd.key, label: nd.label, value: t.value, probes: opt[2] }
        : { key: nd.key, label: nd.label, value: t.value, probes: [] };
      render();
    }
  }
});
document.addEventListener('keydown', e => {
  if (e.target && e.target.id === 'search-input' && e.key === 'Enter') runSearch(e.target.value);
});
window.addEventListener('hashchange', () => {
  S.route = parseHash();
  onPageEnter();
  render();
});
window.addEventListener('error', e => {
  try { toast('脚本错误：' + (e && e.message ? e.message : '未知')); } catch (x) { /* 忽略 */ }
  console.error('[shuyu]', e && e.error ? e.error : e);
});

/* ---------- 启动 ---------- */
restore();
S.route = parseHash();
onPageEnter();
render();
console.log('[薯约] v9 已启动（多品类 + AI 同款匹配 + 同好活动 + 同好拼团版）');
