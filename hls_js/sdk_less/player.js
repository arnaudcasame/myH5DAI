// This stream will be played if ad-enabled playback fails.
// goog.module('google3.javascript.ads.interactivemedia.sdk.dai.sample.h5.hls_js.simple.dai');


class Player {

  #DEFAULT_STREAM;
  #hls;
  #ui;


  constructor(stream){
    this.#DEFAULT_STREAM = stream ? stream : 'http://storage.googleapis.com/testtopbox-public/video_content/bbb/master.m3u8';
    if(Hls.isSupported()){
      this.#hls = new Hls();
      this.#ui = new UI();
    }
  }

  loadStream(){
    this.#hls.loadSource(this.#DEFAULT_STREAM);
    this.#hls.attachMedia(this.#ui.videoElement);
    this.#hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.dir(event);
      console.dir(data);
  
      console.log('manifest loaded, found ' + data.levels.length + ' quality level');
      this.#ui.videoElement.play();
    });
  }
}

// BACKUP_STREAM = "https://storage.googleapis.com/willkiff/fmp4/downloaded/master.m3u8";


/**
 * Initializes the video player.
 */
function initPlayer() {
  
  hls.on(Hls.Events.FRAG_PARSING_METADATA, function(event, data) {
    if (data) {
      // For each ID3 tag in our metadata, we pass in the type - ID3, the
      // tag data (a byte array), and the presentation timestamp (PTS).
      data.samples.forEach(function(sample) {
        console.log('ID3', sample.data, sample.pts);
      });
    }
  });

  hls.on(Hls.Events.LEVEL_LOADED, function(event, data){
    console.log(event, data);
  });

  hls.on(Hls.Events.FRAG_LOADED, function(event, data){
console.log(event, data.frag.relurl, data.frag.duration);
  });

  hls.on(Hls.Events.ERROR, function (event, data) {
    var errorType = data.type;
    var errorDetails = data.details;
    var errorFatal = data.fatal;
    
    switch (data.details) {
      case Hls.ErrorDetails.FRAG_LOAD_ERROR:
        // ....
        break;
      case Hls.ErrorTypes.MEDIA_ERROR:
        console.log('fatal media error encountered, try to recover');
        // hls.recoverMediaError();
        break;
      case Hls.ErrorDetails.FRAG_LOAD_ERROR:
        // ....
        break;
      default:
        break;
    }
  });
}
