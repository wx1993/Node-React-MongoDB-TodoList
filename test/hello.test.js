var add = require('./../hello.js');
var expect = require('chai').expect;

describe('test for add function', function() {
  it('1 + 1 should be 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});