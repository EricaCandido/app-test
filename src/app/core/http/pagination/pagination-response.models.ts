export interface PaginationMeta {
  totalPages: number; // Total pages
  totalElements: number; // Total elements
  size: number; // Items per page
  number: number; // Current page
}

export interface Pagination<T extends Array<unknown>> extends PaginationMeta {
  content: T;
}

