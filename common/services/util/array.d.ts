import { Predicate2 } from "../../../definitions/common";

/**
 * Prend un argument et retourne un tableau
 * Si l'argument est un tableau, aucune modification n'est effectuée
 */
declare function wrap<T, U extends T>(obj: T): U[];

declare function uniq(xs: any[]): any[];

declare function takeWhile<T>(xs: T[], pred: Predicate2<string>): T[];

declare function partition<T>(xs: T[], length: number): T[][];

declare function repeat<T>(x: T, n: number): T[];

declare function removeAtIndex<T>(xs: T[], index: number): T[];

declare function first<T>(xs: T[]): T;
