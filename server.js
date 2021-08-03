const express = require('express');

const app = express();

const qr = require("qrcode");

app.use(express.urlencoded());
app.use(express.json());


let cupons = [
    {
        id: 1,
        recipient: 'Anže Dragar', 
        issueDate: new Date(2020, 11, 17),
        usageDate: null,
        numberOfUnits: 1
    },
    {
        id: 2,
        recipient: 'Janez Novak', 
        issueDate: new Date(2020, 11, 17),
        usageDate: null,
        numberOfUnits: 5
    },
    {
        id: 3,
        recipient: 'Brigita Erjavec', 
        issueDate: new Date(2020, 11, 17),
        usageDate: null,
        numberOfUnits: 3
    },
    {
        id: 4,
        recipient: 'Urban Petrič', 
        issueDate: new Date(2020, 11, 17),
        usageDate: new Date(2021, 1, 12),
        numberOfUnits: 7
    }
];

app.post('/api/cupons/add', (req,res) => {
    let cupon = {
        recipient: req.body.recipient, 
        issueDate: req.body.issueDate,
        numberOfUnits: req.body.numberOfUnits,
        usageDate: null
    }

    let idArray = cupons.map(i => i.id);
    let maxId = Math.max.apply(null, idArray);

    cupon.id = maxId + 1;

    cupons.push(cupon);

    let url = `http://localhost:5000/api/cupon/view/${cupon.id}`;
    qr.toDataURL(url, (err, src) => {
        if(err) res.send("Error occured");

        res.send(src);
    });
});

app.get('/api/cupons/view/:id', (req,res) => {
    let cupon = cupons.filter(i => i.id == req.params.id)[0];

    let url = `http://localhost:5000/api/cupon/view/${cupon.id}`;
    qr.toDataURL(url, (err, src) => {
        if(err) res.send("Error occured");

        res.json({qrCode: src, cupon});
    });

});

app.get('/api/cupons', (req, res) => {
    res.json(cupons);
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));