# Latina Forms

Latina Forms provides modern, framework‑free form components built with HTML, CSS and vanilla JavaScript.

## Getting Started

Clone the repository and install dependencies:

```bash
npm install
```

Generate the distributable files:

```bash
npm run build
```

The build step compiles the SCSS and bundles the JavaScript into the **dist** directory:

```
dist/
  latina-forms.css
  latina-forms.js
```

## Usage

Include the bundled CSS and JavaScript in your page and add Latin‑style markup:

```html
<link rel="stylesheet" href="dist/latina-forms.css" />
<script src="dist/latina-forms.js"></script>

<form>
  <div class="input-field">
    <input id="firstname" type="text" required>
    <label for="firstname">First Name<span class="required">*</span></label>
  </div>
</form>
```

Components automatically enhance standard form elements:

- **Floating labels** for text inputs and textareas
- **Custom select menus**
- **Password visibility toggles**
- **Number steppers**
- **Tags inputs**

## Customization

SCSS sources live in the `scss/` directory. Run a watcher during development to rebuild styles automatically:

```bash
npm run scss
```

Modify colors, typography or component behaviour in the SCSS/JS files and run `npm run build` to refresh the files in `dist/`.

## Example

The repository includes `index.html` demonstrating all components. Open it in a browser to explore the available features.

## License

MIT
