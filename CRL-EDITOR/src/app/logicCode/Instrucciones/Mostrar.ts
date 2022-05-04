import {Instruccion} from "../Abstracto/Instruccion";
import {Exprecion} from "../Abstracto/Exprecion";
import { Scope } from "../Symbolo/Scope";
import {ConsolaCRLComponent} from "../../consola-crl/consola-crl.component";

export class Mostrar extends Instruccion{
    private valor:Exprecion;
    private expreciones:Array<Exprecion>;
    public consola:ConsolaCRLComponent;

    constructor(valor:Exprecion,expreciones : Array<Exprecion>,linea:number,columna:number){
        super(linea,columna);
        this.valor = valor;
        this.expreciones = expreciones;
    }
    public ejecutar(scope: Scope) {
        const valor = this.valor.ejecutar(scope);
        if(valor.value == null){
            this.consola.agregarPrint("null");
        }else{
            if(this.expreciones.length == 0){
                console.log("Expreciones 0");
                this.consola.agregarPrint(valor.value);
            }else{
                console.log("Expreciones n");
                this.consola.agregarPrint(this.arreglarParametros(valor.value,scope));
            }
        }
    }
    public setConsolaCRL(consola:ConsolaCRLComponent){
        this.consola = consola;
    }

    private arreglarParametros(cadena:any,scope:Scope){
        let cad:string = String(cadena);
        let result:string=cad;
        
        let index = 0;
        for (const iterator of this.expreciones) {
            let valExp = String(iterator.ejecutar(scope));
            let call = String(index);
            let expRegex = "{[\s]*"+call+"[\s]*}"
            result = cad.replace(expRegex,valExp);
            index++;
        }
        return result;
    }

    public setExpreciones(expreciones:Array<Exprecion>){
        this.expreciones = expreciones;
    }
}