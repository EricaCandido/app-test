import { SortRequest } from './sort.models';

export function updateSortQueryParams<T extends SortRequest>(filters: T) {
  const sortRequestKeys: (keyof SortRequest)[] = ['sortBy', 'sortDirection'];

  const filtersObject: any = Object.entries(filters).reduce((objRes, [key, value]) => {
    if ((sortRequestKeys as string[]).includes(key)) {
      return objRes;
    }
    return { ...objRes, [key]: value };
  }, {});

  if (filters.sortBy && filters.sortDirection) {
    filtersObject['sort'] = `${filters.sortBy},${filters.sortDirection}`;
  }

  return filtersObject;
}
