var util = require('util');

require('consoleplusplus');

var argsMap = {
	state: '1',
	label: '2',
	url: '3'
};
var renderText = function (text, renderArgs) {
	var args = (text.match(/\{\w+\}/g) || []).map(function (key) {
		return renderArgs[argsMap[key.substr(1, key.length - 2)]];
	});
	args.unshift(text.replace(/\{\w+\}/g, '%s'));
	return util.format.apply(this, args);
};

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
		var text = status.text || (status.url
			? '[{label} ({state})]({url}{state})'
			: '{label} ({state})');
		return [text, state, status[state], status.url];
	});
	ebookr.addRenderer('status', function (text, state, label, url) {
		if (ebookr.option.get('verbose')) {
			console.info(util.format('Rendering tag: status { state: %s, label: %s, url: %s }', state, label, url));
		}
		return renderText(text, arguments);
	});
};