function enlightStrip(nb_leds, color) {
	console.log('Enlight Strip...');
	
	const ws281x = require('rpi-ws281x-native');

	const channel = ws281x(nb_leds, { stripType: 'ws2812' });

	const colorsArray = channel.array;
	for (let i = 0; i < channel.count; i++) {
		colorsArray[i] = color;
	}

	ws281x.render();
}

enlightStrip(30, 0xffffff);

