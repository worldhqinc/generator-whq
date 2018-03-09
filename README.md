# WHQ Generator
A yeoman generator for simple PHP projects, including:

* Complete webpack setup
* Options for Sass or PostCSS
* Hashing of stylesheets, scripts and images for caching purposes
* Babel setup so you can use ES6 syntax
* CSS purification so unused styles are removed
* CSS and JS minification in production
* Linting with ESLint and Stylelint
* BrowserSync for hot reloading

## Installation

Install the generator globally by running:

```sh
npm install -g generator-whq
```

## Usage

Change into the directory where you want to create your project. Then run:

```sh
yo whq
```

You will receive prompts to choose your options. Dependencies will be automatically installed, and webpack will be run. The project will then be put into watch mode. You can start working right away!
