'use strict';

const should = require('chai').should();
const array = require('../../../../common/services/util/array');

describe('Services', () => {
  describe('Util', () => {
    describe('Array', () => {
      describe('#takeWhile', () => {
        it('should return an array containing only the elements for which predicate(element) returns true, then stop the iteration', () => {
          array.takeWhile([1, 3, 5, 2, 7, 4, 6], (x) => x % 2 === 1).should.deep.equal([1, 3, 5]);
          array.takeWhile([1, 2, 3], (x) => typeof x === 'string').should.deep.equal([]);
          array.takeWhile([], (x) => x).should.deep.equal([]);
          array.takeWhile([1, 'foo', true, 0, 'bar', false], (x) => x).should.deep.equal([1, 'foo', true]);
        });
      });

      describe('#partition', () => {
        it('should return an array of arrays when the given array is populated and the length > 0', () => {
          array.partition([1, 2, 3, 4, 5, 6, 7, 8], 3).should.deep.equal([[1, 2, 3], [4, 5, 6], [7, 8]]);
          array.partition([1], 3).should.deep.equal([[1]]);
        });

        it('should return an empty array if the given array is empty', () => {
          array.partition([], 3).should.deep.equal([]);
        });

        it('should throw an error if the length is <= 0', () => {
          (() => array.partition([1], 0)).should.throw(/greater than 0/);
        });
      });

      describe('#repeat', () => {
        it('should return an empty array if the second argument is <= 0', () => {
          array.repeat('x', -42).should.deep.equal([]);
          array.repeat('x', 0).should.deep.equal([]);
        });

        it('should return an array of n times the given element', () => {
          array.repeat('x', 4).should.deep.equal(['x', 'x', 'x', 'x']);
          array.repeat([1, 2], 2).should.deep.equal([[1, 2], [1, 2]]);
        });
      });

      describe('#removeAtIndex', () => {
        const xs = [2, 3, 4];
        it('should return an array of length array.length - 1', () => {
          array.removeAtIndex(xs, 1).length.should.equal(xs.length - 1);
        });

        it('should return an array containing only the remaining elements', () => {
          array.removeAtIndex(xs, 0).should.deep.equal([3, 4]);
          array.removeAtIndex(xs, 1).should.deep.equal([2, 4]);
          array.removeAtIndex(xs, 2).should.deep.equal([2, 3]);
        });

        it('should throw an error if the index is out of bound', () => {
          (() => array.removeAtIndex(xs, 3)).should.throw(/out of bound/);
          (() => array.removeAtIndex(xs)).should.throw(/out of bound/);
        });
      });

      describe('#first', () => {
        it('should return only the first element of an array', () => {
          const xs1 = [2, 3, 4];
          const xs2 = ['foo', 'bar', 'baz'];

          should.not.exist(array.first([]));
          array.first(xs1).should.equal(2);
          array.first(xs2).should.equal('foo');
          array.first(xs2).should.not.equal('bar');
        });
      });
    });
  });
});
