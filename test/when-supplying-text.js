var expect = require('chai').expect;

describe('When supplying text', function () {
	var ebookr;

	beforeEach(function () {
		ebookr = require('ebookr').new();
		require('../lib/status')(ebookr);
	});

	it('should return rendered text from metadata', function () {
		ebookr.metadata.set('status', {
			1: 'foo',
			text: 'test'
		});
		expect(ebookr.parse('<status state="1" />').render()).to.equal('test');
	});

	it('should return rendered text from tag-parameter', function () {
		ebookr.metadata.set('status', {
			1: 'foo'
		});
		expect(ebookr.parse('<status state="1">test {state}</status>').render()).to.equal('test 1');
	});
});