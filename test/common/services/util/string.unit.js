'use strict';

const should = require('chai').should();
const string = require('../../../../common/services/util/string');

describe('Services', () => {
  describe('Util', () => {
    describe('String', () => {
      describe('#replaceLastOccurence', () => {
        it('should replace only the last occurence of a pattern', () => {
            string.replaceLastOccurence('foo foo foo', 'foo', 'bar').should.equal('foo foo bar');
        });

        it('should not change anything', () => {
            string.replaceLastOccurence('foo foo foo', 'bar', 'baz').should.equal('foo foo foo');
        });
      });

      describe('#capitalize', () => {
        it('should capitalize nicely', () => {
          string.capitalize('foobar').should.equal('Foobar');
          string.capitalize('is a foo foo, or a bar bar?').should.equal('Is a foo foo, or a bar bar?');
        });

        it('should return an empty string', () => {
          string.capitalize('').should.equal('');
        });
      });

      describe('#dashify', () => {
        it('should dashify properly', () => {
          const result = 'foo-bar-baz';
          string.dashify('foo-bar-baz').should.equal(result);
          string.dashify('foo_bar_baz').should.equal(result);
          string.dashify('fooBarBaz').should.equal(result);
          string.dashify('foo-bar_baz').should.equal(result);
          string.dashify('foo_barBaz').should.equal(result);
          string.dashify('foo   bar   Baz').should.equal(result);
        });

        it('should return an empty string', () => {
          string.dashify('').should.equal('');
        });
      });

      describe('#underscore', () => {
        it('should underscore gently', () => {
          const result = 'foo_bar_baz';
          string.underscore('foo-bar-baz').should.equal(result);
          string.underscore('foo_bar_baz').should.equal(result);
          string.underscore('fooBarBaz').should.equal(result);
          string.underscore('foo-bar_baz').should.equal(result);
          string.underscore('foo_barBaz').should.equal(result);
          string.underscore('foo   bar   Baz').should.equal(result);
        });

        it('should return an empty string', () => {
          string.underscore('').should.equal('');
        });
      });

      describe('#camelCase', () => {
        it('should camelCase wonderfully', () => {
          const result = 'fooBarBaz';
          string.camelCase('foo-bar-baz').should.equal(result);
          string.camelCase('foo_bar_baz').should.equal(result);
          string.camelCase('fooBarBaz').should.equal(result);
          string.camelCase('foo-bar_baz').should.equal(result);
          string.camelCase('foo_barBaz').should.equal(result);
          string.camelCase('foo   bar   Baz').should.equal(result);
        });

        it('should return an empty string', () => {
          string.camelCase('').should.equal('');
        });
      });


      describe('#upperCamelCase', () => {
        it('should upperCamelCase perfectly', () => {
          const result = 'FooBarBaz';
          string.upperCamelCase('foo-bar-baz').should.equal(result);
          string.upperCamelCase('foo_bar_baz').should.equal(result);
          string.upperCamelCase('fooBarBaz').should.equal(result);
          string.upperCamelCase('foo-bar_baz').should.equal(result);
          string.upperCamelCase('foo_barBaz').should.equal(result);
          string.upperCamelCase('foo   bar   Baz').should.equal(result);
        });

        it('should return an empty string', () => {
          string.upperCamelCase('').should.equal('');
        });
      });

      describe('#truncate', () => {
        it('should truncate a long text appending some cool suffix with default arguments', () => {
          string.truncate('such a long, long, long, long text').should.equal('such a lon...');
        });

        it('should truncate a long text appending some cool suffix with default suffi', () => {
          string.truncate('such a long, long, long, long text', 4).should.equal('such...');
        });

        it('should truncate a long text appending some cool suffix', () => {
          string.truncate('such a long, long, long, long text', 11, '!').should.equal('such a long!');
        });

        it('should not truncate a short text', () => {
          string.truncate('short, short!').should.equal('short, short!');
        });

        it('should return an empty string', () => {
          string.truncate('foobar', 0).should.equal('');
        });
      });

      describe('#parse', () => {
        it('should be able to decode URI components then json parse a string', () => {
          string.parse('%7B%22foo%22%3A%22bar%22%7D').should.deep.equal({ foo: 'bar' });
          string.parse('%5B1%2C2%2C3%5D').should.deep.equal([1, 2, 3]);
        });
      });
    });
  });
});
