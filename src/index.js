import { get, isFunction, isString, mapValues } from 'lodash';

export function applyMapping(mapping, obj) {
  return mapValues(mapping, (mapper) => {
    if (isString(mapper)) {
      return get(obj, mapper);
    }

    const path = get(mapper, 'path');
    if (isString(path)) {
      const val = path === '.' ? obj : get(obj, path);

      const transform = get(mapper, 'transform');
      if (isFunction(transform)) {
        return transform(val, obj);
      }

      return val;
    }
  });
}

export function createMapper(mapping) {
  return (object) => {
    return applyMapping(mapping, object);
  };
}