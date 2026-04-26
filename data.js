const defaultSite = {
  settings: {
    siteName: "Psicologa Taurino Licia",
    logoText: "LT",
    profession: "Psicologa",
    primaryColor: "#7BA58D",
    secondaryColor: "#DDB892",
    accentColor: "#2F3E3A",
    backgroundColor: "#FBF7F1",
    cardColor: "#FFFFFF",
    textColor: "#26322F",
    mutedColor: "#60706B",
    fontFamily: "Inter",
    headingFont: "Playfair Display",
    titleSize: 62,
    sectionTitleSize: 42,
    textSize: 17,
    menuSize: 15,
    radius: 28,
    containerWidth: 1180,
    sectionSpacing: 88,
    alignment: "left",
    menuPosition: "center",
    buttonRadius: 999,
    whatsapp: "393925229478",
    phone: "+39 392 522 9478",
    email: "info@psicologataurinolicia.it",
    instagram: "liciataurino.psicologa",
    instagramUrl: "https://www.instagram.com/liciataurino.psicologa/",
    address: "Inserisci indirizzo studio",
    city: "Leverano / Lecce",
    albo: "Iscrizione nr. 8233",
    piva: "P.IVA da inserire",
    footerText: "Privacy Policy · Cookie Policy",
    whatsappMessage: "Buongiorno Dott.ssa Taurino, vorrei ricevere informazioni per prenotare un primo colloquio."
  },

  nav: [
    { label: "Home", href: "#home", visible: true },
    { label: "Genitori", href: "#genitori", visible: true },
    { label: "Servizi", href: "#servizi", visible: true },
    { label: "BES e DSA", href: "#bes", visible: true },
    { label: "Stimolazione cognitiva", href: "#stimolazione", visible: true },
    { label: "Chi sono", href: "#chi-sono", visible: true },
    { label: "Contatti", href: "#contatti", visible: true }
  ],

  sectionOrder: ["parents", "services", "bes", "cognitive", "about", "process", "articles", "contact", "bootcamps"],

  hero: {
    visible: true,
    layout: "text-left",
    eyebrow: "Studio psicologico · Bambini · Ragazzi · Genitori",
    title: "Un aiuto concreto per bambini, ragazzi e genitori.",
    subtitle: "Uno spazio sicuro in cui ogni genitore può trovare ascolto, orientamento e strumenti pratici per comprendere meglio il proprio figlio e accompagnarlo nelle difficoltà emotive, scolastiche e relazionali.",
    primaryButton: "Parla con la Dott.ssa",
    secondaryButton: "Percorsi per tuo figlio",
    image: "/img/licia-taurino.jpg",
    imagePosition: "center top",
    badgeTop: "Studio Psicologico",
    badgeBottom: "Bambini · Ragazzi · Genitori"
  },

  parents: {
    visible: true,
    layout: "split-cards",
    eyebrow: "Per i genitori",
    title: "Quando chiedere aiuto per tuo figlio?",
    text: "Non serve aspettare che una difficoltà diventi grande. Un confronto con una professionista può aiutare a leggere i segnali, capire cosa sta succedendo e scegliere il percorso più adatto.",
    items: [
      { title: "Difficoltà a scuola", text: "Calo del rendimento, poca concentrazione, rifiuto della scuola, ansia da prestazione o fatica nello studio." },
      { title: "Emozioni difficili", text: "Pianti frequenti, rabbia, paure, chiusura, insicurezza o difficoltà a raccontare ciò che prova." },
      { title: "Relazioni e comportamento", text: "Difficoltà con coetanei, oppositività, gelosia, cambiamenti improvvisi o fatica nel rispetto delle regole." },
      { title: "Dubbi dei genitori", text: "Quando non sai se preoccuparti, da dove iniziare o come aiutare tuo figlio nel modo giusto." }
    ],
    ctaTitle: "Un primo colloquio può aiutarti a fare chiarezza.",
    ctaText: "Racconta la situazione e valuta con la Dott.ssa il percorso più indicato.",
    ctaButton: "Richiedi informazioni"
  },

  services: {
    visible: true,
    layout: "grid-4",
    eyebrow: "Aree di intervento",
    title: "Percorsi pensati per ogni fase della vita.",
    text: "Quando un bambino o un ragazzo vive una difficoltà, anche il genitore ha bisogno di essere guidato. Ogni percorso nasce dall’ascolto della famiglia e dalla comprensione del bisogno reale.",
    items: [
      { title: "Età evolutiva", text: "Supporto per bambini e ragazzi che vivono difficoltà emotive, comportamentali, scolastiche o relazionali." },
      { title: "BES, DSA e scuola", text: "Consulenza per bisogni educativi speciali, difficoltà di apprendimento e collaborazione tra famiglia e scuola." },
      { title: "Sostegno genitoriale", text: "Uno spazio di ascolto e orientamento per comprendere meglio i bisogni dei figli e gestire le fatiche educative." },
      { title: "Benessere psicologico", text: "Colloqui individuali per affrontare ansia, stress, cambiamenti, fragilità emotive e momenti delicati della vita." }
    ]
  },

  bes: {
    visible: true,
    layout: "dark-split",
    eyebrow: "BES e DSA",
    title: "Supporto psicologico e scolastico per comprendere le difficoltà.",
    text: "I Bisogni Educativi Speciali indicano la necessità di risposte educative attente e personalizzate. Il lavoro psicologico aiuta famiglia e scuola a leggere meglio i bisogni del bambino o del ragazzo.",
    items: [
      "Bisogni Educativi Speciali",
      "Disturbi Specifici dell’Apprendimento",
      "Difficoltà scolastiche",
      "Gestione delle emozioni",
      "Autostima e relazioni",
      "Supporto alla famiglia"
    ]
  },

  cognitive: {
    visible: true,
    layout: "grid-3",
    eyebrow: "Neuropsicologia e stimolazione cognitiva",
    title: "Stimolazione cognitiva per l’invecchiamento patologico.",
    text: "Percorsi pensati per sostenere le funzioni cognitive, favorire il mantenimento delle autonomie e accompagnare la persona e la famiglia nelle diverse fasi dell’invecchiamento patologico.",
    items: [
      { title: "Esordio acuto", text: "Supporto e stimolazione dopo eventi improvvisi come ictus, ischemia o altre condizioni neurologiche che possono modificare memoria, attenzione, linguaggio e autonomie quotidiane." },
      { title: "Esordio subdolo", text: "Interventi rivolti a quadri progressivi come demenze, decadimento cognitivo e difficoltà che emergono gradualmente nel tempo." },
      { title: "Piano personalizzato", text: "Attività strutturate in base ai bisogni della persona, alla storia clinica, alle risorse residue e al coinvolgimento dei familiari." }
    ]
  },

  about: {
    visible: true,
    layout: "photo-left",
    eyebrow: "Chi sono",
    title: "Dott.ssa Licia Taurino",
    text: "Psicologa iscritta all’Albo, si occupa di supporto psicologico, consulenza e percorsi di stimolazione cognitiva. Il suo lavoro è orientato all’ascolto della persona, alla comprensione del bisogno e alla costruzione di interventi personalizzati.",
    image: "/img/licia-taurino.jpg",
    imagePosition: "center top",
    name: "LICIA TAURINO",
    subtitle: "Psicologa",
    alboText: "Iscrizione nr. 8233"
  },

  bootcamps: {
    visible: false,
    layout: "poster-grid",
    eyebrow: "Laboratori e boot camp",
    title: "Esperienze pensate per bambini e ragazzi.",
    text: "Durante l’anno possono essere organizzati boot camp e laboratori dedicati a bambini e ragazzi, ad esempio in estate, a Natale o a Pasqua. In questa sezione puoi inserire locandine, date e informazioni utili.",
    items: [
      { title: "Boot camp estivo", period: "Estate", text: "Laboratorio dedicato a emozioni, relazione, autostima e strategie per affrontare le piccole grandi sfide quotidiane.", image: "" },
      { title: "Laboratorio di Natale", period: "Natale", text: "Attività in piccolo gruppo per favorire socializzazione, creatività e benessere emotivo durante le vacanze.", image: "" },
      { title: "Laboratorio di Pasqua", period: "Pasqua", text: "Percorso breve e mirato con attività psicologiche ed educative pensate per bambini e ragazzi.", image: "" }
    ]
  },

  process: {
    visible: true,
    layout: "steps-right",
    eyebrow: "Primo colloquio",
    title: "Come funziona il primo incontro?",
    text: "Il primo colloquio serve a comprendere la richiesta, raccogliere le informazioni principali e individuare il percorso più adatto.",
    items: [
      "Accoglienza della richiesta e ascolto senza giudizio",
      "Analisi delle difficoltà emotive, scolastiche o relazionali",
      "Definizione degli obiettivi del percorso",
      "Collaborazione con famiglia, scuola e figure educative quando necessario"
    ]
  },

  articles: {
    visible: true,
    layout: "grid-3",
    eyebrow: "Articoli e approfondimenti",
    title: "Uno spazio per informarsi con parole semplici.",
    text: "Approfondimenti dedicati a BES, DSA, genitorialità, emozioni, adolescenza e benessere psicologico.",
    items: [
      { title: "I Bisogni Educativi Speciali: cosa sono", text: "Una guida chiara per genitori e insegnanti, con spiegazioni semplici e indicazioni pratiche." },
      { title: "DSA e scuola: il ruolo della famiglia", text: "Come accompagnare bambini e ragazzi nel percorso scolastico con strumenti adeguati." },
      { title: "Emozioni nei bambini", text: "Riconoscere, nominare e gestire le emozioni nella quotidianità." }
    ]
  },

  contact: {
    visible: true,
    layout: "cards",
    eyebrow: "Contatti",
    title: "Prenota un primo colloquio.",
    text: "Scegli il canale che preferisci per richiedere informazioni o fissare un primo colloquio."
  },

  visualStyles: {},
  labels: {
    phone: "Telefono",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    email: "Email",
    studio: "Studio"
  }
};

module.exports = { defaultSite };
