# Feature: Frontend Foundations

**Status**: Planning
**Created**: 2024-12-23

## Goal

Establish solid frontend patterns before building real features: solve CORS properly, set up data fetching, and add cross-language type safety.

## Concerns to Address

### 1. CORS Strategy

**Current state**: Permissive CORS in Rust API (`Any` origin). Works but feels wrong.

**Options:**

| Option | Prod Parity | Local DX | Complexity |
|--------|-------------|----------|------------|
| A. Keep CORS in Rust | Low (prod won't need it) | Fine | Low |
| B. Next.js rewrites | High (same pattern everywhere) | Fine | Medium |
| C. Everything in Docker/Traefik | High | Worse (no hot reload) | High |

**Discussion points:**
- With Next.js rewrites, browser only talks to Next.js, which proxies `/api/*` to Rust
- In prod behind Traefik, same thing happens at infra level
- This means: **no CORS config in Rust at all** - cleaner
- Rewrite config lives in `next.config.ts`, easy to understand
- Downside: adds a hop in local dev (browser → Next → Rust)
- But: that hop exists in prod anyway (browser → Traefik → Rust)

**Decision**: Option B (Next.js rewrites)

**Done:**
- [x] Added rewrites in `next.config.ts` to proxy `/api/*` to Rust backend
- [x] Updated API client to use relative URLs
- [x] Removed CORS layer from Rust API

---

### 2. Data Fetching (Client-Side)

**Current state**: Raw `useEffect` + `fetch`. Works but footgun-prone.

**Options:**

| Library | Pros | Cons |
|---------|------|------|
| **TanStack Query** | Industry standard, powerful devtools, handles caching/retries/stale data | Larger API surface, more to learn |
| **SWR** | Simpler API, Vercel-made (Next.js synergy), lighter | Fewer features, smaller ecosystem |

**Discussion points:**
- Both solve the same core problems: caching, deduplication, revalidation, loading/error states
- SWR's simplicity might be better for a learning project
- TanStack Query's devtools are really nice for debugging
- Vercel makes both SWR and Next.js, so integration is solid
- TanStack Query is framework-agnostic (useful knowledge if you use other frameworks later)

**Leaning toward**: Undecided. Need to pick one.

**Questions to resolve:**
- Simplicity (SWR) vs power/ecosystem (TanStack)?
- Does "Vercel makes both" actually matter for compatibility?
- Is this a "learn the popular thing" situation (TanStack) or "right tool for the job" (SWR)?

---

### 3. Type Safety (Rust → TypeScript)

**Current state**: Manual copy-paste of types between Rust and TS. Will diverge.

**Decision**: Use `typeshare` crate.

**How it works:**
1. Annotate Rust structs with `#[typeshare]`
2. Run `typeshare ./crates --lang=typescript --output-file=web/src/types/generated.ts`
3. Import generated types in TS

**Tasks:**
- [ ] Add `typeshare` to workspace dependencies
- [ ] Annotate existing types (Health response, Bookmark, Note)
- [ ] Add npm script or Makefile target to regenerate types
- [ ] Update API client to use generated types

---

## Implementation Order

Once decisions are made:

1. **CORS / Proxy** - Set up Next.js rewrites, remove CORS from Rust
2. **Type Safety** - Add typeshare, generate initial types
3. **Data Fetching** - Add chosen library, refactor health check page

## Notes

- These are foundational patterns - worth getting right before building bookmarks CRUD
- All three are somewhat independent, can be done in any order
- Type safety (3) will be more valuable once we have real types to share
