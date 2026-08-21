/* ============================================================
   themes.mjs — every site is one entry in this array.
   Adding an artist = adding an object here, then `node build.mjs`.

   tracks: [title, artist, year]  → year optional
   ============================================================ */

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export const themes = [
  /* ================================================================ 1 */
  {
    slug: "udit-narayan",
    // kuchh bhi dekho dosto (कुछ भी देखो दोस्तो) — Udit Narayan songs, ~455 tracks
    ytPlaylist: "PLHNOeF1Yw3i0Swt9LUXe5azHLMDn7V-ng",
    kind: "artist",
    name: "Udit Narayan",
    sign: "S A N A M",
    kicker: "udit narayan · pehla nasha forever",
    tagline: "First love, second-hand bicycle, one voice that never aged.",
    gateTitle: "Dil deewana ho gaya",
    gateCopy:
      "Sunset on the terrace, a red rose pressed inside a textbook, and the voice every 90s hero lip-synced to.",
    ogDesc: "Udit Narayan radio — the 90s romance king, from Pehla Nasha to Kuch Kuch Hota Hai.",
    glyph: "♥",
    fonts: {
      display: "Rozha One",
      body: "Mulish",
      href: "https://fonts.googleapis.com/css2?family=Mulish:wght@400;600&family=Rozha+One&display=swap"
    },
    tokens: {
      "--bg": "#1c0710",
      "--bg-gradient":
        "radial-gradient(85% 65% at 50% 108%, rgba(255,109,77,0.30), transparent 62%), radial-gradient(70% 50% at 50% 0%, rgba(255,93,115,0.10), transparent 60%)",
      "--surface": "rgba(40,13,24,0.8)",
      "--ink": "#fdeee6",
      "--ink-dim": "#bb8f97",
      "--accent": "#ff5d73",
      "--accent-2": "#ffb35c",
      "--on-accent": "#2a070f",
      "--line": "rgba(255,93,115,0.24)",
      "--sign-ink": "#ff5d73",
      "--sign-tracking": "0.08em",
      "--sign-shadow": "0 0 36px rgba(255,93,115,0.45)",
      "--card-radius": "12px",
      "--grain-opacity": "0.06"
    },
    scene: `
      <div class="sun" aria-hidden="true"></div>
      <svg class="bike" viewBox="0 0 260 150" aria-hidden="true">
        <g fill="none" stroke="#ff8d6b" stroke-width="4" stroke-linecap="round" opacity=".8">
          <circle cx="52" cy="108" r="34"/>
          <circle cx="208" cy="108" r="34"/>
          <path d="M52 108l44-56 54 0 26 56"/>
          <path d="M96 52l32 56h-76"/>
          <path d="M128 52l28 56"/>
          <path d="M156 52l-8-16h20"/>
          <path d="M186 108l-30-52"/>
          <path d="M196 84l16 4"/>
        </g>
        <g fill="#ff8d6b" opacity=".8">
          <circle cx="52" cy="108" r="5"/><circle cx="208" cy="108" r="5"/>
        </g>
      </svg>
      <div class="petals" aria-hidden="true">
        <b style="--x:10vw;--d:0s"></b><b style="--x:27vw;--d:3.2s"></b>
        <b style="--x:49vw;--d:1.6s"></b><b style="--x:68vw;--d:4.8s"></b>
        <b style="--x:86vw;--d:2.4s"></b>
      </div>`,
    css: `
      .sun{position:absolute;left:50%;bottom:-24vh;transform:translateX(-50%);
        width:min(560px,90vw);aspect-ratio:1;border-radius:50%;
        background:radial-gradient(circle,#ffb35ccc 0%,#ff5d7333 55%,transparent 72%);
        filter:blur(6px)}
      .bike{position:absolute;right:4vw;bottom:4vh;width:min(300px,40vw);opacity:.5;
        filter:drop-shadow(0 0 26px rgba(255,141,107,.25))}
      .petals b{position:absolute;top:-6vh;left:var(--x);width:11px;height:11px;
        border-radius:60% 0 60% 0;background:#ff5d7399;
        animation:petal 13s linear infinite;animation-delay:var(--d)}
      @keyframes petal{to{transform:translate(-26px,116vh) rotate(320deg);opacity:0}}
      @media(max-width:640px){.bike{opacity:.22}}`,
    /* Curated fallback for when the playlist breaks — the essentials,
       roughly in career order. */
    tracks: [
      ["Papa Kehte Hain", "Udit Narayan", 1988],
      ["Ae Mere Humsafar", "Udit Narayan, Alka Yagnik", 1988],
      ["Pehla Nasha", "Udit Narayan, Sadhana Sargam", 1992],
      ["Dhak Dhak Karne Laga", "Anuradha Paudwal, Udit Narayan", 1992],
      ["Jaadu Teri Nazar", "Udit Narayan", 1993],
      ["Tu Cheez Badi Hai Mast", "Udit Narayan, Kavita Krishnamurthy", 1994],
      ["Ho Gaya Hai Tujhko To Pyar Hai", "Udit Narayan, Lata Mangeshkar", 1995],
      ["Mehndi Laga Ke Rakhna", "Udit Narayan, Lata Mangeshkar", 1995],
      ["Ruk Ja O Dil Deewane", "Udit Narayan", 1995],
      ["Pardesi Pardesi", "Udit Narayan, Alka Yagnik", 1996],
      ["Kuch Kuch Hota Hai", "Udit Narayan, Alka Yagnik", 1998],
      ["Ladki Badi Anjani Hai", "Udit Narayan, Alka Yagnik", 1998],
      ["Chand Chhupa Badal Mein", "Udit Narayan, Alka Yagnik", 1999],
      ["Kaho Naa Pyaar Hai", "Udit Narayan, Alka Yagnik", 2000],
      ["Main Nikla Gaddi Leke", "Udit Narayan", 2001],
      ["Udja Kale Kawan", "Udit Narayan", 2001],
      ["Idhar Chala Main Udhar Chala", "Udit Narayan, Alka Yagnik", 2003],
      ["Main Yahaan Hoon", "Udit Narayan", 2004]
    ]
  },

  /* ================================================================ 2 */
  {
    slug: "sonu-nigam",
    // Bollywood Melodies — Sonu Nigam & Alka Yagnik Romantic Hit Songs, ~289 tracks
    ytPlaylist: "PLoN8qntcwH4itUYa8LT1H8YKGLhLYdtWd",
    kind: "artist",
    name: "Sonu Nigam",
    sign: "S I T A R A",
    kicker: "sonu nigam · border se kal ho naa ho tak",
    tagline: "The voice you played on the rooftop while the whole colony slept.",
    gateTitle: "Aankhein band karo",
    gateCopy:
      "Terrace cot, one thin blanket, a walkman balanced on your chest — and a voice that made even homesickness sound beautiful.",
    ogDesc: "Sonu Nigam radio — Sandese Aate Hain to Kal Ho Naa Ho, under one night sky.",
    glyph: "☾",
    fonts: {
      display: "Philosopher",
      body: "Manrope",
      href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600&family=Philosopher:wght@700&display=swap"
    },
    tokens: {
      "--bg": "#0a0e23",
      "--bg-gradient":
        "radial-gradient(75% 55% at 78% 6%, rgba(159,177,255,0.16), transparent 60%), radial-gradient(70% 55% at 15% 100%, rgba(255,207,135,0.10), transparent 65%)",
      "--surface": "rgba(14,19,42,0.8)",
      "--ink": "#e9edff",
      "--ink-dim": "#8b93bd",
      "--accent": "#ffcf87",
      "--accent-2": "#9fb1ff",
      "--on-accent": "#1c1504",
      "--line": "rgba(159,177,255,0.22)",
      "--sign-ink": "#cdd6ff",
      "--sign-tracking": "0.14em",
      "--sign-shadow": "0 0 30px rgba(159,177,255,0.5)",
      "--card-radius": "14px",
      "--grain-opacity": "0.05"
    },
    scene: `
      <svg class="moon" viewBox="0 0 160 160" aria-hidden="true">
        <mask id="bite"><rect width="160" height="160" fill="#fff"/>
          <circle cx="112" cy="58" r="52" fill="#000"/></mask>
        <circle cx="80" cy="80" r="56" fill="#cdd6ff" mask="url(#bite)" opacity=".9"/>
      </svg>
      <div class="stars" aria-hidden="true">
        <i style="--x:6vw;--y:12vh;--d:0s"></i><i style="--x:17vw;--y:28vh;--d:.9s"></i>
        <i style="--x:31vw;--y:9vh;--d:1.7s"></i><i style="--x:44vw;--y:22vh;--d:.4s"></i>
        <i style="--x:57vw;--y:7vh;--d:2.3s"></i><i style="--x:69vw;--y:31vh;--d:1.2s"></i>
        <i style="--x:83vw;--y:14vh;--d:.6s"></i><i style="--x:93vw;--y:26vh;--d:2s"></i>
        <i style="--x:12vw;--y:44vh;--d:2.8s"></i><i style="--x:51vw;--y:41vh;--d:1.5s"></i>
        <i style="--x:88vw;--y:48vh;--d:.2s"></i>
      </div>
      <svg class="shoot" viewBox="0 0 220 60" aria-hidden="true">
        <path d="M218 4L60 46" stroke="#e9edff" stroke-width="2" stroke-linecap="round"
              opacity=".7" stroke-dasharray="150 170"/>
        <circle cx="218" cy="4" r="3.4" fill="#ffcf87"/>
      </svg>
      <svg class="skyline" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 90V64h34V40h26v24h30V52h40V28h14V16h12v12h12v24h34v20h44V44h36V24h16v-8h12v8h14v20h30v28h48V58h40V36h28V20h12v16h16v22h34v14h46V48h30V30h18v-6h12v6h14v18h28v24h52V56h38V38h26v18h34v16h40z"
              fill="#05071a"/>
      </svg>`,
    css: `
      .moon{position:absolute;right:9vw;top:7vh;width:min(130px,20vw);opacity:.9;
        filter:drop-shadow(0 0 34px rgba(205,214,255,.45))}
      .stars i{position:absolute;left:var(--x);top:var(--y);width:3px;height:3px;
        border-radius:50%;background:#e9edff;
        box-shadow:0 0 8px 2px rgba(233,237,255,.5);
        animation:twinkle 3.4s ease-in-out infinite;animation-delay:var(--d)}
      @keyframes twinkle{0%,100%{opacity:.9}50%{opacity:.15}}
      .shoot{position:absolute;left:-240px;top:16vh;width:220px;
        animation:shooting 9s ease-in infinite}
      @keyframes shooting{
        0%,74%{transform:none;opacity:0}
        76%{opacity:1}
        88%{transform:translate(46vw,13vh);opacity:0}
        100%{transform:translate(46vw,13vh);opacity:0}}
      .skyline{position:absolute;left:0;right:0;bottom:0;width:100%;height:16vh;opacity:.9}`,
    tracks: [
      ["Sandese Aate Hain", "Sonu Nigam, Roop Kumar Rathod", 1997],
      ["Yeh Dil Deewana", "Sonu Nigam", 1997],
      ["Deewana Tera", "Sonu Nigam", 1999],
      ["Satrangi Re", "Sonu Nigam, Kavita Krishnamurthy", 1998],
      ["Suraj Hua Maddham", "Sonu Nigam, Alka Yagnik", 2001],
      ["Tanhayee", "Sonu Nigam", 2001],
      ["Saathiya", "Sonu Nigam", 2002],
      ["Kal Ho Naa Ho", "Sonu Nigam", 2003],
      ["Har Ghadi Badal Rahi Hai", "Sonu Nigam", 2003],
      ["Maahi Ve", "Sonu Nigam, Sadhana Sargam", 2003],
      ["Main Hoon Na", "Sonu Nigam", 2004],
      ["Do Pal", "Sonu Nigam, Lata Mangeshkar", 2004],
      ["Sau Dard", "Sonu Nigam", 2006],
      ["Kabhi Alvida Naa Kehna", "Sonu Nigam", 2006],
      ["In Lamhon Ke Daaman Mein", "Sonu Nigam, Madhushree", 2008],
      ["Guzarish", "Sonu Nigam, Javed Ali", 2008],
      ["Abhi Mujh Mein Kahin", "Sonu Nigam", 2012],
      ["Suno Na Sangemarmar", "Sonu Nigam", 2014]
    ]
  },

  /* ================================================================ 3 */
  {
    slug: "arijit-singh",
    // SH Rakib — Arijit Singh All Songs, ~521 tracks
    ytPlaylist: "PLizEqzsgQvPp8kTHGV9o6bjkz6t0TJtjm",
    kind: "artist",
    name: "Arijit Singh",
    sign: "R A A B T A",
    kicker: "arijit singh · late night · earphones in",
    tagline: "One unread chat, city rain, and a voice that reads it out loud.",
    gateTitle: "Do not disturb",
    gateCopy:
      "Phone face-down, earphones in, rain on the glass — the soundtrack of every feeling you never typed out.",
    ogDesc: "Arijit Singh radio — Tum Hi Ho to Kesariya, for late nights and unread chats.",
    glyph: "☂",
    fonts: {
      display: "Syne",
      body: "Outfit",
      href: "https://fonts.googleapis.com/css2?family=Outfit:wght@300;500&family=Syne:wght@700&display=swap"
    },
    tokens: {
      "--bg": "#06070d",
      "--bg-gradient":
        "radial-gradient(70% 50% at 50% 0%, rgba(143,123,255,0.14), transparent 60%), radial-gradient(60% 45% at 85% 90%, rgba(69,224,200,0.08), transparent 65%)",
      "--surface": "rgba(13,15,26,0.82)",
      "--ink": "#eaecf5",
      "--ink-dim": "#767c9c",
      "--accent": "#8f7bff",
      "--accent-2": "#45e0c8",
      "--on-accent": "#12081f",
      "--line": "rgba(143,123,255,0.24)",
      "--sign-ink": "#8f7bff",
      "--sign-tracking": "0.1em",
      "--sign-shadow": "0 0 30px rgba(143,123,255,0.6)",
      "--card-radius": "16px",
      "--art-radius": "10px",
      "--card-blur": "blur(6px)",
      "--grain-opacity": "0.05"
    },
    scene: `
      <div class="glass" aria-hidden="true"></div>
      <div class="rain" aria-hidden="true">
        <i style="--x:9vw;--d:0s;--s:2.6s"></i><i style="--x:21vw;--d:1.1s;--s:3.1s"></i>
        <i style="--x:34vw;--d:.5s;--s:2.4s"></i><i style="--x:47vw;--d:1.7s;--s:2.9s"></i>
        <i style="--x:61vw;--d:.9s;--s:3.3s"></i><i style="--x:74vw;--d:.2s;--s:2.5s"></i>
        <i style="--x:88vw;--d:1.4s;--s:3s"></i>
      </div>
      <div class="bokeh" aria-hidden="true">
        <b style="--x:14vw;--y:64vh;--c:#45e0c8"></b><b style="--x:29vw;--y:74vh;--c:#8f7bff"></b>
        <b style="--x:52vw;--y:68vh;--c:#ff7bac"></b><b style="--x:67vw;--y:78vh;--c:#45e0c8"></b>
        <b style="--x:84vw;--y:62vh;--c:#8f7bff"></b>
      </div>`,
    css: `
      .glass{position:absolute;inset:0;
        background:repeating-linear-gradient(90deg,rgba(255,255,255,.012) 0 2px,transparent 2px 9px),
                   radial-gradient(120% 80% at 50% 110%, rgba(143,123,255,.07), transparent 60%)}
      .rain i{position:absolute;top:-12vh;left:calc(var(--x) + 2vw);width:1px;height:11vh;
        background:linear-gradient(180deg,transparent,rgba(143,123,255,.55));
        animation:drip var(--s) cubic-bezier(.4,.1,.6,.9) infinite;animation-delay:var(--d)}
      @keyframes drip{
        0%{transform:translateY(0);opacity:0}
        12%{opacity:1}
        82%{transform:translateY(96vh);opacity:1}
        100%{transform:translateY(104vh);opacity:0}}
      .bokeh b{position:absolute;left:var(--x);top:var(--y);width:26px;height:26px;
        border-radius:50%;background:var(--c);opacity:.14;filter:blur(7px)}
      .bokeh b:nth-child(even){width:16px;height:16px}`,
    tracks: [
      ["Phir Mohabbat", "Arijit Singh, Mithoon", 2011],
      ["Duaa", "Arijit Singh, Nandini Srikar", 2012],
      ["Raabta", "Arijit Singh, Hamsika Iyer", 2012],
      ["Tum Hi Ho", "Arijit Singh", 2013],
      ["Chahun Main Ya Naa", "Arijit Singh, Palak Muchhal", 2013],
      ["Ilahi", "Arijit Singh", 2013],
      ["Muskurane", "Arijit Singh", 2014],
      ["Samjhawan", "Arijit Singh, Shreya Ghoshal", 2014],
      ["Manwa Laage", "Arijit Singh, Shreya Ghoshal", 2014],
      ["Sooraj Dooba Hain", "Arijit Singh, Aditi Singh Sharma", 2015],
      ["Gerua", "Arijit Singh, Antara Mitra", 2015],
      ["Janam Janam", "Arijit Singh, Antara Mitra", 2015],
      ["Ae Dil Hai Mushkil", "Arijit Singh", 2016],
      ["Channa Mereya", "Arijit Singh", 2016],
      ["Enna Sona", "Arijit Singh, Shreya Ghoshal", 2017],
      ["Zaalima", "Arijit Singh, Harshdeep Kaur", 2017],
      ["Hawayein", "Arijit Singh", 2017],
      ["Tera Yaar Hoon Main", "Arijit Singh", 2018],
      ["Khairiyat", "Arijit Singh", 2019],
      ["Kesariya", "Arijit Singh", 2022]
    ]
  },

  /* ================================================================ 4 */
  {
    slug: "kumar-sanu",
    // Tips Official — Kumar Sanu 90's Hits | Romantic Love Songs | Hindi Hits, ~2415 tracks
    ytPlaylist: "PLinVjP-aRmluiFicvkJtzUsm18L556cpK",
    kind: "artist",
    name: "Kumar Sanu",
    sign: "A A S H I Q U I",
    kicker: "kumar sanu · the melody king",
    tagline: "Side A of a tape bought in 1990, still holding its pitch.",
    gateTitle: "Rewind karo",
    gateCopy:
      "A pencil to wind the tape, a lamp with an orange shade, and the most nasal, most beloved voice the 90s ever produced.",
    ogDesc: "Kumar Sanu radio — Aashiqui, Baazigar, Pardes — cassette-era melody king.",
    glyph: "♪",
    fonts: {
      display: "Limelight",
      body: "Jost",
      href: "https://fonts.googleapis.com/css2?family=Jost:wght@300;500&family=Limelight&display=swap"
    },
    tokens: {
      "--bg": "#17100a",
      "--bg-gradient":
        "radial-gradient(75% 55% at 50% 110%, rgba(227,176,75,0.20), transparent 62%), radial-gradient(60% 45% at 12% 0%, rgba(201,111,74,0.12), transparent 60%)",
      "--surface": "rgba(34,24,14,0.82)",
      "--ink": "#f5ead8",
      "--ink-dim": "#a8917a",
      "--accent": "#e3b04b",
      "--accent-2": "#c96f4a",
      "--on-accent": "#201204",
      "--line": "rgba(227,176,75,0.24)",
      "--sign-ink": "#e3b04b",
      "--sign-tracking": "0.12em",
      "--sign-shadow": "0 0 34px rgba(227,176,75,0.4)",
      "--card-radius": "4px",
      "--card-border": "1px solid rgba(227,176,75,0.26)",
      "--grain-opacity": "0.07"
    },
    scene: `
      <svg class="vinyl" viewBox="0 0 360 360" aria-hidden="true">
        <g class="spin">
          <circle cx="180" cy="180" r="168" fill="#0d0906" stroke="#e3b04b44" stroke-width="2"/>
          <g fill="none" stroke="#e3b04b" opacity=".16">
            <circle cx="180" cy="180" r="152"/><circle cx="180" cy="180" r="140"/>
            <circle cx="180" cy="180" r="128"/><circle cx="180" cy="180" r="116"/>
            <circle cx="180" cy="180" r="104"/>
          </g>
          <circle cx="180" cy="180" r="52" fill="#c96f4a" stroke="#e3b04b66" stroke-width="2"/>
          <circle cx="180" cy="180" r="6" fill="#17100a" stroke="#e3b04b88"/>
          <path d="M180 132a48 48 0 0 1 44 66" stroke="#f5ead8" stroke-width="3" fill="none" opacity=".35"/>
        </g>
      </svg>
      <div class="glow" aria-hidden="true"></div>
      <div class="motes" aria-hidden="true">
        <b style="--x:12vw;--d:0s"></b><b style="--x:31vw;--d:4.2s"></b>
        <b style="--x:58vw;--d:2.1s"></b><b style="--x:79vw;--d:6s"></b>
        <b style="--x:91vw;--d:3.4s"></b>
      </div>`,
    css: `
      .vinyl{position:absolute;left:50%;bottom:-34vh;transform:translateX(-50%);
        width:min(620px,96vw);opacity:.85;filter:drop-shadow(0 0 40px rgba(227,176,75,.18))}
      .spin{transform-box:fill-box;transform-origin:center;animation:spin 14s linear infinite}
      @keyframes spin{to{transform:rotate(360deg)}}
      .glow{position:absolute;left:8vw;top:10vh;width:120px;height:120px;border-radius:50%;
        background:radial-gradient(circle,#e3b04b55,transparent 70%);filter:blur(14px)}
      .motes b{position:absolute;bottom:-4vh;left:var(--x);width:5px;height:5px;border-radius:50%;
        background:#e3b04b66;animation:mote 12s linear infinite;animation-delay:var(--d)}
      @keyframes mote{to{transform:translate(-14px,-114vh);opacity:0}}
      @media(max-width:640px){.vinyl{bottom:-40vh}}`,
    tracks: [
      ["Ab Tere Bin Ji Lenge Hum", "Kumar Sanu", 1990],
      ["Dheere Dheere Se Meri Zindagi", "Kumar Sanu, Anuradha Paudwal", 1990],
      ["Bas Ek Sanam Chahiye", "Kumar Sanu", 1990],
      ["Saanson Ki Zaroorat Hai Jaise", "Kumar Sanu", 1990],
      ["Mera Dil Bhi Kitna Pagal Hai", "Kumar Sanu, Alka Yagnik", 1991],
      ["Dil Hai Ke Manta Nahin", "Kumar Sanu, Anuradha Paudwal", 1991],
      ["Sochenge Tumhe Pyar", "Kumar Sanu", 1992],
      ["Aisi Deewangi", "Kumar Sanu, Vinod Rathod", 1992],
      ["Wada Raha Sanam", "Kumar Sanu", 1992],
      ["Baazigar O Baazigar", "Kumar Sanu, Alka Yagnik", 1993],
      ["Yeh Kaali Kaali Aankhein", "Kumar Sanu", 1993],
      ["Kitabein Bahut Si", "Kumar Sanu, Asha Bhosle", 1993],
      ["Chura Ke Dil Mera", "Kumar Sanu, Alka Yagnik", 1994],
      ["Ek Ladki Ko Dekha", "Kumar Sanu", 1994],
      ["Kuch Na Kaho", "Kumar Sanu", 1994],
      ["Bahon Ke Darmiyan", "Kumar Sanu, Kavita Krishnamurthy", 1996],
      ["Do Dil Mil Rahe Hain", "Kumar Sanu", 1997],
      ["Meri Mehbooba", "Kumar Sanu, Alka Yagnik", 1997],
      ["Ek Din Aap Yun Humko Mil Jayenge", "Kumar Sanu, Alka Yagnik", 1997],
      ["Tumhe Jo Maine Dekha", "Kumar Sanu", 2004]
    ]
  }
];
