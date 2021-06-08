// This stream will be played if ad-enabled playback fails.
// goog.module('google3.javascript.ads.interactivemedia.sdk.dai.sample.h5.hls_js.simple.dai');


class Player {

  #DEFAULT_STREAM;
  #hls;
  #ui;
  #isPlaying;


  constructor(stream){
    this.#DEFAULT_STREAM = stream ? stream : 'http://storage.googleapis.com/testtopbox-public/video_content/bbb/master.m3u8';
    if(Hls.isSupported()){
      console.log(Hls.version);
      this.#hls = new Hls();
      this.#ui = new UI();
      this.#ui.videoElement.poster = './big_buck_bunny.jpeg';
      this.#ui.videoElement.addEventListener('click', this.onPlayerClick.bind(this));
      this.#ui.videoElement.addEventListener('error', this.onPlayerError.bind(this));
      this.#isPlaying = false;
    }
  }

  loadStream(){
    this.#hls.loadSource(this.#DEFAULT_STREAM);
    this.#hls.attachMedia(this.#ui.videoElement);
    this.#hls.on(Hls.Events.MANIFEST_LOADING, (event, data) => {
      this.#ui.print(event, 'Manifest is Loading...', null);
    });

    this.#hls.on(Hls.Events.MANIFEST_LOADED, (event, data) => {
      this.#ui.print(event, 'Manifest is successfully Loaded', null);
    });

    this.#hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
      console.log(event);
      console.log(data);
      console.log('manifest loaded, found ' + data.levels.length + ' quality level');
      this.#ui.videoElement.play();
      this.#ui.print(event, `Manifest is successfully parsed, found ${data.levels.length} quality levels`, null);
    
      for (const iterator of data.levels) {
        this.#ui.printMaster(iterator);
      }

      this.#ui.printMaster(data.stats);
      this.#isPlaying = true;
      this.#ui.videoElement.controls = true;
      console.dir(this.#ui.videoElement);
    });

    this.#hls.on(Hls.Events.LEVEL_SWITCHING, (event, data) => {
      this.#ui.print(event, `Stream is switching to level ${data.level} with bitrate ${data.bitrate/1000}kbps`, null);
      this.#ui.print(event, `VideoCodec: ${data.videoCodec}`, null);
      this.#ui.print(event, `AudioCodec: ${data.audioCodec}`, null);
      this.#ui.print(event, `Video Dimension: ${data.width}/${data.height}`, null);
      console.log(event, data);
    });

    this.#hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
      this.#ui.print(event, 'Stream switched to level ' + data.level, null);
      console.log(event, data);
      console.log('new url: ' + this.#ui.videoElement.src)
    });
    this.#hls.on(Hls.Events.ERROR, (event, data) => {
      var errorType = data.type;
      var errorDetails = data.details;
      var errorFatal = data.fatal;
      
      switch (data.details) {
        case Hls.ErrorDetails.FRAG_LOAD_ERROR:
          console.log(event, data);
          break;
        case Hls.ErrorTypes.MEDIA_ERROR:
          console.log(event, data);
          console.log('fatal media error encountered, try to recover');
          // hls.recoverMediaError();
          break;
        case Hls.ErrorDetails.FRAG_LOAD_ERROR:
          console.log(event, data);
          break;
        default:
          console.log(event, data);
          this.#ui.print(event, `Type: ${data.type}`, 1);
          this.#ui.print(event, `Details: ${data.details}`, 1);
          this.#ui.print(event, `Url: ${data.context.url}`, 1);
          this.#ui.print(event, `Responce code: ${data.response.code}`, 1);
          break;
      }
    });
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
