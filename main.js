"use strict";
exports.__esModule = true;
var midi_player_1 = require("./midi-player");
var Notes_Chords_1 = require("./Notes&Chords");
var SONG_DURATION = 2 * 60 * 1000; // 2 minutes song milisegundos
var minNoteDuration = 200;
var noteDuration = 1200; // 1.2 seconds note
var song = []; // [[midiNote, duration, timeline]]
var minNote = 20;
var maxNote = 120;
var NOTES_PER_SECOND = 5;
var AMOUNT_OF_NOTES = SONG_DURATION / 1000 * NOTES_PER_SECOND;
for (var i = 0; i < AMOUNT_OF_NOTES; i++) { // intentando que el random me lleve a 3 notas overlap en los mismos 2 segundos
    song.push([
        Math.floor(Math.random() * (maxNote - minNote) + minNote),
        Math.floor(Math.random() * (noteDuration - minNoteDuration) + minNoteDuration),
        Math.random() * SONG_DURATION
    ]); // timeline
}
var SortedSong = new midi_player_1.MidiPlayer(song);
console.log(SortedSong);
var Acordes = new Array();
var nota;
var insertada = true;
for (var i = 0, x = 0; i < SortedSong.song.length;) {
    nota = new Notes_Chords_1.note(SortedSong.song[i][0], SortedSong.song[i][1], SortedSong.song[i][2]);
    Acordes[x].addNote(nota, insertada);
    if (insertada)
        i++;
    else
        x++;
}
console.log(Acordes);
