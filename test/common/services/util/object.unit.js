'use strict';

const should = require('chai').should();
const object = require('../../../../common/services/util/object');

describe('Services', () => {
  describe('Util', () => {
    describe('Object', () => {
      describe('#cleanObj', () => {
        it('should return an object without null or undefined value', () => {
          object.cleanObj({ foo: 'bar', bar: null, baz: void 0 }).should.deep.equal({ foo: 'bar' });
        });

        it('should return a shallow copy of the given object', () => {
          object.cleanObj({ foo: 'bar' }).should.deep.equal({ foo: 'bar' });
        });
      });

      describe('#diffObj', () => {
        it('should work');
      });

      describe('#pick', () => {
        it('should return an object containing only the selected keys', () => {
          object.pick({ foo: 'bar', bar: 42, baz: 'qux' }, 'foo', 'bar').should.deep.equal({ foo: 'bar', bar: 42 });
        });

        it('should ignore the undefined values', () => {
          object.pick({ foo: 'bar' }, 'foo', 'bar').should.deep.equal({ foo: 'bar' });
        });

        it('should return an empty object', () => {
          object.pick({ foo: 'bar' }, 'bar').should.deep.equal({});
        });
      });

      describe('#select', () => {
        const s = object.select('foo', 'bar');

        it('should return a function', () => {
          s.should.be.a('function');
        });

        it('should return the result of a pick', () => {
          s({ foo: 'bar', bar: 42, baz: 'qux' }).should.deep.equal({ foo: 'bar', bar: 42 });
        });
      });

      describe('#omit', () => {
        it('should return an object containing only the not selected keys', () => {
          object.omit({ foo: 'bar', bar: 42, baz: 'qux' }, 'foo', 'bar').should.deep.equal({ baz: 'qux' });
        });

        it('should return a copy of the given object', () => {
          object.omit({ foo: 'bar' }, 'bar').should.deep.equal({ foo: 'bar' });
        });

        it('should return an empty object', () => {
          object.omit({ foo: 'bar' }, 'foo').should.deep.equal({});
        });
      });

      describe('#filter', () => {
        const obj = { foo: 'bar', bar: 'baz' };

        it('should work similarly to Array.prototype.filter but for objects', () => {
          object.filter(obj, ({ key, val }) => {
            switch (key) {
              case 'foo': val.should.equal('bar'); break;
              case 'bar': val.should.equal('baz'); break;
            }
            return val.includes('z');
          }).should.deep.equal({ bar: 'baz' });
        });

        it('should return an empty object', () => {
          object.filter(obj, () => false).should.deep.equal({});
        });

        it('should return a copy of the given object', () => {
          object.filter(obj, () => true).should.deep.equal(obj);
        });
      });

      describe('#map', () => {
        it('should work similarly to Array.prototype.map but for objects', () => {
          object.map({ foo: 12, bar: 42 }, ({ key, val }) => {
            switch (key) {
              case 'foo': val.should.equal(12); break;
              case 'bar': val.should.equal(42); break;
            }
            return { key, val: val + 2 };
          }).should.deep.equal({ foo: 14, bar: 44 });
        });

        it('should return an empty object', () => {
          object.map({}, () => {}).should.deep.equal({});
        });
      });

      describe('#get', () => {
        it('should return the required key', () => {
          object.get({ foo: 'bar' }, 'foo').should.equal('bar');
          object.get({ bar: [1, 2, 3] }, 'bar').should.deep.equal([1, 2, 3]);
        });

        it('should return undefined if key is not found', () => {
          should.not.exist(object.get({ foo: 'bar' }, 'bar'));
        });

        it('should return the last argument if key is not found', () => {
          object.get({ foo: 'bar' }, 'bar', 42).should.equal(42);
        });
      });
    });
  });
});
