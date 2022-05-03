import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Funcion } from "../Instrucciones/Funcion";
import { Importar } from "../Instrucciones/Importar";
import { Mostrar } from "../Instrucciones/Mostrar";
import { Principal } from "../Instrucciones/Principal";

export class Organizar {
    constructor(private ast: any[]) { }
    public start():any[] {
        return this.calcularSubsAST();
    }
    private calcularSubsAST():any[] {
        let funcionesPadre: any[] = [];
        this.ast.forEach((instruccion: any) => {
            if (instruccion instanceof Principal) {
                funcionesPadre.push(instruccion);
            } else if (instruccion instanceof Funcion) {
                funcionesPadre.push(instruccion);
            }
        });
        return funcionesPadre;
    }
}