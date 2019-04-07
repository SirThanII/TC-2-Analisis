"use strict";
exports.__esModule = true;
var MIDINOTE_POSITION = 0;
var DURATION_POSITION = 1;
var TIME_POSITION = 2;
var BEATS_PER_MINUTE = 120;
var TICKS_PER_BEAT = 128;
var TICKS_PER_SECOND = (BEATS_PER_MINUTE / 60) * TICKS_PER_BEAT;
var MidiPlayer = /** @class */ (function () {
    function MidiPlayer(pSong) {
        this.song = this.sortSong(pSong);
    }
    /*public buildMidiFile() : void {
      /*var file = new File();
      var track = new Track();
      var prevWait = 0;
      /*track.setTempo(BEATS_PER_MINUTE);
      file.addTrack(track);
      this.song.forEach(note => {
        track.addNote(0,
                      note[MIDINOTE_POSITION],
                      note[DURATION_POSITION] / 1000 * TICKS_PER_SECOND,
                      1);
        //prevWait = prevWait - note[TIME_POSITION];
      });
      fs.writeFileSync('test.midi', file.toBytes(), 'binary');
      console.log("Midi generado");
    }*/
    MidiPlayer.prototype.sortSong = function (pSong) {
        return pSong.sort(function (noteA, noteB) {
            if (noteA[TIME_POSITION] > noteB[TIME_POSITION]) {
                return 1;
            }
            if (noteA[TIME_POSITION] < noteB[TIME_POSITION]) {
                return -1;
            }
            return 0;
        });
    };
    return MidiPlayer;
}());
exports.MidiPlayer = MidiPlayer;
