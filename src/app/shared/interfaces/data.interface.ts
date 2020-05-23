export interface MutationResponse<T> {
  loading: boolean;
  error: string; // TODO: can use union type probably
  data: T;
}
