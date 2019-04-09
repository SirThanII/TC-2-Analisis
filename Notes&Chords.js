"use strict";
exports.__esModule = true;
var pasingNumber = /** @class */ (function () {
    function pasingNumber() {
        this.numero = 0;
    }
    return pasingNumber;
}());
exports.pasingNumber = pasingNumber;
var note = /** @class */ (function () {
    function note(noteValue, noteDuration, noteBegining) {
        this.noteValue = noteValue;
        this.noteDuration = noteDuration;
        this.noteBegining = noteBegining;
        this.chordValue = 0;
    }
    return note;
}());
exports.note = note;
var Chord = /** @class */ (function () {
    function Chord() {
        this.Notas = new Array(); //las 3 notas que componen un acorde
        this.chordValue = 0;
        this.currentNotes = 0;
        this.chordInittime = 0;
        this.marcado = false;
    }
    Chord.prototype.addNote = function (nota) {
        if (this.currentNotes == 3) { // de paso promedia el valor del inicio
            var i = (this.Notas[0].noteBegining + this.Notas[1].noteBegining + this.Notas[2].noteBegining) / 3;
            this.Notas[0].noteBegining = i;
            this.Notas[1].noteBegining = i;
            this.Notas[2].noteBegining = i;
            this.chordInittime = i;
            return false; // a chord cant have more than 3 notes
        }
        else {
            if (this.currentNotes != 0) { //a chord can only have note within 400 of distance
                if (this.Notas[this.currentNotes - 1].noteBegining + 400 < nota.noteBegining) {
                    //si esta a mas de 400 significa que no pega con ninguna                  
                    //console.log("pretention")
                    //console.log(this);
                    return false;
                }
            }
            this.Notas[this.currentNotes] = nota;
            this.currentNotes++;
            return true; //adds the chord and tells that it could be added
        }
    };
    return Chord;
}());
exports.Chord = Chord;
function getLongerTrail(acordes, actual, posSeleccionadasTemp) {
    if (actual - 1 >= acordes.length) { //devolverse ya que es el fin de los acordes
        var temp = 0;
        for (var g = 0; g < 3; g++) {
            acordes[actual].Notas[g].chordValue = acordes[actual].Notas[g].noteDuration;
            if (acordes[actual].Notas[g].chordValue > temp)
                temp = acordes[actual].Notas[g].chordValue;
        }
        //si llega al final pues, el tiempo acumulado es lo que dura la nota
        acordes[actual].chordValue = temp;
        //sumadoSoFar.numero+=temp;
        posSeleccionadasTemp.push(actual);
        //el valor mas alto de sus 3 notas
        return;
    }
    var saltados = 1;
    var wasMatch = false;
    while (true) {
        if ((actual + saltados) >= acordes.length ||
            acordes[actual].chordInittime + 3200 < acordes[actual + saltados].chordInittime) { //el maximo
            //distanciamiento entre 3 acordes o ya no hay mas lejos, para evitar nullpointer
            var temp = 0;
            for (var z = 0; z < 3; z++) { //las 3 notas actuales
                acordes[actual].Notas[z].chordValue = acordes[actual].Notas[z].noteDuration;
                //mas los ya explorados
                if (acordes[actual].Notas[z].chordValue > temp)
                    temp = acordes[actual].Notas[z].chordValue;
            }
            acordes[actual].chordValue = temp;
            //sumadoSoFar.numero+=temp;
            posSeleccionadasTemp.push(actual);
            return;
        }
        else {
            for (var i = 0; i < 3; i++) { //para cada de las notas actuales
                for (var ii = 0; ii < 3; ii++) { //para cada una de las notas del siguiente acorde
                    if (matchNotas(acordes[actual].Notas[i].noteValue, acordes[actual + saltados].Notas[ii].noteValue)) {
                        if (acordes[actual + saltados].chordValue == 0) { //camino sin explorar
                            wasMatch = true;
                            break;
                        }
                        else {
                            var temp = 0;
                            for (var jj = 0; jj < 3; jj++) { //las 3 notas actuales
                                acordes[actual].Notas[jj].chordValue = acordes[actual].Notas[jj].noteDuration +
                                    (acordes[actual + saltados].chordInittime - acordes[actual].chordInittime)
                                    + acordes[actual + saltados].chordValue;
                                //mas los ya explorados
                                if (acordes[actual].Notas[jj].chordValue > temp)
                                    temp = acordes[actual].Notas[jj].chordValue;
                            }
                            acordes[actual].chordValue = temp;
                            // sumadoSoFar.numero=acordes[actual].chordValue;
                            posSeleccionadasTemp.push(actual);
                            return;
                        }
                    }
                }
            }
            if (wasMatch) {
                getLongerTrail(acordes, (actual + saltados), posSeleccionadasTemp);
                var temp = 0;
                for (var dd = 0; dd < 3; dd++) { //las 3 notas actuales
                    acordes[actual].Notas[dd].chordValue = acordes[actual].Notas[dd].noteDuration +
                        (acordes[actual + saltados].chordInittime - acordes[actual].chordInittime)
                        + acordes[actual + saltados].chordValue;
                    //mas los ya explorados
                    if (acordes[actual].Notas[dd].chordValue > temp)
                        temp = acordes[actual].Notas[dd].chordValue;
                }
                acordes[actual].chordValue = temp;
                posSeleccionadasTemp.push(actual);
                //sumadoSoFar.numero=temp;
            }
        }
        saltados++;
    }
}
exports.getLongerTrail = getLongerTrail;
function matchNotas(nota, nota2) {
    var resultado = Math.abs(nota - nota2);
    if (resultado % 12 == 0) {
        return true;
    }
    if ((resultado + 1) == nota) {
        return true;
    }
    if ((resultado - 1) == nota) {
        return true;
    }
    else {
        return false;
    }
}
exports.matchNotas = matchNotas;
