# ADR 001: Initial Technology Stack

**Date**: 2024-12-22
**Status**: Accepted

## Context

Starting a new personal project (smolvault) with the primary goal of learning Rust. Need to choose technologies for backend, frontend, database, and infrastructure.

## Decisions

### Backend: Rust with Axum

**Choice**: Axum over Actix-web

**Reasoning**:
- Built on tokio, the dominant async runtime in Rust ecosystem
- More idiomatic Rust patterns (uses tower middleware, extractors)
- Excellent documentation and growing community
- Performance is excellent (though not the primary concern)
- Better learning path for understanding modern async Rust

### Frontend: NextJS

**Choice**: NextJS with React/TypeScript

**Reasoning**:
- Already familiar with React ecosystem
- Good developer experience
- SSR/SSG options if needed later
- Large ecosystem of components and libraries

### Database: PostgreSQL

**Choice**: PostgreSQL on port 5433

**Reasoning**:
- Robust, feature-rich relational database
- Excellent Rust support (sqlx, diesel)
- Port 5433 to avoid conflict with existing local Postgres (5432)
- Good for structured data (bookmarks, notes)
- Built-in full-text search if needed

### Infrastructure: Docker Compose with Traefik

**Choice**: Docker Compose for local dev, Traefik as reverse proxy

**Reasoning**:
- Docker Compose simplifies multi-service setup
- Traefik provides clean routing (/api/* to Rust, /* to Next)
- Same-domain setup avoids CORS complexity
- Easy to add services (pgAdmin, etc.)
- Mirrors production-like setup

### Repository: Cargo Workspace Monorepo

**Choice**: Single repo with Cargo workspace at root, Next in subdirectory

**Reasoning**:
- Rust is primary focus, so Cargo.toml at root makes sense
- Keeps all code together for easier development
- Simpler than multi-repo setup
- `.claude/` and docs live alongside code

## Consequences

**Positive**:
- Modern, well-supported stack
- Good learning opportunities across Rust ecosystem
- Clean local development setup
- Agentic development friendly (all in one repo)

**Negative**:
- Two package managers (cargo + npm)
- Need to run multiple processes for local dev
- Traefik adds some complexity

**Mitigations**:
- Document clear commands for each part
- Consider a simple shell script or Makefile for common tasks
