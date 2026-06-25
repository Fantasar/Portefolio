# Animations scroll, scroll-to-top et prefetch — animations.js

## Version : 1.0.0
## Fichier : js/animations.js

## Rôle

Fichier central qui gère 5 fonctionnalités transversales à toutes les pages :
fade-in au scroll, menu burger, scroll-to-top, dark mode, prefetch.

## 1. Fade-in au scroll

Utilise `IntersectionObserver` pour détecter quand un élément `.fade-in`
entre dans le viewport (seuil : 10%).

```javascript
const observer = new IntersectionObserver(callback, { threshold: 0.1 });
```

Quand l'élément est visible, la classe `.visible` est ajoutée.
Le CSS fait la transition : `opacity 0→1` + `translateY 30px→0` en 0.6s.

Pour rendre un élément animé, ajouter la classe `fade-in` dans le HTML.

## 2. Menu burger

Toggle des classes `.open` sur le burger et le `nav ul` au clic.
Les liens du menu referment automatiquement le dropdown.
Voir [03-navbar-burger.md](03-navbar-burger.md) pour les détails.

## 3. Scroll-to-top

Un bouton `.scroll-top` fixé en bas à droite.
- Apparaît quand `window.scrollY > 400` (classe `.visible`)
- Au clic : `window.scrollTo({ top: 0, behavior: "smooth" })`

## 4. Dark mode

Toggle de `body.dark` + sauvegarde en localStorage.
Voir [08-dark-mode.md](08-dark-mode.md) pour les détails.

## 5. Prefetch au survol

Quand l'utilisateur survole un lien interne (`.html`), le navigateur
précharge la page cible via un `<link rel="prefetch">` injecté dans le head.

```javascript
const prefetchLink = document.createElement("link");
prefetchLink.rel = "prefetch";
prefetchLink.href = href;
document.head.appendChild(prefetchLink);
```

Chaque lien n'est préchargé qu'une fois (Set `prefetched`).
Les liens externes (http) sont ignorés.
