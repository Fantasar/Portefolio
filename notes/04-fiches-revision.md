# Fiches de révision — fiches.js + sections.css

## Version : 1.0.0
## Fichiers : js/fiches.js, css/sections.css
## Page : ressources.html

## Rôle

Vitrine de fiches de révision PDF à télécharger. Les fiches sont classées
par catégorie (HTML, CSS, JS) avec un système de filtres et deux niveaux :
gratuit et premium.

## Structure HTML d'une fiche

```html
<div class="fiche-card" data-category="html">
  <div class="fiche-preview">
    <img src="assets/fiche-html-bases.jpg" alt="..." />
    <span class="fiche-badge gratuit">Gratuit</span>
  </div>
  <div class="fiche-info">
    <span class="fiche-category">HTML</span>
    <h3>Les bases du HTML</h3>
    <p>Description...</p>
    <a href="assets/fiches/html-bases.pdf" download class="fiche-btn">
      Télécharger le PDF
    </a>
  </div>
</div>
```

## Les filtres (fiches.js)

4 boutons pill : Toutes / HTML / CSS / JavaScript.
Chaque bouton a un `data-filter` (all, html, css, js).
Au clic, le JS parcourt toutes les `.fiche-card` et compare leur
`data-category` avec le filtre. Si ça ne matche pas → classe `.hidden` (display: none).

## Badges

- `.fiche-badge.gratuit` : fond vert `#4a9d5b`, texte blanc
- `.fiche-badge.premium` : fond caramel `#c8a27a`, texte brun

## Boutons de téléchargement

- `.fiche-btn` : bouton café `#6f4e37`, lien `download` vers le PDF
- `.fiche-btn-premium` : bordure pointillée grisée, texte "Bientôt disponible", cursor: default

## Comment ajouter une fiche

1. Créer la fiche sur Canva et l'exporter en PDF
2. Mettre le PDF dans `assets/fiches/`
3. Créer une image de preview dans `assets/`
4. Copier un bloc `<div class="fiche-card">` et modifier :
   - `data-category` : html, css ou js
   - L'image, le badge, le titre, la description, le lien PDF

## Comment passer une fiche en payant

Remplacer le lien `download` par un lien vers Gumroad, Stripe ou autre
plateforme de paiement. Changer le texte du bouton et le badge en "Premium".
