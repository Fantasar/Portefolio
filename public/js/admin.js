document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("admin-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalFields = document.getElementById("modal-fields");
  const modalForm = document.getElementById("modal-form");
  const tabs = document.querySelectorAll("[data-tab]");
  const searchInput = document.getElementById("admin-search");

  let currentType = null;
  let currentEditId = null;
  let allBooks = [];
  let allFiches = [];

  function toast(message, type = "success") {
    const el = document.createElement("div");
    el.className = `admin-toast admin-toast-${type}`;
    el.textContent = message;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add("show"));
    setTimeout(() => {
      el.classList.remove("show");
      setTimeout(() => el.remove(), 300);
    }, 3000);
  }

  checkAuth();

  async function checkAuth() {
    try {
      const res = await fetch("/api/me");
      const data = await res.json();
      if (!data.isAdmin) {
        window.location.href = "admin.html";
        return;
      }
      await loadBooks();
      await loadFiches();
    } catch {
      window.location.href = "admin.html";
    }
  }

  // Logout
  document.getElementById("btn-logout").addEventListener("click", async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "admin.html";
  });

  // Tabs
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabs.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById("panel-books").hidden = btn.dataset.tab !== "books";
      document.getElementById("panel-fiches").hidden = btn.dataset.tab !== "fiches";
      filterList();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", filterList);
  }

  function filterList() {
    const query = (searchInput ? searchInput.value : "").toLowerCase().trim();
    const activeTab = document.querySelector("[data-tab].active").dataset.tab;

    if (activeTab === "books") {
      const filtered = query
        ? allBooks.filter((b) => b.title.toLowerCase().includes(query) || b.description.toLowerCase().includes(query))
        : allBooks;
      renderBooks(filtered);
    } else {
      const filtered = query
        ? allFiches.filter((f) => f.title.toLowerCase().includes(query) || f.description.toLowerCase().includes(query) || f.category.toLowerCase().includes(query))
        : allFiches;
      renderFiches(filtered);
    }
  }

  // Books
  async function loadBooks() {
    const res = await fetch("/api/books");
    allBooks = await res.json();

    const statBooks = document.getElementById("stat-books");
    if (statBooks) statBooks.textContent = allBooks.length;

    renderBooks(allBooks);
  }

  function renderBooks(books) {
    const list = document.getElementById("books-list");

    if (books.length === 0) {
      list.innerHTML = '<p class="admin-empty">Aucun livre trouvé</p>';
      return;
    }

    list.innerHTML = books.map((b) => `
      <div class="admin-item" draggable="true" data-id="${b.id}" data-type="book">
        <span class="drag-handle" title="Glisser pour réordonner">&#9776;</span>
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

    initDragDrop(list, "books");
  }

  document.getElementById("btn-add-book").addEventListener("click", () => {
    currentType = "book";
    currentEditId = null;
    modalTitle.textContent = "Ajouter un livre";
    modalFields.innerHTML = bookFormFields();
    bindImagePreview();
    modal.hidden = false;
  });

  window.editBook = async (id) => {
    const book = allBooks.find((b) => b.id === id);
    if (!book) return;

    currentType = "book";
    currentEditId = id;
    modalTitle.textContent = "Modifier le livre";
    modalFields.innerHTML = bookFormFields(book);
    bindImagePreview();
    modal.hidden = false;
  };

  window.deleteBook = async (id) => {
    if (!confirm("Supprimer ce livre ?")) return;
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast("Livre supprimé");
      await loadBooks();
    } else {
      toast("Erreur lors de la suppression", "error");
    }
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
        <label for="f-cover">Image de couverture${book.id ? " (laisser vide pour garder l'actuelle)" : ""}</label>
        <input type="file" id="f-cover" name="cover_image" accept="image/*" ${book.id ? "" : "required"} data-preview="img-preview-cover" />
        <div class="admin-preview-zone">
          ${book.cover_image ? `<img id="img-preview-cover" src="${book.cover_image}" class="admin-preview" />` : `<img id="img-preview-cover" class="admin-preview" hidden />`}
        </div>
      </div>`;
  }

  // Fiches
  async function loadFiches() {
    const res = await fetch("/api/fiches");
    allFiches = await res.json();

    const statFiches = document.getElementById("stat-fiches");
    const statGratuit = document.getElementById("stat-gratuit");
    const statPremium = document.getElementById("stat-premium");
    if (statFiches) statFiches.textContent = allFiches.length;
    if (statGratuit) statGratuit.textContent = allFiches.filter((f) => f.badge === "gratuit").length;
    if (statPremium) statPremium.textContent = allFiches.filter((f) => f.badge === "premium").length;

    renderFiches(allFiches);
  }

  function renderFiches(fiches) {
    const list = document.getElementById("fiches-list");

    if (fiches.length === 0) {
      list.innerHTML = '<p class="admin-empty">Aucune fiche trouvée</p>';
      return;
    }

    list.innerHTML = fiches.map((f) => `
      <div class="admin-item" draggable="true" data-id="${f.id}" data-type="fiche">
        <span class="drag-handle" title="Glisser pour réordonner">&#9776;</span>
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

    initDragDrop(list, "fiches");
  }

  document.getElementById("btn-add-fiche").addEventListener("click", () => {
    currentType = "fiche";
    currentEditId = null;
    modalTitle.textContent = "Ajouter une fiche";
    modalFields.innerHTML = ficheFormFields();
    bindImagePreview();
    modal.hidden = false;
  });

  window.editFiche = async (id) => {
    const fiche = allFiches.find((f) => f.id === id);
    if (!fiche) return;

    currentType = "fiche";
    currentEditId = id;
    modalTitle.textContent = "Modifier la fiche";
    modalFields.innerHTML = ficheFormFields(fiche);
    bindImagePreview();
    modal.hidden = false;
  };

  window.deleteFiche = async (id) => {
    if (!confirm("Supprimer cette fiche ?")) return;
    const res = await fetch(`/api/fiches/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast("Fiche supprimée");
      await loadFiches();
    } else {
      toast("Erreur lors de la suppression", "error");
    }
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
        <label for="f-preview">Image de prévisualisation${fiche.id ? " (laisser vide pour garder l'actuelle)" : ""}</label>
        <input type="file" id="f-preview" name="preview_image" accept="image/*" ${fiche.id ? "" : "required"} data-preview="img-preview-fiche" />
        <div class="admin-preview-zone">
          ${fiche.preview_image ? `<img id="img-preview-fiche" src="${fiche.preview_image}" class="admin-preview" />` : `<img id="img-preview-fiche" class="admin-preview" hidden />`}
        </div>
      </div>
      <div class="form-group">
        <label for="f-pdf">Fichier PDF${fiche.id ? " (laisser vide pour garder l'actuel)" : " (optionnel pour Premium)"}</label>
        <input type="file" id="f-pdf" name="pdf_file" accept=".pdf" />
        ${fiche.pdf_url ? `<p class="admin-file-info">PDF actuel : ${fiche.pdf_url.split("/").pop()}</p>` : ""}
      </div>`;
  }

  // Image preview
  function bindImagePreview() {
    document.querySelectorAll("[data-preview]").forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const imgEl = document.getElementById(input.dataset.preview);
        if (!file || !imgEl) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          imgEl.src = ev.target.result;
          imgEl.hidden = false;
        };
        reader.readAsDataURL(file);
      });
    });
  }

  // Drag & drop
  function initDragDrop(list, type) {
    let dragItem = null;

    list.querySelectorAll(".admin-item[draggable]").forEach((item) => {
      item.addEventListener("dragstart", (e) => {
        dragItem = item;
        item.classList.add("dragging");
        e.dataTransfer.effectAllowed = "move";
      });

      item.addEventListener("dragend", () => {
        item.classList.remove("dragging");
        dragItem = null;
        list.querySelectorAll(".admin-item").forEach((el) => el.classList.remove("drag-over"));
        saveOrder(list, type);
      });

      item.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        if (item !== dragItem) {
          item.classList.add("drag-over");
        }
      });

      item.addEventListener("dragleave", () => {
        item.classList.remove("drag-over");
      });

      item.addEventListener("drop", (e) => {
        e.preventDefault();
        item.classList.remove("drag-over");
        if (item !== dragItem && dragItem) {
          const items = [...list.querySelectorAll(".admin-item")];
          const fromIndex = items.indexOf(dragItem);
          const toIndex = items.indexOf(item);
          if (fromIndex < toIndex) {
            item.after(dragItem);
          } else {
            item.before(dragItem);
          }
        }
      });
    });
  }

  async function saveOrder(list, type) {
    const ids = [...list.querySelectorAll(".admin-item")].map((el) => parseInt(el.dataset.id));
    const res = await fetch(`/api/${type}/reorder`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ order: ids }),
    });
    if (res.ok) {
      toast("Ordre mis à jour");
    } else {
      toast("Erreur lors du réordonnement", "error");
    }
  }

  // Modal submit
  modalForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();

    try {
      if (currentType === "book") {
        formData.append("title", document.getElementById("f-title").value);
        formData.append("description", document.getElementById("f-description").value);
        formData.append("amazon_url", document.getElementById("f-amazon").value);
        formData.append("display_order", "0");
        const cover = document.getElementById("f-cover").files[0];
        if (cover) formData.append("cover_image", cover);

        const url = currentEditId ? `/api/books/${currentEditId}` : "/api/books";
        const method = currentEditId ? "PUT" : "POST";
        const res = await fetch(url, { method, body: formData });
        if (!res.ok) throw new Error();
        toast(currentEditId ? "Livre modifié" : "Livre ajouté");
        await loadBooks();
      }

      if (currentType === "fiche") {
        formData.append("title", document.getElementById("f-title").value);
        formData.append("description", document.getElementById("f-description").value);
        formData.append("category", document.getElementById("f-category").value);
        formData.append("badge", document.getElementById("f-badge").value);
        formData.append("display_order", "0");
        const preview = document.getElementById("f-preview").files[0];
        if (preview) formData.append("preview_image", preview);
        const pdf = document.getElementById("f-pdf").files[0];
        if (pdf) formData.append("pdf_file", pdf);

        const url = currentEditId ? `/api/fiches/${currentEditId}` : "/api/fiches";
        const method = currentEditId ? "PUT" : "POST";
        const res = await fetch(url, { method, body: formData });
        if (!res.ok) throw new Error();
        toast(currentEditId ? "Fiche modifiée" : "Fiche ajoutée");
        await loadFiches();
      }

      modal.hidden = true;
    } catch {
      toast("Erreur lors de l'enregistrement", "error");
    }
  });

  // Modal close
  document.getElementById("modal-close").addEventListener("click", () => {
    modal.hidden = true;
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.hidden = true;
  });
});
