# Animation d'accueil Typewriter — splash.js + splash.css

## Version : 1.0.0
## Fichiers : js/splash.js, css/splash.css

## Rôle

Affiche "Bienvenue, au Coffee'Phil !" en calligraphie avec un effet machine
à écrire au chargement de la page, puis fait glisser le texte sous le cube.

## Comment ça marche

### Phase 1 — Typewriter (CSS)

Le texte est dans un `<div id="splash">` fixé en plein écran avec un fond beige.
Chaque ligne a `width: 0` et `overflow: hidden`. L'animation CSS `type-line1`
fait passer la largeur de 0 à `7.5em` en 1.8 secondes par steps (pas à pas).

```css
animation: type-line1 1.8s steps(10) 0.3s forwards;
```

- `steps(10)` : 10 étapes pour 10 caractères → effet lettre par lettre
- `0.3s` : délai avant le début
- `forwards` : reste à l'état final

Le curseur clignotant est fait avec `border-right: 2px solid` + l'animation `blink`.
Il clignote 3 fois sur la ligne 1, 4 fois sur la ligne 2.

La ligne 2 est en `opacity: 0` et apparaît après 2.4s via l'animation `show-line2`.

### Phase 2 — Glissement (JS)

Quand la ligne 2 finit de s'écrire, `splash.js` :

1. Calcule la position cible (sous le cube, légèrement à gauche)
2. Applique un `translate()` via la variable CSS `--slide-to`
3. Ajoute la classe `revealed` qui rend le fond transparent
4. Après 1.3s, déplace le texte dans le DOM (de `#splash` vers `.hero`)
5. Fige les animations (`animation: none`) avant le déplacement pour éviter qu'elles rejouent

### La tasse fumante (SVG)

La tasse est un SVG inline avec 3 chemins de fumée animés par `steam-rise` :
chaque filet monte de 6px et s'efface en boucle, décalé de 0.4s.

## Fonctions dans splash.js

### `slideToCube()`
Calcule le delta entre la position actuelle du texte (centre écran)
et la position cible (sous le cube). Utilise `getBoundingClientRect()`
pour les deux éléments. Applique le transform, efface le fond,
puis re-parente les éléments dans le hero après la transition.

## Comment modifier

- **Changer le texte** : modifier les `<div class="splash-line">` dans index.html
- **Changer la vitesse** : modifier les durées dans les animations CSS (splash.css)
- **Changer la police** : remplacer "Great Vibes" par une autre Google Font
- **Supprimer l'animation** : retirer `<div id="splash">` du HTML et splash.js du script
