import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class DrawTS extends Instruccion{
    
    public ejecutado:boolean = false
    public dotCode:string ='';

    constructor(private s1:number,private s2:number,linea:number,columna:number){
        super(linea,columna);
    }
    
    public ejecutar(scope: Scope) {
        let code = scope.graficar(this.linea,this.columna);
        this.ejecutado = true;
        this.dotCode = code;
    }

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo-" + subNameNode + "-" + nume;
        let decl = node + '[label = "<n>DibujarTS"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
    }
}