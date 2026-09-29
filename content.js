/* =====================================================================
   GEETHANJALI DIGITAL WORLD — WEBSITE CONTENT
   ---------------------------------------------------------------------
   Every word, link, image path and icon on the website lives in this file.
   The easiest way to change it is the admin panel (/admin/).

   Editing by hand? A few rules:
   • Text in two languages looks like  { "te": "తెలుగు", "en": "English" }
   • Image paths are relative to the site root, e.g. "assets/images/…"
   • Tokens replaced automatically: {year} {siteName} {phone} {whatsapp}
     {email} {website} {address}
   • Keep the quotes and commas — a missing comma breaks the whole site.
   ===================================================================== */
window.SITE_CONTENT = {

  // ── META — managed automatically by the admin panel
  "meta": {
    "version": 1,
    "lastUpdated": "2026-09-29T11:32:54"
  },

  // ── SITE SETTINGS — name, logo, default language/theme, fonts, analytics, publishing
  "settings": {
    "siteName": {
      "te": "గీతాంజలి డిజిటల్ వరల్డ్",
      "en": "Geethanjali Digital World"
    },
    "tagline": {
      "te": "మీ వ్యాపారానికి డిజిటల్ విజయం",
      "en": "Digital success for your business"
    },
    "logo": "assets/images/brand/logo-mark.jpg",
    "favicon": "assets/images/brand/favicon-32.png",
    "appleTouchIcon": "assets/images/brand/favicon-180.png",
    "defaultLanguage": "te",
    "defaultTheme": "system",
    "teluguFont": "Noto Serif Telugu",
    "goatcounterCode": "",
    "github": {
      "owner": "geethaavg-arch",
      "repo": "geethanjali-digital-world",
      "branch": "main"
    },
    "adminPasscode": {
      "salt": "3368a797a0e0fa47ca970c3d3cb6fcda",
      "hash": "da3e00f7724ec96309342b70f0b844241fdfd3b890f8da655267104fd3b3e383"
    }
  },

  // ── CONTACT DETAILS — used everywhere via tokens like {phone} and {email}
  "contact": {
    "phone": "+919390644101",
    "phoneDisplay": "+91-9390644101",
    "whatsapp": "919390644101",
    "whatsappDisplay": "+91-9390644101",
    "email": "geetha.avg@gmail.com",
    "website": "www.geethanjalidigitalworld.in",
    "websiteUrl": "https://www.geethanjalidigitalworld.in",
    "hours": {
      "te": "సోమ-శని: 10AM - 7PM",
      "en": "Mon–Sat: 10 AM – 7 PM"
    },
    "address": {
      "te": "వెంకటగిరి, ఆంధ్రప్రదేశ్\nపిన్ కోడ్: 524132, భారతదేశం",
      "en": "Venkatagiri, Andhra Pradesh\nPIN: 524132, India"
    },
    "mapQuery": "Venkatagiri, Andhra Pradesh 524132",
    "whatsappMessages": {
      "consult": {
        "te": "నమస్తే! నాకు ఉచిత వెబ్ డిజైన్ కన్సల్టేషన్ కావాలి.",
        "en": "Hello! I'd like a free web design consultation."
      },
      "project": {
        "te": "నమస్తే! నేను కొత్త ప్రాజెక్ట్ ప్రారంభించాలనుకుంటున్నాను.",
        "en": "Hello! I'd like to start a new project."
      },
      "general": {
        "te": "నమస్తే! మీ సేవల గురించి తెలుసుకోవాలనుకుంటున్నాను.",
        "en": "Hello! I'd like to know more about your services."
      }
    }
  },

  // ── SOCIAL LINKS — leave url empty to hide a link
  "social": [
    {
      "name": "Instagram",
      "icon": "instagram",
      "url": ""
    },
    {
      "name": "Facebook",
      "icon": "facebook",
      "url": ""
    },
    {
      "name": "YouTube",
      "icon": "youtube",
      "url": ""
    }
  ],

  // ── HEADER MENU — "#id" jumps to a home-page section, "folder/" opens a page
  "nav": [
    {
      "label": {
        "te": "సేవలు",
        "en": "Services"
      },
      "target": "#services"
    },
    {
      "label": {
        "te": "పోర్ట్‌ఫోలియో",
        "en": "Portfolio"
      },
      "target": "portfolio/"
    },
    {
      "label": {
        "te": "బ్లాగ్",
        "en": "Blog"
      },
      "target": "blog/"
    },
    {
      "label": {
        "te": "మా గురించి",
        "en": "About"
      },
      "target": "#about"
    },
    {
      "label": {
        "te": "ప్రశ్నలు",
        "en": "FAQ"
      },
      "target": "#faq"
    },
    {
      "label": {
        "te": "సంప్రదించండి",
        "en": "Contact"
      },
      "target": "#contact"
    }
  ],

  // ── SMALL LABELS — buttons, toggles and messages used across the site
  "ui": {
    "skipToContent": {
      "te": "ప్రధాన విషయానికి వెళ్ళండి",
      "en": "Skip to content"
    },
    "home": {
      "te": "హోమ్",
      "en": "Home"
    },
    "menu": {
      "te": "మెను",
      "en": "Menu"
    },
    "closeMenu": {
      "te": "మెను మూసివేయండి",
      "en": "Close menu"
    },
    "languageButton": {
      "te": "EN",
      "en": "తెలుగు"
    },
    "languageButtonLabel": {
      "te": "Switch to English",
      "en": "తెలుగులోకి మార్చండి"
    },
    "themeToDark": {
      "te": "డార్క్ మోడ్‌కి మార్చండి",
      "en": "Switch to dark mode"
    },
    "themeToLight": {
      "te": "లైట్ మోడ్‌కి మార్చండి",
      "en": "Switch to light mode"
    },
    "readMore": {
      "te": "ఇంకా చదవండి",
      "en": "Read more"
    },
    "viewProject": {
      "te": "ప్రాజెక్ట్ చూడండి",
      "en": "View project"
    },
    "allCategories": {
      "te": "అన్నీ",
      "en": "All"
    },
    "backToPortfolio": {
      "te": "పోర్ట్‌ఫోలియోకి తిరిగి",
      "en": "Back to portfolio"
    },
    "backToBlog": {
      "te": "బ్లాగ్‌కి తిరిగి",
      "en": "Back to blog"
    },
    "client": {
      "te": "క్లయింట్",
      "en": "Client"
    },
    "category": {
      "te": "విభాగం",
      "en": "Category"
    },
    "date": {
      "te": "తేదీ",
      "en": "Date"
    },
    "visitSite": {
      "te": "వెబ్‌సైట్ చూడండి",
      "en": "Visit website"
    },
    "previous": {
      "te": "మునుపటి",
      "en": "Previous"
    },
    "next": {
      "te": "తదుపరి",
      "en": "Next"
    },
    "close": {
      "te": "మూసివేయండి",
      "en": "Close"
    },
    "minRead": {
      "te": "నిమిషాల చదువు",
      "en": "min read"
    },
    "morePosts": {
      "te": "మరిన్ని వ్యాసాలు",
      "en": "More articles"
    },
    "noProjects": {
      "te": "ఈ విభాగంలో ఇంకా ప్రాజెక్ట్‌లు లేవు.",
      "en": "No projects in this category yet."
    },
    "noPosts": {
      "te": "ఇంకా వ్యాసాలు లేవు.",
      "en": "No articles yet."
    },
    "offerEnds": {
      "te": "ఆఫర్ చివరి తేదీ:",
      "en": "Offer ends:"
    },
    "followUs": {
      "te": "మమ్మల్ని ఫాలో అవ్వండి",
      "en": "Follow us"
    },
    "notFoundTitle": {
      "te": "పేజీ కనబడలేదు",
      "en": "Page not found"
    },
    "notFoundText": {
      "te": "మీరు వెతుకుతున్న పేజీ ఇక్కడ లేదు.",
      "en": "The page you're looking for isn't here."
    },
    "goHome": {
      "te": "హోమ్ పేజీకి వెళ్ళండి",
      "en": "Go to the home page"
    },
    "previewBanner": {
      "te": "ప్రివ్యూ — ఈ మార్పులు ఇంకా పబ్లిష్ కాలేదు",
      "en": "Preview — these changes are not published yet"
    }
  },

  // ── HOME PAGE — every section of the home page, top to bottom
  "home": {
    "seo": {
      "title": {
        "te": "గీతాంజలి డిజిటల్ వరల్డ్ : మీ వ్యాపారానికి డిజిటల్ విజయం",
        "en": "Geethanjali Digital World — Digital Success for Your Business"
      },
      "description": {
        "te": "వెంకటగిరిలో వెబ్ డిజైన్, లోగోలు, పోస్టర్లు మరియు డిజిటల్ సేవలు — గీతాంజలి డిజిటల్ వరల్డ్.",
        "en": "Web design, logos, posters and digital services from Venkatagiri — Geethanjali Digital World."
      }
    },
    "sectionOrder": [
      "hero",
      "consultation",
      "services",
      "portfolioPreview",
      "blogPreview",
      "testimonials",
      "about",
      "faq",
      "contact",
      "legal"
    ],
    "hero": {
      "show": true,
      "title": {
        "te": "గీతాంజలి డిజిటల్ వరల్డ్:",
        "en": "Geethanjali Digital World:"
      },
      "titleAccent": {
        "te": "మీ వ్యాపారానికి డిజిటల్ విజయం",
        "en": "Digital Success for Your Business"
      },
      "text": {
        "te": "మీ వ్యాపారానికి ఆకర్షణీయమైన, ఫలిత-కేంద్రీకృత వెబ్‌సైట్‌లతో డిజిటల్ ప్రపంచంలో గుర్తింపు తెచ్చుకోండి. గీతాంజలి డిజిటల్ వరల్డ్ — సృజనాత్మకత, సాంకేతికత మరియు వ్యూహాత్మక ఆలోచనల మేళవింపు.",
        "en": "Make your mark in the digital world with attractive, results-driven websites for your business. Geethanjali Digital World — a blend of creativity, technology and strategic thinking."
      },
      "buttons": [
        {
          "label": {
            "te": "ఉచిత కన్సల్టేషన్ పొందండి",
            "en": "Get a Free Consultation"
          },
          "type": "whatsapp",
          "target": "consult",
          "style": "primary"
        },
        {
          "label": {
            "te": "పోర్ట్‌ఫోలియో చూడండి",
            "en": "View Portfolio"
          },
          "type": "page",
          "target": "portfolio/",
          "style": "outline"
        }
      ],
      "backgroundImage": "",
      "images": [
        {
          "src": "assets/images/brand/logo-ganesha.jpg",
          "alt": {
            "te": "గీతాంజలి డిజిటల్ వరల్డ్ లోగో",
            "en": "Geethanjali Digital World logo"
          }
        },
        {
          "src": "assets/images/brand/brand-banner-elephant.jpg",
          "alt": {
            "te": "మీ బ్రాండ్ ఎదుగుదల — గీతాంజలి డిజిటల్ వరల్డ్ బ్యానర్",
            "en": "We help your brand grow — Geethanjali Digital World banner"
          }
        },
        {
          "src": "assets/images/uploads/geethanjali-digital-world-mumkauxq.jpg",
          "alt": {
            "te": "వర్క్ టేబుల్ పై చక్కగా అమర్చబడిన కంప్యూటర్ డెస్క్‌టాప్ మరియు ల్యాప్‌టాప్; వెబ్‌సైట్ డిజైనింగ్ మరియు డిజిటల్ సొల్యూషన్స్ వర్క్‌స్పేస్ దృశ్యం.\"",
            "en": "A sleek office setup with a desktop monitor and Laptop neatly arranged on a work table ,symbolising modern web design and digital agency solutions."
          }
        },
        {
          "src": "",
          "alt": {
            "te": "",
            "en": ""
          }
        }
      ]
    },
    "consultation": {
      "show": true,
      "id": "consultation",
      "badgeIcon": "🎁",
      "badge": {
        "te": "ప్రత్యేక ఆఫర్",
        "en": "Special Offer"
      },
      "title": {
        "te": "ఉచిత వెబ్ డిజైన్ కన్సల్టేషన్ కోసం",
        "en": "For a Free Web Design Consultation,"
      },
      "titleAccent": {
        "te": "మమ్మల్ని సంప్రదించండి",
        "en": "Contact Us"
      },
      "text": {
        "te": "మీ వెబ్‌సైట్ ప్రాజెక్ట్ గురించి చర్చించడానికి మా నిపుణులు సిద్ధంగా ఉన్నారు. మీ అవసరాలు, బడ్జెట్ మరియు లక్ష్యాలను అర్థం చేసుకుని, సరైన పరిష్కారం సూచిస్తాం.",
        "en": "Our experts are ready to discuss your website project. We'll understand your needs, budget and goals, and suggest the right solution."
      },
      "benefitsTitle": {
        "te": "కన్సల్టేషన్‌లో ఏం పొందుతారు?",
        "en": "What you get in the consultation"
      },
      "benefits": [
        {
          "te": "మీ వెబ్‌సైట్ అవసరాల విశ్లేషణ",
          "en": "Analysis of your website needs"
        },
        {
          "te": "ప్రత్యేక వ్యూహాత్మక సలహాలు",
          "en": "Tailored strategic advice"
        },
        {
          "te": "ఖర్చు మరియు సమయ అంచనా",
          "en": "Cost and timeline estimate"
        },
        {
          "te": "పోటీదారుల విశ్లేషణ",
          "en": "Competitor analysis"
        }
      ],
      "howTitle": {
        "te": "ఎలా సంప్రదించాలి?",
        "en": "How to reach us"
      },
      "methods": [
        {
          "icon": "📞",
          "label": {
            "te": "ఫోన్",
            "en": "Phone"
          },
          "type": "call"
        },
        {
          "icon": "✉️",
          "label": {
            "te": "ఈమెయిల్",
            "en": "Email"
          },
          "type": "email"
        },
        {
          "icon": "💬",
          "label": {
            "te": "WhatsApp",
            "en": "WhatsApp"
          },
          "type": "whatsapp"
        }
      ],
      "note": {
        "te": "WhatsApp లో మెసేజ్ పంపినా సరే. 24 గంటల్లో స్పందిస్తాం.",
        "en": "Or just send us a WhatsApp message. We reply within 24 hours."
      },
      "button": {
        "label": {
          "te": "ఇప్పుడే సంప్రదించండి",
          "en": "Contact Us Now"
        },
        "type": "whatsapp",
        "target": "consult",
        "style": "primary"
      }
    },
    "services": {
      "show": true,
      "id": "services",
      "badgeIcon": "",
      "badge": {
        "te": "సేవలు",
        "en": "Services"
      },
      "title": {
        "te": "పూర్తి స్థాయి",
        "en": "Complete"
      },
      "titleAccent": {
        "te": "వెబ్ డిజైన్ సొల్యూషన్స్",
        "en": "Web Design Solutions"
      },
      "text": {
        "te": "మీ వ్యాపారానికి అనుకూలంగా, ఆకర్షణీయంగా మరియు ఫలితాలను ఇచ్చే వెబ్‌సైట్‌లను రూపొందిస్తాం. ప్రతి సేవ మీ వ్యాపార అవసరాలకు తగినట్లుగా రూపొందించబడింది.",
        "en": "We build websites that suit your business, look attractive and deliver results. Every service is shaped around your business needs."
      },
      "items": [
        {
          "icon": "brush",
          "title": {
            "te": "UI/UX డిజైన్",
            "en": "UI/UX Design"
          },
          "text": {
            "te": "వాడుకరి-స్నేహపూర్వక, ఆకర్షణీయమైన ఇంటర్‌ఫేస్ డిజైన్‌లు — మీ కస్టమర్లను ఆకట్టుకుంటాయి.",
            "en": "User-friendly, attractive interface designs that win over your customers."
          }
        },
        {
          "icon": "smartphone",
          "title": {
            "te": "రెస్పాన్సివ్ వెబ్‌సైట్",
            "en": "Responsive Websites"
          },
          "text": {
            "te": "మొబైల్, టాబ్లెట్ మరియు డెస్క్‌టాప్ — అన్ని పరికరాల్లో అద్భుతంగా కనిపిస్తుంది.",
            "en": "Looks great on every device — mobile, tablet and desktop."
          }
        },
        {
          "icon": "cart",
          "title": {
            "te": "ఈ-కామర్స్ సొల్యూషన్స్",
            "en": "E-commerce Solutions"
          },
          "text": {
            "te": "ఆన్‌లైన్ స్టోర్‌లు, పేమెంట్ గేట్‌వే ఇంటిగ్రేషన్ మరియు ఇన్వెంటరీ నిర్వహణ.",
            "en": "Online stores, payment gateway integration and inventory management."
          }
        },
        {
          "icon": "seo",
          "title": {
            "te": "SEO ఆప్టిమైజేషన్",
            "en": "SEO Optimization"
          },
          "text": {
            "te": "గూగుల్ సెర్చ్‌లో మొదటి పేజీలో ర్యాంక్ చేయడానికి SEO-ఫ్రెండ్లీ వెబ్‌సైట్‌లు.",
            "en": "SEO-friendly websites built to rank on the first page of Google Search."
          }
        }
      ]
    },
    "portfolioPreview": {
      "show": true,
      "id": "portfolio",
      "badgeIcon": "",
      "badge": {
        "te": "పోర్ట్‌ఫోలియో",
        "en": "Portfolio"
      },
      "title": {
        "te": "మేము రూపొందించిన",
        "en": "Some of Our"
      },
      "titleAccent": {
        "te": "అద్భుతమైన డిజైన్లు",
        "en": "Finest Work"
      },
      "text": {
        "te": "వివిధ రంగాల క్లయింట్ల కోసం మేము రూపొందించిన కొన్ని ప్రాజెక్ట్‌లు చూడండి. ప్రతి ప్రాజెక్ట్ సృజనాత్మకత మరియు సాంకేతిక నైపుణ్యంతో నిండి ఉంటుంది.",
        "en": "Here are a few projects we've created for clients in different fields. Every one is full of creativity and technical skill."
      },
      "maxItems": 3,
      "button": {
        "label": {
          "te": "మొత్తం పోర్ట్‌ఫోలియో చూడండి",
          "en": "View Full Portfolio"
        },
        "type": "page",
        "target": "portfolio/",
        "style": "outline"
      }
    },
    "blogPreview": {
      "show": true,
      "id": "blog",
      "badgeIcon": "",
      "badge": {
        "te": "బ్లాగ్",
        "en": "Blog"
      },
      "title": {
        "te": "వెబ్ డిజైన్",
        "en": "Web Design"
      },
      "titleAccent": {
        "te": "ట్రెండ్‌లు, చిట్కాలు మరియు సమాచారం",
        "en": "Trends, Tips & Insights"
      },
      "text": {
        "te": "డిజిటల్ ప్రపంచంలో తాజా ట్రెండ్‌లు, ఉపయోగకరమైన చిట్కాలు మరియు ముఖ్యమైన సమాచారం — అన్నీ ఒకే చోట.",
        "en": "The latest digital trends, useful tips and important information — all in one place."
      },
      "image": "",
      "maxItems": 4,
      "button": {
        "label": {
          "te": "అన్ని బ్లాగ్ పోస్ట్‌లు చదవండి",
          "en": "Read All Blog Posts"
        },
        "type": "page",
        "target": "blog/",
        "style": "primary"
      }
    },
    "testimonials": {
      "show": true,
      "id": "testimonials",
      "badgeIcon": "",
      "badge": {
        "te": "టెస్టిమోనియల్స్",
        "en": "Testimonials"
      },
      "title": {
        "te": "మా క్లయింట్లు",
        "en": "What Our Clients"
      },
      "titleAccent": {
        "te": "ఏమంటున్నారు?",
        "en": "Say"
      },
      "text": {
        "te": "మా క్లయింట్ల అభిప్రాయాలు మా నాణ్యతకు నిదర్శనం. వారి అనుభవాలు మా పనిని మరింత మెరుగుపరుస్తాయి.",
        "en": "Our clients' words are proof of our quality. Their experiences help us keep getting better."
      },
      "backgroundImage": "",
      "items": [
        {
          "quote": {
            "te": "గీతాంజలి డిజిటల్ వరల్డ్ మా సమత మీటింగ్ కోసం పోస్టర్ మరియు ఇంగ్లీష్, తెలుగు కరపత్రాలు చాలా బాగా తయారు చేసి ఇచ్చారు.",
            "en": "Geethanjali Digital World made a poster and English and Telugu pamphlets for our Samatha meeting, and they came out really well."
          },
          "name": {
            "te": "సుజాత గారు",
            "en": "Sujatha garu"
          },
          "role": {
            "te": "JVV సమత",
            "en": "JVV Samatha"
          },
          "highlight": false
        },
        {
          "quote": {
            "te": "గీతాంజలి డిజిటల్ వరల్డ్ మా వెడ్డింగ్ యానివర్సరీ కోసం 15 సెకన్ల వీడియో చాలా అందంగా తయారు చేసి ఇచ్చారు. ధన్యవాదాలు గీతాంజలి!",
            "en": "Geethanjali Digital World made a beautiful 15-second video for our wedding anniversary. Thank you, Geethanjali!"
          },
          "name": {
            "te": "కె. గోపాలరావు, బెంగళూరు",
            "en": "K. Gopala Rao, Bengaluru"
          },
          "role": {
            "te": "రిటైర్డ్ ఆంధ్రా బ్యాంక్ మేనేజర్",
            "en": "Retired Andhra Bank Manager"
          },
          "highlight": false
        },
        {
          "quote": {
            "te": "గీతాంజలి డిజిటల్ వరల్డ్ మా క్లినిక్ కోసం ఒక అందమైన ప్రిస్క్రిప్షన్ బుక్‌లెట్ తయారు చేశారు. చాలా అందంగా డిజైన్ చేసి ఇచ్చారు.",
            "en": "Geethanjali Digital World made a lovely prescription booklet for our clinic. It was designed beautifully."
          },
          "name": {
            "te": "డా. పి. వాసుదేవ రెడ్డి",
            "en": "Dr. P. Vasudeva Reddy"
          },
          "role": {
            "te": "అఖిల ప్రజా వైద్యశాల, ధర్మవరం",
            "en": "Akhila Praja Vaidyasala, Dharmavaram"
          },
          "highlight": true
        }
      ],
      "stats": [
        {
          "value": {
            "te": "15+",
            "en": "15+"
          },
          "label": {
            "te": "డిజైన్లు పూర్తి",
            "en": "Designs delivered"
          }
        },
        {
          "value": {
            "te": "100%",
            "en": "100%"
          },
          "label": {
            "te": "క్లయింట్ సంతృప్తి",
            "en": "Client satisfaction"
          }
        },
        {
          "value": {
            "te": "4+",
            "en": "4+"
          },
          "label": {
            "te": "సేవా విభాగాలు",
            "en": "Service areas"
          }
        },
        {
          "value": {
            "te": "24 గం.",
            "en": "24 hrs"
          },
          "label": {
            "te": "స్పందన సమయం",
            "en": "Response time"
          }
        }
      ]
    },
    "about": {
      "show": true,
      "id": "about",
      "badgeIcon": "",
      "badge": {
        "te": "మా గురించి",
        "en": "About Us"
      },
      "title": {
        "te": "గీతాంజలి డిజిటల్ వరల్డ్:",
        "en": "Geethanjali Digital World:"
      },
      "titleAccent": {
        "te": "విజన్, మిషన్ మరియు టీమ్",
        "en": "Vision, Mission & Team"
      },
      "vision": {
        "title": {
          "te": "మా విజన్",
          "en": "Our Vision"
        },
        "text": {
          "te": "భారతదేశంలోని ప్రతి చిన్న మరియు మధ్యస్థ వ్యాపారానికి నాణ్యమైన డిజిటల్ ఉనికిని కల్పించడం — సరసమైన ధరలో, అత్యున్నత నాణ్యతతో.",
          "en": "To give every small and medium business in India a quality digital presence — at an affordable price, with the highest quality."
        }
      },
      "mission": {
        "title": {
          "te": "మా మిషన్",
          "en": "Our Mission"
        },
        "text": {
          "te": "సృజనాత్మక డిజైన్ మరియు ఆధునిక సాంకేతికత ద్వారా క్లయింట్ల వ్యాపారాలను డిజిటల్ యుగంలో విజయవంతం చేయడం.",
          "en": "To help our clients' businesses succeed in the digital age through creative design and modern technology."
        }
      },
      "team": {
        "title": {
          "te": "మా టీమ్",
          "en": "Our Team"
        },
        "text": {
          "te": "అనుభవజ్ఞులైన వెబ్ డిజైనర్లు, డెవలపర్లు, SEO నిపుణులు మరియు ప్రాజెక్ట్ మేనేజర్లతో కూడిన మా టీమ్ — మీ ప్రాజెక్ట్‌ను విజయవంతం చేయడానికి సిద్ధంగా ఉంది.",
          "en": "Our team of experienced web designers, developers, SEO experts and project managers is ready to make your project a success."
        },
        "members": [
          {
            "icon": "arrow-right",
            "text": {
              "te": "సృజనాత్మక డిజైనర్లు",
              "en": "Creative designers"
            }
          },
          {
            "icon": "arrow-right",
            "text": {
              "te": "సాంకేతిక డెవలపర్లు",
              "en": "Technical developers"
            }
          },
          {
            "icon": "arrow-right",
            "text": {
              "te": "డిజిటల్ మార్కెటింగ్ నిపుణులు",
              "en": "Digital marketing experts"
            }
          }
        ]
      }
    },
    "faq": {
      "show": true,
      "id": "faq",
      "badgeIcon": "",
      "badge": {
        "te": "FAQ",
        "en": "FAQ"
      },
      "title": {
        "te": "తరచుగా అడిగే",
        "en": "Frequently Asked"
      },
      "titleAccent": {
        "te": "ప్రశ్నలు",
        "en": "Questions"
      },
      "text": {
        "te": "మీకు ఉండే సాధారణ సందేహాలకు ఇక్కడ సమాధానాలు ఉన్నాయి. ఇంకా ప్రశ్నలు ఉంటే మమ్మల్ని సంప్రదించండి.",
        "en": "Here are answers to common questions. If you have more, just get in touch."
      },
      "items": [
        {
          "question": {
            "te": "వెబ్‌సైట్ తయారు చేయడానికి ఎంత సమయం పడుతుంది?",
            "en": "How long does it take to build a website?"
          },
          "answer": {
            "te": "సాధారణ వెబ్‌సైట్ 7-14 రోజుల్లో, ఈ-కామర్స్ వెబ్‌సైట్ 2-4 వారాల్లో పూర్తి అవుతుంది. ప్రాజెక్ట్ పరిమాణం మీద ఆధారపడి ఉంటుంది.",
            "en": "A standard website takes 7–14 days and an e-commerce website 2–4 weeks, depending on the size of the project."
          }
        },
        {
          "question": {
            "te": "వెబ్‌సైట్ ఖర్చు ఎంత?",
            "en": "How much does a website cost?"
          },
          "answer": {
            "te": "₹8,000 నుండి మొదలై, అవసరాలను బట్టి మారుతుంది. ఉచిత కన్సల్టేషన్‌లో మీకు ఖచ్చితమైన అంచనా ఇస్తాం.",
            "en": "Prices start from ₹8,000 and vary with your needs. We'll give you an exact estimate in the free consultation."
          }
        },
        {
          "question": {
            "te": "వెబ్‌సైట్ తర్వాత మార్పులు చేయవచ్చా?",
            "en": "Can I make changes after the website is ready?"
          },
          "answer": {
            "te": "అవును! మా CMS-ఆధారిత వెబ్‌సైట్‌లలో మీరే సులభంగా కంటెంట్ మార్చవచ్చు. లేదా మా టీమ్ సహాయం అందిస్తుంది.",
            "en": "Yes! On our CMS-based websites you can easily change the content yourself, or our team can help."
          }
        },
        {
          "question": {
            "te": "SEO సేవలు కూడా అందిస్తారా?",
            "en": "Do you offer SEO services too?"
          },
          "answer": {
            "te": "అవును, SEO ఆప్టిమైజేషన్, గూగుల్ మై బిజినెస్ సెటప్ మరియు సోషల్ మీడియా ఇంటిగ్రేషన్ అన్నీ అందిస్తాం.",
            "en": "Yes — SEO optimization, Google Business Profile setup and social media integration are all included."
          }
        }
      ]
    },
    "contact": {
      "show": true,
      "id": "contact",
      "badgeIcon": "📩",
      "badge": {
        "te": "సంప్రదించండి",
        "en": "Contact"
      },
      "title": {
        "te": "వెబ్ డిజైన్ ప్రాజెక్ట్ కోసం",
        "en": "For Your Web Design Project,"
      },
      "titleAccent": {
        "te": "మమ్మల్ని సంప్రదించండి",
        "en": "Contact Us"
      },
      "text": {
        "te": "మీ డిజిటల్ ప్రయాణాన్ని ఇప్పుడే ప్రారంభించండి. మా టీమ్ 24 గంటల్లో స్పందిస్తుంది.",
        "en": "Start your digital journey today. Our team responds within 24 hours."
      },
      "cards": [
        {
          "icon": "📞",
          "color": "olive",
          "title": {
            "te": "ఫోన్ కాల్",
            "en": "Phone Call"
          },
          "type": "call",
          "lines": [
            {
              "te": "{phone}",
              "en": "{phone}"
            },
            {
              "te": "సోమ-శని: 10AM - 7PM",
              "en": "Mon–Sat: 10 AM – 7 PM"
            }
          ]
        },
        {
          "icon": "✉️",
          "color": "olivegold",
          "title": {
            "te": "ఈమెయిల్/Website",
            "en": "Email / Website"
          },
          "type": "email",
          "lines": [
            {
              "te": "{email}",
              "en": "{email}"
            },
            {
              "te": "{website}",
              "en": "{website}"
            },
            {
              "te": "24 గంటల్లో స్పందన",
              "en": "Reply within 24 hours"
            }
          ]
        },
        {
          "icon": "💬",
          "color": "gold",
          "title": {
            "te": "WhatsApp",
            "en": "WhatsApp"
          },
          "type": "whatsapp",
          "lines": [
            {
              "te": "{whatsapp}",
              "en": "{whatsapp}"
            },
            {
              "te": "తక్షణ సహాయం",
              "en": "Instant help"
            }
          ]
        },
        {
          "icon": "📍",
          "color": "tan",
          "title": {
            "te": "కార్యాలయం",
            "en": "Office"
          },
          "type": "map",
          "lines": [
            {
              "te": "{address}",
              "en": "{address}"
            }
          ]
        }
      ],
      "showOffers": true,
      "buttons": [
        {
          "label": {
            "te": "ప్రాజెక్ట్ ప్రారంభించండి",
            "en": "Start a Project"
          },
          "type": "whatsapp",
          "target": "project",
          "style": "primary"
        },
        {
          "label": {
            "te": "ఉచిత కన్సల్టేషన్ బుక్ చేయండి",
            "en": "Book a Free Consultation"
          },
          "type": "whatsapp",
          "target": "consult",
          "style": "outline"
        }
      ]
    },
    "legal": {
      "show": true,
      "id": "legal",
      "badgeIcon": "",
      "badge": {
        "te": "చట్టపరమైన",
        "en": "Legal"
      },
      "title": {
        "te": "ప్రైవసీ పాలసీ &",
        "en": "Privacy Policy &"
      },
      "titleAccent": {
        "te": "నిబంధనలు మరియు షరతులు",
        "en": "Terms & Conditions"
      },
      "blocks": [
        {
          "title": {
            "te": "ప్రైవసీ పాలసీ",
            "en": "Privacy Policy"
          },
          "text": {
            "te": "గీతాంజలి డిజిటల్ వరల్డ్ మీ వ్యక్తిగత సమాచారాన్ని గౌరవిస్తుంది మరియు రక్షిస్తుంది. మీ డేటాను మూడవ పక్షాలతో పంచుకోము. కస్టమర్ సమాచారం కేవలం సేవలు అందించడానికి మాత్రమే ఉపయోగిస్తాం.",
            "en": "Geethanjali Digital World respects and protects your personal information. We never share your data with third parties. Customer information is used only to provide our services."
          },
          "points": [
            {
              "te": "వ్యక్తిగత డేటా రక్షణ",
              "en": "Personal data protection"
            },
            {
              "te": "కుకీల వినియోగం",
              "en": "Use of cookies"
            },
            {
              "te": "డేటా భద్రతా ప్రమాణాలు",
              "en": "Data security standards"
            }
          ]
        },
        {
          "title": {
            "te": "నిబంధనలు మరియు షరతులు",
            "en": "Terms & Conditions"
          },
          "text": {
            "te": "మా సేవలను ఉపయోగించడం ద్వారా ఈ క్రింది నిబంధనలను అంగీకరిస్తారు. ప్రాజెక్ట్ పూర్తి తర్వాత పేమెంట్ తప్పనిసరి. రద్దు విధానం ముందే తెలియజేయబడుతుంది.",
            "en": "By using our services you agree to the following terms. Payment is due once the project is complete. The cancellation policy is shared in advance."
          },
          "points": [
            {
              "te": "సేవా అంగీకారం",
              "en": "Service agreement"
            },
            {
              "te": "పేమెంట్ నిబంధనలు",
              "en": "Payment terms"
            },
            {
              "te": "బాధ్యత పరిమితి",
              "en": "Limitation of liability"
            },
            {
              "te": "బౌద్ధిక ఆస్తి హక్కులు",
              "en": "Intellectual property rights"
            }
          ]
        }
      ]
    }
  },

  // ── OFFERS — festival / seasonal offers (switch on, set dates, they hide after the end date)
  "offers": [
    {
      "id": "poleramma-jatara-2026",
      "enabled": true,
      "startDate": "2026-09-20",
      "endDate": "2026-09-30",
      "icon": "🎁",
      "title": {
        "te": "🎉 ప్రత్యేక పండుగ ఆఫర్ — వెంకటగిరి పోలేరమ్మ జాతర స్పెషల్ - JATARA OFFER! 🎉",
        "en": "🎉 Special Festival Offer — Venkatagiri Poleramma Jatara Special: JATARA OFFER! 🎉"
      },
      "price": {
        "te": "కేవలం Rs. 3,999/- కే!",
        "en": "Just Rs. 3,999/-!"
      },
      "items": [
        {
          "te": "1 Landing Page",
          "en": "1 Landing Page"
        },
        {
          "te": "1 Festival Poster",
          "en": "1 Festival Poster"
        },
        {
          "te": "1 Song (మీ పేరుతో)",
          "en": "1 Song (with your name)"
        },
        {
          "te": "1 Video (15 sec)",
          "en": "1 Video (15 sec)"
        }
      ],
      "details": [
        {
          "te": "Market Price Rs. 15,000/-",
          "en": "Market Price Rs. 15,000/-"
        },
        {
          "te": "Offer Price Rs. 3,999/- మాత్రమే!",
          "en": "Offer Price only Rs. 3,999/-!"
        },
        {
          "te": "Call: {phone}",
          "en": "Call: {phone}"
        },
        {
          "te": "గీతాంజలి డిజిటల్ వరల్డ్, వెంకటగిరి",
          "en": "Geethanjali Digital World, Venkatagiri"
        }
      ],
      "note": {
        "te": "ప్రతి పండుగకు ఆఫర్ వస్తుంది! ఒక నెల మెయింటెనెన్స్ ఉచితంగా పొందండి!",
        "en": "A new offer comes with every festival! Get one month of maintenance free!"
      },
      "poster": "assets/images/offers/jatara-offer-poster.jpg"
    }
  ],

  // ── PORTFOLIO — page text, categories and projects
  "portfolio": {
    "seo": {
      "title": {
        "te": "పోర్ట్‌ఫోలియో — గీతాంజలి డిజిటల్ వరల్డ్",
        "en": "Portfolio — Geethanjali Digital World"
      },
      "description": {
        "te": "గీతాంజలి డిజిటల్ వరల్డ్ రూపొందించిన లోగోలు, పోస్టర్లు, కరపత్రాలు మరియు వెబ్‌సైట్‌లు.",
        "en": "Logos, posters, pamphlets and websites designed by Geethanjali Digital World."
      }
    },
    "page": {
      "badgeIcon": "",
      "badge": {
        "te": "పోర్ట్‌ఫోలియో",
        "en": "Portfolio"
      },
      "title": {
        "te": "మా పనులు:",
        "en": "Our Work:"
      },
      "titleAccent": {
        "te": "మేము గర్వపడే డిజైన్లు",
        "en": "Designs We're Proud Of"
      },
      "text": {
        "te": "లోగోలు, పోస్టర్లు, కరపత్రాలు, వెబ్‌సైట్‌లు — క్లయింట్ల కోసం మేము ప్రేమతో రూపొందించిన డిజైన్లు అన్నీ ఒకే చోట.",
        "en": "Logos, posters, pamphlets and websites — the designs we've lovingly created for our clients, all in one place."
      }
    },
    "cta": {
      "title": {
        "te": "ఇలాంటి డిజైన్ మీకూ కావాలా?",
        "en": "Want something like this?"
      },
      "text": {
        "te": "మీ ఆలోచన చెప్పండి — మిగతాది మేము చూసుకుంటాం.",
        "en": "Tell us your idea — we'll take care of the rest."
      },
      "button": {
        "label": {
          "te": "WhatsApp లో మాట్లాడండి",
          "en": "Chat on WhatsApp"
        },
        "type": "whatsapp",
        "target": "project",
        "style": "primary"
      }
    },
    "categories": [
      {
        "id": "logos",
        "label": {
          "te": "లోగోలు & బ్రాండింగ్",
          "en": "Logos & Branding"
        }
      },
      {
        "id": "print",
        "label": {
          "te": "పోస్టర్లు, కరపత్రాలు & ప్రింట్",
          "en": "Posters, Flyers & Print"
        }
      },
      {
        "id": "web",
        "label": {
          "te": "వెబ్‌సైట్‌లు & ల్యాండింగ్ పేజీలు",
          "en": "Websites & Landing Pages"
        }
      }
    ],
    "projects": [
      {
        "id": "poleramma-jatara-logo",
        "show": true,
        "featured": true,
        "category": "logos",
        "title": {
          "te": "వెంకటగిరి పోలేరమ్మ జాతర లోగో",
          "en": "Venkatagiri Poleramma Jatara Logo"
        },
        "client": {
          "te": "వెంకటగిరి పోలేరమ్మ జాతర",
          "en": "Venkatagiri Poleramma Jatara"
        },
        "date": "2026-09",
        "summary": {
          "te": "వెంకటగిరి పోలేరమ్మ జాతర కోసం ప్రత్యేక లోగో 🌺",
          "en": "A special logo for the Venkatagiri Poleramma Jatara 🌺"
        },
        "description": {
          "te": "పోలేరమ్మ జాతర సంబరాల కోసం రూపొందించిన ప్రత్యేక లోగో. అమ్మవారి రూపాన్ని మధ్యలో ఉంచి, మెరూన్ మరియు బంగారు రంగులతో పండుగ వాతావరణం తెచ్చాం.\n\nపండుగ వీధిలో వెలిగే సైన్‌బోర్డ్‌గా చూపించి, జాతరలో ఈ లోగో ఎలా కనిపిస్తుందో క్లయింట్‌కు ముందే చూపించాం.",
          "en": "A special logo designed for the Poleramma Jatara celebrations. The goddess sits at the centre, and maroon and gold bring out the festive mood.\n\nWe presented it as an illuminated signboard on a festival street, so the client could see how it would look during the Jatara."
        },
        "cover": "assets/images/portfolio/jatara-logo-sign-thumb.jpg",
        "images": [
          {
            "src": "assets/images/portfolio/jatara-logo-sign.jpg",
            "caption": {
              "te": "పండుగ వీధిలో లోగో సైన్‌బోర్డ్",
              "en": "The logo as a signboard on a festival street"
            }
          }
        ],
        "link": ""
      },
      {
        "id": "seshagiri-rao-profile-page",
        "show": true,
        "featured": true,
        "category": "web",
        "title": {
          "te": "సి. శేషగిరి రావు గారి ప్రొఫైల్ పేజీ",
          "en": "C. Seshagiri Rao — Profile Page"
        },
        "client": {
          "te": "సి. శేషగిరి రావు, విన్జమూరు",
          "en": "C. Seshagiri Rao, Vinjamuru"
        },
        "date": "",
        "summary": {
          "te": "రిటైర్డ్ ఉపాధ్యాయుడి కోసం వ్యక్తిగత ప్రొఫైల్ వెబ్ పేజీ.",
          "en": "A personal profile web page for a retired teacher."
        },
        "description": {
          "te": "35+ ఏళ్ల బోధనా అనుభవం ఉన్న రిటైర్డ్ ఉపాధ్యాయుడు, సేవా కర్త సి. శేషగిరి రావు గారి కోసం రూపొందించిన వ్యక్తిగత వెబ్ పేజీ.\n\n“Old is Gold” థీమ్, ఫోటో, చిన్న పరిచయం మరియు ఒక్క ట్యాప్‌తో కాల్ చేసే బటన్ — అన్నీ మొబైల్‌లో చక్కగా కనిపించేలా.",
          "en": "A personal web page for C. Seshagiri Rao — a retired teacher with 35+ years of teaching and a lifelong volunteer.\n\nIt has an “Old is Gold” theme, his photo, a short introduction and a one-tap call button, all designed to look great on mobile."
        },
        "cover": "assets/images/portfolio/seshagiri-rao-page-thumb.jpg",
        "images": [
          {
            "src": "assets/images/portfolio/seshagiri-rao-page.jpg",
            "caption": {
              "te": "ప్రొఫైల్ పేజీ — పై భాగం",
              "en": "Profile page — top section"
            }
          }
        ],
        "link": ""
      },
      {
        "id": "brand-growth-banner",
        "show": true,
        "featured": true,
        "category": "print",
        "title": {
          "te": "\"మీ బ్రాండ్ ఎదుగుదల\" ప్రచార బ్యానర్",
          "en": "\"We Help Your Brand Grow\" Promo Banner"
        },
        "client": {
          "te": "గీతాంజలి డిజిటల్ వరల్డ్",
          "en": "Geethanjali Digital World"
        },
        "date": "",
        "summary": {
          "te": "చిన్న అడుగుల నుండి పెద్ద విజయం వరకు — బ్రాండ్ ఎదుగుదలను చూపించే బ్యానర్.",
          "en": "From small steps to big success — a banner about brand growth."
        },
        "description": {
          "te": "చీమ నుండి ఏనుగు వరకు — చిన్న వ్యాపారం పెద్ద బ్రాండ్‌గా ఎదగడాన్ని చూపించే ఆలోచనతో రూపొందించిన సోషల్ మీడియా / ప్రింట్ బ్యానర్.\n\n\"GD\" లోగో, సంప్రదింపు నంబర్ మరియు \"More Visibility, More Customers, More Growth\" సందేశాలతో.",
          "en": "An ant growing into an elephant — a social media and print banner built on the idea of a small business growing into a big brand.\n\nIt features the \"GD\" logo, a contact number and the \"More Visibility, More Customers, More Growth\" message."
        },
        "cover": "assets/images/portfolio/brand-banner-thumb.jpg",
        "images": [
          {
            "src": "assets/images/brand/brand-banner-elephant.jpg",
            "caption": {
              "te": "ప్రచార బ్యానర్",
              "en": "Promotional banner"
            }
          }
        ],
        "link": ""
      },
      {
        "id": "geethanjali-brand-logo",
        "show": true,
        "featured": false,
        "category": "logos",
        "title": {
          "te": "గీతాంజలి డిజిటల్ వరల్డ్ బ్రాండ్ లోగో",
          "en": "Geethanjali Digital World Brand Logo"
        },
        "client": {
          "te": "గీతాంజలి డిజిటల్ వరల్డ్",
          "en": "Geethanjali Digital World"
        },
        "date": "",
        "summary": {
          "te": "బంగారు గణపతితో మా సొంత బ్రాండ్ లోగో.",
          "en": "Our own brand logo, with a golden Ganesha."
        },
        "description": {
          "te": "మా ప్రయాణానికి విఘ్నేశ్వరుడి ఆశీస్సులు — బంగారు గణపతి, కెమెరా ఆకారం మరియు సొగసైన చేతిరాత అక్షరాలతో రూపొందించిన మా సొంత లోగో.\n\nట్యాగ్‌లైన్: “Empowering Everyone with AI & Digital Skills”.",
          "en": "Our own logo, with Lord Ganesha’s blessing for the journey — a golden Ganesha, a camera outline and elegant script lettering.\n\nTagline: “Empowering Everyone with AI & Digital Skills”."
        },
        "cover": "assets/images/portfolio/geethanjali-logo-thumb.jpg",
        "images": [
          {
            "src": "assets/images/brand/logo-ganesha.jpg",
            "caption": {
              "te": "బ్రాండ్ లోగో",
              "en": "Brand logo"
            }
          }
        ],
        "link": ""
      },
      {
        "id": "jatara-jumbo-offer-poster",
        "show": true,
        "featured": false,
        "category": "print",
        "title": {
          "te": "పోలేరమ్మ జాతర జంబో ఆఫర్ పోస్టర్",
          "en": "Poleramma Jatara Jumbo Offer Poster"
        },
        "client": {
          "te": "గీతాంజలి డిజిటల్ వరల్డ్",
          "en": "Geethanjali Digital World"
        },
        "date": "2026-09",
        "summary": {
          "te": "జాతర స్పెషల్ ఆఫర్ కోసం రూపొందించిన ప్రచార పోస్టర్.",
          "en": "A promotional poster for our Jatara special offer."
        },
        "description": {
          "te": "వెంకటగిరి పోలేరమ్మ జాతర సందర్భంగా మా జంబో ఆఫర్ కోసం రూపొందించిన సోషల్ మీడియా పోస్టర్.\n\nల్యాండింగ్ పేజ్, ఫోటో పోస్టర్, వ్యక్తిగత పాట మరియు వీడియో యాడ్ — నాలుగూ ఒకే చూపులో అర్థమయ్యేలా.",
          "en": "A social media poster for our Jumbo Offer during the Venkatagiri Poleramma Jatara.\n\nThe landing page, photo poster, personalised song and video ad — all four explained at a glance."
        },
        "cover": "assets/images/offers/jatara-offer-poster-thumb.jpg",
        "images": [
          {
            "src": "assets/images/offers/jatara-offer-poster.jpg",
            "caption": {
              "te": "జంబో ఆఫర్ పోస్టర్",
              "en": "Jumbo Offer poster"
            }
          }
        ],
        "link": ""
      }
    ]
  },

  // ── BLOG — page text and articles (body uses simple formatting: ## heading, - bullet, **bold**)
  "blog": {
    "seo": {
      "title": {
        "te": "బ్లాగ్ — గీతాంజలి డిజిటల్ వరల్డ్",
        "en": "Blog — Geethanjali Digital World"
      },
      "description": {
        "te": "వెబ్ డిజైన్ ట్రెండ్‌లు, SEO చిట్కాలు మరియు వ్యాపారాల కోసం డిజిటల్ సలహాలు — తెలుగులో.",
        "en": "Web design trends, SEO tips and digital advice for businesses — in Telugu and English."
      }
    },
    "page": {
      "badgeIcon": "",
      "badge": {
        "te": "బ్లాగ్",
        "en": "Blog"
      },
      "title": {
        "te": "వెబ్ డిజైన్",
        "en": "Web Design"
      },
      "titleAccent": {
        "te": "ట్రెండ్‌లు, చిట్కాలు మరియు సమాచారం",
        "en": "Trends, Tips & Insights"
      },
      "text": {
        "te": "డిజిటల్ ప్రపంచంలో తాజా ట్రెండ్‌లు, ఉపయోగకరమైన చిట్కాలు మరియు ముఖ్యమైన సమాచారం — అన్నీ ఒకే చోట.",
        "en": "The latest digital trends, useful tips and important information — all in one place."
      }
    },
    "author": {
      "te": "గీతాంజలి డిజిటల్ వరల్డ్",
      "en": "Geethanjali Digital World"
    },
    "cta": {
      "title": {
        "te": "మీ వెబ్‌సైట్ గురించి మాట్లాడదామా?",
        "en": "Shall we talk about your website?"
      },
      "text": {
        "te": "ఉచిత కన్సల్టేషన్ కోసం WhatsApp చేయండి — 24 గంటల్లో స్పందిస్తాం.",
        "en": "WhatsApp us for a free consultation — we reply within 24 hours."
      },
      "button": {
        "label": {
          "te": "ఉచిత కన్సల్టేషన్ పొందండి",
          "en": "Get a Free Consultation"
        },
        "type": "whatsapp",
        "target": "consult",
        "style": "primary"
      }
    },
    "posts": [
      {
        "id": "web-design-trends-2026",
        "show": true,
        "date": "2026-09-27",
        "icon": "sparkle",
        "color": "olive",
        "cover": "",
        "title": {
          "te": "2026 వెబ్ డిజైన్ ట్రెండ్‌లు",
          "en": "Web Design Trends for 2026"
        },
        "excerpt": {
          "te": "మినిమలిజం, డార్క్ మోడ్ మరియు AI-ఆధారిత డిజైన్ — ఈ సంవత్సరం ఏం హాట్?",
          "en": "Minimalism, dark mode and AI-assisted design — what's hot this year?"
        },
        "body": {
          "te": "వెబ్‌సైట్ అంటే ఇప్పుడు కేవలం ఆన్‌లైన్ విజిటింగ్ కార్డ్ కాదు — మీ వ్యాపారానికి 24 గంటలూ తెరిచి ఉండే షోరూమ్. కస్టమర్లు ఇప్పుడు ఆశించేది వేగం, స్పష్టత మరియు సులభంగా వాడగలిగే అనుభవం. ఈ సంవత్సరం మేము ఎక్కువగా చూస్తున్న ట్రెండ్‌లు ఇవే.\n\n## 1. మినిమలిజం — తక్కువే ఎక్కువ\nఅనవసరమైన అలంకరణలు తగ్గించి, ముఖ్యమైన సమాచారాన్ని మాత్రమే స్పష్టంగా చూపించడం. ఎక్కువ ఖాళీ స్థలం, పెద్ద అక్షరాలు, ఒక్కో విభాగంలో ఒకే ముఖ్య సందేశం — కస్టమర్ ఏం చేయాలో వెంటనే అర్థమవుతుంది.\n\n## 2. డార్క్ మోడ్\nరాత్రిపూట ఫోన్ చూసేవారి కళ్లకు డార్క్ మోడ్ హాయిగా ఉంటుంది. చాలా మంది ఫోన్‌లో డార్క్ మోడ్ వాడుతున్నారు, కాబట్టి వెబ్‌సైట్ కూడా ఆ సెట్టింగ్‌కు తగ్గట్టు మారితే మంచి అనుభవం ఇస్తుంది. ఈ వెబ్‌సైట్ కూడా అలాగే పనిచేస్తుంది — పైన ఉన్న బటన్‌తో ప్రయత్నించి చూడండి!\n\n## 3. AI సహాయంతో డిజైన్\nచిత్రాలు, బ్యానర్లు, కంటెంట్ డ్రాఫ్ట్‌లు — AI టూల్స్ సహాయంతో ఇప్పుడు చాలా వేగంగా తయారవుతున్నాయి. కానీ మీ బ్రాండ్‌కు తగిన రంగులు, భావం మరియు మన స్థానిక సంస్కృతిని జోడించేది మనిషి సృజనాత్మకతే. **AI వేగం + డిజైనర్ అనుభవం = ఉత్తమ ఫలితం.**\n\n## 4. మాతృభాషలో వెబ్‌సైట్లు\nతెలుగు కస్టమర్లతో తెలుగులోనే మాట్లాడితే నమ్మకం పెరుగుతుంది. తెలుగు మరియు ఇంగ్లీష్ రెండింటిలో ఉండే వెబ్‌సైట్ ఎక్కువ మందిని చేరుతుంది.\n\n## 5. WhatsApp తో నేరుగా సంప్రదింపు\nపెద్ద ఫారాలు నింపడం ఎవరికీ ఇష్టం ఉండదు. ఒక్క ట్యాప్‌తో WhatsApp లో మెసేజ్ పంపే బటన్ ఉంటే, ఎక్కువ మంది కస్టమర్లు మిమ్మల్ని సంప్రదిస్తారు.\n\nమీ వెబ్‌సైట్‌ను ఈ ట్రెండ్‌లకు తగ్గట్టు మార్చాలనుకుంటున్నారా? ఉచిత కన్సల్టేషన్ కోసం మాకు WhatsApp చేయండి.",
          "en": "A website is no longer just an online visiting card — it's a showroom for your business that never closes. Today's customers expect speed, clarity and an experience that's easy to use. These are the trends we're seeing most this year.\n\n## 1. Minimalism — less is more\nCut the unnecessary decoration and show only the important information, clearly. More white space, bigger text and one key message per section, so customers understand straight away what to do.\n\n## 2. Dark mode\nDark mode is easier on the eyes for people browsing at night. Many people now use dark mode on their phones, so a website that follows that setting feels more comfortable. This website works that way too — try the button at the top!\n\n## 3. AI-assisted design\nImages, banners and first drafts of content can now be made much faster with AI tools. But it's human creativity that adds the right colours, feeling and local culture for your brand. **AI speed + designer experience = the best result.**\n\n## 4. Websites in your mother tongue\nSpeaking to Telugu customers in Telugu builds trust. A website in both Telugu and English reaches more people.\n\n## 5. Direct contact on WhatsApp\nNobody enjoys filling in long forms. A one-tap button that opens WhatsApp gets far more customers to reach out to you.\n\nWant to bring your website up to date with these trends? WhatsApp us for a free consultation."
        }
      },
      {
        "id": "seo-friendly-website-tips",
        "show": true,
        "date": "2026-09-27",
        "icon": "search",
        "color": "olivegold",
        "cover": "",
        "title": {
          "te": "SEO ఫ్రెండ్లీ వెబ్‌సైట్ ఎలా తయారు చేయాలి?",
          "en": "How to Build an SEO-Friendly Website"
        },
        "excerpt": {
          "te": "గూగుల్ ర్యాంకింగ్ కోసం అవసరమైన 10 ముఖ్యమైన చిట్కాలు మరియు వ్యూహాలు.",
          "en": "10 essential tips and strategies for ranking on Google."
        },
        "body": {
          "te": "మీ వెబ్‌సైట్ ఎంత అందంగా ఉన్నా, గూగుల్‌లో కనిపించకపోతే కస్టమర్లు దాన్ని చేరలేరు. SEO (సెర్చ్ ఇంజిన్ ఆప్టిమైజేషన్) అంటే మీ వెబ్‌సైట్‌ను గూగుల్‌కు సులభంగా అర్థమయ్యేలా, కస్టమర్లకు ఉపయోగపడేలా తయారు చేయడం. ఇవిగో 10 ముఖ్యమైన చిట్కాలు.\n\n1. **సరైన కీవర్డ్‌లు ఎంచుకోండి** — మీ కస్టమర్లు గూగుల్‌లో ఏం వెతుకుతారో ఆలోచించండి. ఉదా: \"వెంకటగిరిలో లోగో డిజైనర్\".\n2. **ప్రతి పేజీకి స్పష్టమైన టైటిల్ మరియు వివరణ** — సెర్చ్ ఫలితాల్లో కనిపించేది ఇదే.\n3. **మొబైల్‌లో చక్కగా కనిపించాలి** — గూగుల్ మొదట చూసేది మీ వెబ్‌సైట్ మొబైల్ వెర్షన్‌నే.\n4. **వేగంగా లోడ్ అవ్వాలి** — నెమ్మదిగా ఉండే పేజీలను కస్టమర్లు, గూగుల్ రెండూ ఇష్టపడవు.\n5. **హెడింగ్‌లు సరిగ్గా వాడండి** — పేజీకి ఒక ముఖ్య శీర్షిక, తర్వాత చిన్న ఉపశీర్షికలు.\n6. **ఫోటోలకు వివరణ (alt text) రాయండి** — ఫోటోలో ఏముందో గూగుల్‌కు అర్థమవుతుంది.\n7. **ఉపయోగకరమైన, సొంత కంటెంట్** — కాపీ చేసిన మాటలు కాకుండా, మీ అనుభవంతో రాసిన వ్యాసాలు రెగ్యులర్‌గా పెట్టండి.\n8. **గూగుల్ బిజినెస్ ప్రొఫైల్ సెటప్ చేయండి** — \"నా దగ్గర్లో\" (near me) వెతికేవారికి మీ వ్యాపారం మ్యాప్‌లో కనిపిస్తుంది.\n9. **సురక్షిత కనెక్షన్ (HTTPS)** — అడ్రస్ బార్‌లో తాళం గుర్తు కస్టమర్‌కు నమ్మకం ఇస్తుంది.\n10. **లింకులు మరియు షేర్లు** — నమ్మకమైన ఇతర వెబ్‌సైట్లు, సోషల్ మీడియాలో మీ లింక్ షేర్ అయితే గూగుల్ దృష్టిలో మీ విలువ పెరుగుతుంది.\n\nSEO ఒక్క రోజులో వచ్చే ఫలితం కాదు — కానీ సరైన పునాది వేస్తే, నెలలు గడిచే కొద్దీ కస్టమర్లు మిమ్మల్ని వెతుక్కుంటూ వస్తారు. మీ వెబ్‌సైట్ SEO ఎలా ఉందో ఉచితంగా చెక్ చేయించుకోవాలంటే మాకు WhatsApp చేయండి.",
          "en": "However beautiful your website is, customers can't reach it if it doesn't show up on Google. SEO (Search Engine Optimization) means making your website easy for Google to understand and genuinely useful for customers. Here are 10 key tips.\n\n1. **Choose the right keywords** — think about what your customers type into Google. For example: \"logo designer in Venkatagiri\".\n2. **A clear title and description for every page** — this is what shows up in search results.\n3. **Look good on mobile** — Google looks at the mobile version of your website first.\n4. **Load fast** — neither customers nor Google like slow pages.\n5. **Use headings properly** — one main heading per page, then smaller subheadings.\n6. **Describe your photos (alt text)** — it helps Google understand what's in each image.\n7. **Useful, original content** — publish articles from your own experience regularly, not copied text.\n8. **Set up a Google Business Profile** — people searching \"near me\" will see your business on the map.\n9. **A secure connection (HTTPS)** — the padlock in the address bar builds customer trust.\n10. **Links and shares** — when trusted websites and social media link to you, your value in Google's eyes grows.\n\nSEO doesn't pay off in a day — but with the right foundation, customers will find you more and more as the months go by. WhatsApp us for a free check of your website's SEO."
        }
      },
      {
        "id": "why-mobile-first-design",
        "show": true,
        "date": "2026-09-27",
        "icon": "smartphone",
        "color": "gold",
        "cover": "",
        "title": {
          "te": "మొబైల్-ఫస్ట్ డిజైన్ ఎందుకు ముఖ్యం?",
          "en": "Why Mobile-First Design Matters"
        },
        "excerpt": {
          "te": "భారతదేశంలో 80% ఇంటర్నెట్ వినియోగం మొబైల్ నుండి — మీ వెబ్‌సైట్ సిద్ధంగా ఉందా?",
          "en": "Around 80% of internet use in India happens on mobile — is your website ready?"
        },
        "body": {
          "te": "మీ కస్టమర్ మీ వెబ్‌సైట్‌ను మొదటిసారి ఎక్కడ చూస్తారు? చాలా సార్లు — బస్సులో, షాపులో, ఇంట్లో సోఫాలో కూర్చుని — ఫోన్‌లోనే. భారతదేశంలో ఎక్కువ శాతం ఇంటర్నెట్ వినియోగం మొబైల్ నుండే జరుగుతుంది. అందుకే \"మొబైల్-ఫస్ట్\" డిజైన్.\n\n## మొబైల్-ఫస్ట్ అంటే ఏమిటి?\nవెబ్‌సైట్‌ను ముందు చిన్న ఫోన్ స్క్రీన్ కోసం డిజైన్ చేసి, ఆ తర్వాత టాబ్లెట్, కంప్యూటర్ కోసం పెద్దది చేయడం. పెద్ద స్క్రీన్ డిజైన్‌ను ఫోన్‌లో కుదించడం కాదు — ఫోన్‌నే ప్రధానంగా భావించడం.\n\n## ఎందుకు ముఖ్యం?\n- **కస్టమర్లు ఫోన్‌లోనే ఉన్నారు** — ఫోన్‌లో సరిగ్గా కనిపించకపోతే, వారు వెంటనే వెనక్కి వెళ్ళిపోతారు.\n- **గూగుల్ ర్యాంకింగ్** — గూగుల్ మీ వెబ్‌సైట్ మొబైల్ వెర్షన్‌ను చూసే ర్యాంక్ ఇస్తుంది.\n- **మొబైల్ డేటాలో వేగం** — తేలికైన పేజీలు తక్కువ డేటాతో వేగంగా తెరుచుకుంటాయి.\n- **ఎక్కువ ఎంక్వైరీలు** — ఒక్క ట్యాప్‌తో కాల్ లేదా WhatsApp చేయగలిగితే, కస్టమర్ సంప్రదించే అవకాశం పెరుగుతుంది.\n\n## మీ వెబ్‌సైట్‌ను ఇలా చెక్ చేసుకోండి\n- ఫోన్‌లో అక్షరాలు జూమ్ చేయకుండానే చదవగలుగుతున్నారా?\n- బటన్‌లు వేలితో సులభంగా నొక్కగలిగేంత పెద్దగా ఉన్నాయా?\n- ఫోటోలు స్క్రీన్‌కు సరిపోతున్నాయా, పక్కకు స్క్రోల్ చేయాల్సి వస్తోందా?\n- ఫోన్ నంబర్ నొక్కితే నేరుగా కాల్ వెళ్తుందా?\n\nఏ ఒక్క ప్రశ్నకైనా \"లేదు\" అని సమాధానం వస్తే, మీ వెబ్‌సైట్‌కు మొబైల్ మేకోవర్ అవసరం. మేము సహాయం చేస్తాం!",
          "en": "Where does a customer first see your website? Most of the time — on the bus, in a shop, sitting on the sofa at home — on their phone. Most internet use in India happens on mobile. That's why \"mobile-first\" design matters.\n\n## What is mobile-first?\nDesigning a website for the small phone screen first, then expanding it for tablets and computers. Not squeezing a big-screen design onto a phone — treating the phone as the main screen.\n\n## Why it matters\n- **Your customers are on their phones** — if the site doesn't look right on a phone, they leave straight away.\n- **Google ranking** — Google ranks your website based on its mobile version.\n- **Speed on mobile data** — lighter pages open quickly and use less data.\n- **More enquiries** — when customers can call or WhatsApp you with one tap, they're far more likely to get in touch.\n\n## A quick check for your website\n- Can you read the text on a phone without zooming?\n- Are the buttons big enough to tap easily with a finger?\n- Do the photos fit the screen, or do you have to scroll sideways?\n- Does tapping the phone number start a call?\n\nIf the answer to any of these is \"no\", your website needs a mobile makeover. We can help!"
        }
      },
      {
        "id": "improve-website-speed",
        "show": true,
        "date": "2026-09-27",
        "icon": "zap",
        "color": "tan",
        "cover": "",
        "title": {
          "te": "వెబ్‌సైట్ వేగం ఎలా మెరుగుపరచాలి?",
          "en": "How to Make Your Website Faster"
        },
        "excerpt": {
          "te": "నెమ్మదిగా లోడ్ అయ్యే వెబ్‌సైట్ కస్టమర్లను కోల్పోతుంది. వేగం పెంచడానికి సులభమైన పద్ధతులు.",
          "en": "A slow website loses customers. Simple ways to speed it up."
        },
        "body": {
          "te": "పేజీ తెరుచుకోవడానికి ఎక్కువ సేపు పడితే, కస్టమర్ ఎదురు చూడరు — వెనక్కి వెళ్ళి పక్క వ్యాపారం వెబ్‌సైట్ తెరుస్తారు. శుభవార్త ఏమిటంటే, వేగం పెంచడానికి పెద్ద ఖర్చు అవసరం లేదు. ఈ సులభమైన పద్ధతులు పాటించండి.\n\n## 1. ఫోటోలను చిన్నవి చేయండి\nవెబ్‌సైట్ నెమ్మదికి అతి పెద్ద కారణం భారీ ఫోటోలు. ఫోన్ కెమెరా ఫోటో కొన్ని MB ఉంటుంది — వెబ్‌కు అంత అవసరం లేదు. సరైన సైజుకు కుదించి, JPEG లేదా WebP ఫార్మాట్‌లో పెట్టండి.\n\n## 2. కనిపించినప్పుడే లోడ్ (Lazy loading)\nపేజీ కింది భాగంలో ఉన్న ఫోటోలు, కస్టమర్ అక్కడికి స్క్రోల్ చేసినప్పుడే లోడ్ అయ్యేలా చేయండి. మొదటి స్క్రీన్ వేగంగా తెరుచుకుంటుంది.\n\n## 3. అనవసరమైన ప్లగిన్‌లు, స్క్రిప్ట్‌లు తీసేయండి\nవాడని ప్లగిన్‌లు, పాప్-అప్‌లు, ఎక్కువ ఫాంట్‌లు — ప్రతిదీ పేజీని బరువు చేస్తుంది. నిజంగా అవసరమైనవి మాత్రమే ఉంచండి.\n\n## 4. మంచి హోస్టింగ్ మరియు CDN\nవేగవంతమైన సర్వర్ మరియు CDN (కంటెంట్‌ను కస్టమర్‌కు దగ్గరి సర్వర్ నుండి అందించే సేవ) వల్ల పేజీ ఎక్కడైనా వేగంగా తెరుచుకుంటుంది.\n\n## 5. ఆటో-ప్లే వీడియోలు వద్దు\nపేజీ తెరవగానే ప్లే అయ్యే భారీ వీడియోలు మొబైల్ డేటాను ఖర్చు చేస్తాయి. వీడియోను YouTube లో పెట్టి, లింక్ లేదా చిన్న ప్రివ్యూ చూపించండి.\n\n## 6. వేగాన్ని కొలవండి\nగూగుల్ యొక్క ఉచిత \"PageSpeed Insights\" టూల్‌లో మీ వెబ్‌సైట్ అడ్రస్ ఇస్తే, ఏం మెరుగుపరచాలో అదే చెబుతుంది.\n\nవేగవంతమైన వెబ్‌సైట్ = సంతోషంగా ఉండే కస్టమర్లు + మెరుగైన గూగుల్ ర్యాంకింగ్. మీ వెబ్‌సైట్ వేగాన్ని చెక్ చేయాలంటే మాకు WhatsApp చేయండి.",
          "en": "If a page takes too long to open, customers won't wait — they'll go back and open a competitor's website. The good news: speeding up your site doesn't need a big budget. Follow these simple steps.\n\n## 1. Shrink your photos\nThe biggest cause of a slow website is heavy photos. A phone camera photo can be several MB — the web doesn't need that. Resize them to the right size and use JPEG or WebP.\n\n## 2. Load images only when needed (lazy loading)\nMake photos further down the page load only when the customer scrolls to them. The first screen opens much faster.\n\n## 3. Remove unnecessary plugins and scripts\nUnused plugins, pop-ups and too many fonts all make a page heavier. Keep only what you really need.\n\n## 4. Good hosting and a CDN\nA fast server and a CDN (a service that delivers your content from a server close to the customer) help the page open quickly anywhere.\n\n## 5. No auto-playing videos\nBig videos that start playing as soon as the page opens eat up mobile data. Put the video on YouTube and show a link or a small preview.\n\n## 6. Measure your speed\nEnter your website address in Google's free \"PageSpeed Insights\" tool and it will tell you exactly what to improve.\n\nA fast website = happy customers + better Google ranking. WhatsApp us if you'd like us to check your website's speed."
        }
      }
    ]
  },

  // ── FOOTER
  "footer": {
    "text": {
      "te": "© {year} గీతాంజలి డిజిటల్ వరల్డ్. అన్ని హక్కులు రిజర్వు చేయబడ్డాయి. | వెంకటగిరి, ఆంధ్రప్రదేశ్, భారతదేశం",
      "en": "© {year} Geethanjali Digital World. All rights reserved. | Venkatagiri, Andhra Pradesh, India"
    },
    "showSocial": true,
    "showMenu": true
  },

  // ── ICON LIBRARY — SVG shapes referenced by name elsewhere (e.g. "icon": "phone"). Emoji also work.
  "icons": {
    "brush": "<path d=\"M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3Z\"/><path d=\"M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7\"/><path d=\"M14.5 17.5 4.5 15\"/>",
    "smartphone": "<rect x=\"5\" y=\"2\" width=\"14\" height=\"20\" rx=\"2\"/><path d=\"M12 18h.01\"/>",
    "cart": "<circle cx=\"8\" cy=\"21\" r=\"1\"/><circle cx=\"19\" cy=\"21\" r=\"1\"/><path d=\"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12\"/>",
    "seo": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"m21 21-4.3-4.3\"/><path d=\"m7.5 13 2.2-2.2 1.8 1.8 3-3\"/>",
    "search": "<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>",
    "phone": "<path d=\"M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z\"/>",
    "mail": "<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m22 7-10 6L2 7\"/>",
    "whatsapp": "<path fill=\"currentColor\" stroke=\"none\" d=\"M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35M12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.45h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z\"/>",
    "instagram": "<rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"5\"/><circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M17.5 6.5h.01\"/>",
    "facebook": "<path d=\"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z\"/>",
    "youtube": "<path d=\"M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17\"/><path d=\"m10 15 5-3-5-3z\"/>",
    "map-pin": "<path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
    "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41\"/>",
    "moon": "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z\"/>",
    "menu": "<path d=\"M4 6h16M4 12h16M4 18h16\"/>",
    "close": "<path d=\"M18 6 6 18M6 6l12 12\"/>",
    "arrow-right": "<path d=\"M5 12h14M12 5l7 7-7 7\"/>",
    "arrow-left": "<path d=\"M19 12H5M12 19l-7-7 7-7\"/>",
    "chevron-left": "<path d=\"m15 18-6-6 6-6\"/>",
    "chevron-right": "<path d=\"m9 18 6-6-6-6\"/>",
    "check": "<path d=\"M20 6 9 17l-5-5\"/>",
    "external": "<path d=\"M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"/>",
    "globe": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"/>",
    "palette": "<circle cx=\"13.5\" cy=\"6.5\" r=\"1\" fill=\"currentColor\"/><circle cx=\"17.5\" cy=\"10.5\" r=\"1\" fill=\"currentColor\"/><circle cx=\"8.5\" cy=\"7.5\" r=\"1\" fill=\"currentColor\"/><circle cx=\"6.5\" cy=\"12.5\" r=\"1\" fill=\"currentColor\"/><path d=\"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.55-2.5 5.55-5.55C21.97 6.01 17.46 2 12 2Z\"/>",
    "image": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15-3.09-3.09a2 2 0 0 0-2.82 0L6 21\"/>",
    "layout": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M3 9h18M9 21V9\"/>",
    "sparkle": "<path d=\"M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z\"/>",
    "zap": "<path d=\"M13 2 3 14h9l-1 8 10-12h-9l1-8z\"/>",
    "calendar": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M16 2v4M8 2v4M3 10h18\"/>",
    "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/>",
    "user": "<circle cx=\"12\" cy=\"8\" r=\"4\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/>",
    "tag": "<path d=\"M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l8.59-8.59a1 1 0 0 0 0-1.41z\"/><circle cx=\"7\" cy=\"7\" r=\"1.5\"/>",
    "gift": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"4\" rx=\"1\"/><path d=\"M12 8v13M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7M7.5 8a2.5 2.5 0 0 1 0-5C10 3 12 8 12 8s2-5 4.5-5a2.5 2.5 0 0 1 0 5\"/>",
    "message": "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/>",
    "note": "<path d=\"M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5z\"/><path d=\"M15 3v6h6\"/>",
    "star": "<path d=\"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z\"/>",
    "heart": "<path d=\"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\"/>",
    "video": "<path d=\"m22 8-6 4 6 4V8Z\"/><rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2\"/>",
    "music": "<path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/>",
    "printer": "<path d=\"M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\"/>",
    "trending-up": "<path d=\"m22 7-8.5 8.5-5-5L2 17\"/><path d=\"M16 7h6v6\"/>"
  }
};
