import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo, TipoString } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class CallFuncion extends Instruccion{
    
    private arrayTipos:string[]=[];
    
    constructor(private id:string,private parametros:Array<Exprecion>,linea:number,columna:number){
        super(linea,columna);
    }
    
    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let nume = graphviz.declaraciones.length + 1;
        let node = "nodo_" + subNameNode + "_" + nume;
        let decl = node + '[label = "<n>Llamar Funcion "'+this.id+'"];'
        graphviz.declaraciones.push(decl);
        graphviz.relaciones.push((padre + ':n -> ' + node + ':n'));
    }
    public ejecutar(scope: Scope) {
        this.arrayTipos=[];
        //const funcion = scope.obtenerFuncion(this.id);
        const funcion = scope.getFuncion(this.id,this.codigoReferencia(scope));
        if(funcion == undefined){
            throw new Error("No existe la funcion \"" + this.id + "\" en el programa para los parametros ["+this.arrayTipos.toString()+"] ,Linea: " + this.linea + " ,Columna: " + this.columna);
        }else{
            try {
                funcion.ejecutarFuncion(this.parametros,scope);
            } catch (error) {
                if(error instanceof Error){
                    throw new Error('Error en ejecucion de funcion "'+this.id+'" ,Linea: '+this.linea+" ,Columna: "+this.columna+" , -> "+error.message);
                }
            }
        }
    }

    public codigoReferencia(scope:Scope):string{
        let contInt = 0;
        let contDouble = 0;
        let contBool = 0;
        let contChar = 0;
        let contString = 0;

        for (const param of this.parametros) {
            const exp = param.ejecutar(scope);
            switch (exp.tipo) {
                case Tipo.INT:
                    this.arrayTipos.push(TipoString[Tipo.INT]);
                    contInt++;
                    break;
                case Tipo.BOOLEAN:
                    this.arrayTipos.push(TipoString[Tipo.BOOLEAN]);
                    contBool++;
                    break;
                case Tipo.CHAR:
                    this.arrayTipos.push(TipoString[Tipo.CHAR]);
                    contChar++;
                    break;
                case Tipo.STRING:
                    this.arrayTipos.push(TipoString[Tipo.STRING]);
                    contString++;
                    break;
                case Tipo.DOUBLE:
                    this.arrayTipos.push(TipoString[Tipo.DOUBLE]);
                    contDouble++;
                    break;
            }
        }
        
        let code = String(contInt)+String(contDouble)+String(contBool)+String(contChar)+String(contString);
        return code;
    }
}