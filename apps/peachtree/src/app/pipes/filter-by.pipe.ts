import { Pipe, PipeTransform } from '@angular/core';

/**
 * TODO: Write description
 */
@Pipe({
  name: 'filterBy',
})
export class FilterByPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform(input: any, property: string, search: string = ''): any {
    if (!Array.isArray(input) || search === '') {
      return input;
    }
    search = search.toLowerCase().trim();

    const propertyLevels = property.split('.');
    const isNested = propertyLevels.length > 0;

    return input.filter((item) => {
      const itemValue = isNested
        ? this.getDeepValue(item, propertyLevels)
        : item[property];
      if (typeof itemValue === 'string') {
        return itemValue.toLowerCase().includes(search);
      }
      return false;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getDeepValue(item: any, propertyLevels: string[]): any {
    let itemValue = item;
    for (let i = 0; i < propertyLevels.length; i++) {
      if (itemValue[propertyLevels[i]] !== undefined) {
        itemValue = itemValue[propertyLevels[i]];
      } else {
        return undefined;
      }
    }
    return itemValue;
  }
}
