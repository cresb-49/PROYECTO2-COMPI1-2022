import { ConsolaCRLComponent } from "../consola-crl/consola-crl.component";
import { CodigoCRL } from "../models/codeCRL";
import { Instruccion } from "./Abstracto/Instruccion";
import { Organizar } from "./OrganizarInstrucciones/Organizar";

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
            let result = Parser.parse(this.codigoCrl[0].codigo);
            this.pushErrors(result.errores);
            console.log(result);
            result.instrucciones = this.cleanAst(result.instrucciones);
            this.orderAST(result.instrucciones);

            // console.log("result: " + result.instrucciones)
            // result.instrucciones.forEach((element: any) => {
            //     console.log(element);
            // });
        } catch (error) {
            console.log(error);
        }
    }

    private pushErrors(element: any[]) {
        this.consola.agregarErrores(element);
    }

    private cleanAst(elements:any[]):any[]{
        let newAt =[];
        for (const iterator of elements) {
            if(iterator instanceof Instruccion){
                newAt.push(iterator);
            }
        }
        return newAt;
    }

    private orderAST(element:any[]){
        let organizar = new Organizar(element,this.consola);
        organizar.start();
    }
}