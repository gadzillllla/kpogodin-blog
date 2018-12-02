export const sortObjByKey = (arr, key) => {
  return arr.sort((a, b) => {
    if (a[key] < b[key]) return 1;
    if (a[key] > b[key]) return -1;
    return 0;
  });
};

export const stringToTags = str => {
  if (str === '') return [];
  return str.split(',').map(elem => {
    if (elem[0] === ' ') return elem.slice(1).toUpperCase();
    return elem.toUpperCase();
  });
};

export const filterPostByTags = (arr, tag) => {
  const upperTag = tag.toUpperCase();
  return tag === '' ? arr : arr.filter(elem => stringToTags(elem.tags).indexOf(upperTag) !== -1);
};
