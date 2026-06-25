# Formulaire de contact — sections.css

## Version : 1.0.0
## Fichier : css/sections.css
## Page : about.html

## Rôle

Formulaire de contact avec envoi via FormSubmit.co (pas de backend nécessaire).
Layout en deux colonnes : formulaire à gauche, liens et dispo à droite.

## Structure

### Colonne gauche — Le formulaire

4 champs :
- **Nom** (`text`, required)
- **Email** (`email`, required)
- **Sujet** (`select` avec 4 options : Projet dev, Collaboration, Question fiches, Autre)
- **Message** (`textarea`, required)

Le formulaire envoie un POST à `https://formsubmit.co/lapique.philippe@gmail.com`.

### Colonne droite — Sidebar

- **Retrouvez-moi** : liens email, GitHub, LinkedIn avec icônes monospace
- **Disponibilité** : texte indiquant la dispo freelance et le délai de réponse

## Style des inputs

- Fond beige très léger `rgba(111, 78, 55, 0.04)`
- Bordure subtile qui passe en `#6f4e37` au focus
- Placeholders en brun 30%
- Textarea redimensionnable verticalement, hauteur min 120px

## FormSubmit.co — comment ça marche

1. Le formulaire fait un POST vers `formsubmit.co/votre-email`
2. La première fois, FormSubmit envoie un email de confirmation
3. Après confirmation, chaque soumission vous envoie un email
4. Pas de base de données, pas d'injection SQL possible

## Sécurité

- **Pas de risque SQL** : aucune base de données
- **Captcha** : désactivé par défaut (`_captcha = false`), peut être réactivé
- **Spam** : risque principal, le captcha FormSubmit est la solution
