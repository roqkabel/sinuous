# Sinuous Hydrate

![Badge size](https://img.badgesize.io/https://unpkg.com/sinuous/dist/hydrate.min.js?compression=gzip&label=gzip&style=flat-square)
[![codecov](https://img.shields.io/codecov/c/github/luwes/sinuous.svg?style=flat-square)](https://codecov.io/gh/luwes/sinuous)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Sinuous Hydrate is a small add-on for [Sinuous](https://github.com/luwes/sinuous) that provides fast hydration of static HTML. The HTML or SVG that is defined with this API doesn't have to be exactly the same as the HTML coming from the server. It's perfectly valid to only define the attributes that have any dynamic values in it. This is intentionally done to minimize duplication.

# Example

```js
import { observable } from 'sinuous';
import { hydrate, h } from 'sinuous/hydrate';
import { openLogin } from './auth.js';

const isActive = observable('');

hydrate(
  html`
    <a class="login-btn button is-dark" onclick=${openLogin} />
  `
);

hydrate(
  html`
    <a
      class="navbar-burger burger${isActive}"
      onclick=${() => isActive(!isActive() ? ' is-active' : '')}
    />
  `
);

hydrate(
  html`
    <a class="navbar-menu${isActive}" />
  `
);
```

# API

### hydrate(tree, [root]) ⇒ <code>Node</code>

Hydrates the root node with the dynamic HTML.  
Passing the root node is not needed if it can be derived from the `id` or `class` attribute of the root HTML or SVG tree.

**Returns**: <code>Node</code> - Returns the root node.

| Param  | Type                | Description             |
| ------ | ------------------- | ----------------------- |
| tree   | <code>Object</code> | Virtual tree structure. |
| [root] | <code>Node</code>   | Root node.              |

### html`` or h()

Creates a virtual tree structure for HTML.
Looks like:

```js
  {
    type: 'div',
    _props: { class: '' },
    _children: []
  }
```

### svg`` or hs()

Creates a virtual tree structure for SVG.

### \_

A placeholder for content in tags that get skipped. The placeholder prevents duplication of long static texts in JavaScript which would add unnecessary bytes to your bundle.

For example:

```js
import { hydrate, html, _ } from 'sinuous/hydrate';

document.body.innerHTML = `
  <div class="container">
    <h1>Banana</h1>
    <div class="main">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
        aliquip ex ea commodo consequat. Duis aute irure dolor in 
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
        culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <button class="btn">Bom</button>
    </div>
  </div>
`;

hydrate(html`
  <div class="container">
    <h1>${_}</h1>
    <div>
      <p>${_}</p>
      <button onclick=${click}>${_}</button>
    </div>
  </div>
`);
```
