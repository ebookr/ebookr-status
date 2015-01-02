var expect = require('chai').expect;

describe('When supplying label', function () {
	var ebookr;

	beforeEach(function () {
		ebookr = require('ebookr').new();
		require('../lib/status')(ebookr);
		ebookr.metadata.set('status', {
			1: 'foo',
			url: 'http://test.com/#'
		});
	});

	it('should return rendered text', function () {
		expect(ebookr.parse('<status state="1" />').render()).to.equal('Status: [foo (1)](http://test.com/#1)');
	});
});