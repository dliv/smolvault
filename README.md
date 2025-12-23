# smolvault

Personal vault for bookmarks, notes, and more.

## Setup

```bash
cp .env.example .env  # optional, defaults work
docker compose up -d
```

## Development

**Local dev** (recommended for day-to-day work):
- Infra only in Docker: `docker compose up -d` (db, pgadmin, traefik)
- Run Rust API on host: `cargo run -p api`
- Run Next frontend on host: `cd web && npm run dev`

**Full containerized** (test production-like setup):
- Uncomment `api` and `web` services in `docker-compose.yml`
- Run: `docker compose --profile full up -d`

## Services

| Service | URL | Notes |
|---------|-----|-------|
| Postgres | localhost:5433 | `smolvault` / `smolvault` |
| pgAdmin | http://localhost:5051 | `admin@example.com` / `admin` |
| Traefik Dashboard | http://localhost:8081 | |
| API (local) | http://localhost:4000 | `PORT` env var |
| Web (local) | http://localhost:4001 | via npm run dev |

## Monorepo Commands

Uses [just](https://github.com/casey/just) as a command runner. Install with `cargo install just` or `brew install just`.

```bash
just fmt      # Format all code (Rust + TS)
just check    # Check formatting
just lint     # Lint all code
just test     # Run tests
```
