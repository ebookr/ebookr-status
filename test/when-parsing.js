var chai = require('chai'),
		sinonChai = require('sinon-chai'),
		expect = chai.expect,
		mockrequire = require('mockrequire'),
		sinon = require('sinon');

chai.use(sinonChai);

describe('When parsing', function () {
	var ebookr, console;

	beforeEach(function () {
		ebookr = require('ebookr').new();
		console = { info: sinon.spy() };
		mockrequire('../lib/status', {
			'consoleplusplus': console,
			'util': require('util')
		})(ebookr);
	});

	describe('With metadata given', function () {
		beforeEach(function () {
			ebookr.metadata.set('status', {
				0: 'foo',
				1: 'bar'
			});
		});

		it('should let valid tags parse', function () {
			expect(function () {
				ebookr.parse('<status state="0" />');
				ebookr.parse('<status state="0" />');
				ebookr.parse('<status state="1" />');
			}).not.to.throw();
		});

		it('should throw error on invalid tags', function () {
			expect(function () {
				ebookr.parse('<status state="2" />');
			}).to.throw(/Invalid state given: 2/)
		});

		it('should support verbose mode', function () {
			console.log
			ebookr.option.set('verbose', true);
			ebookr.parse('<status state="1" />');
			expect(console.info).to.have.been.calledWith('Parsing tag: status { state: 1 }');
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