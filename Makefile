.DEFAULT_GOAL := help
.PHONY: help
help: ## Show this help message
	@echo 'Usage: make [options] [target] ...'
	@echo ''
	@echo 'Targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: build
build: book.toml ## Compile the book into the published version
	mdbook build

.PHONY: serve
serve: book.toml ## Compile and serve a local version of the book
	mdbook build --serve

