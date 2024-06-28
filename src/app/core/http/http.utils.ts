export function updateQueryParams(filters: any) {
  const filtersObject: any = Object.entries(filters).reduce((objRes, [key, value]) => {
    if (typeof value === 'undefined' || value === null) {
      return objRes;
    }
    return { ...objRes, [key]: value };
  }, {});

  return filtersObject;
}
