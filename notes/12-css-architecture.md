# Architecture CSS — Organisation des fichiers

## Version : 1.0.0
## Dossier : css/

## Découpage

Le CSS est découpé en 6 fichiers importés par `style.css` :

```css
@import url("base.css");
@import url("layout.css");
@import url("splash.css");
@import url("sections.css");
@import url("dark.css");
@import url("responsive.css");
```

### base.css (74 lignes)
Reset universel (`* { margin: 0 }`), `scroll-behavior: smooth`,
typographie du body, styles globaux des titres h1-h6 et des sections,
classe `.fade-in` pour les animations au scroll.

### layout.css (322 lignes)
Tout ce qui concerne la structure du site :
- Header fixe avec backdrop-filter blur
- Menu burger et toggle dark mode
- Hero de la page d'accueil (cube + CTA)
- Titres calligraphiés des pages intérieures
- Ambiances de fond colorées par page (radial-gradient)
- Footer en 3 colonnes
- Bouton scroll-to-top

### splash.css (220 lignes)
L'animation d'accueil (typewriter + tasse fumante) et la popup newsletter.
Séparé car c'est spécifique à index.html.

### sections.css (754 lignes)
Le plus gros fichier — contient tous les composants de contenu :
- Compétences (flip cards en 3 colonnes)
- Fiches de révision (grille + filtres + badges)
- Projets (grille mosaïque)
- À propos (photo + texte)
- Contact (formulaire + sidebar)
- Livres (carrousel + flous latéraux)
- CTA cards de l'accueil
- Page mentions légales

### dark.css (142 lignes)
Surcharges pour le mode sombre. Toutes les règles commencent par `body.dark`.
Voir [08-dark-mode.md](08-dark-mode.md).

### responsive.css (79 lignes)
Media query `max-width: 768px`. Adaptations :
- Hero en colonne
- Cube plus petit (260px)
- Grilles en moins de colonnes
- Footer en une colonne centrée

## Palette de couleurs principale

| Usage | Clair | Sombre |
|---|---|---|
| Fond | `#f5ebe0` | `#1a1410` |
| Texte | `#3b2314` | `#d4c4b0` |
| Accent | `#6f4e37` | `#c8a27a` |
| Hover | `#5a3d25` | — |
| Bordures | `rgba(111,78,55, 0.1)` | `rgba(200,162,122, 0.12)` |
| Fond cartes | `rgba(111,78,55, 0.06)` | `rgba(200,162,122, 0.06)` |
