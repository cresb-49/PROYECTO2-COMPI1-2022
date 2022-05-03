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
            this.consola.agregarPrint(valor.value);
        }
    }
    public setConsolaCRL(consola:ConsolaCRLComponent){
        this.consola = consola;
    }
    
}