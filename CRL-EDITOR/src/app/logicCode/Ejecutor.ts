import { ConsolaCRLComponent } from "../consola-crl/consola-crl.component";
import { CodigoCRL } from "../models/codeCRL";

declare var require: any;

const Parser = require('./Grammar/analizador1')

export class Ejecutor {

    constructor(private codigoCrl: CodigoCRL[], private consola: ConsolaCRLComponent) {
        this.codigoCrl = codigoCrl;
    }

    public ejecucion() {
        this.analizar();
    }

    public analizar() {
        try {
            console.log(this.codigoCrl);
            let ast = Parser.parse(this.codigoCrl[0].codigo);
            this.pushErrors(ast.errores);
            console.log("ast: " + ast.instrucciones)
            ast.instrucciones.forEach((element: any) => {
                console.log(element);
            });
        } catch (error) {
            console.log(error);
        }
    }

    private pushErrors(element: any[]) {
        this.consola.agregarErrores(element);
    }
}