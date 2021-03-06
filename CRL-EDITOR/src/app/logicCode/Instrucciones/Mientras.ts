import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";
import { Continuar } from "./Continuar";
import { Detener } from "./Detener";
import { Retornar } from "./Retornar";
import { Sentencias } from "./Sentencias";

export class Mientras extends Instruccion implements AsigInstrucciones{
    
    constructor(private condicion : Exprecion, private sentencias : Sentencias|null, linea : number, columna : number){
        super(linea, columna);
    }
    
    
    public ejecutar(scope: Scope):any{
        let condicion = this.condicion.ejecutar(scope);
        if(condicion.tipo != Tipo.BOOLEAN){
            throw new Error("La condicion de Mientras no es de tipo Boolean Linea: "+this.linea+" ,Columna: "+this.columna);
        }
        while (condicion.value) {
            const result = this.sentencias?.ejecutar(scope);
            if(result instanceof Detener){
                break;
            }else if(result instanceof Continuar){
                condicion = this.condicion.ejecutar(scope);
                continue;
            }else if(result instanceof Retornar){
                return result;
            }
            condicion = this.condicion.ejecutar(scope);
            if(condicion.tipo != Tipo.BOOLEAN){
                throw new Error("La condicion de Mientras no es de tipo Boolean Linea: "+this.linea+" ,Columna: "+this.columna);
            }
        }
    }
    public agregar(instruccion: Instruccion) {
        this.sentencias?.agregarInstruccion(instruccion);
    }
    public getSentencias():Sentencias|null{
        return this.sentencias;
    }
    
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo_" + subNameNode + "_" + nume;
        let decl = node + '[label = "<n>Mientras"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));    
        this.sentencias?.graficar(scope,graphviz,subNameNode,node);
    }
}