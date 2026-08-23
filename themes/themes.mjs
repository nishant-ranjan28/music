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
  },

  /* ================================================================ 5 */
  {
    slug: "himesh-reshammiya",
    // H K — HIMESH RESHAMMIYA SONGS, ~173 tracks
    ytPlaylist: "PLEOiStG7CxDKEx0W4AMsDlEDk2qrlns0I",
    kind: "artist",
    name: "Himesh Reshammiya",
    sign: "S U R R O O R",
    kicker: "himesh reshammiya · cap · high note",
    tagline: "One cap, one nasal high note, a thousand ringtone hits.",
    gateTitle: "Jhalak dikhla ja",
    gateCopy:
      "Stage lights, a leather jacket, and the highest-pitched heartbreak 2006 ever produced.",
    ogDesc: "Himesh Reshammiya radio — Aashiq Banaya to Teri Meri, pure 2000s surroor.",
    glyph: "♫",
    fonts: {
      display: "Russo One",
      body: "Hind",
      href: "https://fonts.googleapis.com/css2?family=Hind:wght@400;600&family=Russo+One&display=swap"
    },
    tokens: {
      "--bg": "#120608",
      "--bg-gradient":
        "radial-gradient(75% 55% at 50% 0%, rgba(255,45,85,0.16), transparent 60%), radial-gradient(60% 45% at 50% 110%, rgba(201,209,224,0.08), transparent 65%)",
      "--surface": "rgba(38,10,16,0.82)",
      "--ink": "#fdece8",
      "--ink-dim": "#b08a90",
      "--accent": "#ff2d55",
      "--accent-2": "#c9d1e0",
      "--on-accent": "#240409",
      "--line": "rgba(255,45,85,0.24)",
      "--sign-ink": "#ff2d55",
      "--sign-tracking": "0.08em",
      "--sign-shadow": "0 0 32px rgba(255,45,85,0.5)",
      "--card-radius": "12px",
      "--grain-opacity": "0.06"
    },
    scene: `
      <div class="beam b1" aria-hidden="true"></div>
      <div class="beam b2" aria-hidden="true"></div>
      <div class="sparks" aria-hidden="true">
        <b style="--x:14vw;--d:0s"></b><b style="--x:32vw;--d:2.2s"></b>
        <b style="--x:58vw;--d:1.1s"></b><b style="--x:79vw;--d:3.4s"></b>
        <b style="--x:91vw;--d:1.8s"></b>
      </div>`,
    css: `
      .beam{position:absolute;top:-10vh;width:18vw;height:60vh;opacity:.18;filter:blur(12px)}
      .beam.b1{left:18vw;transform:rotate(14deg);background:linear-gradient(180deg,rgba(255,45,85,.9),transparent 70%)}
      .beam.b2{right:18vw;transform:rotate(-14deg);background:linear-gradient(180deg,rgba(201,209,224,.7),transparent 70%)}
      .sparks b{position:absolute;bottom:-4vh;left:var(--x);width:6px;height:6px;border-radius:50%;background:#ff2d5588;animation:spark 11s linear infinite;animation-delay:var(--d)}
      @keyframes spark{to{transform:translate(-18px,-114vh);opacity:0}}`,
    tracks: [
      ["Aashiq Banaya Aapne", "Himesh Reshammiya, Shreya Ghoshal", 2005],
      ["Jhalak Dikhla Ja", "Himesh Reshammiya", 2006],
      ["Tera Surroor", "Himesh Reshammiya", 2006],
      ["Afsana", "Himesh Reshammiya", 2006],
      ["Naam Hai Tera", "Himesh Reshammiya", 2006],
      ["Tum Saanson Mein", "Himesh Reshammiya, Tulsi Kumar", 2007],
      ["Soniye", "Himesh Reshammiya", 2006],
      ["Main Jahan Rahoon", "Himesh Reshammiya", 2007],
      ["Teri Meri", "Himesh Reshammiya, Shreya Ghoshal", 2011],
      ["Hookah Bar", "Himesh Reshammiya, Vineet Singh, Aman Trikha", 2012],
      ["Long Drive", "Himesh Reshammiya", 2012],
      ["Balma", "Himesh Reshammiya, Shreya Ghoshal", 2012],
      ["Chalao Na Naino Se", "Himesh Reshammiya, Shreya Ghoshal", 2012],
      ["Jumme Ki Raat", "Himesh Reshammiya, Palak Muchhal", 2014],
      ["Tu Hi Tu", "Himesh Reshammiya", 2014],
      ["Ice Cream Khaungi", "Himesh Reshammiya, Palak Muchhal", 2014],
      ["Hangover", "Himesh Reshammiya, Shreya Ghoshal", 2014],
      ["Dard Dilo Ke", "Himesh Reshammiya", 2014]
    ]
  },

  /* ================================================================ 6 */
  {
    slug: "bhajan",
    // Kesri Divine — मंत्र | चालीसा | आरती | Mantra Collection | Chalisa | Aarti , ~126 tracks
    ytPlaylist: "PLNfE7hS9WuZUOBZgQIL-X8R-Jy1kXIjWY",
    kind: "genre",
    maxSeconds: 3600,
    name: "Bhajan",
    sign: "B H A J A N",
    kicker: "chalisa · aarti · dhun",
    tagline: "Evening aarti, the Chalisa, and whatever plays after.",
    gateTitle: "Deepak jala dijiye",
    gateCopy:
      "A lamp lit at dusk, an agarbatti burning down, and the same cassette of bhajans the house has played every evening for thirty years.",
    ogDesc: "Bhajan radio — Hanuman Chalisa, Shiv Tandav, aartis and stotrams, one after another.",
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
      ["Hanuman Chalisa", "Hariharan"],
      ["Shiv Tandav Stotram", "Traditional"],
      ["Om Jai Jagdish Hare", "Traditional"],
      ["Sukhkarta Dukhharta", "Traditional"],
      ["Jai Ambe Gauri", "Traditional"],
      ["Om Jai Shiv Omkara", "Traditional"],
      ["Aarti Kunj Bihari Ki", "Traditional"],
      ["Achyutam Keshavam", "Traditional"],
      ["Shri Ram Chandra Kripalu", "Traditional (Tulsidas)"],
      ["Raghupati Raghav Raja Ram", "Traditional"],
      ["Gayatri Mantra", "Anuradha Paudwal"],
      ["Mahamrityunjaya Mantra", "Traditional"],
      ["Man Tarpat Hari Darshan Ko Aaj", "Mohammed Rafi", 1952],
      ["Itni Shakti Hamein Dena Data", "Sushma Shreshtha, Pushpa Pagdhare", 1983],
      ["Ae Malik Tere Bande Hum", "Vani Jairam", 1957],
      ["Tu Pyar Ka Sagar Hai", "Manna Dey", 1959]
    ]
  },

  /* ================================================================ 7 */
  {
    slug: "chhath-puja",
    // T-Series Bhakti Sagar — Sharda Sinha Chhath Pooja Geet, ~56 tracks
    ytPlaylist: "PLyXHXSHxLqKy7hxvVopat1bvXLiyZS4Ga",
    kind: "place",
    name: "Chhath",
    sign: "C H H A T H",
    kicker: "soop · thekua · arghya to the sun",
    tagline: "Waist-deep in the river, offering the last light to the sun.",
    gateTitle: "Suraj ko arghya",
    gateCopy:
      "Standing at the ghat as the sun goes down, a bamboo soop of thekua held steady, water still warm from the day.",
    ogDesc: "Chhath Puja radio — geet for the setting and rising sun, straight from the ghat.",
    glyph: "☀",
    fonts: {
      display: "Yatra One",
      body: "Hind",
      href: "https://fonts.googleapis.com/css2?family=Hind:wght@400;600&family=Yatra+One&display=swap"
    },
    tokens: {
      "--bg": "#150c05",
      "--bg-gradient":
        "radial-gradient(80% 50% at 50% 98%, rgba(255,140,26,0.32), transparent 62%), radial-gradient(60% 40% at 20% 0%, rgba(88,196,176,0.08), transparent 60%)",
      "--surface": "rgba(37,22,10,0.8)",
      "--ink": "#fdf1dd",
      "--ink-dim": "#b39472",
      "--accent": "#ff8c1a",
      "--accent-2": "#58c4b0",
      "--on-accent": "#1f1002",
      "--line": "rgba(255,140,26,0.24)",
      "--sign-ink": "#ff8c1a",
      "--sign-tracking": "0.08em",
      "--sign-shadow": "0 0 32px rgba(255,140,26,0.45)",
      "--card-radius": "8px",
      "--grain-opacity": "0.06"
    },
    scene: `
      <div class="ghat-sun" aria-hidden="true"></div>
      <div class="horizon" aria-hidden="true"></div>
      <div class="water-shimmer" aria-hidden="true"></div>
      <div class="diyas" aria-hidden="true">
        <b style="--x:18vw;--d:0s"></b><b style="--x:36vw;--d:2.8s"></b>
        <b style="--x:54vw;--d:1.4s"></b><b style="--x:72vw;--d:4.2s"></b>
        <b style="--x:86vw;--d:5.6s"></b>
      </div>`,
    css: `
      .ghat-sun{position:absolute;left:50%;bottom:14vh;transform:translateX(-50%);
        width:min(420px,72vw);aspect-ratio:1;border-radius:50%;
        background:radial-gradient(circle at 50% 38%,#ffcf7a 0%,#ff8c1a 42%,#e65a1a 68%,transparent 72%);
        filter:blur(1px);opacity:.9}
      .horizon{position:absolute;left:0;right:0;bottom:14vh;height:2px;background:linear-gradient(90deg,transparent,#ff8c1a88,transparent)}
      .water-shimmer{position:absolute;left:0;right:0;bottom:0;height:14vh;
        background:repeating-linear-gradient(90deg,rgba(88,196,176,.07) 0 2px,transparent 2px 18px),
                   linear-gradient(180deg,rgba(255,140,26,.12),transparent 70%);
        mask-image:linear-gradient(180deg,transparent,black 32%)}
      .diyas b{position:absolute;bottom:3vh;left:var(--x);width:7px;height:7px;border-radius:50%;
        background:#ffcf7a;box-shadow:0 0 14px 4px rgba(255,207,122,.6);
        animation:drift 18s linear infinite;animation-delay:var(--d)}
      @keyframes drift{to{transform:translate(22px,-6vh);opacity:0}}`,
    tracks: [
      ["Kelwa Ke Paat Par", "Sharda Sinha"],
      ["Pahile Pahil", "Sharda Sinha"],
      ["Bahangi Laga Ke", "Sharda Sinha"],
      ["Supawo Naa Mile Maahi", "Sharda Sinha"],
      ["Uga Hai Suraj Dev", "Anuradha Paudwal"],
      ["Hey Chhathi Maiya", "Narendra Chanchal"],
      ["Saat Samundar Paar", "Pawan Singh"],
      ["Jai Chhathi Maiya", "Kalpana Patowary"]
    ]
  },

  /* ================================================================ 8 */
  {
    slug: "punjabi",
    // Ishtar Punjabi — 💖 Best Punjabi Love Songs 2025 | New Romantic Punjabi Hits , ~259 tracks
    ytPlaylist: "PLtzd6aavJNLgGx3tivZKYKHZQpfdi3Lw4",
    kind: "genre",
    name: "Punjabi",
    sign: "P U N J A B",
    kicker: "bhangra · sufi · full volume",
    tagline: "Sarson fields, a dhol that won't quit, swag inherited not bought.",
    gateTitle: "Balle balle",
    gateCopy:
      "Mustard fields blurring past the bus window and a cassette uncle swore was better than anything from Bombay.",
    ogDesc: "Punjabi radio — Daler to AP Dhillon, bhangra and sufi with the bass up.",
    glyph: "✺",
    fonts: {
      display: "Baloo Bhai 2",
      body: "Rubik",
      href: "https://fonts.googleapis.com/css2?family=Baloo+Bhai+2:wght@700&family=Rubik:wght@400;600&display=swap"
    },
    tokens: {
      "--bg": "#141003",
      "--bg-gradient":
        "radial-gradient(70% 50% at 15% 100%, rgba(255,201,60,0.16), transparent 60%), radial-gradient(60% 40% at 85% 10%, rgba(124,179,66,0.14), transparent 60%)",
      "--surface": "rgba(34,28,10,0.8)",
      "--ink": "#fdf7df",
      "--ink-dim": "#ab9f74",
      "--accent": "#ffc93c",
      "--accent-2": "#7cb342",
      "--on-accent": "#201802",
      "--line": "rgba(255,201,60,0.24)",
      "--sign-ink": "#ffc93c",
      "--sign-tracking": "0.08em",
      "--sign-shadow": "0 0 30px rgba(255,201,60,0.4)",
      "--card-radius": "14px",
      "--grain-opacity": "0.06"
    },
    scene: `
      <svg class="field" viewBox="0 0 800 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 80Q200 20 400 80T800 80V120H0z" fill="#7cb34233"/>
        <path d="M0 96Q200 44 400 96T800 96V120H0z" fill="#ffc93c22"/>
      </svg>
      <svg class="dhol" viewBox="0 0 200 110" aria-hidden="true">
        <ellipse cx="46" cy="55" rx="22" ry="42" fill="#ffc93c22" stroke="#ffc93c66" stroke-width="2"/>
        <ellipse cx="154" cy="55" rx="22" ry="42" fill="#ffc93c22" stroke="#ffc93c66" stroke-width="2"/>
        <rect x="46" y="14" width="108" height="82" fill="#7cb34218" stroke="#ffc93c44"/>
        <g stroke="#ffc93c33"><path d="M52 22l96 66"/><path d="M52 88l96-66"/></g>
      </svg>
      <div class="pollen" aria-hidden="true">
        <b style="--x:12vw;--d:0s"></b><b style="--x:31vw;--d:2s"></b>
        <b style="--x:58vw;--d:1s"></b><b style="--x:79vw;--d:3s"></b>
        <b style="--x:91vw;--d:1.6s"></b>
      </div>`,
    css: `
      .field{position:absolute;left:0;right:0;bottom:0;width:100%;height:18vh}
      .dhol{position:absolute;left:50%;bottom:2vh;transform:translateX(-50%);width:min(300px,48vw);opacity:.3}
      .pollen b{position:absolute;bottom:-4vh;left:var(--x);width:5px;height:5px;border-radius:50%;background:#ffc93c66;animation:pollen 12s linear infinite;animation-delay:var(--d)}
      @keyframes pollen{to{transform:translate(-14px,-114vh);opacity:0}}`,
    tracks: [
      ["Tunak Tunak Tun", "Daler Mehndi", 1998],
      ["Bolo Ta Ra Ra", "Daler Mehndi", 1995],
      ["Mundian To Bach Ke", "Panjabi MC", 1998],
      ["Gur Nalo Ishq Mitha", "Malkit Singh", 1998],
      ["Jugni", "Arif Lohar, Meesha Shafi", 2010],
      ["Ki Banu Duniya Da", "Gurdas Maan", 1987],
      ["3 Peg", "Sharry Mann", 2016],
      ["Suit Suit", "Guru Randhawa", 2017],
      ["High Rated Gabru", "Guru Randhawa", 2017],
      ["Lahore", "Guru Randhawa", 2018],
      ["Laembadgini", "Diljit Dosanjh", 2016],
      ["5 Taara", "Diljit Dosanjh", 2017],
      ["Proper Patola", "Diljit Dosanjh", 2013],
      ["Wakhra Swag", "Navraj Hans", 2015],
      ["Brown Munde", "AP Dhillon", 2020],
      ["Excuses", "AP Dhillon", 2020],
      ["Pasoori", "Ali Sethi, Shae Gill", 2022],
      ["Lehenga", "Jass Manak", 2019]
    ]
  },

  /* ================================================================ 9 */
  {
    slug: "bhojpuri",
    // Kishu Raj — Top 50 Bhojpuri songs 2025, ~144 tracks
    ytPlaylist: "PLGqUOt0CNckJib_vLMdgWzmIRd2X7dG5Z",
    kind: "genre",
    name: "Bhojpuri",
    sign: "B H O J P U R I",
    kicker: "pawan singh · khesari lal · nirahua",
    tagline: "Sequin disco, loud speakers, and songs your landlord also knows.",
    gateTitle: "Speaker baaja",
    gateCopy:
      "A wedding lawn at midnight, sequin curtain flashing pink, and the DJ playing the one song everybody demanded.",
    ogDesc: "Bhojpuri radio — Pawan Singh, Khesari Lal, Nirahua — loud and proud.",
    glyph: "★",
    fonts: {
      display: "Anton",
      body: "Hind",
      href: "https://fonts.googleapis.com/css2?family=Anton&family=Hind:wght@400;600&display=swap"
    },
    tokens: {
      "--bg": "#170309",
      "--bg-gradient":
        "radial-gradient(70% 50% at 50% 0%, rgba(255,61,110,0.16), transparent 60%), radial-gradient(60% 45% at 85% 100%, rgba(255,206,60,0.10), transparent 65%)",
      "--surface": "rgba(43,7,20,0.82)",
      "--ink": "#ffeef2",
      "--ink-dim": "#bb8296",
      "--accent": "#ff3d6e",
      "--accent-2": "#ffce3c",
      "--on-accent": "#26030c",
      "--line": "rgba(255,61,110,0.26)",
      "--sign-ink": "#ff3d6e",
      "--sign-tracking": "0.08em",
      "--sign-shadow": "0 0 30px rgba(255,61,110,0.45)",
      "--card-radius": "10px",
      "--grain-opacity": "0.06"
    },
    scene: `
      <div class="sequins" aria-hidden="true"></div>
      <div class="rays" aria-hidden="true"></div>
      <div class="glitter" aria-hidden="true">
        <b style="--x:10vw;--d:0s"></b><b style="--x:29vw;--d:1.6s"></b>
        <b style="--x:51vw;--d:.8s"></b><b style="--x:68vw;--d:2.4s"></b>
        <b style="--x:88vw;--d:1.2s"></b>
      </div>`,
    css: `
      .sequins{position:absolute;inset:0;opacity:.22;
        background:radial-gradient(circle 1.5px at 22px 22px, #ff3d6e88 1px, transparent 1.2px) 0 0/44px 44px}
      .rays{position:absolute;left:50%;top:-10vh;width:70vw;height:60vh;transform:translateX(-50%);
        background:conic-gradient(from 0deg at 50% 0%, transparent 0 18deg, rgba(255,61,110,.08) 18deg 36deg, transparent 36deg 54deg, rgba(255,206,60,.06) 54deg 72deg, transparent 72deg 90deg, rgba(255,61,110,.06) 90deg 108deg, transparent 108deg 126deg, rgba(255,206,60,.05) 126deg 144deg, transparent 144deg 360deg);
        animation:ray 28s linear infinite}
      @keyframes ray{to{transform:translateX(-50%) rotate(360deg)}}
      .glitter b{position:absolute;bottom:-4vh;left:var(--x);width:7px;height:7px;border-radius:50%;background:#ff3d6e66;animation:glitter 10s linear infinite;animation-delay:var(--d)}
      @keyframes glitter{to{transform:translate(-12px,-114vh);opacity:0}}`,
    tracks: [
      ["Lollipop Lagelu", "Dinesh Lal Yadav (Nirahua)", 2008],
      ["Chhalakata Hamro Jawaniya", "Pawan Singh", 2017],
      ["Hello Kaun", "Pawan Singh", 2018],
      ["Balam Ji Love You", "Pawan Singh", 2018],
      ["Kala Odhani", "Pawan Singh, Shilpi Raj", 2024],
      ["Lal Ghaghra", "Pawan Singh, Shilpi Raj", 2024],
      ["Rajaji Ke Dilwa", "Pawan Singh, Shivani Singh", 2024],
      ["Jila Top", "Khesari Lal Yadav", 2019],
      ["Palang Sagwan Ke", "Khesari Lal Yadav", 2021],
      ["Nathuniya", "Khesari Lal Yadav, Priyanka Singh", 2023],
      ["Lehenga Lucknowwa", "Khesari Lal Yadav", 2023],
      ["Payal", "Khesari Lal Yadav, Shilpi Raj", 2024],
      ["Pagli Dekhave Agarbatti", "Neelkamal Singh", 2024],
      ["Maja Milela Na Pura", "Neelkamal Singh", 2024],
      ["Saiyan Ji Dilwa Mangele Gamcha Bichai Ke", "Neelkamal Singh", 2022],
      ["Chulhi Me Jhok Di", "Shilpi Raj", 2024],
      ["Nadi Biche Naiya Dole", "Shilpi Raj, Rani", 2024],
      ["Saiyaan Ji Sarkave", "Shilpi Raj", 2022]
    ]
  }
];
