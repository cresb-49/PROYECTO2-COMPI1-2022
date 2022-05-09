import { Instruccion } from "../Abstracto/Instruccion"
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Importar extends Instruccion{
    
    constructor(private id:string,linea:number,columna:number){
        super(linea,columna);
    }

    public getId(){
        return this.id;
    }

    public ejecutar(scope: Scope) {}
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {}
}