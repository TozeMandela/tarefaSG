var express = require('express');
var router = express.Router();
var restify = require('restify-clients');
var assert = require('assert');

// Creates a JSON client
var client = restify.createJsonClient({
  url: 'http://localhost:4000'
});

/* GET users listing. */
router.get('/', function(req, res, next) {
 
  client.get('/users', function(err, request, response, obj) {
    assert.ifError(err);
  
    res.json(obj);
  });

});

router.get('/:email/:pass', function(req, res, next) {
 
  client.get(`/users/${req.params.email}/${req.params.pass}`, function(err, request, response, obj) {
    assert.ifError(err);
    
    res.json(obj);
  });

});

router.get('/create/user/add', (req, res)=>{

  res.render('createNewUser');

});

router.get('/admin', (req, res)=>{
  
  res.render('admin/index');

});

router.get('/normal/add/user/tarefa/:id', (req, res)=>{
  
  client.get(`/users/normal/add/user/tarefa/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);
  
   res.json(obj)
  });

});

router.get('/normal/add/user/tarefa/ta/:id', (req, res)=>{
  
  client.get(`/users/normal/add/user/tarefa/ta/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);
  
   res.json(obj)
  });

});
router.get('/admin/add/tarefa/:id', (req, res)=>{
 
  client.get(`/users/admin/add/tarefa/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);
  
    res.json(obj);
  });

});

/* post users listing. */

router.post('/', (req, res)=>{

  client.post('/users', req.body, function(err, request, response, obj) {
    assert.ifError(err);
    
    res.end(obj);
  });

});

router.post('/tarefa/add', (req, res)=>{
  
  client.post('/users/tarefa/add', req.body, function(err, request, response, obj) {
    assert.ifError(err);
    
    res.end(obj);
  });

});
/* delete */
router.delete('/delete/:id', (req, res)=>{

  client.del(`/users/delete/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);
    
    res.json(obj);
  });

});

router.delete('/delete/tarefa/:id', (req, res)=>{

  client.del(`/users/delete/tarefa/${req.params.id}`, function(err, request, response, obj) {
    assert.ifError(err);
    
    res.json(obj);
  });

});

module.exports = router;
