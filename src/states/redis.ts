import { atom } from 'recoil';

const redisValueState = atom({
  key: 'redisValue',
  default: [],
});

export { redisValueState };
