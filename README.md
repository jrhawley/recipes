# Recipes

This is my recipe book.

## Usage

Recipes, ingredients, and more are written in Markdown.
The HTML is generated with [mdBook](https://github.com/rust-lang/mdBook).

To build the site before pushing, run the following:

```shell
mdbook build
cd docs
mv html/* .
rm -rf .git markdown/ html/
```

