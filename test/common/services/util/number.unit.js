'use strict';

const should = require('chai').should();
const number = require('../../../../common/services/util/number');

describe('Services', () => {
  describe('Util', () => {
    describe('Number', () => {
      describe('#isNumber', () => {
        it('should return true if the given argument is a number', () => {
          number.isNumber(1).should.be.true;
          number.isNumber(-1).should.be.true;
          number.isNumber(NaN).should.be.true;
          number.isNumber(Infinity).should.be.true;
          number.isNumber(new Number(42)).should.be.true;
        });

        it('should return false if the given argument is a number', () => {
          number.isNumber('').should.be.false;
          number.isNumber([]).should.be.false;
          number.isNumber({}).should.be.false;
          number.isNumber(() => {}).should.be.false;
          number.isNumber(true).should.be.false;
        });
      });

      describe('#range', () => {
        it('should return an array containing an array from 0 to (and not including) n', () => {
          number.range(5).should.deep.equal([0, 1, 2, 3, 4]);
        });

        it('should return an array of length n', () => {
          number.range(42).length.should.equal(42);
        });

        it('should return an empty array if n is <= 0', () => {
          number.range(0).should.deep.equal([]);
          number.range(-42).should.deep.equal([]);
        });

        it('should return an array containing numbers from x to (and not including) y', () => {
          number.range(3, 8).should.deep.equal([3, 4, 5, 6, 7]);
          number.range(-2, 3).should.deep.equal([-2, -1, 0, 1, 2]);
        });

        it('should return an empty array if y <= x', () => {
          number.range(8, 3).should.deep.equal([]);
          number.range(8, 8).should.deep.equal([]);
        });

        it('should return an array containing numbers from x to (and not including) y with a defined step', () => {
          number.range(0, 10, 2).should.deep.equal([0, 2, 4, 6, 8]);
          number.range(-5, 5, 2).should.deep.equal([-5, -3, -1, 1, 3]);
        });

        it('should throw an error if the step == 0', () => {
          (() => number.range(-5, 5, 0)).should.throw(/infinite loop/);
        });
      });
    });
  });
});
