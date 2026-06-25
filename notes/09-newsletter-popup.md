# Popup Newsletter — newsletter.js + splash.css

## Version : 1.0.0
## Fichiers : js/newsletter.js, css/splash.css
## Page : index.html uniquement

## Rôle

Affiche une popup pour collecter les emails des visiteurs intéressés
par les nouvelles fiches de révision. Ne s'affiche qu'une seule fois.

## Comportement

1. La popup apparaît **4 secondes** après le chargement de la page
2. Elle ne s'affiche que si `newsletter-dismissed` n'existe pas dans localStorage
3. Se ferme en cliquant :
   - La croix (×)
   - En dehors de la popup (sur l'overlay)
   - Après soumission du formulaire
4. Une fois fermée, `newsletter-dismissed = "true"` est stocké → plus jamais affichée

## Le formulaire

Envoie les données via **FormSubmit.co** (POST vers leur endpoint).
Champs cachés :
- `_subject` : sujet de l'email reçu
- `_captcha` : désactivé (mettre `true` pour l'activer)
- `_next` : page de redirection après envoi (vide = page actuelle)

## CSS

- `.popup-overlay` : fond sombre semi-transparent avec `backdrop-filter: blur(4px)`
- `.popup-card` : carte blanche centrée avec ombre et animation de montée
- Transition : `opacity` et `translateY` pour un effet d'apparition douce

## Comment modifier

- **Changer le délai** : modifier le `4000` dans le setTimeout de newsletter.js
- **Réactiver le captcha** : mettre `value="true"` dans l'input `_captcha`
- **Changer le texte** : modifier le HTML dans la `<div id="newsletter-popup">`
- **Désactiver la popup** : supprimer `<div id="newsletter-popup">` et le script
