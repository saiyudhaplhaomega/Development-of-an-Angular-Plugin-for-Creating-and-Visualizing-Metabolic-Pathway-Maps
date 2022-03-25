import {DataItem} from '../objects/data-item';

export function dataNodeIdGenerator(dataMap: Map<string, DataItem>): string {

  let lowestAvailableKey = 1;

  if (dataMap) {
    while (dataMap.has(lowestAvailableKey.toString())) {
      lowestAvailableKey++;
    }
  }

  return lowestAvailableKey.toString();
}
