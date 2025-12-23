# smolvault

Personal vault for bookmarks, notes, and more. Built primarily for learning Rust.

## Status

**Phase:** Initial Setup (see `docs/setup.md` for details)

**Done:**
- Project structure & docs scaffolding
- Docker Compose (Postgres, pgAdmin, Traefik)
- Rust workspace with Axum API skeleton
- Config system (TOML + env var layering)

**Next:**
- Next.js frontend skeleton
- Then: first real feature (bookmarks CRUD)

## Tech Stack

- **Backend**: Rust with Axum (tokio async runtime)
- **Frontend**: NextJS (in `web/`)
- **Database**: PostgreSQL (port 5433)
- **Infra**: Docker Compose (Postgres, pgAdmin, Traefik)
- **Reverse Proxy**: Traefik (API and UI on same domain)

## Project Structure

```
smolvault/
├── CLAUDE.md              # You are here
├── Cargo.toml             # Workspace root
├── docker-compose.yml
├── crates/
│   ├── api/               # Axum web server
│   └── core/              # Domain logic, shared types
├── web/                   # NextJS frontend
├── docs/
│   ├── architecture.md    # System design
│   ├── decisions/         # ADRs
│   └── features/          # Feature planning
└── .claude/
    └── commands/          # Slash command skills
```

## Running Locally

```bash
# Start infrastructure
docker compose up -d

# Run Rust backend (from repo root)
cargo run -p api

# Run frontend (separate terminal)
cd web && npm run dev
```

## Development Workflow

1. Use `/feature <name>` to start planning a new feature
2. Work in plan mode until approach is clear
3. Implement incrementally, testing as you go

## Conventions

- Rust: Follow standard Rust idioms, use `cargo fmt` and `cargo clippy`
- Commits: Conventional commits (feat:, fix:, docs:, etc.)
- Features: Plan in `docs/features/` before implementing

## Key Commands

```bash
cargo fmt              # Format Rust code
cargo clippy           # Lint Rust code
cargo test             # Run tests
cd web && npm run dev  # Start frontend dev server
```
