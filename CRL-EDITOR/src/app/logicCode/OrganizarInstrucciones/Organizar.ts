import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Funcion } from "../Instrucciones/Funcion";
import { Mostrar } from "../Instrucciones/Mostrar";
import { Principal } from "../Instrucciones/Principal";

export class Organizar {

    private subAST: any[] = [];

    constructor(private ast: any[],private consolaCRL:ConsolaCRLComponent) { }

    public start() {
        this.calcularSubsAST();
    }

    private calcularSubsAST() {
        let funcionesPadre: any[] = [];
        let restoInstrucciones: any[] = [];
        this.ast.forEach((instruccion: any) => {
            if (instruccion instanceof Principal) {
                funcionesPadre.push(instruccion)
            } else if (instruccion instanceof Funcion) {
                funcionesPadre.push(instruccion)
            } else if(instruccion instanceof Mostrar){
                instruccion.setConsolaCRL(this.consolaCRL);
                restoInstrucciones.push(instruccion);
            }else {
                restoInstrucciones.push(instruccion);
            }
        });
        console.log("Funciones padre:");
        console.log(funcionesPadre);
        console.log("Resto Instrucciones:");
        console.log(restoInstrucciones);
    }
}