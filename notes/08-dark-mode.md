# Mode sombre — dark.css + animations.js

## Version : 1.0.0
## Fichiers : css/dark.css, js/animations.js

## Rôle

Bascule entre un thème clair (beige café) et un thème sombre (brun nuit).
Le choix est sauvegardé en localStorage et persiste entre les visites.

## Comment ça marche

### Le bouton toggle
Un bouton `.dark-toggle` dans la navbar affiche ☾ (lune) en mode clair
et ☀ (soleil) en mode sombre.

### Le JavaScript

```javascript
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("dark-mode", isDark);
  darkToggle.textContent = isDark ? "☀" : "☾";
});
```

Au chargement, si `localStorage.getItem("dark-mode")` vaut `"true"`,
la classe `.dark` est ajoutée au body immédiatement.

### Les surcharges CSS (dark.css)

Toutes les règles sont préfixées par `body.dark` pour surcharger le thème clair.

#### Palette sombre

| Élément | Clair | Sombre |
|---|---|---|
| Fond body | `#f5ebe0` | `#1a1410` |
| Texte principal | `#3b2314` | `#d4c4b0` |
| Titres h2 | `#6f4e37` | `#c8a27a` |
| Fond cartes | `rgba(111,78,55, 0.06)` | `rgba(200,162,122, 0.06)` |
| Navbar fond | beige 85% | brun 90% |
| Footer bordure | brun 8% | blanc 6% |

### Transition douce

Le `body` a `transition: background-color 0.4s, color 0.4s` pour un fondu
entre les deux thèmes au lieu d'un changement brutal.

## Ce qui est adapté

- Navbar + menu burger
- Titres et textes
- Toutes les cartes (CTA, fiches, livres, compétences, projets)
- Formulaire de contact (inputs, labels)
- Popup newsletter
- Footer
- Bouton scroll-to-top
- Flous latéraux du carrousel de livres
- Filtres des fiches
