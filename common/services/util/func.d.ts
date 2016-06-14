declare function isFunction(f: any): boolean;

declare function comp<T, U, V>(
  f: (...args: U[]) => V,
  g: (...args: T[]) => U
): (...args: T[]) => V;

declare function not(
  f: (...args: any[]) => any
): (...args: any[]) => boolean;

declare const _: Symbol;

declare function partialize<T>(f: (...args: any[]) => T, ...args: any[]): (...args: any[]) => T;
