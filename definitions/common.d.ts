export type ObjectKey = string | number | Symbol;

export interface ObjectEntry<T> {
  key: ObjectKey;
  val: T;
}

export type Predicate = <T>(x: T) => boolean;

export type Predicate2<T> = <U>(x: U, y: T) => boolean;
