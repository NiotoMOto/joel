'use strict';

const should = require('chai').should();
const func = require('../../../../common/services/util/func');
const { _ } = func;

describe('Services', () => {
  describe('Util', () => {
    describe('Func', () => {
      describe('#isFunction', () => {
        it('should return true when argument is a function', () => {
          func.isFunction(() => {}).should.be.true;
          func.isFunction(new Function()).should.be.true;
          func.isFunction(function() {}).should.be.true;
        });

        it('should return false when argument is not function', () => {
          func.isFunction('').should.be.false;
          func.isFunction({}).should.be.false;
          func.isFunction([]).should.be.false;
          func.isFunction(0).should.be.false;
          func.isFunction().should.be.false;
        });
      });

      describe('#comp', () => {
        const f = (x) => x + 2;
        const g = (x) => x / 2;
        const c = func.comp(f, g);

        it('should return a function', () => {
          c.should.be.a('function');
        });

        it('should return the result of f and g composition', () => {
          c(10).should.equal(7);
          func.comp(g, f)(10).should.equal(6);
        });
      });

      describe('#not', () => {
        const f = () => true;
        const n = func.not(f);

        it('should return a function', () => {
          n.should.be.a('function');
        });

        it('should negate the value returned by f', () => {
          n().should.equal(false);
        });
      });

      describe('#partialize', () => {
        const calc = (x, y, z) => x + y / z;
        const result = calc(2, 3, 6); // 2.5;
        const p = func.partialize(calc, _, 3, _);

        it('should return a function', () => {
          p.should.be.a('function');
        });

        it('should correctly replace the arguments', () => {
          p(2, 6).should.equal(result);
        });

        it('should allow deep partialization', () => {
          func.partialize(p, _, 6)(2).should.equal(result);
        });
      });
    });
  });
});
