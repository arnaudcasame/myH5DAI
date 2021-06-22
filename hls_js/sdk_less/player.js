// This stream will be played if ad-enabled playback fails.
// goog.module('google3.javascript.ads.interactivemedia.sdk.dai.sample.h5.hls_js.simple.dai');


class Console {

  #hls;
  #ui;
  #isPlaying;


  constructor(hls){
    if(Hls.isSupported()){
      this.#ui = new UI();
      console.log(Hls.version);
      this.#hls = hls;
      this.#isPlaying = false;
      this.subscribeToEvents();
    }
  }

  subscribeToEvents(){
    this.#hls.on(Hls.Events.MANIFEST_LOADING, (event, data) => {
      this.#ui.print(event, 'Manifest is Loading...', null, null);
    });

    this.#hls.on(Hls.Events.MANIFEST_LOADED, (event, data) => {
      this.#ui.print(event, 'Manifest is successfully Loaded', null, null);
    });

    this.#hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.log(event);
      console.log(data);
      console.log('manifest loaded, found ' + data.levels.length + ' quality level');
      // this.hls.media.play();
      this.#ui.print(event, `Manifest is successfully parsed, found ${data.levels.length} quality levels`, null, null);
    
      for (const iterator of data.levels) {
        this.#ui.printMaster(iterator);
      }

      this.#ui.printMaster(data.stats);
      this.#isPlaying = true;
      this.#hls.media.controls = true;
      console.dir(this.#hls.media);
    });

    this.#hls.on(Hls.Events.LEVEL_SWITCHING, (event, data) => {
      this.#ui.print(event, `Stream is switching to level ${data.level} with bitrate ${data.bitrate/1000}kbps`, null, null);
      this.#ui.print(event, `VideoCodec: ${data.videoCodec}`, null, null);
      this.#ui.print(event, `AudioCodec: ${data.audioCodec}`, null, null);
      this.#ui.print(event, `Video Dimension: ${data.width}/${data.height}`, null, null);
      console.log(event, data);
    });

    this.#hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
      this.#ui.print(event, 'Stream switched to level ' + data.level, null, null);
      // console.log(event, data);
    });

    this.#hls.on(Hls.Events.LEVEL_LOADING, (event, data) => {
      this.#ui.print(event, 'Player is loading stream\'s media playlist level ' + data.level, null, null);
      this.#ui.print(event, 'Stream\'s media playlist level ' + data.level + ' url: ' + data.url, null, null);
      // console.log(event, data);
    });

    this.#hls.on(Hls.Events.LEVEL_LOADED, (event, data) => {
      this.#ui.print(event, 'Player loaded Stream\'s media playlist level ' + data.level, null, null);
      // console.log(event, data);
      // console.log('new url: ' + this.#hls.media.src);
    });

    this.#hls.on(Hls.Events.ERROR, (event, data) => {
      var errorType = data.type;
      var errorDetails = data.details;
      var errorFatal = data.fatal;
      if(errorFatal){
        switch (errorType) {
          case Hls.ErrorTypes.MEDIA_ERROR:
            console.log('fatal media error encountered, try to recover');
            this.#ui.print(event, `Type: ${errorType}`, null, 4);
            this.#hls.recoverMediaError();
            break;
          case Hls.ErrorTypes.NETWORK_ERROR:
            this.#ui.print(event, `Type: ${data.type}`, null, 4);
            this.#hls.startload();
            break;
          default:
            console.log(event, data);
            this.#ui.print(event, `Type: ${data.type}`, null, 4);
            this.#ui.print(event, `Details: ${errorDetails}`, null, 4);
            // this.#ui.print(event, `Url: ${data.context.url}`, null, 4);
            // this.#ui.print(event, `Responce code: ${data.response.code}`, null, 4);
            this.#hls.destroy();
            break;
        }
      }else{
        switch (errorDetails) {
          case Hls.ErrorDetails.FRAG_LOAD_ERROR:
            console.log(event, data);
            break;
          default:
            console.log(event, data);
            break;
        }
      }
    });
  }

  get uiObject(){
    return this.#ui;
  }

  onPlayerClick(e){
    if(!this.#isPlaying){
      this.loadStream();
    }
  }

  onPlayerError(e){
    console.log('Error player', e);
  }
}

class CustomLogger {

  #uiObject;

  constructor(uiObject){
    if(uiObject){
      this.#uiObject = uiObject;
    }
  }

  setUiElement(uiObject){
    this.#uiObject  = uiObject;
  }

  log(msg){
    this.#uiObject.print('debug', msg, null, 2);
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
