# 🚀 AMARA Strategic Interface - Integration Guide

**Version 2.0 Premium** | Guide de migration et d'utilisation des composants avancés

---

## 📦 Nouveaux Fichiers Créés

### CSS
- ✅ `assets/css/main.css` - Design system de base (existant, amélioré)
- ✅ `assets/css/components.css` - **NOUVEAU** - Composants avancés

### JavaScript
- ✅ `assets/js/app.js` - App de base (existant)
- ✅ `assets/js/navigation.js` - Navigation simple (existant)
- ✅ `assets/js/navigation-advanced.js` - **NOUVEAU** - Navigation avancée avec scroll-spy, présentation mode, recherche
- ✅ `assets/js/visualizations.js` - **NOUVEAU** - Charts et data viz

### HTML
- ✅ `index.html` - **MIS À JOUR** - Hero premium + Dashboard
- ✅ `export-to-pdf.html` - Outil d'export (existant)

---

## 🎯 Fonctionnalités Implémentées

### ✅ Phase 1 : Hero + Dashboard (FAIT)
- Hero fullscreen immersif avec glassmorphism
- 4 metric cards animées
- Dashboard avec 8 document cards color-coded
- Animations scroll-triggered
- Parallax effect

### ✅ Phase 2 : Navigation Avancée (FAIT)
- **Scroll-spy** : Auto-highlight sections actives dans sidebar
- **Smooth scroll** : Navigation fluide vers sections
- **Progress indicator** : Barre de progression lecture
- **Back-to-top** : Bouton flottant retour en haut
- **Sidebar toggle** : Menu mobile responsive
- **Keyboard navigation** : Raccourcis clavier
  - `P` - Toggle présentation mode
  - `ESC` - Quitter présentation
  - `←/→` - Navigation sections (en mode présentation)
  - `/` - Focus recherche

### ✅ Phase 3 : Mode Présentation (FAIT)
- **Fullscreen API** : Présentation immersive
- **Navigation au clavier** : Arrow keys pour naviguer
- **Mini-nav flottante** : Dots indicator + prev/next
- **Contrôles overlay** : Apparaissent au hover
- **Auto-sync** : Sections auto-trackées

### ✅ Phase 4 : Recherche Globale (FAIT)
- **Index automatique** : Indexe tout le contenu au chargement
- **Recherche temps réel** : Résultats instantanés
- **Highlighting** : Mots recherchés surlignés
- **Snippets** : Contexte autour des résultats
- **Jump to section** : Click pour naviguer

### ✅ Phase 5 : Data Visualizations (FAIT)
- **Chart.js intégration** : Auto-load CDN
- **Bar charts** : Budget breakdown, comparaisons
- **Line charts** : Performance over time
- **Donut charts** : Market share, distributions
- **Timeline** : Gantt-style roadmap
- **Progress bars** : Milestone completion
- **Metric cards** : KPIs animés avec trends

---

## 🔧 Intégration dans Documents Existants

### Étape 1 : Inclure les Nouveaux CSS/JS

Ajoutez dans le `<head>` de chaque document :

```html
<!-- Après main.css -->
<link rel="stylesheet" href="../assets/css/components.css">

<!-- Avant </body> -->
<script src="../assets/js/navigation-advanced.js"></script>
<script src="../assets/js/visualizations.js"></script>
```

### Étape 2 : Utiliser la Nouvelle Structure HTML

**Ancien layout :**
```html
<div class="app-container">
  <header class="app-header">...</header>
  <div class="content-wrapper">...</div>
</div>
```

**Nouveau layout (avec sidebar sticky) :**
```html
<div class="app-container">
  <header class="app-header">...</header>

  <div class="document-layout">
    <!-- SIDEBAR STICKY -->
    <aside class="document-sidebar">
      <div class="sidebar-header">
        <div class="doc-badge" style="background: var(--primary);">S</div>
        <div>
          <h3>Strategy Bible</h3>
          <p>L'Histoire Complète</p>
        </div>
      </div>

      <nav class="sidebar-nav">
        <a href="#section-1" class="sidebar-link active">
          <span class="sidebar-number">1</span>
          <span>Executive Summary</span>
        </a>
        <a href="#section-2" class="sidebar-link">
          <span class="sidebar-number">2</span>
          <span>Strategic Context</span>
        </a>
        <!-- Plus de sections... -->
      </nav>

      <div class="sidebar-stats">
        <div class="stat-item">
          <div class="stat-label">Budget</div>
          <div class="stat-value">$2.5M</div>
        </div>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="document-main">
      <div class="document-content">
        <div class="document-header">
          <div class="breadcrumb">
            <a href="../index.html">Home</a>
            <span>/</span>
            <span>Document S</span>
          </div>
          <h1 class="document-title">
            Strategy Bible
            <span class="title-subtitle">Document S - L'Histoire Complète</span>
          </h1>
        </div>

        <div class="content-divider"></div>

        <!-- SECTIONS -->
        <section id="section-1" class="content-section">
          <div class="section-header">
            <span class="section-number">01</span>
            <h2 class="section-title">Executive Summary</h2>
          </div>

          <div class="card card-highlight">
            <h3>North Star Metric</h3>
            <p>Superfans: 5,000 by Year 3</p>
          </div>

          <div class="grid grid-2">
            <div class="card">...</div>
            <div class="card">...</div>
          </div>
        </section>

        <!-- Plus de sections... -->

        <div class="document-footer">
          <div class="footer-nav">
            <a href="document-previous.html" class="btn btn-outline">← Previous</a>
            <a href="document-next.html" class="btn btn-primary">Next →</a>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
```

---

## 📊 Utiliser les Visualizations

### Example 1 : KPI Cards

```html
<div id="kpi-container"></div>

<script>
  Visualizations.createKPICard({
    container: '#kpi-container',
    label: 'Revenue',
    value: '$2.1M',
    trend: 'up',
    trendValue: '+75%',
    icon: '💰'
  });
</script>
```

### Example 2 : Bar Chart (Budget Breakdown)

```html
<canvas id="budgetChart" height="300"></canvas>

<script>
  const budgetData = {
    labels: ['Marketing', 'Product', 'Operations', 'Tech'],
    datasets: [{
      label: 'Budget Allocation',
      data: [970, 320, 350, 120],
      backgroundColor: [
        'oklch(55% 0.15 30)',
        'oklch(60% 0.18 145)',
        'oklch(60% 0.15 240)',
        'oklch(70% 0.18 60)'
      ]
    }]
  };

  Visualizations.createBarChart('budgetChart', budgetData, {
    title: 'Campaign 1 Budget Breakdown',
    format: 'currency'
  });
</script>
```

### Example 3 : Line Chart (Revenue Over Time)

```html
<canvas id="revenueChart" height="300"></canvas>

<script>
  const revenueData = {
    labels: ['M1', 'M6', 'M12', 'M18', 'M24', 'M30', 'M36'],
    datasets: [{
      label: 'Revenue',
      data: [1.2, 1.5, 2.1, 4.5, 8.5, 16, 24],
      borderColor: 'oklch(55% 0.15 30)',
      backgroundColor: 'oklch(55% 0.15 30 / 0.1)',
      tension: 0.4
    }]
  };

  Visualizations.createLineChart('revenueChart', revenueData, {
    title: '36-Month Revenue Projection',
    format: 'currency'
  });
</script>
```

### Example 4 : Timeline (Roadmap)

```html
<div id="roadmap-timeline"></div>

<script>
  const roadmapEvents = [
    {
      title: 'Phase 0: Foundation',
      start: '2026-01-01',
      end: '2026-03-31',
      color: 'oklch(60% 0.18 270)',
      description: 'Build core capabilities'
    },
    {
      title: 'Phase 1: Launch',
      start: '2026-04-01',
      end: '2026-12-31',
      color: 'oklch(55% 0.15 30)',
      description: 'Go-to-market execution'
    },
    {
      title: 'Phase 2: Growth',
      start: '2027-01-01',
      end: '2027-12-31',
      color: 'oklch(60% 0.18 145)',
      description: 'Scale operations'
    },
    {
      title: 'Phase 3: Scale',
      start: '2028-01-01',
      end: '2028-12-31',
      color: 'oklch(70% 0.18 60)',
      description: 'Multi-market expansion'
    }
  ];

  Visualizations.createTimeline('roadmap-timeline', roadmapEvents, {
    startDate: '2026-01-01',
    endDate: '2028-12-31'
  });
</script>
```

### Example 5 : Progress Bar

```html
<div id="milestone-progress"></div>

<script>
  Visualizations.createProgressBar('milestone-progress', 67, {
    label: 'Phase 1 Completion',
    color: 'var(--primary)',
    height: 12
  });
</script>
```

### Example 6 : Metric Comparison

```html
<div id="metrics-comparison"></div>

<script>
  const comparisonMetrics = [
    { label: 'Current', value: '$1.2M', color: 'var(--text-tertiary)' },
    { label: 'Year 1', value: '$2.1M', color: 'var(--primary)', change: 75 },
    { label: 'Year 3', value: '$24M', color: 'var(--success)', change: 1900 }
  ];

  Visualizations.createMetricComparison('metrics-comparison', comparisonMetrics);
</script>
```

---

## ⌨️ Raccourcis Clavier

| Key | Action |
|-----|--------|
| `P` | Toggle présentation mode |
| `ESC` | Quitter présentation mode |
| `←` | Section précédente (en présentation) |
| `→` | Section suivante (en présentation) |
| `/` | Focus recherche |

---

## 🎨 Classes CSS Utilitaires

### Cards
```html
<div class="card">Basic card</div>
<div class="card card-highlight">Highlighted card (gradient)</div>
```

### Grids
```html
<div class="grid grid-2">
  <div class="card">...</div>
  <div class="card">...</div>
</div>

<div class="grid grid-3">...</div>
<div class="grid grid-4">...</div>
```

### Badges
```html
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
```

### Buttons
```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-lg">Large</button>
```

---

## 🧪 Testing

### Desktop
1. Ouvrir `index.html` dans browser
2. Tester hero scroll + parallax
3. Click sur document card
4. Tester sidebar navigation + scroll-spy
5. Appuyer sur `P` pour mode présentation
6. Tester recherche avec `/`

### Mobile/Tablet
1. Responsive mode (DevTools)
2. Tester hamburger menu
3. Vérifier cards stacking
4. Tester touch interactions

### Keyboard Navigation
1. Tab through all interactive elements
2. Enter/Space to activate
3. Arrow keys in présentation mode
4. ESC to exit

---

## 📈 Prochaines Étapes

### Priorité Haute
- [ ] Migrer tous les 8 documents vers nouvelle structure
- [ ] Ajouter charts dans documents T (Track) et I (Implementation)
- [ ] Tester cross-browser (Chrome, Firefox, Safari)

### Priorité Moyenne
- [ ] Export PDF avancé avec options
- [ ] Mode annotations (pour agence)
- [ ] Accessibilité WCAG AA audit

### Priorité Basse
- [ ] Next.js migration (optionnel)
- [ ] Dark mode
- [ ] Multilingual (EN/FR)

---

## 🐛 Troubleshooting

### Charts ne s'affichent pas
- Vérifier que Chart.js CDN est chargé
- Vérifier l'ID du canvas
- Ouvrir console pour errors

### Sidebar ne s'affiche pas
- Vérifier `components.css` est inclus
- Vérifier structure HTML (`<aside class="document-sidebar">`)

### Scroll-spy ne fonctionne pas
- Vérifier que sections ont des IDs
- Vérifier que `navigation-advanced.js` est chargé
- Vérifier console pour errors

### Mode présentation bloqué
- Appuyer sur ESC
- Recharger la page

---

## 📞 Support

Pour questions ou bugs :
1. Vérifier console browser (F12)
2. Vérifier ce guide
3. Consulter code source des exemples
4. Contacter équipe BMAD

---

**AMARA Strategic Interface v2.0 Premium**
*Généré par BMAD Framework | Février 2026*
