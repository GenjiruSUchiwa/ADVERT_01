# Architecture de l'Armée d'Agents ADVERT

**Date:** 2026-02-05
**Auteur:** BMad Master + spark01
**Version:** 1.0

---

## Vue d'Ensemble

Ce document définit l'architecture complète du système multi-agent ADVERT pour la création systématisée de cultes de marque.

---

## Hiérarchie de Commandement

```
                    ┌─────────────────────┐
                    │   CONDUCTOR         │
                    │   Agent Maître      │
                    │   (Orchestrateur)   │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌───────────────┐
│  VALIDATOR    │    │   SYNTHESIS     │    │ SLOP          │
│ (Contrôle     │    │  (Agrégation)   │    │ DETECTOR      │
│  Qualité)     │    │                 │    │ (Anti-BS)     │
└───────────────┘    └─────────────────┘    └───────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   ┌─────────────────────────────────────────────────────┐
   │            LES 6 AGENTS PILIERS                     │
   │         (Exécution Séquentielle)                    │
   │                                                     │
   │   [A] → [D] → [V] → [E] → [R] → [T]                │
   └─────────────────────────────────────────────────────┘
```

---

## Les 6 Agents Piliers

### [A] Agent AUTHENTICITÉ

**Mission:** Extraire l'ADN fondamental de la marque

| Module | Input | Output |
|--------|-------|--------|
| Identity Extractor | Nom, archétype, citation fondateur | Fiche identité |
| Hero's Journey Mapper | Interview/docs | 5 étapes narratives |
| Ikigai Processor | 4 cercles guidés | Vision/Mission/Skills |
| Schwartz Values Wheel | Choix forcé 10 valeurs | Hiérarchie valeurs |
| Community Hierarchy | Segmentation | 6 niveaux (Pioneer→Members) |
| Timeline Narrator | Histoire | 4 actes narratifs |

**Dépendances:** Aucune (PREMIER pilier)
**Output vers:** Agent [D]

---

### [D] Agent DISTINCTION

**Mission:** Créer la différenciation compétitive

| Module | Input | Output |
|--------|-------|--------|
| Persona Builder | Data client | Personas + buying journey |
| Competitive Mapper | Marché | 4+ concurrents classifiés |
| Promise Crafter | Valeur [A] | Master + Sub-promises |
| Positioning Engine | [A] + Marché | Statement + 5 axes + VS |
| Tone of Voice Designer | Valeurs [A] | Traits + Never/Always Says |
| Visual Identity Director | Essence [A] | Couleurs, mood, symboles |
| Language Asset Generator | ToV | Mantras, vocabulaire propriétaire |

**Dépendances:** Agent [A] complété
**Output vers:** Agent [V]

---

### [V] Agent VALEUR

**Mission:** Définir l'économie de la valeur

| Module | Input | Output |
|--------|-------|--------|
| Product Ladder Builder | Offre | Freemium→Premium tiers |
| CODB Calculator | Coûts ops | Coût opérationnel précis |
| Value-for-Brand Analyzer | [A][D] | Tangible + Intangible value |
| Value-for-Customer Analyzer | Personas [D] | Tangible + Intangible value |
| Cost-for-Brand Calculator | Ops | CAPEX/OPEX + opportunity |
| Cost-for-Customer Calculator | Pricing | Prix + time/effort |
| Unit Economics Engine | Tous | Margins, LTV, CAC |

**Dépendances:** Agents [A][D] complétés
**Output vers:** Agent [E]

---

### [E] Agent ENGAGEMENT

**Mission:** Systématiser les interactions tribales

| Module | Input | Output |
|--------|-------|--------|
| Touchpoint Mapper | Journey | Physique/Digital/Humain |
| Ritual Designer (Always-On) | Valeurs [A] | 3-5 habitudes récurrentes |
| Ritual Designer (Cyclique) | Calendrier | Events annuels |
| Community Principles Writer | [A][D] | 5-10 règles de conduite |
| Anti-Behavior Definer | Valeurs | 3-5 tabous |
| Common Enemy Identifier | Marché | 3-6 ennemis externes |
| Gamification Architect | Hiérarchie [A] | 3-5 niveaux + rites passage |
| AARRR Metrics Builder | Funnel | B2C + B2B metrics |
| KPI Dashboard Generator | Tous | Dashboard complet |

**Dépendances:** Agents [A][D][V] complétés
**Output vers:** Agent [R]

---

### [R] Agent RISK

**Mission:** Challenger et stress-tester TOUT

| Module | Input | Output |
|--------|-------|--------|
| Variable SWOT Generator | Chaque variable | 40+ SWOTs individuels |
| SWOT Aggregator | Tous SWOTs | SWOT global |
| Risk Score Calculator | SWOTs | Score 0-100 |
| Mitigation Recommender | Risks | Actions prioritaires |
| Assumption Challenger | [A][D][V][E] | Questions critiques |
| Blind Spot Detector | Tout | Angles morts identifiés |

**Dépendances:** Agents [A][D][V][E] complétés
**Output vers:** Agent [T]

---

### [T] Agent TRACK

**Mission:** Valider contre la réalité marché

| Module | Input | Output |
|--------|-------|--------|
| Data Source Aggregator | 3 sources | Data existante + online + interviews |
| Cross-Validator | Sources multiples | Résolution conflits |
| Credibility Scorer | Sources | Score fraîcheur/précision/source |
| Market Reality Reporter | Data | État du marché |
| TAM/SAM/SOM Calculator | Marché | Sizing marché |
| Competitive Landscape Mapper | Concurrents | Carte compétitive |
| Trend Identifier | Data | Tendances émergentes |
| Gap Finder | [A-E] vs Marché | Opportunités |
| Red Flag Alerter | Tout | Warnings critiques |

**Dépendances:** Agents [A][D][V][E][R] complétés
**Output:** Fiche ADVERT Complète

---

## Agents Transversaux (Support)

### CONDUCTOR (Orchestrateur Maître)

```yaml
Rôle: Chef d'orchestre de l'armée
Responsabilités:
  - Séquencer l'exécution A→D→V→E→R→T
  - Router les outputs entre agents
  - Gérer les dépendances
  - Déclencher agents transversaux
  - Arbitrer conflits
  - Rapporter progress à l'humain
```

### VALIDATOR (Contrôle Qualité)

```yaml
Rôle: Gardien de la cohérence
Responsabilités:
  - Vérifier complétude chaque output
  - Valider cohérence inter-piliers
  - Checker alignement avec [A] fondamental
  - Bloquer si incohérence détectée
Trigger: Après chaque agent pilier
```

### SYNTHESIS (Agrégateur)

```yaml
Rôle: Tisseur de connections
Responsabilités:
  - Croiser insights entre piliers
  - Identifier patterns émergents
  - Générer recommandations transverses
  - Produire executive summary
Trigger: Après [R], avant [T]
```

### SLOP DETECTOR (Anti-Bullshit)

```yaml
Rôle: Éliminateur de fluff
Responsabilités:
  - Détecter jargon vide ("excellence", "innovation")
  - Flaguer généralités non-actionnables
  - Exiger spécificité et mesurabilité
  - Rejeter outputs "corporate BS"
Trigger: Sur chaque output avant validation
```

---

## Le Schéma Universel (Protocol Agent)

Chaque agent ADVERT respecte ce schéma:

```
┌─────────────────────────────────────────────────────────┐
│                   PROTOCOL AGENT ADVERT                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. RECEIVE                                             │
│     ├── Input du Conductor                              │
│     ├── Outputs agents précédents (dépendances)         │
│     └── Context global (shared knowledge base)          │
│                                                         │
│  2. ANALYZE                                             │
│     ├── Parser les inputs                               │
│     ├── Identifier gaps/manques                         │
│     └── Déterminer modules à activer                    │
│                                                         │
│  3. GENERATE                                            │
│     ├── Exécuter modules séquentiellement               │
│     ├── Produire méta-variables contextuelles           │
│     └── Documenter raisonnement                         │
│                                                         │
│  4. VALIDATE                                            │
│     ├── Self-check cohérence interne                    │
│     ├── Cross-check avec piliers précédents             │
│     └── Slop detection (anti-BS)                        │
│                                                         │
│  5. OUTPUT                                              │
│     ├── Structured data (JSON/YAML)                     │
│     ├── Human-readable summary                          │
│     └── Confidence score + flags                        │
│                                                         │
│  6. HANDOFF                                             │
│     ├── Push to shared knowledge base                   │
│     ├── Signal completion au Conductor                  │
│     └── Trigger agent suivant                           │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Flow d'Exécution Complet

```
[INPUT HUMAIN]
      │
      ▼
┌─────────────┐
│ CONDUCTOR   │──────────────────────────────────────┐
└─────┬───────┘                                      │
      │                                              │
      ▼                                              │
┌─────────────┐    ┌──────────┐    ┌──────────┐     │
│ [A] AUTHEN. │───▶│ SLOP DET │───▶│ VALIDATOR│─────┤
└─────────────┘    └──────────┘    └──────────┘     │
      │                                              │
      ▼                                              │
┌─────────────┐    ┌──────────┐    ┌──────────┐     │
│ [D] DISTINC.│───▶│ SLOP DET │───▶│ VALIDATOR│─────┤
└─────────────┘    └──────────┘    └──────────┘     │
      │                                              │
      ▼                                              │
┌─────────────┐    ┌──────────┐    ┌──────────┐     │
│ [V] VALEUR  │───▶│ SLOP DET │───▶│ VALIDATOR│─────┤
└─────────────┘    └──────────┘    └──────────┘     │
      │                                              │
      ▼                                              │
┌─────────────┐    ┌──────────┐    ┌──────────┐     │
│ [E] ENGAGE. │───▶│ SLOP DET │───▶│ VALIDATOR│─────┤
└─────────────┘    └──────────┘    └──────────┘     │
      │                                              │
      ▼                                              │
┌─────────────┐    ┌──────────┐    ┌──────────┐     │
│ [R] RISK    │───▶│ SLOP DET │───▶│ VALIDATOR│─────┤
└─────────────┘    └──────────┘    └──────────┘     │
      │                                              │
      ▼                                              │
┌─────────────┐                                      │
│ SYNTHESIS   │◀─────────────────────────────────────┘
└─────┬───────┘
      │
      ▼
┌─────────────┐    ┌──────────┐    ┌──────────┐
│ [T] TRACK   │───▶│ SLOP DET │───▶│ VALIDATOR│
└─────────────┘    └──────────┘    └──────────┘
      │
      ▼
┌─────────────────────────────────────────────────┐
│            FICHE ADVERT COMPLETE                │
│         + STRATEGIE 3-6-12 MOIS                 │
└─────────────────────────────────────────────────┘
```

---

## Récapitulatif Armée

| Type | Nombre | Agents |
|------|--------|--------|
| **Piliers** | 6 | A, D, V, E, R, T |
| **Transversaux** | 4 | Conductor, Validator, Synthesis, Slop Detector |
| **Total** | **10 agents** | |
| **Modules** | ~40+ | Répartis dans les 6 piliers |

---

## Prochaines Étapes

1. Détailler les prompts de chaque agent
2. Créer les fichiers agents BMAD-compatible
3. Définir le shared knowledge base schema
4. Implémenter le Conductor orchestrator

---

*Document généré par BMad Master pour le projet ADVERT*
