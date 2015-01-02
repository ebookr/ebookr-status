var expect = require('chai').expect;

describe('When parsing', function () {
	var ebookr;

	beforeEach(function () {
		ebookr = require('ebookr').new();
		require('../lib/status')(ebookr);
	});

	describe('With metadata given', function () {
		beforeEach(function () {
			ebookr.metadata.set('status', {
				1: 'foo',
				2: 'bar'
			});
		});

		it('should let valid tags parse', function () {
			expect(function () {
				ebookr.parse('<status state="1" />');
				ebookr.parse('<status state="2" />');
			}).not.to.throw;
		});

		it('should throw error on invalid tags', function () {
			expect(function () {
				ebookr.parse('<status state="3" />');
			}).to.throw(/Invalid state given: 3/)
		});
	});

	describe('With no metadata given', function () {
		it('should throw error', function () {
			expect(function () {
				ebookr.parse('<status state="1" />');
			}).to.throw(/No metadata given/);
		});
	});
});