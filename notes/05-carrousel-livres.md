# Carrousel de livres — books.js + sections.css

## Version : 1.0.0
## Fichiers : js/books.js, css/sections.css
## Page : ressources.html

## Rôle

Carrousel horizontal de cartes de livres avec défilement automatique infini
et navigation manuelle par drag. Les liens pointent vers Amazon (affiliation).

## Comment fonctionne le défilement infini

### Duplication des cartes
Au chargement, `books.js` clone toutes les cartes et les ajoute à la suite :

```javascript
const cards = Array.from(track.children);
cards.forEach((card) => {
  track.appendChild(card.cloneNode(true));
});
```

Ça double le contenu du track. Quand le scroll atteint la moitié
(les clones), il revient à 0 → boucle invisible.

### Auto-scroll
Un `setInterval` de 30ms ajoute 1px au `scrollLeft` du track.
Vitesse résultante : ~33px/s, un défilement doux.

### Pause et reprise
- **Mousedown** : stoppe l'auto-scroll
- **Mouseup / Mouseleave** : relance après 3 secondes
- **Touch** : même comportement sur mobile

### Anti-clic accidentel
Le flag `hasDragged` empêche d'ouvrir le lien Amazon quand on fait un drag :
si la souris a bougé de plus de 3px, le `click` est bloqué via `preventDefault`.

## Flous latéraux (CSS)

Les pseudo-éléments `::before` et `::after` de `.books-wrapper` créent
des dégradés de 60px qui fondent le contenu dans le fond :

```css
.books-wrapper::before {
  background: linear-gradient(to right, #f5ebe0, transparent);
}
```

## Mention affilié

Le texte `.affiliate-notice` sous la section est une obligation légale
pour le programme Amazon Partenaires.

## Comment ajouter un livre

Copier un bloc `<a class="book-card">` et modifier :
- Le `href` : mettre le lien affilié Amazon
- L'image : mettre la couverture dans `assets/`
- Le titre et la description
