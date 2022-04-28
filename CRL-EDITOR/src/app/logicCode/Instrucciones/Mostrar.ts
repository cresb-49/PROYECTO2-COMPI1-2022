import {Instruccion} from "../Abstracto/Instruccion";
import {Exprecion} from "../Abstracto/Exprecion";
import { Scope } from "../Symbolo/Scope";
import {ConsolaCRLComponent} from "../../consola-crl/consola-crl.component";

export class Mostrar extends Instruccion{
    private valor:Exprecion;
    private expreciones:Array<Exprecion>;
    private consola:ConsolaCRLComponent;

    constructor(consola:ConsolaCRLComponent,expreciones : Array<Exprecion>,valor:Exprecion,linea:number,columna:number){
        super(linea,columna);
        this.valor = valor;
        this.consola = consola;
        this.expreciones = expreciones;
    }

    public ejecutar(scope: Scope) {
        const valor = this.valor.ejecutar(scope);
        this.consola.agregarPrint(valor);
    }
    
}