var express = require('express')
var app = express()
var mongo = require('mongodb').MongoClient
var opener = require('opener');


//use urlshortener

function makestr()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


app.get('/:url(*)', function (req, res) {
  if (req.params.url.length==0) {res.send('Please enter URL in the format http://www.sitename.com ');}
  else if (req.params.url.match(/^.....$/)!=null){
     mongo.connect('mongodb://localhost:27017/urls', function(err, db) {
    if (err) throw err
  
  
  db.collection('urls').find({shortURL:req.params.url}).toArray(function(err, documents) {
    if (err) throw err;
    if (documents.length==0){
    res.send('Short URL not found')
    }
    else
    {res.redirect(documents[0].URL)}//var out={original_url:documents[0].URL, short_url:documents[0].shortURL}
    //res.send(JSON.stringify(out))}//res.redirect(documents[0].URL)}//opener('http://www.google.com');}//res.send(documents)}
    db.close()
    })
  }
)
  }
  else if (req.params.url.match(/http\:\/\/www\..*\..*/i)!=null)//{res.send('Good URL ');}
  {
  mongo.connect('mongodb://localhost:27017/urls', function(err, db) {
    if (err) throw err
  
  
  db.collection('urls').find({URL:req.params.url}).toArray(function(err, documents) {
    if (err) throw err;
    if (documents.length==0){
    //console.log(documents);
    var shURL=makestr();
    db.collection('urls').insert({"URL" : req.params.url,"shortURL" : shURL})
    var out={original_url:req.params.url, short_url:shURL}
    res.send(JSON.stringify(out))
    }
    else
    {var out={original_url:documents[0].URL, short_url:documents[0].shortURL}
    res.send(JSON.stringify(out))}//res.redirect(documents[0].URL)}//opener('http://www.google.com');}//res.send(documents)}
    db.close()
    })
  }
  

)}
  else{res.send('Please enter URL in the format http://www.sitename.com ')}
}

)

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
})

