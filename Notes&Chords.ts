export class pasingNumber{
    numero:number;

    constructor(){
        this.numero=0;
    }
}

export class note{
    noteValue:number;
    noteDuration:number;
    noteBegining:number;
    chordValue:number;

    constructor(noteValue:number,noteDuration:number,noteBegining:number){
        this.noteValue=noteValue;
        this.noteDuration=noteDuration;
        this.noteBegining=noteBegining;
        this.chordValue=0;
    }
}

export class Chord{
    Notas:note[]=new Array();//las 3 notas que componen un acorde
    chordValue:number;//el valor del camino mas largo del acorde
    currentNotes:number;//cantidad de notas actuales * en caso de no tener las 3*
    chordInittime:number;//promedio de inicializacion de las 3 notas
    marcado:boolean;//for the sake of the resultado

    constructor(){
        this.chordValue=0;
        this.currentNotes=0;
        this.chordInittime=0;
        this.marcado=false;
    }

    addNote(nota:note):boolean{//attempt 2 add a note 2 the chord
        if(this.currentNotes==3){// de paso promedia el valor del inicio
            let i= (this.Notas[0].noteBegining+this.Notas[1].noteBegining+this.Notas[2].noteBegining)/3;
            this.Notas[0].noteBegining=i;
            this.Notas[1].noteBegining=i;
            this.Notas[2].noteBegining=i;
            this.chordInittime=i;
            return false;// a chord cant have more than 3 notes
        }
        else{
            if(this.currentNotes!=0){//a chord can only have note within 400 of distance
                if(this.Notas[this.currentNotes-1].noteBegining+400<nota.noteBegining){
                    //si esta a mas de 400 significa que no pega con ninguna                  
                    //console.log("pretention")
                    //console.log(this);
                    return false;                    
                }
            }
            this.Notas[this.currentNotes]=nota;
            this.currentNotes++;
            return true;//adds the chord and tells that it could be added
        }
    }
}

    export function getLongerTrail(acordes:Array<Chord>,actual:number,
        posSeleccionadasTemp:Array<number>):void{
        if(actual-1>=acordes.length){//devolverse ya que es el fin de los acordes
            let temp=0
            for(let g=0;g<3;g++){
                acordes[actual].Notas[g].chordValue=acordes[actual].Notas[g].noteDuration;
                if(acordes[actual].Notas[g].chordValue>temp)
                    temp=acordes[actual].Notas[g].chordValue;
            }
            //si llega al final pues, el tiempo acumulado es lo que dura la nota
            acordes[actual].chordValue=temp;
            //sumadoSoFar.numero+=temp;
            posSeleccionadasTemp.push(actual);
            //el valor mas alto de sus 3 notas
            return;
        }
        let saltados=1;
        let wasMatch=false;
        while(true){
            if((actual+saltados)>=acordes.length||
                acordes[actual].chordInittime+3200<acordes[actual+saltados].chordInittime){//el maximo
                //distanciamiento entre 3 acordes o ya no hay mas lejos, para evitar nullpointer
                let temp=0
                for(let z=0;z<3;z++){//las 3 notas actuales
                    acordes[actual].Notas[z].chordValue=acordes[actual].Notas[z].noteDuration;
                    //mas los ya explorados
                    if(acordes[actual].Notas[z].chordValue>temp)
                        temp=acordes[actual].Notas[z].chordValue;
                }
                acordes[actual].chordValue=temp;
                //sumadoSoFar.numero+=temp;
                posSeleccionadasTemp.push(actual);                
                return;
            }else{
            for(let i=0;i<3;i++){//para cada de las notas actuales
                for(let ii=0;ii<3;ii++){//para cada una de las notas del siguiente acorde
                    if(matchNotas(acordes[actual].Notas[i].noteValue,
                        acordes[actual+saltados].Notas[ii].noteValue)){
                            if(acordes[actual+saltados].chordValue==0){//camino sin explorar
                                wasMatch=true;
                                break;
                            }else{
                                let temp=0
                                for(let jj=0;jj<3;jj++){//las 3 notas actuales
                                    acordes[actual].Notas[jj].chordValue=acordes[actual].Notas[jj].noteDuration+
                                    (acordes[actual+saltados].chordInittime-acordes[actual].chordInittime)
                                    +acordes[actual+saltados].chordValue;
                                    //mas los ya explorados
                                    if(acordes[actual].Notas[jj].chordValue>temp)
                                        temp=acordes[actual].Notas[jj].chordValue;
                                }
                                acordes[actual].chordValue=temp;
                               // sumadoSoFar.numero=acordes[actual].chordValue;
                                posSeleccionadasTemp.push(actual);
                                return;
                            }
                    }
                }
            }
                if(wasMatch){
                    getLongerTrail(acordes,(actual+saltados),posSeleccionadasTemp);
                    let temp=0
                    for(let dd=0;dd<3;dd++){//las 3 notas actuales
                        acordes[actual].Notas[dd].chordValue=acordes[actual].Notas[dd].noteDuration+
                        (acordes[actual+saltados].chordInittime-acordes[actual].chordInittime)
                        +acordes[actual+saltados].chordValue;
                        //mas los ya explorados
                        if(acordes[actual].Notas[dd].chordValue>temp)
                            temp=acordes[actual].Notas[dd].chordValue;
                    }
                    acordes[actual].chordValue=temp;
                    posSeleccionadasTemp.push(actual);
                    //sumadoSoFar.numero=temp;
                }        
            }
            saltados++;
        }
    
    }


    export function matchNotas(nota:number,nota2:number):boolean{
        let resultado=Math.abs(nota-nota2);
        if(resultado%12==0){
            return true;
        }
        if(resultado%13==0){
            return true;
        }
        if(resultado%11==0){
            return true;
        }
        if((resultado+1)==nota){
            return true;
        }
        if((resultado-1)==nota){
            return true;
        }else{
            return false;
        }
    }






