var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/CognitivaTars';
var User = require('../app/models/user');


// Set Login and singup View
router.get('/', function (req, res, next) {
       res.render('index'); 
});


// --------- Nota importante -------------//
// El código secreto de la encriptación está en el código
// hay que sacarlo de aca porque el servicio es más vulnerable si
// se encuentra aquí
// --------------------------------------//

// Render the searchintent page only if the token is the same 
router.get('/searchintent/:token/:email', function(req, res, next){
    var tokenparam = req.params.token;
    var email = req.params.email;

		// call mongodb to obtain the credentials and compare token 
    User.findOne({email: email}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        if(tokenparam == token){
      
          // Get the docs of the user
          inputGetCollection = {User: email};

            var getIntentsCollection = function(db, callback){
            db.collection('intents').find(inputGetCollection).toArray(function(err, docs){

              assert.equal(null, err);
              console.log(docs);
              docJson = JSON.stringify(docs);
              // Pass the documents of the intents collection to the client
              res.render('searchintent', {Intents: docJson});

            });
          };

          MongoClient.connect(url, function(err, db){
            assert.equal(null, err);
            getIntentsCollection(db, function(){
            db.close();
            });
          });
        }
        else{
          // If the user is not validated 
          res.redirect('/');
        }
    });
});

// --------------------------------- search area ---------------------//
// AÚN NO IMPLEMENTADA, PUEDEN EXISTIR VARIOS CAMBIOS DEBIDO A QUE ESTE MOTOR ES MUY PRIMITIVO //
// -------------------------------------------------------------------//

router.get('/search/:token/:email/:var/:tag/:intentid/:question/:formal/:humor/:irony', function(req, res, next){

    var tokenparam = req.params.token;
    var email = req.params.email;

    var tag = req.params.tag;
    var question = req.params.question;
    var intentid = req.params.question;

    if (tag != 'no' && question != 'no' && intentid != 'no'){
      var query = {User : email, Tags: tag, IntentID: intentid, General_Question: question};
    }
    if (tag == 'no' && question == 'no' && intentid == 'no'){
      var query = {User : email};
    }
    if (tag != 'no' && question != 'no' && intentid == 'no'){
      var query = {User : email, Tags: tag, General_Question: question};
    }
    if (tag != 'no' && question == 'no' && intentid == 'no'){
      var query = {User : email, Tags: tag};
    }
    if (tag == 'no' && question != 'no' && intentid != 'no'){
      var query = {User : email, IntentID: intentid, General_Question: question};
    }
    if (tag == 'no' && question != 'no' && intentid == 'no'){
      var query = {User : email, General_Question: question};
    }
   if (tag == 'no' && question == 'no' && intentid != 'no'){
      var query = {User : email, IntentID: intentid};
    }

    User.findOne({email: email}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        //res.status(200).json({
            //message: 'Successfully logged in',
            //token: token
        //});
        //console.log("var user: " + user);

        // Validate the token 
        if(tokenparam == token){
      
          // Get the docs of the user
          inputGetCollection = query;

            var getIntentsCollection = function(db, callback){
            db.collection('intents').find(inputGetCollection).toArray(function(err, docs){

              assert.equal(null, err);
              console.log(docs);

              docJson = JSON.stringify(docs);

              // Pass the documents of the intents collection to the client
              res.render('search', {Intents: docJson});

            });
          };

          MongoClient.connect(url, function(err, db){
            assert.equal(null, err);
            getIntentsCollection(db, function(){
            db.close();
            });
          });
        }
        else{
          // If the user is not validated 
          res.redirect('/');
          console.log("pasa por aca")
        }
    });
});


router.post('/search', function(req, res, next){

  var tokenparam = req.body.search_token;
  var email = req.body.search_email;

  if (!tokenparam){
      res.redirect('/');
  }

  if (!req.body.search_variation){
    var variations = "no";
  } else {
    var variations = req.body.search_variation;
  }

  if (!req.body.search_tag){
    var tag = "no";
  } else {
    var tag = req.body.search_tag;
  }

  if (!req.body.search_id_intent){
    var intentid = "no";
  } else{
    var intentid = req.body.search_id_intent;
  }

  if (!req.body.search_question){
    var question = "no";
  } else {
    var question = req.body.search_question;
  }

  if (!req.body.search_formal){
    var formal = "no";
  } else {
    var formal = req.body.search_formal;
  }

  if (!req.body.search_humor){
    var humor = "no";
  } else {
    var humor = req.body.search_humor;
  }

  if (!req.body.search_irony){
    var irony = "no";
  } else {
    var irony = req.body.search_irony;
  }
  // query find
    User.findOne({email: email}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        
        res.redirect('/search' + "/" + token + '/' + user.email + "/" + variations + "/" + tag + "/" + intentid + "/" + question + "/" + formal + "/" + humor + "/" + irony);
    });
});

// -------------------------------------------------------------------//
// ---------------------------- END: search area ---------------------//
// -------------------------------------------------------------------//



// llamada a la vista general donde estan en un tabla los intent
router.post('/searchintent', function(req, res, next){
    var tokenparam = req.body.token;
    var emailparam = req.body.email;
    if (!tokenparam){
      res.redirect('/');
    }
    User.findOne({email: emailparam}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        res.redirect('/searchintent/' + token + '/' + user.email);
    });
});

// llamada que se realiza con el boton de borrar intent en la vista inicial de searchintent
router.post('/deleteoneintent', function(req, res, next){
    var tokenparam = req.body.token;
    var emailparam = req.body.email;
    var IntentID = req.body.Intent_ID;
    if (!tokenparam){
      res.redirect('/');
    }
    var inputdeleteintent = {Intent_ID: IntentID};
    var DeleteIntentDocument = function(db, callback){
      db.collection('intents').remove(inputdeleteintent, function(err, res){

        assert.equal(null, err);
        console.log("Intent eliminado con éxito");
      });
    };

    MongoClient.connect(url, function(err, db){
      assert.equal(null, err);
        DeleteIntentDocument (db, function(){
          db.close();
        });
      });

    User.findOne({email: emailparam}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        
        res.redirect('/searchintent/' + token + '/' + user.email);
    });
});

// Llamada realizada cuando se hace click en editar un intent, esto devuelve el documento especifico mediante el intent_ID
router.post('/editoneintent', function(req, res, next){
    var tokenparam = req.body.token;
    var emailparam = req.body.email;
    var IntentID = req.body.Intent_ID;
    if (!tokenparam){
      res.redirect('/');
    }
    var Editoneintent = {Intent_ID: IntentID};


    var EditoneIntent = function(db, callback){
      db.collection('intents').findOne(Editoneintent, function(err, documents){

        assert.equal(null, err);
        console.log("Intent Encontrado");
        console.log(res);

        var Mdocument = JSON.stringify(documents);

          User.findOne({email: emailparam}, function(err, user) {
          var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
          res.redirect('/editoneintent/' + token + '/' + user.email + '/' +  Mdocument);
          });

      });
    };
    MongoClient.connect(url, function(err, db){
      assert.equal(null, err);
        EditoneIntent (db, function(){
          db.close();
        });
      });
});

// tratamiento de cuando se hace el get de editoneintent, se re-valida al usuario
router.get('/editoneintent/:token/:email/:document', function(req, res, next){
    var tokenparam = req.params.token;
    var email = req.params.email;
    var Mdocument = req.params.document;


    User.findOne({email: email}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        if(tokenparam == token){
          res.render('editoneintent', {Document: Mdocument});
        }
        else{
          res.redirect('/');
        }
    });
});

// En la vista de crear un nuevo intent se re-valida al usuario
router.get('/newintent/:token/:email', function(req, res, next){
    var tokenparam = req.params.token;
    var email = req.params.email;

    
    User.findOne({email: email}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        if(tokenparam == token){
          res.render('newintent');
        }
        else{
          res.redirect('/');
        }
    });
});

// llamada a la vista de la creación de un nuevo intent 
router.post('/newintentview', function(req, res, next){
    var tokenparam = req.body.token;
    var emailparam = req.body.email;
    if (!tokenparam){
      res.redirect('/');
    }
    User.findOne({email: emailparam}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        res.redirect('/newintent/' + token + '/' + user.email);
    });
});

// se hace un render de la vista Login
router.get('/Login', function(req, res, next){
});

// se hace el render de la vista index
router.get('/singup', function(req, res, next){
    res.render('index');
});

// toma todos los parámetros del nuevo intent y lo inserta en el mongoDB, estos parámetros llegan en el req.body.form_output
// luego se re valida al usuario
router.post('/newintent', function(req, res, next) {
    var tokenparam = req.body.token;
    var emailparam = req.body.email;
    if (!tokenparam){
      res.redirect('/');
    }
    var output = req.body.form_output;
    // Parse JSON to avoid error of cannot create ObjectID
    input = JSON.parse(output);    

    // Creation of the function to insert document
   var insertDocument = function(db, callback) {
   		db.collection('intents').insertOne(input, function(err, result) {
    		assert.equal(err, null);
    		console.log("Inserted a document into the intents collection.");
    		callback();
  		});
	};

	// connect to Mongo db and insert the document
	MongoClient.connect(url, function(err, db) {
  		assert.equal(null, err);
  		insertDocument(db, function() {
      	db.close();
  		});
	});

    User.findOne({email: emailparam}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        res.redirect('/searchintent/' + token + '/' + user.email);

    });

});
// llamada que se realiza para realizar un update a un documento, en la vista de editoneintent
router.post('/updateintent', function(req, res, next) {
    var tokenparam = req.body.token;
    var emailparam = req.body.email;
    var IntentID = req.body.Intent_ID;
    if (!tokenparam){
      res.redirect('/');
    }

    var output = req.body.form_output;

    // Parse JSON to avoid error of cannot create ObjectID
    input = JSON.parse(output);    

    var inputdeleteintent = {Intent_ID: IntentID};
    var DeleteIntentDocument = function(db, callback){
      db.collection('intents').remove(inputdeleteintent, function(err, res){

        assert.equal(null, err);
        console.log("Intent eliminado con éxito");
      });
    };

    MongoClient.connect(url, function(err, db){
      assert.equal(null, err);
        DeleteIntentDocument (db, function(){
          db.close();
        });
      });

    // Creation of the function to insert document
   var insertDocument = function(db, callback) {
      db.collection('intents').insertOne(input, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a document into the intents collection.");
        callback();
      });
  };

  // connect to Mongo db and insert the document
  MongoClient.connect(url, function(err, db) {
      assert.equal(null, err);
      insertDocument(db, function() {
        db.close();
      });
  });
    User.findOne({email: emailparam}, function(err, user) {
        var token = jwt.sign({user: user}, 'Hayquesacarestodeaca', {expiresIn: 7200});
        
        res.redirect('/searchintent/' + token + '/' + user.email);

    });

});


module.exports = router;
