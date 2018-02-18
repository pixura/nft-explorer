const express = require("express");
const fs = require("fs");
const cors =  require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.set("port", process.env.PORT || 3031);

const API_URL = "http://192.168.43.108:5000/graphql";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// get all collectibles
app.get('/api/collectibles', (req, res) => {
  const address = req.params.address;
  const gqlQuery = {
    query:`{
      allCollectibles(orderBy:PRIMARY_KEY_ASC) {
        nodes{
          collectibleOwner
          collectibleTokenId
          collectibleInstagramId
          collectibleLastSoldPrice
          collectibleCurrentBidder
          collectibleCurrentBidPrice
          collectibleCreator
        }
      }
      allImageIdToImageUrls {
        nodes {
          instaId
          url
        }
      }
    }`
  };

  axios.post(API_URL, gqlQuery)
  .then(response => {
    let collectibles =  response.data.data.allCollectibles.nodes;
    const imageData = response.data.data.allImageIdToImageUrls.nodes;
    let myCollectibles = [];
    collectibles.map((collectible, i) => {
      const image = imageData.filter( obj => {
        return obj.instaId === collectible.collectibleInstagramId;
      });
      collectible.imgUrl = image[0].url;
    })
    res.send(JSON.stringify({status:'SUCCESS', result: collectibles }));
  })
  .catch(error => {
    console.log(error)
    res.send(JSON.stringify({status:'FAIL', result:error }));
  });
})

// get all transfers
// get all bids

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
