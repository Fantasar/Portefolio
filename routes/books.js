const router = require('express').Router();
const pool = require('../db/pool');
const requireAdmin = require('../middleware/auth');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

router.get('/books', async (req, res) => {
  try {
    const { rows } = await pool.query(
      'SELECT * FROM books ORDER BY display_order ASC, created_at DESC'
    );
    res.json(rows);
  } catch (err) {
    console.error('Erreur GET /books:', err.message);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.post('/books', requireAdmin, upload.single('cover_image'), async (req, res) => {
  try {
    const { title, description, amazon_url, display_order } = req.body;
    if (!title || !description || !amazon_url) {
      return res.status(400).json({ error: 'Titre, description et lien Amazon requis' });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'Image de couverture requise' });
    }
    const cover_image = 'assets/uploads/' + req.file.filename;

    const { rows } = await pool.query(
      'INSERT INTO books (title, description, cover_image, amazon_url, display_order) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, cover_image, amazon_url, display_order || 0]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Erreur POST /books:', err.message);
    res.status(500).json({ error: 'Erreur lors de l\'ajout du livre' });
  }
});

router.put('/books/reorder', requireAdmin, async (req, res) => {
  try {
    const { order } = req.body;
    if (!Array.isArray(order)) {
      return res.status(400).json({ error: 'Format invalide' });
    }
    for (let i = 0; i < order.length; i++) {
      await pool.query('UPDATE books SET display_order = $1 WHERE id = $2', [i, order[i]]);
    }
    res.json({ ok: true });
  } catch (err) {
    console.error('Erreur PUT /books/reorder:', err.message);
    res.status(500).json({ error: 'Erreur lors du réordonnement' });
  }
});

router.put('/books/:id', requireAdmin, upload.single('cover_image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, amazon_url, display_order } = req.body;
    if (!title || !description || !amazon_url) {
      return res.status(400).json({ error: 'Titre, description et lien Amazon requis' });
    }

    if (req.file) {
      const existing = await pool.query('SELECT cover_image FROM books WHERE id = $1', [id]);
      if (existing.rows[0]) {
        const oldPath = path.join(__dirname, '..', 'public', existing.rows[0].cover_image);
        fs.unlink(oldPath, () => {});
      }

      const cover_image = 'assets/uploads/' + req.file.filename;
      const { rows } = await pool.query(
        'UPDATE books SET title = $1, description = $2, cover_image = $3, amazon_url = $4, display_order = $5 WHERE id = $6 RETURNING *',
        [title, description, cover_image, amazon_url, display_order || 0, id]
      );
      return res.json(rows[0]);
    }

    const { rows } = await pool.query(
      'UPDATE books SET title = $1, description = $2, amazon_url = $3, display_order = $4 WHERE id = $5 RETURNING *',
      [title, description, amazon_url, display_order || 0, id]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error('Erreur PUT /books:', err.message);
    res.status(500).json({ error: 'Erreur lors de la modification du livre' });
  }
});

router.delete('/books/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await pool.query('SELECT cover_image FROM books WHERE id = $1', [id]);

    if (existing.rows[0]) {
      const filePath = path.join(__dirname, '..', 'public', existing.rows[0].cover_image);
      fs.unlink(filePath, () => {});
    }

    await pool.query('DELETE FROM books WHERE id = $1', [id]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Erreur DELETE /books:', err.message);
    res.status(500).json({ error: 'Erreur lors de la suppression du livre' });
  }
});

module.exports = router;
