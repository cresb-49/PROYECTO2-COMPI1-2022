import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class DrawAST extends Instruccion{
    public ejecutado:boolean = false
    public dotCode:string ='';

    constructor(private id:string,linea:number,columna:number){
        super(linea,columna);
    }
    
    public ejecutar(scope: Scope) {
        let dotsCode:string[]=[];
        //Obtener el map de funciones con el id
        let funnciones = scope.getFunciones(this.id);
        if(funnciones == undefined){
            throw new Error("No se puede graficar el AST de "+this.id+" porque no existe Linea: "+this.linea+" ,Columna: "+this.columna);
        }else{
            let key = funnciones.keys();
            console.log(funnciones);
        }
    }
    
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo-" + subNameNode + "-" + nume;
        let decl = node + '[label = "<n>DibujarAST"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
    }
    
}