# Rubik's Cube 3D — rubikscube.js

## Version : 1.0.0
## Fichier : js/rubikscube.js
## Dépendance : Three.js (CDN)

## Rôle

Crée un Rubik's Cube 3D interactif dans le conteneur `#rubiks-container`.
Le cube tourne lentement en idle et peut être manipulé par l'utilisateur.

## Palette de couleurs

Le cube utilise des tons café/chocolat au lieu des couleurs classiques :

```javascript
const COLORS = {
  right:  0xc8a27a,  // caramel clair
  left:   0xb5896b,  // latte
  top:    0xe8d5c0,  // crème
  bottom: 0xa07050,  // moka
  front:  0xd4b896,  // sable
  back:   0x8b6548,  // noisette
};
```

Les arêtes entre les cubies sont en brun moyen `0x5a3d25`.

## Fonctions principales

### `init()`
Point d'entrée. Crée la scène Three.js, la caméra (perspective 45°),
le renderer (fond transparent), les lumières (1 ambiante + 2 directionnelles),
puis assemble le cube et attache les événements.

### `createCubie(x, y, z)`
Crée un petit cube individuel à la position (x, y, z) dans la grille -1 à 1.
Chaque face reçoit sa couleur café si elle est sur le bord extérieur,
sinon elle est en brun foncé (face interne). Les arêtes sont dessinées
avec `EdgesGeometry` + `LineSegments`.

### `buildCube()`
Boucle triple (x, y, z de -1 à 1) pour créer les 27 cubies.
Les assemble dans un `THREE.Group` nommé `cubeGroup`.

### Interactions

- **`onWheel(e)`** — molette : fait tourner le cube sur Y (vertical) et X (horizontal)
- **`onMouseDown/Move/Up`** — drag souris : rotation libre du cube
- **`onTouchStart/Move/End`** — même chose en tactile pour mobile
- Sensibilité : `deltaY * 0.003` pour la molette, `dx * 0.008` pour le drag

### `animate()`
Boucle `requestAnimationFrame`. Si l'utilisateur ne touche pas le cube,
ajoute `0.003` à `rotation.y` à chaque frame (rotation idle lente).

### `onResize()`
Met à jour le ratio de la caméra et la taille du renderer quand
la fenêtre change de dimension.

## Comment modifier

- **Changer les couleurs** : modifier l'objet `COLORS` en haut du fichier
- **Changer la vitesse de rotation** : modifier `0.003` dans `animate()`
- **Changer la taille** : modifier `CUBE_SIZE` et `GAP`
- **Changer la taille du conteneur** : modifier `#rubiks-container` dans layout.css
