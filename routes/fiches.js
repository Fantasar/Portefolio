const router = require('express').Router();
const pool = require('../db/pool');
const requireAdmin = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

const fichesUpload = upload.fields([
  { name: 'preview_image', maxCount: 1 },
  { name: 'pdf_file', maxCount: 1 }
]);

router.get('/fiches', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM fiches ORDER BY display_order ASC, created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Erreur GET /fiches:', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/fiches', requireAdmin, fichesUpload, async (req, res) => {
  try {
    const { title, description, category, badge, display_order } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Titre, description et catégorie requis' });
    }
    if (!req.files || !req.files.preview_image) {
      return res.status(400).json({ error: 'Image de prévisualisation requise' });
    }
    const preview_image = 'assets/uploads/' + req.files.preview_image[0].filename;
    const pdf_url = req.files.pdf_file
      ? 'assets/uploads/' + req.files.pdf_file[0].filename
      : null;

    const { rows } = await pool.query(
      'INSERT INTO fiches (title, description, category, preview_image, badge, pdf_url, display_order) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [title, description, category, badge || 'gratuit', preview_image, pdf_url, display_order || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erreur POST /fiches:', err.message);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de la fiche' });
  }
});

router.put('/fiches/reorder', requireAdmin, async (req, res) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order)) {
      return res.status(400).json({ error: 'Format invalide' });
    }
    for (let i = 0; i < order.length; i++) {
      await pool.query('UPDATE fiches SET display_order = $1 WHERE id = $2', [i, order[i]]);
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('Erreur PUT /fiches/reorder:', err.message);
    res.status(500).json({ error: 'Erreur lors du réordonnement' });
  }
});

router.put('/fiches/:id', requireAdmin, fichesUpload, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, badge, display_order } = req.body;
    if (!title || !description || !category) {
      return res.status(400).json({ error: 'Titre, description et catégorie requis' });
    }

    const existing = await pool.query('SELECT preview_image, pdf_url FROM fiches WHERE id = $1', [id]);
    if (!existing.rows[0]) return res.status(404).json({ error: 'Fiche introuvable' });

    let preview_image = existing.rows[0].preview_image;
    let pdf_url = existing.rows[0].pdf_url;

    if (req.files.preview_image) {
      const oldPath = path.join(__dirname, '..', 'public', preview_image);
      fs.unlink(oldPath, () => {});
      preview_image = 'assets/uploads/' + req.files.preview_image[0].filename;
    }

    if (req.files.pdf_file) {
      if (pdf_url) {
        const oldPath = path.join(__dirname, '..', 'public', pdf_url);
        fs.unlink(oldPath, () => {});
      }
      pdf_url = 'assets/uploads/' + req.files.pdf_file[0].filename;
    }

    const { rows } = await pool.query(
      'UPDATE fiches SET title = $1, description = $2, category = $3, preview_image = $4, badge = $5, pdf_url = $6, display_order = $7 WHERE id = $8 RETURNING *',
      [title, description, category, preview_image, badge || 'gratuit', pdf_url, display_order || 0, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Erreur PUT /fiches:', err.message);
    res.status(500).json({ error: 'Erreur lors de la modification de la fiche' });
  }
});

router.delete('/fiches/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await pool.query('SELECT preview_image, pdf_url FROM fiches WHERE id = $1', [id]);

    if (existing.rows[0]) {
      const imgPath = path.join(__dirname, '..', 'public', existing.rows[0].preview_image);
      fs.unlink(imgPath, () => {});
      if (existing.rows[0].pdf_url) {
        const pdfPath = path.join(__dirname, '..', 'public', existing.rows[0].pdf_url);
        fs.unlink(pdfPath, () => {});
      }
    }

    await pool.query('DELETE FROM fiches WHERE id = $1', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Erreur DELETE /fiches:', err.message);
    res.status(500).json({ error: 'Erreur lors de la suppression de la fiche' });
  }
});

module.exports = router;
