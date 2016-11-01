import _ from 'lodash';

export function subsampleObject(obj, count) {
  const objSize = _.size(obj);
  const objKeys = Object.keys(obj);

  let result = {};

  while (_.size(result) < count) {
    const id = _.random(objSize);
    const key = objKeys[id];

    if (key in result)
      continue;

    result[key] = obj[key];
  }

  return result;
}
