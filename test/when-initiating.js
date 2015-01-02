var expect = require('chai').expect;

describe('When initiating', function () {
	var ebookr;

	beforeEach(function () {
		ebookr = require('ebookr').new();
		require('../lib/status')(ebookr);
	});

	it('should add parser', function () {
		expect(ebookr.tokens.status.parser).to.exist;
	});

	it('should add renderer', function () {
		expect(ebookr.tokens.status.renderer).to.exist;
	});
});