document.addEventListener("DOMContentLoaded", () => {
  const loginSection = document.getElementById("admin-login");
  const dashboard = document.getElementById("admin-dashboard");
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const modal = document.getElementById("admin-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalFields = document.getElementById("modal-fields");
  const modalForm = document.getElementById("modal-form");
  const tabs = document.querySelectorAll("[data-tab]");

  let currentType = null;
  let currentEditId = null;

  checkAuth();

  async function checkAuth() {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();
      if (data.isAdmin) showDashboard();
      else showLogin();
    } catch {
      showLogin();
    }
  }

  function showLogin() {
    loginSection.hidden = false;
    dashboard.hidden = true;
  }

  async function showDashboard() {
    loginSection.hidden = true;
    dashboard.hidden = false;
    await loadBooks();
    await loadFiches();
  }

  // Login
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    loginError.hidden = true;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      }),
    });

    if (res.ok) {
      showDashboard();
    } else {
      loginError.hidden = false;
    }
  });

  // Logout
  document.getElementById("btn-logout").addEventListener("click", async () => {
    await fetch("/api/logout", { method: "POST" });
    showLogin();
  });

  // Tabs
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("panel-books").hidden = btn.dataset.tab !== "books";
      document.getElementById("panel-fiches").hidden = btn.dataset.tab !== "fiches";
    });
  });

  // Books
  async function loadBooks() {
    const res = await fetch("/api/books");
    const books = await res.json();
    const list = document.getElementById("books-list");

    if (books.length === 0) {
      list.innerHTML = '<p class="admin-empty">Aucun livre ajouté</p>';
      return;
    }

    list.innerHTML = books.map((b) => `
      <div class="admin-item">
        <img src="${b.cover_image}" alt="${b.title}" class="admin-thumb" />
        <div class="admin-item-info">
          <strong>${b.title}</strong>
          <p>${b.description}</p>
        </div>
        <div class="admin-item-actions">
          <button class="admin-btn" onclick="editBook(${b.id})">Modifier</button>
          <button class="admin-btn admin-btn-danger" onclick="deleteBook(${b.id})">Supprimer</button>
        </div>
      </div>`).join("");
  }

  document.getElementById("btn-add-book").addEventListener("click", () => {
    currentType = "book";
    currentEditId = null;
    modalTitle.textContent = "Ajouter un livre";
    modalFields.innerHTML = bookFormFields();
    modal.hidden = false;
  });

  window.editBook = async (id) => {
    const res = await fetch("/api/books");
    const books = await res.json();
    const book = books.find((b) => b.id === id);
    if (!book) return;

    currentType = "book";
    currentEditId = id;
    modalTitle.textContent = "Modifier le livre";
    modalFields.innerHTML = bookFormFields(book);
    modal.hidden = false;
  };

  window.deleteBook = async (id) => {
    if (!confirm("Supprimer ce livre ?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    await loadBooks();
  };

  function bookFormFields(book = {}) {
    return `
      <div class="form-group">
        <label for="f-title">Titre</label>
        <input type="text" id="f-title" name="title" value="${book.title || ""}" required />
      </div>
      <div class="form-group">
        <label for="f-description">Description</label>
        <textarea id="f-description" name="description" required>${book.description || ""}</textarea>
      </div>
      <div class="form-group">
        <label for="f-amazon">Lien Amazon</label>
        <input type="url" id="f-amazon" name="amazon_url" value="${book.amazon_url || ""}" required />
      </div>
      <div class="form-group">
        <label for="f-order">Ordre d'affichage</label>
        <input type="number" id="f-order" name="display_order" value="${book.display_order || 0}" />
      </div>
      <div class="form-group">
        <label for="f-cover">Image de couverture${book.id ? " (laisser vide pour garder l'actuelle)" : ""}</label>
        <input type="file" id="f-cover" name="cover_image" accept="image/*" ${book.id ? "" : "required"} />
        ${book.cover_image ? `<img src="${book.cover_image}" class="admin-preview" />` : ""}
      </div>`;
  }

  // Fiches
  async function loadFiches() {
    const res = await fetch("/api/fiches");
    const fiches = await res.json();
    const list = document.getElementById("fiches-list");

    if (fiches.length === 0) {
      list.innerHTML = '<p class="admin-empty">Aucune fiche ajoutée</p>';
      return;
    }

    list.innerHTML = fiches.map((f) => `
      <div class="admin-item">
        <img src="${f.preview_image}" alt="${f.title}" class="admin-thumb" />
        <div class="admin-item-info">
          <strong>${f.title}</strong>
          <span class="fiche-badge ${f.badge}">${f.badge === "gratuit" ? "Gratuit" : "Premium"}</span>
          <p>${f.description}</p>
        </div>
        <div class="admin-item-actions">
          <button class="admin-btn" onclick="editFiche(${f.id})">Modifier</button>
          <button class="admin-btn admin-btn-danger" onclick="deleteFiche(${f.id})">Supprimer</button>
        </div>
      </div>`).join("");
  }

  document.getElementById("btn-add-fiche").addEventListener("click", () => {
    currentType = "fiche";
    currentEditId = null;
    modalTitle.textContent = "Ajouter une fiche";
    modalFields.innerHTML = ficheFormFields();
    modal.hidden = false;
  });

  window.editFiche = async (id) => {
    const res = await fetch("/api/fiches");
    const fiches = await res.json();
    const fiche = fiches.find((f) => f.id === id);
    if (!fiche) return;

    currentType = "fiche";
    currentEditId = id;
    modalTitle.textContent = "Modifier la fiche";
    modalFields.innerHTML = ficheFormFields(fiche);
    modal.hidden = false;
  };

  window.deleteFiche = async (id) => {
    if (!confirm("Supprimer cette fiche ?")) return;
    await fetch(`/api/fiches/${id}`, { method: "DELETE" });
    await loadFiches();
  };

  function ficheFormFields(fiche = {}) {
    return `
      <div class="form-group">
        <label for="f-title">Titre</label>
        <input type="text" id="f-title" name="title" value="${fiche.title || ""}" required />
      </div>
      <div class="form-group">
        <label for="f-description">Description</label>
        <textarea id="f-description" name="description" required>${fiche.description || ""}</textarea>
      </div>
      <div class="form-group">
        <label for="f-category">Catégorie</label>
        <select id="f-category" name="category" required>
          <option value="html" ${fiche.category === "html" ? "selected" : ""}>HTML</option>
          <option value="css" ${fiche.category === "css" ? "selected" : ""}>CSS</option>
          <option value="js" ${fiche.category === "js" ? "selected" : ""}>JavaScript</option>
        </select>
      </div>
      <div class="form-group">
        <label for="f-badge">Type</label>
        <select id="f-badge" name="badge" required>
          <option value="gratuit" ${fiche.badge === "gratuit" ? "selected" : ""}>Gratuit</option>
          <option value="premium" ${fiche.badge === "premium" ? "selected" : ""}>Premium</option>
        </select>
      </div>
      <div class="form-group">
        <label for="f-order">Ordre d'affichage</label>
        <input type="number" id="f-order" name="display_order" value="${fiche.display_order || 0}" />
      </div>
      <div class="form-group">
        <label for="f-preview">Image de prévisualisation${fiche.id ? " (laisser vide pour garder l'actuelle)" : ""}</label>
        <input type="file" id="f-preview" name="preview_image" accept="image/*" ${fiche.id ? "" : "required"} />
        ${fiche.preview_image ? `<img src="${fiche.preview_image}" class="admin-preview" />` : ""}
      </div>
      <div class="form-group">
        <label for="f-pdf">Fichier PDF${fiche.id ? " (laisser vide pour garder l'actuel)" : " (optionnel pour Premium)"}</label>
        <input type="file" id="f-pdf" name="pdf_file" accept=".pdf" />
        ${fiche.pdf_url ? `<p class="admin-file-info">PDF actuel : ${fiche.pdf_url.split("/").pop()}</p>` : ""}
      </div>`;
  }

  // Modal submit
  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (currentType === "book") {
      formData.append("title", document.getElementById("f-title").value);
      formData.append("description", document.getElementById("f-description").value);
      formData.append("amazon_url", document.getElementById("f-amazon").value);
      formData.append("display_order", document.getElementById("f-order").value);
      const cover = document.getElementById("f-cover").files[0];
      if (cover) formData.append("cover_image", cover);

      const url = currentEditId ? `/api/books/${currentEditId}` : "/api/books";
      const method = currentEditId ? "PUT" : "POST";
      await fetch(url, { method, body: formData });
      await loadBooks();
    }

    if (currentType === "fiche") {
      formData.append("title", document.getElementById("f-title").value);
      formData.append("description", document.getElementById("f-description").value);
      formData.append("category", document.getElementById("f-category").value);
      formData.append("badge", document.getElementById("f-badge").value);
      formData.append("display_order", document.getElementById("f-order").value);
      const preview = document.getElementById("f-preview").files[0];
      if (preview) formData.append("preview_image", preview);
      const pdf = document.getElementById("f-pdf").files[0];
      if (pdf) formData.append("pdf_file", pdf);

      const url = currentEditId ? `/api/fiches/${currentEditId}` : "/api/fiches";
      const method = currentEditId ? "PUT" : "POST";
      await fetch(url, { method, body: formData });
      await loadFiches();
    }

    modal.hidden = true;
  });

  // Modal close
  document.getElementById("modal-close").addEventListener("click", () => {
    modal.hidden = true;
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.hidden = true;
  });
});
