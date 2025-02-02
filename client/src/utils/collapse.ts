import {
  NumberOptions,
  StringOptions,
} from '@/types/fireworks';
import {
  getRandomArrayItem,
  getRandomInRange,
} from './math';

export function shallowCollapseNum(value: NumberOptions): NumberOptions {
  // If value's already a single number, return it
  if (typeof value === 'number') return value;

  // If value's a range (has min and max properties),
  // return a random number within the range
  if ('min' in value && 'max' in value) {
    return getRandomInRange({
      min: value.min,
      max: value.max,
    });
  }

  // If the value's an array, return a random item from array
  // without collapsing it (in contrast to standard collapseNum())
  if (Array.isArray(value)) {
    return getRandomArrayItem(value) as NumberOptions;
  }

  throw new Error(`Bad value argument in shallowCollapseNum: ${JSON.stringify(value)}`);
}

export function collapseNum(value: NumberOptions): number {
  // If value's already a single number, return it
  if (typeof value === 'number') return value;

  // If value's a range (has min and max properties),
  // return a random number within the range
  if ('min' in value && 'max' in value) {
    return getRandomInRange({
      min: value.min,
      max: value.max,
    });
  }

  // If the value's an array, get a random item from array
  // and return its collapsed value. This allows arrays of
  // numbers and arrays of ranges to be collapsed
  if (Array.isArray(value)) {
    return collapseNum(getRandomArrayItem(value) as NumberOptions);
  }

  throw new Error(`Bad value argument in collapseNum: ${JSON.stringify(value)}`);
}

export function shallowCollapseString(value: StringOptions): StringOptions {
  // If value's already a single number, return it
  if (typeof value === 'string') return value;

  // If the value's an array, return a random item from array
  // without collapsing it (in contrast to standard collapseString())
  if (Array.isArray(value)) {
    return getRandomArrayItem(value) as StringOptions;
  }

  throw new Error(`Bad value argument in shallowCollapseString: ${JSON.stringify(value)}`);
}

export function collapseString(value: StringOptions): string {
  // If value's already a single number, return it
  if (typeof value === 'string') return value;

  // If the value's an array, get a random item from array
  // and return its collapsed value. This allows arrays of
  // numbers and arrays of ranges to be collapsed
  if (Array.isArray(value)) {
    return collapseString(getRandomArrayItem(value) as StringOptions);
  }

  throw new Error(`Bad value argument in collapseString: ${JSON.stringify(value)}`);
}