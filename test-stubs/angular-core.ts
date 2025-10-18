// Minimal Angular core stubs for isolated business logic tests.
export function Component(opts?: any) {
  return function (target: any) {
    target.__component = opts;
  };
}
export function Injectable(opts?: any) {
  return function (target: any) {
    target.__injectable = opts;
  };
}
export const ChangeDetectionStrategy = { OnPush: 'OnPush' } as any;
export const NO_ERRORS_SCHEMA = {};
export interface OnInit { ngOnInit(): void; }
export function inject(token: any) { return token instanceof Function ? new token() : token; }
export function signal(initial: any) {
  let value = initial;
  const reader: any = () => value;
  reader.set = (next: any) => { value = next; };
  return reader;
}
