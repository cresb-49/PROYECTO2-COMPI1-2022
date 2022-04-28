import { CodigoCRL } from "../models/codeCRL";

declare var require:any;

const Parser = require('./Grammar/analizador1')

export class Ejecutor {

    private codigoCrl: CodigoCRL[];

    constructor(codigoCrl:CodigoCRL[]) {   
        this.codigoCrl = codigoCrl;
    }

    public ejecucion(){
        
        // console.log("That code its works");
        // let stringBuilder = new StringBuilder();

        // stringBuilder.appedend("Hola");
        // stringBuilder.appedend(" como estas");
        
        // console.log(stringBuilder.toString());

        this.analizar();
        
    }

    public analizar(){
        try{
            let ast = Parser.parse("codigo");
            console.log("Resultado "+ ast);
        } catch (error) {
            console.log(error);
        }
    }
}