import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Asignacion extends Instruccion{
    
    constructor(private id:string,private valor:Exprecion,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        const result = this.valor.ejecutar(scope);
        scope.guardar(this.id,result.value,result.tipo);
    }
    
    public ejecutarDiferido(scopeGuadardado: Scope,scopeOrigenInfo:Scope) {
        const result = this.valor.ejecutar(scopeOrigenInfo);
        scopeGuadardado.guardar(this.id,result.value,result.tipo);
    }

    public getId(){
        return this.id;
    }

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo_" + subNameNode + "_" + nume;
        let decl = node + '[label = "<n>Asignacion"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
        let nume2 = graphviz.declaraciones.length + 1;
        let node2 = "nodo_" + subNameNode + "_" + nume2;
        let decl2 = node2 + '[label = "<n>Exprecion"];'
        graphviz.declaraciones.push(decl2);
        graphviz.relaciones.push((node + ':n -> ' + node2 + ':n'));
    }
}