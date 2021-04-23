// This stream will be played if ad-enabled playback fails.
// goog.module('google3.javascript.ads.interactivemedia.sdk.dai.sample.h5.hls_js.simple.dai');

var BACKUP_STREAM =
    'http://storage.googleapis.com/testtopbox-public/video_content/bbb/' +
    'master.m3u8';


    // BACKUP_STREAM = "https://storage.googleapis.com/willkiff/fmp4/downloaded/master.m3u8";

// hls.js video player
var hls = new Hls();

// Video element
var videoElement;

// Ad UI element
var adUiElement;

/**
 * Initializes the video player.
 */
function initPlayer() {
  videoElement = document.getElementById('video');
  adUiElement = document.getElementById('adUi');

  loadUrl(BACKUP_STREAM);
  
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


/**
 * Loads and plays a Url.
 * @param  {string} url
 */
function loadUrl(url) {
  console.log('Loading:' + url);
  hls.loadSource(url);
  hls.attachMedia(videoElement);
  hls.on(Hls.Events.MANIFEST_PARSED, function(event, data) {
    console.dir(event);
    console.dir(data);

    console.log('manifest loaded, found ' + data.levels.length + ' quality level');
    videoElement.play();
  });
}
