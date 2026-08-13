/* ============================================================
   themes.mjs — every site is one entry in this array.
   Adding a genre = adding an object here, then `node build.mjs`.

   tracks: [title, artist, year]  → year optional
   ============================================================ */

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const themes = [
  /* ================================================================ 1 */
  {
    slug: "std-booth",
    kind: "place",
    // Ishtar Music — 90s Bollywood sad/romantic, ~73 tracks
    ytPlaylist: "PLO6WOx_nE9ULl-FgE0NPR4c6BSu-1-CPJ",
    name: "PCO",
    sign: "S T D · I S D · P C O",
    kicker: "local · national · international",
    tagline: "The songs that played while you waited for the meter to stop.",
    gateTitle: "Pick up the receiver",
    gateCopy:
      "Before unlimited calls, love travelled at ₹1.20 a pulse. Yellow board, plastic phone, one song on the shopkeeper's radio.",
    ogDesc: "A yellow-board PCO booth, a running meter, and 90s Bollywood longing.",
    glyph: "☎",
    fonts: {
      display: "Anton",
      body: "Inter",
      href: "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;600;700&display=swap"
    },
    tokens: {
      "--bg": "#120e07",
      "--bg-gradient":
        "radial-gradient(90% 70% at 20% 0%, rgba(247,201,72,0.14), transparent 60%)",
      "--surface": "rgba(28,22,12,0.78)",
      "--ink": "#f6efdc",
      "--ink-dim": "#a3907090",
      "--accent": "#f7c948",
      "--accent-2": "#e4572e",
      "--on-accent": "#1a1206",
      "--line": "rgba(247,201,72,0.22)",
      "--sign-ink": "#f7c948",
      "--sign-tracking": "0.04em",
      "--sign-shadow": "0 2px 0 #7a5c10, 0 0 34px rgba(247,201,72,0.35)",
      "--card-radius": "3px",
      "--grain-opacity": "0.07"
    },
    scene: `
      <div class="meter" aria-hidden="true">
        <em>PULSE</em><b id="pulse">0 0 7</b>
      </div>
      <svg class="phone" viewBox="0 0 200 140" aria-hidden="true">
        <rect x="26" y="66" width="148" height="58" rx="9" fill="#33260f" stroke="#f7c94877"/>
        <g fill="#f7c94855">
          <circle cx="60" cy="86" r="7"/><circle cx="84" cy="86" r="7"/><circle cx="108" cy="86" r="7"/>
          <circle cx="60" cy="106" r="7"/><circle cx="84" cy="106" r="7"/><circle cx="108" cy="106" r="7"/>
        </g>
        <rect x="132" y="78" width="30" height="36" rx="4" fill="#f7c94840"/>
        <path d="M34 44h132a14 14 0 0 1 14 14v6H20v-6a14 14 0 0 1 14-14z" fill="#4a3517" stroke="#f7c94877"/>
      </svg>`,
    css: `
      /* the masthead IS the painted shop board */
      .sign{background:#f7c948;color:#1a1206;padding:10px clamp(14px,3vw,26px) 12px;
        border-radius:2px;transform:rotate(-1deg);text-shadow:none;
        box-shadow:0 10px 40px rgba(247,201,72,.22)}
      .sign small{color:#1a120699}
      .meter{position:absolute;right:4vw;top:26vh;text-align:right;font-family:var(--font-display);
        color:#e4572e;opacity:.55}
      .meter em{display:block;font-family:var(--font-body);font-size:9px;letter-spacing:.4em;
        color:var(--ink-dim);font-style:normal}
      .meter b{font-size:clamp(24px,6vw,44px);letter-spacing:.14em;
        text-shadow:0 0 22px rgba(228,87,46,.6)}
      .phone{position:absolute;left:2vw;bottom:-2vh;width:min(320px,36vw);opacity:.85;
        filter:drop-shadow(0 0 30px rgba(247,201,72,.18))}
      @media(max-width:640px){.phone,.meter{opacity:.2}}`,
    js: `
      var p=document.getElementById('pulse');
      if(p){var n=7;setInterval(function(){n++;p.textContent=String(n).padStart(3,'0').split('').join(' ');},4000);}`,
    tracks: [
      ["Pardesi Pardesi", "Udit Narayan, Alka Yagnik", 1996],
      ["Chithi Aayi Hai", "Pankaj Udhas", 1986],
      ["Ae Mere Humsafar", "Udit Narayan, Alka Yagnik", 1988],
      ["Tujhe Dekha To", "Kumar Sanu, Lata Mangeshkar", 1995],
      ["Sochenge Tumhe Pyar", "Kumar Sanu", 1992],
      ["Dil Hai Ke Manta Nahin", "Kumar Sanu, Anuradha Paudwal", 1991],
      ["Tumse Milne Ki Tamanna", "S. P. Balasubrahmanyam", 1991],
      ["Dekha Hai Pehli Baar", "S. P. Balasubrahmanyam, Alka Yagnik", 1991],
      ["Jaadu Teri Nazar", "Udit Narayan", 1993],
      ["Chura Ke Dil Mera", "Kumar Sanu, Alka Yagnik", 1994],
      ["Meri Mehbooba", "Kumar Sanu, Alka Yagnik", 1997],
      ["Kuch Na Kaho", "Kumar Sanu", 1994],
      ["Jab Koi Baat Bigad Jaye", "Kumar Sanu, Sadhana Sargam", 1990],
      ["Yeh Kahan Aa Gaye Hum", "Lata Mangeshkar, Amitabh Bachchan", 1981],
      ["Kabhi Alvida Na Kehna", "Kishore Kumar", 1976],
      ["Ek Ajnabee Haseena Se", "Kishore Kumar", 1974],
      ["Aankhon Mein Base Ho Tum", "Kumar Sanu, Alka Yagnik", 1995],
      ["Bahut Pyar Karte Hain", "Anuradha Paudwal", 1991]
    ]
  },

  /* ================================================================ 2 */
  {
    slug: "auto-rickshaw",
    kind: "place",
    // 90s Bollywood dance songs, ~62 tracks
    ytPlaylist: "PLtohLwEsOFFuHg_mIFrwmGGEgL7sM6YBh",
    name: "Meter Down",
    sign: "M E T E R  D O W N",
    kicker: "3 sawari · no ac · full volume",
    tagline: "FM Rainbow hits at 4x volume through one blown speaker.",
    gateTitle: "Baith jao, chalte hain",
    gateCopy:
      "Vinyl seat stuck to your back, a plastic god on the dashboard, and the driver's cassette on repeat since 1996.",
    ogDesc: "Green-and-yellow three-wheeler, hanging trinkets, peak 90s FM.",
    glyph: "◍",
    fonts: {
      display: "Baloo Bhai 2",
      body: "Inter",
      href: "https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@700;800&family=Inter:wght@400;600&display=swap"
    },
    tokens: {
      "--bg": "#08120c",
      "--bg-gradient":
        "linear-gradient(180deg, rgba(23,164,78,0.16), transparent 45%), radial-gradient(80% 60% at 50% 110%, rgba(255,212,0,0.12), transparent 70%)",
      "--surface": "rgba(11,26,17,0.8)",
      "--ink": "#f1f7ee",
      "--ink-dim": "#93ab9b",
      "--accent": "#ffd400",
      "--accent-2": "#17a44e",
      "--on-accent": "#0a1a10",
      "--line": "rgba(255,212,0,0.2)",
      "--sign-ink": "#ffd400",
      "--sign-shadow": "0 3px 0 #17a44e",
      "--card-radius": "14px",
      "--card-border": "2px solid rgba(255,212,0,0.28)",
      "--grain-opacity": "0.06"
    },
    scene: `
      <svg class="trinket" viewBox="0 0 80 220" aria-hidden="true">
        <g class="sway">
          <line x1="40" y1="0" x2="40" y2="70" stroke="#ffd400aa" stroke-width="3"/>
          <circle cx="40" cy="86" r="17" fill="#ffd40055" stroke="#ffd400ee" stroke-width="3"/>
          <path d="M40 104v42" stroke="#ff8a0088" stroke-width="3"/>
          <path d="M28 146h24l-12 34z" fill="#e4572ecc"/>
        </g>
      </svg>
      <div class="stripe" aria-hidden="true"></div>
      <div class="fare" aria-hidden="true">₹ 2 5 . 0 0</div>`,
    css: `
      .trinket{position:absolute;top:0;right:24vw;width:104px;opacity:1;
        filter:drop-shadow(0 0 18px rgba(255,212,0,.25))}
      .stripe{position:absolute;left:0;right:0;bottom:0;height:22vh;
        background:linear-gradient(180deg,transparent,#17a44e33 60%,#17a44e55),
        repeating-linear-gradient(90deg,#0000 0 22px,#ffd4000f 22px 44px)}
      .fare{position:absolute;right:5vw;top:22vh;font-family:var(--font-display);
        font-size:clamp(20px,5vw,38px);color:#ffd400;opacity:.35;letter-spacing:.08em;
        text-shadow:0 0 26px rgba(255,212,0,.5)}
      @media(max-width:640px){.trinket{right:6vw;width:56px}.fare{opacity:.18}}`,
    tracks: [
      ["Ole Ole", "Vinod Rathod", 1994],
      ["Tu Cheez Badi Hai Mast", "Udit Narayan, Kavita Krishnamurthy", 1994],
      ["Didi Tera Devar Deewana", "Lata Mangeshkar, S. P. Balasubrahmanyam", 1994],
      ["Sona Kitna Sona Hai", "Poornima, Vinod Rathod", 1997],
      ["Aati Kya Khandala", "Aamir Khan, Alka Yagnik", 1998],
      ["Chaiyya Chaiyya", "Sukhwinder Singh, Sapna Awasthi", 1998],
      ["Muqabla", "Mano, Swarnalatha", 1994],
      ["Urvashi Urvashi", "A. R. Rahman, Suresh Peters", 1994],
      ["Rangeela Re", "Asha Bhosle", 1995],
      ["Ek Do Teen", "Alka Yagnik", 1988],
      ["Dhak Dhak Karne Laga", "Anuradha Paudwal, Udit Narayan", 1992],
      ["Jhanjhariya", "Kumar Sanu, Alka Yagnik", 1996],
      ["Oonchi Hai Building", "Poornima, Abhijeet", 1997],
      ["Chunari Chunari", "Abhijeet, Anuradha Sriram", 1999],
      ["Tunak Tunak Tun", "Daler Mehndi", 1998],
      ["Bolo Ta Ra Ra", "Daler Mehndi", 1995],
      ["Main Nikla Gaddi Leke", "Udit Narayan", 2001],
      ["Kaho Naa Pyaar Hai", "Udit Narayan, Alka Yagnik", 2000]
    ]
  },

  /* ================================================================ 3 */
  {
    slug: "kirana-store",
    kind: "place",
    name: "Kirana",
    sign: "K I R A N A",
    kicker: "udhaar band hai · cash only",
    tagline: "Vividh Bharati crackling over glass jars and hanging chip packets.",
    gateTitle: "Ek Parle-G dena",
    gateCopy:
      "The transistor on the top shelf never turned off. Jingles, film songs, and the sound of a weighing scale settling.",
    ogDesc: "Glass jars, a brass weighing scale, and a transistor stuck on Vividh Bharati.",
    glyph: "⚖",
    fonts: {
      display: "Alfa Slab One",
      body: "Inter",
      href: "https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Inter:wght@400;600&display=swap"
    },
    tokens: {
      "--bg": "#171003",
      "--bg-gradient":
        "radial-gradient(70% 50% at 50% -5%, rgba(233,162,59,0.24), transparent 65%)",
      "--surface": "rgba(35,25,10,0.8)",
      "--ink": "#f6ead5",
      "--ink-dim": "#a99274",
      "--accent": "#e9a23b",
      "--accent-2": "#5b8c7e",
      "--on-accent": "#211603",
      "--line": "rgba(233,162,59,0.2)",
      "--sign-ink": "#e9a23b",
      "--sign-tracking": "0.08em",
      "--sign-shadow": "0 3px 0 rgba(0,0,0,0.5)",
      "--card-radius": "2px",
      "--grain-opacity": "0.09"
    },
    scene: `
      <div class="bulb flicker" aria-hidden="true"></div>
      <div class="packets" aria-hidden="true">
        <i class="sway" style="--d:0s"></i><i class="sway" style="--d:.4s"></i>
        <i class="sway" style="--d:.9s"></i><i class="sway" style="--d:1.3s"></i>
        <i class="sway" style="--d:1.8s"></i><i class="sway" style="--d:2.2s"></i>
      </div>
      <svg class="scale" viewBox="0 0 220 160" aria-hidden="true">
        <path d="M110 20v70" stroke="#e9a23b66" stroke-width="3"/>
        <path d="M40 90h140" stroke="#e9a23b66" stroke-width="3"/>
        <path d="M40 90l-16 26h32z" fill="#e9a23b22" stroke="#e9a23b55"/>
        <path d="M180 90l-16 26h32z" fill="#e9a23b22" stroke="#e9a23b55"/>
        <rect x="94" y="120" width="32" height="26" fill="#e9a23b1a" stroke="#e9a23b44"/>
      </svg>`,
    css: `
      .bulb{position:absolute;top:0;left:50%;width:2px;height:14vh;background:#e9a23b44}
      .bulb::after{content:"";position:absolute;left:50%;bottom:-13px;transform:translateX(-50%);
        width:26px;height:26px;border-radius:50%;background:#ffd88a;
        box-shadow:0 0 60px 26px rgba(233,162,59,.35)}
      .packets{position:absolute;top:0;left:38vw;right:0;display:flex;justify-content:space-around;
        padding:0 3vw;opacity:.9}
      .packets i{width:34px;height:74px;border-radius:0 0 5px 5px;animation-delay:var(--d);
        background:linear-gradient(180deg,#5b8c7e,#5b8c7e 40%,#e9a23b 40%,#c0392b);
        clip-path:polygon(0 0,100% 0,88% 100%,12% 100%)}
      .packets i:nth-child(even){background:linear-gradient(180deg,#c0392b,#c0392b 45%,#e9a23b)}
      .scale{position:absolute;right:3vw;bottom:4vh;width:min(240px,30vw);opacity:.35}
      @media(max-width:640px){.scale{opacity:.15}.packets i{width:22px;height:52px}}`,
    tracks: [
      ["Yeh Dosti", "Kishore Kumar, Manna Dey", 1975],
      ["Mere Sapno Ki Rani", "Kishore Kumar", 1969],
      ["Dum Maro Dum", "Asha Bhosle", 1971],
      ["Bachna Ae Haseeno", "Kishore Kumar", 1977],
      ["Khaike Paan Banaraswala", "Kishore Kumar", 1978],
      ["Jai Jai Shiv Shankar", "Kishore Kumar, Lata Mangeshkar", 1974],
      ["Ek Main Aur Ek Tu", "Kishore Kumar, Asha Bhosle", 1975],
      ["Aap Jaisa Koi", "Nazia Hassan", 1980],
      ["Disco Deewane", "Nazia Hassan, Zoheb Hassan", 1981],
      ["I Am A Disco Dancer", "Vijay Benedict", 1982],
      ["Jimmy Jimmy Aaja", "Parvati Khan", 1982],
      ["Yaad Aa Raha Hai", "Bappi Lahiri", 1982],
      ["Om Shanti Om", "Kishore Kumar", 1980],
      ["Pag Ghungroo Baandh", "Kishore Kumar", 1982],
      ["Rambha Ho", "Bappi Lahiri, Usha Uthup", 1981],
      ["Hawa Hawa", "Hassan Jahangir", 1987],
      ["My Name Is Lakhan", "Nitin Mukesh, Mohammed Aziz", 1989],
      ["Yeh Vaada Raha", "Kishore Kumar, Asha Bhosle", 1982]
    ]
  },

  /* ================================================================ 4 */
  {
    slug: "baraat-band",
    kind: "place",
    // Bollywood wedding songs, ~117 tracks
    ytPlaylist: "PLYmK3JHhP4fdCl2NVP30MFIAQMFXVeBCG",
    name: "Baraat",
    sign: "B A N D  B A A J A",
    kicker: "brass · dhol · generator light",
    tagline: "Nine men, brass instruments, and one film song murdered beautifully.",
    gateTitle: "Naach le",
    gateCopy:
      "Marigold string lights, a shamiana that smells of camphor, and a band that plays every song half a step flat.",
    ogDesc: "Brass band Bollywood under marigold lights and a shamiana tent.",
    glyph: "✺",
    fonts: {
      display: "Yatra One",
      body: "Inter",
      href: "https://fonts.googleapis.com/css2?family=Yatra+One&family=Inter:wght@400;600&display=swap"
    },
    tokens: {
      "--bg": "#170509",
      "--bg-gradient":
        "repeating-linear-gradient(105deg, rgba(255,138,0,0.07) 0 46px, rgba(255,255,255,0.03) 46px 92px), radial-gradient(80% 60% at 50% 0%, rgba(255,138,0,0.22), transparent 60%)",
      "--surface": "rgba(40,10,16,0.82)",
      "--ink": "#fdeede",
      "--ink-dim": "#c1968a",
      "--accent": "#ff8a00",
      "--accent-2": "#ffd966",
      "--on-accent": "#25060b",
      "--line": "rgba(255,217,102,0.24)",
      "--sign-ink": "#ffd966",
      "--sign-shadow": "0 0 40px rgba(255,138,0,0.6)",
      "--card-radius": "10px",
      "--grain-opacity": "0.06"
    },
    scene: `
      <div class="lights" aria-hidden="true">
        <i style="--d:0s"></i><i style="--d:.3s"></i><i style="--d:.7s"></i><i style="--d:1.1s"></i>
        <i style="--d:1.5s"></i><i style="--d:1.9s"></i><i style="--d:2.3s"></i><i style="--d:2.7s"></i>
        <i style="--d:3.1s"></i><i style="--d:3.5s"></i><i style="--d:3.9s"></i><i style="--d:4.3s"></i>
      </div>
      <svg class="dhol" viewBox="0 0 200 120" aria-hidden="true">
        <ellipse cx="40" cy="60" rx="22" ry="44" fill="#ffd96622" stroke="#ffd96666" stroke-width="2"/>
        <ellipse cx="160" cy="60" rx="22" ry="44" fill="#ffd96622" stroke="#ffd96666" stroke-width="2"/>
        <rect x="40" y="16" width="120" height="88" fill="#ff8a0018" stroke="#ffd96644"/>
        <g stroke="#ffd96633"><path d="M46 24l108 72"/><path d="M46 96l108-72"/></g>
      </svg>`,
    css: `
      .lights{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;
        padding:0 2vw}
      .lights i{width:12px;height:12px;border-radius:50%;background:#ff8a00;margin-top:5vh;
        box-shadow:0 0 24px 6px rgba(255,138,0,.55);animation:blink 3.2s ease-in-out infinite;
        animation-delay:var(--d);position:relative}
      .lights i::before{content:"";position:absolute;left:6px;top:-5vh;width:1px;height:5vh;
        background:linear-gradient(180deg,transparent,#ffd96655)}
      @keyframes blink{0%,100%{opacity:1}50%{opacity:.28}}
      .dhol{position:absolute;left:50%;bottom:-6vh;transform:translateX(-50%);
        width:min(340px,60vw);opacity:.22}`,
    tracks: [
      ["Aaj Mere Yaar Ki Shaadi Hai", "Mohammed Rafi", 1977],
      ["Mehndi Laga Ke Rakhna", "Udit Narayan, Lata Mangeshkar", 1995],
      ["Dulhe Ka Sehra", "Nusrat Fateh Ali Khan", 2000],
      ["Wah Wah Ramji", "Lata Mangeshkar, S. P. Balasubrahmanyam", 1994],
      ["Joote Do Paise Lo", "Lata Mangeshkar, S. P. Balasubrahmanyam", 1994],
      ["Chhote Chhote Bhaiyon Ke", "S. P. Balasubrahmanyam, Lata Mangeshkar", 1994],
      ["Le Jayenge Le Jayenge", "Kishore Kumar, Asha Bhosle", 1974],
      ["Aaya Sawan Jhoom Ke", "Mohammed Rafi", 1969],
      ["Saajanji Ghar Aaye", "Kumar Sanu, Alka Yagnik", 1998],
      ["Kajra Re", "Alisha Chinai, Shankar Mahadevan", 2005],
      ["Nagada Sang Dhol", "Shreya Ghoshal, Osman Mir", 2013],
      ["Gud Naal Ishq Mitha", "Malkit Singh", 1998],
      ["Sadi Gali", "Lehmber Hussainpuri", 2011],
      ["Mauja Hi Mauja", "Mika Singh", 2007],
      ["Bole Chudiyan", "Sonu Nigam, Alka Yagnik", 2001],
      ["London Thumakda", "Labh Janjua, Sonu Kakkar", 2014],
      ["Balle Balle", "Daler Mehndi", 1998],
      ["Aaj Hai Sagai", "Sonu Nigam, Alka Yagnik", 2002]
    ]
  },

  /* ================================================================ 5 */
  {
    slug: "wedding-vhs",
    kind: "place",
    // Shemaroo Filmi Gaane — 1990s superhit romantic, ~97 tracks
    ytPlaylist: "PL4OqLl4qvLkfzpGEFUAPmppzBjcNbp09i",
    name: "VHS",
    sign: "▶ PLAY  SP",
    kicker: "cam 1 · tracking · sp mode",
    tagline: "Slow-motion garland exchange, date stamp burned into the corner.",
    gateTitle: "Press play on the cassette",
    gateCopy:
      "Somebody's uncle shot this in 1997 with two lights and a fog machine. It has been rewound at every family gathering since.",
    ogDesc: "Wedding video slow-mo love songs, scan lines and a burned-in date stamp.",
    glyph: "▣",
    fonts: {
      display: "VT323",
      body: "IBM Plex Mono",
      href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=VT323&display=swap"
    },
    tokens: {
      "--bg": "#04060c",
      "--bg-gradient":
        "radial-gradient(90% 70% at 50% 45%, rgba(53,224,240,0.10), transparent 65%)",
      "--surface": "rgba(6,14,24,0.78)",
      "--ink": "#dff4f8",
      "--ink-dim": "#6d8b96",
      "--accent": "#35e0f0",
      "--accent-2": "#ff3dae",
      "--on-accent": "#03151a",
      "--line": "rgba(53,224,240,0.24)",
      "--sign-ink": "#35e0f0",
      "--sign-tracking": "0.12em",
      "--sign-shadow": "2px 0 0 rgba(255,61,174,0.7), -2px 0 0 rgba(53,224,240,0.5)",
      "--card-radius": "0",
      "--art-filter": "saturate(1.25) contrast(1.08)",
      "--grain-opacity": "0.11",
      "--grain-blend": "screen"
    },
    scene: `
      <div class="scan" aria-hidden="true"></div>
      <div class="track-bar" aria-hidden="true"></div>
      <div class="rec" aria-hidden="true"><b></b>REC</div>
      <div class="stamp" aria-hidden="true">12 05 1997<br><small>SP  0:14:32</small></div>`,
    css: `
      .scan{position:absolute;inset:0;
        background:repeating-linear-gradient(180deg,rgba(255,255,255,.045) 0 1px,transparent 1px 3px)}
      .track-bar{position:absolute;left:0;right:0;height:26px;
        background:linear-gradient(180deg,transparent,rgba(255,255,255,.13),transparent);
        animation:roll 9s linear infinite;filter:blur(1px)}
      @keyframes roll{from{top:-6%}to{top:106%}}
      .rec{position:absolute;top:15vh;right:5vw;font-family:var(--font-display);font-size:26px;
        color:#ff3dae;letter-spacing:.16em;display:flex;align-items:center;gap:9px}
      .rec b{width:11px;height:11px;border-radius:50%;background:#ff3dae;
        animation:blink 1.6s steps(1,end) infinite}
      @keyframes blink{0%,49%{opacity:1}50%,100%{opacity:.1}}
      .stamp{position:absolute;bottom:6vh;right:5vw;font-family:var(--font-display);
        font-size:clamp(20px,4.6vw,32px);color:#e7f7ff;opacity:.75;text-align:right;line-height:1.1;
        text-shadow:0 0 12px rgba(53,224,240,.6)}
      .stamp small{font-size:.62em;opacity:.7}`,
    tracks: [
      ["Tujhe Dekha To", "Kumar Sanu, Lata Mangeshkar", 1995],
      ["Pehla Nasha", "Udit Narayan, Sadhana Sargam", 1992],
      ["Tum Paas Aaye", "Udit Narayan, Alka Yagnik", 1998],
      ["Kuch Kuch Hota Hai", "Udit Narayan, Alka Yagnik", 1998],
      ["Suraj Hua Maddham", "Sonu Nigam, Alka Yagnik", 2001],
      ["Tere Liye", "Lata Mangeshkar, Roop Kumar Rathod", 2004],
      ["Bahon Ke Darmiyan", "Kumar Sanu, Kavita Krishnamurthy", 1996],
      ["Aankhon Ki Gustakhiyan", "Kumar Sanu, Kavita Krishnamurthy", 1999],
      ["Tadap Tadap", "K. K.", 1999],
      ["Chand Chhupa Badal Mein", "Udit Narayan, Alka Yagnik", 1999],
      ["Zara Sa Jhoom Loon Main", "Abhijeet, Asha Bhosle", 1995],
      ["Ho Gaya Hai Tujhko", "Udit Narayan, Lata Mangeshkar", 1995],
      ["Dil To Pagal Hai", "Lata Mangeshkar, Udit Narayan", 1997],
      ["Are Re Are", "Udit Narayan, Lata Mangeshkar", 1997],
      ["Koi Mil Gaya", "Udit Narayan, Alka Yagnik", 1998],
      ["Sandese Aate Hain", "Sonu Nigam, Roop Kumar Rathod", 1997],
      ["Pyar Hua Chupke Se", "Kavita Krishnamurthy", 1994],
      ["Ae Ajnabi", "Udit Narayan, Mahalaxmi Iyer", 1998]
    ]
  },

  /* ================================================================ 6 */
  {
    slug: "ghazal",
    kind: "genre",
    maxSeconds: 1800, // long-form recordings are normal here
    // Saregama Ghazal — Jagjit Singh & Chitra Singh, ~265 tracks
    ytPlaylist: "PLJeNQvgQ4Sl-WJX41V39pPd3oQxKNc7EA",
    name: "Mehfil",
    sign: "M E H F I L",
    kicker: "ghazal · nazm · shair",
    tagline: "Wine-dark room, one harmonium, and a couplet that ruins you.",
    gateTitle: "Irshad",
    gateCopy:
      "Cigarette smoke under a yellow bulb, a shawl on the shoulder, and the audience going 'wah' half a line too early.",
    ogDesc: "Ghazal radio — Mehdi Hassan, Jagjit Singh, Ghulam Ali, Farida Khanum.",
    glyph: "۞",
    fonts: {
      display: "Playfair Display",
      body: "Cormorant Garamond",
      href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Playfair+Display:ital,wght@0,600;1,600&display=swap"
    },
    tokens: {
      "--bg": "#120609",
      "--bg-gradient":
        "radial-gradient(60% 50% at 50% 0%, rgba(201,162,39,0.16), transparent 60%), radial-gradient(80% 60% at 50% 120%, rgba(142,90,90,0.2), transparent 70%)",
      "--surface": "rgba(30,12,16,0.8)",
      "--ink": "#f3e6d8",
      "--ink-dim": "#a98b80",
      "--accent": "#c9a227",
      "--accent-2": "#c98b8b",
      "--on-accent": "#160709",
      "--line": "rgba(201,162,39,0.24)",
      "--sign-ink": "#c9a227",
      "--sign-tracking": "0.16em",
      "--card-radius": "2px",
      "--card-border": "1px solid rgba(201,162,39,0.3)",
      "--grain-opacity": "0.05",
      "--vignette":
        "radial-gradient(110% 90% at 50% 45%, transparent 30%, rgba(0,0,0,0.72) 100%)"
    },
    scene: `
      <svg class="arch" viewBox="0 0 400 520" aria-hidden="true">
        <path d="M200 12c78 0 138 62 138 140v356H62V152C62 74 122 12 200 12z"
              fill="none" stroke="#c9a22733" stroke-width="2"/>
        <path d="M200 52c56 0 100 46 100 104v340H100V156c0-58 44-104 100-104z"
              fill="none" stroke="#c9a22722" stroke-width="1.5"/>
      </svg>
      <div class="candle" aria-hidden="true"><span class="flame flicker"></span></div>
      <div class="smoke" aria-hidden="true"></div>`,
    css: `
      .arch{position:absolute;left:50%;top:8vh;transform:translateX(-50%);height:80vh;opacity:.75}
      .candle{position:absolute;left:8vw;bottom:8vh;width:14px;height:88px;border-radius:3px;
        background:linear-gradient(180deg,#f3e6d8,#c9a22766);opacity:.65}
      .flame{position:absolute;left:50%;top:-22px;transform:translateX(-50%);
        width:14px;height:24px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;
        background:radial-gradient(circle at 50% 70%,#fff3c4,#ff9a1f 55%,transparent 72%);
        box-shadow:0 0 50px 16px rgba(255,154,31,.28)}
      .smoke{position:absolute;left:8vw;bottom:16vh;width:200px;height:40vh;
        background:radial-gradient(40% 30% at 30% 100%,rgba(255,255,255,.05),transparent 70%);
        filter:blur(12px)}
      @media(max-width:640px){.candle,.smoke{opacity:.3}}`,
    tracks: [
      ["Ranjish Hi Sahi", "Mehdi Hassan"],
      ["Rafta Rafta Woh Meri", "Mehdi Hassan"],
      ["Mujhe Tum Nazar Se", "Mehdi Hassan"],
      ["Ab Ke Hum Bichhde", "Mehdi Hassan"],
      ["Chupke Chupke Raat Din", "Ghulam Ali"],
      ["Hungama Hai Kyon Barpa", "Ghulam Ali"],
      ["Aawargi", "Ghulam Ali"],
      ["Tum Itna Jo Muskura Rahe Ho", "Jagjit Singh", 1982],
      ["Ahista Ahista", "Jagjit Singh"],
      ["Woh Kagaz Ki Kashti", "Jagjit Singh"],
      ["Baat Niklegi To Phir", "Jagjit Singh"],
      ["Tere Aane Ki Jab Khabar Mehke", "Jagjit Singh"],
      ["Hoshwalon Ko Khabar Kya", "Jagjit Singh", 1999],
      ["Chithi Na Koi Sandesh", "Jagjit Singh", 1998],
      ["Aaj Jaane Ki Zid Na Karo", "Farida Khanum"],
      ["Dil Cheez Kya Hai", "Asha Bhosle", 1981],
      ["In Aankhon Ki Masti", "Asha Bhosle", 1981],
      ["Chandi Jaisa Rang", "Pankaj Udhas"],
      ["Kabhi Kisi Ko Muqammal", "Bhupinder Singh", 1982],
      ["Yeh Dhuan Sa Kahan Se Uthta Hai", "Jagjit Singh"]
    ]
  },

  /* ================================================================ 7 */
  {
    slug: "bollywood-90s",
    kind: "genre",
    // Tips Official — "90s Golden Hits", ~2250 tracks, label-maintained
    ytPlaylist: "PLinVjP-aRmlukMwFfIb5u0xA-M_Be3nC5",
    name: "Cassette",
    sign: "T-SERIES  90s",
    kicker: "side a · dolby · rewind with a pencil",
    tagline: "One cassette, both sides, played until the tape stretched.",
    gateTitle: "Side A",
    gateCopy:
      "Bought from a shop with a hand-written inlay card. The chorus was always slightly warped by the third month.",
    ogDesc: "90s Bollywood cassette radio — Kumar Sanu, Alka Yagnik, Udit Narayan.",
    glyph: "▤",
    fonts: {
      display: "Monoton",
      body: "Space Grotesk",
      href: "https://fonts.googleapis.com/css2?family=Monoton&family=Space+Grotesk:wght@400;600&display=swap"
    },
    tokens: {
      "--bg": "#0a0514",
      "--bg-gradient":
        "radial-gradient(70% 55% at 15% 10%, rgba(255,46,136,0.20), transparent 60%), radial-gradient(70% 55% at 85% 85%, rgba(34,211,238,0.18), transparent 60%)",
      "--surface": "rgba(18,8,32,0.8)",
      "--ink": "#f6ecff",
      "--ink-dim": "#9a86b8",
      "--accent": "#ff2e88",
      "--accent-2": "#22d3ee",
      "--on-accent": "#150419",
      "--line": "rgba(255,46,136,0.26)",
      "--sign-ink": "#ff2e88",
      "--sign-tracking": "0.04em",
      "--sign-shadow": "0 0 28px rgba(255,46,136,0.75), 0 0 60px rgba(34,211,238,0.4)",
      "--card-radius": "6px",
      "--grain-opacity": "0.05"
    },
    scene: `
      <svg class="tape" viewBox="0 0 320 200" aria-hidden="true">
        <rect x="6" y="6" width="308" height="188" rx="10" fill="#ffffff10" stroke="#ff2e88aa"/>
        <rect x="30" y="26" width="260" height="66" rx="4" fill="#22d3ee12" stroke="#22d3ee33"/>
        <g class="spin" style="transform-origin:100px 138px">
          <circle cx="100" cy="138" r="34" fill="none" stroke="#ff2e8866" stroke-width="3"/>
          <g stroke="#ff2e8899" stroke-width="4">
            <path d="M100 108v14"/><path d="M100 154v14"/><path d="M70 138h14"/><path d="M116 138h14"/>
          </g>
        </g>
        <g class="spin" style="transform-origin:220px 138px">
          <circle cx="220" cy="138" r="34" fill="none" stroke="#22d3ee66" stroke-width="3"/>
          <g stroke="#22d3ee99" stroke-width="4">
            <path d="M220 108v14"/><path d="M220 154v14"/><path d="M190 138h14"/><path d="M236 138h14"/>
          </g>
        </g>
        <rect x="128" y="120" width="64" height="36" fill="#00000055" stroke="#ffffff22"/>
      </svg>
      <div class="grid" aria-hidden="true"></div>`,
    css: `
      .tape{position:absolute;left:50%;bottom:-3vh;transform:translateX(-50%);
        width:min(460px,76vw);opacity:.75;filter:drop-shadow(0 0 26px rgba(255,46,136,.2))}
      .grid{position:absolute;inset:0;
        background:linear-gradient(90deg,#ff2e8810 1px,transparent 1px) 0 0/44px 44px,
                   linear-gradient(180deg,#22d3ee10 1px,transparent 1px) 0 0/44px 44px;
        mask-image:radial-gradient(70% 60% at 50% 50%,#000,transparent 80%)}`,
    tracks: [
      ["Ae Mere Humsafar", "Udit Narayan, Alka Yagnik", 1988],
      ["Papa Kehte Hain", "Udit Narayan", 1988],
      ["Tumse Milne Ki Tamanna", "S. P. Balasubrahmanyam", 1991],
      ["Bahut Pyar Karte Hain", "Anuradha Paudwal", 1991],
      ["Jaadu Teri Nazar", "Udit Narayan", 1993],
      ["Tu Mere Samne", "Lata Mangeshkar, Udit Narayan", 1993],
      ["Baazigar O Baazigar", "Kumar Sanu, Alka Yagnik", 1993],
      ["Yeh Kaali Kaali Aankhen", "Kumar Sanu, Anu Malik", 1993],
      ["Chura Ke Dil Mera", "Kumar Sanu, Alka Yagnik", 1994],
      ["Aisi Deewangi", "Kumar Sanu, Vinod Rathod", 1992],
      ["Sochenge Tumhe Pyar", "Kumar Sanu", 1992],
      ["Dil Hai Ke Manta Nahin", "Kumar Sanu, Anuradha Paudwal", 1991],
      ["Pehla Nasha", "Udit Narayan, Sadhana Sargam", 1992],
      ["Tujhe Dekha To", "Kumar Sanu, Lata Mangeshkar", 1995],
      ["Rangeela Re", "Asha Bhosle", 1995],
      ["Pardesi Pardesi", "Udit Narayan, Alka Yagnik", 1996],
      ["Kuch Kuch Hota Hai", "Udit Narayan, Alka Yagnik", 1998],
      ["Akele Hain To Kya Gham Hai", "Udit Narayan, Alka Yagnik", 1988],
      ["Meri Mehbooba", "Kumar Sanu, Alka Yagnik", 1997],
      ["Kuch Na Kaho", "Kumar Sanu", 1994]
    ]
  },

  /* ================================================================ 8 */
  {
    slug: "retro-rock",
    kind: "genre",
    // Redlist — Classic Rock Greatest Hits 60s/70s/80s, ~170 tracks
    ytPlaylist: "PL9xheEG-eSrSzt05VVCLfNRBjnNmRZtbx",
    name: "Valve",
    sign: "VALVE  RADIO",
    kicker: "tolex · tubes · vu meter",
    tagline: "One amp, warm glass tubes, and the riffs your father still air-guitars.",
    gateTitle: "Turn it up",
    gateCopy:
      "Cream tolex, a needle that never sits still, and a valve glow you could read by. Volume knob only goes one way.",
    ogDesc: "Classic rock radio through a valve amp — Zeppelin, Floyd, Queen, AC/DC.",
    glyph: "⚡",
    fonts: {
      display: "Bebas Neue",
      body: "Oswald",
      href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;500&display=swap"
    },
    tokens: {
      "--bg": "#0c0b09",
      "--bg-gradient":
        "radial-gradient(70% 50% at 50% 90%, rgba(232,179,60,0.16), transparent 65%)",
      "--surface": "rgba(22,19,15,0.84)",
      "--ink": "#f0e7d6",
      "--ink-dim": "#9c8f79",
      "--accent": "#e8b33c",
      "--accent-2": "#c0392b",
      "--on-accent": "#161309",
      "--line": "rgba(232,179,60,0.22)",
      "--sign-ink": "#e8b33c",
      "--sign-tracking": "0.18em",
      "--card-radius": "4px",
      "--card-border": "1px solid rgba(232,179,60,0.28)",
      "--grain-opacity": "0.08"
    },
    scene: `
      <div class="grille" aria-hidden="true"></div>
      <div class="glow" aria-hidden="true"></div>
      <svg class="vu" viewBox="0 0 240 130" aria-hidden="true">
        <rect x="2" y="2" width="236" height="126" rx="6" fill="#e8b33c0e" stroke="#e8b33c44"/>
        <path d="M28 104a92 92 0 0 1 184 0" fill="none" stroke="#e8b33c55" stroke-width="2"/>
        <path d="M186 40l22-14" stroke="#c0392b88" stroke-width="2"/>
        <g class="needle"><path d="M120 104V34" stroke="#f0e7d6" stroke-width="2.5"/></g>
        <circle cx="120" cy="104" r="6" fill="#e8b33c"/>
      </svg>`,
    css: `
      .grille{position:absolute;inset:0;opacity:.5;
        background:repeating-linear-gradient(45deg,#ffffff07 0 2px,transparent 2px 6px),
                   repeating-linear-gradient(-45deg,#00000055 0 2px,transparent 2px 6px)}
      .glow{position:absolute;left:50%;bottom:-10vh;transform:translateX(-50%);
        width:60vw;height:36vh;border-radius:50%;
        background:radial-gradient(circle,rgba(232,179,60,.22),transparent 68%);filter:blur(24px)}
      .vu{position:absolute;left:4vw;bottom:6vh;width:min(260px,32vw);opacity:.6}
      .needle{transform-box:fill-box;transform-origin:120px 104px;
        animation:vu 2.6s ease-in-out infinite}
      @keyframes vu{0%,100%{transform:rotate(-32deg)}42%{transform:rotate(18deg)}
        62%{transform:rotate(-6deg)}80%{transform:rotate(26deg)}}
      @media(max-width:640px){.vu{opacity:.22}}`,
    tracks: [
      ["Hotel California", "Eagles", 1976],
      ["Stairway to Heaven", "Led Zeppelin", 1971],
      ["Whole Lotta Love", "Led Zeppelin", 1969],
      ["Comfortably Numb", "Pink Floyd", 1979],
      ["Wish You Were Here", "Pink Floyd", 1975],
      ["Bohemian Rhapsody", "Queen", 1975],
      ["Sweet Child O' Mine", "Guns N' Roses", 1987],
      ["Smoke on the Water", "Deep Purple", 1972],
      ["Highway to Hell", "AC/DC", 1979],
      ["Back in Black", "AC/DC", 1980],
      ["Paint It, Black", "The Rolling Stones", 1966],
      ["Layla", "Derek and the Dominos", 1970],
      ["Born to Be Wild", "Steppenwolf", 1968],
      ["More Than a Feeling", "Boston", 1976],
      ["Dream On", "Aerosmith", 1973],
      ["Free Bird", "Lynyrd Skynyrd", 1973],
      ["Fortunate Son", "Creedence Clearwater Revival", 1969],
      ["Barracuda", "Heart", 1977],
      ["Rock You Like a Hurricane", "Scorpions", 1984],
      ["Summer of '69", "Bryan Adams", 1984]
    ]
  },

  /* ================================================================ 9 */
  {
    slug: "lofi",
    kind: "genre",
    // Lofi Fruits Music — ~321 tracks
    ytPlaylist: "PL6fhs6TSspZv0F0YgsG-p7Mn189CU2XKS",
    name: "Monsoon",
    sign: "l o f i   r a i n",
    kicker: "tape hiss · rain · no vocals",
    tagline: "Rain on the window, a tape loop, and homework you never finished.",
    gateTitle: "Stay in",
    gateCopy:
      "Lamp on, blinds half down, and a beat that never resolves. Meant to be left playing while you do something else.",
    ogDesc: "Lo-fi radio for rain, tape hiss, and unfinished homework.",
    glyph: "❍",
    fonts: {
      display: "DM Serif Display",
      body: "DM Sans",
      href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=DM+Serif+Display&display=swap"
    },
    tokens: {
      "--bg": "#12111b",
      "--bg-gradient":
        "radial-gradient(80% 60% at 70% 15%, rgba(183,166,232,0.16), transparent 60%), radial-gradient(70% 50% at 20% 95%, rgba(123,199,199,0.12), transparent 65%)",
      "--surface": "rgba(24,23,36,0.78)",
      "--ink": "#ece9f6",
      "--ink-dim": "#8d88a8",
      "--accent": "#b7a6e8",
      "--accent-2": "#7bc7c7",
      "--on-accent": "#15121f",
      "--line": "rgba(183,166,232,0.2)",
      "--sign-ink": "#ece9f6",
      "--sign-tracking": "0.06em",
      "--card-radius": "18px",
      "--card-blur": "blur(8px)",
      "--card-border": "1px solid rgba(255,255,255,0.09)",
      "--art-radius": "12px",
      "--grain-opacity": "0.06",
      "--vignette":
        "radial-gradient(120% 100% at 50% 40%, transparent 50%, rgba(0,0,0,0.5) 100%)"
    },
    scene: `
      <div class="window" aria-hidden="true"></div>
      <div class="rain" aria-hidden="true">
        <i style="--x:8vw;--d:0s;--s:.9s"></i><i style="--x:19vw;--d:.4s;--s:1.1s"></i>
        <i style="--x:31vw;--d:.15s;--s:.8s"></i><i style="--x:44vw;--d:.7s;--s:1.2s"></i>
        <i style="--x:58vw;--d:.25s;--s:.95s"></i><i style="--x:69vw;--d:.55s;--s:1.05s"></i>
        <i style="--x:81vw;--d:.1s;--s:.85s"></i><i style="--x:92vw;--d:.65s;--s:1.15s"></i>
      </div>`,
    css: `
      .window{position:absolute;inset:8vh 6vw;border:1px solid rgba(255,255,255,.07);
        border-radius:10px;
        background:linear-gradient(160deg,rgba(255,255,255,.035),transparent 55%);
        backdrop-filter:blur(1px)}
      .window::after{content:"";position:absolute;left:50%;top:0;bottom:0;width:1px;
        background:rgba(255,255,255,.06)}
      .rain i{position:absolute;top:-14vh;left:var(--x);width:1px;height:12vh;
        background:linear-gradient(180deg,transparent,rgba(183,166,232,.5));
        animation:fall var(--s) linear infinite;animation-delay:var(--d)}
      @keyframes fall{to{transform:translateY(124vh)}}`,
    tracks: [
      ["Feather", "Nujabes"],
      ["Aruarian Dance", "Nujabes"],
      ["Luv (sic) Pt. 3", "Nujabes"],
      ["Counting Stars", "Nujabes"],
      ["Snowman", "WYS"],
      ["Affection", "Jinsang"],
      ["Summer's Day", "Jinsang"],
      ["Controlla", "Idealism"],
      ["Both of Us", "Idealism"],
      ["Harbor", "Tomppabeats"],
      ["Owls of the Night", "Kupla"],
      ["Staying There", "L'indécis"],
      ["Soulful", "L'indécis"],
      ["just friends", "potsu"],
      ["Seasons", "Aso"],
      ["Pathway", "eevee"],
      ["Lucid", "Philanthrope"],
      ["Under Water", "Sleepy Fish"]
    ]
  },

  /* =============================================================== 10 */
  {
    slug: "qawwali",
    kind: "genre",
    maxSeconds: 1800, // long-form recordings are normal here
    // Nupur Audio — Best of Nusrat Fateh Ali Khan, ~90 tracks
    ytPlaylist: "PLeHcbwsMVRm4RVm8cm9gbgCuivb_HKcar",
    name: "Dargah",
    sign: "Q A W W A L I",
    kicker: "harmonium · taali · chorus",
    tagline: "Thursday night at the dargah, hands clapping on the offbeat.",
    gateTitle: "Baithiye",
    gateCopy:
      "Green chadar, rose petals, a harmonium wheezing to life, and a chorus that keeps climbing until nobody is sitting still.",
    ogDesc: "Qawwali radio — Nusrat, the Sabri Brothers, Abida Parveen.",
    glyph: "❋",
    fonts: {
      display: "Amiri",
      body: "Cormorant Garamond",
      href: "https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,700;1,400&family=Cormorant+Garamond:wght@400;600&display=swap"
    },
    tokens: {
      "--bg": "#04120b",
      "--bg-gradient":
        "radial-gradient(70% 50% at 50% 0%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(90% 70% at 50% 110%, rgba(30,122,82,0.24), transparent 70%)",
      "--surface": "rgba(8,28,19,0.8)",
      "--ink": "#f0ecdc",
      "--ink-dim": "#96ab9c",
      "--accent": "#d4af37",
      "--accent-2": "#3fbf87",
      "--on-accent": "#06170e",
      "--line": "rgba(212,175,55,0.26)",
      "--sign-ink": "#d4af37",
      "--sign-tracking": "0.18em",
      "--sign-shadow": "0 0 34px rgba(212,175,55,0.45)",
      "--card-radius": "2px",
      "--card-border": "1px solid rgba(212,175,55,0.3)",
      "--grain-opacity": "0.05"
    },
    scene: `
      <svg class="jali" viewBox="0 0 420 420" aria-hidden="true">
        <defs>
          <pattern id="j" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 2 58 30 30 58 2 30z" fill="none" stroke="#d4af3733"/>
            <circle cx="30" cy="30" r="9" fill="none" stroke="#d4af3722"/>
          </pattern>
        </defs>
        <rect width="420" height="420" fill="url(#j)"/>
      </svg>
      <div class="chandelier" aria-hidden="true">
        <i style="--d:0s"></i><i style="--d:.5s"></i><i style="--d:1s"></i>
        <i style="--d:1.5s"></i><i style="--d:2s"></i>
      </div>
      <div class="petals" aria-hidden="true">
        <b style="--x:14vw;--d:0s"></b><b style="--x:37vw;--d:2.6s"></b>
        <b style="--x:62vw;--d:1.3s"></b><b style="--x:86vw;--d:3.9s"></b>
      </div>`,
    css: `
      .jali{position:absolute;inset:0;width:100%;height:100%;opacity:.5;
        mask-image:radial-gradient(60% 55% at 50% 45%,transparent 30%,#000 85%)}
      .chandelier{position:absolute;top:0;left:50%;transform:translateX(-50%);display:flex;gap:22px}
      .chandelier i{width:7px;height:7px;border-radius:50%;background:#ffe9a8;margin-top:15vh;
        box-shadow:0 0 26px 8px rgba(212,175,55,.4);
        animation:glow 4s ease-in-out infinite;animation-delay:var(--d)}
      .chandelier i::before{content:"";position:absolute;top:-15vh;left:3px;width:1px;height:15vh;
        background:linear-gradient(180deg,transparent,#d4af3744)}
      @keyframes glow{0%,100%{opacity:.9}50%{opacity:.35}}
      .petals b{position:absolute;top:-6vh;left:var(--x);width:9px;height:6px;border-radius:60% 40%;
        background:#c0567a99;animation:drift 11s linear infinite;animation-delay:var(--d)}
      @keyframes drift{to{transform:translate(30px,116vh) rotate(220deg);opacity:0}}`,
    tracks: [
      ["Dam Mast Qalandar", "Nusrat Fateh Ali Khan"],
      ["Allah Hoo", "Nusrat Fateh Ali Khan"],
      ["Tumhe Dillagi", "Nusrat Fateh Ali Khan"],
      ["Afreen Afreen", "Nusrat Fateh Ali Khan", 1996],
      ["Sanson Ki Mala", "Nusrat Fateh Ali Khan"],
      ["Mera Piya Ghar Aaya", "Nusrat Fateh Ali Khan"],
      ["Yeh Jo Halka Halka Suroor", "Nusrat Fateh Ali Khan"],
      ["Kinna Sohna", "Nusrat Fateh Ali Khan"],
      ["Tajdar-e-Haram", "Sabri Brothers"],
      ["Bhar Do Jholi Meri", "Sabri Brothers"],
      ["Chaap Tilak", "Abida Parveen"],
      ["Tere Ishq Nachaya", "Abida Parveen"],
      ["Damadam Mast Qalandar", "Abida Parveen"],
      ["Aaj Rang Hai", "Traditional (Amir Khusrau)"],
      ["Khwaja Mere Khwaja", "A. R. Rahman", 2008],
      ["Kun Faya Kun", "A. R. Rahman, Javed Ali, Mohit Chauhan", 2011],
      ["Arziyan", "Javed Ali, Kailash Kher", 2009],
      ["Piya Haji Ali", "A. R. Rahman, Srinivas", 2000]
    ]
  },

  /* =============================================================== 11 */
  {
    slug: "garbh-sanskar",
    kind: "genre",
    // Chants and stotrams legitimately run long here, so the compilation
    // ceiling is generous — an hour-long Vishnu Sahasranamam is the point.
    maxSeconds: 3600,
    name: "Garbh Sanskar",
    sign: "G A R B H  S A N S K A R",
    kicker: "bhajan · mantra · nine months",
    tagline: "Bhajans for the nine months of waiting.",
    gateTitle: "Aaram se baithiye",
    gateCopy:
      "A lamp lit at dusk, tulsi at the door, and the same few bhajans playing softly while the house waits.",
    ogDesc: "Calm bhajans and mantras for pregnancy — garbh sanskar listening.",
    glyph: "✿",
    fonts: {
      display: "Marcellus",
      body: "Karla",
      href: "https://fonts.googleapis.com/css2?family=Karla:wght@400;600&family=Marcellus&display=swap"
    },
    tokens: {
      "--bg": "#100d07",
      "--bg-gradient":
        "radial-gradient(70% 55% at 50% 105%, rgba(233,180,76,0.22), transparent 62%), radial-gradient(80% 60% at 50% 0%, rgba(134,160,111,0.10), transparent 60%)",
      "--surface": "rgba(28,23,13,0.78)",
      "--ink": "#f7efdf",
      "--ink-dim": "#b09d84",
      "--accent": "#e9b44c",
      "--accent-2": "#86a06f",
      "--on-accent": "#191204",
      "--line": "rgba(233,180,76,0.22)",
      "--sign-ink": "#e9b44c",
      "--sign-tracking": "0.14em",
      "--sign-shadow": "0 0 38px rgba(233,180,76,0.35)",
      "--card-radius": "3px",
      "--card-border": "1px solid rgba(233,180,76,0.26)",
      "--grain-opacity": "0.05",
      "--vignette":
        "radial-gradient(115% 95% at 50% 55%, transparent 50%, rgba(0,0,0,0.55) 100%)"
    },
    scene: `
      <svg class="mandala" viewBox="0 0 400 400" aria-hidden="true">
        <g fill="none" stroke="#e9b44c" stroke-width="1">
          <circle cx="200" cy="200" r="150" opacity=".18"/>
          <circle cx="200" cy="200" r="120" opacity=".13"/>
          <circle cx="200" cy="200" r="92" opacity=".1"/>
        </g>
        <g fill="none" stroke="#e9b44c" opacity=".14">
          <path d="M200 50c34 42 34 108 0 150-34-42-34-108 0-150z"/>
          <path d="M200 350c34-42 34-108 0-150-34 42-34 108 0 150z"/>
          <path d="M50 200c42-34 108-34 150 0-42 34-108 34-150 0z"/>
          <path d="M350 200c-42-34-108-34-150 0 42 34 108 34 150 0z"/>
        </g>
      </svg>
      <svg class="diya" viewBox="0 0 200 120" aria-hidden="true">
        <path d="M40 62h120c0 26-27 42-60 42S40 88 40 62z" fill="#5a3d18" stroke="#e9b44c66"/>
        <path d="M34 60h132c0 5-6 8-12 8H46c-6 0-12-3-12-8z" fill="#7a5426"/>
        <g class="flicker">
          <path d="M100 14c14 16 20 26 20 34a20 20 0 0 1-40 0c0-8 6-18 20-34z"
                fill="url(#fl)"/>
        </g>
        <defs>
          <radialGradient id="fl" cx="50%" cy="75%" r="65%">
            <stop offset="0%" stop-color="#fff6d0"/>
            <stop offset="55%" stop-color="#ffb43c"/>
            <stop offset="100%" stop-color="#ff8a00" stop-opacity="0"/>
          </radialGradient>
        </defs>
      </svg>
      <div class="petals" aria-hidden="true">
        <b style="--x:16vw;--d:0s"></b><b style="--x:41vw;--d:4.5s"></b>
        <b style="--x:68vw;--d:2.2s"></b><b style="--x:88vw;--d:6.4s"></b>
      </div>`,
    css: `
      .mandala{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);
        width:min(760px,105vw);opacity:.75;animation:turn 120s linear infinite}
      @keyframes turn{to{transform:translate(-50%,-50%) rotate(360deg)}}
      .diya{position:absolute;left:6vw;bottom:5vh;width:min(220px,26vw);opacity:.95;
        filter:drop-shadow(0 -6px 46px rgba(255,180,60,.45))}
      .petals b{position:absolute;top:-6vh;left:var(--x);width:11px;height:7px;
        border-radius:60% 40%;background:#e9b44c55;
        animation:fall2 16s linear infinite;animation-delay:var(--d)}
      @keyframes fall2{to{transform:translate(24px,118vh) rotate(200deg);opacity:0}}
      @media(max-width:640px){.mandala{opacity:.4}}`,
    tracks: [
      ["Gayatri Mantra", "Anuradha Paudwal"],
      ["Vishnu Sahasranamam", "M. S. Subbulakshmi"],
      ["Om Namah Shivaya Dhun", "Traditional"],
      ["Achyutam Keshavam", "Traditional"],
      ["Madhurashtakam", "Traditional (Vallabhacharya)"],
      ["Hare Krishna Hare Rama Dhun", "Traditional"],
      ["Santan Gopal Mantra", "Traditional"],
      ["Ganesh Atharvashirsha", "Traditional"],
      ["Shri Ram Chandra Kripalu", "Traditional (Tulsidas)"],
      ["Bhagyada Lakshmi Baramma", "M. S. Subbulakshmi"],
      ["Om Jai Jagdish Hare", "Traditional"],
      ["Raghupati Raghav Raja Ram", "Traditional"],
      ["Payoji Maine Ram Ratan Dhan Payo", "Lata Mangeshkar"],
      ["Itni Shakti Hamein Dena Data", "Sushma Shreshtha, Pushpa Pagdhare", 1983],
      ["Ae Malik Tere Bande Hum", "Vani Jairam", 1957],
      ["Tu Pyar Ka Sagar Hai", "Manna Dey", 1959],
      ["Sri Suktam", "Traditional"],
      ["Vakratunda Mahakaya", "Traditional"]
    ]
  }
];
