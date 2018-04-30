const express = require('express');
const router = express.Router();

const episodes = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'StoryTeller',
    episodes: episodes,
  });
});

router.post('/new', function(req, res, next) {
  let episode = req.body['episode']; 
  if (!episode){
    return;
  } else {
    episodes.push(episode);
      console.log(episodes);
    res.redirect('/');
  }
});

router.post('/delete', function(req, res, next) {
  let deleteNumber = req.body['delete'];
  console.log(deleteNumber);

  if (deleteNumber.match(/[\D]+/) || !deleteNumber ) {
    console.log('returnしました');
    return;
  } else {
    episodes.splice(deleteNumber, 1);
    console.log(episodes);
  }
  res.redirect('/');
});

module.exports = router;