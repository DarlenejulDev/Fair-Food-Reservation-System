const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');



app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use(bodyParser.urlencoded({ extended: true }));

//====HAD TO COMMENT out this route. If there are two similar routes, only the first one will be used.
// app.get('/', (req, res) => {
//     res.render('fairFoods.ejs');
// });

let orders = [];

app.get("/", (req, res) => {

    // {
        if (orders.length > 0) {
            let lastOrder = orders[orders.length - 1]
            console.log(lastOrder)
            
            /*====THE NAME of the property is the value that will be passed into the 
            EJS file, in this case, name and numberBag. The program breaks because 
            you are using fName inside of ejs, but there is no such property name in 
            the object, only a value.
            Also, in this case it would make more sense to me passing the whole array and using it inside of the EJS, for example { myOrders: orders }, and then using the values in the ejs file.
            */
            
            res.render("fairFoods.ejs", {


                name: orders[-1].fName,
                numberBag: orders[-1].numberBag
            })
        }
        else {
            res.render("fairFoods.ejs", {
                name: "",
                numberBag: ""
            })
        }
    // }

});

app.post('/order', (req, res) => {
    orders.push({
        "name": req.body.fName,//====ALTHOUGH quotes are fine for the properties, they are not needed here
        "numberBag": req.body.numberBag
    });
    console.log(orders);
    res.redirect('/');

});






app.listen(port, () => console.log(`Fair Foods app is listening on port ${port}!`));