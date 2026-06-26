INSERT INTO fiches (title, description, category, preview_image, badge, pdf_url, display_order)
VALUES
  ('Les bases du HTML', 'Balises essentielles, structure d''une page, sémantique.', 'html', 'assets/fiche-html-bases.jpg', 'gratuit', 'assets/fiches/html-bases.pdf', 1),
  ('Les formulaires', 'Input, select, validation, accessibilité des formulaires.', 'html', 'assets/fiche-html-formulaires.jpg', 'gratuit', 'assets/fiches/html-formulaires.pdf', 2),
  ('Flexbox en un coup d''oeil', 'Toutes les propriétés flex avec exemples visuels.', 'css', 'assets/fiche-css-flexbox.jpg', 'gratuit', 'assets/fiches/css-flexbox.pdf', 3),
  ('CSS Grid complet', 'Grid template, areas, auto-fit, responsive layouts.', 'css', 'assets/fiche-css-grid.jpg', 'premium', NULL, 4),
  ('JavaScript - Les fondamentaux', 'Variables, fonctions, boucles, conditions.', 'js', 'assets/fiche-js-bases.jpg', 'gratuit', 'assets/fiches/js-bases.pdf', 5),
  ('Manipuler le DOM', 'Sélecteurs, événements, modification du DOM.', 'js', 'assets/fiche-js-dom.jpg', 'premium', NULL, 6)
ON CONFLICT DO NOTHING;
