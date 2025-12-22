# Architecture

## Overview

smolvault is a personal data vault with a Rust backend API and NextJS frontend, unified behind Traefik reverse proxy.

```
┌─────────────────────────────────────────────────────────┐
│                      Traefik                            │
│                   (reverse proxy)                       │
│         ┌──────────────┬──────────────┐                 │
│         │   /api/*     │     /*       │                 │
│         ▼              ▼              │                 │
│   ┌──────────┐   ┌──────────┐         │                 │
│   │   Rust   │   │  NextJS  │         │                 │
│   │   API    │   │   Web    │         │                 │
│   │  (Axum)  │   │          │         │                 │
│   └────┬─────┘   └──────────┘         │                 │
│        │                              │                 │
│        ▼                              │                 │
│   ┌──────────┐                        │                 │
│   │ Postgres │                        │                 │
│   │  :5433   │                        │                 │
│   └──────────┘                        │                 │
└─────────────────────────────────────────────────────────┘
```

## Components

### API (crates/api)

Axum-based HTTP server. Responsibilities:
- REST API endpoints
- Authentication/session management
- Request validation
- Database queries via sqlx or diesel

### Core (crates/core)

Shared domain logic. Responsibilities:
- Domain types (Bookmark, Note, etc.)
- Business logic
- Validation rules

### Web (web/)

NextJS frontend. Responsibilities:
- User interface
- Client-side state
- API client

### Infrastructure

| Service | Port | Purpose |
|---------|------|---------|
| Traefik | 80/443 | Reverse proxy, routing |
| Postgres | 5433 | Database |
| pgAdmin | 5051 | Database management UI |

## Data Model (Initial)

```
┌─────────────┐     ┌─────────────┐
│   users     │     │  bookmarks  │
├─────────────┤     ├─────────────┤
│ id          │────<│ user_id     │
│ email       │     │ url         │
│ created_at  │     │ title       │
└─────────────┘     │ notes       │
                    │ tags        │
                    │ created_at  │
                    └─────────────┘

                    ┌─────────────┐
                    │   notes     │
                    ├─────────────┤
                    │ user_id     │
                    │ title       │
                    │ content     │
                    │ tags        │
                    │ created_at  │
                    └─────────────┘
```

## Future Considerations

- Image/file storage (S3-compatible? Local?)
- Full-text search (Postgres built-in? Meilisearch?)
- Import/export (JSON, browser bookmarks)
