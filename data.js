const defaultSite = {
  settings: {
    siteName: "Psicologa Taurino Licia",
    logoText: "TL",
    primaryColor: "#7BA58D",
    secondaryColor: "#DDB892",
    accentColor: "#2F3E3A",
    backgroundColor: "#FBF7F1",
    textColor: "#26322F",
    fontFamily: "Inter",
    titleSize: 64,
    textSize: 18,
    radius: 28,
    alignment: "left",
    whatsapp: "393925229478",
    phone: "+39 392 522 9478",
    email: "info@psicologataurinolicia.it",
    address: "Inserisci indirizzo studio",
    city: "Leverano / Lecce",
    albo: "Iscrizione Albo da inserire",
    piva: "P.IVA da inserire",
    instagram: "liciataurino.psicologa",
    instagramUrl: "https://www.instagram.com/liciataurino.psicologa/"
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "Servizi", href: "#servizi" },
    { label: "BES e DSA", href: "#bes" },
    { label: "Stimolazione cognitiva", href: "#stimolazione" },
    { label: "Chi sono", href: "#chi-sono" },
    { label: "Contatti", href: "#contatti" }
  ],
  hero: {
    eyebrow: "Psicologia per bambini, ragazzi, adulti e famiglie",
    title: "Uno spazio sicuro per crescere, capirsi e ritrovare equilibrio.",
    subtitle: "La Dott.ssa Taurino Licia accompagna bambini, adolescenti, genitori e adulti in percorsi di ascolto, valutazione e sostegno psicologico, con un approccio accogliente, chiaro e personalizzato.",
    primaryButton: "Prenota un colloquio",
    secondaryButton: "Scopri i percorsi",
    image: "",
    visible: true
  },
  services: {
    visible: true,
    eyebrow: "Aree di intervento",
    title: "Percorsi pensati per ogni fase della vita.",
    items: [
      { title: "Età evolutiva", text: "Percorsi dedicati a bambini e ragazzi per difficoltà emotive, comportamentali, scolastiche e relazionali." },
      { title: "BES, DSA e scuola", text: "Consulenza e supporto per bisogni educativi speciali, difficoltà di apprendimento e collaborazione scuola-famiglia." },
      { title: "Sostegno genitoriale", text: "Uno spazio di ascolto per genitori che desiderano comprendere meglio i bisogni dei propri figli." },
      { title: "Benessere psicologico", text: "Colloqui individuali per affrontare ansia, stress, cambiamenti, fragilità emotive e momenti delicati della vita." }
    ]
  },
  bes: {
    visible: true,
    eyebrow: "BES e DSA",
    title: "Supporto psicologico e scolastico per comprendere le difficoltà.",
    text: "I Bisogni Educativi Speciali non sono una diagnosi, ma indicano la necessità di risposte educative attente e personalizzate. Il lavoro psicologico aiuta famiglia e scuola a leggere meglio i bisogni del bambino o del ragazzo.",
    items: ["Bisogni Educativi Speciali", "Disturbi Specifici dell’Apprendimento", "Difficoltà scolastiche", "Gestione delle emozioni", "Autostima e relazioni", "Supporto alla famiglia"]
  },
  cognitive: {
    visible: true,
    eyebrow: "Neuropsicologia e stimolazione cognitiva",
    title: "Stimolazione cognitiva per l’invecchiamento patologico.",
    text: "Percorsi pensati per sostenere le funzioni cognitive, favorire il mantenimento delle autonomie e accompagnare la persona e la famiglia nelle diverse fasi dell’invecchiamento patologico.",
    items: [
      { title: "Esordio acuto", text: "Supporto e stimolazione dopo eventi improvvisi come ictus, ischemia o altre condizioni neurologiche che possono modificare memoria, attenzione, linguaggio e autonomie quotidiane." },
      { title: "Esordio subdolo", text: "Interventi rivolti a quadri progressivi come demenze, decadimento cognitivo e difficoltà che emergono gradualmente nel tempo." },
      { title: "Piano personalizzato", text: "Attività strutturate in base ai bisogni della persona, con attenzione alla storia clinica, alle risorse residue e al coinvolgimento dei familiari." }
    ]
  },
  about: {
    visible: true,
    eyebrow: "Chi sono",
    title: "Dott.ssa Taurino Licia",
    text: "Inserisci qui una presentazione professionale: formazione, approccio, ambiti di intervento e valori dello studio. Il testo è completamente modificabile dal pannello admin.",
    image: ""
  },
  process: {
    visible: true,
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
    eyebrow: "Articoli e approfondimenti",
    title: "Uno spazio per informarsi con parole semplici.",
    text: "Il sito può includere una sezione blog dedicata a BES, DSA, genitorialità, emozioni, adolescenza e benessere psicologico.",
    items: [
      { title: "I Bisogni Educativi Speciali: cosa sono e come intervenire", text: "Una guida chiara per genitori e insegnanti, con spiegazioni semplici e indicazioni pratiche." },
      { title: "DSA e scuola: il ruolo della famiglia", text: "Come accompagnare bambini e ragazzi nel percorso scolastico senza pressione e con strumenti adeguati." },
      { title: "Emozioni nei bambini", text: "Riconoscere, nominare e gestire le emozioni nella quotidianità." }
    ]
  },
  contact: {
    visible: true,
    eyebrow: "Contatti",
    title: "Prenota un primo colloquio con la Dott.ssa Taurino Licia.",
    text: "Compila il modulo o utilizza telefono, email e WhatsApp per richiedere informazioni."
  }
};
module.exports = { defaultSite };
