# Navbar Burger — layout.css + animations.js

## Version : 1.0.0
## Fichiers : css/layout.css, js/animations.js

## Rôle

Navigation du site sous forme de menu burger. Le menu s'ouvre en dropdown
sous la barre de navigation (pas en panneau latéral).

## Structure HTML

```html
<header>
  <nav>
    <button class="burger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
    <button class="dark-toggle">☾</button>
    <ul>
      <li><a href="index.html" class="nav-active">Accueil</a></li>
      <li><a href="ressources.html">Ressources</a></li>
      ...
    </ul>
  </nav>
</header>
```

## Comment ça marche

### Le burger (3 barres)

3 `<span>` de 24px × 2px empilés verticalement avec un gap de 5px.
Au clic, la classe `.open` est ajoutée :
- La barre du haut descend de 7px et tourne à 45°
- La barre du milieu disparaît (opacity: 0)
- La barre du bas monte de 7px et tourne à -45°
→ forme une croix ×

### Le menu dropdown

`nav ul` est en `display: none` par défaut, positionné en `absolute`
sous le header (`top: 100%`). Quand la classe `.open` est ajoutée,
il passe en `display: flex` avec une direction column.

Fond : beige semi-transparent avec backdrop-filter blur.

### Le JavaScript (dans animations.js)

```javascript
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  navUl.classList.toggle("open");
});
```

Les liens referment automatiquement le menu au clic.

## Éléments dans la navbar

- **Burger** : à gauche, toujours visible
- **Toggle dark mode** : bouton rond ☾/☀ entre le burger et le menu
- **Liens** : dans le dropdown, centrés

## La classe `nav-active`

Le lien de la page courante a la classe `nav-active` qui le souligne
en brun `#6f4e37`. Cette classe est mise manuellement dans chaque fichier HTML.
