export interface MutationResponse<T> {
  loading: boolean;
  errors: string[]; // TODO: can use union type probably
  data: T;
}
