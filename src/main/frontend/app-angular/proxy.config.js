const PROXY_CONFIG = [
	{
		context: ['/api'],
		target: 'https://app-palpiteiro.herokuapp.com/',
		secure: false
	}
];

module.exports = PROXY_CONFIG;