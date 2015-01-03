var util = require('util');

require('consoleplusplus');

module.exports = function (ebookr) {
	ebookr.addParser('status', function (state) {
		if (ebookr.option.get('verbose')) {
			console.info(util.format('Parsing tag: status { state: %s }', state));
		}
		var status = ebookr.metadata.get('status');
		if (!status) {
			throw new Error('No metadata given');
		}
		if (!status[state]) {
			throw new Error(util.format('Invalid state given: %s', state))
		}
		return [state, status[state], status.url];
	});
	ebookr.addRenderer('status', function (state, label, url) {
		if (ebookr.option.get('verbose')) {
			console.info(util.format('Rendering tag: status { state: %s, label: %s, url: %s }', state, label, url));
		}
		return util.format('Status: %s', url 
			? util.format('[%s (%s)](%s%s)', label, state, url, state) 
			: util.format('%s (%s)', label, state));
	});
};