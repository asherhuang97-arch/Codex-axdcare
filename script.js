const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".main-nav");
const forms = document.querySelectorAll("form");
const INQUIRY_ENDPOINT = "";
const DEFAULT_LANGUAGE = "en";
let currentLanguage = localStorage.getItem("axdcareLanguage") || DEFAULT_LANGUAGE;

const translations = {
  en: {
    "utility.global": "Global - English",
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.oem": "OEM/ODM",
    "nav.quality": "Quality",
    "nav.about": "About AXDCARE",
    "nav.resources": "Resources",
    "nav.support": "Support",
    "nav.contact": "Contact",
    "nav.inquiry": "Inquiry",
    "cta.quote": "Get a Quote",
    "cta.catalog": "Download Catalog",
    "cta.sales": "Talk to Sales",
    "home.hero.title": "OEM/ODM Home Medical Device Manufacturer",
    "home.hero.subtitle": "Blood Pressure Monitors, Nebulizers & Thermometers",
    "home.categories.title": "Home Health Care Solutions",
    "home.categories.subtitle": "Product categories for family care, pharmacy retail and professional distribution channels.",
    "home.family.title": "Home Health Care Solutions For Every Family",
    "home.family.text": "AXDCARE develops home medical device programs for brands and distributors who need dependable products, clear specifications and market-ready customization.",
    "home.about.title": "Trusted Manufacturing Partner Since 2006",
    "home.about.text": "Shenzhen AXD Electronic Co., Ltd. supports pharmacy chains, distributors, healthcare brands and e-commerce buyers with OEM/ODM product development, quality control and export-ready manufacturing.",
    "home.featured.title": "Featured Products",
    "home.featured.subtitle": "Procurement-friendly product blocks for RFQ, specification review and catalog download.",
    "home.process.title": "OEM/ODM Process",
    "home.process.subtitle": "Clear collaboration from initial requirements to brand-ready mass production.",
    "home.buyers.title": "Built For Professional Buyers",
    "home.buyers.subtitle": "Every page is structured for B2B procurement decisions and qualified inquiry capture.",
    "home.resources.title": "SEO & Buyer Resources",
    "home.resources.subtitle": "Content topics prepared for organic search, AI answers and paid landing page expansion.",
    "home.location.eyebrow": "Factory Location",
    "home.location.title": "Visit AXDCARE In Shenzhen, China",
    "home.location.text": "Shenzhen AXD Electronic Co., Ltd. is located in Bao'an District, Shenzhen, close to one of South China's mature electronics and medical device manufacturing supply chains.",
    "home.final.title": "Start Your AXDCARE OEM/ODM Project",
    "home.final.text": "Send your product category, target market, quantity and customization requirements. The sales team will contact you soon.",
    "form.quickTitle": "Request a Quote",
    "form.submit": "Submit Request",
    "inquiry.eyebrow": "Qualified B2B Inquiry",
    "inquiry.title": "Tell Us Your OEM/ODM Medical Device Requirements",
    "inquiry.subtitle": "Submit your company details, target market and customization needs. AXDCARE will review your inquiry and prepare a manufacturer-level response for distributors, importers, brand owners and pharmacy chains.",
    "inquiry.proof.oem": "OEM/ODM Manufacturer",
    "inquiry.proof.private": "Private Label Support",
    "inquiry.proof.global": "Global Export Buyers",
    "inquiry.formTitle": "Request OEM Quote",
    "inquiry.requiredNote": "Fields marked",
    "inquiry.requiredNoteAfter": "are required.",
    "inquiry.fields.fullName": "Full Name",
    "inquiry.fields.email": "Email Address",
    "inquiry.fields.phone": "Phone / WhatsApp",
    "inquiry.fields.company": "Company Name",
    "inquiry.fields.targetMarket": "Target Market",
    "inquiry.fields.service": "Required Service",
    "inquiry.fields.companyType": "Company Type",
    "inquiry.fields.project": "Project Details",
    "inquiry.placeholders.fullName": "Your full name",
    "inquiry.placeholders.email": "name@company.com",
    "inquiry.placeholders.phone": "+971 / +966 / +234 ...",
    "inquiry.placeholders.company": "Your company name",
    "inquiry.placeholders.project": "Example: We need 3,000 pcs/month upper arm blood pressure monitors with logo printing and custom retail box for UAE market.",
    "inquiry.options.targetMarket": "Please select target market",
    "inquiry.options.service": "Please select required service",
    "inquiry.options.companyType": "Please select company type",
    "inquiry.hints.targetMarket": "Optional, but helpful for certification and shipping advice.",
    "inquiry.hints.service": "Optional. Select the closest service if known.",
    "inquiry.hints.companyType": "Optional. Helps us qualify the right sales workflow.",
    "inquiry.hints.project": "Share product interest, volume, timeline, packaging or certification needs.",
    "inquiry.confirm": "I confirm this is a business inquiry for OEM/ODM medical devices.",
    "inquiry.submit": "Submit Inquiry",
    "inquiry.submitting": "Submitting...",
    "inquiry.errors.fullName": "Please enter your full name.",
    "inquiry.errors.email": "Please enter a valid business email address.",
    "inquiry.errors.phone": "Please enter your phone or WhatsApp number.",
    "inquiry.errors.company": "Please enter your company name.",
    "inquiry.errors.confirm": "Please confirm this is a business inquiry.",
    "form.status.required": "Please complete all required fields before submitting.",
    "form.status.success": "Submitted successfully. Our sales team will contact you soon.",
    "form.status.failed": "Submission failed. Please email Snow@axdcare.com or try again.",
    "form.status.blocked": "Submission blocked by anti-spam protection."
  },
  ar: {
    "utility.global": "عالمي - العربية",
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.oem": "OEM/ODM",
    "nav.quality": "الجودة",
    "nav.about": "عن AXDCARE",
    "nav.resources": "الموارد",
    "nav.support": "الدعم",
    "nav.contact": "تواصل معنا",
    "nav.inquiry": "طلب عرض",
    "cta.quote": "اطلب عرض سعر",
    "cta.catalog": "تحميل الكتالوج",
    "cta.sales": "تواصل مع المبيعات",
    "home.hero.title": "مصنع OEM/ODM لأجهزة الرعاية الصحية المنزلية",
    "home.hero.subtitle": "أجهزة قياس ضغط الدم، أجهزة التبخير، وموازين الحرارة",
    "home.categories.title": "حلول الرعاية الصحية المنزلية",
    "home.categories.subtitle": "فئات منتجات لقنوات الرعاية المنزلية والصيدليات والتوزيع المهني.",
    "home.family.title": "حلول رعاية صحية منزلية لكل عائلة",
    "home.family.text": "تطور AXDCARE برامج أجهزة طبية منزلية للعلامات التجارية والموزعين الذين يحتاجون منتجات موثوقة ومواصفات واضحة وتخصيص جاهز للسوق.",
    "home.about.title": "شريك تصنيع موثوق منذ 2006",
    "home.about.text": "تدعم Shenzhen AXD Electronic Co., Ltd. سلاسل الصيدليات والموزعين والعلامات الصحية ومشتري التجارة الإلكترونية بتطوير OEM/ODM ومراقبة الجودة والتصنيع الجاهز للتصدير.",
    "home.featured.title": "منتجات مميزة",
    "home.featured.subtitle": "بطاقات منتجات مناسبة للمشتريات وطلب السعر ومراجعة المواصفات وتحميل الكتالوج.",
    "home.process.title": "عملية OEM/ODM",
    "home.process.subtitle": "تعاون واضح من المتطلبات الأولية إلى الإنتاج الجاهز للعلامة التجارية.",
    "home.buyers.title": "مصمم للمشترين المحترفين",
    "home.buyers.subtitle": "كل صفحة مصممة لدعم قرارات الشراء B2B وجمع الاستفسارات المؤهلة.",
    "home.resources.title": "موارد SEO والمشترين",
    "home.resources.subtitle": "موضوعات محتوى للبحث العضوي وإجابات الذكاء الاصطناعي وتوسيع صفحات الإعلانات.",
    "home.location.eyebrow": "موقع المصنع",
    "home.location.title": "زوروا AXDCARE في شنتشن، الصين",
    "home.location.text": "تقع Shenzhen AXD Electronic Co., Ltd. في منطقة باوآن، شنتشن، بالقرب من سلسلة توريد متطورة للإلكترونيات والأجهزة الطبية في جنوب الصين.",
    "home.final.title": "ابدأ مشروع AXDCARE OEM/ODM",
    "home.final.text": "أرسل فئة المنتج والسوق المستهدف والكمية ومتطلبات التخصيص. سيتواصل فريق المبيعات معك قريبًا.",
    "form.quickTitle": "طلب عرض سعر",
    "form.submit": "إرسال الطلب",
    "inquiry.eyebrow": "استفسار B2B مؤهل",
    "inquiry.title": "أخبرنا بمتطلبات أجهزة OEM/ODM الطبية",
    "inquiry.subtitle": "أرسل بيانات شركتك والسوق المستهدف واحتياجات التخصيص. ستراجع AXDCARE طلبك وتقدم ردًا مناسبًا للموزعين والمستوردين وأصحاب العلامات وسلاسل الصيدليات.",
    "inquiry.proof.oem": "مصنع OEM/ODM",
    "inquiry.proof.private": "دعم العلامة الخاصة",
    "inquiry.proof.global": "مشترون عالميون",
    "inquiry.formTitle": "طلب عرض OEM",
    "inquiry.requiredNote": "الحقول المميزة",
    "inquiry.requiredNoteAfter": "مطلوبة.",
    "inquiry.fields.fullName": "الاسم الكامل",
    "inquiry.fields.email": "البريد الإلكتروني",
    "inquiry.fields.phone": "الهاتف / واتساب",
    "inquiry.fields.company": "اسم الشركة",
    "inquiry.fields.targetMarket": "السوق المستهدف",
    "inquiry.fields.service": "الخدمة المطلوبة",
    "inquiry.fields.companyType": "نوع الشركة",
    "inquiry.fields.project": "تفاصيل المشروع",
    "inquiry.placeholders.fullName": "اكتب اسمك الكامل",
    "inquiry.placeholders.email": "name@company.com",
    "inquiry.placeholders.phone": "+971 / +966 / +234 ...",
    "inquiry.placeholders.company": "اسم شركتك",
    "inquiry.placeholders.project": "مثال: نحتاج 3,000 قطعة شهريًا مع طباعة الشعار وتغليف مخصص لسوق الإمارات.",
    "inquiry.options.targetMarket": "اختر السوق المستهدف",
    "inquiry.options.service": "اختر الخدمة المطلوبة",
    "inquiry.options.companyType": "اختر نوع الشركة",
    "inquiry.hints.targetMarket": "اختياري، لكنه يساعد في نصائح الشهادات والشحن.",
    "inquiry.hints.service": "اختياري. اختر أقرب خدمة إذا كانت معروفة.",
    "inquiry.hints.companyType": "اختياري. يساعدنا على تأهيل مسار المبيعات المناسب.",
    "inquiry.hints.project": "شارك المنتج والكمية والجدول الزمني والتغليف أو متطلبات الشهادات.",
    "inquiry.confirm": "أؤكد أن هذا استفسار تجاري لأجهزة OEM/ODM الطبية.",
    "inquiry.submit": "إرسال الاستفسار",
    "inquiry.submitting": "جارٍ الإرسال...",
    "inquiry.errors.fullName": "يرجى إدخال الاسم الكامل.",
    "inquiry.errors.email": "يرجى إدخال بريد إلكتروني تجاري صحيح.",
    "inquiry.errors.phone": "يرجى إدخال رقم الهاتف أو واتساب.",
    "inquiry.errors.company": "يرجى إدخال اسم الشركة.",
    "inquiry.errors.confirm": "يرجى تأكيد أن هذا استفسار تجاري.",
    "form.status.required": "يرجى إكمال جميع الحقول المطلوبة قبل الإرسال.",
    "form.status.success": "تم الإرسال بنجاح. سيتواصل فريق المبيعات معك قريبًا.",
    "form.status.failed": "فشل الإرسال. يرجى مراسلة Snow@axdcare.com أو المحاولة مرة أخرى.",
    "form.status.blocked": "تم حظر الإرسال بواسطة حماية مكافحة البريد العشوائي."
  },
  de: {
    "utility.global": "Global - Deutsch",
    "nav.home": "Startseite",
    "nav.products": "Produkte",
    "nav.oem": "OEM/ODM",
    "nav.quality": "Qualität",
    "nav.about": "Über AXDCARE",
    "nav.resources": "Ressourcen",
    "nav.support": "Support",
    "nav.contact": "Kontakt",
    "nav.inquiry": "Anfrage",
    "cta.quote": "Angebot anfordern",
    "cta.catalog": "Katalog herunterladen",
    "cta.sales": "Vertrieb kontaktieren",
    "home.hero.title": "OEM/ODM Hersteller für Home-Healthcare-Geräte",
    "home.hero.subtitle": "Blutdruckmessgeräte, Vernebler und Thermometer",
    "home.categories.title": "Home-Healthcare-Lösungen",
    "home.categories.subtitle": "Produktkategorien für häusliche Pflege, Apotheken und professionelle Vertriebskanäle.",
    "home.family.title": "Home-Healthcare-Lösungen für jede Familie",
    "home.family.text": "AXDCARE entwickelt Programme für medizinische Heimgeräte für Marken und Distributoren, die zuverlässige Produkte, klare Spezifikationen und marktreife Anpassung benötigen.",
    "home.about.title": "Verlässlicher Fertigungspartner seit 2006",
    "home.about.text": "Shenzhen AXD Electronic Co., Ltd. unterstützt Apothekenketten, Distributoren, Healthcare-Marken und E-Commerce-Käufer mit OEM/ODM-Entwicklung, Qualitätskontrolle und exportbereiter Fertigung.",
    "home.featured.title": "Ausgewählte Produkte",
    "home.featured.subtitle": "Beschaffungsfreundliche Produktblöcke für RFQ, Spezifikationsprüfung und Katalogdownload.",
    "home.process.title": "OEM/ODM Prozess",
    "home.process.subtitle": "Klare Zusammenarbeit von den ersten Anforderungen bis zur markenfertigen Serienproduktion.",
    "home.buyers.title": "Für professionelle Käufer entwickelt",
    "home.buyers.subtitle": "Jede Seite unterstützt B2B-Beschaffungsentscheidungen und qualifizierte Anfragen.",
    "home.resources.title": "SEO- und Käuferressourcen",
    "home.resources.subtitle": "Content-Themen für organische Suche, KI-Antworten und Landingpage-Ausbau.",
    "home.location.eyebrow": "Fabrikstandort",
    "home.location.title": "Besuchen Sie AXDCARE in Shenzhen, China",
    "home.location.text": "Shenzhen AXD Electronic Co., Ltd. befindet sich im Bezirk Bao'an in Shenzhen, nahe einer ausgereiften Elektronik- und Medizingeräte-Lieferkette in Südchina.",
    "home.final.title": "Starten Sie Ihr AXDCARE OEM/ODM Projekt",
    "home.final.text": "Senden Sie Produktkategorie, Zielmarkt, Menge und Anpassungsanforderungen. Unser Vertriebsteam meldet sich zeitnah.",
    "form.quickTitle": "Angebot anfordern",
    "form.submit": "Anfrage senden",
    "inquiry.eyebrow": "Qualifizierte B2B-Anfrage",
    "inquiry.title": "Teilen Sie uns Ihre OEM/ODM-Anforderungen mit",
    "inquiry.subtitle": "Senden Sie Firmendaten, Zielmarkt und Anpassungsbedarf. AXDCARE prüft Ihre Anfrage und erstellt eine herstellerorientierte Antwort für Distributoren, Importeure, Markeninhaber und Apothekenketten.",
    "inquiry.proof.oem": "OEM/ODM Hersteller",
    "inquiry.proof.private": "Private-Label Support",
    "inquiry.proof.global": "Globale Exportkäufer",
    "inquiry.formTitle": "OEM-Angebot anfordern",
    "inquiry.requiredNote": "Mit",
    "inquiry.requiredNoteAfter": "markierte Felder sind Pflichtfelder.",
    "inquiry.fields.fullName": "Vollständiger Name",
    "inquiry.fields.email": "E-Mail-Adresse",
    "inquiry.fields.phone": "Telefon / WhatsApp",
    "inquiry.fields.company": "Firmenname",
    "inquiry.fields.targetMarket": "Zielmarkt",
    "inquiry.fields.service": "Benötigter Service",
    "inquiry.fields.companyType": "Unternehmenstyp",
    "inquiry.fields.project": "Projektdetails",
    "inquiry.placeholders.fullName": "Ihr vollständiger Name",
    "inquiry.placeholders.email": "name@company.com",
    "inquiry.placeholders.phone": "+971 / +966 / +234 ...",
    "inquiry.placeholders.company": "Ihr Firmenname",
    "inquiry.placeholders.project": "Beispiel: Wir benötigen 3.000 Stück/Monat Oberarm-Blutdruckmessgeräte mit Logo und individueller Verpackung.",
    "inquiry.options.targetMarket": "Zielmarkt auswählen",
    "inquiry.options.service": "Service auswählen",
    "inquiry.options.companyType": "Unternehmenstyp auswählen",
    "inquiry.hints.targetMarket": "Optional, aber hilfreich für Zertifizierungs- und Versandberatung.",
    "inquiry.hints.service": "Optional. Wählen Sie den passenden Service, falls bekannt.",
    "inquiry.hints.companyType": "Optional. Hilft uns, den passenden Vertriebsprozess zu wählen.",
    "inquiry.hints.project": "Teilen Sie Produktinteresse, Menge, Zeitplan, Verpackung oder Zertifizierungsbedarf mit.",
    "inquiry.confirm": "Ich bestätige, dass dies eine geschäftliche Anfrage für OEM/ODM-Medizingeräte ist.",
    "inquiry.submit": "Anfrage absenden",
    "inquiry.submitting": "Wird gesendet...",
    "inquiry.errors.fullName": "Bitte geben Sie Ihren vollständigen Namen ein.",
    "inquiry.errors.email": "Bitte geben Sie eine gültige geschäftliche E-Mail-Adresse ein.",
    "inquiry.errors.phone": "Bitte geben Sie Telefon oder WhatsApp ein.",
    "inquiry.errors.company": "Bitte geben Sie den Firmennamen ein.",
    "inquiry.errors.confirm": "Bitte bestätigen Sie, dass dies eine geschäftliche Anfrage ist.",
    "form.status.required": "Bitte füllen Sie alle Pflichtfelder vor dem Absenden aus.",
    "form.status.success": "Erfolgreich gesendet. Unser Vertriebsteam meldet sich zeitnah.",
    "form.status.failed": "Senden fehlgeschlagen. Bitte schreiben Sie an Snow@axdcare.com oder versuchen Sie es erneut.",
    "form.status.blocked": "Übermittlung durch Anti-Spam-Schutz blockiert."
  },
  fr: {
    "utility.global": "Global - Français",
    "nav.home": "Accueil",
    "nav.products": "Produits",
    "nav.oem": "OEM/ODM",
    "nav.quality": "Qualité",
    "nav.about": "À propos d'AXDCARE",
    "nav.resources": "Ressources",
    "nav.support": "Support",
    "nav.contact": "Contact",
    "nav.inquiry": "Demande",
    "cta.quote": "Demander un devis",
    "cta.catalog": "Télécharger le catalogue",
    "cta.sales": "Contacter les ventes",
    "home.hero.title": "Fabricant OEM/ODM d'appareils médicaux à domicile",
    "home.hero.subtitle": "Tensiomètres, nébuliseurs et thermomètres",
    "home.categories.title": "Solutions de santé à domicile",
    "home.categories.subtitle": "Catégories de produits pour les soins familiaux, les pharmacies et les canaux professionnels.",
    "home.family.title": "Solutions de santé à domicile pour chaque famille",
    "home.family.text": "AXDCARE développe des programmes d'appareils médicaux à domicile pour les marques et distributeurs qui recherchent des produits fiables, des spécifications claires et une personnalisation prête pour le marché.",
    "home.about.title": "Partenaire de fabrication fiable depuis 2006",
    "home.about.text": "Shenzhen AXD Electronic Co., Ltd. accompagne les chaînes de pharmacies, distributeurs, marques de santé et acheteurs e-commerce avec le développement OEM/ODM, le contrôle qualité et la fabrication prête à l'export.",
    "home.featured.title": "Produits phares",
    "home.featured.subtitle": "Blocs produits adaptés aux achats pour RFQ, revue des spécifications et téléchargement du catalogue.",
    "home.process.title": "Processus OEM/ODM",
    "home.process.subtitle": "Collaboration claire des exigences initiales à la production de masse prête pour la marque.",
    "home.buyers.title": "Conçu pour les acheteurs professionnels",
    "home.buyers.subtitle": "Chaque page soutient les décisions d'achat B2B et la capture de demandes qualifiées.",
    "home.resources.title": "Ressources SEO et acheteurs",
    "home.resources.subtitle": "Sujets de contenu pour la recherche organique, les réponses IA et les pages publicitaires.",
    "home.location.eyebrow": "Localisation de l'usine",
    "home.location.title": "Visitez AXDCARE à Shenzhen, Chine",
    "home.location.text": "Shenzhen AXD Electronic Co., Ltd. est située dans le district de Bao'an à Shenzhen, près d'une chaîne d'approvisionnement mature en électronique et dispositifs médicaux du sud de la Chine.",
    "home.final.title": "Démarrez votre projet OEM/ODM AXDCARE",
    "home.final.text": "Envoyez la catégorie produit, le marché cible, la quantité et les besoins de personnalisation. Notre équipe commerciale vous contactera rapidement.",
    "form.quickTitle": "Demander un devis",
    "form.submit": "Envoyer la demande",
    "inquiry.eyebrow": "Demande B2B qualifiée",
    "inquiry.title": "Décrivez vos besoins OEM/ODM en dispositifs médicaux",
    "inquiry.subtitle": "Soumettez les informations de votre entreprise, votre marché cible et vos besoins de personnalisation. AXDCARE examinera votre demande et préparera une réponse fabricant pour distributeurs, importateurs, marques et chaînes de pharmacies.",
    "inquiry.proof.oem": "Fabricant OEM/ODM",
    "inquiry.proof.private": "Support marque privée",
    "inquiry.proof.global": "Acheteurs export mondiaux",
    "inquiry.formTitle": "Demander un devis OEM",
    "inquiry.requiredNote": "Les champs marqués",
    "inquiry.requiredNoteAfter": "sont obligatoires.",
    "inquiry.fields.fullName": "Nom complet",
    "inquiry.fields.email": "Adresse e-mail",
    "inquiry.fields.phone": "Téléphone / WhatsApp",
    "inquiry.fields.company": "Nom de l'entreprise",
    "inquiry.fields.targetMarket": "Marché cible",
    "inquiry.fields.service": "Service requis",
    "inquiry.fields.companyType": "Type d'entreprise",
    "inquiry.fields.project": "Détails du projet",
    "inquiry.placeholders.fullName": "Votre nom complet",
    "inquiry.placeholders.email": "name@company.com",
    "inquiry.placeholders.phone": "+971 / +966 / +234 ...",
    "inquiry.placeholders.company": "Nom de votre entreprise",
    "inquiry.placeholders.project": "Exemple : 3 000 pcs/mois de tensiomètres bras avec logo et boîte personnalisée pour le marché UAE.",
    "inquiry.options.targetMarket": "Sélectionner le marché cible",
    "inquiry.options.service": "Sélectionner le service",
    "inquiry.options.companyType": "Sélectionner le type d'entreprise",
    "inquiry.hints.targetMarket": "Optionnel, utile pour les conseils certification et expédition.",
    "inquiry.hints.service": "Optionnel. Sélectionnez le service le plus proche si connu.",
    "inquiry.hints.companyType": "Optionnel. Aide à qualifier le bon flux commercial.",
    "inquiry.hints.project": "Indiquez produit, volume, calendrier, emballage ou besoins de certification.",
    "inquiry.confirm": "Je confirme qu'il s'agit d'une demande commerciale pour dispositifs médicaux OEM/ODM.",
    "inquiry.submit": "Envoyer la demande",
    "inquiry.submitting": "Envoi...",
    "inquiry.errors.fullName": "Veuillez saisir votre nom complet.",
    "inquiry.errors.email": "Veuillez saisir une adresse e-mail professionnelle valide.",
    "inquiry.errors.phone": "Veuillez saisir votre téléphone ou WhatsApp.",
    "inquiry.errors.company": "Veuillez saisir le nom de l'entreprise.",
    "inquiry.errors.confirm": "Veuillez confirmer qu'il s'agit d'une demande commerciale.",
    "form.status.required": "Veuillez compléter tous les champs obligatoires avant l'envoi.",
    "form.status.success": "Envoyé avec succès. Notre équipe commerciale vous contactera bientôt.",
    "form.status.failed": "Échec de l'envoi. Veuillez écrire à Snow@axdcare.com ou réessayer.",
    "form.status.blocked": "Envoi bloqué par la protection anti-spam."
  },
  es: {
    "utility.global": "Global - Español",
    "nav.home": "Inicio",
    "nav.products": "Productos",
    "nav.oem": "OEM/ODM",
    "nav.quality": "Calidad",
    "nav.about": "Sobre AXDCARE",
    "nav.resources": "Recursos",
    "nav.support": "Soporte",
    "nav.contact": "Contacto",
    "nav.inquiry": "Consulta",
    "cta.quote": "Solicitar cotización",
    "cta.catalog": "Descargar catálogo",
    "cta.sales": "Hablar con ventas",
    "home.hero.title": "Fabricante OEM/ODM de dispositivos médicos para el hogar",
    "home.hero.subtitle": "Tensiómetros, nebulizadores y termómetros",
    "home.categories.title": "Soluciones de salud en el hogar",
    "home.categories.subtitle": "Categorías de productos para cuidado familiar, farmacias y canales de distribución profesional.",
    "home.family.title": "Soluciones de salud para cada familia",
    "home.family.text": "AXDCARE desarrolla programas de dispositivos médicos para marcas y distribuidores que necesitan productos confiables, especificaciones claras y personalización lista para el mercado.",
    "home.about.title": "Socio de fabricación confiable desde 2006",
    "home.about.text": "Shenzhen AXD Electronic Co., Ltd. apoya a cadenas de farmacias, distribuidores, marcas de salud y compradores e-commerce con desarrollo OEM/ODM, control de calidad y fabricación lista para exportación.",
    "home.featured.title": "Productos destacados",
    "home.featured.subtitle": "Bloques de producto orientados a compras para RFQ, revisión de especificaciones y descarga de catálogo.",
    "home.process.title": "Proceso OEM/ODM",
    "home.process.subtitle": "Colaboración clara desde los requisitos iniciales hasta la producción masiva lista para marca.",
    "home.buyers.title": "Diseñado para compradores profesionales",
    "home.buyers.subtitle": "Cada página está estructurada para decisiones B2B y captura de consultas calificadas.",
    "home.resources.title": "Recursos SEO y para compradores",
    "home.resources.subtitle": "Temas de contenido para búsqueda orgánica, respuestas IA y expansión de landing pages.",
    "home.location.eyebrow": "Ubicación de fábrica",
    "home.location.title": "Visite AXDCARE en Shenzhen, China",
    "home.location.text": "Shenzhen AXD Electronic Co., Ltd. se encuentra en el distrito Bao'an de Shenzhen, cerca de una cadena madura de suministro de electrónica y dispositivos médicos del sur de China.",
    "home.final.title": "Inicie su proyecto OEM/ODM AXDCARE",
    "home.final.text": "Envíe la categoría de producto, mercado objetivo, cantidad y requisitos de personalización. El equipo de ventas le contactará pronto.",
    "form.quickTitle": "Solicitar cotización",
    "form.submit": "Enviar solicitud",
    "inquiry.eyebrow": "Consulta B2B calificada",
    "inquiry.title": "Cuéntenos sus requisitos OEM/ODM",
    "inquiry.subtitle": "Envíe los datos de su empresa, mercado objetivo y necesidades de personalización. AXDCARE revisará su consulta y preparará una respuesta de fabricante para distribuidores, importadores, marcas y cadenas de farmacias.",
    "inquiry.proof.oem": "Fabricante OEM/ODM",
    "inquiry.proof.private": "Soporte marca privada",
    "inquiry.proof.global": "Compradores globales",
    "inquiry.formTitle": "Solicitar cotización OEM",
    "inquiry.requiredNote": "Los campos marcados",
    "inquiry.requiredNoteAfter": "son obligatorios.",
    "inquiry.fields.fullName": "Nombre completo",
    "inquiry.fields.email": "Correo electrónico",
    "inquiry.fields.phone": "Teléfono / WhatsApp",
    "inquiry.fields.company": "Nombre de la empresa",
    "inquiry.fields.targetMarket": "Mercado objetivo",
    "inquiry.fields.service": "Servicio requerido",
    "inquiry.fields.companyType": "Tipo de empresa",
    "inquiry.fields.project": "Detalles del proyecto",
    "inquiry.placeholders.fullName": "Su nombre completo",
    "inquiry.placeholders.email": "name@company.com",
    "inquiry.placeholders.phone": "+971 / +966 / +234 ...",
    "inquiry.placeholders.company": "Nombre de su empresa",
    "inquiry.placeholders.project": "Ejemplo: necesitamos 3.000 pcs/mes de tensiómetros de brazo con logo y caja personalizada para UAE.",
    "inquiry.options.targetMarket": "Seleccione mercado objetivo",
    "inquiry.options.service": "Seleccione servicio requerido",
    "inquiry.options.companyType": "Seleccione tipo de empresa",
    "inquiry.hints.targetMarket": "Opcional, útil para certificación y envío.",
    "inquiry.hints.service": "Opcional. Seleccione el servicio más cercano si lo conoce.",
    "inquiry.hints.companyType": "Opcional. Ayuda a calificar el flujo de ventas correcto.",
    "inquiry.hints.project": "Comparta producto, volumen, plazo, empaque o necesidades de certificación.",
    "inquiry.confirm": "Confirmo que esta es una consulta comercial para dispositivos médicos OEM/ODM.",
    "inquiry.submit": "Enviar consulta",
    "inquiry.submitting": "Enviando...",
    "inquiry.errors.fullName": "Ingrese su nombre completo.",
    "inquiry.errors.email": "Ingrese un correo electrónico empresarial válido.",
    "inquiry.errors.phone": "Ingrese su teléfono o WhatsApp.",
    "inquiry.errors.company": "Ingrese el nombre de la empresa.",
    "inquiry.errors.confirm": "Confirme que esta es una consulta comercial.",
    "form.status.required": "Complete todos los campos obligatorios antes de enviar.",
    "form.status.success": "Enviado correctamente. Nuestro equipo de ventas le contactará pronto.",
    "form.status.failed": "Error al enviar. Escriba a Snow@axdcare.com o inténtelo de nuevo.",
    "form.status.blocked": "Envío bloqueado por protección anti-spam."
  },
  pt: {
    "utility.global": "Global - Português",
    "nav.home": "Início",
    "nav.products": "Produtos",
    "nav.oem": "OEM/ODM",
    "nav.quality": "Qualidade",
    "nav.about": "Sobre a AXDCARE",
    "nav.resources": "Recursos",
    "nav.support": "Suporte",
    "nav.contact": "Contato",
    "nav.inquiry": "Consulta",
    "cta.quote": "Solicitar cotação",
    "cta.catalog": "Baixar catálogo",
    "cta.sales": "Falar com vendas",
    "home.hero.title": "Fabricante OEM/ODM de dispositivos médicos domiciliares",
    "home.hero.subtitle": "Medidores de pressão, nebulizadores e termômetros",
    "home.categories.title": "Soluções de saúde domiciliar",
    "home.categories.subtitle": "Categorias de produtos para cuidado familiar, farmácias e canais profissionais.",
    "home.family.title": "Soluções de saúde domiciliar para cada família",
    "home.family.text": "A AXDCARE desenvolve programas de dispositivos médicos para marcas e distribuidores que precisam de produtos confiáveis, especificações claras e personalização pronta para o mercado.",
    "home.about.title": "Parceiro de fabricação confiável desde 2006",
    "home.about.text": "A Shenzhen AXD Electronic Co., Ltd. apoia redes de farmácias, distribuidores, marcas de saúde e compradores e-commerce com desenvolvimento OEM/ODM, controle de qualidade e fabricação pronta para exportação.",
    "home.featured.title": "Produtos em destaque",
    "home.featured.subtitle": "Blocos de produto para RFQ, revisão de especificações e download de catálogo.",
    "home.process.title": "Processo OEM/ODM",
    "home.process.subtitle": "Colaboração clara dos requisitos iniciais à produção em massa pronta para a marca.",
    "home.buyers.title": "Criado para compradores profissionais",
    "home.buyers.subtitle": "Cada página apoia decisões de compra B2B e captura de consultas qualificadas.",
    "home.resources.title": "Recursos de SEO e compradores",
    "home.resources.subtitle": "Temas de conteúdo para busca orgânica, respostas de IA e expansão de landing pages.",
    "home.location.eyebrow": "Localização da fábrica",
    "home.location.title": "Visite a AXDCARE em Shenzhen, China",
    "home.location.text": "A Shenzhen AXD Electronic Co., Ltd. está localizada no distrito de Bao'an, Shenzhen, próxima a uma cadeia madura de suprimentos de eletrônicos e dispositivos médicos do sul da China.",
    "home.final.title": "Inicie seu projeto OEM/ODM AXDCARE",
    "home.final.text": "Envie categoria do produto, mercado-alvo, quantidade e requisitos de personalização. A equipe de vendas entrará em contato em breve.",
    "form.quickTitle": "Solicitar cotação",
    "form.submit": "Enviar solicitação",
    "inquiry.eyebrow": "Consulta B2B qualificada",
    "inquiry.title": "Informe seus requisitos OEM/ODM",
    "inquiry.subtitle": "Envie os dados da sua empresa, mercado-alvo e necessidades de personalização. A AXDCARE analisará sua consulta e preparará uma resposta de fabricante para distribuidores, importadores, marcas e redes de farmácias.",
    "inquiry.proof.oem": "Fabricante OEM/ODM",
    "inquiry.proof.private": "Suporte private label",
    "inquiry.proof.global": "Compradores globais",
    "inquiry.formTitle": "Solicitar cotação OEM",
    "inquiry.requiredNote": "Campos marcados",
    "inquiry.requiredNoteAfter": "são obrigatórios.",
    "inquiry.fields.fullName": "Nome completo",
    "inquiry.fields.email": "Endereço de e-mail",
    "inquiry.fields.phone": "Telefone / WhatsApp",
    "inquiry.fields.company": "Nome da empresa",
    "inquiry.fields.targetMarket": "Mercado-alvo",
    "inquiry.fields.service": "Serviço necessário",
    "inquiry.fields.companyType": "Tipo de empresa",
    "inquiry.fields.project": "Detalhes do projeto",
    "inquiry.placeholders.fullName": "Seu nome completo",
    "inquiry.placeholders.email": "name@company.com",
    "inquiry.placeholders.phone": "+971 / +966 / +234 ...",
    "inquiry.placeholders.company": "Nome da sua empresa",
    "inquiry.placeholders.project": "Exemplo: precisamos de 3.000 un/mês de medidores de pressão de braço com logo e caixa personalizada para UAE.",
    "inquiry.options.targetMarket": "Selecione o mercado-alvo",
    "inquiry.options.service": "Selecione o serviço",
    "inquiry.options.companyType": "Selecione o tipo de empresa",
    "inquiry.hints.targetMarket": "Opcional, mas útil para certificação e envio.",
    "inquiry.hints.service": "Opcional. Selecione o serviço mais próximo, se souber.",
    "inquiry.hints.companyType": "Opcional. Ajuda a qualificar o fluxo comercial correto.",
    "inquiry.hints.project": "Compartilhe produto, volume, prazo, embalagem ou necessidades de certificação.",
    "inquiry.confirm": "Confirmo que esta é uma consulta comercial para dispositivos médicos OEM/ODM.",
    "inquiry.submit": "Enviar consulta",
    "inquiry.submitting": "Enviando...",
    "inquiry.errors.fullName": "Insira seu nome completo.",
    "inquiry.errors.email": "Insira um e-mail comercial válido.",
    "inquiry.errors.phone": "Insira seu telefone ou WhatsApp.",
    "inquiry.errors.company": "Insira o nome da empresa.",
    "inquiry.errors.confirm": "Confirme que esta é uma consulta comercial.",
    "form.status.required": "Preencha todos os campos obrigatórios antes de enviar.",
    "form.status.success": "Enviado com sucesso. Nossa equipe de vendas entrará em contato em breve.",
    "form.status.failed": "Falha no envio. Envie e-mail para Snow@axdcare.com ou tente novamente.",
    "form.status.blocked": "Envio bloqueado pela proteção anti-spam."
  }
};

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  nav?.classList.toggle("is-open", !expanded);
});

document.querySelectorAll(".language-select").forEach((select) => {
  select.value = translations[currentLanguage] ? currentLanguage : DEFAULT_LANGUAGE;
  select.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
});

applyLanguage(currentLanguage);

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (form.classList.contains("b2b-inquiry-form")) {
      handleB2BInquiry(form);
      return;
    }

    const note = form.querySelector(".form-note");
    if (note) {
      note.textContent = translate("form.status.success");
    }
  });
});

function translate(key) {
  return translations[currentLanguage]?.[key] || translations[DEFAULT_LANGUAGE][key] || key;
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : DEFAULT_LANGUAGE;
  localStorage.setItem("axdcareLanguage", currentLanguage);
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("is-rtl", currentLanguage === "ar");

  document.querySelectorAll(".language-select").forEach((select) => {
    select.value = currentLanguage;
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", translate(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-error-key]").forEach((element) => {
    element.dataset.error = translate(element.dataset.errorKey);
  });

  applyMixedNavTranslations();
}

function applyMixedNavTranslations() {
  [
    ['a[href="#products"], a[href="index.html#products"]', "nav.products"],
    ['a[href="#oem"], a[href="index.html#oem"]', "nav.oem"],
    ['a[href="#quality"], a[href="index.html#quality"]', "nav.quality"],
    ['a[href="#resources"], a[href="index.html#resources"]', "nav.resources"]
  ].forEach(([selector, key]) => {
    document.querySelectorAll(selector).forEach((link) => {
      const textNode = Array.from(link.childNodes).find(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );

      if (textNode) {
        textNode.textContent = `${translate(key)} `;
      }
    });
  });
}

function handleB2BInquiry(form) {
  const status = form.querySelector(".form-status");
  const submitButton = form.querySelector(".submit-button");
  const requiredFields = form.querySelectorAll("[required]");
  let isValid = true;

  form.querySelectorAll(".field-error").forEach((field) => {
    field.textContent = "";
  });
  form.querySelectorAll(".has-error").forEach((field) => field.classList.remove("has-error"));

  requiredFields.forEach((field) => {
    const label = field.closest("label") || field.closest(".anti-spam");
    const error = label?.querySelector(".field-error");
    const value = field.type === "checkbox" ? field.checked : field.value.trim();
    const isEmailInvalid = field.type === "email" && value && !field.checkValidity();

    if (!value || isEmailInvalid) {
      isValid = false;
      label?.classList.add("has-error");
      if (error) {
          error.textContent = field.dataset.error || translate("form.status.required");
      }
    }
  });

  if (!isValid) {
    setFormStatus(status, translate("form.status.required"), "error");
    return;
  }

  const payload = Object.fromEntries(new FormData(form).entries());

  if (payload.website) {
    setFormStatus(status, translate("form.status.blocked"), "error");
    return;
  }

  submitButton?.classList.add("is-loading");
  submitButton?.setAttribute("disabled", "disabled");

  submitInquiry(payload)
    .then(() => {
      form.reset();
      setFormStatus(status, translate("form.status.success"), "success");
    })
    .catch(() => {
      setFormStatus(status, translate("form.status.failed"), "error");
    })
    .finally(() => {
      submitButton?.classList.remove("is-loading");
      submitButton?.removeAttribute("disabled");
    });
}

async function submitInquiry(payload) {
  if (!INQUIRY_ENDPOINT) {
    console.info("Inquiry payload ready for backend integration:", payload);
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { ok: true, mode: "demo" };
  }

  const response = await fetch(INQUIRY_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Inquiry submission failed");
  }

  return response.json().catch(() => ({ ok: true }));
}

function setFormStatus(status, message, type) {
  if (!status) return;
  status.textContent = message;
  status.className = `form-status ${type}`;
}
