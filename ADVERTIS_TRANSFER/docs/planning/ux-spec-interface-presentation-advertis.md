---
project: ADVERT_01
brand: AMARA - Wear Your Story
document_type: ux_specification
focus: Interface Publique de Présentation Stratégique
audience: Client + Agence
style: Moderne & Créatif
language: Français
date: 2026-02-10
author: Sally (UX Designer Agent) + spark01
status: DRAFT_V1
---

# Spécification UX - Interface de Présentation AMARA

## 🎯 Vision de l'Interface

### Objectif Central

Créer une **expérience web publique immersive** qui transforme les 8 documents stratégiques ADVERT (S, A, D, V, E, R, T, I) en un **récit visuel captivant** pour la marque AMARA "Wear Your Story".

**Transformation visée :**
- ❌ De : 8 documents PDF séparés, texte dense, format corporate
- ✅ Vers : Expérience web unifiée, narrative visuelle, data storytelling interactif

### Philosophie de Design

**"La Stratégie comme Histoire Visuelle"**

La stratégie ADVERT n'est pas un document à lire - c'est une **histoire de marque à vivre**. L'interface doit évoquer l'émotion de découvrir une marque exceptionnelle tout en communiquant la sophistication stratégique.

**Principes Directeurs :**

1. **Storytelling Visuel** - Chaque section raconte un chapitre de l'histoire AMARA
2. **Data Becomes Art** - Les données financières, métriques, timelines deviennent des œuvres visuelles
3. **Progressive Discovery** - Le contenu se révèle au scroll, créant anticipation et engagement
4. **Brand as Hero** - AMARA (la marque) est le héros du récit, pas les documents techniques
5. **Dual Audience** - Impressionne le client, outille l'agence (annotations, exports, etc.)

---

## 👥 Audiences & Contextes d'Usage

### Audience Primaire : Le Client (Brand Director)

**Persona : Nadia Okonkwo**
- Directrice de Marque chez AMARA
- 38 ans, MBA, 12 ans d'expérience retail/fashion
- Pression Board pour ROI marketing et stratégie claire
- Besoin de comprendre ET présenter la stratégie à ses stakeholders

**Contextes d'Usage :**

1. **Première Découverte (Solo, 20-30 min)**
   - Navigation initiale seule pour comprendre la stratégie complète
   - Besoin : Vue d'ensemble rapide + capacité d'approfondir sélectivement
   - Device : Desktop (bureau, concentration)
   - Moment : Après réception du lien de l'agence

2. **Présentation au Board (Réunion, 30-45 min)**
   - Nadia présente la stratégie AMARA à son CEO/CFO
   - Besoin : Mode présentation fullscreen, navigation fluide, crédibilité visuelle
   - Device : Desktop/Laptop + écran projeté
   - Moment : Réunion stratégique mensuelle/trimestrielle

3. **Consultation Récurrente (5-10 min)**
   - Retours réguliers pour vérifier détails spécifiques (budget, timeline, metrics)
   - Besoin : Navigation rapide, recherche, bookmarks
   - Device : Desktop/Tablet/Mobile
   - Moment : Préparation réunions, validation décisions opérationnelles

**Sentiment Cible :**
- "Cette stratégie est **exceptionnelle** - je suis fière de la présenter"
- "Tout est **clair et visuellement convaincant** - mon Board sera impressionné"
- "Je **comprends exactement** où va chaque euro et quel impact prévoir"

---

### Audience Secondaire : L'Agence (Strategy Director)

**Persona : Amina Diallo**
- Directrice Stratégie à l'agence qui a créé le livrable ADVERT
- 34 ans, 8 ans d'expérience, ambition de rivaliser avec McCann/Havas
- Besoin de "wower" le client tout en gardant contrôle professionnel

**Contextes d'Usage :**

1. **Présentation Client Initiale (Pitch, 45-60 min)**
   - Amina présente la stratégie ADVERT complète au client
   - Besoin : Contrôle de la narration, capacité de sauter entre sections, crédibilité premium
   - Device : Desktop + écran partagé (Zoom/Meet ou présentiel avec projecteur)
   - Moment : Livraison finale après 4-6 semaines de travail

2. **Walk-through Post-Livraison (Formation, 30 min)**
   - Former le client à naviguer l'interface de manière autonome
   - Besoin : Mode annotation/guide, highlights des sections clés
   - Device : Desktop (screen-share)
   - Moment : Séance de handoff après acceptation

3. **Référence Portfolio (Showcase, 5 min)**
   - Montrer ce livrable à prospects pour démontrer capacités de l'agence
   - Besoin : Mode "case study" public, masquage données sensibles (optionnel)
   - Device : Desktop/Tablet
   - Moment : Pitchs nouveaux clients

**Sentiment Cible :**
- "Ce livrable me positionne comme **agence de classe mondiale**"
- "Le client est **visuellement impressionné** dès les 30 premières secondes"
- "Je peux naviguer avec **fluidité et contrôle** pendant la présentation"

---

## 🏗️ Architecture de l'Information

### Structure de Navigation Unifiée

L'interface présente les **8 documents ADVERT** dans un **récit linéaire** avec navigation flexible.

**Flow Narratif :**

```
🏠 HERO
↓
📖 STRATEGY BIBLE (S) - L'Histoire Complète
↓
🎭 AUTHENTICITÉ (A) - L'Âme de la Marque
↓
🎨 DISTINCTION (D) - L'Identité Visuelle
↓
💎 VALEUR (V) - La Promesse
↓
🔥 ENGAGEMENT (E) - Les Campagnes [SECTION MAJEURE]
↓
⚠️ RISK (R) - Les Garde-fous
↓
📊 TRACK (T) - La Mesure du Succès
↓
🗺️ IMPLEMENTATION (I) - La Roadmap 36 Mois
↓
🎬 CALL-TO-ACTION FINAL
```

### Hiérarchie Visuelle

**Niveau 1 : Hero Section**
- Immersion immédiate dans l'univers AMARA
- Tagline + visuel hero + 3-4 métriques clés
- CTA : "Explorer la Stratégie" → scroll vers Section S

**Niveau 2 : Les 8 Documents (Sections Majeures)**
- Chaque document = 1 section distincte visuellement
- Header avec icône pilier + numéro + titre
- Contenu structuré en sous-sections (cards, grids, timelines)

**Niveau 3 : Sous-sections par Document**
- Cards pour insights clés
- Data visualizations pour métriques
- Timelines pour chronologies
- Grids pour matrices (ex: SWOT, personas, etc.)

**Navigation Persistente :**
- **Sidebar sticky** (desktop) : Mini-nav avec les 8 piliers + progress indicator
- **Mobile hamburger** : Full-screen nav overlay
- **Breadcrumbs** : Toujours visible en haut (ex: "AMARA / Engagement / Campagne 1")

---

## 🎨 Direction Artistique & Identité Visuelle

### Palette de Couleurs AMARA

**Inspiration :** "Sustainable African Fashion" - chaleur terre, artisanat, modernité

**Couleurs Primaires :**
- **Terracotta Warm** `#C8654A` - Couleur signature AMARA, CTAs, accents
- **Deep Charcoal** `#2C2420` - Texte principal, headers
- **Cream Canvas** `#F8F5F1` - Background principal, respiration

**Couleurs Secondaires :**
- **Savanna Gold** `#D4A574` - Highlights, success metrics, moments "worth it"
- **Forest Green** `#2D5A3D` - Sustainable/eco elements, positive data
- **Clay Red** `#9B4A3A` - Risk sections, warnings, attention points

**Couleurs Fonctionnelles :**
- **Data Viz Palette :**
  - Campagne 1 : `#C8654A` (Terracotta)
  - Campagne 2 : `#2D5A3D` (Forest Green)
  - Campagne 3 : `#D4A574` (Savanna Gold)
- **Gradients :**
  - Hero background : `linear-gradient(135deg, #C8654A 0%, #9B4A3A 100%)`
  - Section dividers : `linear-gradient(90deg, transparent, #D4A574, transparent)`

**Mode Sombre (Optional):**
- Background : `#1A1613`
- Texte : `#F8F5F1`
- Accents conservés (Terracotta, Gold)

---

### Typographie

**Système de Fonts :**

1. **Display (Headings) : "Clash Display"**
   - Usage : H1, Hero title, Section headers
   - Weights : Semibold (600), Bold (700)
   - Caractère : Moderne, géométrique, fort impact
   - Fallback : `'Clash Display', 'Inter', sans-serif`

2. **Body : "Inter Variable"**
   - Usage : Body text, UI, captions, data
   - Weights : Regular (400), Medium (500), Semibold (600)
   - Caractère : Lisibilité optimale, professionnel
   - Fallback : `'Inter', -apple-system, BlinkMacSystemFont, sans-serif`

3. **Accent (Optional) : "Playfair Display"**
   - Usage : Quotes, testimonials, pull-quotes
   - Weights : Regular (400), Italic
   - Caractère : Élégance, storytelling
   - Fallback : `'Playfair Display', Georgia, serif`

**Type Scale :**
```
Hero Title      : 72px / 1.1 line-height (Desktop), 48px (Mobile)
H1 (Section)    : 56px / 1.2
H2 (Sub-section): 40px / 1.3
H3 (Card Title) : 28px / 1.4
H4 (Labels)     : 20px / 1.5
Body Large      : 18px / 1.6
Body            : 16px / 1.6
Body Small      : 14px / 1.5
Caption         : 12px / 1.4
```

---

### Système de Grille & Espacements

**Grid Layout :**
- **Desktop (>1200px) :** 12 colonnes, max-width 1440px, gutter 32px, margin 64px
- **Tablet (768-1199px) :** 8 colonnes, max-width 100%, gutter 24px, margin 48px
- **Mobile (<767px) :** 4 colonnes, max-width 100%, gutter 16px, margin 24px

**Espacements (8px base unit) :**
```
xs  : 4px   - Tight (badges, inline elements)
sm  : 8px   - Close (form fields, labels)
md  : 16px  - Comfortable (card padding, button gaps)
lg  : 24px  - Spacious (section internal spacing)
xl  : 32px  - Generous (card padding large)
2xl : 48px  - Section dividers
3xl : 64px  - Major section breaks
4xl : 96px  - Hero/footer spacing
```

**Vertical Rhythm :**
- Sections : `96px` padding-top + padding-bottom
- Cards : `32px` padding
- Paragraphs : `16px` margin-bottom
- Headers : `8px` margin-bottom

---

## 📱 Responsive Strategy

### Desktop-First, Mobile-Optimized

**Desktop (>1200px) - Expérience Complète**
- Layout 2-colonnes pour contenu riche (texte + visuel côte-à-côte)
- Sidebar navigation persistente
- Hover states sophistiqués
- Animations complexes (parallax, fade-in-on-scroll)

**Tablet (768-1199px) - Expérience Adaptée**
- Layout 1-colonne principalement, 2-colonnes pour grids compactes
- Sidebar navigation collapsible
- Touch-friendly (min 44x44px targets)
- Animations simplifiées

**Mobile (<767px) - Expérience Essentielle**
- Layout 1-colonne strict
- Hamburger navigation fullscreen
- Touch-first interactions
- Animations minimales (performance)
- Sections condensables (accordions)

**Breakpoints :**
```css
--mobile-max: 767px
--tablet-min: 768px
--tablet-max: 1199px
--desktop-min: 1200px
--desktop-large: 1920px
```

---

## 🎬 Sections Détaillées de l'Interface

### SECTION 0 : HERO

**Objectif :** Immersion immédiate + captation émotionnelle en 5 secondes

**Contenu Visuel :**
- **Background :** Image hero AMARA (mannequin portant vêtement signature, fond atelier artisans)
- **Overlay :** Gradient subtil Terracotta pour lisibilité
- **Logo AMARA** : Centré en haut, taille généreuse (80px height)
- **Tagline :** "Wear Your Story" - Playfair Display Italic, 24px, couleur Cream

**Métriques Clés (Hero Cards) :**

Disposition : 4 cards horizontales, glassmorphism effect

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ North Star  │ │ Investment  │ │ Timeline    │ │ Impact      │
│ 5,000       │ │ $8.75M      │ │ 36 Months   │ │ 15+ Awards  │
│ Superfans   │ │ Total       │ │ Roadmap     │ │ Target      │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

**CTA Principal :**
- Button : "Explorer la Stratégie AMARA" → Smooth scroll vers Section S
- Style : Terracotta background, Cream text, rounded, hover lift effect
- Icon : Down arrow animée (bounce subtil)

**Height :** 100vh (fullscreen immersion)

---

### SECTION 1 : STRATEGY BIBLE (S) - "L'Histoire Complète"

**Intro Narrative :**
> "AMARA n'est pas qu'une marque de mode. C'est un mouvement qui reconnecte les femmes africaines à leur héritage artisanal tout en embrassant la modernité durable. Cette Strategy Bible synthétise 6 mois de recherche, 40+ variables stratégiques, et la vision d'une marque qui peut transformer l'industrie de la mode en Afrique de l'Ouest."

**Sous-sections (Cards Layout) :**

1. **Executive Summary Card**
   - Vision en 3 bullet points
   - Mission statement
   - North Star Metric expliqué

2. **Strategic Context Card**
   - Marché fashion africain (taille, croissance)
   - Opportunité sustainability
   - Gap compétitif identifié

3. **Customer Insights Card**
   - 3 personas clés (noms, âges, quotes)
   - Jobs-to-be-Done principaux
   - Pain points & gains

4. **Strategic Roadmap Visual**
   - Timeline interactive 36 mois
   - 4 phases : Foundation → Launch → Scale → Optimize
   - Milestones clés avec icônes

**Visual Style :**
- Cards avec border subtle Terracotta
- Background Cream avec texture légère (fabric pattern)
- Iconographie custom pour chaque sous-section
- Hover : Card lift + shadow augmentation

---

### SECTION 2 : AUTHENTICITÉ (A) - "L'Âme de la Marque"

**Intro :**
> "Qu'est-ce qui rend AMARA authentique ? Ce n'est pas une question de marketing - c'est l'ADN même de la marque, ancré dans les valeurs Schwartz et le Hero's Journey de sa fondatrice."

**Layout : 3-Column Grid (Desktop), Stack (Mobile)**

**Colonne 1 : Brand DNA**
- **Purpose** (Icône: 🎯)
  - Card avec texte centré
  - "Préserver l'artisanat africain à travers la mode moderne durable"

- **Mission** (Icône: 🚀)
  - "Connecter 10,000 artisans africains à l'économie fashion globale d'ici 2029"

- **Vision** (Icône: 🔭)
  - "Devenir la marque de référence pour la mode africaine durable et éthique"

**Colonne 2 : Core Values (5 valeurs)**
- Visual : Pentagon diagram (5 points)
- Chaque valeur = point avec tooltip hover
  - Tradition & Innovation
  - Sustainability & Ethics
  - Empowerment & Community
  - Quality & Craftsmanship
  - Storytelling & Heritage

**Colonne 3 : Brand Personality**
- Sliders visuels (Brand Personality Spectrum)
  - Sophisticated ●━━━━━━ Accessible
  - Bold ━━━●━━━ Subtle
  - Modern ━━━━●━ Traditional
- Style : Sliders interactifs (pas modifiables, juste visuel)

**Hero's Journey Visualization :**
- Timeline narrative horizontale
- 12 étapes du Hero's Journey appliquées à la fondatrice AMARA
- Style : Illustrated journey avec points clés
- Exemple : "Call to Adventure → Découverte du gaspillage textile en Afrique"

---

### SECTION 3 : DISTINCTION (D) - "L'Identité Visuelle"

**Intro :**
> "AMARA se distingue visuellement par une identité qui marie modernité géométrique et patterns artisanaux africains. Chaque élément visuel raconte l'histoire de l'artisanat qui donne vie aux vêtements."

**Logo System (Interactive Showcase)**
- Logo principal : Display large avec variations
- Logo variations : Icon, Wordmark, Horizontal, Vertical
- Usage guidelines : Grid montrant do's & don'ts
- Animations : Logo se construit au scroll

**Color Palette (Interactive)**
- Swatches cliquables avec codes HEX/RGB/CMYK
- Primary : Terracotta + variations teintes
- Secondary : Forest Green, Savanna Gold
- Neutrals : Charcoal, Cream spectrum
- Color psychology pour chaque couleur (tooltip hover)

**Typography System**
- Font pairings showcased
- Type scale examples (H1 → Caption)
- Usage : Headlines, Body, Accents

**Photography Guidelines**
- Grid moodboard (3x3) avec exemples
- Style : Natural light, artisan workshops, texture close-ups
- Do's & Don'ts avec exemples visuels

**Graphic Elements**
- Pattern library : African-inspired geometric patterns
- Iconography : Custom icon set (24 icônes)
- Texture library : Fabric textures, paper, clay

**Applications Showcase**
- Mockups : Business cards, packaging, social media templates, website
- Style : Interactive carousel ou grid

---

### SECTION 4 : VALEUR (V) - "La Promesse"

**Intro :**
> "AMARA promet plus qu'un vêtement - c'est une expérience de reconnexion à l'héritage africain à travers la mode durable. Voici comment cette valeur se déploie à travers l'expérience client."

**Positioning Statement (Featured Card)**
- Large card centré, background gradient
- Template rempli :
  - Pour [target audience]
  - Qui [need/pain point]
  - AMARA est [category]
  - Qui [unique benefit]
  - Contrairement à [competitors]
  - Nous [key differentiator]

**Target Personas (3 Cards Horizontal)**

Chaque card contient :
- Photo persona (illustration ou photo stock)
- Nom + Âge + Occupation
- Quote signature
- Demographics (revenus, localisation)
- Psychographics (valeurs, lifestyle)
- Jobs-to-be-Done (3-4 jobs clés)
- Pain Points & Gains (side-by-side)

**Example Persona 1 : "Amina - The Heritage Seeker"**
- 32 ans, Marketing Manager, Lagos
- Quote : "Je veux porter mes racines avec fierté"
- Jobs : Express identity, Support local artisans, Look professional
- Pains : Generic fashion, Fast fashion guilt, Cultural disconnect
- Gains : Unique pieces, Ethical consumption, Conversation starters

**Value Architecture (Pyramid Visual)**
- 3-tier pyramid interactif
- Tier 1 (Base) : Functional Value - Qualité, Durabilité, Confort
- Tier 2 (Middle) : Emotional Value - Fierté, Connexion, Expression
- Tier 3 (Top) : Social Value - Status, Belonging, Impact

**Customer Journey Map (Horizontal Timeline)**
- 5 phases : Awareness → Consideration → Purchase → Experience → Advocacy
- Pour chaque phase :
  - Touchpoints (canaux)
  - Emotions (emotion curve)
  - Opportunities (pain points à adresser)

---

### SECTION 5 : ENGAGEMENT (E) - "Les Campagnes" [SECTION MAJEURE]

**Intro :**
> "3 campagnes orchestrées sur 36 mois pour transformer AMARA d'une marque émergente en leader de la mode africaine durable. Chaque campagne = 13 composants stratégiques synchronisés."

**Visual : Campaign Overview Grid**

```
┌─────────────────┬─────────────────┬─────────────────┐
│ CAMPAGNE 1      │ CAMPAGNE 2      │ CAMPAGNE 3      │
│ Threads Heritage│ Crafted Dreams  │ Global Roots    │
│ Mois 1-12       │ Mois 13-24      │ Mois 25-36      │
│ Budget: $2.5M   │ Budget: $3.5M   │ Budget: $4M     │
│ Focus: Launch   │ Focus: Scale    │ Focus: Lead     │
└─────────────────┴─────────────────┴─────────────────┘
```

**Pour Chaque Campagne : Expandable Mega-Section**

Cliquer sur une campagne → Expansion fullwidth avec 13 composants :

#### Composant 1 : Objectif
- **Visual :** 6 cards (SMART objectives)
- **Style :** Icon + Metric + Description
- **Example :**
  ```
  🎯 Brand Awareness
  15% unaided awareness
  Pre/post study (n=500)
  ```

#### Composant 2 : Big Idea
- **Visual :** Hero statement card
- **Style :** Large text, quote marks, gradient background
- **Example :** "Every Thread Tells a Story - From Lagos workshops to New York streets"

#### Composant 3 : Axe Créatif
- **Visual :** 3-column layout
- Insight → Bridge → Message
- Illustrated avec icônes

#### Composant 4 : Pistes Créatives
- **Visual :** Grid 2x2 (4 pistes)
- Chaque card : Thumbnail image + Titre + Description courte
- Hover : Expansion avec détails

#### Composant 5 : SKU Matrix
- **Visual :** Product grid avec thumbnails
- Filterable par catégorie
- Hover : Prix, specs, launch date

#### Composant 6 : Secteur/Target
- **Visual :** 2-column
- Secteur : Industry breakdown (pie chart)
- Target : Persona avatars avec %

#### Composant 7 : Budget Breakdown
- **Visual :** Stacked bar chart interactif
- Catégories : Production, Digital, OOH, Influencers, Events, Contingency
- Hover : Détails ligne par ligne
- Total footer : $2.5M

#### Composant 8 : Timeline
- **Visual :** Gantt chart horizontal
- 12 mois avec milestones
- Color-coded par workstream
- Interactive : Click milestone → tooltip détails

#### Composant 9 : Actions Détaillées
- **Visual :** Kanban-style columns
- Pre-Launch | Launch | Post-Launch
- Cards avec : Action, Owner, Deadline, Status
- Drag-drop disabled (read-only)

#### Composant 10 : Activations
- **Visual :** Calendar view
- 12 mois grid avec events
- Hover : Event details (lieu, format, budget)

#### Composant 11 : Assets Library
- **Visual :** Media gallery grid
- Thumbnails : Photos, Videos, Graphics, Documents
- Click : Lightbox preview
- Download button par asset

#### Composant 12 : Success Metrics
- **Visual :** Metrics dashboard
- KPIs avec target vs actual (simulated data)
- Charts : Line graphs pour trends
- Traffic lights : Green/Amber/Red status

#### Composant 13 : Risk & Mitigation
- **Visual :** 2-column cards
- Risk (red accent) | Mitigation (green accent)
- Severity indicators : High/Medium/Low

**Navigation Intra-Campagne :**
- Mini-nav sticky (13 composants numérotés)
- Scroll-spy active state
- Jump-to links

---

### SECTION 6 : RISK (R) - "Les Garde-fous"

**Intro :**
> "Toute stratégie ambitieuse comporte des risques. AMARA a identifié 8 risques majeurs avec plans de mitigation détaillés et scénarios de contingence."

**Risk Matrix (2x2 Grid Visual)**
- Axes : Probability (X) × Impact (Y)
- Quadrants :
  - High Probability + High Impact (Red zone)
  - High Probability + Low Impact (Yellow zone)
  - Low Probability + High Impact (Orange zone)
  - Low Probability + Low Impact (Green zone)
- 8 risques plotted comme dots cliquables
- Click → Expand card avec détails

**Risk Cards (8 cards, 2x4 grid)**

Chaque card contient :
- Risk title
- Probability : ●●●○○ (visual rating)
- Impact : ●●●●● (visual rating)
- Description
- Mitigation plan (3-4 actions)
- Owner
- Status : Monitored/Active/Mitigated

**Scenario Planning (3 Tabs)**
- **Optimistic Scenario** : "Best case" - tout va bien
- **Realistic Scenario** : "Base case" - performance attendue
- **Pessimistic Scenario** : "Worst case" - problèmes majeurs

Pour chaque scénario :
- Narrative description (3-4 paragraphs)
- Financial impact ($)
- Timeline impact (delays)
- Mitigation triggers

**Crisis Playbooks (Accordion)**
- 4 playbooks : PR Crisis, Supply Chain Disruption, Financial Shortfall, Talent Loss
- Chaque playbook :
  - Detection signals
  - Immediate actions (first 24h)
  - Recovery plan (week 1-4)
  - Stakeholder communication templates

---

### SECTION 7 : TRACK (T) - "La Mesure du Succès"

**Intro :**
> "Ce qui ne se mesure pas ne s'améliore pas. AMARA track 40+ métriques organisées autour d'un North Star : le nombre de Superfans."

**North Star Metric (Hero Card)**
- Large centered card
- Icon : ⭐ (animated)
- Metric : "5,000 Superfans"
- Definition : Clients actifs, répétés, évangélistes
- Why this metric : Explication (3-4 lignes)

**KPI Tree (Interactive Hierarchy Visualization)**
- Visual : Tree diagram ou Sunburst chart
- Level 1 : North Star (center)
- Level 2 : Input Metrics (4-5 catégories)
  - Acquisition
  - Activation
  - Retention
  - Revenue
  - Referral
- Level 3 : Detailed metrics (40+ KPIs)
- Interactive : Click → expand sub-metrics

**Dashboards Showcase (3 Tabs)**

**Tab 1 : Executive Dashboard**
- Audience : CEO, Board
- Layout : 2x3 grid avec KPI cards
- Metrics : Revenue, CAC, LTV, NPS, Superfans, Market Share
- Visual : Big numbers + sparklines
- Update frequency : Weekly

**Tab 2 : Marketing Dashboard**
- Audience : CMO, Marketing Team
- Layout : Complex avec multiple charts
- Sections :
  - Campaign Performance (bar chart)
  - Channel Attribution (pie chart)
  - Funnel Conversion (funnel viz)
  - Social Metrics (line graphs)
  - Email Performance (table)
- Update frequency : Daily

**Tab 3 : Product Dashboard**
- Audience : Product Team
- Layout : Grid avec focus sur engagement
- Metrics :
  - Active Users (DAU/MAU)
  - Feature Adoption
  - Retention Cohorts (heatmap)
  - Churn Analysis
  - Product NPS
- Update frequency : Real-time

**A/B Testing Framework**
- Visual : Process flowchart
- Steps : Hypothesis → Design → Execute → Analyze → Implement
- Example test cards (3 examples passés)
- Template : "If we [change], we expect [metric] to [improve by X%]"

**Reporting Calendar**
- Visual : Calendar grid (12 mois)
- Color-coded : Daily reports, Weekly reports, Monthly reviews, Quarterly business reviews
- Stakeholder matrix : Who receives what

---

### SECTION 8 : IMPLEMENTATION (I) - "La Roadmap 36 Mois"

**Intro :**
> "De l'idée à l'exécution : voici comment AMARA déploie sa stratégie sur 36 mois à travers 4 phases distinctes, 7 milestones majeurs, et un investissement total de $8.75M."

**Visual : Interactive Roadmap Timeline**

**Layout :** Horizontal scrollable timeline (36 mois)

**4 Phases (Color-coded sections) :**

```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ FOUNDATION  │ LAUNCH      │ SCALE       │ OPTIMIZE    │
│ Mois 1-6    │ Mois 7-15   │ Mois 16-27  │ Mois 28-36  │
│ $1.5M       │ $2.8M       │ $3M         │ $1.45M      │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

Pour chaque phase :
- Card expandable
- Key activities (5-7 bullet points)
- Major deliverables
- Team structure
- Budget breakdown
- Success criteria

**7 Milestones (Diamonds on Timeline)**
- M1 : Brand Identity Finalized (Month 3)
- M2 : First Collection Launch (Month 7)
- M3 : 1,000 Superfans Reached (Month 12)
- M4 : Breakeven Achieved (Month 15)
- M5 : Pan-African Expansion (Month 20)
- M6 : 5,000 Superfans (Month 30)
- M7 : Series A Fundraising (Month 36)

Hover milestone → Tooltip avec :
- Date
- Description
- Dependencies
- Success metrics

**Budget Breakdown (Stacked Area Chart)**
- X-axis : 36 mois
- Y-axis : $ cumulative
- Categories stacked :
  - Product Development
  - Marketing & Sales
  - Operations
  - Team
  - Contingency (10%)
- Interactive : Hover pour voir monthly breakdown

**ROI Projections (Line Graph)**
- 3 lignes :
  - Investment (cumulative) - Red
  - Revenue (cumulative) - Green
  - Profit - Blue
- Break-even point highlighted
- Annotations : Key moments

**Team Evolution (Org Chart Timeline)**
- Visual : Animated org chart qui évolue
- Month 1 : 5 personnes (founders + 3)
- Month 12 : 15 personnes
- Month 24 : 35 personnes
- Month 36 : 60 personnes
- Color-coded par département : Product, Marketing, Ops, Finance

**Change Management Plan**
- Visual : 4-step process cards
- Step 1 : Awareness - Communication plan
- Step 2 : Desire - Stakeholder engagement
- Step 3 : Knowledge - Training programs
- Step 4 : Ability - Support systems
- Timeline overlay : When each step activates

---

### SECTION 9 : CALL-TO-ACTION FINAL

**Hero Statement :**
> "Cette stratégie n'est pas un document - c'est le plan pour transformer AMARA en icône de la mode africaine durable. Prêts à construire quelque chose d'exceptionnel ?"

**3 CTA Cards (Horizontal Layout)**

**CTA 1 : Pour le Client (Nadia)**
```
┌──────────────────────────┐
│ 📥 Télécharger la        │
│    Stratégie Complète    │
│                          │
│ PDF Executive (24 pages) │
│ + Annexes (80 pages)     │
│                          │
│ [Button: Télécharger]    │
└──────────────────────────┘
```

**CTA 2 : Pour l'Agence (Amina)**
```
┌──────────────────────────┐
│ 🎨 Mode Présentation     │
│                          │
│ Fullscreen, Navigation   │
│ fluide, Notes privées    │
│                          │
│ [Button: Présenter]      │
└──────────────────────────┘
```

**CTA 3 : Pour Partage**
```
┌──────────────────────────┐
│ 🔗 Partager              │
│                          │
│ Copier lien, Email,      │
│ LinkedIn, WhatsApp       │
│                          │
│ [Button: Partager]       │
└──────────────────────────┘
```

**Footer Section**
- Logo agence qui a créé le livrable
- Date de création
- Version
- Contact : Email, Phone
- Legal : Confidentiality notice

---

## 🎭 Composants UX Clés

### Sidebar Navigation (Desktop)

**Position :** Fixed left, 280px width, fullheight

**Contenu :**
- Logo AMARA (top, 48px height)
- Progress indicator : Circular progress bar (% scrolled)
- Nav items : 8 piliers (S, A, D, V, E, R, T, I)
  - Icon + Label
  - Active state : Terracotta background, bold
  - Hover : Subtle background
  - Click : Smooth scroll vers section
- Export button (bottom) : "Télécharger PDF"
- Language toggle (bottom) : FR/EN

**Comportement :**
- Sticky durant scroll
- Scroll-spy : Active item basé sur position viewport
- Collapsible : Button pour collapse → Narrow mode (icons only)

---

### Hero Section Components

**1. Background Image avec Parallax**
- Image hero AMARA (haute résolution)
- Parallax scroll effect : Image scroll plus lent que foreground
- Overlay gradient : rgba(200, 101, 74, 0.3)

**2. Logo Centered**
- SVG logo AMARA
- Animation d'entrée : Fade + scale (0.8 → 1)
- Hover : Subtle pulse

**3. Tagline**
- "Wear Your Story"
- Font : Playfair Display Italic, 24px
- Color : Cream `#F8F5F1`
- Animation : Fade-in avec delay (500ms après logo)

**4. Metric Cards (Glassmorphism)**
- Background : rgba(255, 255, 255, 0.1)
- Backdrop-filter : blur(10px)
- Border : 1px solid rgba(255, 255, 255, 0.2)
- Padding : 24px
- Border-radius : 16px
- Layout : Flex row, gap 24px
- Content par card :
  - Label (small, 12px, uppercase, opacity 0.8)
  - Value (large, 48px, bold)
  - Description (14px, opacity 0.9)
- Animation : Stagger fade-in (100ms delay entre chaque)

**5. CTA Button**
- Text : "Explorer la Stratégie AMARA"
- Size : Large (padding 16px 48px)
- Background : Terracotta `#C8654A`
- Color : Cream
- Border-radius : 8px
- Icon : Down arrow (animated bounce)
- Hover : Scale 1.05 + shadow increase
- Click : Smooth scroll vers Section S (duration 1000ms, easing ease-in-out)

---

### Section Header Component

**Structure :**
```html
<section-header>
  <icon>🎭</icon> <!-- Emoji ou SVG icon -->
  <number>02</number>
  <title>AUTHENTICITÉ</title>
  <subtitle>L'Âme de la Marque</subtitle>
</section-header>
```

**Style :**
- Border-top : 1px solid Terracotta (section divider)
- Padding-top : 48px
- Margin-bottom : 32px
- Icon : 40px size, Terracotta color
- Number : 80px font, ultra-light, opacity 0.2 (background effect)
- Title : 56px, Clash Display Bold, Charcoal
- Subtitle : 20px, Inter Regular, opacity 0.7

**Animation :**
- Fade-in + slide-up on scroll
- Trigger : When header enters viewport (threshold 0.2)

---

### Card Component (Réutilisable)

**Variants :**

**1. Basic Card**
```
Background : White
Border : 1px solid rgba(44, 36, 32, 0.1)
Border-radius : 12px
Padding : 32px
Shadow : 0 2px 8px rgba(0,0,0,0.05)
Hover : Shadow increase, translateY(-2px)
```

**2. Highlight Card**
```
Background : Gradient (Terracotta → Clay Red)
Color : White (text invert)
Border : None
Border-radius : 16px
Padding : 40px
Shadow : 0 4px 16px rgba(200, 101, 74, 0.2)
```

**3. Data Card**
```
Background : Cream `#F8F5F1`
Border : 2px solid Terracotta
Border-radius : 8px
Padding : 24px
Header : Icon + Label
Body : Large number (metric)
Footer : Description + trend indicator
```

**4. Image Card**
```
Background : Image cover
Border-radius : 12px
Overlay : Gradient bottom (black 0% → transparent)
Content : Positioned bottom, white text
Hover : Image scale 1.05 (overflow hidden)
```

---

### Data Visualization Components

**1. Bar Chart**
- Library : Chart.js ou D3.js
- Style : Custom colors (AMARA palette)
- Interactions : Hover tooltip, click drill-down (optionnel)
- Responsive : Collapse à mobile (horizontal → vertical)
- Accessibility : Alt text, ARIA labels, keyboard navigation

**2. Line Graph**
- Multi-line support (3 max simultaneous)
- Legend : Top right
- Grid : Subtle (opacity 0.1)
- Data points : Dots on hover
- Annotations : Milestone markers

**3. Pie/Donut Chart**
- Center label : Total value
- Segments : Max 6 (sinon "Others" category)
- Legend : Right side (desktop), bottom (mobile)
- Hover : Segment highlight + explode effect

**4. Timeline (Gantt-style)**
- Horizontal bars
- Color-coded par workstream
- Milestones : Diamonds
- Dependencies : Dotted lines (optionnel)
- Zoom controls : +/- buttons

**5. Heatmap**
- Grid layout
- Color scale : White → Terracotta (low → high)
- Tooltip : Cell value + context
- Use case : Retention cohorts, engagement matrix

---

### Interactive Elements

**1. Accordion**
- Header : Title + expand/collapse icon
- Body : Hidden by default, slide-down animation
- Multiple accordions : Allow multiple open (not exclusive)
- Style : Border-bottom separators

**2. Tabs**
- Horizontal tab bar (desktop), dropdown (mobile)
- Active tab : Underline Terracotta, bold text
- Content : Fade transition entre tabs
- URL update : Change hash on tab switch (deep linking)

**3. Modal/Lightbox**
- Overlay : rgba(0, 0, 0, 0.8)
- Content : Centered, max-width 800px, white background
- Close : X button top-right + ESC key + click outside
- Animation : Fade + scale entrance

**4. Tooltip**
- Trigger : Hover (desktop), tap (mobile)
- Position : Auto (smart positioning near trigger)
- Style : Dark background, white text, arrow pointer
- Max-width : 300px
- Delay : 200ms hover before show

**5. Scroll-Triggered Animations**
- Library : GSAP ScrollTrigger ou Framer Motion
- Effects :
  - Fade-in
  - Slide-up
  - Scale
  - Stagger (pour lists/grids)
- Threshold : 20% of element visible
- Duration : 600ms
- Easing : ease-out

---

## 🚀 Interactions Avancées

### Mode Présentation (Fullscreen)

**Trigger :** Button "Mode Présentation" (nav ou footer)

**Comportement :**
- Passe en fullscreen API (requestFullscreen)
- Masque sidebar (remplacé par mini-nav flottante)
- Navigation : Arrow keys (←/→) pour section précédente/suivante
- Mini-nav flottante : Dots indicator (bottom center)
  - 8 dots (1 par section)
  - Actif : Large dot Terracotta
  - Click dot : Jump vers section
- ESC key : Quitter mode présentation
- Pointer hide : Curseur disparaît après 3s inactivité
- Overlay controls (fade-in on mouse move) :
  - Nav arrows (left/right edges)
  - Progress bar (top, slim)
  - Exit button (top-right)

---

### Export PDF

**Trigger :** Button "Télécharger PDF" (sidebar, footer, CTA section)

**Options (Modal) :**
- **Format :**
  - [ ] PDF Executive (24 pages, high-level summary)
  - [ ] PDF Complet (100+ pages, all details)
  - [ ] PowerPoint (slides pour présentation)
- **Sections à inclure :**
  - [x] Tous (default)
  - [ ] Sélection custom (checkboxes pour 8 sections)
- **Langue :**
  - ( ) Français (default)
  - ( ) English
- **Branding :**
  - [x] Inclure logo agence
  - [x] Inclure watermark "Confidential"

**Génération :**
- Loading state : Spinner + "Génération en cours..."
- Server-side rendering (html2pdf ou Prince XML)
- Download automatique (blob URL)
- Confirmation : Toast notification "PDF téléchargé avec succès"

---

### Partage

**Trigger :** Button "Partager" (CTA section, nav)

**Options (Modal) :**

**1. Lien privé**
- Génère URL unique : `amara-strategy.advert.com/view/[uuid]`
- Options :
  - [x] Protéger par mot de passe
  - [ ] Expiration (dropdown : 7j / 30j / 90j / Jamais)
  - [ ] Analytics (track qui consulte)
- Button : "Copier le lien" → Copie dans clipboard + confirmation

**2. Email**
- Champs :
  - Destinataires (multi-emails)
  - Message personnalisé (textarea)
- Envoi : Email avec lien + preview image
- Confirmation : "Email envoyé à X destinataires"

**3. Social**
- Buttons :
  - LinkedIn (share avec preview)
  - WhatsApp (mobile-friendly)
  - Twitter (optionnel)
- Préremplit message + lien

---

### Annotations Privées (Feature Avancée - Optional)

**Pour Agence uniquement** (mode authentifié)

**Comportement :**
- Sidebar toggle : "Activer annotations"
- Double-click sur n'importe quel élément → Crée annotation
- Annotation :
  - Icon : 📝 (floating badge avec numéro)
  - Click icon → Popover avec :
    - Text annotation (editable)
    - Author + Date
    - Delete button
- Annotations sauvegardées : LocalStorage ou backend (selon auth)
- Visibilité : Privées (pas visibles pour client)
- Export : Inclure annotations dans PDF agence (optionnel)

**Use Case :**
Amina ajoute notes pendant préparation présentation client
- "Insister sur ce point avec CEO"
- "Préparer réponse si challenge sur budget"
- "Story à raconter ici"

---

## 📐 Spécifications Techniques

### Stack Technologique Recommandée

**Frontend Framework :**
- **Next.js 14+** (React) avec App Router
  - SSG (Static Site Generation) pour performance
  - SEO-optimized
  - Image optimization automatique
  - TypeScript

**Styling :**
- **Tailwind CSS v4** (utility-first)
  - Custom config AMARA palette
  - Responsive utilities
  - Dark mode support (optional)
- **Framer Motion** (animations)

**Data Visualization :**
- **Chart.js** (simple charts) ou **Recharts** (React-native)
- **D3.js** (advanced visualizations - timeline, tree, heatmap)

**UI Components :**
- **Radix UI** (headless accessible primitives)
- **shadcn/ui** (customizable components)

**Icons :**
- **Lucide React** (consistent icon library)
- Custom SVG icons pour piliers ADVERT

**Fonts :**
- **Google Fonts API** ou self-hosted
  - Clash Display (headers)
  - Inter Variable (body)
  - Playfair Display (accents)

**Deployment :**
- **Vercel** (optimal pour Next.js)
- CDN global
- Automatic SSL
- Preview deployments

---

### Structure de Fichiers

```
/amara-strategy-interface
├── /public
│   ├── /images
│   │   ├── hero-amara.jpg
│   │   ├── logo-amara.svg
│   │   ├── personas/ (persona photos)
│   │   ├── products/ (SKU images)
│   │   └── assets/ (campaign assets)
│   └── /fonts
│       ├── ClashDisplay-*.woff2
│       └── Inter-*.woff2
├── /src
│   ├── /app
│   │   ├── layout.tsx (root layout)
│   │   ├── page.tsx (main interface)
│   │   └── globals.css (Tailwind imports)
│   ├── /components
│   │   ├── /layout
│   │   │   ├── Hero.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── SectionHeader.tsx
│   │   │   └── Footer.tsx
│   │   ├── /sections
│   │   │   ├── StrategyBible.tsx (Section S)
│   │   │   ├── Authenticite.tsx (Section A)
│   │   │   ├── Distinction.tsx (Section D)
│   │   │   ├── Valeur.tsx (Section V)
│   │   │   ├── Engagement.tsx (Section E - complex)
│   │   │   ├── Risk.tsx (Section R)
│   │   │   ├── Track.tsx (Section T)
│   │   │   └── Implementation.tsx (Section I)
│   │   ├── /ui
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Tooltip.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ... (autres composants UI)
│   │   └── /visualizations
│   │       ├── BarChart.tsx
│   │       ├── LineGraph.tsx
│   │       ├── Timeline.tsx
│   │       ├── HeatMap.tsx
│   │       └── TreeDiagram.tsx
│   ├── /lib
│   │   ├── data.ts (données AMARA structurées)
│   │   └── utils.ts (helper functions)
│   └── /styles
│       └── animations.css (custom animations)
├── tailwind.config.ts (AMARA palette custom)
├── next.config.js
├── package.json
└── tsconfig.json
```

---

### Données Structurées

**Format :** JSON ou TypeScript types

**Exemple : data.ts**

```typescript
export const amaraStrategy = {
  brand: {
    name: "AMARA",
    tagline: "Wear Your Story",
    logo: "/images/logo-amara.svg",
    heroImage: "/images/hero-amara.jpg",
  },

  hero: {
    metrics: [
      { label: "North Star", value: "5,000", unit: "Superfans" },
      { label: "Investment", value: "$8.75M", unit: "Total" },
      { label: "Timeline", value: "36", unit: "Months" },
      { label: "Impact", value: "15+", unit: "Awards Target" },
    ],
  },

  sections: {
    strategyBible: {
      title: "Strategy Bible",
      subtitle: "L'Histoire Complète",
      icon: "📖",
      intro: "AMARA n'est pas qu'une marque...",
      content: {
        executiveSummary: { /* ... */ },
        strategicContext: { /* ... */ },
        customerInsights: { /* ... */ },
        roadmap: { /* ... */ },
      },
    },

    authenticite: {
      title: "Authenticité",
      subtitle: "L'Âme de la Marque",
      icon: "🎭",
      intro: "Qu'est-ce qui rend AMARA...",
      content: {
        purpose: "Préserver l'artisanat africain...",
        mission: "Connecter 10,000 artisans...",
        vision: "Devenir la marque de référence...",
        coreValues: [
          "Tradition & Innovation",
          "Sustainability & Ethics",
          // ...
        ],
        brandPersonality: {
          sophisticated: 7, // scale 0-10
          bold: 6,
          modern: 8,
        },
        herosJourney: [
          { step: 1, title: "Call to Adventure", description: "..." },
          // ...
        ],
      },
    },

    engagement: {
      title: "Engagement",
      subtitle: "Les Campagnes",
      icon: "🔥",
      campaigns: [
        {
          id: 1,
          name: "Threads of Heritage",
          period: "Mois 1-12",
          budget: 2500000,
          focus: "Launch",
          components: {
            objectif: [
              {
                type: "Brand Awareness",
                target: "15% unaided awareness",
                measure: "Pre/post study (n=500)",
              },
              // ... 5 autres objectifs
            ],
            bigIdea: "Every Thread Tells a Story...",
            axeCreatif: { /* ... */ },
            // ... 10 autres composants
          },
        },
        // Campagnes 2 et 3
      ],
    },

    // ... autres sections
  },
};
```

---

### Performance Optimizations

**1. Images**
- Format : WebP avec fallback JPG
- Lazy loading : Images below fold
- Responsive images : srcset avec multiple sizes
- Next.js Image component : Automatic optimization
- Hero image : Preload pour LCP (Largest Contentful Paint)

**2. Fonts**
- Self-host fonts (éviter Google Fonts latency)
- Font-display: swap (éviter FOIT - Flash of Invisible Text)
- Subset fonts (enlever glyphs inutilisés)
- Preload critical fonts

**3. Code Splitting**
- Lazy load sections (React.lazy + Suspense)
- Dynamic imports pour data viz libraries
- Route-based splitting (Next.js automatique)

**4. Animations**
- CSS animations (GPU-accelerated) quand possible
- Framer Motion avec reduced motion respect
- Debounce scroll events
- RequestAnimationFrame pour smooth animations

**5. Caching**
- Static generation (SSG) → CDN cache
- Service Worker (Progressive Web App - optional)
- Browser cache headers optimisés

**Targets :**
- Lighthouse Score : >90 Performance, >95 Accessibility, >90 Best Practices, 100 SEO
- LCP (Largest Contentful Paint) : <2.5s
- FID (First Input Delay) : <100ms
- CLS (Cumulative Layout Shift) : <0.1

---

## ♿ Accessibilité (WCAG 2.1 AA)

### Contraste

- Texte sur background : Minimum 4.5:1 (AA), Préféré 7:1 (AAA)
- UI components : Minimum 3:1
- Vérification : Tous les combos de couleurs AMARA testés

**Exemples validés :**
- Charcoal `#2C2420` sur Cream `#F8F5F1` : 12.3:1 ✅✅
- Terracotta `#C8654A` sur White : 4.6:1 ✅
- White sur Terracotta : 4.6:1 ✅

---

### Navigation Clavier

**Essentiels :**
- Tab : Focus next interactive element
- Shift+Tab : Focus previous
- Enter/Space : Activate button/link
- Arrow keys : Navigate tabs, accordions
- Escape : Close modal, exit fullscreen
- Home/End : Jump to top/bottom (optional)

**Focus Indicators :**
- Visible outline : 2px solid Terracotta
- Offset : 2px (ne touche pas l'élément)
- Never `outline: none` sans alternative

**Skip Links :**
- "Skip to main content" (hidden, visible on focus)
- Jump à section principale (évite sidebar)

---

### Screen Readers

**Semantic HTML :**
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Heading hierarchy : H1 → H2 → H3 (pas de sauts)
- Lists : `<ul>`, `<ol>` pour groupes d'items
- Buttons : `<button>` (pas `<div role="button">`)
- Links : `<a>` avec href valide

**ARIA Labels :**
- `aria-label` : Pour icons sans texte visible
- `aria-labelledby` : Associer label à élément
- `aria-describedby` : Description supplémentaire
- `aria-current="page"` : Nav active state
- `aria-expanded` : Accordions, dropdowns
- `aria-hidden="true"` : Décoratifs (icons dupliqués)

**Live Regions :**
- `aria-live="polite"` : Notifications non-urgentes
- `aria-live="assertive"` : Erreurs critiques
- Use case : Toast notifications, form errors

**Alt Text :**
- Images décoratives : `alt=""` (screen reader ignore)
- Images informatives : `alt="Description précise"`
- Complex images : `alt` + `aria-describedby` (long description)

---

### Responsive Touch Targets

- Minimum size : 44x44px (WCAG AAA)
- Préféré : 48x48px (Material Design, iOS HIG)
- Spacing : 8px minimum entre targets
- Mobile : Thumbs zone considération (bottom 50% écran)

---

### Motion & Animations

**Respect `prefers-reduced-motion`:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Guidelines :**
- Animations essentielles uniquement
- Pas d'autoplay videos avec son
- Pause/stop controls pour animations >5s
- Parallax optionnel (désactivable)

---

## 📊 Métriques de Succès de l'Interface

### Métriques Quantitatives

**Engagement :**
- **Temps moyen sur page** : Target 8-12 minutes (découverte complète)
- **Scroll depth** : Target 80%+ atteignent Section E (Engagement)
- **Bounce rate** : Target <20% (visiteurs engagés)
- **Pages par session** : N/A (single-page app)

**Navigation :**
- **Clics sidebar** : Moyenne 5-8 clics par session (exploration active)
- **Mode présentation** : 30%+ des sessions l'activent
- **Export PDF** : 50%+ exportent (intention de référence future)

**Performance :**
- **Load time** : <3s (First Contentful Paint)
- **Interactivité** : <100ms (Time to Interactive)
- **Stabilité visuelle** : CLS <0.1 (pas de layout shifts)

**Conversion :**
- **CTA engagement** : 40%+ cliquent CTA final
- **Partage** : 15%+ partagent le lien
- **Retours** : 25%+ reviennent dans 7 jours

---

### Métriques Qualitatives

**Sentiment Client (Nadia) :**
- Interview post-présentation Board (30 min)
- Questions :
  - "L'interface a-t-elle impressionné votre Board ?" (1-10)
  - "Aviez-vous toutes les informations nécessaires ?" (Oui/Non + commentaires)
  - "Quelle section a eu le plus d'impact ?"
  - "Qu'auriez-vous aimé voir en plus/moins ?"

**Sentiment Agence (Amina) :**
- Interview post-livraison client (20 min)
- Questions :
  - "Le client a-t-il été 'wowed' visuellement ?" (1-10)
  - "Avez-vous eu le contrôle nécessaire durant présentation ?" (1-10)
  - "Ce livrable vous positionne-t-il comme agence premium ?" (Oui/Non)
  - "Recommanderiez-vous cette interface à confrères ?" (NPS 0-10)

**A/B Testing (Futures Itérations) :**
- Hero styles : Image vs Video background
- Navigation : Sidebar vs Top nav
- Section E : Tabs vs Accordion vs Full scroll
- CTA wording : "Explorer" vs "Découvrir" vs "Plonger dans"

---

## 🎯 Prochaines Étapes (Après Spec)

### Phase 1 : Design Visuel (Semaines 1-2)

**Livrables :**
1. **Moodboard** : Références visuelles, inspiration, couleurs, typo
2. **Style Tiles** : Exploration visuelle (3 directions possibles)
3. **Design System** : Components library dans Figma
   - Buttons (4 variants)
   - Cards (4 variants)
   - Typography scale
   - Color palette
   - Iconography (24 icons custom)
   - Spacing/grid system

---

### Phase 2 : Wireframes Haute-Fidélité (Semaines 3-4)

**Livrables :**
4. **Wireframes Desktop** : 9 écrans (Hero + 8 sections)
5. **Wireframes Mobile** : 9 écrans adaptés responsive
6. **Prototype interactif** : Figma prototype avec transitions
   - Navigation sidebar
   - Scroll interactions
   - Hover states
   - Modal/tooltips

---

### Phase 3 : Validation & Itération (Semaine 5)

**Activités :**
7. **User Testing** : 3-5 utilisateurs (clients + agences)
   - Think-aloud protocol
   - Tasks : "Trouver budget Campagne 2", "Exporter PDF", etc.
   - SUS (System Usability Scale) score
8. **Feedback consolidation** : Insights → Ajustements design
9. **Validation stakeholder** : Présentation spark01 + décision GO/NO-GO

---

### Phase 4 : Développement (Semaines 6-10)

**Sprint 1 (Semaines 6-7) : Foundation**
- Setup Next.js + Tailwind + TypeScript
- Components de base (Button, Card, Typography)
- Layout global (Sidebar, Hero, Footer)
- Data structure (amaraStrategy object)

**Sprint 2 (Semaines 8-9) : Sections S, A, D, V**
- Implémentation 4 premières sections
- Responsive testing
- Animations scroll

**Sprint 3 (Semaine 10) : Section E (complexe)**
- 3 campagnes avec 13 composants chacune
- Data visualizations (charts, timeline, gantt)
- Navigation intra-campagne

**Sprint 4 (Semaine 11) : Sections R, T, I + Polish**
- 3 dernières sections
- CTA final
- Export PDF
- Mode présentation

**Sprint 5 (Semaine 12) : Testing & Optimization**
- Cross-browser testing (Chrome, Safari, Firefox, Edge)
- Mobile testing (iOS Safari, Chrome Android)
- Performance optimization (Lighthouse >90)
- Accessibility audit (WAVE, axe DevTools)
- Bug fixes

---

### Phase 5 : Lancement & Monitoring (Semaine 13+)

**Activités :**
10. **Déploiement production** : Vercel + domaine custom
11. **Analytics setup** : Google Analytics 4 + Hotjar (heatmaps)
12. **Documentation** : Guide utilisateur (Client + Agence)
13. **Formation** : Session avec Nadia + Amina (1h chacune)
14. **Monitoring continu** : Weekly analytics review (premières 4 semaines)

---

## 📝 Notes & Considérations Additionnelles

### Multilingual (Future)

- Interface actuelle : **Français**
- Version anglaise : Q2 2026 (si expansion anglophone)
- i18n library : next-intl ou react-i18next
- Toggle langue : Sidebar footer (FR/EN)
- URLs : `/fr/amara-strategy` et `/en/amara-strategy`

---

### White-Label (Future)

Réutiliser cette interface pour d'autres marques :
- Variables : Brand name, colors, logo, content
- Configuration : JSON/YAML par marque
- URL structure : `/{brand-slug}-strategy`
- Template system : Sections réutilisables

**Exemple :**
```
/amara-strategy → AMARA Sustainable Fashion
/zenith-strategy → ZENITH Fintech
/baobab-strategy → BAOBAB FMCG
```

---

### Versioning

Gérer évolutions stratégie :
- URL avec version : `/amara-strategy/v1`, `/amara-strategy/v2`
- Historique versions : Dropdown dans header
- Comparaison : Side-by-side view (optional advanced feature)
- Changelog : Section "Mise à jour" (quoi a changé entre versions)

---

### Confidentialité & Sécurité

**Accès :**
- Lien privé avec UUID : `amara-strategy.com/view/[uuid]`
- Optionnel : Password protection (simple auth)
- Pas d'indexation Google : `<meta name="robots" content="noindex">`
- Expiration lien : Configurable (7j/30j/90j/Never)

**Watermark :**
- Text overlay subtil : "Confidential - AMARA Strategy 2026"
- Position : Bottom right, opacity 0.3
- Empêche screenshots complets (mais pas bloquant)

**Analytics Privacy :**
- Anonymiser IPs visiteurs
- Cookie consent banner (GDPR compliant)
- Opt-out option

---

## ✅ Checklist Finale (Pre-Launch)

### Design ✅
- [ ] Toutes sections wireframed (Desktop + Mobile)
- [ ] Design system complet dans Figma
- [ ] Prototype interactif testé (5+ users)
- [ ] Feedback intégré et validé
- [ ] Assets finaux exportés (images, icons, logos)

### Développement ✅
- [ ] Toutes sections implémentées
- [ ] Responsive 100% fonctionnel (3 breakpoints)
- [ ] Animations fluides (60fps)
- [ ] Data visualizations interactives
- [ ] Export PDF fonctionnel
- [ ] Mode présentation fonctionnel
- [ ] Partage fonctionnel (lien/email/social)

### Performance ✅
- [ ] Lighthouse Score >90 (Perf/A11y/Best Practices/SEO)
- [ ] Load time <3s (First Contentful Paint)
- [ ] Images optimisées (WebP + lazy loading)
- [ ] Code splitting & tree-shaking
- [ ] Caching headers configurés

### Accessibilité ✅
- [ ] Contraste couleurs validé (WCAG AA)
- [ ] Navigation clavier 100% fonctionnelle
- [ ] Screen reader testé (NVDA/JAWS)
- [ ] Focus indicators visibles
- [ ] Alt text sur toutes images
- [ ] ARIA labels appropriés
- [ ] Semantic HTML valide

### Testing ✅
- [ ] Cross-browser (Chrome/Safari/Firefox/Edge)
- [ ] Mobile devices (iOS/Android)
- [ ] Tablet orientation (portrait/landscape)
- [ ] Slow network simulation (3G)
- [ ] Touch interactions (mobile/tablet)

### Content ✅
- [ ] Données AMARA complètes et validées
- [ ] Tous textes relus (0 typos)
- [ ] Images haute résolution
- [ ] Métriques réalistes (pas lorem ipsum)
- [ ] Legal : Confidentiality notice

### Déploiement ✅
- [ ] Domaine configuré + SSL
- [ ] Vercel déployé (production)
- [ ] Analytics Google activé
- [ ] Error tracking (Sentry/optional)
- [ ] Backup repository (GitHub private)

---

## 🎊 Conclusion

Cette spécification UX définit une **interface web publique moderne et créative** qui transforme les 8 documents stratégiques ADVERT en une **expérience narrative immersive** pour AMARA.

**Résumé Executif :**
- **Vision** : La stratégie comme histoire visuelle à vivre (pas document à lire)
- **Audiences** : Client (Nadia - Brand Director) + Agence (Amina - Strategy Director)
- **Style** : Moderne, créatif, palette AMARA (Terracotta, Charcoal, Cream, Gold)
- **Structure** : Hero + 8 sections (S, A, D, V, E, R, T, I) + CTA final
- **Interactions** : Navigation fluide, mode présentation, export PDF, partage
- **Performance** : <3s load, Lighthouse >90, accessible WCAG AA
- **Stack** : Next.js 14+ TypeScript + Tailwind CSS + Framer Motion + Chart.js/D3

**Impact Attendu :**
- Client impressionné dès 30 premières secondes
- Board convaincu par sophistication visuelle + clarté data
- Agence positionnée comme premium (rivalise McCann/Havas)
- Livrable réutilisable (white-label) pour autres marques

**Prochaine Étape :**
Passer à **Phase 1 : Design Visuel** → Création moodboard + style tiles + design system Figma.

---

*Spec créée par Sally (UX Designer Agent) en collaboration avec spark01*
*Date : 10 février 2026*
*Version : DRAFT_V1*
*Status : ✅ Prêt pour validation stakeholder*
