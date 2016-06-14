import { ObjectKey, ObjectEntry } from "../../../definitions/common";

declare function isPlainObject(obj: Object): boolean;

declare function cleanObj(obj: Object): Object;

declare function pick(obj: Object, ...keys: string[]): Object;

declare function select(...keys: string[]): (obj: Object) => void;

declare function omit(obj: Object, ...keys: string[]): Object;

declare function filter(
  obj: Object,
  f: (entry: ObjectEntry<any>) => boolean
): Object;

declare function map(
  obj: Object,
  f: (entry: ObjectEntry<any>) => ObjectEntry<any>
): Object;

declare function iter(obj: Object): Iterable<any>;

/**
  * Une fonction permettant de grouper les éléments d'un objet en fonction de leurs attributs
  * // Pour:
  * const obj = { x: { foo: 'bar' }, y: { foo: 'bar' }, z: { foo: 'baz' } };
  * groupBy(obj, 'foo');
  * // retourne {
  * //   bar: [{ foo: 'bar' }, { foo: 'bar' }],
  * //   baz: [{ foo: 'baz' }]
  * // }
  * groupBy(obj, 'foo', ({ key, val }) => Object.assign({}, val, { key }));
  * // retourne {
  * //   bar: [{ foo: 'bar, key: 'x'}, { foo: 'bar', key: 'y' }],
  * //   baz: [{ foo: 'baz', key: 'z' }]
  * // }
  */
declare function groupBy(
  obj: Object,
  groupKey: string,
  cb?: (entry: ObjectEntry<any>) => any
): Object;

declare function get(obj: any, key: ObjectKey, notFound: any): any;
