/**
 * Single source of truth for site copy.
 * Copy follows the Retail Soft Design + Content Masterplan v1.0.
 * Anything marked VERIFY must be confirmed by Retail Soft before launch.
 */

export const site = {
  name: "Retail Soft",
  parent: "Retail Solutions Ltd.",
  tagline: "Software Built Around Your Business.",
  taglineBn: "আপনার ব্যবসা, আমাদের স্মার্ট সমাধান!",
  description:
    "Retail Soft builds tailored software, ERP & CRM, POS, inventory, SaaS and websites for retail, garments, manufacturing, education, healthcare, restaurants and real estate.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://retailsoft.example.com", // VERIFY: production domain
  contact: {
    // VERIFY all contact details before publication (masterplan §07).
    phone: "+8801805835016",
    phoneDisplay: "+880 1805-835016",
    whatsapp: "https://wa.me/8801805835016",
    email: "retailsoftofficial@gmail.com",
    address: [
      "Retail Solutions Limited",
      "1st Floor, House 13, H.P. Bhabon",
      "Merul Khula Madani Avenue, Satarkul",
      "North Badda, Dhaka-1212",
    ],
    responseExpectation: "We aim to reply within one business day.", // VERIFY: confirm SLA with sales team
    hours: "Sat – Thu, 9:00 AM – 6:00 PM", // VERIFY: office hours
    hoursBn: "শনি – বৃহস্পতি, সকাল ১০টা – সন্ধ্যা ৭টা", // VERIFY: office hours
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Merul+Badda+Satarkul+North+Badda+Dhaka+1212", // VERIFY: exact office pin
  },
} as const;

export type Solution = {
  slug: string;
  name: string;
  /** Bangla label shown under the English name */
  bn: string;
  short: string;
  hero: string;
  intro: string;
  challenge: string;
  modules: { title: string; body: string }[];
  workflow: string[];
  integrations: string[];
  idealFit: string[];
  cta: string;
  mockup: MockupKind;
};

export type MockupKind = "pos" | "erp" | "inventory" | "saas" | "commerce" | "manufacturing";

export const solutions: Solution[] = [
  {
    slug: "retail-pos",
    name: "Retail POS",
    bn: "দোকানের বিলিং ও বিক্রয় সফটওয়্যার",
    short: "Fast checkout, connected inventory and clear store reporting.",
    hero: "Sell confidently. Stay connected.",
    intro: "Bring checkout, inventory and reporting together across stores and channels.",
    challenge:
      "When the counter, the stockroom and the back office run on separate tools, every sale creates manual reconciliation work - and decisions get made on yesterday's numbers.",
    modules: [
      { title: "Fast billing", body: "Quick product lookup, barcode scanning, discounts and multiple payment methods at the counter." },
      { title: "Returns & exchanges", body: "Structured return flows that keep stock and accounts accurate." },
      { title: "Stock synchronization", body: "Every sale updates inventory so shelves and systems agree." },
      { title: "Staff roles", body: "Role-based permissions for cashiers, supervisors and managers." },
      { title: "Multi-location reporting", body: "Compare branches, products and periods from one view." },
    ],
    workflow: ["Scan & bill", "Accept payment", "Update stock", "Sync to accounts", "Report by branch"],
    integrations: ["Inventory & warehouse", "Accounting", "E-commerce storefront", "CRM & loyalty"],
    idealFit: ["Single and multi-branch retailers", "Fashion and lifestyle stores", "Supermarkets and convenience chains"],
    cta: "Discuss Your POS Needs",
    mockup: "pos",
  },
  {
    slug: "erp-crm",
    name: "ERP & CRM",
    bn: "ব্যবসা ও কাস্টমার ম্যানেজমেন্ট",
    short: "Bring customers, sales, purchases, accounts and teams into one coordinated system.",
    hero: "One clear view of your business.",
    intro: "Connect your customers, sales, purchasing, finance and teams with workflows that fit your operations.",
    challenge:
      "Spreadsheets and disconnected apps make it hard to see the whole business. Teams duplicate data, approvals stall, and leadership lacks a dependable picture.",
    modules: [
      { title: "Lead pipelines", body: "Track opportunities from first contact to closed deal." },
      { title: "Sales orders", body: "Quotes, orders and delivery status in one flow." },
      { title: "Purchasing", body: "Requisitions, vendor management and purchase orders." },
      { title: "Invoicing", body: "Accurate invoices connected to orders and payments." },
      { title: "Dashboards", body: "Role-specific views of the numbers that matter." },
      { title: "Approval flows", body: "Configurable approvals that match how your organisation decides." },
    ],
    workflow: ["Capture lead", "Quote & order", "Purchase & fulfil", "Invoice & collect", "Review dashboards"],
    integrations: ["POS", "Inventory", "Banking & payment gateways", "Email & messaging"],
    idealFit: ["Growing SMEs", "Distributors and wholesalers", "Multi-department organisations"],
    cta: "Plan Your ERP",
    mockup: "erp",
  },
  {
    slug: "inventory-warehouse",
    name: "Inventory & Warehouse",
    bn: "স্টক ও গুদাম ব্যবস্থাপনা",
    short: "Track stock across locations, transfers, replenishment and movement.",
    hero: "Know your stock. Control your movement.",
    intro: "Get visibility across products, locations, receipts, transfers and replenishment.",
    challenge:
      "Stock-outs and overstock usually come from the same root cause: no reliable, real-time picture of what you have and where it is.",
    modules: [
      { title: "SKU tracking", body: "Variants, batches and serials tracked consistently." },
      { title: "Multi-warehouse", body: "Locations, bins and inter-branch transfers." },
      { title: "Stock alerts", body: "Reorder points and low-stock notifications." },
      { title: "Barcode workflows", body: "Receive, pick and count with scanners or mobile devices." },
      { title: "Audit trails", body: "Every movement recorded with who, when and why." },
    ],
    workflow: ["Receive goods", "Put away", "Transfer between sites", "Pick & dispatch", "Count & reconcile"],
    integrations: ["POS", "Purchasing", "E-commerce", "Accounting"],
    idealFit: ["Retailers with multiple stores", "Distributors", "Manufacturers with raw-material stock"],
    cta: "Improve Inventory Control",
    mockup: "inventory",
  },
  {
    slug: "custom-saas",
    name: "Custom SaaS",
    bn: "কাস্টম সফটওয়্যার প্ল্যাটফর্ম",
    short: "Create subscription-ready platforms built around your product and customers.",
    hero: "Turn your software idea into a scalable product.",
    intro: "From discovery to launch, build a platform your customers can rely on.",
    challenge:
      "Turning an idea into a dependable product requires more than code: architecture, tenancy, billing, security and a roadmap that survives real users.",
    modules: [
      { title: "Multi-tenant architecture", body: "Isolated customer data on shared, maintainable infrastructure." },
      { title: "Subscriptions", body: "Plans, trials and recurring billing." },
      { title: "Role-based access", body: "Granular permissions for teams inside each customer account." },
      { title: "APIs", body: "Well-documented interfaces for integrations and partners." },
      { title: "Analytics", body: "Product usage insight to guide your roadmap." },
    ],
    workflow: ["Discover & validate", "Design the product", "Build the core", "Launch to first customers", "Iterate & scale"],
    integrations: ["Payment providers", "Email & notifications", "Identity providers", "Analytics"],
    idealFit: ["Founders building a first product", "Businesses productising internal tools", "Teams modernising legacy software"],
    cta: "Build Your SaaS",
    mockup: "saas",
  },
  {
    slug: "ecommerce-websites",
    name: "E-commerce & Websites",
    bn: "ই-কমার্স ও ওয়েবসাইট",
    short: "High-performance digital storefronts connected to your operations.",
    hero: "Make every digital touchpoint work harder.",
    intro: "Create fast, expressive digital experiences connected to your commercial operations.",
    challenge:
      "A storefront that is disconnected from stock and orders creates overselling, manual order entry and an inconsistent customer experience.",
    modules: [
      { title: "Headless commerce", body: "Flexible front-ends on a reliable commerce core." },
      { title: "CMS", body: "Your team edits content without developer tickets." },
      { title: "Product catalog", body: "Variants, collections and rich product content." },
      { title: "Checkout", body: "A streamlined, trustworthy purchase flow." },
      { title: "SEO", body: "Technical foundations that help customers find you." },
      { title: "Integrations", body: "Orders and stock synchronised with POS and ERP." },
    ],
    workflow: ["Browse catalog", "Checkout", "Order to fulfilment", "Stock sync", "Customer follow-up"],
    integrations: ["POS", "Inventory", "Payment gateways", "Courier services", "Analytics"],
    idealFit: ["Retailers going omnichannel", "Brands launching direct-to-consumer", "Businesses replacing a slow website"],
    cta: "Build Your Website",
    mockup: "commerce",
  },
  {
    slug: "manufacturing-software",
    name: "Manufacturing Software",
    bn: "উৎপাদন ব্যবস্থাপনা সফটওয়্যার",
    short: "Plan materials, production, procurement and business workflows.",
    hero: "Connect planning to production.",
    intro: "Coordinate procurement, inventory, manufacturing and operations in a tailored system.",
    challenge:
      "Production runs on many moving parts. Without a connected system, material shortages, unclear work-order status and delayed reporting become routine.",
    modules: [
      { title: "Bills of materials", body: "Structured BOMs with components, variants and costs." },
      { title: "Work orders", body: "Plan, release and track jobs on the shop floor." },
      { title: "Procurement", body: "Material requirements driving purchase decisions." },
      { title: "Production tracking", body: "Status and output visible as work progresses." },
      { title: "Reporting", body: "Throughput, cost and delivery performance." },
    ],
    workflow: ["Receive order", "Plan materials", "Release work orders", "Track production", "Deliver & report"],
    integrations: ["Inventory", "Purchasing", "Accounting", "Quality records"],
    idealFit: ["Garment and textile manufacturers", "Light and discrete manufacturing", "Businesses coordinating production workflows"],
    cta: "Discuss Manufacturing Software",
    mockup: "manufacturing",
  },
];

export type Industry = {
  slug: string;
  name: string;
  bn: string;
  hero: string;
  scope: string[];
  challenges: string[];
  relatedSolutions: string[];
  cta: string;
  mockup: MockupKind;
};

export const industries: Industry[] = [
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    bn: "খুচরা ব্যবসা ও ই-কমার্স",
    hero: "From storefront to stockroom, stay connected.",
    scope: ["POS", "Inventory", "Online orders", "CRM", "Pricing", "Multi-branch visibility"],
    challenges: [
      "Keeping store and online stock in agreement",
      "Comparing performance across branches",
      "Running promotions and pricing consistently",
    ],
    relatedSolutions: ["retail-pos", "inventory-warehouse", "ecommerce-websites"],
    cta: "Explore a Tailored Retail & E-commerce Solution",
    mockup: "pos",
  },
  {
    slug: "garments",
    name: "Garments",
    bn: "গার্মেন্টস ও টেক্সটাইল",
    hero: "Coordinate every step from order to delivery.",
    scope: ["Order management", "Production tracking", "Materials", "Inventory", "Reporting"],
    challenges: [
      "Tracking buyer orders through every production stage",
      "Managing fabric, trims and accessories",
      "Reporting on delivery commitments",
    ],
    relatedSolutions: ["manufacturing-software", "inventory-warehouse", "erp-crm"],
    cta: "Explore a Tailored Garments Solution",
    mockup: "manufacturing",
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    bn: "উৎপাদন শিল্প",
    hero: "Make production more predictable.",
    scope: ["Planning", "BOMs", "Purchasing", "Shop-floor workflows", "Quality records"],
    challenges: [
      "Material shortages that stop the line",
      "Limited visibility into work-order status",
      "Quality records kept on paper",
    ],
    relatedSolutions: ["manufacturing-software", "inventory-warehouse", "erp-crm"],
    cta: "Explore a Tailored Manufacturing Solution",
    mockup: "manufacturing",
  },
  {
    slug: "education",
    name: "Education",
    bn: "স্কুল, কলেজ ও শিক্ষা প্রতিষ্ঠান",
    hero: "Help institutions run with greater clarity.",
    scope: ["Admissions", "Student records", "Fees", "Attendance", "Academic workflows", "Portals"],
    challenges: [
      "Admissions and records spread across files",
      "Fee collection and follow-up",
      "Keeping students, guardians and staff informed",
    ],
    relatedSolutions: ["custom-saas", "erp-crm", "ecommerce-websites"],
    cta: "Explore a Tailored Education Solution",
    mockup: "saas",
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    bn: "হাসপাতাল, ক্লিনিক ও ফার্মেসি",
    hero: "Support better coordinated operations.",
    scope: ["Appointments", "Billing", "Inventory", "Administrative workflows", "Secure access"],
    challenges: [
      "Scheduling across departments and practitioners",
      "Billing accuracy",
      "Pharmacy and consumables stock",
    ],
    relatedSolutions: ["erp-crm", "inventory-warehouse", "custom-saas"],
    cta: "Explore a Tailored Healthcare Solution",
    mockup: "erp",
  },
  {
    slug: "restaurants-bakeries",
    name: "Restaurants & Bakeries",
    bn: "রেস্টুরেন্ট ও বেকারি",
    hero: "Keep service, stock and sales in sync.",
    scope: ["Menu management", "POS", "Recipes", "Kitchen workflows", "Stock", "Reporting"],
    challenges: [
      "Ingredient costing and wastage",
      "Fast service during peak hours",
      "Consistent menus across outlets",
    ],
    relatedSolutions: ["retail-pos", "inventory-warehouse", "manufacturing-software"],
    cta: "Explore a Tailored Restaurants & Bakeries Solution",
    mockup: "pos",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    bn: "রিয়েল এস্টেট ও ডেভেলপার",
    hero: "Manage the details behind every property.",
    scope: ["Lead management", "Listings", "Bookings", "Contracts", "Payments", "Client follow-up"],
    challenges: [
      "Leads falling through the cracks",
      "Tracking bookings and instalments",
      "Keeping clients updated through long sales cycles",
    ],
    relatedSolutions: ["erp-crm", "ecommerce-websites", "custom-saas"],
    cta: "Explore a Tailored Real Estate Solution",
    mockup: "erp",
  },
];

export const services = {
  engineering: [
    { title: "Product Engineering", body: "Web, mobile and backend systems designed, built and maintained by one accountable team." },
    { title: "UI/UX Design", body: "Research-led interfaces that make complex workflows feel simple." },
    { title: "Cloud & DevOps", body: "Reliable deployments, monitoring, backups and infrastructure that fits your scale." },
  ],
  growth: [
    { title: "SEO & technical search", body: "Search foundations, content structure and performance that help customers find you." },
    { title: "Brand identity & messaging", body: "Clear positioning and a consistent visual identity." },
    { title: "Content & creative production", body: "Copy, visuals and campaigns that communicate value." },
    { title: "Paid campaign planning", body: "Campaign planning and optimisation tied to business goals." },
    { title: "Landing pages & measurement", body: "Conversion-focused pages and consent-aware analytics." },
  ],
};

export const phases = [
  {
    name: "Discover",
    bn: "আলোচনা ও প্রয়োজন বোঝা",
    body: "Understand goals, people and friction.",
    deliverables: ["Workflow map", "Requirements & priorities", "Recommended approach"],
    involvement: "Owners, operations leads and day-to-day users",
  },
  {
    name: "Design",
    bn: "ডিজাইন ও পরিকল্পনা",
    body: "Prototype clear workflows and interfaces.",
    deliverables: ["Clickable prototype", "Solution architecture", "Release plan"],
    involvement: "Key users review and validate flows",
  },
  {
    name: "Engineer",
    bn: "সফটওয়্যার তৈরি",
    body: "Build, integrate, test and secure.",
    deliverables: ["Working releases", "Integrations & data migration", "Testing & security checks"],
    involvement: "Regular demos and acceptance testing",
  },
  {
    name: "Evolve",
    bn: "চালু, ট্রেনিং ও সাপোর্ট",
    body: "Launch, support and improve.",
    deliverables: ["Deployment & training", "Support arrangement", "Improvement roadmap"],
    involvement: "Ongoing feedback from your team",
  },
];

export const faqs = [
  { q: "Do you offer fully custom software?", a: "Yes. We can design and build software around your workflows, or recommend an existing platform where that is the better fit." },
  { q: "Can you integrate with existing systems?", a: "We assess your current tools and data flows, then define practical integration options and limitations." },
  { q: "Do you support multi-branch operations?", a: "Multi-location and role-based workflows can be included where required by the project scope." },
  { q: "Can we start small and expand later?", a: "Yes. We can prioritize a first release and plan later phases around measurable business needs." },
  { q: "How are project costs determined?", a: "Pricing depends on scope, integrations, data migration, design complexity, deployment and support requirements." },
  { q: "Do you provide maintenance?", a: "Support and maintenance arrangements can be defined as part of the proposal and service agreement." },
];

export const nav = [
  { label: "Solutions", href: "#", children: solutions.map((s) => ({ label: s.name, href: "#", desc: s.short })) },
  { label: "Industries", href: "#", children: industries.map((i) => ({ label: i.name, href: "#", desc: i.hero })) },
  { label: "Services", href: "#" },
  { label: "Work", href: "#" },
  { label: "About", href: "#" },
];

export const businessTypes = [...industries.map((i) => i.name), "Other"];
export const interestOptions = [...solutions.map((s) => s.name), "POS Hardware", "Custom Software", "Mobile App", "Digital Growth / Marketing"];
export const employeeRanges = ["1–10", "11–50", "51–200", "201–500", "500+"];
export const budgetRanges = ["Not sure yet", "Under ৳5 lakh", "৳5–15 lakh", "৳15–40 lakh", "৳40 lakh+"]; // VERIFY ranges with sales
export const timelines = ["As soon as possible", "1–3 months", "3–6 months", "Just exploring"];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);

/** Reasons to choose Retail Soft - kept to claims the team can stand behind. VERIFY wording with sales. */
export const whyUs = [
  { title: "Local team in Dhaka", bn: "ঢাকায় নিজস্ব টিম", body: "Meet us in person, talk in Bangla or English, and get help from people who understand local business." },
  { title: "Built for your workflow", bn: "আপনার কাজের ধরন অনুযায়ী", body: "We study how your shop, factory or office works first, then shape the software around it." },
  { title: "Staff training included", bn: "স্টাফ ট্রেনিং", body: "We train your cashiers, managers and accounts team so everyone is comfortable from day one." },
  { title: "Support after launch", bn: "চালুর পরেও সাপোর্ট", body: "Phone, WhatsApp and on-site support options so your business keeps running smoothly." },
  { title: "Start small, grow later", bn: "ছোট থেকে শুরু", body: "Begin with what you need today and add branches, modules and features as you grow." },
  { title: "Works with your tools", bn: "আগের সিস্টেমের সাথে যুক্ত", body: "We connect with the systems you already use and help move your existing data." },
];

/* ---------------------------------------------------------------- hardware */

export type HardwareKind = "pos" | "printer" | "scanner" | "label" | "drawer" | "display" | "scale" | "pda";

/**
 * POS & retail hardware Retail Soft supplies, installs and connects to its software.
 * VERIFY: product range, brands, specs and warranty terms with the sales team. Prices are given on request.
 */
export const hardware: { kind: HardwareKind; name: string; bn: string; short: string; features: string[] }[] = [
  {
    kind: "pos",
    name: "POS Terminal",
    bn: "টাচ পিওএস মেশিন",
    short: "All-in-one touchscreen computer for fast billing at the counter.",
    features: ["Touchscreen, single or dual display", "Windows or Android options", "Comes ready with Retail Soft POS"],
  },
  {
    kind: "printer",
    name: "Receipt Printer",
    bn: "রিসিট / ক্যাশ মেমো প্রিন্টার",
    short: "Fast thermal printer for customer receipts and kitchen orders.",
    features: ["58 mm and 80 mm paper", "USB, LAN or Bluetooth", "Auto-cutter models"],
  },
  {
    kind: "scanner",
    name: "Barcode Scanner",
    bn: "বারকোড স্ক্যানার",
    short: "Scan products in a second - no typing, no mistakes.",
    features: ["Handheld, wireless or desk models", "Reads 1D barcodes and QR codes", "Plug-and-play setup"],
  },
  {
    kind: "label",
    name: "Barcode Label Printer",
    bn: "বারকোড লেবেল প্রিন্টার",
    short: "Print your own barcode stickers, price tags and shelf labels.",
    features: ["Product and price labels", "Prints straight from our software", "Rolls in many sizes"],
  },
  {
    kind: "drawer",
    name: "Cash Drawer",
    bn: "ক্যাশ ড্রয়ার",
    short: "Strong, lockable drawer that opens automatically after each sale.",
    features: ["Opens with the receipt printer", "Lock and key", "Note and coin trays"],
  },
  {
    kind: "display",
    name: "Customer Display",
    bn: "কাস্টমার ডিসপ্লে",
    short: "Shows the price and total to your customer while you bill.",
    features: ["Clear price and total", "Builds customer trust", "Pole or screen models"],
  },
  {
    kind: "scale",
    name: "Barcode Weighing Scale",
    bn: "ডিজিটাল ওজন মাপার স্কেল",
    short: "Weighs items and prints a price barcode - for fruits, vegetables, meat and sweets.",
    features: ["Prints weight and price label", "Scans straight at the counter", "For supermarkets and sweet shops"],
  },
  {
    kind: "pda",
    name: "Handheld Scanner (PDA)",
    bn: "হ্যান্ডহেল্ড স্ক্যানার",
    short: "Mobile device for stock counting, receiving goods and warehouse work.",
    features: ["Count stock on the shop floor", "Receive and transfer goods", "Syncs with inventory"],
  },
];

/** Ready-made hardware + software bundles. VERIFY contents with sales; prices on request. */
export const hardwarePackages = [
  {
    name: "Shop Starter Package",
    bn: "দোকানের স্টার্টার প্যাকেজ",
    for: "Clothing, cosmetics, mobile, pharmacy and general shops",
    items: ["POS terminal or PC", "Receipt printer", "Barcode scanner", "Cash drawer", "Retail POS software"],
  },
  {
    name: "Supermarket Package",
    bn: "সুপারশপ প্যাকেজ",
    for: "Super shops, grocery and departmental stores",
    items: ["Touch POS terminal", "Receipt printer", "Barcode scanner", "Cash drawer", "Customer display", "Barcode label printer", "Barcode weighing scale", "POS & inventory software"],
    popular: true,
  },
  {
    name: "Restaurant Package",
    bn: "রেস্টুরেন্ট প্যাকেজ",
    for: "Restaurants, cafés, bakeries and sweet shops",
    items: ["Touch POS terminal", "Receipt printer", "Kitchen order printer", "Cash drawer", "Restaurant POS software"],
  },
];

export const hardwareServices = [
  { title: "Delivery & installation", bn: "ডেলিভারি ও ইনস্টলেশন", body: "We deliver, set up and test every device at your shop." },
  { title: "Works with our software", bn: "সফটওয়্যারের সাথে সংযুক্ত", body: "Printers, scanners and drawers are configured with your POS before handover." },
  { title: "Staff training", bn: "স্টাফ ট্রেনিং", body: "Your cashiers learn billing, printing and scanning on the real setup." },
  { title: "Warranty support", bn: "ওয়ারেন্টি সাপোর্ট", body: "Warranty as per brand terms - we handle the claim for you." }, // VERIFY warranty process
];

export const hardwareFaqs = [
  { q: "Do you sell hardware without your software?", a: "Yes. You can buy POS hardware alone, or as a package with Retail Soft software already set up." },
  { q: "Will the hardware work with my current software?", a: "Most receipt printers, scanners and cash drawers work with common POS software. Tell us what you use and we will confirm before you buy." },
  { q: "Do you deliver and install outside Dhaka?", a: "Tell us your location and we will confirm delivery, installation and support options for your area." }, // VERIFY coverage
  { q: "What about warranty?", a: "Hardware comes with warranty as per the brand's terms. We help you with the claim process." },
];

/** WhatsApp link with a pre-filled message. */
export const whatsappWith = (text: string) => `${site.contact.whatsapp}?text=${encodeURIComponent(text)}`;
