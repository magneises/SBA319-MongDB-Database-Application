require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const users = require('./data/users');

// Express app
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the directory for views
app.set('views', __dirname + '/views'); 

// Custom Template Engine
// app.engine('custom', (filePath, options, callback) => {
//     fs.readFile(filePath, 'utf-8', (err, content) => {
//         if (err) return callback(err);

//         let rendered = content;

//         // Update this regex to handle spaces inside {{ }}
//         Object.keys(options).forEach((key) => {
//             const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g'); 
//             rendered = rendered.replace(regex, options[key]);
//         });

//         return callback(null, rendered);
//     });
// });

// Set views directory and use the custom template engine
// app.set('views', path.join(__dirname, 'views'));

// app.set('view engine', 'custom');

// Serve static files (Make sure styles.css is inside /styles)
app.use(express.static('styles'));
// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// API Routes
app.use('/api/userRoutes', userRoutes);

// Web Route to Render Users
app.get('/users', (req, res) => {
    let userList = users
        .map(user => `${user.name} - ${user.email} (${user.age} years old)`)
        // .join('');

    res.render('users', { 
        title: "User List", 
        description: "A dynamically generated list of users.",
        userList
    });
});


app.get('/', (req, res) => {
    console.log('hello im talking to you')

    let userList = users
    .map(user => `<li>${user.name} - ${user.email} (${user.age} years old)</li>`)
    .join('');

    res.render('index', { 
        title: "Hello World!",
        description: "A dynamically generated list of users.",
        userList: userList,
    });
});

// connect to database
mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
    // listen for requests 
    app.listen(process.env.PORT, () => {
        console.log(`connected to db and listening on port`, process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// // Start Server
// const PORT = process.env.PORT || 4040;
// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });

