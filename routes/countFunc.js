const indexBox = require('./index');

module.exports = {
  countUp(){
    if(indexBox.currentEpisodeNumber >= indexBox.episodes.length - 1) {
      return indexBox.currentEpisodeNumber;
    } else {
      return ++indexBox.currentEpisodeNumber;
    }
  },
  countDown(){
    if(indexBox.currentEpisodeNumber===0){
      return indexBox.currentEpisodeNumber;
    } else {
      return --indexBox.currentEpisodeNumber;
    }
  },
  resetCount(){
    return indexBox.currentEpisodeNumber = 0;
  },
};