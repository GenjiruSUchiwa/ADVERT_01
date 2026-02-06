import { PILLARS } from '../lib/constants';

export interface Strategy {
  id: string;
  brandName: string;
  industry: string;
  createdAt: string;
  updatedAt: string;
  coherenceScore: number;
  completionPercent: number;
  superfanCount: number;
  pillars: PillarData[];
  status: 'draft' | 'complete' | 'archived';
}

export interface PillarData {
  id: string;
  letter: string;
  name: string;
  color: string;
  score: number;
  content: string;
  variables: { name: string; value: string; score: number }[];
}

function buildPillars(scores: number[]): PillarData[] {
  return PILLARS.map((p, i) => ({
    id: p.id,
    letter: p.letter,
    name: p.name,
    color: p.color,
    score: scores[i],
    content: generatePillarContent(p.id),
    variables: p.variables.map((v) => ({
      name: v,
      value: generateVariableContent(p.id, v),
      score: Math.floor(Math.random() * 30) + 70,
    })),
  }));
}

function generatePillarContent(pillarId: string): string {
  const contents: Record<string, string> = {
    authenticite:
      "SPAWT est une marque nee de la conviction que le talent creatif africain merite une scene mondiale. Fondee a Abidjan, elle incarne l'authenticite d'un continent riche en histoires, en couleurs et en rythmes. Sa mission : transformer chaque campagne en un pont culturel entre l'Afrique et le monde.",
    distinction:
      "SPAWT se positionne comme le partenaire strategique premium des marques africaines ambitieuses. Sa voix est audacieuse, chaleureuse et sans complexe. Son identite visuelle fusionne les motifs geometriques ouest-africains avec un design contemporain minimaliste.",
    valeur:
      "La proposition de valeur de SPAWT repose sur la democratisation de la sophistication strategique. Pour 299$/mois, les agences accedent a des outils qui rivalisent avec ceux des geants internationaux. Le ROI moyen constate : x3.2 en 6 mois.",
    engagement:
      "SPAWT cree l'engagement a travers des touchpoints emotionnels : workshops immersifs mensuels, newsletter 'African Creative Pulse', et une communaute Slack de 500+ creatifs. Le funnel AARRR montre un taux de retention de 87%.",
    risk: "Analyse SWOT : Forces - expertise locale inegalee, technologie IA proprietaire. Faiblesses - brand awareness limitee hors Afrique de l'Ouest. Opportunites - marche publicitaire africain en croissance de 12%/an. Menaces - entree des GAFAM dans l'espace creatif africain.",
    track:
      "Le marche publicitaire africain atteint $15.2B en 2026, avec une croissance de 12% annuel. Les KPIs suivis : Campaign Coherence Score (actuel: 81), Financial Clarity Index (76), Superfan Growth Rate (+23% MoM).",
  };
  return contents[pillarId] || '';
}

function generateVariableContent(_pillarId: string, varName: string): string {
  const defaults: Record<string, string> = {
    'Mission de marque':
      'Democratiser la sophistication strategique pour les agences africaines, en combinant IA et expertise locale.',
    'Valeurs fondamentales':
      "Excellence, Authenticite, Innovation, Communaute, Impact. Chaque valeur est ancree dans la realite du marche africain.",
    'Heritage et histoire':
      "Nee a Abidjan en 2024, SPAWT est le fruit de 15 ans d'experience dans l'ecosysteme creatif africain.",
    'Capacites distinctives':
      "Methodologie ADVERT proprietary, IA entrainee sur donnees africaines, reseau de 500+ creatifs certifies.",
    'Culture interne':
      'Culture de "builder" - iteration rapide, feedback constant, celebration des victoires.',
    'Persona de marque':
      'Le Stratege Eclaire - expert, accessible, passionnement africain, technologiquement avance.',
    'Positionnement unique':
      "La seule plateforme qui combine methodologie psychologique et intelligence artificielle pour le marche africain.",
    'Voix et ton':
      "Audacieux mais accessible. Confiant sans arrogance. Expert mais jamais condescendant. Chaleureux et direct.",
    'Identite visuelle':
      'Palette or/ambre sur fond sombre. Typographie Space Grotesk pour les titres, Inter pour le corps.',
    'Elements de reconnaissance':
      "Le logo hexagonal ADVERT, le gradient or-violet signature, le son d'intro des presentations.",
    'Proposition de valeur':
      'En 10 minutes, creez une strategie de marque aussi sophistiquee que celle des plus grandes agences mondiales.',
    'Offre produit/service':
      'SaaS : Nucleus ADVERT (strategie), Financial Clarity (analytics), Creative Concierge (marketplace).',
    'Modele economique':
      'SaaS par abonnement + Consulting premium + Commission marketplace. LTV/CAC ratio de 4.2.',
    'Structure de prix':
      'Starter $99/mois, Professional $299/mois, Enterprise sur mesure. Consulting a partir de $5,000/projet.',
    'Budget marketing':
      "Budget marketing Q1 2026 : $45,000. Repartition : 40% contenu, 30% events, 20% paid, 10% PR.",
    'Touchpoints client':
      "Site web, App PWA, Newsletter, Slack Community, Workshops mensuels, Webinaires bi-hebdomadaires.",
    'Funnel AARRR':
      'Acquisition: 2,300 visiteurs/mois. Activation: 34%. Retention: 87%. Revenue: $18.2 ARPU. Referral: 23%.',
    'Rituels de marque':
      "'First Friday Creative' - workshop mensuel. 'Strategy Sprint' - session intensive trimestrielle.",
    'Plan de campagne':
      "Q1: Lancement campagne 'African Creative Renaissance'. Q2: Expansion Dakar+Lagos. Q3: Summit annuel.",
    'Communaute et engagement':
      "500+ membres Slack, 12 ambassadeurs, NPS de 72. Engagement rate 3.4x la moyenne du secteur.",
    'Forces (Strengths)':
      "Expertise locale inegalee, technologie IA proprietaire, first-mover advantage, equipe passionnee.",
    'Faiblesses (Weaknesses)':
      'Brand awareness limitee, equipe reduite, dependance API externes, tresorerie limitee.',
    'Opportunites':
      'Marche pub africain +12%/an, talents digitaux en croissance, fierte culturelle montante.',
    'Menaces (Threats)':
      "Entree des GAFAM, instabilite reglementaire, connectivite internet variable, fuite des talents.",
    'Plan de mitigation':
      'Diversification revenus, partenariats strategiques, reserve de tresorerie 6 mois, programme de retention talents.',
    'Etude de marche':
      "Marche publicitaire africain : $15.2B en 2026. Segments cles : FMCG (32%), Telecom (24%), Fintech (18%).",
    'Analyse concurrentielle':
      'Concurrents directs : Havas Africa, McCann Afrique. Avantage ADVERT : prix, specialisation, IA.',
    'KPIs de performance':
      'Campaign Coherence Score: 81/100. Financial Clarity Index: 76/100. Superfan Growth: +23% MoM.',
    'Tableau de bord':
      'Dashboard temps reel avec 12 metriques cles, alertes automatiques, rapports hebdomadaires.',
    'Plan de suivi':
      'Revue KPI hebdomadaire, audit strategie mensuel, bilan trimestriel avec ajustements.',
  };
  return defaults[varName] || `Contenu genere pour ${varName}.`;
}

export const MOCK_STRATEGIES: Strategy[] = [
  {
    id: '1',
    brandName: 'SPAWT',
    industry: 'Marketing & Creative Services',
    createdAt: '2026-01-15',
    updatedAt: '2026-02-04',
    coherenceScore: 81,
    completionPercent: 100,
    superfanCount: 247,
    pillars: buildPillars([88, 82, 79, 85, 74, 81]),
    status: 'complete',
  },
  {
    id: '2',
    brandName: 'Wari Pay',
    industry: 'Fintech & Mobile Money',
    createdAt: '2026-01-28',
    updatedAt: '2026-02-03',
    coherenceScore: 72,
    completionPercent: 83,
    superfanCount: 134,
    pillars: buildPillars([78, 75, 82, 68, 65, 72]),
    status: 'complete',
  },
  {
    id: '3',
    brandName: 'Maison Kente',
    industry: 'Fashion & Luxury',
    createdAt: '2026-02-01',
    updatedAt: '2026-02-05',
    coherenceScore: 65,
    completionPercent: 67,
    superfanCount: 89,
    pillars: buildPillars([72, 85, 68, 55, 58, 62]),
    status: 'draft',
  },
  {
    id: '4',
    brandName: 'AfriHealth',
    industry: 'HealthTech',
    createdAt: '2026-02-03',
    updatedAt: '2026-02-05',
    coherenceScore: 58,
    completionPercent: 42,
    superfanCount: 31,
    pillars: buildPillars([65, 52, 60, 48, 55, 58]),
    status: 'draft',
  },
];

export const AI_QUESTIONS: Record<string, string[]> = {
  authenticite: [
    "Quelle est la raison d'etre profonde de votre marque ? Pas juste ce que vous vendez, mais POURQUOI vous existez.",
    "Quelles sont les 3 valeurs non-negociables qui guident chaque decision de votre entreprise ?",
    "Racontez-moi l'histoire de la creation de votre marque. Quel moment declencheur vous a pousse a agir ?",
    "Quelles capacites ou expertises avez-vous que vos concurrents ne peuvent pas facilement reproduire ?",
    "Comment decririez-vous la culture interne de votre equipe en 3 mots ?",
  ],
  distinction: [
    "Si votre marque etait une personne, comment la decririez-vous ? Quel serait son caractere ?",
    "Completez cette phrase : 'Nous sommes la seule marque qui...'",
    "Quel ton adoptez-vous avec vos clients ? Formel ? Amical ? Provocateur ? Inspirant ?",
    "Quels elements visuels ou sonores rendent votre marque instantanement reconnaissable ?",
    "Quand les gens parlent de votre marque, quel mot revient le plus souvent ?",
  ],
  valeur: [
    "En une phrase, quelle transformation concrete apportez-vous a vos clients ?",
    "Decrivez votre offre principale. Qu'est-ce qui la rend irresistible ?",
    "Comment gagnez-vous de l'argent ? Quel est votre modele economique ?",
    "A quel prix positionnez-vous votre offre et pourquoi ce prix est-il justifie ?",
    "Quel budget consacrez-vous au marketing et comment le repartissez-vous ?",
  ],
  engagement: [
    "Quels sont les 3 principaux points de contact entre votre marque et vos clients ?",
    "Comment attirez-vous de nouveaux clients ? Quel est votre canal d'acquisition principal ?",
    "Avez-vous des rituels de marque ? Des evenements recurrents que vos clients attendent ?",
    "Quelle est votre strategie de campagne pour les 6 prochains mois ?",
    "Comment votre communaute s'engage-t-elle avec votre marque au quotidien ?",
  ],
  risk: [
    "Quelles sont vos 3 plus grandes forces par rapport a la concurrence ?",
    "Soyez honnete : quelles sont vos faiblesses les plus critiques actuellement ?",
    "Quelles opportunites de marche n'exploitez-vous pas encore ?",
    "Quelles menaces externes pourraient mettre en peril votre croissance ?",
    "Quel est votre plan B si votre scenario principal echoue ?",
  ],
  track: [
    "Comment se porte votre marche ? En croissance, stable, ou en declin ?",
    "Qui sont vos 3 principaux concurrents et quel est votre avantage sur chacun ?",
    "Quels KPIs suivez-vous au quotidien pour mesurer votre performance ?",
    "Comment visualisez-vous vos donnees de performance actuellement ?",
    "A quelle frequence revisez-vous votre strategie en fonction des resultats ?",
  ],
};

export const AI_RESPONSES: Record<string, string[]> = {
  authenticite: [
    "Excellent ! Votre mission revele une dimension emotionnelle puissante. D'apres le framework Ikigai, vous etes a l'intersection de ce que le monde a besoin et de ce que vous aimez faire. C'est rare et precieux.\n\nVoici ce que je detecte comme meta-variables cles :\n- **Motivation intrinsèque** : Votre 'pourquoi' est ancre dans l'impact, pas juste le profit\n- **Resonance culturelle** : Votre mission parle directement aux aspirations du marche africain\n- **Differenciateur emotionnel** : Les concurrents vendent des services, vous vendez une vision",
    "Vos valeurs sont coherentes et complementaires. D'apres la theorie de Schwartz, elles combinent des valeurs d'auto-transcendance (Impact, Communaute) avec des valeurs d'ouverture au changement (Innovation). C'est un mix puissant pour une marque qui veut inspirer.\n\n**Insight psychologique** : Les marques qui alignent valeurs internes et communication externe ont un taux de confiance 2.3x superieur.",
    "Votre histoire de creation contient tous les elements du Hero's Journey de Joseph Campbell ! Le moment declencheur (le defi), la transformation personnelle, et la quete heroique. C'est exactement ce qui cree des superfans.\n\n**Recommandation** : Utilisez cette histoire dans votre storytelling client. Les recits de fondation authentiques generent 4x plus d'engagement que les messages corporates.",
  ],
  distinction: [
    "Votre persona de marque est riche et multidimensionnelle. Je detecte un archetype du 'Sage Innovateur' - quelqu'un qui combine sagesse et disruption. C'est un archetype rare et memorable.\n\n**Analyse de positionnement** :\n- Zone de confort : Expert accessible\n- Zone de differentiation : Fusion tech + culture africaine\n- Zone de danger : Eviter le ton condescendant ou trop academique",
    "Votre positionnement unique est clair et defensible. Le 'seul qui...' est l'exercice le plus puissant en strategie de marque. Vous occupez un espace que personne d'autre ne peut revendiquer crediblement.\n\n**Score de distinctivite** : 8.2/10 - Tres fort. La plupart des marques africaines se positionnent sur le prix, vous vous positionnez sur l'intelligence. C'est audacieux.",
  ],
  valeur: [
    "Votre proposition de valeur suit le framework 'Gain Creator' parfaitement. Vous ne vendez pas un outil, vous vendez une transformation : de 'agence locale limitee' a 'stratege de classe mondiale'.\n\n**Analyse unit economics** :\n- LTV estimee : $3,588 (12 mois x $299)\n- CAC cible : <$850 (ratio LTV/CAC >4)\n- Marge brute : 93% (SaaS pur)\n\nC'est un modele viable et scalable.",
  ],
  engagement: [
    "Votre strategie d'engagement revele un pattern interessant : vous misez sur la communaute avant la transaction. D'apres le framework AARRR, votre point fort est la Retention (87%), ce qui est exceptionnel.\n\n**Insight AARRR** :\n- Acquisition : 2,300/mois (bon mais optimisable)\n- Activation : 34% (objectif >40%)\n- Retention : 87% (excellent - signe de product-market fit)\n- Revenue : $18.2 ARPU (en ligne avec pricing)\n- Referral : 23% (superfans actifs !)",
  ],
  risk: [
    "Votre analyse SWOT est lucide. La transparence sur les faiblesses est un signe de maturite strategique. Voici mon analyse complementaire :\n\n**Matrice de risque** :\n- Risque critique : Dependance API (probabilite 40%, impact eleve)\n- Risque modere : Brand awareness (probabilite 60%, impact moyen)\n- Risque faible : Concurrence GAFAM (probabilite 20%, mais impact devastateur)\n\n**Plan de mitigation prioritaire** : Diversifier les fournisseurs IA et constituer une reserve de tresorerie de 6 mois.",
  ],
  track: [
    "Le marche que vous ciblez est en pleine acceleration. Voici mon analyse :\n\n**Tendances cles 2026** :\n- Marche pub digital africain : +18% YoY (vs +8% mondial)\n- Adoption IA creative : 34% des agences (vs 67% en Europe)\n- Gap = Opportunite massive\n\n**Votre Campaign Coherence Score de 81** vous place dans le top 15% des marques analysees. Pour atteindre 90+, focalisez sur l'alignement Engagement-Track (correlation de 0.78 entre ces deux piliers).",
  ],
};

export const DASHBOARD_METRICS = {
  totalStrategies: 4,
  avgCoherenceScore: 69,
  totalSuperfans: 501,
  activeClients: 3,
  revenueThisMonth: 14700,
  growthRate: 23,
};
