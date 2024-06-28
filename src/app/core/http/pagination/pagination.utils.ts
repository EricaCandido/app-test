import { PaginationRequest } from '../../http';

export function updatePaginationQueryParams<T extends PaginationRequest>(
  filters: T
) {
  const sortRequestKeys: (keyof PaginationRequest)[] = ['page'];

  const filtersObject: any = Object.entries(filters).reduce(
    (objRes, [key, value]) => {
      if (
        (sortRequestKeys as string[]).includes(key) &&
        Number.isInteger(value)
      ) {
        return { ...objRes, [key]: value - 1 };
      }
      return { ...objRes, [key]: value };
    },
    {}
  );

  return filtersObject;
}
