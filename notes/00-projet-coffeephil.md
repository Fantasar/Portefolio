# Coffee'Phil — Documentation du projet

## Informations générales

- **Nom du projet** : Coffee'Phil
- **Version** : 1.0.0
- **Auteur** : Philippe Lapique
- **Date de création** : Juin 2025
- **Technologies** : HTML5, CSS3, JavaScript vanilla, Three.js (CDN)
- **Hébergement prévu** : GitHub Pages

## Description

Coffee'Phil est un site portfolio orienté utilisateur avec un thème coffee shop.
Il sert à la fois de vitrine personnelle et de plateforme de monétisation via :
1. La vente de fiches de révision PDF (gratuites et premium)
2. L'affiliation Amazon sur les livres recommandés
3. L'acquisition de projets de développement web freelance

## Structure des pages

| Fichier | Page | Contenu |
|---|---|---|
| `index.html` | Accueil | Hero avec Rubik's Cube 3D, CTA vers les 3 sections, popup newsletter |
| `ressources.html` | Ressources | Fiches de révision PDF + carrousel de livres affiliés |
| `projets.html` | Projets | Compétences (flip cards) + grille mosaïque de projets |
| `about.html` | À propos | Présentation personnelle + formulaire de contact |
| `mentions.html` | Mentions légales | Obligations légales, RGPD, affiliation Amazon |

## Structure des dossiers

```
Portefolio/
├── index.html
├── ressources.html
├── projets.html
├── about.html
├── mentions.html
├── css/
│   ├── style.css          # Fichier principal (imports)
│   ├── base.css           # Reset, typo, animations scroll
│   ├── layout.css         # Navbar, hero, footer, pages
│   ├── splash.css         # Animation d'accueil, popup newsletter
│   ├── sections.css       # Toutes les sections de contenu
│   ├── dark.css           # Mode sombre
│   └── responsive.css     # Adaptations mobile
├── js/
│   ├── animations.js      # Scroll, burger, dark mode, prefetch
│   ├── rubikscube.js      # Rubik's Cube 3D (Three.js)
│   ├── splash.js          # Animation typewriter d'accueil
│   ├── books.js           # Carrousel de livres
│   ├── skills.js          # Flip cards compétences
│   ├── fiches.js          # Filtres des fiches de révision
│   └── newsletter.js      # Popup newsletter
├── assets/                # Images, PDFs, favicon (à remplir)
└── notes/                 # Documentation technique
```

## Services externes utilisés

- **Three.js** (CDN r128) — moteur 3D pour le Rubik's Cube
- **Google Fonts** — police "Great Vibes" pour la calligraphie
- **FormSubmit.co** — envoi de formulaires sans backend (contact + newsletter)
- **Amazon Partenaires** — liens affiliés sur les livres (à configurer)
