var expect = require('chai').expect;

describe('When rendering', function () {
	var ebookr;

	beforeEach(function () {
		ebookr = require('ebookr').new();
		require('../lib/status')(ebookr);
		ebookr.metadata.set('status', {
			1: 'foo',
			2: 'bar'
		});
	});

	it('should return rendered text', function () {
		expect(ebookr.parse('<status state="1" />').render()).to.equal('Status: foo (1)');
		expect(ebookr.parse('<status state="2" />').render()).to.equal('Status: bar (2)');
	});

	it('should support multiple tags', function () {
		expect(ebookr.parse('<status state="1" /> <status state="1" />').render()).to.equal('Status: foo (1) Status: foo (1)');
	});
});