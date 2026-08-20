# ShopSphere — E-Commerce & Order Management System (Frontend)

A production-style e-commerce storefront and admin dashboard built with **HTML5, CSS3 and vanilla JavaScript (ES modules)** — no frontend framework.

The frontend is deliberately structured so that the mock data layer can be replaced with a **Django REST Framework + MySQL** backend without rewriting the UI.

---

## Status

| Phase | Module | Status |
|------|--------|--------|
| 1 | Project setup + folder structure | ✅ Done |
| 2 | Global CSS + design system | ⬜ |
| 3 | Navbar + footer | ⬜ |
| 4 | Homepage | ⬜ |
| 5 | Shop / product listing | ⬜ |
| 6 | Product details | ⬜ |
| 7 | Cart + localStorage | ⬜ |
| 8 | Wishlist | ⬜ |
| 9 | Login + registration | ⬜ |
| 10 | User profile | ⬜ |
| 11 | Checkout | ⬜ |
| 12 | Orders + order details | ⬜ |
| 13 | Admin dashboard | ⬜ |
| 14 | Responsive + accessibility | ⬜ |
| 15 | Cleanup + refactor | ⬜ |
| 16 | Django REST Framework integration | ⬜ |

---

## Running it locally

This project uses **ES modules** (`<script type="module">`), which browsers block when you open a file directly with `file://`. Serve it over HTTP instead:

```bash
cd ecommerce-frontend
python -m http.server 5500
```

Then open <http://localhost:5500>.

> VS Code users: the **Live Server** extension does the same thing with one click.

---

## Architecture

The JavaScript is split into four layers. Data flows in one direction:

```
api/  →  services/  →  pages/  →  the DOM
             ↑
          utils/, ui/  (helpers used by everyone)
```

| Layer | Responsibility | Knows about |
|-------|----------------|-------------|
| `api/` | Where data comes from (mock now, Django later) | HTTP, URLs, JSON |
| `services/` | Business rules: cart totals, filtering, auth state | data shapes only |
| `ui/` | Reusable HTML builders and notifications | the DOM |
| `pages/` | One controller per page: fetch → render → handle clicks | all of the above |

**Why this matters:** when the Django backend is ready, only `api/config.js` and `api/http.js` change. No page controller is touched.

---

## Folder structure

```
ecommerce-frontend/
├── index.html              # Home
├── shop.html               # Product listing + filters
├── product.html            # Product details (?id=1)
├── cart.html
├── wishlist.html
├── login.html
├── register.html
├── profile.html
├── checkout.html
├── orders.html
├── order-details.html      # ?id=ORD-1001
├── 404.html
│
├── admin/
│   ├── dashboard.html
│   ├── products.html
│   ├── orders.html
│   ├── users.html
│   └── coupons.html
│
├── assets/
│   ├── css/
│   │   ├── base.css        # reset + design tokens + typography
│   │   ├── layout.css      # container, grid, navbar, footer
│   │   ├── components.css  # buttons, cards, forms, badges, toasts
│   │   ├── pages.css       # page-specific styles
│   │   └── responsive.css  # all media queries
│   │
│   ├── js/
│   │   ├── api/            # config.js, http.js, mock-data.js
│   │   ├── services/       # product, cart, wishlist, auth, order
│   │   ├── ui/             # layout.js, components.js, toast.js
│   │   ├── pages/          # one controller per page
│   │   ├── utils/          # format.js, storage.js, validate.js
│   │   └── main.js         # shared entry point
│   │
│   └── images/
│
└── README.md
```

---

## Planned backend API

The frontend is written against this contract:

```
GET    /api/products/            GET  /api/products/<id>/
GET    /api/categories/

GET    /api/cart/                POST /api/cart/items/
PATCH  /api/cart/items/<id>/     DELETE /api/cart/items/<id>/

GET    /api/orders/              GET  /api/orders/<id>/
POST   /api/orders/

POST   /api/auth/register/       POST /api/auth/login/
POST   /api/auth/logout/         POST /api/auth/refresh/

GET    /api/users/profile/       PATCH /api/users/profile/
GET    /api/wishlist/            POST /api/wishlist/
```

---

## Tech stack

**Now:** HTML5 · CSS3 (custom design system, no framework) · JavaScript ES6 modules · Chart.js (admin only)

**Next:** Python · Django · Django REST Framework · MySQL · JWT authentication

---

## Note on security

All validation and "authentication" in this repository is **client-side only** and exists for user experience, not security. Anything a browser enforces can be bypassed with DevTools. Real authentication, authorization, price calculation and stock checks are enforced by Django in Phase 16.
