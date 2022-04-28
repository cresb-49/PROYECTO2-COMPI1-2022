import { StringBuilder } from "./StringBuilder";
import { CodigoCRL } from "../models/codeCRL";
import { Scope } from "./Symbolo/Scope";
import { Funcion } from "./Instrucciones/Funcion";

const analizador1 = require('./Grammar/analizador1');

export class Ejecutor {

    private codigoCrl: CodigoCRL[];

    constructor(codigoCrl:CodigoCRL[]) {   
        this.codigoCrl = codigoCrl;
    }

    public ejecucion(){
        console.log("That code its works");
        let stringBuilder = new StringBuilder();

        stringBuilder.appedend("Hola");
        stringBuilder.appedend(" como estas");
        
        console.log(stringBuilder.toString());
    }

    public analizar(){
        try {
            let ast = analizador1.parse(this.codigoCrl[0].codigo);
            let scope = new Scope(null);
            for(let instrucion of ast){
                try {
                    if(instrucion instanceof Funcion){

                    }
                } catch (error) {
                    
                }
            }

        } catch (error) {

        }
    }
}