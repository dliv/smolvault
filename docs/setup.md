# Initial Setup

Tracking progress on the initial project setup. Once complete, move to feature development.

## Phase 1: Project Foundation

- [x] Create project structure
- [x] Set up CLAUDE.md and agentic development docs
- [x] Create architecture.md with system design
- [x] ADR for initial tech stack choices
- [x] Feature template and `/feature` skill

## Phase 2: Infrastructure (Docker)

- [x] docker-compose.yml with services
- [x] PostgreSQL on port 5433 (avoids conflict with host postgres)
- [x] pgAdmin on port 5051
- [x] Traefik reverse proxy (port 80, dashboard on 8081)
- [x] .env.example with defaults
- [x] .gitignore

## Phase 3: Rust Backend

- [x] Cargo workspace at repo root
- [x] `crates/api` - Axum web server with health endpoint
- [x] `crates/core` - Domain types (Bookmark, Note models)
- [x] Config system (`config` crate with TOML + env layering)
- [x] Tracing/logging setup
- [x] Configurable host/port with proper error handling

## Phase 4: Next.js Frontend

- [x] Initialize Next.js app in `web/` (TypeScript, Tailwind, App Router)
- [x] Basic project structure (`src/app`, `src/lib`)
- [x] API client setup (`src/lib/api.ts` with fetch wrapper)
- [x] Health check page to verify API connectivity
- [x] SWR for client-side data fetching
- [x] Prettier setup (config matches rustfmt style where possible)
- [x] `just` command runner for monorepo tasks (`just fmt`, `just lint`)
- [x] VSCode extensions & settings (`.vscode/`)

## Phase 5: Integration (Local Dev Done, Containerized TBD)

- [x] Next.js rewrites proxy `/api/*` to Rust (strips prefix)
- [x] Rust routes at root (`/health` not `/api/health`)
- [x] No CORS needed - same-origin via proxy
- [x] Traefik config ready with StripPrefix middleware (commented, for containers)
- [ ] Test full containerized mode (optional, for later)

## Phase 6: Database

- [ ] sqlx setup in Rust
- [ ] Initial migrations (users, bookmarks, notes tables)
- [ ] Connection pool configuration
- [ ] Basic repository pattern or query layer

---

## Notes & Decisions Made

- **Port choices:** Postgres 5433, pgAdmin 5051, Traefik dashboard 8081, API 4000, Web 4001
- **macOS quirk:** Must bind to 127.0.0.1 (not 0.0.0.0) for proper port conflict detection
- **Config layering:** `config.toml` → `config.local.toml` → env vars (secrets via env)
- **Service naming:** Using simple service names in docker-compose (`db`, `pgadmin`, `traefik`)
- **Next.js:** App Router, TypeScript, Tailwind, src directory structure
- **API proxy:** Next.js rewrites `/api/*` → Rust (strips prefix), no CORS needed
- **Path stripping:** Both Next.js (dev) and Traefik (prod) strip `/api` prefix, Rust routes at root
- **Data fetching:** SWR for client-side (simpler than TanStack Query, already know RQ from work)
- **Formatting:** Prettier for TS (double quotes, trailing commas to match Rust), `just fmt` for monorepo
- **Task runner:** `just` (simpler than Make, popular in Rust community)

## After Setup

Once phases 1-6 are complete, switch to feature-based development:
1. Use `/feature <name>` to plan features
2. First feature: Bookmarks CRUD
3. Then: Notes, tags, search, etc.
