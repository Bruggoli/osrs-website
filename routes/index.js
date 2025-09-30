var express = require('express');
var favicon = require('express-favicon');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const playerName = req.query.playerName ? req.query.playerName: "Lynx Titan";

    data = await getDataFromApi("https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + sanitiseInput(playerName))

    if (data){
      res.render('index', { 
      title: 'OSRS stats!', 
      data,
      playerName: playerName,
      img: "https://services.runescape.com/m=itemdb_rs/obj_big.gif?id=5520"
    });
    } else {
      res.render('index', { 
      title: 'OSRS stats!', 
      data: [],
      playerName: playerName,
      img: "https://services.runescape.com/m=itemdb_rs/obj_big.gif?id=5520"
    });
    }


  } catch (e) {
    console.error(e);
    
    res.render('index', {
      title: 'OSRS stats!',
      data: [],
      error: 'Error loading default player data'
    });
  }
});

async function getDataFromApi(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data: " + error);
    return -1;
  }
}

function sanitiseInput(input) {
  if (!input)
    throw new Error("Input is empty");
  try {
    // throws a tantrum if not string
    ensureString(input);
    return input.replace(" ", "_")
  } catch(e) {
    console.error("error sanitising input");
  }
  return "";
}

function ensureString(input) {
  if (typeof input !== 'string')
    throw new Error("Input is not a string");

  return input;
}


module.exports = router;
