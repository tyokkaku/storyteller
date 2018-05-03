const express = require('express');
const router = express.Router();

const episodes = [];
let i = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'StoryTeller',
    episodes: episodes,
  });
});

function countUp(){
  if(i >= episodes.length - 1) {
    return;
  } else {
    i++;
  }
};
function countDown(){
  if(i===0){
    return;
  } else {
    i--;
  }
};
function resetCount(){
  i = 0;
};


router.post('/new', function(req, res, next) {
  let episode = req.body['episode']; 
  // let episode2 = episode.replace(/\n/g,'<BR>');

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
  console.log(deleteNumber);

  if (deleteNumber.match(/[\D]+/) || !deleteNumber ) {
    res.send('削除するエピソードの番号を入力してください');
  } else {
    episodes.splice(deleteNumber, 1);
    console.log(episodes);
    res.redirect('/');
  }
});

router.get('/view', function(req, res, next) {
  res.render('view',
  {
    title: 'StoryTeller',
    episodes: episodes,
    i: i
  });
});

router.post('/view', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');

  let goNext = req.body['goNext'];
  let goBack = req.body['goBack'];
  let backToTop = req.body['backToTop'];

  if(goNext){
    countUp(i);
    let nextEpisode = episodes[i];
    res.send(nextEpisode);
  } else if(goBack) {
    countDown(i);
    let prevEpisode = episodes[i];
    res.send(prevEpisode);
  } else if(backToTop) {
    resetCount(i);
    let firstEpisode = episodes[i];
    res.send(firstEpisode);
  } else {
    console.log('その他の処理');
    res.end();
  }
});

module.exports = router;