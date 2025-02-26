/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { MINI } from './constants.js';
import { build, evaluate } from './build.js';

const getCacheMap = statics => {
  let tpl = CACHE.get(statics);
  if (!tpl) {
    CACHE.set(statics, (tpl = build(statics)));
  }
  return tpl;
};

const getCacheKeyed = statics => {
  let key = '';
  for (let i = 0; i < statics.length; i++) {
    key += statics[i].length + '-' + statics[i];
  }
  return CACHE[key] || (CACHE[key] = build(statics));
};

const USE_MAP = !MINI && typeof Map === 'function';
const CACHE = USE_MAP ? new Map() : {};
const getCache = USE_MAP ? getCacheMap : getCacheKeyed;

const cached = function(statics) {
  const children = evaluate(this, getCache(statics), arguments, []);
  const result = children.length > 1 ? children : children[0];
  if (result) {
    return Array.isArray(result)
      ? this(result)
      : typeof result === 'object'
      ? result
      : this([result]);
  }
};

export default MINI ? build : cached;
