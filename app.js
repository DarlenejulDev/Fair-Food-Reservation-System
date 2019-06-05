const express= require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');



app.use('/css',express.static('css'));
app.use('/js',express.static('js'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
res.render('fairFoods.ejs');
});

let orders = [];

app.get("/",(req,res)=>{

    {
        if(orders.length>0){
            let lastOrder = orders[orders.length-1]
            console.log(lastOrder)
            res.render("fairFoods.ejs",{
                name:orders[-1].fName,
                numberBag:orders[-1].numberBag
            })
    }
    else {
        res.render("fairFoods.ejs", {
            name:"",
            numberBag: ""
        })
    }
}

});

app.post('/order',(req,res)=>{
        orders.push({
            "name": req.body.fName,
            "numberBag": req.body.numberBag 
        });
        console.log(orders);
        res.redirect('/');

      });



      


app.listen(port, () => console.log(`Fair Foods app is listening on port ${port}!`));