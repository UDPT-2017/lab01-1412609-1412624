var express = require("express");

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use (express.static('public'));
app.set("view engine","ejs");
app.set("views","./views");
var pg = require('pg');
pg.defaults.ssl = true;
app.listen(app.get('port'));
// app.get("/album",function(req,res){
//     res.render("album");
// })
var config = {
  user: 'nowgsdwfziefnu', //env var: PGUSER
  database: 'ddjmaijdbgqro4', //env var: PGDATABASE
  password: '7c0a6d16a80342941837d3a475f79b76fa3a9411ce0e3b11f751fcc966550a02', //env var: PGPASSWORD
  host: 'ec2-23-21-76-49.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//this initializes a connection pool
//it will keep idle connections open for 30 seconds
//and set a limit of maximum 10 idle clients
const pool = new pg.Pool(config);



app.get("/view/:id",function(req,res){
  var id = req.params.id;
  pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  
  //use the client for executing the query
  client.query('UPDATE "photo" SET "view" = "view" + 1 WHERE ID ='+id, function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);

    if(err) {
        res.end();
      return console.error('error running query', err);
    }
    console.log('Da tang view');
    res.send('Da tang view');
    //output: 1
  });})
});

app.get("/album/:id",function(req,res){
  var id = req.params.id;
  pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  
  //use the client for executing the query
  client.query('SELECT * FROM public.photo ORDER BY id ASC ', function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);

    if(err) {
        res.end();
      return console.error('error running query', err);
    }
        res.render("album.ejs", {dangxem:id, DanhSach:result});
    console.log(result.rows[0].ten);
    //output: 1
  });})
});

app.get("/album/",function(req,res){
  var id = req.params.id;
  pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  
  //use the client for executing the query
  client.query('SELECT SUM(view) as sum FROM photo', function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);

    if(err) {
        res.end();
      return console.error('error running query', err);
    }
        res.render("albums.ejs",{luotXem:result});
    console.log(result.rows[0].sum);
    //output: 1
  });})
});




app.get("/blog/",function(req,res){
  var id = req.params.id;
  pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  
  //use the client for executing the query
  client.query('SELECT * FROM blog', function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);

    if(err) {
        res.end();
      return console.error('error running query', err);
    }
        res.render("blogs.ejs",{DanhSach:result});
    console.log(result.rows[0].sum);
    //output: 1
  });})
});

app.get("/blog/:id",function(req,res){
  var id = req.params.id;
  pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  
  //use the client for executing the query
  client.query('UPDATE "blog" SET "view" = "view" + 1 WHERE ID ='+ id, function(err, result) {
    //call `done(err)` to release the client back to the pool (or destroy it if there is an error)
    done(err);

    if(err) {
        res.end();
      return console.error('error running query', err);
    }
    console.log('Da tang view');
   // res.send('Da tang view');
      res.render("blog1.ejs");
    //output: 1
  });})
});

