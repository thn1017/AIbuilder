/* ============ 薯约 Demo · 模拟数据（全部虚构） ============ */
'use strict';

/* ---------- 插画封面（内联 SVG，避免外链图片加载失败） ---------- */
const COVER = {};

COVER.pasta = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="松露意面插画">
  <defs>
    <linearGradient id="pa-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f9f0e4"/><stop offset="1" stop-color="#f0e1cb"/>
    </linearGradient>
    <radialGradient id="pa-plate" cx="0.5" cy="0.38" r="0.75">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#efe5d6"/>
    </radialGradient>
    <radialGradient id="pa-pasta" cx="0.5" cy="0.42" r="0.7">
      <stop offset="0" stop-color="#efc463"/><stop offset="1" stop-color="#d5982f"/>
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#pa-bg)"/>
  <circle cx="58" cy="44" r="26" fill="#f2d9b6" opacity="0.7"/>
  <circle cx="352" cy="70" r="14" fill="#eeddc2" opacity="0.8"/>
  <circle cx="336" cy="256" r="38" fill="#ebd6ba" opacity="0.6"/>
  <path d="M0 234 Q 100 210 200 226 T 400 218 L 400 300 L 0 300 Z" fill="#d9c19c" opacity="0.5"/>
  <g>
    <ellipse cx="86" cy="216" rx="22" ry="6" fill="#c7b18d" opacity="0.7"/>
    <path d="M72 190 h28 v18 a14 10 0 0 1 -28 0 Z" fill="#fffdf8" stroke="#e7dbc6"/>
    <path d="M100 194 q11 4 0 13" fill="none" stroke="#e7dbc6" stroke-width="3"/>
    <path d="M79 184 q3 -6 0 -11 M88 184 q3 -6 0 -11" stroke="#d3bd99" stroke-width="2" fill="none" opacity="0.8"/>
  </g>
  <ellipse cx="212" cy="216" rx="114" ry="46" fill="#c7b18d" opacity="0.45"/>
  <ellipse cx="212" cy="206" rx="106" ry="42" fill="url(#pa-plate)"/>
  <ellipse cx="212" cy="202" rx="82" ry="32" fill="#f6efe3"/>
  <ellipse cx="212" cy="197" rx="58" ry="24" fill="url(#pa-pasta)"/>
  <path d="M172 197 q10 -17 27 -15 q19 2 21 16 q2 15 -15 17 q-19 2 -27 -9" fill="none" stroke="#c4842a" stroke-width="4" opacity="0.65"/>
  <path d="M188 190 q13 -11 29 -6 q12 4 8 15" fill="none" stroke="#c4842a" stroke-width="3" opacity="0.6"/>
  <path d="M190 203 q15 8 31 2" fill="none" stroke="#b6760f" stroke-width="3" opacity="0.55"/>
  <ellipse cx="197" cy="186" rx="5" ry="2.6" fill="#453729" transform="rotate(-14 197 186)"/>
  <ellipse cx="226" cy="192" rx="5" ry="2.6" fill="#453729" transform="rotate(12 226 192)"/>
  <ellipse cx="213" cy="205" rx="5" ry="2.6" fill="#453729" transform="rotate(28 213 205)"/>
  <ellipse cx="236" cy="202" rx="4" ry="2" fill="#453729" transform="rotate(-8 236 202)"/>
  <path d="M181 188 q-9 -6 -4 -13 q8 2 8 13" fill="#7fae62"/>
  <path d="M240 197 q9 -4 7 -11 q-9 0 -7 11" fill="#8cbb6c"/>
  <g stroke="#c6bba8" stroke-width="3.2" fill="none" stroke-linecap="round">
    <path d="M302 178 l13 42"/>
    <path d="M294 171 q3 9 5 16"/>
    <path d="M302 169 q1 9 3 18"/>
    <path d="M310 171 q0 9 2 16"/>
  </g>
  <path d="M188 150 q4 -10 0 -18 M212 148 q4 -10 0 -18 M236 152 q4 -10 0 -18" stroke="#fff" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round"/>
</svg>`;

COVER.tiramisu = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="开心果提拉米苏插画">
  <defs>
    <linearGradient id="ti-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f9efe6"/><stop offset="1" stop-color="#f1ddcc"/>
    </linearGradient>
    <linearGradient id="ti-glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f6ead2"/><stop offset="0.42" stop-color="#c8a06a"/><stop offset="0.45" stop-color="#8a5a33"/><stop offset="0.75" stop-color="#c8a06a"/><stop offset="1" stop-color="#8a5a33"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#ti-bg)"/>
  <circle cx="330" cy="52" r="22" fill="#f0dcc4" opacity="0.8"/>
  <circle cx="52" cy="252" r="34" fill="#ecdbc6" opacity="0.6"/>
  <path d="M0 238 Q 120 216 240 232 T 400 222 L 400 300 L 0 300 Z" fill="#d9c3a0" opacity="0.5"/>
  <g>
    <path d="M84 196 q-4 -34 6 -52 q12 14 6 52 q-6 10 -12 0 Z" fill="#7fae62"/>
    <path d="M70 188 q-14 -22 -6 -40 q10 12 12 40 Z" fill="#8cbb6c"/>
    <circle cx="80" cy="206" r="7" fill="#c4847c"/>
    <circle cx="94" cy="210" r="5" fill="#e0a9a3"/>
  </g>
  <ellipse cx="212" cy="224" rx="66" ry="14" fill="#c7b18d" opacity="0.5"/>
  <ellipse cx="212" cy="218" rx="56" ry="10" fill="#fffdf6"/>
  <path d="M170 116 h84 l-8 96 h-68 Z" fill="url(#ti-glass)" opacity="0.96"/>
  <path d="M170 116 h84 l-8 96 h-68 Z" fill="none" stroke="#e2d3ba"/>
  <ellipse cx="212" cy="116" rx="42" ry="11" fill="#f4e8d0"/>
  <ellipse cx="212" cy="113" rx="42" ry="10" fill="#f9f1de"/>
  <circle cx="196" cy="110" r="2.6" fill="#9bbf6a"/>
  <circle cx="212" cy="108" r="2.6" fill="#9bbf6a"/>
  <circle cx="228" cy="111" r="2.6" fill="#9bbf6a"/>
  <circle cx="204" cy="115" r="2.2" fill="#8cbb6c"/>
  <circle cx="222" cy="116" r="2.2" fill="#8cbb6c"/>
  <path d="M188 132 q24 -8 48 0" stroke="#6f4526" stroke-width="3" fill="none" opacity="0.5"/>
  <path d="M188 172 q24 -8 48 0" stroke="#6f4526" stroke-width="3" fill="none" opacity="0.5"/>
  <g stroke="#c9bda8" stroke-width="3.4" fill="none" stroke-linecap="round">
    <path d="M282 118 l-10 84"/>
    <path d="M276 110 q8 3 4 14"/>
  </g>
  <circle cx="212" cy="100" r="3" fill="#fff" opacity="0.9"/>
  <circle cx="230" cy="94" r="2" fill="#fff" opacity="0.8"/>
</svg>`;

COVER.drink = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="特调饮品插画">
  <defs>
    <linearGradient id="dr-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f8eee2"/><stop offset="1" stop-color="#efdcc6"/>
    </linearGradient>
    <linearGradient id="dr-juice" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4a259"/><stop offset="0.55" stop-color="#e8734a"/><stop offset="1" stop-color="#c74b3c"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#dr-bg)"/>
  <circle cx="64" cy="52" r="20" fill="#f0d9b8" opacity="0.75"/>
  <circle cx="348" cy="248" r="30" fill="#ecd9bc" opacity="0.6"/>
  <path d="M0 240 Q 120 220 260 234 T 400 226 L 400 300 L 0 300 Z" fill="#d9c3a0" opacity="0.5"/>
  <ellipse cx="204" cy="236" rx="52" ry="10" fill="#c7b18d" opacity="0.45"/>
  <ellipse cx="204" cy="230" rx="44" ry="8" fill="#fffdf6"/>
  <path d="M176 96 h56 l-6 128 h-44 Z" fill="url(#dr-juice)"/>
  <path d="M176 96 h56 l-6 128 h-44 Z" fill="none" stroke="#e3cfae"/>
  <path d="M178 96 q-2 130 6 128" stroke="#fff" stroke-width="4" fill="none" opacity="0.28"/>
  <circle cx="192" cy="180" r="3.4" fill="#ffd9b0" opacity="0.85"/>
  <circle cx="212" cy="150" r="2.6" fill="#ffd9b0" opacity="0.7"/>
  <circle cx="206" cy="196" r="2.4" fill="#ffd9b0" opacity="0.7"/>
  <circle cx="196" cy="118" r="15" fill="#f6b93b" stroke="#e8963f" stroke-width="2"/>
  <path d="M181 118 a15 15 0 0 0 30 0 Z" fill="#f0975a" opacity="0.7"/>
  <g stroke="#d97b8b" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M228 62 l-6 84"/>
  </g>
  <path d="M226 66 q10 4 12 12" fill="#cfa9d8" opacity="0.85"/>
  <path d="M232 72 q16 -8 8 -18 q-14 2 -8 18 Z" fill="#9bbf6a"/>
  <g>
    <path d="M300 214 h34 v6 h-34 Z" fill="#fffdf6" stroke="#e7dbc6"/>
    <path d="M334 190 q12 10 0 30" fill="none" stroke="#e7dbc6" stroke-width="3.5"/>
    <path d="M306 186 q3 -6 0 -10 M315 186 q3 -6 0 -10 M324 186 q3 -6 0 -10" stroke="#d3bd99" stroke-width="2" fill="none" opacity="0.8"/>
  </g>
  <path d="M188 84 q3 -8 0 -14 M206 82 q3 -8 0 -14" stroke="#fff" stroke-width="2.6" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`;

COVER.window = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="窗边双人位插画">
  <defs>
    <linearGradient id="wd-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f3eadf"/><stop offset="1" stop-color="#ecdfcc"/>
    </linearGradient>
    <linearGradient id="wd-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#cfe6f2"/><stop offset="0.7" stop-color="#f2e2c8"/><stop offset="1" stop-color="#f6dcb4"/>
    </linearGradient>
    <linearGradient id="wd-light" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff3d6" stop-opacity="0.55"/><stop offset="1" stop-color="#fff3d6" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#wd-bg)"/>
  <path d="M0 0 q40 26 20 60 q-24 40 10 70 L 0 130 Z" fill="#f6e3c8" opacity="0.7"/>
  <rect x="64" y="30" width="176" height="158" rx="10" fill="#fffdf7" stroke="#e5d7bd" stroke-width="4"/>
  <rect x="74" y="40" width="156" height="138" rx="5" fill="url(#wd-sky)"/>
  <circle cx="196" cy="70" r="16" fill="#ffdc9e"/>
  <circle cx="196" cy="70" r="24" fill="#ffdc9e" opacity="0.35"/>
  <ellipse cx="110" cy="130" rx="22" ry="7" fill="#fff" opacity="0.85"/>
  <ellipse cx="140" cy="122" rx="14" ry="5" fill="#fff" opacity="0.7"/>
  <line x1="152" y1="40" x2="152" y2="178" stroke="#fffdf7" stroke-width="4"/>
  <line x1="74" y1="109" x2="230" y2="109" stroke="#fffdf7" stroke-width="4"/>
  <path d="M96 188 L 74 260 L 300 260 L 246 188 Z" fill="url(#wd-light)"/>
  <path d="M64 34 q-26 60 -8 150" stroke="#f0dfc2" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.85"/>
  <path d="M64 34 q-30 74 -10 154" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.6"/>
  <rect x="0" y="232" width="400" height="68" fill="#d8c2a0"/>
  <rect x="0" y="232" width="400" height="10" fill="#c9b28c"/>
  <g>
    <ellipse cx="150" cy="238" rx="30" ry="6" fill="#b49a72" opacity="0.6"/>
    <path d="M136 214 h28 v16 a14 9 0 0 1 -28 0 Z" fill="#fffdf6" stroke="#e7dbc6"/>
    <path d="M164 218 q11 4 0 12" fill="none" stroke="#e7dbc6" stroke-width="3"/>
    <path d="M142 208 q3 -6 0 -10 M150 208 q3 -6 0 -10 M158 208 q3 -6 0 -10" stroke="#d3bd99" stroke-width="2" fill="none" opacity="0.8"/>
  </g>
  <g>
    <ellipse cx="218" cy="240" rx="30" ry="6" fill="#b49a72" opacity="0.6"/>
    <path d="M204 216 h28 v14 a14 9 0 0 1 -28 0 Z" fill="#fffdf6" stroke="#e7dbc6"/>
    <path d="M210 210 q3 -6 0 -10 M218 210 q3 -6 0 -10 M226 210 q3 -6 0 -10" stroke="#d3bd99" stroke-width="2" fill="none" opacity="0.8"/>
  </g>
  <g>
    <path d="M320 214 q-5 -30 4 -44 q10 12 6 44 q-5 8 -10 0 Z" fill="#8cbb6c"/>
    <path d="M306 208 q-10 -16 -4 -32 q8 8 10 32 Z" fill="#7fae62"/>
    <path d="M336 210 q10 -14 4 -30 q-8 8 -8 30 Z" fill="#9cc77b"/>
    <path d="M300 216 h44 l-4 22 h-36 Z" fill="#cf9a76"/>
    <rect x="297" y="212" width="50" height="8" rx="3" fill="#b9855d"/>
  </g>
  <g>
    <line x1="42" y1="0" x2="42" y2="52" stroke="#c9b28c" stroke-width="3"/>
    <path d="M42 52 q-24 4 -24 16 q0 10 24 12 q24 -2 24 -12 q0 -12 -24 -16 Z" fill="#e8cf9d"/>
    <circle cx="42" cy="76" r="7" fill="#ffe1a8" opacity="0.95"/>
  </g>
</svg>`;

COVER.dessert = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="窗边甜点插画">
  <defs>
    <linearGradient id="ds-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f8f0e6"/><stop offset="1" stop-color="#f0e0cd"/>
    </linearGradient>
    <linearGradient id="ds-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#d8e9f3"/><stop offset="1" stop-color="#f6e4c4"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#ds-bg)"/>
  <rect x="228" y="22" width="150" height="130" rx="9" fill="#fffdf7" stroke="#e5d7bd" stroke-width="4"/>
  <rect x="237" y="31" width="132" height="112" rx="4" fill="url(#ds-sky)"/>
  <circle cx="336" cy="58" r="13" fill="#ffdc9e"/>
  <ellipse cx="286" cy="96" rx="18" ry="6" fill="#fff" opacity="0.8"/>
  <line x1="303" y1="31" x2="303" y2="143" stroke="#fffdf7" stroke-width="3.5"/>
  <line x1="237" y1="87" x2="369" y2="87" stroke="#fffdf7" stroke-width="3.5"/>
  <path d="M232 152 L 214 242 L 340 242 L 300 152 Z" fill="#fff3d6" opacity="0.4"/>
  <path d="M378 22 q-24 40 -8 92" stroke="#f0dfc2" stroke-width="9" fill="none" stroke-linecap="round" opacity="0.85"/>
  <rect x="0" y="222" width="400" height="78" fill="#d8c2a0"/>
  <rect x="0" y="222" width="400" height="9" fill="#c9b28c"/>
  <ellipse cx="140" cy="238" rx="58" ry="12" fill="#b49a72" opacity="0.55"/>
  <ellipse cx="140" cy="230" rx="50" ry="9" fill="#fffdf6"/>
  <path d="M124 196 h32 l-3 32 h-26 Z" fill="#f4e8d0"/>
  <path d="M124 196 h32 l-3 8 h-26 Z" fill="#e0b2bc"/>
  <ellipse cx="140" cy="196" rx="17" ry="6" fill="#f7cdd4"/>
  <circle cx="133" cy="192" r="2.4" fill="#d9808f"/>
  <circle cx="146" cy="194" r="2" fill="#d9808f"/>
  <g>
    <ellipse cx="72" cy="234" rx="20" ry="5" fill="#b49a72" opacity="0.5"/>
    <path d="M60 212 h24 v14 a12 8 0 0 1 -24 0 Z" fill="#fffdf6" stroke="#e7dbc6"/>
    <path d="M84 216 q10 3 0 11" fill="none" stroke="#e7dbc6" stroke-width="3"/>
    <path d="M66 206 q2 -6 0 -10 M74 206 q2 -6 0 -10" stroke="#d3bd99" stroke-width="2" fill="none" opacity="0.8"/>
  </g>
  <g>
    <path d="M36 224 q-4 -22 3 -34 q8 10 5 34 q-4 7 -8 0 Z" fill="#8cbb6c"/>
    <path d="M26 220 q-8 -12 -3 -24 q6 6 8 24 Z" fill="#7fae62"/>
    <path d="M46 222 q8 -10 3 -22 q-6 6 -6 22 Z" fill="#9cc77b"/>
    <path d="M18 226 h38 l-3 18 h-32 Z" fill="#cf9a76"/>
  </g>
</svg>`;

COVER.interior = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="餐厅室内环境插画">
  <defs>
    <linearGradient id="in-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f7efe3"/><stop offset="1" stop-color="#eedec6"/>
    </linearGradient>
    <linearGradient id="in-table" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#dcbf98"/><stop offset="1" stop-color="#c9a97e"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#in-bg)"/>
  <rect x="46" y="30" width="120" height="86" rx="6" fill="#fffdf7" stroke="#e5d7bd" stroke-width="3.5"/>
  <circle cx="86" cy="66" r="20" fill="#f2dfc0"/>
  <circle cx="112" cy="72" r="14" fill="#e9cfa8"/>
  <circle cx="128" cy="58" r="8" fill="#f2dfc0"/>
  <rect x="186" y="48" width="90" height="62" rx="5" fill="#fffdf7" stroke="#e5d7bd" stroke-width="3"/>
  <path d="M196 96 q10 -26 32 -22 q20 4 18 26 Z" fill="#cfe0d2"/>
  <rect x="232" y="58" width="34" height="42" rx="3" fill="#f4e6cd"/>
  <rect x="236" y="66" width="26" height="18" fill="#c9d8dc"/>
  <g>
    <line x1="330" y1="26" x2="330" y2="70" stroke="#b6a184" stroke-width="3"/>
    <path d="M330 70 q-20 6 -20 18 q0 10 20 12 q20 -2 20 -12 q0 -12 -20 -18 Z" fill="#e8cf9d"/>
    <circle cx="330" cy="92" r="8" fill="#ffe2ac"/>
    <circle cx="330" cy="92" r="16" fill="#ffe2ac" opacity="0.3"/>
  </g>
  <g>
    <path d="M46 128 q-4 -26 4 -38 q9 13 5 38 q-5 8 -9 0 Z" fill="#8cbb6c"/>
    <path d="M34 122 q-9 -14 -3 -28 q7 7 8 28 Z" fill="#7fae62"/>
    <path d="M58 124 q8 -12 3 -26 q-6 7 -6 26 Z" fill="#9cc77b"/>
    <path d="M24 130 h50 l-4 20 h-42 Z" fill="#cf9a76"/>
  </g>
  <g>
    <path d="M356 132 q4 -22 -3 -32 q-8 11 -4 32 q4 6 7 0 Z" fill="#9cc77b"/>
    <path d="M342 166 h36 l-3 16 h-30 Z" fill="#cf9a76"/>
  </g>
  <rect x="0" y="196" width="400" height="104" fill="url(#in-table)"/>
  <rect x="0" y="196" width="400" height="8" fill="#c0a173"/>
  <ellipse cx="180" cy="216" rx="74" ry="14" fill="#b6956a" opacity="0.5"/>
  <ellipse cx="180" cy="209" rx="64" ry="11" fill="#fffdf6"/>
  <ellipse cx="180" cy="204" rx="36" ry="12" fill="#f6efe3"/>
  <ellipse cx="180" cy="200" rx="24" ry="9" fill="#efc463"/>
  <g>
    <ellipse cx="300" cy="222" rx="26" ry="6" fill="#b49a72" opacity="0.55"/>
    <path d="M286 200 h28 v14 a14 9 0 0 1 -28 0 Z" fill="#fffdf6" stroke="#e7dbc6"/>
    <path d="M314 204 q11 4 0 12" fill="none" stroke="#e7dbc6" stroke-width="3"/>
    <path d="M292 194 q3 -6 0 -10 M300 194 q3 -6 0 -10 M308 194 q3 -6 0 -10" stroke="#cbb590" stroke-width="2" fill="none" opacity="0.9"/>
  </g>
  <circle cx="82" cy="252" r="9" fill="#fffdf6" opacity="0.5"/>
  <circle cx="102" cy="258" r="6" fill="#fffdf6" opacity="0.4"/>
</svg>`;

/* ---------- 新增封面（生活化场景，供瀑布流混排） ---------- */
COVER.coffee = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="手冲咖啡插画">
  <defs>
    <linearGradient id="cf-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f2ede4"/><stop offset="1" stop-color="#e6ddcd"/>
    </linearGradient>
    <linearGradient id="cf-cup" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f7f3ec"/><stop offset="1" stop-color="#e3dbcd"/>
    </linearGradient>
    <linearGradient id="cf-coffee" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#8a5a3a"/><stop offset="1" stop-color="#5f3a22"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#cf-bg)"/>
  <circle cx="52" cy="58" r="20" fill="#e3d9c6" opacity="0.7"/>
  <circle cx="356" cy="250" r="28" fill="#ded2bc" opacity="0.6"/>
  <path d="M0 244 Q 130 226 260 238 T 400 230 L 400 300 L 0 300 Z" fill="#d2c3a4" opacity="0.45"/>
  <ellipse cx="150" cy="244" rx="30" ry="6" fill="#b49a72" opacity="0.5"/>
  <ellipse cx="150" cy="240" rx="26" ry="5" fill="#fffdf6" opacity="0.9"/>
  <path d="M128 168 h44 l-5 66 h-34 Z" fill="url(#cf-cup)" stroke="#d9cfbc" stroke-width="1.5"/>
  <ellipse cx="150" cy="168" rx="22" ry="6" fill="url(#cf-coffee)"/>
  <ellipse cx="150" cy="166" rx="17" ry="4" fill="#a9744e"/>
  <path d="M144 160 q3 -5 0 -9 M156 160 q3 -5 0 -9" stroke="#d9cfbc" stroke-width="2" fill="none" opacity="0.8"/>
  <path d="M138 196 q-1 20 4 32 M162 196 q1 20 -4 32" stroke="#fff" stroke-width="2.5" fill="none" opacity="0.4"/>
  <g transform="rotate(-12 250 120)">
    <path d="M222 116 h56 l-6 82 h-44 Z" fill="url(#cf-cup)" stroke="#d9cfbc" stroke-width="1.5" transform="translate(18 -8)"/>
    <ellipse cx="253" cy="112" rx="20" ry="5.5" fill="url(#cf-coffee)" transform="translate(18 -8)"/>
  </g>
  <g stroke="#c9bda8" stroke-width="3.2" fill="none" stroke-linecap="round">
    <path d="M318 130 l10 66"/>
    <path d="M312 122 q5 3 2 13"/>
    <path d="M322 120 q2 8 4 17"/>
  </g>
  <circle cx="96" cy="106" r="7" fill="#f0e7d4" opacity="0.9"/>
  <circle cx="112" cy="94" r="5" fill="#f0e7d4" opacity="0.7"/>
  <circle cx="330" cy="78" r="4" fill="#f0e7d4" opacity="0.8"/>
</svg>`;

COVER.storefront = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="街角小店门头插画">
  <defs>
    <linearGradient id="sf-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#eee8dc"/><stop offset="1" stop-color="#e0d6c2"/>
    </linearGradient>
    <linearGradient id="sf-awning" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#7fae62"/><stop offset="1" stop-color="#5e8b45"/>
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sf-bg)"/>
  <circle cx="338" cy="54" r="24" fill="#e5dbc6" opacity="0.8"/>
  <circle cx="58" cy="62" r="12" fill="#e8dfca" opacity="0.8"/>
  <path d="M0 252 Q 140 236 300 246 T 400 240 L 400 300 L 0 300 Z" fill="#cbb894" opacity="0.5"/>
  <rect x="70" y="60" width="260" height="150" fill="#f6f1e6" stroke="#dccfb6" stroke-width="2"/>
  <rect x="70" y="52" width="260" height="22" rx="6" fill="url(#sf-awning)"/>
  <g fill="#5e8b45">
    <circle cx="94" cy="63" r="7"/><circle cx="122" cy="63" r="7"/><circle cx="150" cy="63" r="7"/>
    <circle cx="178" cy="63" r="7"/><circle cx="206" cy="63" r="7"/><circle cx="234" cy="63" r="7"/>
    <circle cx="262" cy="63" r="7"/><circle cx="290" cy="63" r="7"/><circle cx="318" cy="63" r="7"/>
  </g>
  <rect x="92" y="96" width="86" height="82" rx="4" fill="#cfe3d2" opacity="0.85"/>
  <rect x="100" y="104" width="70" height="66" rx="2" fill="#f9f5ea"/>
  <rect x="222" y="96" width="86" height="82" rx="4" fill="#7c6a52"/>
  <rect x="230" y="104" width="70" height="66" rx="2" fill="#5a4a36"/>
  <circle cx="238" cy="138" r="5" fill="#e8c463" opacity="0.9"/>
  <circle cx="292" cy="138" r="5" fill="#e8c463" opacity="0.7"/>
  <rect x="116" y="78" width="70" height="10" rx="5" fill="#7c6a52" opacity="0.75"/>
  <rect x="196" y="190" width="10" height="20" rx="3" fill="#8a7357"/>
  <circle cx="201" cy="212" r="3" fill="#d64545" opacity="0.8"/>
  <ellipse cx="200" cy="248" rx="60" ry="8" fill="#b49a72" opacity="0.4"/>
  <g>
    <circle cx="156" cy="238" r="9" fill="#3f3a33"/>
    <path d="M149 252 h14 l-2 8 h-10 Z" fill="#3f3a33"/>
    <circle cx="252" cy="240" r="9" fill="#3f3a33"/>
    <path d="M245 254 h14 l-2 8 h-10 Z" fill="#3f3a33"/>
  </g>
  <rect x="128" y="36" width="44" height="16" rx="3" fill="#7c6a52" opacity="0.6"/>
</svg>`;

COVER.brunch = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="周末 Brunch 桌面插画">
  <defs>
    <linearGradient id="br-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f6efe3"/><stop offset="1" stop-color="#eadfc9"/>
    </linearGradient>
    <radialGradient id="br-plate" cx="0.5" cy="0.4" r="0.7">
      <stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#f0e8d8"/>
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#br-bg)"/>
  <circle cx="344" cy="52" r="20" fill="#ead9bb" opacity="0.7"/>
  <circle cx="48" cy="258" r="30" fill="#e2d4b8" opacity="0.55"/>
  <path d="M0 236 Q 160 218 320 232 T 400 224 L 400 300 L 0 300 Z" fill="#c9b389" opacity="0.4"/>
  <ellipse cx="200" cy="214" rx="150" ry="54" fill="url(#br-plate)"/>
  <ellipse cx="200" cy="208" rx="120" ry="43" fill="#fbf7ef"/>
  <ellipse cx="138" cy="196" rx="34" ry="15" fill="#f5ead2"/>
  <ellipse cx="138" cy="193" rx="28" ry="12" fill="#efc463"/>
  <circle cx="128" cy="188" r="4" fill="#e0a83c"/>
  <circle cx="150" cy="192" r="3" fill="#e0a83c"/>
  <path d="M120 186 q16 -8 36 -2" stroke="#c4842a" stroke-width="2" fill="none" opacity="0.6"/>
  <ellipse cx="252" cy="196" rx="30" ry="13" fill="#fdf3df"/>
  <ellipse cx="252" cy="194" rx="24" ry="10" fill="#e89a8a"/>
  <circle cx="244" cy="190" r="4" fill="#d64545" opacity="0.75"/>
  <circle cx="262" cy="193" r="3" fill="#d64545" opacity="0.6"/>
  <g transform="rotate(-18 200 150)">
    <ellipse cx="200" cy="150" rx="52" ry="26" fill="#f4ead4" stroke="#dccfb6" stroke-width="2"/>
    <ellipse cx="200" cy="146" rx="42" ry="21" fill="#f9f3e6"/>
    <ellipse cx="188" cy="144" rx="12" ry="9" fill="#e8b04a"/>
    <ellipse cx="214" cy="150" rx="9" ry="7" fill="#7fae62"/>
    <ellipse cx="205" cy="138" rx="7" ry="5" fill="#d64545" opacity="0.8"/>
  </g>
  <g stroke="#c9bda8" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M92 116 l6 60"/>
    <path d="M86 108 q6 3 3 13"/>
  </g>
  <g stroke="#c9bda8" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M316 128 l-6 54"/>
    <path d="M322 120 q-6 3 -3 13"/>
  </g>
  <path d="M330 160 q6 -10 14 -4 q-2 10 -14 4 Z" fill="#8cbb6c"/>
  <path d="M70 176 q-4 -10 4 -12 q6 8 -4 12 Z" fill="#7fae62" opacity="0.85"/>
</svg>`;

COVER.lights = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="夜晚暖光小馆插画">
  <defs>
    <linearGradient id="lt-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#3a3230"/><stop offset="0.62" stop-color="#4a3d35"/><stop offset="1" stop-color="#5e4b3c"/>
    </linearGradient>
    <radialGradient id="lt-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#f5c86e" stop-opacity="0.95"/><stop offset="1" stop-color="#f5c86e" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#lt-bg)"/>
  <circle cx="70" cy="46" r="1.6" fill="#f0e2c8" opacity="0.8"/>
  <circle cx="110" cy="30" r="1.2" fill="#f0e2c8" opacity="0.6"/>
  <circle cx="330" cy="40" r="1.4" fill="#f0e2c8" opacity="0.7"/>
  <circle cx="356" cy="66" r="1" fill="#f0e2c8" opacity="0.5"/>
  <path d="M0 238 Q 140 224 300 234 T 400 228 L 400 300 L 0 300 Z" fill="#2e2622" opacity="0.7"/>
  <path d="M20 60 Q 200 34 380 60" stroke="#2e2016" stroke-width="2.5" fill="none"/>
  <g>
    <circle cx="86" cy="92" r="34" fill="url(#lt-glow)"/>
    <circle cx="86" cy="92" r="8" fill="#f5c86e"/>
    <circle cx="170" cy="86" r="26" fill="url(#lt-glow)"/>
    <circle cx="170" cy="86" r="6.5" fill="#f5c86e"/>
    <circle cx="252" cy="90" r="30" fill="url(#lt-glow)"/>
    <circle cx="252" cy="90" r="7" fill="#f5c86e"/>
    <circle cx="334" cy="84" r="24" fill="url(#lt-glow)"/>
    <circle cx="334" cy="84" r="6" fill="#f5c86e"/>
  </g>
  <rect x="132" y="128" width="136" height="94" rx="6" fill="#241d18"/>
  <rect x="146" y="142" width="108" height="80" rx="4" fill="#6e5138"/>
  <ellipse cx="200" cy="182" rx="44" ry="16" fill="#8a6a4a" opacity="0.9"/>
  <ellipse cx="200" cy="180" rx="36" ry="13" fill="#a9855f"/>
  <ellipse cx="200" cy="178" rx="24" ry="9" fill="#c9a97d"/>
  <g fill="#f5c86e" opacity="0.85">
    <circle cx="200" cy="152" r="3"/>
    <circle cx="184" cy="160" r="2.4"/>
    <circle cx="216" cy="160" r="2.4"/>
  </g>
  <ellipse cx="316" cy="222" rx="16" ry="5" fill="#1f1915" opacity="0.6"/>
  <g>
    <circle cx="316" cy="206" r="9" fill="#3a2f26"/>
    <path d="M309 220 h14 l-2 7 h-10 Z" fill="#3a2f26"/>
  </g>
  <g>
    <circle cx="72" cy="216" r="9" fill="#3a2f26"/>
    <path d="M65 230 h14 l-2 7 h-10 Z" fill="#3a2f26"/>
  </g>
  <ellipse cx="200" cy="252" rx="70" ry="9" fill="#f5c86e" opacity="0.12"/>
</svg>`;

/* ---------- 头像 & 伪二维码 ---------- */
let _avSeq = 0;
function avatarSvg(letter, hue){
  const id = 'av' + (_avSeq++) + 'g';
  const c1 = `hsl(${hue},62%,74%)`, c2 = `hsl(${(hue + 26) % 360},55%,56%)`;
  return `<svg viewBox="0 0 64 64" class="avatar" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="64" height="64" rx="32" fill="url(#${id})"/><text x="32" y="41" text-anchor="middle" font-size="26" fill="#fff" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-weight="600">${letter}</text></svg>`;
}

function qrSvg(code){
  const n = 21, q = 2;
  let h = 2166136261;
  for (const ch of String(code)){ h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
  const rnd = () => { h ^= h << 13; h >>>= 0; h ^= h >>> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
  const grid = [];
  for (let y = 0; y < n; y++){ grid.push([]); for (let x = 0; x < n; x++) grid[y].push(rnd() > 0.52); }
  const F = (x0, y0) => { for (let y = 0; y < 7; y++) for (let x = 0; x < 7; x++){ const on = (x===0||x===6||y===0||y===6||(x>=2&&x<=4&&y>=2&&y<=4)); grid[y0+y][x0+x] = on; } };
  F(0,0); F(n-7,0); F(0,n-7);
  for (let i = 8; i < n-8; i++){ grid[6][i] = (i % 2 === 0); grid[i][6] = (i % 2 === 0); }
  let cells = '';
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (grid[y][x]) cells += `<rect x="${x+q}" y="${y+q}" width="1" height="1"/>`;
  return `<svg class="qr" viewBox="0 0 ${n+2*q} ${n+2*q}" shape-rendering="crispEdges" fill="#2e2924" aria-hidden="true">${cells}</svg>`;
}

/* ---------- 商家 / 笔记 / 商品 ---------- */
const DATA = {};

COVER.cake = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="生日蛋糕插画">
  <defs>
    <linearGradient id="ck-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#faf0e6"/><stop offset="1" stop-color="#f3dfcc"/>
    </linearGradient>
    <linearGradient id="ck-cream" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fdf7ef"/><stop offset="1" stop-color="#f2e3cf"/>
    </linearGradient>
    <radialGradient id="ck-flame" cx="0.5" cy="0.35" r="0.85">
      <stop offset="0" stop-color="#ffe0a3"/><stop offset="1" stop-color="#ef8f3c"/>
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#ck-bg)"/>
  <circle cx="52" cy="38" r="7" fill="#e8a0b4" opacity="0.8"/>
  <circle cx="330" cy="52" r="5" fill="#c9a86b" opacity="0.7"/>
  <circle cx="368" cy="120" r="6" fill="#e8a0b4" opacity="0.6"/>
  <circle cx="28" cy="150" r="4" fill="#c9a86b" opacity="0.6"/>
  <circle cx="352" cy="228" r="34" fill="#ecd8bf" opacity="0.55"/>
  <path d="M0 232 Q 90 214 200 224 T 400 216 L 400 300 L 0 300 Z" fill="#d9c19c" opacity="0.5"/>
  <ellipse cx="200" cy="238" rx="122" ry="20" fill="#c7b18d" opacity="0.5"/>
  <ellipse cx="200" cy="232" rx="110" ry="16" fill="url(#ck-cream)"/>
  <rect x="132" y="172" width="136" height="60" rx="10" fill="url(#ck-cream)" stroke="#e5d2b8"/>
  <rect x="144" y="132" width="112" height="48" rx="9" fill="#f6ead8" stroke="#e5d2b8"/>
  <path d="M144 148 q14 12 28 0 q14 12 28 0 q14 12 28 0 q14 12 28 0 l0 14 l-112 0 l0 -14 Z" fill="#e8a0b4" opacity="0.85"/>
  <path d="M132 196 q17 13 34 0 q17 13 34 0 q17 13 34 0 q17 13 34 0 l0 16 l-136 0 l0 -16 Z" fill="#e8a0b4" opacity="0.7"/>
  <ellipse cx="168" cy="128" rx="7" ry="9" fill="#d5606e"/>
  <ellipse cx="232" cy="126" rx="7" ry="9" fill="#d5606e"/>
  <path d="M168 122 q4 -6 0 -11 M232 120 q4 -6 0 -11" stroke="#7ea36b" stroke-width="2" fill="none"/>
  <rect x="196" y="98" width="8" height="36" rx="3" fill="#f0c7cf" stroke="#e2a9b6"/>
  <line x1="196" y1="104" x2="204" y2="104" stroke="#e2a9b6" stroke-width="1.6"/>
  <line x1="196" y1="112" x2="204" y2="112" stroke="#e2a9b6" stroke-width="1.6"/>
  <ellipse cx="200" cy="90" rx="5" ry="9" fill="url(#ck-flame)"/>
  <ellipse cx="200" cy="90" rx="2" ry="4" fill="#fff7e0" opacity="0.9"/>
  <g opacity="0.75">
    <path d="M96 132 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 Z" fill="#e0b96a"/>
    <path d="M316 96 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 Z" fill="#e8a0b4"/>
    <path d="M120 72 l3 6 6 3 -6 3 -3 6 -3 -6 -6 -3 6 -3 Z" fill="#e8a0b4" opacity="0.8"/>
  </g>
</svg>`;

COVER.bday = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="生日晚餐桌面插画">
  <defs>
    <linearGradient id="bd-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f5ebe0"/><stop offset="1" stop-color="#ecdcc7"/>
    </linearGradient>
    <linearGradient id="bd-sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#b9d4e8"/><stop offset="0.55" stop-color="#e9c9a8"/><stop offset="1" stop-color="#e8a886"/>
    </linearGradient>
    <linearGradient id="bd-table" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c9a374"/><stop offset="1" stop-color="#b58c5e"/>
    </linearGradient>
    <radialGradient id="bd-glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ffe2a8" stop-opacity="0.85"/><stop offset="1" stop-color="#ffe2a8" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bd-bg)"/>
  <rect x="52" y="26" width="296" height="152" rx="8" fill="url(#bd-sky)" stroke="#b9a684" stroke-width="6"/>
  <line x1="200" y1="30" x2="200" y2="176" stroke="#b9a684" stroke-width="5"/>
  <line x1="56" y1="102" x2="348" y2="102" stroke="#b9a684" stroke-width="4" opacity="0.8"/>
  <circle cx="120" cy="64" r="14" fill="#f6e2c4" opacity="0.9"/>
  <g>
    <path d="M64 176 q46 -34 92 0 Z" fill="#c98f7e" opacity="0.6"/>
    <path d="M250 176 q50 -38 100 0 Z" fill="#c98f7e" opacity="0.5"/>
  </g>
  <g>
    <circle cx="86" cy="46" r="4" fill="#ffe0a3"/>
    <circle cx="126" cy="34" r="3.5" fill="#ffe0a3" opacity="0.9"/>
    <circle cx="292" cy="40" r="4" fill="#ffe0a3"/>
    <circle cx="330" cy="58" r="3.5" fill="#ffe0a3" opacity="0.9"/>
    <path d="M86 46 q20 8 40 4 M292 40 q18 10 38 12" stroke="#d9b384" stroke-width="1.5" fill="none" opacity="0.7"/>
  </g>
  <path d="M0 190 Q 100 178 200 186 T 400 182 L 400 300 L 0 300 Z" fill="url(#bd-table)"/>
  <ellipse cx="200" cy="252" rx="150" ry="18" fill="#a37c50" opacity="0.35"/>
  <ellipse cx="112" cy="206" rx="26" ry="8" fill="#f6efe3" stroke="#e5d2b8"/>
  <ellipse cx="112" cy="200" rx="18" ry="5" fill="#fffaf2"/>
  <circle cx="104" cy="196" r="4" fill="#d5606e"/>
  <circle cx="120" cy="196" r="4" fill="#d5606e"/>
  <rect x="286" y="186" width="34" height="28" rx="3" fill="#e8a0b4" stroke="#c97e94"/>
  <rect x="286" y="186" width="34" height="9" fill="#c97e94" opacity="0.8"/>
  <line x1="303" y1="186" x2="303" y2="214" stroke="#f6efe3" stroke-width="3"/>
  <path d="M298 186 q5 -8 10 0" fill="none" stroke="#f6efe3" stroke-width="2.5"/>
  <g>
    <ellipse cx="188" cy="200" rx="34" ry="10" fill="url(#bd-glow)" transform="translate(-4,-40)"/>
    <rect x="186" y="176" width="5" height="26" rx="2" fill="#f0e4cf"/>
    <ellipse cx="188.5" cy="172" rx="4" ry="8" fill="#f5b76b"/>
    <ellipse cx="188.5" cy="172" rx="1.6" ry="3.4" fill="#fff3d8"/>
    <ellipse cx="214" cy="196" rx="30" ry="9" fill="url(#bd-glow)" transform="translate(-2,-34)"/>
    <rect x="212" y="176" width="5" height="24" rx="2" fill="#f0e4cf"/>
    <ellipse cx="214.5" cy="172" rx="4" ry="8" fill="#f5b76b"/>
    <ellipse cx="214.5" cy="172" rx="1.6" ry="3.4" fill="#fff3d8"/>
  </g>
  <path d="M40 214 q10 -12 20 0 q10 -12 20 0" stroke="#d9b384" stroke-width="2" fill="none" opacity="0.6"/>
  <g opacity="0.8">
    <circle cx="60" cy="60" r="3" fill="#e0b96a"/>
    <circle cx="340" cy="140" r="3" fill="#e8a0b4"/>
    <circle cx="24" cy="120" r="3" fill="#e8a0b4" opacity="0.7"/>
  </g>
</svg>`;

DATA.merchant = {
  id: 'm1',
  name: '木屿餐厅（虚构商家）',
  shortName: '木屿餐厅',
  address: '上海市徐汇区永康路 128 号（虚构地址）',
  distance: '距你约 1.2 km',
  hours: '11:30 – 21:30 · 周一公休',
  style: ['意式简餐', '咖啡甜品', '适合拍照'],
};

DATA.notes = [
  /* ===== 首页前 8 篇：6 篇新无链 + 2 篇挂链（n1 / n10） ===== */
  {
    id: 'n17',
    author: { name: '寿星本星', avatar: '蛋', hue: 340, desc: '节庆爱好者 · 41 篇笔记 · 虚构账号' },
    title: '过生日选对了店：一桌人吹蜡烛的那一刻，值回全部',
    coverKey: 'party',
    img: 'img/birthday.jpg',   /* 实景图（演示素材）：替换该场景插画 */
    ratio: '4/5',
    cat: 'food',
    imageKeys: ['party', 'cake', 'wine'],
    photos: ['img/birthday.jpg', 'img/bar.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '生日当天的事：提前一周跟店家说好 6 个人一桌，到店的时候气球彩带已经布置好了，桌面还摆了小蜡烛，朋友们进门直接「哇」出声，寿星的面子瞬间拉满。🎂',
      '自带的蛋糕店家帮我们冷藏，上桌时还配了个甜品拼盘一起摆，吹蜡烛、唱生日歌、合照一条龙，暖光打在脸上人均出片，那组照片现在还是我的朋友圈封面。',
      '人均 200 出头，上菜节奏在线，六个人从开场聊到打烊没人冷场。过生日真不用去多隆重的地方：氛围到位、有人接得住细节，就赢了一大半。',
      '本篇为 Demo 模拟笔记，人物与数据均为演示；同款氛围感的生日局，可以丢给 AI 匹配参考。🎈',
    ],
    dishes: [
      { emoji: '🎈', name: '氛围布置', note: '气球彩带 + 桌面小蜡烛' },
      { emoji: '🎂', name: '切蛋糕', note: '自带蛋糕帮冷藏 · 配甜品拼盘' },
      { emoji: '🪑', name: '6 人一桌', note: '包间或半开放卡座' },
      { emoji: '📸', name: '暖光出片', note: '合照氛围感在线' },
    ],
    scenes: ['生日聚会', '朋友聚餐'],
    topics: ['#生日餐厅', '#氛围感布置', '#生日合照'],
    stats: { like: 421, fav: 96, cmt: 44 },
    comments: [
      { name: '甜品雷达', avatar: '甜', hue: 350, text: '甜品拼盘那一下太会了，明年我生日也照这个办', at: '1 天前' },
    ],
  },
  {
    id: 'n18',
    author: { name: '陶里淘气', avatar: '陶', hue: 28, desc: '手作体验控 · 57 篇笔记 · 虚构账号' },
    title: '和闺蜜的周末陶艺局：90 分钟捏出一只歪杯子',
    coverKey: 'clay',
    img: 'img/clay.jpg',   /* 实景图（演示素材） */
    ratio: '3/4',
    cat: 'craft',
    imageKeys: ['clay', 'pottery', 'drink'],
    photos: ['img/clay.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '周六和闺蜜约的陶艺课，本来只是想找点事做，结果从坐下拉坯那一刻就上头了：泥在转盘上转起来的瞬间，脑子里什么 KPI 都没了。🏺',
      '整节课 90 分钟，师傅全程手把手带：先扶手腕、再教提拉。我的杯子歪得很有个性，闺蜜的碗直接塌了两次，两个人笑到根本停不下来。',
      '材料费是全含的，泥料、工具、围裙都有；成品要等烧制，两周后到店自取——不急，这份期待感刚好被拉长了两周。零基础也完全跟得上，师傅耐心到不像话。',
      '本篇为 Demo 模拟笔记，数据均为演示；同款拉坯体验可以丢给 AI 匹配，闺蜜局真的值得安排。✨',
    ],
    dishes: [
      { emoji: '🏺', name: '拉坯体验', note: '约 90 分钟 · 师傅手把手' },
      { emoji: '🧱', name: '基础材料', note: '泥料工具围裙全含' },
      { emoji: '🎁', name: '成品自取', note: '烧制约两周 · 到店领取' },
      { emoji: '👩‍🎨', name: '零基础友好', note: '歪了也是独家作品' },
    ],
    scenes: ['周末手作', '闺蜜局', '新手体验'],
    topics: ['#陶艺', '#拉坯', '#手作体验'],
    stats: { like: 2860, fav: 933, cmt: 122 },
    comments: [
      { name: '泥土会说话', avatar: '泥', hue: 25, text: '烧制要等两周哦，急用可以选当天带走的彩绘件', at: '2 天前' },
    ],
  },
  {
    id: 'n19',
    author: { name: '羽过天晴', avatar: '羽', hue: 140, desc: '运动新手 · 18 篇笔记 · 虚构账号' },
    title: '周末羽毛球两小时：空手去也能打，现场还捡到搭子',
    coverKey: 'shuttle',
    img: 'img/badminton.jpg',   /* 实景图（演示素材） */
    ratio: '4/5',
    cat: 'sport',
    imageKeys: ['shuttle', 'climb', 'drink'],
    photos: ['img/badminton.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '周末的羽毛球局，室内木地板场，灯光不晃眼，两小时打下来出了一身透汗，比在家躺着刷手机治愈十倍。🏸',
      '没买拍也不慌，球拍直接现场租了两支，练习球馆里备好了；场地 2 小时连灯光一起算，1–2 人就能开场，我们临时凑的局说开就开。',
      '教练带练是真香：高远球姿势被纠正了三次，步法顺了之后球一下子就稳了，还练了几组双打跑位。一个人去的也别有压力，现场就能拼到水平差不多的球友搭子。',
      '本篇为 Demo 模拟笔记，数据均为演示；同款场地和陪练课可以丢给 AI 匹配参考。💪',
    ],
    dishes: [
      { emoji: '🏸', name: '场地 2 小时', note: '室内木地板 · 灯光不晃眼' },
      { emoji: '🎒', name: '现场租拍', note: '球拍 2 支 · 空手去也行' },
      { emoji: '👥', name: '1–2 人开场', note: '人少也开得了局' },
      { emoji: '💡', name: '灯光地板', note: '不晃眼 · 木地板' },
    ],
    scenes: ['周末运动', '一人可去', '拼场社交'],
    topics: ['#羽毛球', '#周末运动', '#室内场馆'],
    stats: { like: 1540, fav: 511, cmt: 87 },
    comments: [
      { name: '网前一搓', avatar: '搓', hue: 150, text: '周末晚场要提前 2–3 天约，亲测', at: '1 天前' },
    ],
  },
  {
    id: 'n20',
    author: { name: '核心在线中', avatar: '核', hue: 95, desc: '健身启蒙中 · 9 篇笔记 · 虚构账号' },
    title: '普拉提新手的第一节课：小班 + 老师全程纠动作',
    coverKey: 'pilates',
    img: 'img/pilates.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '3/5',
    cat: 'sport',
    actOK: true,   /* 适合多人组局：小班课可结伴约（拼团+找搭子组合演示位） */
    productId: 'p13',   /* 挂接同款套餐：笔记页可约同款，组合链路也从这里反查 */
    imageKeys: ['pilates', 'climb', 'drink'],
    photos: ['img/pilates.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '久坐党终于开始练普拉提了！选的是小班课，一节最多 4 个人，Reformer 器械床入门，新手第一节课就敢上，是真的友好。🧘',
      '老师全程盯人，发力不对立刻上手纠正：核心怎么收、骨盆怎么摆，一个动作拆成三步教，完全不用怕练错伤了腰。',
      '课前还有 15 分钟体态评估，讲清楚了含胸和骨盆前倾的问题；练完整个人像被拉开了一节，下班后的晚场来一节，当晚睡得都更香。',
      '本篇为 Demo 模拟笔记，数据均为演示；同款新手入门课可以丢给 AI 匹配参考，体态改善从第一节课就开始了。✨',
    ],
    dishes: [
      { emoji: '🧘', name: '小班课', note: '每节最多 4 人 · 新手友好' },
      { emoji: '🛠', name: 'Reformer 器械床', note: '入门第一节 · 呼吸与核心' },
      { emoji: '📋', name: '体态评估', note: '课前 15 分钟 · 教练出建议' },
      { emoji: '⏰', name: '晚间时段', note: '下班后 · 一周一节起步' },
    ],
    scenes: ['新手入门', '下班运动', '一人可去'],
    topics: ['#普拉提', '#体态改善', '#新手入门'],
    stats: { like: 986, fav: 342, cmt: 61 },
    comments: [
      { name: '腰突退役', avatar: '突', hue: 100, text: '第一节课一定要让老师多纠动作，别怕慢', at: '2 天前' },
    ],
  },
  {
    id: 'n21',
    author: { name: '银光闪闪', avatar: '银', hue: 210, desc: '手作收藏家 · 77 篇笔记 · 虚构账号' },
    title: '我们的对戒是亲手敲出来的：银戒 DIY 全程记录',
    coverKey: 'silver',
    img: 'img/silver.jpg',   /* 实景图（演示素材） */
    ratio: '3/4',
    cat: 'craft',
    imageKeys: ['silver', 'ring', 'flowers'],
    photos: ['img/silver.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '和对象一人敲了一枚素圈戒指，银料 925、每人大约 3g，从退火、敲纹到抛光全程上手，3 小时不到就完工了，手上现在还留着锤印的弧度。💍',
      '工坊工具很全，师傅在旁边全程指导：錾字那步最紧张，锤子落下去就改不了了——我们刻了在一起那天的日期缩写，两枚刚好凑成一对。',
      '最爽的是成品抛光完当天直接带走，即做即走不用排队；材料费全含在套餐里，银料超出的部分按克补差，口径清清楚楚，情侣去也完全友好。',
      '本篇为 Demo 模拟笔记，数据均为演示；同款银饰 DIY 可以丢给 AI 匹配参考，周年纪念还想再来做一次。✨',
    ],
    dishes: [
      { emoji: '💍', name: '银料 925', note: '约 3g/人 · 素圈刚好够用' },
      { emoji: '🔨', name: '敲纹抛光', note: '退火塑形全程上手' },
      { emoji: '🎒', name: '当天带走', note: '即做即走 · 不排队' },
      { emoji: '❤️', name: '情侣同桌', note: '一人一枚 · 内侧錾字' },
    ],
    scenes: ['情侣约会', '亲子手作', '周末手作'],
    topics: ['#银饰DIY', '#情侣手作', '#925银'],
    stats: { like: 3120, fav: 1120, cmt: 156 },
    comments: [
      { name: '戒指内圈刻字', avatar: '刻', hue: 215, text: '刻字一般免费或收个位数，记得提前说', at: '3 天前' },
    ],
  },
  {
    id: 'n22',
    author: { name: '拿铁不加糖', avatar: '拿', hue: 25, desc: '咖啡研习生 · 23 篇笔记 · 虚构账号' },
    title: '第一节拉花课就出师了：歪歪的爱心也算数',
    coverKey: 'latte',
    img: 'img/latte.jpg',   /* 实景图（演示素材） */
    ratio: '4/5',
    cat: 'cafe',
    imageKeys: ['latte', 'cake', 'pasta'],
    photos: ['img/latte.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '周日上午的第一节拉花课，从奶泡打发学到注点手法，小班教学人不多，老师示范完一遍就轮到我们上手，全程都有人盯着纠姿。☕',
      '练习杯数管够，一口气拉了 4 杯：第一杯像蘑菇，第二杯像树叶，第四杯终于有了一颗完整的爱心，当场激动到原地转圈。',
      '练习用的豆和奶全部包含在课程里，成品当场喝掉（自己拉的再歪也得喝完），最后一杯还能带走；单节就能约，不强制报全套，时间很灵活。',
      '本篇为 Demo 模拟笔记，数据均为演示；同款入门课程可以丢给 AI 匹配参考，下一站想解锁手冲。✨',
    ],
    dishes: [
      { emoji: '☕', name: '拉花课程', note: '奶泡打发 + 注点练习' },
      { emoji: '👨‍🏫', name: '小班教学', note: '老师示范 + 手把手纠姿' },
      { emoji: '🥛', name: '豆奶全含', note: '练习材料不用另买' },
      { emoji: '📖', name: '单节可约', note: '不强制报全套' },
    ],
    scenes: ['技能学习', '周末体验', '一人可去'],
    topics: ['#咖啡拉花', '#手冲咖啡', '#体验课'],
    stats: { like: 1740, fav: 628, cmt: 93 },
    comments: [
      { name: '绵密奶泡', avatar: '泡', hue: 30, text: '练习杯数很重要，一次至少 3 杯才有手感', at: '1 天前' },
    ],
  },
  {
    id: 'n1',
    author: { name: '番茄酱不加班', avatar: '番', hue: 12, desc: '探店博主 · 128 篇笔记 · 虚构账号' },
    title: '被松露意面香迷糊了！打工人午休的治愈小店',
    coverKey: 'pasta',
    img: 'img/pasta.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '3/5',
    cat: 'food',
    imageKeys: ['pasta', 'tiramisu', 'drink'],
    photos: ['img/pasta.jpg', 'img/dessert.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '午休和同事盲选的一家意式小馆，进门就是咖啡混着木头的香气，落地窗下午的光特别舒服，坐到下午也不赶人。',
      '松露意面是当天的高光：黑松露现刨，奶油酱裹得很匀，一口下去香得隔壁桌都在看。',
      '甜点认准开心果提拉米苏，开心果碎混着微苦可可，再配一杯无酒精特调「木屿日落」，打工人的下午瞬间值回票价。',
      '已经把这家写进回访清单，下次带闺蜜二刷。',
    ],
    dishes: [
      { emoji: '🍝', name: '松露意面', note: '黑松露现刨 · 奶油酱浓而不腻' },
      { emoji: '🍰', name: '开心果提拉米苏', note: '开心果碎 + 微苦可可，口感层次很足' },
      { emoji: '🍹', name: '特调「木屿日落」', note: '无酒精 · 西柚 + 接骨木花，颜值在线' },
    ],
    scenes: ['日常探店', '朋友聚会', '午休充电'],
    topics: ['#永康路探店', '#打工人午餐', '#松露意面'],
    stats: { like: 3289, fav: 1204, cmt: 213 },
    productId: 'p1',
    comments: [
      { name: '芝士就是力量', avatar: '芝', hue: 230, text: '求个地址！松露意面看起来太香了', at: '3 天前' },
      { name: '早八人小葵', avatar: '葵', hue: 280, text: '上周去过，下午的落地窗光真的很好，坐着不想走', at: '5 天前' },
    ],
  },
  {
    id: 'n10',
    author: { name: '球拍先飞', avatar: '拍', hue: 130, desc: '运动搭子发起人 · 66 篇笔记 · 虚构账号' },
    title: '下班打两小时羽毛球，治好了我的精神内耗',
    coverKey: 'shuttle',
    ratio: '4/5',
    cat: 'sport',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    img: 'img/badminton.jpg',   /* 实景图（演示素材） */
    imageKeys: ['shuttle', 'climb', 'drink'],
    photos: ['img/badminton.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '工位坐一天，下班最想干的事就是挥拍。但约球友比约饭难十倍——群里喊一嗓子三天没人回，球场又总订不到好时段。',
      '后来发现可以约陪练课：教练带着练高远球和步法，一个人也能打满全场，两小时下来汗流透了，晚上睡得特别香。零基础也别慌，教练会按水平调强度。',
      '给想入坑的朋友划重点：球拍可以现场租（不用先买）、场地费含不含在课里要问清、晚场 20 点以后的时段最抢手，建议提前两三天约。',
      '一个人去完全没压力，想要固定搭子的话评论区吼一声。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '🏸', name: '羽毛球陪练课', note: '教练带练 · 强度可调' },
      { emoji: '🏃', name: '步法专项', note: '高远球 + 前后场移动' },
      { emoji: '🎽', name: '器材可租', note: '现场租拍 · 不用先买' },
      { emoji: '🌙', name: '晚场时段', note: '下班后 20 点档最抢手' },
    ],
    scenes: ['下班运动', '一人可去', '找搭子'],
    topics: ['#羽毛球', '#下班充电', '#运动搭子'],
    stats: { like: 3902, fav: 1548, cmt: 402 },
    productId: 'p6',
    comments: [
      { name: '反手杀球', avatar: '杀', hue: 120, text: '周二周四的场人也多，去晚了还得排', at: '1 天前' },
      { name: '菜但不虚', avatar: '菜', hue: 135, text: '零基础真的能跟上吗，怕拖累别人', at: '2 天前' },
    ],
  },
  {
    id: 'n7',
    author: { name: '一只鹿过生日', avatar: '鹿', hue: 325, desc: '生日企划博主 · 87 篇笔记 · 虚构账号' },
    title: '在这家餐厅过生日，氛围感真的很好',
    coverKey: 'cake',
    ratio: '4/5',
    cat: 'food',
    img: 'img/birthday.jpg',   /* 实景图（演示素材）：同 n17 场景 */
    imageKeys: ['cake', 'bday', 'lights'],
    photos: ['img/birthday.jpg', 'img/bar.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '提前一周开始挑店，要求就三条：安静、出片、甜品能上台面。最后锁了木屿，事实证明选对了。',
      '窗边的位置傍晚光线刚好，桌面是小烛台加干花的布置，甜品拼盘端上来时店里帮着点了蜡烛，他愣住三秒。',
      '双人主菜分量刚好：牛排火候在线，意面也香；甜品拼盘摆得像小型装置艺术，拍照不用挪位置，窗边随手拍都出片。',
      '想复刻的朋友记得：下单时勾「生日氛围布置」，要等商家确认了才算数，别默认一定有（我那次是提前和店家确认过的；本篇为 Demo 模拟笔记）。',
    ],
    dishes: [
      { emoji: '🎂', name: '生日甜品拼盘', note: '含摆盘蜡烛 · 上桌有小仪式' },
      { emoji: '🥩', name: '香煎牛排（双主食）', note: '火候在线 · 配黑椒汁' },
      { emoji: '🪟', name: '窗边双人位', note: '傍晚六点后的光最有氛围' },
      { emoji: '🕯️', name: '桌面小布置', note: '烛台 + 干花 · 需商家确认' },
    ],
    scenes: ['生日', '约会', '纪念日'],
    topics: ['#生日晚餐', '#约会企划', '#仪式感'],
    stats: { like: 6218, fav: 2983, cmt: 452 },
    productId: 'p3',
    comments: [
      { name: '小蛋糕逃跑', avatar: '糕', hue: 350, text: '求问布置是下单就含还是要单独约？下个月纪念日想抄作业', at: '1 天前' },
      { name: '晚风信箱', avatar: '风', hue: 210, text: '点蜡烛那段看得我嘴角压不住，抄了抄了', at: '3 天前' },
      { name: '阿茶探店', avatar: '茶', hue: 205, text: '这家的甜品摆盘确实稳，上次去也出片了', at: '4 天前' },
    ],
  },
  {
    id: 'n2',
    author: { name: '林间有风', avatar: '林', hue: 150, desc: '生活方式博主 · 约会企划 · 虚构账号' },
    title: '约会来这家！窗边的自然光把人拍得很好看',
    coverKey: 'window',
    img: 'img/dessert.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '3/5',
    cat: 'food',
    imageKeys: ['window', 'dessert', 'interior'],
    photos: ['img/dessert.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '为纪念日找的店，提前约到了窗边位。下午的自然光斜斜打进来，随手一拍都是干净的暖调，完全不用修图。',
      '双人晚餐组合很省心：小食、主食、现烤舒芙蕾和两杯饮品一次配齐，不用对着菜单纠结。',
      '舒芙蕾现烤 18 分钟，端上来还在颤，两个人分刚好；配的饮品也能换成无酒精版本。',
      '靠窗位数量不多，建议下单时勾选「靠窗出片位」权益并等商家确认，别白跑一趟。',
    ],
    dishes: [
      { emoji: '🍽️', name: '双人晚餐组合', note: '小食 + 双主食 + 甜点 + 两杯饮品' },
      { emoji: '🍮', name: '现烤舒芙蕾', note: '现烤 18 分钟 · 端上桌还在颤' },
      { emoji: '🪟', name: '靠窗双人位', note: '15:00–19:00 自然光最好，出片率极高' },
    ],
    scenes: ['约会', '纪念日', '闺蜜聚会'],
    topics: ['#约会企划', '#自然光出片', '#舒芙蕾'],
    stats: { like: 5102, fav: 2317, cmt: 341 },
    productId: 'p2',
    comments: [
      { name: '小满不吃香菜', avatar: '满', hue: 90, text: '纪念日也来的这家，舒芙蕾真的绝，现场比图还好看', at: '2 天前' },
      { name: '柚子气泡水', avatar: '柚', hue: 55, text: '靠窗位记得早点约，我们上次去差点没约到', at: '6 天前' },
    ],
  },
  {
    id: 'n3',
    author: { name: '拿铁不加糖', avatar: '拿', hue: 25, desc: '咖啡地图收集者 · 96 篇笔记 · 虚构账号' },
    title: '永康路的咖啡小站，一杯手冲把周末叫醒',
    coverKey: 'coffee',
    img: 'img/pour.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '3/5',
    cat: 'cafe',
    imageKeys: ['coffee', 'drink', 'interior'],
    photos: ['img/pour.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '周末早上去的，整条街还没醒透，只有咖啡机的声音和刚出炉的可颂香气，坐在吧台看店主手冲，本身就是一种休息。',
      '豆单每两周换一次，这周的是一支埃塞俄比亚水洗，柑橘调很干净，入口温温柔柔的酸。',
      '店主会很耐心地问你的口味偏好，第一次来也不会有「不懂咖啡」的压力，i 人友好。',
      '没有正餐，只有咖啡和少量烘焙，适合把这里当周末路线的第一站。',
    ],
    dishes: [
      { emoji: '☕', name: '手冲单品（豆单双周更换）', note: '本周：埃塞俄比亚水洗 · 柑橘调' },
      { emoji: '🥐', name: '现烤可颂', note: '早上出炉 · 黄油香很足，配黑咖刚好' },
    ],
    scenes: ['周末充电', '一人食', '咖啡探店'],
    topics: ['#永康路咖啡', '#手冲地图', '#i人友好'],
    stats: { like: 2760, fav: 982, cmt: 156 },
    productId: null,
    comments: [
      { name: '豆子 hunter', avatar: '豆', hue: 340, text: '这家豆单确实换得勤，回购三次了', at: '1 天前' },
      { name: '早起的鸟', avatar: '鸟', hue: 200, text: '早上十点去不用排队，亲测', at: '4 天前' },
    ],
  },
  {
    id: 'n4',
    author: { name: '阿茶探店', avatar: '茶', hue: 205, desc: '街拍向探店 · 211 篇笔记 · 虚构账号' },
    title: '街角发现一家绿色门头的意式小馆，进门就被治愈',
    coverKey: 'storefront',
    img: 'img/cafe.jpg',   /* 实景图（演示素材） */
    ratio: '4/5',
    cat: 'food',
    imageKeys: ['storefront', 'interior', 'pasta'],
    photos: ['img/cafe.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '本来是去隔壁买花，路过被这个墨绿色门头 + 原木窗框拦住了脚步，随手一拍就是街头感大片。',
      '推门进去是暖黄的灯光和木头桌子，下午三点人不太多，店主在吧台慢慢备料，氛围松弛得不像饭点。',
      '一个人来坐吧台也不会尴尬，点了份小食拼盘慢慢吃，适合逛街逛累了进来充电。',
      '门头下午顺光，四点左右来拍最出片；对面的梧桐树影会落在门口，很有电影感。',
    ],
    dishes: [
      { emoji: '🌿', name: '绿色门头 · 街拍机位', note: '下午四点顺光 · 梧桐树影加持' },
      { emoji: '🪵', name: '原木吧台位', note: '一人友好 · 可以看店主备料' },
    ],
    scenes: ['街拍', '日常探店', '一人食'],
    topics: ['#街角小店', '#绿色门头', '#梧桐区'],
    stats: { like: 4021, fav: 1876, cmt: 268 },
    productId: 'p1',
    comments: [
      { name: '胶片爱好者', avatar: '胶', hue: 15, text: '这个门头真的很好拍，测光建议减一档', at: '2 天前' },
      { name: '周末散步家', avatar: '散', hue: 130, text: '原来这家就是永康路那家！去过，意面不踩雷', at: '1 周前' },
    ],
  },
  {
    id: 'n5',
    author: { name: '一碗小粥', avatar: '粥', hue: 320, desc: 'Brunch 爱好者 · 67 篇笔记 · 虚构账号' },
    title: '和闺蜜的周末 Brunch，摆盘和光线都太会了',
    coverKey: 'brunch',
    img: 'img/brunch.jpg',   /* 实景图（演示素材） */
    ratio: '1/1',
    cat: 'food',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    imageKeys: ['brunch', 'dessert', 'tiramisu'],
    photos: ['img/brunch.jpg', 'img/latte.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '周六早上十一点到的，不用排队。白色桌布 + 大窗，菜品端上来就是自带打光的效果，闺蜜拍了两百张不夸张。',
      '班尼迪克蛋的水波蛋切开会流心，火腿换成了烟熏三文鱼，一点不腻；配的沙拉酱是油醋，清爽挂。',
      '餐后甜点点了舒芙蕾松饼，松软到不像话，两个人分一份刚好，不会甜到负担。',
      '整体是「贵一点但值」的类型，适合把闺蜜聚会安排在这里，边吃边聊能坐一上午。',
    ],
    dishes: [
      { emoji: '🍳', name: '三文鱼班尼迪克蛋', note: '水波蛋流心 · 油醋沙拉解腻' },
      { emoji: '🥞', name: '舒芙蕾松饼（双人份）', note: '现做约 15 分钟 · 松软不齁甜' },
    ],
    scenes: ['闺蜜聚会', '周末充电', '出片餐厅'],
    topics: ['#周末Brunch', '#闺蜜聚会', '#出片餐厅'],
    stats: { like: 6433, fav: 2988, cmt: 402 },
    productId: null,
    comments: [
      { name: '松饼星人', avatar: '松', hue: 45, text: '舒芙蕾松饼真的好吃，等待也值得', at: '3 天前' },
      { name: '拍照手残党', avatar: '拍', hue: 175, text: '靠窗的位置光线绝了，随便拍都好看', at: '1 周前' },
    ],
  },
  {
    id: 'n6',
    author: { name: '夜航西飞', avatar: '夜', hue: 260, desc: '城市夜生活记录 · 53 篇笔记 · 虚构账号' },
    title: '周五晚上的小酒馆氛围，灯光像被调成了暖色滤镜',
    coverKey: 'lights',
    img: 'img/bar.jpg',   /* 实景图（演示素材） */
    ratio: '4/5',
    cat: 'cafe',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    imageKeys: ['lights', 'interior', 'drink'],
    photos: ['img/bar.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '加完班直接过来，推门那一瞬间整个人就松下来了：暖黄的灯串、木桌、很轻的爵士，周五的疲惫被按了暂停键。',
      '两杯特调 + 一份小食拼盘，坐在窗边看街上人来人往，聊天不用抬高音量，这个很难得。',
      '特调「木屿日落」无酒精版本也好喝，开车来的朋友不用只喝气泡水。',
      '晚上七点到九点人最多，想安静聊天的建议九点后或者周五之前来。',
    ],
    dishes: [
      { emoji: '🌙', name: '夜晚窗边位', note: '灯串 + 街景 · 九点后最安静' },
      { emoji: '🍹', name: '特调 · 无酒精可选', note: '「木屿日落」酸甜平衡，不齁' },
    ],
    scenes: ['下班充电', '小酌微醺', '朋友聚会'],
    topics: ['#周五夜晚', '#氛围小酒馆', '#无酒精特调'],
    stats: { like: 3857, fav: 1655, cmt: 231 },
    productId: null,
    comments: [
      { name: '夜行动物', avatar: '夜', hue: 300, text: '灯串太出片了，手机直出都有氛围', at: '2 天前' },
      { name: '不喝酒的阿伦', avatar: '伦', hue: 80, text: '无酒精特调好评，终于不是只有气泡水了', at: '5 天前' },
    ],
  },
  {
    id: 'n8',
    author: { name: '陶泥不糊', avatar: '陶', hue: 28, desc: '手作体验党 · 41 篇笔记 · 虚构账号' },
    title: '第一次拉坯手抖成筛子，但真的好解压',
    coverKey: 'pottery',
    ratio: '4/5',
    cat: 'craft',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    img: 'img/clay.jpg',   /* 实景图（演示素材） */
    imageKeys: ['pottery', 'ring', 'drink'],
    photos: ['img/clay.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '被「鬼打墙」式加班搞到神经衰弱，朋友说去捏泥吧，别刷手机了。抱着「大不了玩成灾难」的心态报了个陶艺体验。',
      '拉坯比想象难十倍：泥在转盘上根本不听话，师傅扶着我的手带了三次才起了一个歪歪扭扭的杯身，全程手抖，但注意力全在泥上，脑子真的安静了。',
      '有几个坑想提醒：材料费一般含不含泥料要问清，做出来的东西要等烧制（有的店烧制另收费），成品是自取还是包邮也得提前确认，不然两周后你都想不起来这事儿。',
      '一个人去完全 OK，店里很多独自来的；如果是双人同行可以一起拼个工作台。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '🏺', name: '陶艺拉坯体验', note: '含师傅手把手教学 · 约 90 分钟' },
      { emoji: '👐', name: '手抖也能完成', note: '师傅会帮忙救泥 · 零基础友好' },
      { emoji: '🔥', name: '烧制成品', note: '一般需等 2 – 3 周 · 费用要先问清' },
      { emoji: '🧘', name: '解压神器', note: '注意力全在泥上 · 脑子自动放空' },
    ],
    scenes: ['解压', '一人体验', '朋友同行'],
    topics: ['#陶艺体验', '#解压日常', '#零基础手作'],
    stats: { like: 4832, fav: 2174, cmt: 318 },
    productId: 'p4',
    comments: [
      { name: '杯子叠叠乐', avatar: '叠', hue: 35, text: '请问烧制费是另算的吗？想去但怕加钱', at: '2 天前' },
      { name: '泥巴战士', avatar: '泥', hue: 20, text: '手抖人狂喜，师傅真的会救', at: '3 天前' },
    ],
  },
  {
    id: 'n9',
    author: { name: '一枚银两', avatar: '银', hue: 210, desc: '情侣手作收集者 · 23 篇笔记 · 虚构账号' },
    title: '纪念日做了对银戒，比买的贵但值哭',
    coverKey: 'ring',
    ratio: '4/5',
    cat: 'craft',
    img: 'img/silver.jpg',   /* 实景图（演示素材） */
    imageKeys: ['ring', 'pottery', 'cake'],
    photos: ['img/silver.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '纪念日不想再互送「拆开就吃灰」的礼物，搜到一家银饰 DIY 工作坊，做一对戒指刚好。',
      '银料按克算，我们做的是最细的素圈，两个人敲敲打打一下午：退火、塑形、錾字，最后抛光出来的瞬间真的很戳——戒圈内侧錾了日期，磨不平的那种。',
      '经验之谈：银料费是否含在套餐里、字数有没有限制、做坏了能不能返工，这三件事下单前一定问清楚。成品可以当天带走，不用像陶艺那样等烧制。',
      '适合情侣 / 闺蜜 / 母女，一个人去做也行但氛围会少一半。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '💍', name: '银饰 DIY 对戒', note: '银料按克计 · 敲打成型' },
      { emoji: '🔨', name: '全流程亲手做', note: '退火 / 塑形 / 錾字 / 抛光' },
      { emoji: '✨', name: '当天带走', note: '无需等待 · 抛光完直接上手' },
      { emoji: '🗓️', name: '内侧錾日期', note: '字数限制要提前问' },
    ],
    scenes: ['纪念日', '情侣', '闺蜜'],
    topics: ['#银饰DIY', '#对戒', '#亲手做的礼物'],
    stats: { like: 7216, fav: 3542, cmt: 517 },
    productId: 'p5',
    comments: [
      { name: '小锤八十', avatar: '锤', hue: 220, text: '錾字那条看哭了，回去就预约', at: '1 天前' },
      { name: '银货两讫', avatar: '讫', hue: 205, text: '问一句银料费是套餐内还是另算呀', at: '2 天前' },
      { name: '橘子汽水', avatar: '橘', hue: 30, text: '和闺蜜做过，成品比想象精致', at: '6 天前' },
    ],
  },
  {
    id: 'n11',
    author: { name: '恐高但上头', avatar: '高', hue: 195, desc: '新运动尝鲜中 · 18 篇笔记 · 虚构账号' },
    title: '恐高人士第一次攀岩：爬到一半想撤，落地之后想再来',
    coverKey: 'climb',
    img: 'img/climbing.jpg',   /* 实景图（演示素材） */
    ratio: '4/5',
    cat: 'sport',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    imageKeys: ['climb', 'shuttle', 'pasta'],
    photos: ['img/climbing.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '朋友说「攀岩就是成年人的攀爬架」，我这恐高星人本来是拒绝的，被拽去之后：前三分钟想逃，第三十分钟开始上头。',
      '新手墙其实不高，教练全程在下面带保护绳，脚点手点都标好了颜色路线，像真人版解谜游戏。难点不在力量，在于敢不敢把重心交给腿。',
      '提醒几件事：装备（安全带 + 攀岩鞋）可以现场租，不用先买；新手课一般 90 分钟足够体验两条线路；穿宽松衣服，别穿裙子（真有人穿）。',
      '一个人去很正常，岩馆里独自刷线的人比情侣多。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '🧗', name: '攀岩新手课', note: '教练带保护 · 约 90 分钟' },
      { emoji: '🪢', name: '全程保护绳', note: '自动保护器 + 教练双保险' },
      { emoji: '👟', name: '攀岩鞋可租', note: '现场租 · 别穿板鞋' },
      { emoji: '🧩', name: '颜色线路', note: '像解谜 · 新手墙不高' },
    ],
    scenes: ['新运动尝鲜', '一人可去', '解压'],
    topics: ['#攀岩', '#恐高挑战', '#新手上墙'],
    stats: { like: 5620, fav: 2861, cmt: 379 },
    productId: 'p7',
    comments: [
      { name: '壁虎预备役', avatar: '壁', hue: 200, text: '自动保护器是啥？一个人去也不用担心吗', at: '1 天前' },
      { name: '落地风扇', avatar: '扇', hue: 190, text: '「落地之后想再来」太真实了', at: '4 天前' },
    ],
  },
  {
    id: 'n12',
    author: { name: '浅烘不浅睡', avatar: '烘', hue: 25, desc: '咖啡巡店地图党 · 52 篇笔记 · 虚构账号' },
    title: '半日刷了三家咖啡馆，手冲新手入门心得',
    coverKey: 'pour',
    img: 'img/cafe.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '4/5',
    cat: 'cafe',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    imageKeys: ['pour', 'market', 'drink'],
    photos: ['img/cafe.jpg', 'img/latte.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '从速溶党进化到买豆子的第三周，决定系统刷一遍城里的精品咖啡店，半日巡了三家，每家点一杯手冲。',
      '最大的收获是「原来手冲有这么多变量」：同一种耶加，三家冲出来的味道完全不同。第三家老板直接站在吧台边讲了水温、粉水比和注水手法，听完感觉省了一年的学费。',
      '新手建议：优先选有吧台座位、能看到冲煮过程的店；周末下午人多的时候老板没空搭理你，工作日下午去体验最好；有的店晚上也营业，适合下班去。',
      '巡店路线我按地铁线排的，三家之间步行都十分钟内。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '☕', name: '手冲单品咖啡', note: '耶加 / 蓝姬莉轮着喝' },
      { emoji: '🧪', name: '冲煮变量公开', note: '水温 / 粉水比 / 手法' },
      { emoji: '🪑', name: '吧台座位', note: '看老板现场冲 · 工作日下午人少' },
      { emoji: '🚇', name: '按地铁线巡店', note: '三家步行 10 分钟内' },
    ],
    scenes: ['一人巡店', '咖啡入门', '周末'],
    topics: ['#手冲咖啡', '#咖啡巡店', '#精品咖啡'],
    stats: { like: 4155, fav: 2289, cmt: 262 },
    productId: 'p8',
    comments: [
      { name: '拿铁拉花中', avatar: '拉', hue: 30, text: '工作日下午去真的能聊冲煮，学到了', at: '1 天前' },
      { name: '豆子仓库', avatar: '豆', hue: 20, text: '求这条巡店路线，周末去刷', at: '3 天前' },
    ],
  },
  {
    id: 'n13',
    author: { name: '市集扫货王', avatar: '集', hue: 50, desc: '周末去哪儿研究员 · 74 篇笔记 · 虚构账号' },
    title: '周末市集怎么逛最出片：上午十点进，下午两点出',
    coverKey: 'market',
    img: 'img/market.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '3/5',
    cat: 'cafe',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    imageKeys: ['market', 'pour', 'tiramisu'],
    photos: ['img/market.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '逛了三次周末市集总结出的铁律：十点开门就进（人少好拍），十二点吃小吃摊，两点前撤（人挤到没法走路）。',
      '这次最值的是一杯现磨手冲和一束鲜花，加起来不到五十。市集的乐趣在于「不知道会遇见什么」：手工蜡烛、中古餐具、独立插画师的摊位，每个摊主都愿意跟你聊。',
      '出片要点：主舞台区的灯串下午逆光最好看；穿浅色系衣服在摊位间不违和；手机开连拍，人来人往反而有氛围感。',
      '市集一般中午到下午最热闹，部分摊位傍晚就收了，别去太晚。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '🎪', name: '周末创意市集', note: '上午十点进场 · 人少好拍' },
      { emoji: '🌻', name: '鲜花与手作摊', note: '每个摊主都能聊两句' },
      { emoji: '📸', name: '灯串逆光机位', note: '主舞台区 · 下午最出片' },
      { emoji: '☕', name: '现磨手冲摊', note: '市集价格意外友好' },
    ],
    scenes: ['周末', '拍照', '闺蜜同行'],
    topics: ['#周末市集', '#出片攻略', '#城市漫步'],
    stats: { like: 6837, fav: 3920, cmt: 445 },
    productId: 'p9',
    comments: [
      { name: '早八赶集人', avatar: '赶', hue: 55, text: '十点进场的建议太对了，晚到全是人头', at: '2 天前' },
      { name: '胶片小张', avatar: '张', hue: 45, text: '逆光机位收了，下次带相机去', at: '5 天前' },
    ],
  },
  {
    id: 'n14',
    author: { name: '十公里新手村', avatar: '村', hue: 105, desc: '徒步新手记录员 · 29 篇笔记 · 虚构账号' },
    title: '第一次走完 10 公里：腿是酸的，人是重启的',
    coverKey: 'hike',
    img: 'img/hike.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '3/5',
    cat: 'outdoor',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    imageKeys: ['hike', 'camp', 'market'],
    photos: ['img/hike.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '久坐两年、体检报告开始飘黄之后，选了条城郊入门线当「重启键」。全程 10 公里，爬升 300 米，官方标签是「休闲徒步」。',
      '真实感受：前 5 公里有说有笑，后 5 公里只剩喘。但山顶风一吹，城市在脚下铺开的那一刻，值。同行的有大叔也有学生，配速完全不用卷，走不动就歇。',
      '新手 Checklist：登山鞋或至少运动鞋（别穿帆布鞋，别问我怎么知道的）；水带 1 升起；集合一般是地铁口拼车，费用是否含车费和保险要提前问清；护膝 downhill 的时候真的救命。',
      '一个人报名也 OK，领队会照顾散客；想找固定搭子的评论区集合。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '🥾', name: '城郊入门徒步线', note: '10 公里 · 爬升 300 米 · 休闲级' },
      { emoji: '🚇', name: '地铁口集合出发', note: '拼车前往 · 费用要问清是否含' },
      { emoji: '🧗', name: '山顶视野', note: '城市在脚下铺开 · 风很值' },
      { emoji: '👯', name: '散客友好', note: '领队照顾 · 配速不用卷' },
    ],
    scenes: ['周末', '一人可去', '找搭子'],
    topics: ['#入门徒步', '#周末出走', '#徒步搭子'],
    stats: { like: 4571, fav: 2533, cmt: 386 },
    productId: 'p10',
    comments: [
      { name: '护膝党党魁', avatar: '膝', hue: 110, text: '下坡护膝 +1，膝盖会感谢你', at: '1 天前' },
      { name: '装备问三连', avatar: '装', hue: 95, text: '装备清单有吗？第一次不知道带啥', at: '3 天前' },
    ],
  },
  {
    id: 'n15',
    author: { name: '驮包去露营', avatar: '驮', hue: 260, desc: '骑行 + 露营双修 · 37 篇笔记 · 虚构账号' },
    title: '骑行 30 公里到营地野餐，这才是周末该有的样子',
    coverKey: 'camp',
    img: 'img/camp.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '3/5',
    cat: 'outdoor',
    actOK: true,   /* 适合多人组局：显示「同好活动」入口 */
    imageKeys: ['camp', 'hike', 'shuttle'],
    photos: ['img/camp.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '周末不想宅，也不想去人挤人的景区，和朋友选了「骑行 + 露营」组合：早上骑车 30 公里到城郊营地，下午野餐发呆，傍晚收摊回城。',
      '路线大部分是河堤绿道，坡度友好，会骑车就能完成；驮包里塞了野餐垫和三明治，到营地铺开的那刻幸福感直接拉满。帐篷是营地现搭的天幕区，不用自己背装备。',
      '提醒：租车要问清是否含头盔；防晒和水一定要带够（河堤基本没遮挡）；如果是傍晚场记得看收摊时间，别骑夜路。',
      '两三人组队最合适，一个人也行但拍照没人帮你。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '🚴', name: '河堤绿道骑行', note: '30 公里 · 坡度友好' },
      { emoji: '⛺', name: '营地天幕野餐', note: '现搭天幕 · 不用背装备' },
      { emoji: '🧺', name: '野餐幸福感', note: '垫子一铺 · 发呆一下午' },
      { emoji: '🪖', name: '头盔必带', note: '租车是否含要问清' },
    ],
    scenes: ['周末', '朋友组队', '一人可去'],
    topics: ['#骑行露营', '#周末出走', '#河堤绿道'],
    stats: { like: 5908, fav: 3207, cmt: 433 },
    productId: 'p11',
    comments: [
      { name: '夜骑要不得', avatar: '夜', hue: 270, text: '收摊时间那条真实用，上次差点骑夜路', at: '2 天前' },
      { name: '驮包不驮我', avatar: '包', hue: 255, text: '一个人去也很自在，河堤拍照随手都是片', at: '4 天前' },
    ],
  },
  {
    id: 'n16',
    author: { name: '黄油手不慌', avatar: '黄', hue: 42, desc: '手作体验党 · 12 篇笔记 · 虚构账号' },
    title: '第一次做司康就成功，烘焙真是手残党友好的手作',
    coverKey: 'bake',
    img: 'img/bake.jpg',   /* 实景图（演示素材）：拆自用户上传的场景参考拼图 */
    ratio: '3/5',
    cat: 'craft',
    actOK: true,
    imageKeys: ['bake', 'cake', 'drink'],
    photos: ['img/bake.jpg'],   /* 笔记轮播实景图（演示素材），与笔记内容同场景 */
    paras: [
      '本来是陪朋友去上烘焙体验课，结果我比她还上头：从称量黄油、搓成砂砾状到压模，两个小时全程不用动脑子，成品出炉那一下真的会有成就感。',
      '司康是新手天花板：不用裱花不用整形，压模烤 18 分钟就能吃，配店里现打的奶油和果酱，当下午茶直接原地升天。',
      '提醒想去的：材料费和工具一般都含在课里，但成品打包盒有的店要另收（先问清）；围裙店里都有，穿浅色衣服去要小心面粉；4 人一桌的拼桌形式，一个人去也能拼到伴。',
      '适合闺蜜局、同事局，也适合一个人去放空。本篇为 Demo 模拟笔记，价格为演示数据。',
    ],
    dishes: [
      { emoji: '🧈', name: '司康制作（零失败）', note: '压模成型 · 烤 18 分钟' },
      { emoji: '🍰', name: '奶油果酱下午茶', note: '出炉即食 · 原地下午茶' },
      { emoji: '🥣', name: '材料工具全含', note: '围裙 / 电子秤 / 打包盒口径先问' },
      { emoji: '👥', name: '4 人拼桌', note: '单人可拼桌 · 组队更热闹' },
    ],
    scenes: ['周末', '解压', '闺蜜同行'],
    topics: ['#烘焙体验', '#司康初体验', '#手残党友好'],
    stats: { like: 3918, fav: 1862, cmt: 174 },
    productId: 'p12',
    comments: [
      { name: '松饼星人', avatar: '松', hue: 45, text: '司康真的零失败，我第一次也成了', at: '1 天前' },
      { name: '小锤八十', avatar: '锤', hue: 220, text: '问下打包盒是含的还是另收呀', at: '3 天前' },
    ],
  },
];

DATA.products = [
  {
    id: 'p1',
    cat: 'food',
    name: '博主同款 · 必吃三件套',
    type: 'same',
    typeLabel: '同款套餐',
    price: 168,
    origRef: 196,
    priceNote: '单点模拟参考价 ¥196（虚构价格）',
    coverKey: 'pasta',
    img: 'img/pasta.jpg',   /* 实景图（演示素材）：与来源笔记同场景 */
    sourceNoteId: 'n1',
    items: [
      { emoji: '🍝', name: '松露意面', qty: 1, desc: '黑松露奶油意面 · 笔记同款招牌' },
      { emoji: '🍰', name: '开心果提拉米苏', qty: 1, desc: '开心果碎 + 现做 mascarpone' },
      { emoji: '🍹', name: '特调饮品「木屿日落」', qty: 1, desc: '无酒精 · 西柚接骨木花' },
    ],
    people: '1 – 2 人',
    scenes: ['日常探店', '朋友聚会'],
    tagline: '不用重新做攻略，一次吃到博主推荐的三样。',
    reasons: [
      '笔记同款零拼凑：博主推荐的三件直接成套，不用对着菜单二次决策',
      '组合价 ¥168 低于单点模拟参考价（虚构价格，仅 Demo 演示）',
      '购买时即选到店时间，把「种草」直接变成「有日期的到店计划」',
    ],
    perks: [],
    perkNoneNote: '该套餐为同款套餐，暂不含额外体验权益；如需靠窗位体验，可切换查看「约会出片组合」。',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 – 2 人使用；午市 / 下午茶 / 晚市时段可选',
      book: '购买时选择到店日期与时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '核销前可取消订单，模拟全额退款',
    },
    slotGroups: [
      { name: '午市', times: ['11:30', '12:00', '12:30', '13:00'] },
      { name: '下午茶', times: ['15:00', '15:30', '16:00'] },
      { name: '晚市', times: ['18:00', '18:30', '19:00'] },
    ],
    soldOut: ['12:00', '18:30'],
  },
  {
    id: 'p2',
    cat: 'food',
    name: '约会出片组合（双人）',
    type: 'perk',
    typeLabel: '体验权益套餐',
    price: 228,
    origRef: 262,
    priceNote: '单点模拟参考价 ¥262（虚构价格）',
    coverKey: 'window',
    img: 'img/dessert.jpg',   /* 实景图（演示素材）：与来源笔记同场景 */
    sourceNoteId: 'n2',
    items: [
      { emoji: '🥗', name: '小食拼盘', qty: 1, desc: '两种小食 · 笔记提及的省心搭配' },
      { emoji: '🍝', name: '双主食（意面 × 2）', qty: 2, desc: '可在商家提供范围内等价更换' },
      { emoji: '🍮', name: '现烤舒芙蕾', qty: 1, desc: '现烤 18 分钟 · 两人分食刚好' },
      { emoji: '🍹', name: '饮品 × 2', qty: 2, desc: '可换无酒精特调' },
    ],
    people: '2 人',
    scenes: ['约会', '纪念日', '闺蜜聚会'],
    reasons: [
      '双人一次配齐：小食、主食、现烤舒芙蕾与两杯饮品，约会不用做攻略',
      '可申请 15:00 – 19:00 靠窗出片位，商家确认后为你保留（模拟权益）',
      '纪念日、生日、闺蜜聚会通用，与同款套餐共用同一套预约与核销流程',
    ],
    perks: [
      {
        id: 'window',
        name: '靠窗出片位（双人）',
        desc: '商家确认后，在所选时段为你保留窗边双人位，并附小桌花布置（模拟权益，非真实承诺）',
        window: '适用于 15:00 – 19:00 的到店时段',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '2 人使用；下午出片时段 / 晚市可选',
      book: '购买时选择到店日期与时段；勾选靠窗权益后需商家确认，确认前不代表锁定座位',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '核销前可取消订单，模拟全额退款',
    },
    slotGroups: [
      { name: '下午出片', times: ['15:00', '15:30', '16:00', '16:30'] },
      { name: '晚市', times: ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00'] },
    ],
    soldOut: ['15:30', '19:30'],
  },
  {
    id: 'p3',
    cat: 'food',
    name: '双人生日约会套餐',
    type: 'same',
    typeLabel: '生日约会套餐',
    price: 299,
    origRef: 346,
    priceNote: '单点模拟参考价 ¥346（虚构价格）',
    coverKey: 'cake',
    img: 'img/birthday.jpg',   /* 实景图（演示素材）：同 n17 场景 */
    sourceNoteId: 'n7',
    tagline: '生日不用自己搭场子：主菜、甜品、氛围一次配齐。',
    items: [
      { emoji: '🥩', name: '香煎牛排（双主食）', qty: 2, desc: '谷饲牛排 · 配黑椒汁，可等价换松露意面' },
      { emoji: '🎂', name: '生日甜品拼盘', qty: 1, desc: '含摆盘蜡烛与小型上桌仪式' },
      { emoji: '🍹', name: '无酒精气泡饮 × 2', qty: 2, desc: '车厘子气泡 / 西柚接骨木花可选' },
    ],
    people: '2 人',
    scenes: ['生日', '约会', '纪念日'],
    reasons: [
      '一次配齐生日晚餐：双主菜、甜品拼盘与两杯饮品，不用对着菜单拼凑',
      '可申请「生日氛围布置」（窗边 + 烛光 + 摆盘蜡烛），商家确认后才算数（模拟权益）',
      '同样适用于约会、纪念日与普通探店：换场景不换流程，预约、改约、核销一条链',
    ],
    perks: [
      {
        id: 'bday',
        name: '生日氛围布置（窗边 + 烛光 + 摆盘蜡烛）',
        desc: '商家确认后提供窗边双人位、桌面小布置与甜品摆蜡烛（模拟权益，非真实承诺；能否提供以商家确认为准）',
        window: '适用于 17:30 – 20:00 的到店时段',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '2 人使用；傍晚 / 晚市时段可选',
      book: '购买时选择到店日期与时段；勾选生日布置后需商家确认，确认前不代表布置到位',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '核销前可取消订单，模拟全额退款',
    },
    slotGroups: [
      { name: '傍晚', times: ['17:30', '18:00', '18:30'] },
      { name: '晚市', times: ['19:00', '19:30', '20:00', '20:30'] },
    ],
    soldOut: ['19:30'],
  },
  {
    id: 'p4',
    cat: 'craft',
    name: '陶艺拉坯零基础体验（单人）',
    type: 'same',
    typeLabel: '手作体验课',
    price: 198,
    origRef: 246,
    priceNote: '单报模拟参考价 ¥246（虚构价格）',
    coverKey: 'pottery',
    img: 'img/clay.jpg',   /* 实景图（演示素材） */
    sourceNoteId: 'n8',
    groupon: {
      size: 3, price: 158, dlHours: 48, perk: '成团后每人可多选 1 次釉色装饰（需商家确认，演示权益）',
      /* 体验主题（演示配置）：发起拼团时选一个，让同好知道这团玩什么 */
      topics: [
        { name: '零基础拉坯', desc: '第一次摸泥，想亲手拉出一只杯子' },
        { name: '手作杯子', desc: '想给家里添一只自己做的马克杯' },
        { name: '釉色体验', desc: '对上釉配色好奇，想走一次完整流程' },
      ],
    },
    items: [
      { emoji: '🏺', name: '拉坯体验（约 90 分钟）', qty: 1, desc: '含泥料与工具 · 师傅手把手教学' },
      { emoji: '🎨', name: '素坯修整与上釉色', qty: 1, desc: '可选哑光 / 亮釉色各 3 种' },
      { emoji: '🧾', name: '基础材料费', qty: 1, desc: '含泥料、工具与围裙使用' },
      { emoji: '📦', name: '成品领取方式二选一', qty: 1, desc: '到店自取 / 同城闪送（到付运费）' },
    ],
    people: '1 人（双人可拼台）',
    scenes: ['解压', '一人体验', '朋友同行'],
    tagline: '手抖也能带出一个歪歪可爱杯子，烧好等你来取。',
    reasons: [
      '师傅全程手把手带，零基础第一次成功率很高（失败也帮救泥）',
      '材料费含在套餐内，泥料工具围裙不用另算（模拟权益口径）',
      '烧制约需 2 – 3 周，成品自取或同城闪送都行（运费需自理）',
    ],
    perks: [],
    perkNoneNote: '该体验为课程类套餐，暂无额外权益项；烧制费与邮寄费用口径见下方规则，需以商家确认为准。',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 人使用；双人同行可下两单备注拼台',
      book: '购买时选择到店日期与时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '核销前可取消订单，模拟全额退款；成品烧制后不支持退款',
      extra: '材料费已含；烧制费按件计（演示口径 ¥20/件，以商家确认为准）',
    },
    slotGroups: [
      { name: '上午', times: ['10:00', '10:30', '11:00'] },
      { name: '下午', times: ['14:00', '14:30', '15:00', '15:30'] },
      { name: '晚场', times: ['18:30', '19:00'] },
    ],
    soldOut: ['14:30', '19:00'],
  },
  {
    id: 'p5',
    cat: 'craft',
    name: '银饰 DIY 对戒工作坊（双人）',
    type: 'same',
    typeLabel: '手作工作坊',
    price: 299,
    origRef: 358,
    priceNote: '单报模拟参考价 ¥358（虚构价格）',
    coverKey: 'ring',
    img: 'img/silver.jpg',   /* 实景图（演示素材） */
    sourceNoteId: 'n9',
    groupon: {
      size: 2, price: 258, dlHours: 48,
      topics: [
        { name: '戒指制作', desc: '想做一对日常能戴的素圈对戒' },
        { name: '纪念日手作', desc: '生日 / 纪念日前后，想做件有纪念意义的' },
        { name: '初次体验', desc: '没玩过银饰 DIY，想先试一次手感' },
      ],
    },
    items: [
      { emoji: '💍', name: '素圈对戒制作（2 枚）', qty: 2, desc: '银料 925 · 约 3 小时全流程' },
      { emoji: '🔨', name: '工坊工具与教学', qty: 1, desc: '退火 / 塑形 / 錾字 / 抛光全程指导' },
      { emoji: '✨', name: '成品当天带走', qty: 1, desc: '抛光完成即佩戴，无需等待' },
      { emoji: '📦', name: '戒盒包装', qty: 1, desc: '双枚装礼盒 · 附擦银布' },
    ],
    people: '2 人',
    scenes: ['纪念日', '情侣', '闺蜜'],
    tagline: '錾上日期的素圈，比买的贵一点，比买的值很多。',
    reasons: [
      '银料费按套餐内含计算（每人约 3g 素圈口径，超出部分演示加购 ¥2/g）',
      '3 小时全流程 + 师傅全程指导，做坏可返工一次（口径见规则）',
      '成品当天抛光带走，不用等 2 – 3 周烧制',
    ],
    perks: [
      {
        id: 'engrave',
        name: '内侧錾字服务（每枚 ≤ 10 字符）',
        desc: '商家确认后提供内侧錾字（日期 / 缩写均可，模拟权益，非真实承诺）',
        window: '适用于当次到店时段',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '2 人使用；单人可下两单或咨询单人价',
      book: '购买时选择到店日期与时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '核销前可取消订单，模拟全额退款；银料已裁切后不支持退款',
      extra: '银料约 3g/人含在套餐；錾字超 10 字符、银料超出部分演示加购口径 ¥2/g，以商家确认为准',
    },
    slotGroups: [
      { name: '午场', times: ['13:00', '13:30', '14:00'] },
      { name: '晚场', times: ['18:00', '18:30', '19:00'] },
      { name: '周末全日', times: ['10:30', '11:00', '15:30', '16:00'] },
    ],
    soldOut: ['14:00'],
  },
  {
    id: 'p6',
    cat: 'sport',
    name: '羽毛球双打陪练课（含场地 · 2 人）',
    type: 'same',
    typeLabel: '运动陪练课',
    price: 120,
    origRef: 150,
    priceNote: '单订模拟参考价 ¥150（虚构价格）',
    coverKey: 'shuttle',
    img: 'img/badminton.jpg',   /* 实景图（演示素材） */
    sourceNoteId: 'n10',
    groupon: {
      size: 4, price: 99, dlHours: 36, perk: '成团后加送 30 分钟多球训练（演示权益，以商家确认为准）',
      topics: [
        { name: '新手练球', desc: '刚起步，想找人一起练基本功' },
        { name: '下班运动', desc: '下班固定局，出汗解压为主' },
        { name: '提升球技', desc: '有基础，想练双打跑位和步法' },
      ],
    },
    items: [
      { emoji: '🏸', name: '教练陪练（60 分钟）', qty: 1, desc: '高远球 / 步法 / 双打跑位' },
      { emoji: '🏟️', name: '标准场地 1 片（2 小时）', qty: 1, desc: '含场地费 · 灯光费' },
      { emoji: '🎽', name: '球拍现场租', qty: 2, desc: '含球拍 2 支 · 练习球若干' },
      { emoji: '🎯', name: '水平分级开课', qty: 1, desc: '零基础 / 入门 / 进阶分组带练' },
    ],
    people: '1 – 2 人',
    scenes: ['下班运动', '一人可去', '找搭子'],
    tagline: '一个人也能打满全场：教练带练 + 场地拍子全含。',
    reasons: [
      '场地费与灯光费都含在课里，不用自己订场（演示口径）',
      '球拍可现场租，练习球由教练提供，零装备也能来',
      '晚场 20 点档最抢手，建议提前 2 – 3 天预约',
    ],
    perks: [
      {
        id: 'late20',
        name: '晚场优先时段（20:00 – 22:00）',
        desc: '商家确认后优先为你保留晚场档期（模拟权益，非真实承诺）',
        window: '适用于 20:00 – 22:00 的到店时段',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 – 2 人使用；单人下单自动匹配同水平学员拼场（演示机制）',
      book: '购买时选择日期与时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '开课前 4 小时可取消，模拟全额退款',
      extra: '场地灯光费已含；球拍租赁含 2 支，护具建议自备',
    },
    slotGroups: [
      { name: '晚场', times: ['20:00', '20:30', '21:00'] },
      { name: '周末午场', times: ['13:00', '14:00', '15:00'] },
    ],
    soldOut: ['21:00', '14:00'],
  },
  {
    id: 'p7',
    cat: 'sport',
    name: '攀岩新手入门课（含装备租赁）',
    type: 'same',
    typeLabel: '运动体验课',
    price: 158,
    origRef: 196,
    priceNote: '单报模拟参考价 ¥196（虚构价格）',
    coverKey: 'climb',
    img: 'img/climbing.jpg',   /* 实景图（演示素材） */
    sourceNoteId: 'n11',
    groupon: {
      size: 3, price: 128, dlHours: 48,
      topics: [
        { name: '第一次攀岩', desc: '没爬过，想试试新手线路' },
        { name: '基础技巧', desc: '想学发力与动作，练基本功' },
        { name: '抱石体验', desc: '对抱石墙好奇，想短时体验一把' },
      ],
    },
    items: [
      { emoji: '🧗', name: '新手课教学（90 分钟）', qty: 1, desc: '基础动作 + 两条新手线路' },
      { emoji: '🪢', name: '保护装备全套租赁', qty: 1, desc: '安全带 + 攀岩鞋 + 粉袋' },
      { emoji: '🧑‍🏫', name: '教练全程保护', qty: 1, desc: '自动保护器 + 教练地面双保险' },
      { emoji: '🎫', name: '当日馆票畅爬', qty: 1, desc: '课程结束后当日可继续自由攀' },
    ],
    people: '1 人',
    scenes: ['新运动尝鲜', '一人可去', '解压'],
    tagline: '恐高也没关系：前三分钟想逃，第三十分钟上头。',
    reasons: [
      '装备（安全带 + 攀岩鞋 + 粉袋）全部含在课里，零装备空手来',
      '教练全程地面保护 + 自动保护器双保险，一个人来也安全',
      '课后当日畅爬，第一次玩就能待满一下午',
    ],
    perks: [],
    perkNoneNote: '该体验为课程类套餐，装备租赁已含在 items 中；暂无额外权益项。私教加课等需求需与商家另行确认。',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 人使用；穿宽松运动装，勿穿裙装 / 板鞋',
      book: '购买时选择日期与时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '开课前 4 小时可取消，模拟全额退款',
      extra: '装备租赁已含；镁粉过敏请提前告知商家',
    },
    slotGroups: [
      { name: '工作日晚场', times: ['19:00', '19:30', '20:00'] },
      { name: '周末', times: ['10:00', '10:30', '14:00', '14:30', '15:00'] },
    ],
    soldOut: ['10:30', '19:30'],
  },
  {
    id: 'p8',
    cat: 'cafe',
    name: '咖啡巡店 · 手冲品鉴半日线',
    type: 'same',
    typeLabel: '城市体验线路',
    price: 128,
    origRef: 158,
    priceNote: '单买模拟参考价 ¥158（虚构价格）',
    coverKey: 'pour',
    img: 'img/pour.jpg',   /* 实景图（演示素材）：与来源笔记同场景 */
    sourceNoteId: 'n12',
    items: [
      { emoji: '☕', name: '三家精品店手冲各 1 杯', qty: 3, desc: '耶加 / 蓝姬莉 / 云南日晒 轮着喝' },
      { emoji: '🧑‍🏫', name: '店主冲煮讲解', qty: 1, desc: '水温 / 粉水比 / 注水手法演示' },
      { emoji: '🗺️', name: '巡店路线图', qty: 1, desc: '按地铁线串联 · 步行均 10 分钟内' },
      { emoji: '🪑', name: '吧台优先位', qty: 1, desc: '看现场冲煮 · 拍照友好' },
    ],
    people: '1 – 4 人',
    scenes: ['一人巡店', '咖啡入门', '周末'],
    tagline: '三杯手冲 + 三家店 + 一张老板牌冲煮笔记。',
    reasons: [
      '三家店手冲各一杯，含店主现场冲煮讲解（演示线路）',
      '路线按地铁串联，站间步行 10 分钟内，半日刚刚好',
      '工作日下午人少，店主有更多时间搭理你（建议时段）',
    ],
    perks: [
      {
        id: 'barseat',
        name: '吧台观冲优先位',
        desc: '商家确认后为你保留吧台座位（模拟权益，非真实承诺）',
        window: '适用于 14:00 – 17:00 的巡店时段',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 – 4 人使用；4 人以上建议拆单分批',
      book: '购买时选择巡店日期与集合时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '出发前 24 小时可取消，模拟全额退款',
      extra: '手冲已含 3 杯；加购甜点或豆子以现场菜单为准（演示口径另计）',
    },
    slotGroups: [
      { name: '工作日下午', times: ['13:30', '14:00', '14:30', '15:00'] },
      { name: '周末上午', times: ['10:00', '10:30', '11:00'] },
    ],
    soldOut: ['14:00'],
  },
  {
    id: 'p9',
    cat: 'cafe',
    name: '周末市集 · 摄影漫步半日票',
    type: 'same',
    typeLabel: '城市体验线路',
    price: 68,
    origRef: 86,
    priceNote: '单买模拟参考价 ¥86（虚构价格）',
    coverKey: 'market',
    img: 'img/market.jpg',   /* 实景图（演示素材）：与来源笔记同场景 */
    sourceNoteId: 'n13',
    items: [
      { emoji: '🎪', name: '市集入场早鸟（10:00）', qty: 1, desc: '提前进场 · 人少好拍 1 小时' },
      { emoji: '📸', name: '出片机位攻略卡', qty: 1, desc: '灯串逆光位 / 主舞台 3 个机位' },
      { emoji: '☕', name: '现磨手冲 1 杯', qty: 1, desc: '市集咖啡摊合作款' },
      { emoji: '🧭', name: '逛摊路线建议', qty: 1, desc: '按摊位类型分区 · 2 小时逛完' },
    ],
    people: '1 人（可结伴）',
    scenes: ['周末', '拍照', '闺蜜同行'],
    tagline: '十点进场人少好拍，两小时逛完最精华的三十个摊。',
    reasons: [
      '早鸟 10:00 提前进场，比散客早一小时拍空景（演示权益口径）',
      '附出片机位攻略卡，逆光位直接抄作业',
      '含一杯现磨手冲，逛累了有坐下喘气的地方',
    ],
    perks: [
      {
        id: 'early',
        name: '早鸟提前进场（10:00 – 11:00）',
        desc: '商家确认后开放提前进场通道（模拟权益，非真实承诺）',
        window: '适用于 10:00 – 11:00 的进场时段',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 人使用；结伴同行各持一票',
      book: '购买时选择市集日期与进场时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '出发前 24 小时可取消，模拟全额退款',
      extra: '手冲含 1 杯；部分摊位傍晚收摊，建议 16:00 前到场',
    },
    slotGroups: [
      { name: '周六', times: ['10:00', '10:30', '13:00', '13:30'] },
      { name: '周日', times: ['10:00', '10:30', '13:00', '13:30'] },
    ],
    soldOut: ['10:30'],
  },
  {
    id: 'p10',
    cat: 'outdoor',
    name: '城郊入门徒步半日线（10km · 休闲级）',
    type: 'same',
    typeLabel: '户外活动',
    price: 99,
    origRef: 128,
    priceNote: '单报模拟参考价 ¥128（虚构价格）',
    coverKey: 'hike',
    img: 'img/hike.jpg',   /* 实景图（演示素材）：与来源笔记同场景 */
    sourceNoteId: 'n14',
    items: [
      { emoji: '🥾', name: '领队带队全程', qty: 1, desc: '10 公里 · 爬升 300 米 · 休闲配速' },
      { emoji: '🚐', name: '往返拼车（地铁口集合）', qty: 1, desc: '集合点至登山口往返交通' },
      { emoji: '🛡️', name: '活动日意外险', qty: 1, desc: '当日户外意外险一份' },
      { emoji: '🎒', name: '装备清单与攻略', qty: 1, desc: '鞋 / 水 / 护膝 / 穿搭建议清单' },
    ],
    people: '1 人',
    scenes: ['周末', '一人可去', '找搭子'],
    tagline: '久坐人的重启键：10 公里休闲线，走不动就歇。',
    reasons: [
      '交通与意外险都含在活动费里（演示口径），地铁口集合不用自驾',
      '休闲配速 + 领队压尾，散客一个人报也不会被落下',
      '装备清单提前给到，第一次走也不用瞎买',
    ],
    perks: [
      {
        id: 'buddy',
        name: '同行搭子匹配（活动群拉群）',
        desc: '商家确认后按报名情况拉同行群，方便找固定搭子（模拟权益，非真实承诺）',
        window: '适用于活动日集合前后',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 人使用；未成年人需成人陪同',
      book: '购买时选择活动日期与集合时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '出发前 24 小时可取消，模拟全额退款',
      extra: '车费与保险已含；登山顶简餐为演示口径 ¥25/份另计，需现场确认',
    },
    slotGroups: [
      { name: '周六', times: ['08:30', '09:00', '09:30'] },
      { name: '周日', times: ['08:30', '09:00', '09:30'] },
    ],
    soldOut: ['09:00'],
  },
  {
    id: 'p11',
    cat: 'outdoor',
    name: '河堤骑行 + 营地天幕野餐（半日组合）',
    type: 'same',
    typeLabel: '户外活动',
    price: 168,
    origRef: 212,
    priceNote: '单订模拟参考价 ¥212（虚构价格）',
    coverKey: 'camp',
    img: 'img/camp.jpg',   /* 实景图（演示素材）：与来源笔记同场景 */
    sourceNoteId: 'n15',
    items: [
      { emoji: '🚴', name: '绿道骑行 30 公里（领骑）', qty: 1, desc: '河堤绿道 · 坡度友好 · 领骑控速' },
      { emoji: '🚲', name: '山地车 + 头盔租赁', qty: 1, desc: '含头盔 · 尺码现场调' },
      { emoji: '⛺', name: '营地天幕野餐位', qty: 1, desc: '含天幕 / 野餐垫 / 折叠桌椅' },
      { emoji: '🧺', name: '野餐简餐包', qty: 1, desc: '三明治 / 水果 / 冷萃一袋' },
    ],
    people: '1 人（2 – 3 人更佳）',
    scenes: ['周末', '朋友组队', '一人可去'],
    tagline: '骑车去野餐：30 公里绿道 + 一下午发呆。',
    reasons: [
      '车和头盔都能租，空手来也能骑（租赁已含在组合里）',
      '天幕野餐位现搭不用背装备，驮包只需要装心情',
      '野餐简餐包含主食和饮品，两点后收摊返程不骑夜路',
    ],
    perks: [
      {
        id: 'photo',
        name: '跟拍出片服务（活动跟拍 30 分钟）',
        desc: '商家确认后安排随队跟拍并当日返图（模拟权益，非真实承诺）',
        window: '适用于 14:00 – 17:00 的营地时段',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 人使用；会骑车即可，未成年人需成人陪同',
      book: '购买时选择活动日期与出发时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '出发前 24 小时可取消，模拟全额退款',
      extra: '租车头盔已含；防晒与饮用水建议自备（河堤基本无遮挡）',
    },
    slotGroups: [
      { name: '周六', times: ['09:00', '09:30', '13:30'] },
      { name: '周日', times: ['09:00', '09:30', '13:30'] },
    ],
    soldOut: ['09:30'],
  },
  {
    id: 'p12',
    cat: 'craft',
    name: '零基础烘焙体验课（司康 · 单人）',
    type: 'same',
    typeLabel: '手作体验课',
    price: 168,
    origRef: 198,
    priceNote: '单报模拟参考价 ¥198（虚构价格）',
    coverKey: 'bake',
    img: 'img/bake.jpg',   /* 实景图（演示素材）：与来源笔记同场景 */
    sourceNoteId: 'n16',
    items: [
      { emoji: '🥣', name: '称量与制面（约 2 小时）', qty: 1, desc: '电子秤 / 打蛋器 / 模具全含 · 师傅带教' },
      { emoji: '🧈', name: '司康压模与烘烤', qty: 1, desc: '零失败配方 · 烤 18 分钟出炉' },
      { emoji: '🍰', name: '出炉下午茶（现场分食）', qty: 1, desc: '配奶油与果酱 · 当场开吃' },
      { emoji: '📦', name: '成品带走 4 件', qty: 1, desc: '打包盒已含（演示口径，以商家确认为准）' },
    ],
    people: '1 人（4 人拼桌）',
    scenes: ['解压', '一人体验', '闺蜜同行'],
    tagline: '手残党也能一次成功的司康，出炉就吃。',
    reasons: [
      '材料工具围裙全含，空手来就行（打包盒口径已写明）',
      '司康不用裱花不用整形，新手成功率极高',
      '4 人拼桌形式，一个人去也能拼到伴',
    ],
    perks: [
      {
        id: 'takeaway',
        name: '成品打包加盒（多带 2 件）',
        desc: '商家确认后可多打包 2 件成品（模拟权益，非真实承诺）',
        window: '适用于当天 15:00 – 18:00 的课程场次',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 人使用；4 人拼桌，组队可各下各的单',
      book: '购买时选择到店日期与时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '核销前可取消订单，模拟全额退款',
      extra: '材料与工具已含；出炉下午茶现场分食，不折现不外带',
    },
    slotGroups: [
      { name: '上午', times: ['10:00', '10:30', '11:00'] },
      { name: '下午', times: ['14:00', '14:30', '15:00', '15:30'] },
    ],
    soldOut: ['10:30'],
  },
  {
    id: 'p13',
    cat: 'sport',
    name: '普拉提小班入门课（Reformer · 单节）',
    type: 'similar',
    typeLabel: '运动私教小班',
    price: 199,
    origRef: 260,
    priceNote: '单节模拟参考价 ¥260（虚构价格）',
    coverKey: 'pilates',
    img: 'img/pilates.jpg',   /* 实景图（演示素材）：与来源笔记同场景 */
    groupon: {
      size: 3, price: 169, dlHours: 48,
      topics: [
        { name: '核心入门', desc: '想系统练核心，从呼吸发力开始' },
        { name: '体态改善', desc: '久坐肩颈酸，想跟着教练调整体态' },
        { name: '初次器械', desc: '第一次接触 Reformer，想试试器械床' },
      ],
    },
    items: [
      { emoji: '📋', name: '体态评估（15 分钟）', qty: 1, desc: '含一次基础体态评估 · 教练出动作建议' },
      { emoji: '🛠', name: 'Reformer 器械床入门（约 50 分钟）', qty: 1, desc: '呼吸与核心发力 · 教练逐个纠动作' },
      { emoji: '🧘', name: '小班课位', qty: 1, desc: '每节最多 4 人 · 新手友好' },
      { emoji: '🥤', name: '课后放松饮', qty: 1, desc: '温水或电解质饮任选（演示口径，以商家为准）' },
    ],
    people: '1 人（小班 ≤ 4 人）',
    scenes: ['新手入门', '体态改善', '下班运动'],
    tagline: '第一节课就学会正确发力，教练盯着纠动作。',
    reasons: [
      '小班 ≤ 4 人，教练能逐个纠正动作，大团课跟不上的人先来这个',
      '含 15 分钟体态评估，先看清楚自己的问题再练',
      '单节可约不用一次报全套，周末和工作日晚间都有时段',
    ],
    perks: [
      {
        id: 'firstclass',
        name: '新手首节赠防滑袜',
        desc: '首节课到店赠普拉提防滑袜 1 双（模拟权益，非真实承诺）',
        window: '适用于首次核销的新手订单',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 人使用；小班拼课，组队可各下各的单',
      book: '购买时选择到店日期与时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '核销前可取消订单，模拟全额退款',
      extra: '器械与教具已含；请穿贴身运动服，防滑袜首节赠送',
    },
    slotGroups: [
      { name: '工作日晚间', times: ['19:00', '19:30', '20:30'] },
      { name: '周末白天', times: ['10:00', '10:30', '11:30', '14:00'] },
    ],
    soldOut: ['11:30'],
  },
  {
    id: 'p14',
    cat: 'cafe',
    name: '咖啡拉花体验课（单节 · 可做单杯带走）',
    type: 'similar',
    typeLabel: '咖啡技能小班',
    price: 158,
    origRef: 198,
    priceNote: '单节模拟参考价 ¥198（虚构价格）',
    coverKey: 'latte',
    img: 'img/latte.jpg',   /* 实景图（演示素材） */
    items: [
      { emoji: '🥛', name: '奶泡打发与注点手法（约 60 分钟）', qty: 1, desc: '教练示范 + 手把手纠姿 · 小班 ≤ 4 人' },
      { emoji: '☕', name: '练习拿铁 3–4 杯', qty: 1, desc: '练习用豆与牛奶全含 · 成品自己喝或带走 1 杯' },
      { emoji: '🎁', name: '爱心/树叶图样教学', qty: 1, desc: '第一节课目标：一颗完整的爱心（演示口径）' },
      { emoji: '📖', name: '单节可约', qty: 1, desc: '不强制报全套课程 · 时间灵活选' },
    ],
    people: '1 人（小班 ≤ 4 人）',
    scenes: ['技能学习', '周末体验', '一人可去'],
    tagline: '一节课拉出第一颗爱心，豆奶全含不另收。',
    reasons: [
      '单节可约，先试一次再决定要不要报全套',
      '每节练 3–4 杯，练习量足够形成手感',
      '练习用豆和奶全部包含，成品当场喝掉或带走',
    ],
    perks: [
      {
        id: 'takecup',
        name: '成果杯带走（赠防漏杯盖）',
        desc: '最后一杯作品可带走，赠防漏杯盖（模拟权益，非真实承诺）',
        window: '适用于当天课程结束时',
      },
    ],
    perkNoneNote: '',
    rules: {
      validity: '下单后 30 天内有效（有效期已在下单前展示）',
      use: '1 人使用；小班拼课，组队可各下各的单',
      book: '购买时选择到店日期与时段，提交后需商家确认预约',
      change: '商家确认前后均可改约，本 Demo 最多改约 2 次；改约后需商家重新确认',
      refund: '核销前可取消订单，模拟全额退款',
      extra: '练习豆奶已含；拉花作品不折现，仅限本人饮用或带走',
    },
    slotGroups: [
      { name: '工作日', times: ['14:00', '16:00', '19:00'] },
      { name: '周末', times: ['10:00', '10:30', '13:30', '15:30'] },
    ],
    soldOut: ['16:00'],
  },
];


/* ---------- 多品类插画封面（内联 SVG） ---------- */
COVER.pottery = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="陶艺拉坯插画">
  <defs>
    <linearGradient id="po-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe7dc"/><stop offset="1" stop-color="#e2d4c2"/></linearGradient>
    <radialGradient id="po-clay" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#b0714e"/><stop offset="1" stop-color="#8a4f33"/></radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#po-bg)"/>
  <circle cx="60" cy="48" r="24" fill="#e0cdb4" opacity="0.7"/>
  <circle cx="352" cy="244" r="34" fill="#ddc9ad" opacity="0.6"/>
  <path d="M0 236 Q 100 214 200 228 T 400 220 L 400 300 L 0 300 Z" fill="#cbb191" opacity="0.5"/>
  <ellipse cx="200" cy="238" rx="86" ry="14" fill="#b99b74" opacity="0.5"/>
  <ellipse cx="200" cy="232" rx="72" ry="10" fill="#f4ece0"/>
  <path d="M170 120 q30 -16 60 0 l-6 112 q-24 10 -48 0 Z" fill="url(#po-clay)"/>
  <path d="M170 120 q30 -16 60 0 l-2 40 q-28 10 -56 0 Z" fill="#c08259"/>
  <ellipse cx="200" cy="120" rx="30" ry="9" fill="#5c4632"/>
  <ellipse cx="200" cy="118" rx="26" ry="7" fill="#3d2e20"/>
  <g stroke="#e8dbc8" stroke-width="10" fill="none" stroke-linecap="round">
    <path d="M126 176 q18 -10 30 -2"/><path d="M272 176 q-18 -10 -30 -2"/>
  </g>
  <g fill="#9c6b4a" opacity="0.9">
    <path d="M96 208 q10 -22 18 -2 q4 10 -8 14 q-12 2 -10 -12 Z"/>
    <path d="M300 212 q12 -24 20 -2 q4 12 -9 16 q-13 2 -11 -14 Z"/>
  </g>
  <path d="M62 148 q6 -14 0 -26 M70 150 q8 -12 4 -24" stroke="#fff" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`;

COVER.ring = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="银饰DIY插画">
  <defs>
    <linearGradient id="ri-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9edf2"/><stop offset="1" stop-color="#d9e0e8"/></linearGradient>
    <linearGradient id="ri-sil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f5f7fa"/><stop offset="0.5" stop-color="#c9d2dc"/><stop offset="1" stop-color="#a8b4c2"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#ri-bg)"/>
  <circle cx="340" cy="56" r="20" fill="#dce4ec" opacity="0.8"/>
  <circle cx="56" cy="250" r="30" fill="#d5dde6" opacity="0.6"/>
  <path d="M0 240 Q 120 218 240 234 T 400 226 L 400 300 L 0 300 Z" fill="#c4cfda" opacity="0.45"/>
  <ellipse cx="200" cy="242" rx="70" ry="12" fill="#aebccb" opacity="0.5"/>
  <ellipse cx="200" cy="236" rx="58" ry="8" fill="#f2f5f8"/>
  <circle cx="200" cy="150" r="52" fill="none" stroke="url(#ri-sil)" stroke-width="14"/>
  <circle cx="200" cy="150" r="52" fill="none" stroke="#eef2f6" stroke-width="4"/>
  <path d="M176 118 a52 52 0 0 1 48 0" stroke="#fff" stroke-width="5" fill="none" opacity="0.8"/>
  <g stroke="#8fa1b5" stroke-width="2.4" fill="none" opacity="0.7">
    <path d="M148 190 h-18 M142 196 h-14 M252 190 h18 M258 196 h14"/>
  </g>
  <g fill="#e3b7b0"><circle cx="118" cy="122" r="5"/><circle cx="284" cy="128" r="4"/><circle cx="300" cy="180" r="3.4"/></g>
  <path d="M84 96 q6 -12 0 -22" stroke="#fff" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`;

COVER.shuttle = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="羽毛球插画">
  <defs>
    <linearGradient id="sh-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f0e4"/><stop offset="1" stop-color="#d6e2cf"/></linearGradient>
    <radialGradient id="sh-cork" cx="0.5" cy="0.5" r="0.6"><stop offset="0" stop-color="#f0e6d6"/><stop offset="1" stop-color="#cbb69a"/></radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sh-bg)"/>
  <circle cx="64" cy="54" r="22" fill="#d9e5d1" opacity="0.8"/>
  <path d="M0 238 Q 120 216 240 232 T 400 224 L 400 300 L 0 300 Z" fill="#c2d4b6" opacity="0.5"/>
  <rect x="30" y="56" width="10" height="190" rx="4" fill="#a9c49a" opacity="0.55"/>
  <rect x="360" y="70" width="10" height="180" rx="4" fill="#a9c49a" opacity="0.5"/>
  <path d="M60 236 h280" stroke="#9dbb8c" stroke-width="5" opacity="0.55"/>
  <g transform="rotate(24 200 150)">
    <ellipse cx="200" cy="196" rx="16" ry="22" fill="url(#sh-cork)"/>
    <path d="M188 178 L158 92 L172 88 L200 170 Z" fill="#fdfdfb" stroke="#dcdcd2"/>
    <path d="M200 170 L200 80 L214 80 L212 172 Z" fill="#fdfdfb" stroke="#dcdcd2"/>
    <path d="M212 172 L244 92 L258 96 L224 180 Z" fill="#fdfdfb" stroke="#dcdcd2"/>
    <path d="M186 176 L166 96 M226 178 L246 98" stroke="#e7e7dd" stroke-width="2"/>
  </g>
  <path d="M96 110 q8 -14 2 -26" stroke="#fff" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`;

COVER.climb = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="攀岩插画">
  <defs>
    <linearGradient id="cl-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e7ecef"/><stop offset="1" stop-color="#d3dde3"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#cl-bg)"/>
  <circle cx="70" cy="52" r="24" fill="#dde6ea" opacity="0.8"/>
  <path d="M0 240 Q 120 220 240 236 T 400 228 L 400 300 L 0 300 Z" fill="#bfcfda" opacity="0.45"/>
  <path d="M250 300 L300 40 L330 300 Z" fill="#c8d4dd"/>
  <path d="M300 40 L290 120 L320 96 Z" fill="#e3ebf0"/>
  <path d="M250 300 L280 170 L330 300 Z" fill="#b7c6d2" opacity="0.6"/>
  <g fill="#8fa3b4">
    <circle cx="302" cy="96" r="6"/><circle cx="312" cy="150" r="6"/><circle cx="286" cy="196" r="6"/><circle cx="318" cy="236" r="6"/>
  </g>
  <path d="M296 132 q-4 -18 4 -30" stroke="#e6654f" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="302" cy="102" r="7" fill="#e6654f"/>
  <g stroke="#e6654f" stroke-width="3.4" fill="none" stroke-linecap="round">
    <path d="M298 108 q-12 20 -4 44"/><path d="M306 108 q10 18 4 40"/>
  </g>
  <g fill="#b0442f"><circle cx="80" cy="248" r="6"/><circle cx="150" cy="262" r="5"/></g>
  <path d="M60 90 q6 -12 0 -24" stroke="#fff" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`;

COVER.pour = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="手冲咖啡插画">
  <defs>
    <linearGradient id="pu-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3ece2"/><stop offset="1" stop-color="#e5d7c4"/></linearGradient>
    <linearGradient id="pu-ink" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7b5237"/><stop offset="1" stop-color="#4a2f1d"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#pu-bg)"/>
  <circle cx="340" cy="52" r="20" fill="#e6d8c2" opacity="0.8"/>
  <circle cx="52" cy="252" r="30" fill="#e2d3ba" opacity="0.6"/>
  <path d="M0 238 Q 120 218 240 234 T 400 226 L 400 300 L 0 300 Z" fill="#d2c0a2" opacity="0.5"/>
  <ellipse cx="200" cy="236" rx="58" ry="10" fill="#c4b190" opacity="0.5"/>
  <path d="M160 160 h80 l-8 72 h-64 Z" fill="url(#pu-ink)"/>
  <path d="M160 160 h80 l-3 30 h-74 Z" fill="#93654a"/>
  <ellipse cx="200" cy="160" rx="40" ry="9" fill="#5d3d27"/>
  <ellipse cx="200" cy="158" rx="34" ry="7" fill="#d8b990"/>
  <path d="M192 60 h16 v34 h-16 Z" fill="#c99b6c"/>
  <path d="M186 60 h28 v10 h-28 Z" fill="#a87c4f"/>
  <path d="M198 104 q4 0 4 4 l0 44" stroke="#b98a5c" stroke-width="4" fill="none" stroke-linecap="round"/>
  <ellipse cx="202" cy="150" rx="7" ry="3" fill="#e7cfa4" opacity="0.85"/>
  <g stroke="#c6b295" stroke-width="3" fill="none" stroke-linecap="round"><path d="M282 128 q10 26 2 54"/><path d="M296 122 q12 30 4 62"/></g>
  <g fill="#b6d0a2"><circle cx="112" cy="96" r="9"/><circle cx="122" cy="104" r="6"/></g>
  <path d="M84 120 q6 -12 0 -24" stroke="#fff" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`;

COVER.market = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="周末市集插画">
  <defs>
    <linearGradient id="mk-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2e9dd"/><stop offset="1" stop-color="#e4d5c0"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#mk-bg)"/>
  <circle cx="62" cy="48" r="22" fill="#e5d6bf" opacity="0.8"/>
  <path d="M0 238 Q 120 216 240 232 T 400 224 L 400 300 L 0 300 Z" fill="#d0bd9c" opacity="0.5"/>
  <g>
    <path d="M90 130 l110 -30 l110 30 v10 h-220 Z" fill="#e6a95c"/>
    <path d="M90 130 l110 -30 l110 30 l-8 12 h-204 Z" fill="#d2924a"/>
    <rect x="96" y="142" width="16" height="94" fill="#b08248"/>
    <rect x="288" y="142" width="16" height="94" fill="#b08248"/>
    <path d="M120 152 h160 v84 h-160 Z" fill="#f6efe2"/>
    <path d="M120 152 h160 v18 h-160 Z" fill="#e2c8a4"/>
  </g>
  <g fill="#c9a26b"><circle cx="150" cy="196" r="8"/><circle cx="172" cy="192" r="7"/><circle cx="162" cy="212" r="6"/></g>
  <g fill="#b6d0a2"><circle cx="210" cy="200" r="8"/><circle cx="232" cy="196" r="7"/></g>
  <g fill="#e08f7f"><circle cx="252" cy="206" r="6"/><circle cx="264" cy="196" r="5"/></g>
  <g stroke="#a8875a" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M36 176 q10 24 2 50"/><path d="M52 170 q10 26 2 56"/>
  </g>
  <g stroke="#9fb3c4" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M352 176 q-10 24 -2 50"/><path d="M336 170 q-10 26 -2 56"/>
  </g>
  <path d="M300 84 h44 l-6 36 h-32 Z" fill="#c9d7b4"/>
  <path d="M322 84 l0 -22 M322 62 l-12 8 h24 Z" stroke="#8fae70" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M60 96 q6 -12 0 -24" stroke="#fff" stroke-width="3" fill="none" opacity="0.5" stroke-linecap="round"/>
</svg>`;

COVER.bake = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="烘焙体验插画">
  <defs>
    <linearGradient id="bk-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6ecd9"/><stop offset="1" stop-color="#ead9bc"/></linearGradient>
    <linearGradient id="bk-cr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b56a"/><stop offset="1" stop-color="#c98f45"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bk-bg)"/>
  <circle cx="58" cy="46" r="20" fill="#eedfc2" opacity="0.85"/>
  <path d="M0 240 Q 110 218 230 234 T 400 226 L 400 300 L 0 300 Z" fill="#d9c09a" opacity="0.5"/>
  <g>
    <path d="M150 158 a50 34 0 0 1 100 0 l0 62 q-50 22 -100 0 Z" fill="url(#bk-cr)"/>
    <ellipse cx="200" cy="158" rx="50" ry="12" fill="#f2c886"/>
    <circle cx="182" cy="150" r="4" fill="#b97f3d"/><circle cx="212" cy="154" r="3.4" fill="#b97f3d"/><circle cx="198" cy="146" r="3" fill="#b97f3d"/>
    <path d="M158 226 l42 -26 M242 226 l-42 -26" stroke="#a8743a" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
  </g>
  <g transform="translate(80,188)">
    <rect x="0" y="0" width="46" height="34" rx="8" fill="#f2e6cd"/>
    <rect x="0" y="0" width="46" height="12" rx="6" fill="#dfc9a2"/>
    <circle cx="16" cy="22" r="4" fill="#e8b56a"/><circle cx="30" cy="24" r="3.4" fill="#c98f45"/>
  </g>
  <g stroke="#b58a4e" stroke-width="4" fill="none" stroke-linecap="round">
    <path d="M310 200 q10 -18 24 -12"/><path d="M322 226 q14 -8 22 4"/>
  </g>
  <path d="M330 92 q8 -14 0 -28" stroke="#fff" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round"/>
</svg>`;

COVER.party = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="生日氛围布置插画">
  <defs>
    <linearGradient id="pt-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdeef2"/><stop offset="1" stop-color="#f6dbe4"/></linearGradient>
    <linearGradient id="pt-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f8d9e3"/><stop offset="1" stop-color="#efc3d2"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#pt-bg)"/>
  <circle cx="52" cy="44" r="22" fill="#f3cfdc" opacity="0.8"/>
  <g stroke="#e999b3" stroke-width="2" opacity="0.75">
    <path d="M60 78 q-14 22 0 40 q14 -18 0 -40" fill="#fbd3e0"/>
    <path d="M340 66 q-16 26 0 48 q16 -22 0 -48" fill="#fbd3e0"/>
  </g>
  <g>
    <path d="M196 34 l6 16 17 2 -12 12 3 17 -14 -8 -14 8 3 -17 -12 -12 17 -2 Z" fill="#f6c34a" opacity="0.9"/>
    <circle cx="196" cy="86" r="3" fill="#d9a03a"/>
    <path d="M196 86 q-3 26 0 44" stroke="#d9a03a" stroke-width="2" fill="none"/>
  </g>
  <g fill="none" stroke="#c96f8f" stroke-width="3" stroke-linecap="round">
    <path d="M120 40 q10 -12 22 0"/><path d="M280 36 q10 -12 22 0"/><path d="M160 52 q8 -10 16 0"/>
  </g>
  <path d="M0 238 Q 120 220 240 236 T 400 228 L 400 300 L 0 300 Z" fill="#e8c4a4" opacity="0.6"/>
  <g>
    <ellipse cx="200" cy="234" rx="98" ry="16" fill="#daa879"/>
    <ellipse cx="200" cy="228" rx="88" ry="12" fill="#f4e3c8"/>
    <circle cx="160" cy="224" r="6" fill="#f39a3c"/><circle cx="200" cy="222" r="6" fill="#ee6f57"/><circle cx="240" cy="224" r="6" fill="#f39a3c"/>
    <path d="M150 196 l10 18 M250 196 l-10 18" stroke="#c96f8f" stroke-width="4" stroke-linecap="round"/>
  </g>
</svg>`;

COVER.wine = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="餐酒小饮插画">
  <defs>
    <linearGradient id="wn-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3e8e4"/><stop offset="1" stop-color="#e7d5cf"/></linearGradient>
    <linearGradient id="wn-red" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b03a4e"/><stop offset="1" stop-color="#7e2738"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#wn-bg)"/>
  <circle cx="46" cy="42" r="20" fill="#e7d0c9" opacity="0.85"/>
  <path d="M0 244 Q 120 226 260 240 T 400 232 L 400 300 L 0 300 Z" fill="#dcc2b4" opacity="0.5"/>
  <g>
    <path d="M168 96 q32 -16 64 0 q4 34 -32 62 q-36 -28 -32 -62 Z" fill="url(#wn-red)"/>
    <rect x="196" y="158" width="8" height="58" fill="#8e6a4f"/>
    <path d="M176 216 h48 l-6 16 h-36 Z" fill="#a88059"/>
  </g>
  <g>
    <circle cx="120" cy="120" r="4" fill="#b03a4e" opacity="0.5"/><circle cx="132" cy="104" r="3" fill="#b03a4e" opacity="0.4"/>
    <circle cx="286" cy="98" r="4" fill="#b03a4e" opacity="0.45"/><circle cx="296" cy="116" r="3" fill="#b03a4e" opacity="0.5"/>
  </g>
  <g opacity="0.8">
    <rect x="308" y="170" width="10" height="56" rx="4" fill="#c9a06e"/>
    <rect x="300" y="164" width="26" height="10" rx="5" fill="#a87b4c"/>
  </g>
</svg>`;

COVER.clay = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="拉坯泥料插画">
  <defs>
    <linearGradient id="cy-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ede4d8"/><stop offset="1" stop-color="#dfd0bc"/></linearGradient>
    <radialGradient id="cy-mud" cx="0.5" cy="0.35" r="0.75"><stop offset="0" stop-color="#a97b5a"/><stop offset="1" stop-color="#845a3e"/></radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#cy-bg)"/>
  <circle cx="58" cy="44" r="20" fill="#e2d3bd" opacity="0.85"/>
  <path d="M0 240 Q 110 220 240 234 T 400 226 L 400 300 L 0 300 Z" fill="#cbb597" opacity="0.5"/>
  <g>
    <ellipse cx="200" cy="232" rx="84" ry="16" fill="#a08260" opacity="0.7"/>
    <path d="M160 130 q40 -22 80 0 q10 66 -40 100 q-50 -34 -40 -100 Z" fill="url(#cy-mud)"/>
    <path d="M160 130 q40 -22 80 0 q2 20 -12 38 q-38 16 -76 0 q-14 -18 -12 -38 Z" fill="#8d6042" opacity="0.6"/>
    <g stroke="#6f4a31" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8">
      <path d="M176 168 q24 10 48 0"/><path d="M180 186 q20 8 40 0"/>
    </g>
  </g>
  <g transform="translate(84,196)">
    <circle cx="18" cy="18" r="16" fill="#b08460"/>
    <circle cx="18" cy="18" r="10" fill="#96683f"/>
  </g>
  <g transform="translate(300,190)">
    <rect x="0" y="0" width="34" height="28" rx="6" fill="#c8a06e"/>
    <path d="M4 8 q26 8 26 0" stroke="#9a7343" stroke-width="3" fill="none"/>
  </g>
</svg>`;

COVER.pilates = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="普拉提器械床插画">
  <defs>
    <linearGradient id="pl-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3ece6"/><stop offset="1" stop-color="#d3e0d6"/></linearGradient>
    <linearGradient id="pl-bed" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fae93"/><stop offset="1" stop-color="#5d8a72"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#pl-bg)"/>
  <circle cx="340" cy="46" r="20" fill="#d0decd" opacity="0.85"/>
  <path d="M0 246 Q 120 230 260 242 T 400 236 L 400 300 L 0 300 Z" fill="#c4d6c6" opacity="0.5"/>
  <g>
    <rect x="88" y="182" width="238" height="22" rx="10" fill="url(#pl-bed)"/>
    <rect x="300" y="150" width="26" height="54" rx="8" fill="#6e9a80"/>
    <g stroke="#8fb9a0" stroke-width="3"><path d="M92 182 h230"/></g>
    <path d="M300 162 q26 -10 34 8" stroke="#4e7a62" stroke-width="3" fill="none"/>
    <rect x="96" y="196" width="12" height="46" rx="5" fill="#4e7a62"/>
    <rect x="290" y="196" width="12" height="46" rx="5" fill="#4e7a62"/>
    <rect x="196" y="196" width="12" height="46" rx="5" fill="#4e7a62"/>
  </g>
  <g>
    <circle cx="250" cy="150" r="12" fill="#f0d8c2"/>
    <path d="M250 162 q-2 20 0 24" stroke="#e4a06b" stroke-width="6" stroke-linecap="round"/>
    <path d="M250 164 l-16 20 M250 164 l18 18" stroke="#e4a06b" stroke-width="5" stroke-linecap="round"/>
    <path d="M244 186 l-8 4 M256 186 l8 4" stroke="#c98a5a" stroke-width="4" stroke-linecap="round"/>
  </g>
  <g fill="#9dbfa8" opacity="0.8">
    <circle cx="70" cy="130" r="7"/><circle cx="82" cy="116" r="5"/><circle cx="60" cy="114" r="5"/>
  </g>
</svg>`;

COVER.silver = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="银饰手作插画">
  <defs>
    <linearGradient id="sv-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8ebee"/><stop offset="1" stop-color="#d8dde2"/></linearGradient>
    <linearGradient id="sv-si" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9e0e6"/><stop offset="1" stop-color="#a9b4be"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#sv-bg)"/>
  <circle cx="54" cy="44" r="20" fill="#dde3e8" opacity="0.85"/>
  <path d="M0 244 Q 120 226 260 240 T 400 232 L 400 300 L 0 300 Z" fill="#c6cdd4" opacity="0.5"/>
  <g>
    <circle cx="200" cy="176" r="52" fill="none" stroke="url(#sv-si)" stroke-width="12"/>
    <circle cx="200" cy="176" r="52" fill="none" stroke="#f2f5f7" stroke-width="3" opacity="0.7"/>
    <path d="M176 150 a34 34 0 0 1 48 0" stroke="#f7fafc" stroke-width="4" fill="none" opacity="0.9"/>
    <circle cx="266" cy="118" r="5" fill="#c4cdd6"/><circle cx="134" cy="128" r="4" fill="#c4cdd6"/>
  </g>
  <g>
    <rect x="76" y="188" width="60" height="14" rx="7" fill="#b9c3cc"/>
    <path d="M82 180 q24 -12 48 0" stroke="#9aa5af" stroke-width="4" fill="none"/>
    <circle cx="318" cy="196" r="10" fill="#b9c3cc"/><circle cx="318" cy="196" r="4" fill="#8a95a0"/>
  </g>
  <g stroke="#a9b4be" stroke-width="3" stroke-linecap="round" opacity="0.7">
    <path d="M308 96 q12 -16 26 -8"/><path d="M320 70 q10 -10 20 -2"/>
  </g>
</svg>`;

COVER.flowers = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="花艺点缀插画">
  <defs>
    <linearGradient id="fw-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f1ebdf"/><stop offset="1" stop-color="#e6dcc8"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#fw-bg)"/>
  <circle cx="60" cy="48" r="20" fill="#e8ddc6" opacity="0.85"/>
  <g transform="translate(120,120)">
    <circle cx="0" cy="0" r="9" fill="#e7c977"/>
    <g fill="#f0f4ef">
      <ellipse cx="0" cy="-18" rx="8" ry="14"/><ellipse cx="17" cy="-6" rx="8" ry="14" transform="rotate(60 17 -6)"/>
      <ellipse cx="17" cy="6" rx="8" ry="14" transform="rotate(120 17 6)"/><ellipse cx="0" cy="18" rx="8" ry="14"/>
      <ellipse cx="-17" cy="6" rx="8" ry="14" transform="rotate(240 -17 6)"/><ellipse cx="-17" cy="-6" rx="8" ry="14" transform="rotate(300 -17 -6)"/>
    </g>
    <path d="M0 30 q6 40 -4 84" stroke="#9ba98a" stroke-width="4" fill="none"/>
  </g>
  <g transform="translate(268,96)">
    <circle cx="0" cy="0" r="8" fill="#e2a45c"/>
    <g fill="#f6d9a8">
      <ellipse cx="0" cy="-15" rx="7" ry="12"/><ellipse cx="13" cy="-5" rx="7" ry="12" transform="rotate(70 13 -5)"/>
      <ellipse cx="13" cy="5" rx="7" ry="12" transform="rotate(140 13 5)"/><ellipse cx="0" cy="15" rx="7" ry="12"/>
      <ellipse cx="-13" cy="5" rx="7" ry="12" transform="rotate(210 -13 5)"/><ellipse cx="-13" cy="-5" rx="7" ry="12" transform="rotate(280 -13 -5)"/>
    </g>
    <path d="M0 26 q-8 36 2 72" stroke="#a8967c" stroke-width="4" fill="none"/>
  </g>
  <g transform="translate(206,196)">
    <circle cx="0" cy="0" r="7" fill="#cf8f5e"/>
    <g fill="#e8b490">
      <ellipse cx="0" cy="-13" rx="6" ry="10"/><ellipse cx="11" cy="-4" rx="6" ry="10" transform="rotate(70 11 -4)"/>
      <ellipse cx="11" cy="4" rx="6" ry="10" transform="rotate(140 11 4)"/><ellipse cx="0" cy="13" rx="6" ry="10"/>
      <ellipse cx="-11" cy="4" rx="6" ry="10" transform="rotate(210 -11 4)"/><ellipse cx="-11" cy="-4" rx="6" ry="10" transform="rotate(280 -11 -4)"/>
    </g>
  </g>
  <path d="M0 250 Q 120 232 260 244 T 400 238 L 400 300 L 0 300 Z" fill="#d9cbb0" opacity="0.5"/>
</svg>`;

COVER.latte = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="咖啡拉花插画">
  <defs>
    <linearGradient id="lt-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe6d8"/><stop offset="1" stop-color="#e0d2bc"/></linearGradient>
    <radialGradient id="lt-cup" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#f6ecdc"/><stop offset="1" stop-color="#e8d9c2"/></radialGradient>
  </defs>
  <rect width="400" height="300" fill="url(#lt-bg)"/>
  <circle cx="56" cy="44" r="20" fill="#e5d7bf" opacity="0.85"/>
  <path d="M0 242 Q 120 224 260 238 T 400 230 L 400 300 L 0 300 Z" fill="#d3c3a4" opacity="0.5"/>
  <g>
    <path d="M150 168 q50 -20 100 0 q6 12 0 22 q-56 22 -100 0 q-8 -12 0 -22 Z" fill="url(#lt-cup)"/>
    <ellipse cx="200" cy="168" rx="50" ry="13" fill="#c99a63"/>
    <path d="M180 166 q20 -12 40 0 q-20 12 -40 0 Z" fill="#f3e7d2"/>
    <path d="M188 166 q12 -7 24 0 q-12 7 -24 0 Z" fill="#8a5a33"/>
    <path d="M250 172 q34 -4 30 16 q-3 14 -28 10" stroke="#d8c6a6" stroke-width="7" fill="none"/>
  </g>
  <g opacity="0.8">
    <path d="M96 120 q4 -14 0 -26" stroke="#c9b48c" stroke-width="3" fill="none"/>
    <circle cx="96" cy="88" r="4" fill="#e0cda6"/>
    <path d="M306 108 q5 -16 0 -30" stroke="#c9b48c" stroke-width="3" fill="none"/>
    <circle cx="306" cy="72" r="4" fill="#e0cda6"/>
  </g>
  <g transform="translate(88,196)">
    <ellipse cx="16" cy="10" rx="18" ry="7" fill="#cbb58e"/>
    <rect x="-2" y="0" width="36" height="10" rx="4" fill="#e4d4ae"/>
  </g>
</svg>`;

COVER.hike = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="城市徒步插画">
  <defs>
    <linearGradient id="hi-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4edda"/><stop offset="1" stop-color="#d2dfc5"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#hi-bg)"/>
  <circle cx="340" cy="48" r="20" fill="#d9e5cc" opacity="0.85"/>
  <path d="M0 250 L80 190 L150 232 L230 150 L310 210 L400 160 L400 300 L 0 300 Z" fill="#a9c193" opacity="0.55"/>
  <path d="M0 260 Q 120 236 240 252 T 400 244 L 400 300 L 0 300 Z" fill="#93ae7c" opacity="0.5"/>
  <path d="M230 150 L270 118 L282 128 L252 168 Z" fill="#d8e2c6" opacity="0.9"/>
  <circle cx="270" cy="112" r="12" fill="#e8f0da"/>
  <path d="M120 232 q4 -36 -2 -56" stroke="#8fa974" stroke-width="5" fill="none" stroke-linecap="round" transform="translate(16,-8)"/>
  <g transform="translate(150,150)">
    <circle cx="0" cy="-34" r="8" fill="#e0956b"/>
    <path d="M-10 -24 h20 l4 34 h-28 Z" fill="#7fa9c9"/>
    <path d="M-6 10 l-8 22 M6 10 l8 22" stroke="#5c7a94" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M12 -18 q16 10 12 34" stroke="#9b8468" stroke-width="4" fill="none" stroke-linecap="round"/>
  </g>
  <g fill="#dce8cc"><circle cx="70" cy="240" r="7"/><circle cx="88" cy="246" r="6"/><circle cx="104" cy="242" r="7"/></g>
  <path d="M64 92 q6 -12 0 -24" stroke="#fff" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round"/>
</svg>`;

COVER.camp = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="骑行露营插画">
  <defs>
    <linearGradient id="ca-bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e4f2"/><stop offset="1" stop-color="#d8d0e8"/></linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#ca-bg)"/>
  <circle cx="336" cy="50" r="18" fill="#e8dff4" opacity="0.9"/>
  <circle cx="336" cy="50" r="10" fill="#f6d98e"/>
  <circle cx="72" cy="56" r="4" fill="#fff" opacity="0.9"/><circle cx="96" cy="44" r="3" fill="#fff" opacity="0.8"/>
  <path d="M0 240 Q 120 220 240 236 T 400 228 L 400 300 L 0 300 Z" fill="#c0b6d8" opacity="0.45"/>
  <path d="M120 236 L170 156 L220 236 Z" fill="#e6a95c"/>
  <path d="M170 156 L196 236 L220 236 Z" fill="#c98a44"/>
  <path d="M152 216 q18 -8 36 0" stroke="#5c4a3a" stroke-width="3" fill="none"/>
  <g transform="translate(292,192)">
    <circle cx="-38" cy="38" r="16" fill="none" stroke="#7b8794" stroke-width="6"/>
    <circle cx="38" cy="38" r="16" fill="none" stroke="#7b8794" stroke-width="6"/>
    <path d="M-38 38 L-14 -6 L14 -6 L38 38 M-14 -6 L14 38 M-38 38 h76" stroke="#4f5a66" stroke-width="4.4" fill="none"/>
    <path d="M-20 -14 q6 -10 16 -4" stroke="#e08f7f" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>
  <g fill="#b9a8d6"><circle cx="76" cy="238" r="6"/><circle cx="94" cy="244" r="5"/></g>
  <path d="M60 96 q6 -12 0 -24" stroke="#fff" stroke-width="3" fill="none" opacity="0.55" stroke-linecap="round"/>
</svg>`;

/* ---------- 同好活动种子数据（全部虚构演示；报名与商品订单分开记录） ---------- */
const actDayStr = off => {
  const d = new Date(Date.now() + off * 86400000);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};
DATA.acts = [
  {
    id: 'a1', noteId: 'n12', prodId: 'p8',
    theme: '周六下午手冲巡店小队', time: '周六 14:00 · 地铁口集合',
    cap: 6, cost: 'AA 自理 · 每人一杯手冲（约 ¥40 – ¥50，以门店实价为准）',
    dl: actDayStr(3),
    rules: '按笔记里的巡店路线走三家，全程步行约 30 分钟；迟到 15 分钟不等；报名后请留意人数变化，出发前夜我会再确认一次。',
    host: { nick: '浅烘不浅睡', hue: 25 },
    members: [
      { nick: '豆子仓库', hue: 20 }, { nick: '拿铁拉花中', hue: 30 }, { nick: '早八赶集人', hue: 55 },
    ],
  },
  {
    id: 'a2', noteId: 'n8', prodId: 'p4',
    theme: '周日陶艺拉坯体验局（零基础友好）', time: '周日 10:30 · 到店集合',
    cap: 4, cost: '各自下单同款套餐 ¥198（虚构演示价）· 烧制费另计',
    dl: actDayStr(4),
    rules: '双人可拼工作台；材料费已含在套餐；成品烧制约 2 – 3 周后自取，去不了的姐妹帮带。',
    host: { nick: '陶泥不糊', hue: 28 },
    members: [
      { nick: '杯子叠叠乐', hue: 35 }, { nick: '泥巴战士', hue: 20 }, { nick: '黄油手不慌', hue: 42 }, { nick: '周末手工党', hue: 60 },
    ],
  },
  {
    id: 'a3', noteId: 'n13', prodId: 'p9',
    theme: '周末市集扫摊局（十点开场就进）', time: '周六 10:00 · 市集入口集合',
    cap: 8, cost: 'AA 自理 · 市集门票与各自消费',
    dl: actDayStr(-6),
    rules: '十点进场人少好拍，两点前撤场；各自消费，不强制拼单。',
    host: { nick: '市集扫货王', hue: 50 },
    members: [
      { nick: '胶片小张', hue: 45 }, { nick: '早八赶集人', hue: 55 },
    ],
  },
  {
    id: 'a4', noteId: 'n16', prodId: 'p12',
    theme: '零基础烘焙下午茶局（司康初体验）', time: '周日 15:00 · 到店集合',
    cap: 5, cost: '各自下单体验课 ¥168（虚构演示价）',
    dl: actDayStr(5),
    rules: '成品现场分食 + 各自带走 4 件；围裙工具店里提供，穿深色衣服省心。',
    host: { nick: '黄油手不慌', hue: 42 },
    members: [
      { nick: '小锤八十', hue: 220 }, { nick: '松饼星人', hue: 45 },
    ],
  },
];

/* ---------- 同好拼团种子数据（全部虚构演示；拼团是可选购买方式，单买原价照常） ---------- */
DATA.groupons = [
  {
    // 进行中：陶艺 3 人团，已 2 人，未满
    id: 'g1', prodId: 'p4', fromNoteId: 'n8',
    note: '周末下午场优先，拉坯搭子凑一台',
    topic: '零基础拉坯',   /* 体验主题（演示） */
    dlTs: Date.now() + 48 * 3600000,
    host: { nick: '陶泥不糊', hue: 28 },
    members: [
      { nick: '陶泥不糊', hue: 28 }, { nick: '杯子叠叠乐', hue: 35 },
    ],
  },
  {
    // 已成团：羽毛球 4 人团满员（full 优先于截止时间展示）
    id: 'g2', prodId: 'p6', fromNoteId: 'n10',
    note: '周四晚 20:00 固定局，就差你一个',
    topic: '下班运动',
    dlTs: Date.now() + 12 * 3600000,
    fullAt: Date.now() - 6 * 3600000,
    paidDemo: 2,   // 演示口径：成员中已按拼团价下单的人数（非真实订单）
    host: { nick: '步法乱炖', hue: 205 },
    members: [
      { nick: '步法乱炖', hue: 205 }, { nick: '高远球十级学者', hue: 200 }, { nick: '网前小陀螺', hue: 215 }, { nick: '下班就冲球馆', hue: 52 },
    ],
  },
  {
    // 已过期未成团：银饰 2 人团只凑到 1 人
    id: 'g3', prodId: 'p5', fromNoteId: 'n9',
    note: '纪念日前后想凑两对一起做对戒',
    topic: '纪念日手作',
    dlTs: Date.now() - 12 * 3600000,
    host: { nick: '银匠学徒', hue: 230 },
    members: [
      { nick: '银匠学徒', hue: 230 },
    ],
  },
];

/* ---------- 消息页示例数据（全部虚构） ---------- */
DATA.msgSamples = [
  { avatar: '糕', hue: 350, name: '小蛋糕逃跑', text: '赞了你的评论「下个月纪念日也想抄作业」', at: '2 小时前' },
  { avatar: '风', hue: 210, name: '晚风信箱', text: '收藏了笔记《在这家餐厅过生日，氛围感真的很好》', at: '5 小时前' },
  { avatar: '茶', hue: 205, name: '阿茶探店', text: '关注了你，快去回关吧', at: '1 天前' },
  { avatar: '芝', hue: 230, name: '芝士就是力量', text: '回复你：周末就去试试松露意面！', at: '2 天前' },
];

DATA.msgNotices = [
  { icon: '📢', title: '欢迎使用薯约 Demo', text: '订单与预约的状态变化会同步出现在「消息」页的「订单与预约通知」里（本地模拟，不发送真实推送）。' },
  { icon: '🎫', title: '体验卡说明', text: '购买后体验卡会出现在「我」页；商家确认预约 + 到店核销后，体验权益才会标记为已兑现。' },
];

/* ---------- 搜索演示数据（本地联想 / 热词，全部虚构） ---------- */
DATA.hotSearch = ['生日约会', '松露意面', '适合拍照的咖啡馆', '博主同款套餐', '周末Brunch', '手冲咖啡'];
DATA.searchSuggest = [
  '生日约会餐厅',
  '双人生日约会套餐',
  '博主同款套餐',
  '松露意面',
  '适合拍照的咖啡馆',
  '靠窗出片位',
  '生日氛围布置',
  '现烤舒芙蕾',
];

/* ---------- 发现页话题墙（由笔记数据聚合，篇数为真实统计） ---------- */
DATA.topicGrid = [
  { emoji: '🎂', tag: '#生日晚餐' },
  { emoji: '🍽️', tag: '#约会企划' },
  { emoji: '🍝', tag: '#永康路探店' },
  { emoji: '☕', tag: '#手冲地图' },
  { emoji: '🥞', tag: '#周末Brunch' },
  { emoji: '🌙', tag: '#周五夜晚' },
  { emoji: '🪟', tag: '#自然光出片' },
  { emoji: '🌿', tag: '#街角小店' },
];
