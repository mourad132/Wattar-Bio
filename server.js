const express = require('express');
const mongoose = require('mongoose')
const app = express();
const Absent = require('./models/absent');
const moment = require('moment');
const bodyParser = require('body-parser');
const Profile = require('./models/Profile');

moment.locale();
mongoose.connect('mongodb+srv://mourad132:Momo2005@wattar.av6vv.mongodb.net/Wattar?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('landing');
});

app.get('/absent', (req, res) => {
    Profile.find({}, (err, names) => {
        if(err){
            throw err
        } else {
            res.render('absent', { names });
        }
    })
});

app.post('/absent', (req, res) => {
    Absent.create({
        ...req.body,
        Date: moment().format('MMMM Do YYYY')
    }, (err, found) => {
        if(err){
            throw err
        } else {
            res.redirect('/reports ')
        }
    })
})

app.get('/reports', (req, res) => {
    Absent.find({}, (err, reports) => {
        if(err){
            throw err
        } else {
            res.render('reports', { reports })
        }
    })
});

app.get('/reports/:id', (req, res) => {
    Absent.findById(req.params.id, (err, report) => {
        if(err){
            throw err
        } else {
            res.render('report', { report })
        }
    })
});

app.get('/new', (req, res) => {
    res.render('new')
});

app.post('/new', (req, res) => {
    Profile.create(req.body, (err, created) => {
        if(err){
            throw err
        } else {
            res.redirect('/')
        }
    })
});

app.post('/reports/delete/:id', (req, res) => {
    Absent.findByIdAndDelete(req.params.id, (err, deleted) => {
        if(err){
            throw err
        } else {
            res.redirect('/reports')
        }
    })
})

app.get('/panel', (req, res) => {
    Profile.find({}, (err, profiles) => {
        if(err){
            throw err
        } else {
            res.render('panel', { profiles })
        }
    })
});

app.post('/delete/:id', (req, res) => {
    Profile.findByIdAndDelete(req.params.id, (err, deleted) => {
        if(err){
            throw err
        } else {
            res.redirect('/panel')
        }
    })
});

app.get('*', (req, res) => {
    res.redirect('/');
})

app.listen(process.env.PORT || 80, () => {
    console.log('Server Started At Port 80')
});