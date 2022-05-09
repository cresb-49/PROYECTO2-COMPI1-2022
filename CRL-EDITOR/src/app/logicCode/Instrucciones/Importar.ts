import { Instruccion } from "../Abstracto/Instruccion"
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Importar extends Instruccion{
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {}

    constructor(private id:string,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        //TODO: Realizar la logica para importar
    }

    public getId(){
        return this.id;
    }

}