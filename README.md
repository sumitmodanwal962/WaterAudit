<![CDATA[# 💧 WaterAudit

A comprehensive web platform for conducting water balance audits of urban water utilities. WaterAudit helps auditors evaluate water distribution systems by computing **Data Validity Scores (DVS)**, **Key Performance Indicators (KPIs)**, **Service Level Benchmarks**, and **Carbon Footprint Analysis** — all following internationally recognized IWA/AWWA standards.

---

## ✨ Features

- **User Authentication** — Secure JWT-based registration, login, and profile management
- **Project Management** — Create, organize, and track multiple audit projects with metadata (scope, location, population, lead auditor)
- **Guided Data Input** — Structured, category-wise data entry with built-in validation modals for every input parameter
- **Data Validity Score (DVS)** — Weighted scoring engine across four categories:
  - Supply Data (40%)
  - Customer Metering Data (30%)
  - Authorized Consumption & Losses (15%)
  - System Attributes (15%)
- **KPI Calculations** — Automated computation of key water audit indicators:
  - Non-Revenue Water (NRW %)
  - Revenue Water Ratio (RWR)
  - Infrastructure Leakage Index (ILI)
  - Current Annual Real Losses (CARL)
  - Unavoidable Annual Real Losses (UARL)
  - Economical Level of Leakage (ELL)
  - Per Capita Water Supply
  - Coverage of Water Supply Connections
- **Carbon Footprint Analysis** — Energy–Water–Carbon Nexus module covering Scope 1, 2, and 3 emissions
- **PDF Report Generation** — Export audit results as downloadable PDF reports
- **Responsive Dashboard** — Modern, dark-mode-ready UI with interactive charts and visualizations
- **Theme Support** — Light and dark mode toggle

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first styling |
| [Radix UI](https://www.radix-ui.com/) | Accessible component primitives |
| [Recharts](https://recharts.org/) | Charting / data visualization |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icon library |
| [jsPDF](https://github.com/parallax/jsPDF) | Client-side PDF generation |
| [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/) | Form validation |

### Backend
| Technology | Purpose |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | Python REST API framework |
| [SQLAlchemy](https://www.sqlalchemy.org/) | ORM & database toolkit |
| [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/)) | Cloud-hosted relational database |
| [Pydantic](https://docs.pydantic.dev/) | Data validation & serialization |
| [python-jose](https://github.com/mpdavis/python-jose) | JWT token handling |
| [bcrypt](https://github.com/pyca/bcrypt) | Password hashing |

---

## 📁 Project Structure

```
WaterAudit/
├── backend/
│   ├── main.py              # FastAPI app & all API routes
│   ├── models.py            # SQLAlchemy models & Pydantic schemas
│   ├── database.py          # DB engine & session configuration
│   ├── auth.py              # JWT & password utilities
│   ├── migrate.py           # Database migration script
│   ├── requirements.txt     # Python dependencies
│   └── .env.example         # Environment variable template
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Landing page
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css           # Global styles
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration page
│   │   └── dashboard/
│   │       ├── layout.tsx        # Dashboard shell (sidebar, nav)
│   │       ├── page.tsx          # Dashboard home
│   │       ├── create-project/   # New project form
│   │       ├── projects/         # Project listing
│   │       ├── data-input/       # Audit data entry
│   │       ├── results/          # KPI & DVS results
│   │       ├── profile/          # User profile
│   │       └── settings/         # App settings
│   ├── components/
│   │   ├── ui/                   # Reusable UI components (shadcn/ui)
│   │   ├── auth/                 # Auth-related components
│   │   └── CustomIcons.tsx       # Custom SVG icons
│   ├── contexts/
│   │   ├── AuthContext.tsx        # Authentication state provider
│   │   └── AuditContext.tsx       # Audit data state provider
│   ├── hooks/                     # Custom React hooks
│   ├── lib/
│   │   ├── api.ts                 # API client (fetch wrapper)
│   │   ├── pdfGenerator.ts        # PDF report builder
│   │   └── dvs/                   # DVS calculation engine
│   │       ├── index.ts           # Input definitions & categories
│   │       ├── calculator.ts      # DVS score & KPI computation
│   │       ├── types.ts           # TypeScript interfaces
│   │       └── [category].ts      # Per-category validation logic
│   ├── package.json
│   └── tsconfig.json
│
├── .github/
│   └── ISSUE_TEMPLATE/            # GitHub issue templates
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
├── LICENSE                        # MIT License
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **Python** ≥ 3.10
- **PostgreSQL** database (or use [Neon](https://neon.tech/) for a free serverless instance)

### 1. Clone the Repository

```bash
git clone https://github.com/sumitmodanwal962/WaterAudit.git
cd WaterAudit
```

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment (recommended)
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your database URL and a secure secret key
```

**`.env` configuration:**
```env
DATABASE_URL=postgresql://username:password@hostname/dbname
SECRET_KEY=your_super_secret_key_here    # Generate with: openssl rand -hex 32
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

```bash
# Start the backend server
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login & receive JWT token |
| `GET` | `/api/users/me` | Get current user profile |
| `PUT` | `/api/users/me` | Update user profile |
| `POST` | `/api/users/me/change-password` | Change password |
| `DELETE` | `/api/users/me` | Delete user account |
| `GET` | `/api/projects` | List all projects for current user |
| `POST` | `/api/projects` | Create a new project |
| `GET` | `/api/projects/{id}` | Get project details |
| `DELETE` | `/api/projects/{id}` | Delete a project |
| `GET` | `/api/projects/{id}/data-input` | Get audit data for a project |
| `POST` | `/api/projects/{id}/data-input` | Save/update audit data for a project |

All endpoints (except register/login) require a Bearer token in the `Authorization` header.

---

## 📊 DVS Calculation Methodology

The **Data Validity Score** quantifies the reliability of input data using the IWA Water Balance framework:

```
DVS = Σ(Wi × Gi) / Σ(Wi) × 100
```

Where:
- **Wi** = Category weight (Supply 40%, Metering 30%, Consumption 15%, System 15%)
- **Gi** = Grade per category (0–1), determined by validation questionnaire responses

Each data parameter is validated through guided modals with weighted scoring, ensuring the DVS accurately reflects data quality. Dynamic sub-weighting within categories accounts for volumetric significance (e.g., larger supply sources receive proportionally higher weight).

---

## 🌱 Carbon Footprint Module

WaterAudit extends traditional water auditing with carbon footprint analysis based on the **Energy–Water–Carbon Nexus** framework:

| Scope | Source | Formula |
|---|---|---|
| Scope 2 | Grid electricity | `(kWh - Renewables) × Grid Factor` |
| Scope 1 | Diesel/fuel | `Litres × 2.68 kgCO₂/L` |
| Scope 3 | Treatment chemicals | `Chlorine × 1.08 + Alum × 0.70` |

**Normalized Metrics:** Carbon per MLD, Carbon per Capita, Carbon cost of water losses.

---

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guide](CONTRIBUTING.md) before getting started.

**Quick summary:**
1. Create your own branch from `main`
2. Pull latest `main` before working
3. Make changes with clear, descriptive commit messages
4. Ensure the app runs before submitting a PR
5. Push to your branch and open a pull request

---

## 🔒 Security

For security concerns, please refer to our [Security Policy](SECURITY.md).

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

Copyright © 2026 [theub002](https://github.com/theub002) and [sumitmodanwal962](https://github.com/sumitmodanwal962)

---

## 👥 Authors

- **theub002** — [GitHub](https://github.com/theub002)
- **sumitmodanwal962** — [GitHub](https://github.com/sumitmodanwal962)
]]>
