import { api } from 'sinuous';
import { EMPTY_ARR } from './constants.js';

let recordedActions;

let oldInsert = api.insert;
api.insert = function(el, tag, a, b, c) {
  if (tag && tag.$t) {
    let current = '';
    const action = (element, value) => {
      oldInsert(element || el, value, null, current);
    };
    action._insert = true;
    action._tag = tag;
    action._el = el;
    recordedActions.push(action);
    return;
  }
  return oldInsert(el, tag, a, b, c);
};

let oldProperty = api.property;
api.property = function(name, tag, el, a, b) {
  if (tag && tag.$t) {
    const action = (element, value, key) => {
      oldProperty(name || key, value, element || el);
    };
    action._tag = tag;
    action._el = el;
    recordedActions.push(action);
    return;
  }
  return oldProperty(name, tag, el, a, b);
};

/**
 * Template tag.
 * @param  {string} key
 * @return {Function}
 */
export function t(key) {
  const tag = () => key;
  tag.$t = true;
  return tag;
}

/**
 * Observable template tag.
 * @param  {string} key
 * @return {Function}
 */
export function o(key) {
  const observedTag = t(key);
  observedTag._observable = true;
  return observedTag;
}


export function fill(elementRef) {
  return template(elementRef, true);
}

/**
 * Creates a template.
 * @param   {Function|string} elementRef
 * @param   {boolean} noclone
 * @return  {Function}
 */
export function template(elementRef, noclone) {
  recordedActions = [];

  const tpl =
    typeof elementRef === 'string'
      ? document.querySelector(elementRef)
      : elementRef();

  let fragment = tpl.content || (tpl.parentNode && tpl);
  if (!fragment) {
    fragment = document.createDocumentFragment();
    fragment.appendChild(tpl);
  }

  recordDataAttributes(fragment);

  if (!noclone) {
    recordedActions.forEach(action => {
      action._paths = [];
      let el = action._el;
      let parent;
      while ((parent = el.parentNode)) {
        action._paths.unshift(EMPTY_ARR.indexOf.call(parent.childNodes, el));
        el = parent;
      }
    });
  }

  const cloneActions = recordedActions;
  recordedActions = null;

  // Tiny indicator that this is a template clone function.
  clone.$t = true;

  function clone(props) {
    const el = noclone ? fragment : fragment.cloneNode(true);
    if (!props) return el;

    const keyedActions = {};

    // Set a custom property `props` for easy access to the passed argument.
    el.firstChild.props = props;

    for (let i = 0; i < cloneActions.length; i++) {
      let action = cloneActions[i];
      const paths = action._paths;
      let target;

      if (!noclone) {
        target = el;
        let j = 0;
        while (j < paths.length) {
          target = target.firstChild;
          const path = paths[j];
          let k = 0;
          while (k < path) {
            target = target.nextSibling;
            k += 1;
          }
          j += 1;
        }
      }

      const tag = action._tag;
      const key = tag();
      let elProps = props;

      const createAction = (prop, i, keys) => {
        const value = elProps[prop];
        if (value != null) {
          if (keys && action._insert && prop !== '_') {
            return;
          }
          action(target, value, prop);
        }

        if (tag._observable) {
          if (!keyedActions[key]) {
            observeProperty(elProps, prop, value, (keyedActions[key] = []));
          }
          keyedActions[key].push(action.bind(null, target));
        }
      };

      if (typeof props[key] === 'object') {
        elProps = props[key];
        Object.keys(elProps).forEach(createAction);
      } else {
        createAction(key);
      }
    }

    return el;
  }

  return clone;
}

function recordDataAttributes(fragment) {
  EMPTY_ARR.slice
    .call(fragment.querySelectorAll('[data-t],[data-o]'))
    .forEach((el, i) => {
      let tag = 't';
      let tagFn = t;
      if ('o' in el.dataset) {
        tag = 'o';
        tagFn = o;
      }
      if (el.dataset[tag]) {
        let tags = el.dataset[tag].split(' ');
        tags.forEach(id => {
          const [name, key] = id.split(':');
          if (key) {
            api.property(name, tagFn(key), el);
          } else {
            api.property(null, tagFn(name), el);
            api.insert(el, tagFn(name));
          }
        });
      } else {
        api.property(null, tagFn(i), el);
        api.insert(el, tagFn(i));
      }
    });
}

function observeProperty(props, key, value, actions) {
  Object.defineProperty(props, key, {
    get() {
      return value;
    },
    set(newValue) {
      value = newValue;
      actions.forEach(action => action(newValue, key));
    }
  });
}
