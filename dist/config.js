/* ============================================================
   ROYAL WEDDING INVITE — CLIENT CONFIG
   Everything a new client needs changed lives in this file.
   Edit, save, done. No other file needs touching.
   ============================================================ */
window.WEDDING_CONFIG = {

  couple: {
    groom: "Pavan",
    bride: "Pooja",
    groomFull: "Pavan",
    brideFull: "Pooja",
    monogram: "P.P",              // shown in the wax seal + header
    tagline: "Two souls, one sacred fire",
  },

  // Main wedding moment — drives the live countdown
  wedding: {
    dateISO: "2026-11-21T19:15:00+05:30",   // muhurat time
    dateDisplay: "Saturday, 21 November 2026",
    muhurat: "Phere / Hast Milap · 7:15 PM",
  },

  // The celebrations — rendered in order
  events: [
    {
      id: "carnival",
      name: "Carnival",
      icon: "haldi",                    // haldi | sangeet | wedding | reception
      date: "Friday, 20 Nov 2026",
      time: "2:00 PM",
      venue: "Fairfield by Marriott",
      line: "Colour, laughter and a joyful afternoon together",
      accent: "#D99A2B",
    },
    {
      id: "dj-night",
      name: "Sangeet / Live Music",
      icon: "sangeet",
      date: "Friday, 20 Nov 2026",
      time: "7:00 PM",
      venue: "Fairfield by Marriott",
      line: "Music, dancing and a night to remember",
      accent: "#5B3A8E",
    },
    {
      id: "baarat",
      name: "Baarat",
      icon: "reception",
      date: "Saturday, 21 Nov 2026",
      time: "10:00 AM",
      venue: "Fairfield by Marriott",
      line: "Join the joyous procession and the groom’s grand arrival",
      accent: "#B08A3E",
    },
    {
      id: "varmala",
      name: "Varmala",
      icon: "wedding",
      date: "Saturday, 21 Nov 2026",
      time: "11:00 AM",
      venue: "Fairfield by Marriott",
      line: "A beautiful exchange of garlands and promises",
      accent: "#D06A78",
    },
    {
      id: "phere",
      name: "Phere / Hast Milap",
      icon: "wedding",
      date: "Saturday, 21 Nov 2026",
      time: "7:15 PM",
      venue: "Fairfield by Marriott",
      line: "Seven sacred vows around the ceremonial fire",
      accent: "#7A1F3D",
    },
  ],

  venue: {
    name: "Fairfield by Marriott",
    address: "Gogte Plaza, Belagavi - 591113",
    // What gets searched when a guest taps "Open in Maps"
    mapsQuery: "Fairfield by Marriott, Gogte Plaza, Belagavi - 591113",
    mapsUrl: "https://maps.app.goo.gl/xFVpkWu4EctdBw7t5",
  },

  // Theme — the royal palette (matches the origami film)
  theme: {
    maroon:  "#6D1A33",
    maroonDeep: "#4A0F22",
    gold:    "#C9A24B",
    goldSoft:"#E5C878",
    ivory:   "#F4EBDB",
    inkOnIvory: "#3A2230",
  },

  frames: {
    count: 181,                 // scrub frames per tier
    loPath: "assets/frames/lo/",
    hiPath: "assets/frames/hi/",
    prefix: "f_",               // f_001.webp … f_181.webp
    ext: ".webp",
  },

  // The Hidden Moment — scroll-driven film
  sanctum: {
    count: 121,
    path: "assets/frames2/",
    prefix: "s_",               // s_001.webp … s_121.webp
    ext: ".webp",
    heading: "The Hidden Moment",
    eyebrow: "A sacred moment awaits",
    hint: "Scroll gently to unfold this hidden moment",
    veilText: "A sacred moment awaits",
  },
};
