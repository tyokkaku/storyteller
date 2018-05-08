const express = require('express');
const router = express.Router();

const countFunc = require('./countFunc');

const episodes = [];
let currentEpisodeNumber = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'StoryTeller',
    episodes: episodes,
  });
});

router.post('/new', function(req, res, next) {
  let episode = req.body['episode']; 
  let editNumber = req.body['edit'];
  let insertNumber = req.body['insert'];
  console.log(editNumber);
  if (!episode){
    res.send('エピソードを入力してください');
  } else if(editNumber.match(/\d+/) && editNumber <= episodes.length) {
    console.log('editにマッチしました');
    episodes.splice(editNumber, 1, episode);
    res.redirect('/');
  } else if(insertNumber.match(/\d+/) && insertNumber <= episodes.length) {
    console.log('insertにマッチしました');
    episodes.splice(insertNumber, 0, episode);
    res.redirect('/');
  } else {
    console.log('いずれにもマッチしませんでした');
    episodes.push(episode);
      console.log(episodes);
      res.redirect('/');
    }
  });

router.post('/delete', function(req, res, next) {
  let deleteNumber = req.body['delete'];

  if (deleteNumber.match(/[\D]+/) || !deleteNumber ) {
    res.send('削除するエピソードの番号を入力してください');
  } else {
    episodes.splice(deleteNumber, 1);
    res.redirect('/');
  }
});

router.get('/view', function(req, res, next) {
  res.render('view',
  {
    title: 'StoryTeller',
    episodes: episodes,
    currentEpisodeNumber: currentEpisodeNumber
  });
});

// router.post('/view', function(req, res, next) {
//   res.setHeader('Content-Type', 'text/plain');

//   let goNext = req.body['goNext'];
//   let goBack = req.body['goBack'];
//   let backToTop = req.body['backToTop'];
//   let rememberNumber = req.body['rememberNumber'];

//   if(goNext){
//     currentEpisodeNumber = countFunc.countUp();
//     let nextEpisode = episodes[currentEpisodeNumber];
//     res.send(nextEpisode);
//   } else if(goBack) {
//     currentEpisodeNumber = countFunc.countDown();
//     let prevEpisode = episodes[currentEpisodeNumber];
//     res.send(prevEpisode);
  // } else if(backToTop) {
  //   currentEpisodeNumber = countFunc.resetCount();
  //   let firstEpisode = episodes[currentEpisodeNumber];
  //   res.send(firstEpisode);
//   } else {
//     console.log('その他の処理');
//     res.end();
//   }
// });

module.exports.episodes = episodes;
module.exports.currentEpisodeNumber = currentEpisodeNumber;
module.exports = router;