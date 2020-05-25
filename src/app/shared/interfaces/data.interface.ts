export interface MutationResponse<T> {
  loading: boolean;
  errors: string[]; // TODO: can use union type probably
  data: T;
}

export interface WatchQueryResponse<T> {
  loading: boolean;
  errors?: string[];
  data?: T;
}
