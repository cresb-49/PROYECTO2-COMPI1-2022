import { ConsolaCRLComponent } from "../consola-crl/consola-crl.component";
import { CodigoCRL } from "../models/codeCRL";
import { Instruccion } from "./Abstracto/Instruccion";
import { Mostrar } from "./Instrucciones/Mostrar";
import { Sentencias } from "./Instrucciones/Sentencias";
import { Organizar } from "./OrganizarInstrucciones/Organizar";
import { CRL } from "./Result/CRL";

declare var require: any;

const Parser = require('./Grammar/analizador1')

export class Ejecutor {

    private SCRIPT:Array<CRL> = [];
    private errores:boolean = false;

    constructor(private codigoCrl: CodigoCRL[], private consola: ConsolaCRLComponent) {
        this.codigoCrl = codigoCrl;
    }

    public ejecucion() {
        this.analizar();
    }

    public analizar() {
        this.SCRIPT = [];
        this.consola.clearConsole();
        this.consola.agregarError("---------------- Inicio analisis archivo "+this.codigoCrl[0].nombre+" ----------------");
        try {
            console.log(this.codigoCrl);
            let result = Parser.parse(this.codigoCrl[0].codigo);
            this.pushErrors(result.errores);
            console.log(result);
            result.instrucciones = this.cleanAst(result.instrucciones);
            let padres = this.orderAST(result.instrucciones,this.codigoCrl[0].nombre);
            result.mostra.forEach((element:Mostrar) => {
                element.setConsolaCRL(this.consola);
            });
            result.sentencias.forEach((element:Sentencias) => {
                element.setConsola(this.consola);
            });
            this.SCRIPT.push(new CRL(this.consola,padres,result.principal,result.varaiblesGlobales,result.imports));
        } catch (error) {
            this.consola.agregarError("Error al analizar el codigo del archivo");
        }
        this.consola.agregarError("---------------- Fin analisis archivo "+this.codigoCrl[0].nombre+" ----------------");

        console.log("Resultado Verificar");
        console.log(this.SCRIPT);

        if(!this.errores){
            this.SCRIPT[0].ejecutar();
        }else{
            this.consola.agregarError("No se puede ejecutar el Script CRL porque hay errores!!!!")
        }

    }

    private pushErrors(element: any[]) {
        if(element.length != 0){
            this.errores = true;
        }
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

    private orderAST(element:any[],nombre:string):any[]{
        let organizar = new Organizar(element);
        let padres = organizar.start();
        if(padres.length==0){
            this.consola.agregarError("Error al analizar codigo, el archivo "+nombre+" esta vacio!!!!!!");
        }
        return padres;
    }
}