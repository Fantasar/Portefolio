# Coffee'Phil — Portfolio & Ressources Dev

Site portfolio orienté utilisateur par Philippe Lapique.
Thème coffee shop, Rubik's Cube 3D interactif, fiches de révision PDF et liens affiliés Amazon.

## Stack technique

- **HTML5 / CSS3 / JavaScript** vanilla (aucun framework)
- **Three.js** (CDN r128) pour le Rubik's Cube 3D
- **Google Fonts** — Great Vibes (calligraphie)
- **FormSubmit.co** — envoi de formulaires sans backend

## Structure du projet

```
├── index.html          # Accueil (cube + CTA + newsletter)
├── ressources.html     # Fiches de révision + livres
├── projets.html        # Compétences + projets
├── about.html          # À propos + contact
├── mentions.html       # Mentions légales
├── css/
│   ├── style.css       # Imports principaux
│   ├── base.css        # Reset, typo, animations
│   ├── layout.css      # Navbar, hero, footer
│   ├── splash.css      # Animation d'accueil
│   ├── sections.css    # Composants de contenu
│   ├── dark.css        # Mode sombre
│   └── responsive.css  # Mobile
├── js/
│   ├── animations.js   # Scroll, burger, dark mode, prefetch
│   ├── rubikscube.js   # Rubik's Cube Three.js
│   ├── splash.js       # Typewriter + transition
│   ├── books.js        # Carrousel livres
│   ├── skills.js       # Flip cards compétences
│   ├── fiches.js       # Filtres fiches
│   └── newsletter.js   # Popup newsletter
├── assets/             # Images, PDFs, favicon
└── notes/              # Documentation technique
```

## Lancer le site

Ouvrir `index.html` dans un navigateur ou lancer un serveur local :

```bash
npx serve .
```

## Documentation technique

Les fichiers dans `notes/` détaillent chaque fonctionnalité du site.
Voir `notes/00-projet-coffeephil.md` pour la vue d'ensemble.

---

## Améliorations prévues — Prochaine session

### Frontend

- [ ] **Favicon et og:image** — Créer un favicon Coffee'Phil et une image OG pour le partage réseaux sociaux (fichiers manquants dans `assets/`)
- [ ] **Images placeholder** — Remplacer toutes les images placeholder (projets, livres, fiches, photo de profil) par du vrai contenu
- [ ] **Animations d'entrée** — Ajouter des transitions entre les pages (fade in/out) au lieu d'un rechargement sec
- [ ] **Accessibilité** — Audit ARIA : vérifier les rôles, les contrastes de couleurs, la navigation au clavier dans les flip cards et le carrousel
- [ ] **Performance** — Minifier le CSS et le JS pour la production, regrouper les @import CSS en un seul fichier buildé
- [ ] **Responsive avancé** — Tester et ajuster sur tablette (entre 768px et 1024px), le layout du hero peut se chevaucher
- [ ] **Sections.css trop long** — Redécouper sections.css (754 lignes) en sous-fichiers si le contenu grandit (fiches.css, projets.css, contact.css)
- [ ] **Compteur de téléchargements** — Afficher le nombre de téléchargements par fiche (nécessite un petit backend ou un service tiers)
- [ ] **Lien vers les vrais profils** — Mettre les vraies URLs GitHub et LinkedIn dans la navbar, le footer et la page contact

### Backend / Infrastructure

- [ ] **Hébergement** — Déployer sur GitHub Pages (ou Netlify/Vercel si besoin de fonctionnalités serveur)
- [ ] **Nom de domaine** — Acheter et configurer un domaine personnalisé (ex: coffeephil.dev)
- [ ] **Analytics** — Intégrer Plausible ou Umami (respectueux vie privée) pour suivre les téléchargements de fiches et les clics affiliés
- [ ] **FormSubmit** — Confirmer l'email de réception sur FormSubmit.co (premier envoi nécessaire) et décider si on active le captcha
- [ ] **Affiliation Amazon** — S'inscrire au Programme Partenaires Amazon et remplacer les `href="#"` des livres par les vrais liens affiliés
- [ ] **Paiement fiches premium** — Intégrer une solution de paiement (Gumroad, LemonSqueezy ou Stripe) pour les fiches premium
- [ ] **Collecte emails** — Remplacer FormSubmit pour la newsletter par un vrai service (Mailchimp, Brevo, Buttondown) pour gérer une liste d'abonnés et envoyer des campagnes
- [ ] **CI/CD** — Mettre en place un workflow GitHub Actions pour minifier les assets et déployer automatiquement sur push
