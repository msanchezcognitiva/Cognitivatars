var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// call the blueprint of mongoose 
var User = require('../app/models/user');


// POST operation for singup
router.post('/singup', function (req, res, next) {

    if (!req.body.password || !req.body.email || !req.body.repassword){
        res.render('singupresponse', {Message: 'Falto ingresar el nombre o la contraseña'});
    }
    if (req.body.password != req.body.repassword){
        res.render('singupresponse', {Message: 'Las contraseñas no coinciden'});
    }
    // Define the new user
    var user = new User({
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    // creation of a new user
    user.save(function(err, result) {
        if (err) {
            res.render('singupresponse', {Message: 'Ya existe ese nombre de usuario, prueba con otro'});
        }
        res.render('singupresponse', {Message: 'Registro exitoso'});
    });
    
});
// POST Login operation 
router.post('/Login', function(req, res, next) {
    //console.log("user: " + req.body.user_login);
    User.findOne({email: req.body.user_login}, function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if (!bcrypt.compareSync(req.body.pass_login, user.password)) {
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        res.redirect('/searchintent/' + token + '/' + user.email);
    });
});

module.exports = router;