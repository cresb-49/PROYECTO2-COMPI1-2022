import { GraficoDot } from "../GraficosDot/GraficoDot";
import {Scope} from "../Symbolo/Scope";

export abstract class Instruccion {
    
    public linea:number;
    public columna:number;

    private scope1:number;
    private scope2:number;

    constructor(linea:number,columna:number){
        this.linea = linea;
        this.columna = columna;
    }

    public setScope1(ident:number){
        this.scope1 = ident;
    }
    public getScope1():number{
        return this.scope2;
    }
    public setScope2(ident:number){
        this.scope2 = ident;
    }
    public getScope2():number{
        return this.scope2;
    }
    
    public abstract ejecutar(scope :Scope):any;
    public abstract graficar(scope:Scope,graphviz:GraficoDot,subNameNode:string,padre:string):any;
}