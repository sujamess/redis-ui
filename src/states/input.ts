import { atom } from 'recoil';

// A key pattern for filtering with a key e.g. products:*:*
const keyPatternInputState = atom({
  key: 'keyPattern',
  default: '',
});

// For filtering a data type e.g. string, set, hash
const dataTypeInputState = atom({
  key: 'dataType',
  default: '',
});

// Advance search for searching from a value
const advanceSearchFieldInputState = atom({
  key: 'advanceSearchField',
  default: ''
});

const advanceSearchValueInputState = atom({
  key: 'advanceSearchValue',
  default: ''
});

export { keyPatternInputState, dataTypeInputState, advanceSearchFieldInputState, advanceSearchValueInputState };
