const express=require('express');
var curd=require('./crud_operations');
const bodyParser=require('body-parser');
const app=express();
// to create app we need to call express() function 
const port=process.env.PORT || 3000;

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended:false }));
app.use(bodyParser.json());

// this is used to set the view engine
app.set('view engine', 'ejs');


app.get('/',(req,res)=>{
    // res.sendFile('D:/Visual_Studio_Code/NodeJs/Node_WebApp/src/views/home.html');   
    // res.sendFile is used to send html files.
    // res.render is used to send ejs files with data also.
    // res.send is used to send string as response
    res.render('home')
})

app.get('/addUser',(req,res)=>{
    // res.sendFile('D:/Visual_Studio_Code/NodeJs/Node_WebApp/src/views/form.html');
    // res.sendFile('./views/form.html');
    res.render('addUser');
})

app.post('/addUser',curd.add)

app.get('/UserList', curd.retrieve)

app.get('/Delete/:id', curd.delete)

app.get('/updatepage',curd.Singleretrieve)
     
   

app.post('/update/:id',curd.update);

app.listen(port,()=>{console.log(`Example app listening on port ${port}!`)})