var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    const defaultUser = "lynx titan";
    data = await getDataFromApi("https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + sanitiseInput(defaultUser))
    if (data !== ""){
      console.debug(data);
    } else {
      console.log("no data to show")
    }

    res.render('index', { 
      title: 'OSRS stats!', 
      data,
      playerName: defaultUser,
      img: "https://services.runescape.com/m=itemdb_rs/obj_big.gif?id=5520"
    });
  } catch (e) {
    console.error(e);
    res.render('index', {
      title: 'OSRS stats!',
      data: [],
      error: 'Error loading default player data'
    });
  }
});

/* get for handling rsn lookup */
router.get('/search', async function(req, res, next) {
  try {
    const playerName = sanitiseInput(req.query.playerName);
    console.log("Fetching: https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + playerName);
    const data = await getDataFromApi("https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=" + playerName);
    console.log(data.skills)
    if (data && data.length > 0) {
      res.render('index', {
        title: 'OSRS stats!',
        data,
        playerName: playerName,
        img: "https://services.runescape.com/m=itemdb_rs/obj_big.gif?id=5520"
      })
    } else {
        res.render('index', { 
          title: 'OSRS stats!', 
          data: [], 
          error: `Player '${playerName}' not found or has no stats`,
          playerName: playerName
      });
    }
  } catch (e) {
    console.error("GET error" + e);
  }
})

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
