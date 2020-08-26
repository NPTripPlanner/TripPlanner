import Fuse from "fuse.js";
import ArraySort from 'array-sort';

export const SearchObjectsInCollection = (
  collection,
  keys = [],
  keyword,
  caseSensitive = false
) => {
  if (!collection || !collection.length || !keyword) return [];

  const fuse = new Fuse(collection, {
    keys: keys,
    includeScore: false,
    findAllMatches: true,
    isCaseSensitive: caseSensitive,
  });

  const result = fuse.search(keyword);
  return result.reduce((acc, value) => {
    acc.push(value.item);
    return acc;
  }, []);
};

export const SortArray = (array:Array<any>, objectPath:string)=>{
  const result = ArraySort(array, objectPath);
  return result;
}
