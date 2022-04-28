import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Sentencias extends Instruccion {
    private instrucciones:Array<Instruccion>;

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
}