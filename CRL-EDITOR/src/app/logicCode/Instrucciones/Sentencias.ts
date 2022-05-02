import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";
import { Declaracion } from "./Declaracion";

export class Sentencias extends Instruccion {
    private instrucciones:Array<Instruccion>;
    private consolaErrores:ConsolaCRLComponent;

    private VARAIBLES_DECLARADAS:Declaracion[] = [];

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

    public verrificarExistenciaVar(nueva:Declaracion):boolean{
        let result = this.VARAIBLES_DECLARADAS.filter((n:Declaracion)=> n.getId() == nueva.getId());
        this.VARAIBLES_DECLARADAS.push(nueva);
        if(result.length == 0){
            return false
        }else{
            return true
        }
    }

    public agregarVarsPrecedencia(vars:Declaracion[]){
        console.log("debuj")
        this.VARAIBLES_DECLARADAS = this.VARAIBLES_DECLARADAS.concat(vars);
    }
}