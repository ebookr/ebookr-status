var util = require('util');

module.exports = function (ebookr) {
	ebookr.addParser('status', function (state) {
		var status = ebookr.metadata.get('status');
		if (!status) {
			throw new Error('No metadata given');
		}
		if (!status[state]) {
			throw new Error(util.format('Invalid state given: %s', state))
		}
		return [state, status[state], status.url];
	});
	ebookr.addRenderer('status', function (state, stateText, url) {
		return util.format('Status: %s', url 
			? util.format('<a href="%s%s">%s (%s)</a>', url, state, stateText, state) 
			: util.format('%s (%s)', stateText, state));
	});
};