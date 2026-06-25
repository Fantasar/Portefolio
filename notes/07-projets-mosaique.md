# Projets Mosaïque — sections.css

## Version : 1.0.0
## Fichier : css/sections.css
## Page : projets.html

## Rôle

Grille de projets en mosaïque avec des cartes de tailles différentes.
Chaque carte a une image de fond, un dégradé sombre en bas et des infos
qui apparaissent par-dessus.

## La grille CSS Grid

```css
.projects-grid {
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 200px;
}
```

4 colonnes, chaque rangée fait 200px de haut.

## Classes de taille

| Classe | Colonnes | Rangées | Taille visuelle |
|---|---|---|---|
| *(aucune)* | 1 | 1 | Petite carte carrée |
| `.wide` | 2 | 1 | Rectangle horizontal |
| `.tall` | 1 | 2 | Rectangle vertical |
| `.large` | 2 | 2 | Grande carte (la plus visible) |

## Effet visuel

### Image de fond
L'image est en `position: absolute` et couvre toute la carte avec `object-fit: cover`.
Au hover, elle zoom de 8% (`transform: scale(1.08)`).

### Dégradé sombre
Un pseudo-élément `::after` applique un dégradé du bas vers le haut :

```css
background: linear-gradient(to top, rgba(30, 15, 5, 0.85) 0%, transparent 60%);
```

Ça rend le texte blanc lisible sur n'importe quelle image.

### Tags de technologie
Les `.project-tag` sont des petites pilules semi-transparentes avec
`backdrop-filter: blur(4px)` pour un effet verre dépoli.

## Comment ajouter un projet

1. Mettre la capture d'écran dans `assets/`
2. Copier un bloc `<a class="project-card">` (ajouter `.wide`, `.tall` ou `.large` si besoin)
3. Modifier l'image, le titre, la description et les tags
4. Le `href` peut pointer vers le repo GitHub ou le site en ligne
