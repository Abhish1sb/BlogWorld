// // including express 
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const app = express();
const Blog = require('./models/blog');

// // Connect to mongoDb
const dbURI = "mongodb+srv://admin:adminASB1@blogworld.zciemfa.mongodb.net/blogworldDB?retryWrites=true&w=majority"
// // well use mongoose to connect and interact with the database 
mongoose.connect(dbURI)
    .then((res) => {
        console.log('Connected to DB');
    })
    .catch((error) => {
        console.log(error);
    })


// // Set the view engine to Ejs and youre good to go 
app.set('view engine', 'ejs');



app.listen(3000, () => {
    console.log('Listening to port 3000')
})


// // // middle aware number1
// app.use((req,res,next)=>{
//     console.log('New Request Made');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('method: ',req.method);
//     next();
// })

// // // middleaware number 2
// app.use((req,res,next)=>{
//     console.log("In the next middleAware")
//     next();
// })
// // // Third party middle awares :]
// // there middleawares for sessions cookies validators, etc that we can use 

// // // Morgan A 3rd party middleaware 
// // instead of creating a middleaware from sratch y not use a thing thats predefined 
// instead of making function we can use the predefined methods or funtion like in the morgan docs we can use 'tiny','dev'
app.use(express.static('public'));
app.use(morgan('dev'));


// // if you have different folder with the ejs file to render rather than views 
// use==>
// app.set('views','YOUR_VIEWS_FOLDER_NAME')


// // // This is a method to add the blogs in the db :]
// // // Saving a new blog
// app.get('/add-blog',(req,res)=>{
//     const blog=new Blog({
//         title:'new blog 2 ',
//         snippet:'About my new blog 2',
//         body:'More about my new blog 2'
//     });
//     blog.save()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })

// // // Once some data is stored in the Db we can retrieve data from db using certain methods :]
// //  //  Seeing all the data in database 
// app.get('/all-blogs',(req,res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })
// // //  getting single blog from the data by id number 
// app.get('/single-blog',(req,res)=>{
//     Blog.findById('6352c0188e8c3d5b03bb4c19')
//         .then((result)=>{
//             res.send(result)
//         })
//         .catch((err)=>{
//             console.log(err);
//         })
// })



app.get('/', (req, res) => {
    res.redirect('/blogs');
})
app.get('/about', (req, res) => {
    res.render('about', { title: 'About' })
})

app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result })
        })
        .catch((err) => {
            console.log(err);
        })
})
app.get('/blogs-create', (req, res) => {
    res.render('create', { title: 'Create new blog' })
})


// // this is just like a middle aware this will get executed when there is no route which matches with the get requests above 
app.use((req, res) => {
    res.status(404).render('404', { title: '404' })
})