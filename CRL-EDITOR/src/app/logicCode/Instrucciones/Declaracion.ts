import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo, TipoString } from "../Abstracto/Retorno";
import { CAST_IMPLICITO, tablaAsignacion } from "../CasteoImplicito/CasteoImplicito";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Declaracion extends Instruccion{
    
    private id : string;
    private valor : Exprecion;
    private tipo:number;

    constructor(id:string,tipo:number,valor: Exprecion, linea : number, columna: number){
        super(linea, columna);
        this.id = id;
        this.valor = valor;
        this.tipo=tipo;
    }
    
    public setTipo(tipo:number){
        this.tipo=tipo;
    }

    public setValor(valor:Exprecion){
        this.valor = valor;
    }
    
    public ejecutar(scope: Scope) {
        if(this.valor == null){
            scope.declararVariable(this.id,null,this.tipo,this.linea,this.columna);
        }else{
            const val = this.valor.ejecutar(scope);
            let tipo = tablaAsignacion[this.tipo][val.tipo];
            if(tipo !=Tipo.ERROR){
                if(this.tipo == tipo){
                    const valFinal = CAST_IMPLICITO(this.tipo,val.tipo,val.value);
                    scope.declararVariable(this.id,valFinal,tipo,this.linea,this.columna);
                }else{
                    throw new Error("El valor a asignar es de tipo: "+TipoString[val.tipo]);
                }
            }else{
                throw new Error("El valor a asignar es de tipo: "+TipoString[val.tipo]);
            }
        }
    }
    
    public getId():string{
        return this.id;
    }

    public getTipo():number{
        return this.tipo;
    }

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo_" + subNameNode + "_" + nume;
        let decl = node + '[label = "<n>Declaracion"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
    }
}