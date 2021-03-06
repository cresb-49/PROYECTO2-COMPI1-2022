import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";
import { Sentencias } from "./Sentencias";

export class Sino extends Instruccion implements AsigInstrucciones{
    
    constructor(private codeFalse:Sentencias|null,linea:number,columna:number){
        super(linea,columna);
    }
    public ejecutar(scope: Scope) {
        //TODO: Realizar la logica para la parte SINO de Si
    }
    
    public agregar(instruccion: Instruccion) {
        this.codeFalse?.agregarInstruccion(instruccion);
    }
    
    public getCodeFalse():Sentencias|null{
        return this.codeFalse;
    }
    
    public getSentencias():Sentencias|null{
        return this.codeFalse;
    }

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        //No hace ninguna accion
    }
}