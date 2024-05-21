const argv = require('yargs').argv;
console.log('nled :', argv.nled);
console.log('gpio :', argv.gpio);

const { fill, colorWipe, theaterChase, rainbow, rainbowCycle, theaterChaseRainbow } = require('./led_lib');

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

const express = require('express');
const app = express();

app.get('',(req, res)=>{
	res.sendFile(__dirname+("/index.html"));
})

app.get('/red',(req, res)=>{
        fill(nled, gpio, 0xff0000);
})

app.get('/colorWipe',(req, res)=>{
        colorWipe(nled, gpio);
})

app.get('/theaterChase',(req, res)=>{
        theaterChase(nled, gpio);
})

app.get('/rainbow',(req, res)=>{
        rainbow(nled, gpio);
})

app.get('/rainbowCycle',(req, res)=>{
        rainbowCycle(nled, gpio);
})

app.get('/theaterChaseRainbow',(req, res)=>{
        theaterChaseRainbow(nled, gpio);
})

app.get('/green',(req, res)=>{
	fill(nled, gpio, 0x00ff00);
})

app.get('/blue',(req, res)=>{
        fill(nled, gpio, 0x0000ff);
})

app.get('/white',(req, res)=>{
        fill(nled, gpio, 0xffffff);
})

app.get('/golden',(req, res)=>{
        fill(nled, gpio, 0xffd700);
})

app.get('/off',(req, res)=>{
        fill(nled, gpio, 0x000000);
})



app.listen(3000, () => {
	console.log("Server running on port 3000");
});
