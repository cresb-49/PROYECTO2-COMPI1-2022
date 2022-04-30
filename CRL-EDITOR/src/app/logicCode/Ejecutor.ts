import { CodigoCRL } from "../models/codeCRL";

declare var require: any;

const Parser = require('./Grammar/analizador1')

export class Ejecutor {

    private codigoCrl: CodigoCRL[];

    constructor(codigoCrl: CodigoCRL[]) {
        this.codigoCrl = codigoCrl;
    }

    public ejecucion() {
        this.analizar();
    }

    public analizar() {
        try {
            console.log(this.codigoCrl);
            let ast= Parser.parse(this.codigoCrl[0].codigo);
            console.log("ast: "+ast)
            ast.forEach((element: any) => {
               console.log(element);
            });
        } catch (error) {
            console.log(error);
        }
    }
}