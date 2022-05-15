import { Instruccion } from "../Abstracto/Instruccion";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { StringBuilder } from "../Strings/StringBuilder";
import { Scope } from "../Symbolo/Scope";

export class DrawAST extends Instruccion{
    public ejecutado:boolean = false
    public dotCode:string ='';

    constructor(private id:string,linea:number,columna:number){
        super(linea,columna);
    }
    
    public ejecutar(scope: Scope) {
        //Obtener el map de funciones con el id
        let funnciones = scope.getFunciones(this.id);
        if(funnciones == undefined){
            throw new Error("No se puede graficar el AST de "+this.id+" porque no existe Linea: "+this.linea+" ,Columna: "+this.columna);
        }else{
            let dotsCode:GraficoDot[]=[];
            let keys = funnciones.keys();
            for (const key of keys) {
                let dot = new GraficoDot();
                let f = funnciones.get(key);
                f?.graficar(scope,dot,"","");
                dotsCode.push(dot)
            }
            this.generateDotCode(dotsCode);
            this.ejecutado = true;
        }
    }
    
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo_" + subNameNode + "_" + nume;
        let decl = node + '[label = "<n>DibujarAST"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
    }
    
    private generateDotCode(dotsCode:GraficoDot[]){
        let principal = new StringBuilder();
        let stringBuilder = new StringBuilder();
        let contador = 0;
        principal.appedend("digraph G {\n\trankdir=LR;\n");
        dotsCode.forEach((dot:GraficoDot)=>{
            stringBuilder.appedend("\tsubgraph cluster_"+contador+" {\n")
            dot.declaraciones.forEach((decla:string)=>{
                stringBuilder.appedend('\t'+decla+'\n');
            });
            dot.relaciones.forEach((relacion:string)=>{
                stringBuilder.appedend('\t'+relacion+'\n');
            });
            stringBuilder.appedend("\t}\n");
            principal.appedend(stringBuilder.toString());
            stringBuilder.clear();
            contador++;
        });
        principal.appedend("}")
        this.dotCode = principal.toString();
    }
}