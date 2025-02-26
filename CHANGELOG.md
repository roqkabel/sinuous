# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 0.19.3 - 2020-01-04

### Fixed

- Fixed hydrate root props handling.

### Added

- Hydrate components support.

## 0.19.2 - 2020-01-02

# Added

- Added element context to accessor calls in `property` and `insert` api.

## 0.19.1 - 2020-01-01

### Fixed

- Fixed CSS selector escaping in `hydrate`.

### Added

- Added types for `context()` and internal `api` methods.
- Added tag name selecting in `hydrate`, for example:

```js
hydrate(html`<body onclick="${blur}">`);
```

## 0.19.0 - 2019-12-25

### Added 

- Added type declarations [#52](https://github.com/luwes/sinuous/pull/52)

## 0.18.5 - 2019-12-15

### Added 

- Added special bundle to display bundle size of Sinuous w/ observable included.

## 0.18.4 - 2019-12-13

### Changed

- Use Sinuous api instead of template hooks and golf some bytes 🏌️‍♂️

## 0.18.3 - 2019-12-13

### Removed

- Golf down some bytes in `map` (-68 B) ⛳️

## 0.18.2 - 2019-12-07

### Fixed

- Fixed memory leak in observable [#51](https://github.com/luwes/sinuous/pull/51)

## 0.18.1 - 2019-12-03

### Added

- Add `S` alias for the `all` package which is meant to include in your webpage with a script tag.

## 0.18.0 - 2019-12-03

### Added

- Added `all` package for easy use with a script tag.

## 0.17.2 - 2019-11-28

## 0.17.1 - 2019-11-28

### Fixed

- Fixed `hydrate` content function that returns a stringable.

## 0.17.0 - 2019-11-24

### Added

- Added implicit root selector to `hydrate`.

## 0.16.3 - 2019-11-03

### Added

- Added sourcemaps to all bundles

## 0.16.2 - 2019-11-02

## 0.16.1 - 2019-11-02

### Fixed

- Fixed a minifying error caused by a Terser bug.
  See [`scripts/rollup/config.js`](scripts/rollup/config.js)

## 0.16.0 - 2019-10-06

### Added

- Added partial attribute support [#40](https://github.com/luwes/sinuous/pull/40)

## 0.15.3 - 2019-10-03

### Fixed

- Added better support for adjacent text nodes in `hydrate`.

## 0.15.2 - 2019-09-28

### Fixed

- Fixed babel-plugin-htm `TypeError: Cannot read property '0' of null`.

### Changed

- Made `property` api accept plain objects.

## 0.15.1 - 2019-09-25

### Changed

- Changed map mini import to be `import { map } from 'sinuous/map/mini'` instead of `import { mini } from 'sinuous/map'`.
- Re-named variables in `map` and golfed down the bundle from 1.45kB to 1.19kB, also by removing the fast path for swap backward and swap forward.

## 0.15.0 - 2019-09-13

### Added

- Added basic `hydrate` feature [#36](https://github.com/luwes/sinuous/pull/36)
- Disable `observable` cleaning by default in `map` for repeated `template`'s.

## 0.14.2 - 2019-09-04

### Fixed

- Prevented running duplicate nested computations.
- Marked removed children computations as fresh so they skip running.
- Fixed a `transaction` bug which prevent nullish values from being set.
- Improved performance by using `Set` for the subscribers [#20](https://github.com/luwes/sinuous/issues/20)

### Added

- Added `import { computed } from 'sinuous/observable'` which `S` is now an alias for.

## 0.14.1 - 2019-08-29

### Fixed

- Fixed template scope key actions bug. Impacted performance and incorrect rendering. Visible in JS Framework Benchmark.

### Changed

## 0.14.0 - 2019-08-27 - BREAKING CHANGES

### Added

- Added `import { mini } from 'sinuous/map'`. It's only 570 bytes heiiii! [#32](https://github.com/luwes/sinuous/issues/32)

![Gob](https://media.giphy.com/media/n0WvhHFTpihk4/giphy.gif)

### Changed

- Breaking changes `import map from 'sinuous/map'` to `import { map } from 'sinuous/map'`

## 0.13.1 - 2019-08-11

### Fixed

- Fixed same key observe tags in template fix [#5](https://github.com/luwes/sinuous/issues/5)

### Added

- Added transaction method [#21](https://github.com/luwes/sinuous/issues/21)

## 0.13.0 - 2019-08-03

### Added

- Added web ES modules support [#27](https://github.com/luwes/sinuous/issues/27)

### Fixed

- Fixed [Observable set works from other computed #28](https://github.com/luwes/sinuous/issues/28)

## 0.12.9 - 2019-07-31

### Fixed

- Fixed bundling issue
- Fixed [Verify `map` disposers index #23](https://github.com/luwes/sinuous/issues/23) by using `Map` again

## 0.12.8 - 2019-07-31

### Added

- Added HTM's support for HTML comments
- Added out of the box support down to IE9

### Fixed

- Fixed [Verify `map` disposers index #23](https://github.com/luwes/sinuous/issues/23)

## 0.12.7 - 2019-07-28

### Fixed

- Fixed [Plain computed in root doesn't return result #22](https://github.com/luwes/sinuous/issues/22)

## 0.12.6 - 2019-07-28

### Fixed

- Fixed naming issue for umd and iife bundles
- Add observable duplicate edges check
- Replace Map w/ array for `map` disposers

## 0.12.5 - 2019-07-23

### Fixed

- Fixed [Plain array in root doesn't return `DocumentFragment` #19](https://github.com/luwes/sinuous/issues/19)

## 0.12.4 - 2019-07-23

### Fixed

- Fixed [template` inserts with duplicate value are empty #14](https://github.com/luwes/sinuous/issues/14)

## 0.12.3 - 2019-07-22

### Fixed

- Fixed [Incorrect updating of observable #18](https://github.com/luwes/sinuous/issues/18)

### Changed

- Upgraded `sinuous/htm` and `sinuous/babel-plugin-htm` to latest version.

## 0.12.2 - 2019-07-21

### Added

- Added support for plain array inserts again w/ no size increase.

## 0.12.1 - 2019-07-19

### Changed

- Make `map` return a DocumentFragment.
- Optimized and re-used code for full replace in `map`.

## 0.12.0 - 2019-07-17

### Added

- Added SVG support.

### Removed

- Removed plain array inserts. Fragments can be used for this aka

```js
html`
  <h1>Title</h1>
  <p>Some text</p>
`;
```

## 0.11.4 - 2019-07-07

### Changed

- Prioritized string and numeric values for `insert`.

## 0.11.3 - 2019-07-07

### Removed

- Removed array to node support in `insert`. Save some bytes.

## 0.11.2 - 2019-07-07

### Changed

- Fixed mixed exports
  It's not recommended to have a default AND named exports

### Removed

- Removed multi expressions

## 0.11.1 - 2019-07-04

### Added

- Added minified browser version `.min.js`.

### Removed

- Removed shorthand tag parser from hyperscript.
- Removed specialized attribute `ref`.
  No need w/ Sinuous since it returns plain elements.
- Removed unneeded api on `h` tag.

### Changed

- Optimized rollup/terser config for smaller bundle.

## 0.11.0 - 2019-07-03

### Added

- Added `sinuous/htm` and `sinuous/babel-plugin-htm` supporting fragments.
- Added easy import `import { html } from 'sinuous';`

## 0.10.1 - 2019-07-02

### Changed

- Removed specialized attribute `bindings`.
- Removed specialized Capture syntax.
- Used Sinuous's normalizeArray in `map`, save bytes.

## 0.10.0 - 2019-06-30 - BREAKING CHANGES

### Changed

- Removed `classList` property handler, this can be done with a function.
- Removed specialized `events` property, HTM supports spread props.
- Removed initial execution of non observable event handlers so there is now no need for the extra closure. Fixes [#3](https://github.com/luwes/sinuous/issues/3)
- Removed Date, RegExp coercion This can be done in the view.

## 0.9.2 - 2019-06-29

### Changed

- Removed `named: true` in rollup config to fix `default` import.

## 0.9.1 - 2019-06-29

### Changed

- Optimized template insert action w/ Text.data
- Changed .mjs to .esm.js to fix submodule issue

## 0.9.0 - 2019-06-22

### Removed

- Removed support for the legacy [`observable` library](https://github.com/dominictarr/observable)
  It has some limitations:
  - Not possible to store a function because passing a function as argument of the observable setter acts as the `subscribe` function.
    Because of this every observable has its own `subscribe` function.
  - Needs extra cleanup logic

### Added

- First release
