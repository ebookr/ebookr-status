var chai = require('chai'),
		sinonChai = require('sinon-chai'),
		expect = chai.expect,
		mockrequire = require('mockrequire'),
		sinon = require('sinon');

chai.use(sinonChai);

describe('When rendering', function () {
	var ebookr;

	beforeEach(function () {
		ebookr = require('ebookr').new();
		require('../lib/status')(ebookr);
		console.info = sinon.spy();
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
		expect(ebookr.parse('<status state="1" />\
			<status state="1" />\
			<status state="2" />').render()).to.equal('Status: foo (1)\
			Status: foo (1)\
			Status: bar (2)');
	});

	it('should support verbose mode', function () {
		ebookr.option.set('verbose', true);
		ebookr.parse('<status state="1" />').render();
		expect(console.info).to.have.been.calledWith('Rendering tag: status { state: 1, label: foo, url: undefined }');
	});
});