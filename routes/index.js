const express = require('express');
const router = express.Router();

const episodes = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'StoryTeller',
    episodes: episodes
  });
});

router.post('/', function(req, res, next) {
  res.set('Content-Type', 'text/plain');
   let episode = req.body['episode'];
   episodes.push(episode);
   console.log(episodes);
  res.redirect('/');
});

module.exports = router;
