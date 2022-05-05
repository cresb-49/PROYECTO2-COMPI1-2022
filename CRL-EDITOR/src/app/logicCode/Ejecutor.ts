import { ConsolaCRLComponent } from "../consola-crl/consola-crl.component";
import { ContenerdorGraficosComponent } from "../contenerdor-graficos/contenerdor-graficos.component";
import { CodigoCRL } from "../models/codeCRL";
import { Instruccion } from "./Abstracto/Instruccion";
import { Entorno } from "./Entorno/Entorno";
import { EncapsuladorGrafico } from "./GraficosDot/EncapsuladorGrafico";
import { DrawAST } from "./Instrucciones/DrawAST";
import { DrawEXP } from "./Instrucciones/DrawEXP";
import { DrawTS } from "./Instrucciones/DrawTS";
import { Mostrar } from "./Instrucciones/Mostrar";
import { Sentencias } from "./Instrucciones/Sentencias";
import { Organizar } from "./OrganizarInstrucciones/Organizar";
import { CRL } from "./Result/CRL";

declare var require: any;

const Parser = require('./Grammar/analizador1')

export class Ejecutor {

    private SCRIPT:Array<CRL> = [];
    private GRAFICOS:Array<any> = [];
    private errores:boolean = false;

    constructor(private codigoCrl: CodigoCRL[], private consola: ConsolaCRLComponent,private contenedorGraficos:ContenerdorGraficosComponent) {
        this.codigoCrl = codigoCrl;
    }

    public ejecucion() {
        this.analizar();
    }

    public analizar() {
        this.SCRIPT = [];
        this.GRAFICOS = [];
        console.log(this.codigoCrl);
        this.consola.clearConsole();
        for (const code of this.codigoCrl) {
            this.consola.agregarError("---------------- Inicio analisis archivo "+code.nombre+" ----------------");
            try {
                let result = Parser.parse(code.codigo);
                this.pushErrors(result.errores);
                console.log(result);
                this.getGraficadores(result.instrucciones,code.nombre);
                result.instrucciones = this.cleanAst(result.instrucciones);
                let padres = this.orderAST(result.instrucciones,code.nombre);
                result.mostra.forEach((element:Mostrar) => {
                    element.setConsolaCRL(this.consola);
                });
                result.sentencias.forEach((element:Sentencias) => {
                    element.setConsola(this.consola);
                });
                this.SCRIPT.push(new CRL(code.nombre,padres,result.principal,result.varaiblesGlobales,result.imports));
            } catch (error) {
                this.consola.agregarError("Error al analizar el codigo del archivo");
            }
            this.consola.agregarError("---------------- Fin analisis archivo "+code.nombre+" ----------------");
        }

        console.log("Resultado Verificar");
        console.log(this.SCRIPT);
        console.log(this.GRAFICOS);

        if(!this.errores){
            let entorno = new Entorno(this.SCRIPT,this.consola,this.contenedorGraficos);
            entorno.ejecutar(this.GRAFICOS);
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

    private getGraficadores(element:any[],nombre:string){
        for (const iterator of element) {
            if(iterator instanceof DrawAST){
                this.GRAFICOS.push(iterator);
            }else if(iterator instanceof DrawEXP){
                this.GRAFICOS.push(new EncapsuladorGrafico(iterator,nombre));
            }else if(iterator instanceof DrawTS){
                this.GRAFICOS.push(iterator);
            }
        }
    }
}