import { ConsolaCRLComponent } from "../consola-crl/consola-crl.component";
import { CodigoCRL } from "../models/codeCRL";
import { Instruccion } from "./Abstracto/Instruccion";
import { Mostrar } from "./Instrucciones/Mostrar";
import { Sentencias } from "./Instrucciones/Sentencias";
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
            this.consola.clearConsole();
            console.log(this.codigoCrl);
            let result = Parser.parse(this.codigoCrl[0].codigo);
            this.pushErrors(result.errores);
            console.log(result);
            result.instrucciones = this.cleanAst(result.instrucciones);
            this.orderAST(result.instrucciones,this.codigoCrl[0].nombre);
            result.mostra.forEach((element:Mostrar) => {
                element.setConsolaCRL(this.consola);
            });
            result.sentencias.forEach((element:Sentencias) => {
                element.setConsola(this.consola);
            });
        } catch (error) {
            this.consola.agregarError("Error al analizar el codigo del archivo");
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

    private orderAST(element:any[],nombre:string){
        let organizar = new Organizar(element,this.consola);
        let padres = organizar.start();
        if(padres.length==0){
            this.consola.agregarError("Error al analizar codigo, el archivo "+nombre+" esta vacio!!!!!!");
        }
    }
}