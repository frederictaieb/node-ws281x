const argv = require('yargs').argv;
console.log('nled :', argv.n);
console.log('gpio :', argv.io);

const { LedStrip } = require('./led_lib');
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const ls = new LedStrip(argv.n, argv.io);
console.log (ls.countLed);

app.use(express.static(path.join(__dirname, 'public')));

app.get('',(req, res)=>{
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.get('/red',(req, res)=>{
        ls.fill(0xff0000);
})

app.get('/green',(req, res)=>{
        ls.fill(0x00ff00);
})

app.get('/blue',(req, res)=>{
        ls.fill(0x0000ff);
})

app.get('/white',(req, res)=>{
        ls.fill(0xffffff);
})

app.get('/golden',(req, res)=>{
        ls.fill(0xffd700);
})

app.get('/off',(req, res)=>{
        ls.fill(0x000000);
})


app.get('/colorWipe',(req, res)=>{
        ls.colorWipe();
})

/*
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
*/

app.listen(port, () => {
	console.log("Server running on port 3000");
});
