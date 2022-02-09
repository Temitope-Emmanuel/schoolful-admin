const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT  || 3000;
const publicPath = path.join(__dirname, '..', 'public');

console.log({publicPath})
app.use(express.static(publicPath))
app.get('*', (req,res) => res.sendFile(path.join(publicPath, 'index.html')));

app.listen(PORT,() => console.log(`listening on PORT ${PORT}`));