# Compétences Flip Cards — skills.js + sections.css

## Version : 1.0.0
## Fichiers : js/skills.js, css/sections.css
## Page : projets.html

## Rôle

Système de cartes retournables organisées en 3 colonnes de progression :
"À venir", "En cours", "Au quotidien". L'utilisateur clique pour révéler
chaque compétence.

## Structure HTML d'une carte

```html
<div class="flip-card" data-color="#e44d26">
  <div class="flip-inner">
    <div class="flip-front">?</div>
    <div class="flip-back">
      <span class="skill-icon">&lt;/&gt;</span>
      <h4>HTML</h4>
      <p>Structure sémantique et accessible</p>
    </div>
  </div>
</div>
```

## Comment fonctionne le flip

### CSS — perspective et backface
- `.flip-card` a `perspective: 800px` pour l'effet 3D
- `.flip-inner` a `transform-style: preserve-3d` et une transition de 0.6s
- `.flip-front` et `.flip-back` ont `backface-visibility: hidden`
- `.flip-back` est pré-tourné à 180° avec `transform: rotateY(180deg)`
- Quand `.flipped` est ajouté, `.flip-inner` tourne de 180° → le dos apparaît

### JS — clic et couleurs
Au chargement, `skills.js` :
1. Lit le `data-color` de chaque carte (ex: `#e44d26` pour HTML)
2. Applique un dégradé léger de cette couleur sur le dos de la carte
3. Colore l'icône avec la couleur du langage
4. Ajoute/retire `.flipped` au clic

### Bouton "Retourner toutes les cartes"
Si des cartes sont retournées → les remet face cachée.
Sinon → les retourne toutes. Le texte du bouton s'adapte.

## Couleurs par langage

| Techno | Couleur | Hex |
|---|---|---|
| HTML | Orange | #e44d26 |
| CSS | Bleu | #264de4 |
| JavaScript | Jaune | #f7df1e |
| Git | Rouge-orange | #f05032 |
| Three.js | Bleu ciel | #049ef4 |
| React | Cyan | #61dafb |
| TypeScript | Bleu foncé | #3178c6 |

## Comment ajouter une compétence

1. Choisir la colonne (À venir, En cours, Au quotidien)
2. Copier un bloc `<div class="flip-card" data-color="...">` dans la bonne colonne
3. Mettre la couleur officielle du langage dans `data-color`
4. Modifier l'icône, le titre et la description dans `.flip-back`
