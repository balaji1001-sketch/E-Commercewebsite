# Backend Roadmap — Django + DRF + MySQL

> **Status: not started.** This is the plan we execute *after* the frontend reaches Phase 16.
> Keeping it in the repo means the decisions are written down before the code exists — which is
> exactly what a senior engineer does, and a good thing to point at in an interview.

---

## Target architecture

```
Browser (HTML/CSS/JS)
   ↓  fetch() with JSON + JWT header
HTTP Request
   ↓
Django REST Framework
   ↓  urls.py            → which view handles this URL?
   ↓  View / ViewSet     → what should happen? who's allowed?
   ↓  Serializer         → validate input / shape output
   ↓  Django ORM         → Python objects → SQL
   ↓
MySQL
   ↓  rows
   ↑  Serializer → JSON
Frontend renders
```

Every phase below adds one layer of that diagram.

---

## Final repo layout

```
ecommerce-project/
├── frontend/            ← this project moves in here
├── backend/
│   ├── manage.py
│   ├── config/          ← settings.py, urls.py, wsgi.py
│   ├── accounts/        ← User, Profile, Address, JWT auth
│   ├── products/        ← Category, Product
│   ├── cart/            ← Cart, CartItem
│   ├── wishlist/        ← Wishlist, WishlistItem
│   ├── orders/          ← Order, OrderItem, status flow
│   └── requirements.txt
├── README.md
├── .gitignore
└── .env.example         ← committed. `.env` itself is NEVER committed.
```

---

## Phase list

| # | Phase | Key concepts |
|---|-------|--------------|
| 0 | Django fundamentals | Django, DRF, API, REST, JSON, ORM, model, migration, serializer, view, route, authN vs authZ |
| 1 | Project setup | venv · project vs app · settings.py · INSTALLED_APPS · manage.py · requirements.txt |
| 2 | MySQL connection | DATABASES · mysqlclient · `.env` · why credentials never go in git |
| 3 | Database design | PK · FK · 1-1 · 1-many · many-many · `on_delete` — designed *before* any model is written |
| 4 | Products | Models, field types, `ForeignKey`, `related_name`, `null` vs `blank`, `choices`, `makemigrations` / `migrate` |
| 5 | Django Admin | `ModelAdmin`, `list_display`, `search_fields`, `list_filter`, `ordering` |
| 6 | Django ORM drills | `all/get/filter/create/update/delete` · `Q` · `F` · `order_by` · `exclude` · `count` · `aggregate` · `annotate` |
| 7 | Serializers | `ModelSerializer` · `fields` · `read_only_fields` · validation · nested serializers |
| 8 | Product APIs | GET/POST/PUT/PATCH/DELETE · status codes · APIView vs ViewSet · routers · permissions |
| 9 | Search / filter / pagination | Query params: `?search=` `?category=` `?ordering=` `?page=` |
| 10 | Authentication | Custom User · password hashing · JWT access + refresh tokens |
| 11 | Profile & addresses | OneToOne, ForeignKey, default address |
| 12 | Cart | Move cart off localStorage into MySQL; server owns the maths |
| 13 | Wishlist | Unique-together constraints, move-to-cart |
| 14 | Checkout | Stock validation, **price validation — never trust the frontend's price** |
| 15 | Orders | Order + OrderItem; OrderItem stores price *at purchase time* |
| 16 | Order status | Pending → Confirmed → Processing → Shipped → Out for Delivery → Delivered / Cancelled |
| 17 | Admin APIs | `is_staff`, `is_superuser`, custom permission classes, role-based access |
| 18 | Image upload | `ImageField` · Pillow · `MEDIA_URL` / `MEDIA_ROOT` · multipart/form-data |
| 19 | Validation | Serializer validation; why backend validation is mandatory even with frontend validation |
| 20 | Error handling | Consistent envelope + correct 200/201/400/401/403/404/409/500 |
| 21 | Security | CSRF · CORS · SQL injection · hashing · secrets · `DEBUG=False` · HTTPS |
| 22 | Connect frontend | Flip `USE_MOCK` to `false`; every service hits a real endpoint |
| 23 | API testing | DRF browsable API · Postman · per-endpoint checklist |
| 24 | Optimization | Indexes · `select_related` · `prefetch_related` · N+1 queries |
| 25 | Deployment | Gunicorn · env vars · static/media files · fresher-friendly hosting |

---

## Three rules that survive every phase

1. **Never trust the frontend.** Prices, discounts, stock and totals are recalculated in Django from the database. The browser only sends *product id* and *quantity*.
2. **Never hardcode secrets.** `SECRET_KEY`, DB password and JWT settings live in `.env`, which is in `.gitignore`. `.env.example` (with fake values) is what gets committed.
3. **A user may only touch their own data.** Every order/cart/address queryset is filtered by `request.user` — not by an id the client sent.

---

## The interview questions this project must let me answer

**Django** — What is Django? Project vs app? What is MVT? What is a model? What are migrations? What is the ORM? What is middleware?

**DRF** — What is a REST API? What is a serializer? `APIView` vs `ViewSet`? What are routers? What are permissions? What is JWT, and why are there two tokens?

**MySQL** — Primary key, foreign key, relationships, JOIN, index, normalization, transactions.

**This project** —
- Explain your architecture end to end.
- Why Django? Why MySQL?
- How does login work, from click to token?
- How does the cart work, and why did you move it off localStorage?
- What happens, step by step, when a user clicks **Place Order**?
- How do you stop a user from modifying someone else's order?
- How do you validate stock under concurrent orders?
- Why can't you trust the price the frontend sends?
- Why does `OrderItem` store its own price instead of reading `Product.price`?
- How did you design the database, and what would you change now?

---

## How this gets taught (agreed teaching contract)

Per feature: explain the requirement → explain the Django concept → I write the code → line-by-line explanation → run and test it → a small task for me → review of my answer (what's right, what's wrong, why, how to improve) → 3–5 interview questions.

**Debugging mode** — when I paste an error: what it means → why it happened → where it is → how to fix it → how to prevent it. Corrected code comes last, never first.

**Interview mode** — after the project is done: one question at a time, easy → intermediate → advanced → project-specific → debugging → system design. On a wrong answer: hint first, second attempt, *then* the explanation.
