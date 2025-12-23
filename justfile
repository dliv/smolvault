# Format all code (Rust + TypeScript)
fmt:
    cargo fmt
    cd web && npm run format

# Check formatting without writing
check:
    cargo fmt --check
    cd web && npm run format:check

# Lint all code
lint:
    cargo clippy
    cd web && npm run lint

# Run tests
test:
    cargo test
