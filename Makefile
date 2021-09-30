.PHONY: build
build: book.toml
	mdbook build

.PHONY: serve
serve: book.toml
	mdbook build --serve

