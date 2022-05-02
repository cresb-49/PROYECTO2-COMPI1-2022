import { timeStamp } from "console";
import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Sentencias extends Instruccion {
    private instrucciones:Array<Instruccion>;
    private consolaErrores:ConsolaCRLComponent;

    constructor(instrucciones:Array<Instruccion>,linea:number,columna:number){
        super(linea,columna);
        this.instrucciones= instrucciones;
    }
    public ejecutar(scope: Scope) {
        const newScope = new Scope(scope);
        for (const instr of this.instrucciones) {
            try {
                const elemento = instr.ejecutar(newScope);
                if(elemento != undefined||elemento!=null){
                    return elemento;
                }
            } catch (error) {
                //Agregar la consola de errores
            }
        }
    }

    public setConsola(consolaErrores:ConsolaCRLComponent){
        this.consolaErrores= consolaErrores;
    }

    public agregarInstruccion(instruccion: Instruccion){
        this.instrucciones.push(instruccion);
    }
}