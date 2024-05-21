const ws281x = require('rpi-ws281x-native');

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

class LedStrip {
	constructor(n, io) { 
	  this._options = {
	    dma: 10,
	    freq: 800000,
	    gpio: io,
	    invert: false,
	    brightness: 255,
	    stripType: ws281x.stripType.WS2812
	  };
	  this._countLed = n;
	  this._channel = ws281x(this._countLed, this._options);
	  this._strip = this._channel.array;  
	}

	get io() {
	  return this._options.gpio;
	}

	get countLed() {
	  return this._countLed;
	}

	
    	async fill(color = 0xffffff) {
          for (let i = 0; i < this._countLed; i++) {
            this._strip[i] = color;
          }
	
	  if (ws281x.isStub) {
            console.error("ws281x is not initialized.");
            return;
          }
	  await sleep(100);	
          ws281x.render(); 
    	}
	
	async colorWipe(color=0xffffff, wait=50) {
	  for (let i = 0; i < this._countLed; i++)  {
	    this._strip[i] = color;
	    ws281x.render();
	    await sleep(wait);
	  }
	}
}

module.exports = { LedStrip };	


/*const options = {
  dma: 10,
  freq: 800000,
  gpio: 18,
  invert: false,
  brightness: 255,
  stripType: ws281x.stripType.WS2812
};

const countLed = 90;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

const fill = async (color=0xffffff) => {
        console.log('Fill...');
        channel = ws281x(countLed, options)
        strip = channel.array; 
        for (let i = 0; i < countLed; i++) {
	  strip[i] = color;
	}
        ws281x.render();         
}



const colorWipe = async (color=0xffffff, wait=50) => {
    channel = ws281x(countLed, options)
    strip = channel.array; 
    for (let i = 0; i < countLed; i++) {
        strip[i] = color;
        ws281x.render() 
	await sleep(wait)
    }
}

const theaterChase = async (color=0xffffff, wait=50, iterations=10) => {
    channel = ws281x(countLed, options)
    strip = channel.array; 
    for (let j = 0; j < iterations; j++) {
        for (let q = 0; q < 3; q++) {
            for (let i = 0; i < countLed; i += 3) {
                strip[i+q] = color;
           }
            ws281x.render() 
            await sleep(wait)

            for (let i = 0; i < countLed; i += 3) {
                strip[i + q] = 0x000000;
            }
        }
    }
}

function wheel(pos) {
    pos = 255 - pos;
    if (pos < 85) {
        return [255 - pos * 3, 0, pos * 3];
    } else if (pos < 170) {
        pos -= 85;
        return [0, pos * 3, 255 - pos * 3];
    } else {
        pos -= 170;
        return [pos * 3, 255 - pos * 3, 0];
    }
}

const rainbow = async (wait=20, iterations=1) => {
    // Dessine un arc-en-ciel qui se fond sur tous les pixels à la fois.
    channel = ws281x(countLed, options)
    strip = channel.array; 
    for (let j = 0; j < 256 * iterations; j++) {
        for (let i = 0; i < countLed; i++) {
	    const color = wheel((i * 256 / countLed) & 255); 
            strip[i] = (color[0] << 16) | (color[1] << 8) | color[2]; 
	}
        ws281x.render();
        await sleep(wait); // Attend en millisecondes
    }
}

const rainbowCycle = async (wait=20, iterations=5) => {
    // Dessine un arc-en-ciel qui se fond sur tous les pixels    la fois.
    channel = ws281x(countLed, options)
    strip = channel.array; 
    for (let j = 0; j < 256 * iterations; j++) {
        for (let i = 0; i < countLed; i++) { 
            const color = wheel((i * 256 / countLed + j) & 255) 
            strip[i] = (color[0] << 16) | (color[1] << 8) | color[2]; 
        } 
        ws281x.render();
        await sleep(wait); // Attend en millisecondes
    }
}

const theaterChaseRainbow = async (wait=50) => {
    // Dessine un arc-en-ciel qui se fond sur tous les pixels    la fois.
    channel = ws281x(countLed, options)
    strip = channel.array; 

    for (let j = 0; j < 256; j++) {
	for (let q = 0;  q<3; q++) {
	    for (let i = 0; i < countLed; i+=3) { 
            	const color = wheel((i+j) & 255) 
            	strip[i+q] = (color[0] << 16) | (color[1] << 8) | color[2]; 
            } 
            ws281x.render();
            await sleep(wait); // Attend en millisecondes
            for (let i = 0; i >countLed; i+=3) {
              strip[i+q] =0x000000
            }
	}
    }
}

module.exports = { fill, colorWipe, theaterChase, rainbow, rainbowCycle, theaterChaseRainbow };
*/
