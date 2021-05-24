const express = require('express')
const mongoose = require('mongoose')
const shortUrl = require('./models/shorlUrl')

const app = express()

//connecting to mongodb
const dburl = 'mongodb+srv://helpvu:help1234@cluster0.dfauh.mongodb.net/url_shortner?retryWrites=true&w=majority';
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('DB connected successfully...'))
    .catch((err) => console.log(err));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')

app.get('/', async(req,res)=>{
    const shortUrls = await shortUrl.find();
    res.render('index',{shortUrls:shortUrls})
})

app.post('/shorturl',async(req,res)=>{
   await shortUrl.create({full:req.body.fullurl})
   res.redirect('/')
})

app.get('/login', (req,res)=>{
    res.render('login.ejs')
})

app.get('/:shorturl',async(req,res)=>{
    const Url = await shortUrl.findOne({short: req.params.shorturl})
    if(Url == null){
        res.send('<h1>Error 404! Page not Found</h1>')
    }
    Url.click++;
    Url.save();
    res.redirect(Url.full)
})



app.listen(80,console.log(`The server is running at http://127.0.0.1:80`));