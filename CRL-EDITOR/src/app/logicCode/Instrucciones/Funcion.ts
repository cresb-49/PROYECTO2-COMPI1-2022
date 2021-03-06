import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Retorno, Tipo, TipoString } from "../Abstracto/Retorno";
import { CAST_IMPLICITO, tablaAsignacion } from "../CasteoImplicito/CasteoImplicito";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Almacenador } from "../Symbolo/Almacenador";
import { ContenedorFunciones } from "../Symbolo/ContenedorFunciones";
import { Scope } from "../Symbolo/Scope";
import { Asignacion } from "./Asignacion";
import { Declaracion} from "./Declaracion";
import { Retornar } from "./Retornar";

import { Sentencias } from "./Sentencias";

export class Funcion extends Instruccion implements AsigInstrucciones{
    
    //private funcionesAccesible: Map<string,Funcion>;
    private funcionesAccesible: ContenedorFunciones;
    private funtionsAccesibles: Almacenador;
    private viewScope:Scope;
    public scopeGlobalArchivoOrigen:Scope|null = null;
      
    constructor(private tipo:number,private id: string, private sentencias:Sentencias|null, private parametros : Array<Declaracion>, liena : number, columna : number){
        super(liena,columna);
        this.setScope2(0);
    }
    
    public ejecutar(scope: Scope):Retorno {
        if(scope != null){
            const result = this.sentencias?.ejecutarPara(scope);
            // console.log("Verificacion Funcion");
            // console.log(result);
            if((result == undefined) && (this.tipo == Tipo.VOID)){
                return {value:null,tipo:Tipo.ERROR};
            }else{
                if(result != undefined){
                    if(result instanceof Retornar){
                        
                        let val = result.ejecutar(scope)
                        
                        let tipo = tablaAsignacion[this.tipo][val.tipo];
                        if(tipo != Tipo.ERROR){
                            const valFinal = CAST_IMPLICITO(this.tipo,val.tipo,val.value);
                            return {value:valFinal,tipo:tipo};
                        }else{
                            throw new Error("El valor de retorno es de tipo: \""+TipoString[val.tipo]+"\",no es compatible con el retorno \""+TipoString[this.tipo]+"\" de la funcion -> sub origen Linea: "+this.linea+" ,Columna: "+this.columna);
                        }
                    }else{
                        return {value:null,tipo:Tipo.VOID};
                    }
                }else{
                    throw new Error("El valor de retorno es indefinido ,no es compatible con el retorno \""+TipoString[this.tipo]+"\" de la funcion -> sub origen Linea: "+this.linea+" ,Columna: "+this.columna);
                }
            }
        }else{
            throw new Error("No esta inicializada la funcion!!!!");
        }
    }

    public agregar(instruccion: Instruccion) {
        this.sentencias?.agregarInstruccion(instruccion);
    }

    public ejecutarFuncion(valParametros:Exprecion[],scope:Scope):Retorno{
        if(valParametros.length == this.parametros.length){

            let newScope = new Scope(this.scopeGlobalArchivoOrigen);
            newScope.setFunciones(this.funcionesAccesible);
            this.viewScope = newScope;

            for (const vari of this.parametros) {
                vari.ejecutar(newScope);
            }

            try {
                for (let index = 0; index < valParametros.length; index++) {
                    const element = new Asignacion(this.parametros[index].getId(),valParametros[index],valParametros[index].linea,valParametros[index].columna);
                    element.ejecutarDiferido(newScope,scope);
                }
            } catch (error) {
                if(error instanceof Error){
                    throw new Error("-> sub derivacion -> Linea: "+this.linea+" ,Columna: "+this.columna+" "+error.message);
                }
            }
            return this.ejecutar(newScope);
        }else{
            throw new Error("La funcion tiene declarada: "+this.parametros.length+" parametros y esta enviando "+valParametros.length+"-> sub derivacion -> Linea: "+this.linea+" ,Columna: "+this.columna);
        }
    }

    public getId():string{
        return this.id;
    }

    public getSentencias():Sentencias|null{
        return this.sentencias;
    }

    public getTipo(){
        return this.tipo;
    }

    // public setRefFuncion(mapFun:Map<string,Funcion>){
    //     this.funcionesAccesible = mapFun;
    // }

    public setRefFuncion(funciones:ContenedorFunciones){
        this.funcionesAccesible = funciones;
    }

    public addRefFuncion(funciones:Almacenador){
        this.funtionsAccesibles = funciones;
    }

    public codigoReferencia():string{
        let contInt = 0;
        let contDouble = 0;
        let contBool = 0;
        let contChar = 0;
        let contString = 0;

        for (const param of this.parametros) {
            switch (param.getTipo()) {
                case Tipo.INT:
                    contInt++;
                    break;
                case Tipo.BOOLEAN:
                    contBool++;
                    break;
                case Tipo.CHAR:
                    contChar++;
                    break;
                case Tipo.STRING:
                    contString++;
                    break;
                case Tipo.DOUBLE:
                    contDouble++;
                    break;
            }
        }
        let code = String(contInt)+String(contDouble)+String(contBool)+String(contChar)+String(contString);
        return code;
    }

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        let subName = this.codigoReferencia();
        let node = "nodo_"+subName+"_"+"0";
        let decl = node+'[label = "<n>'+TipoString[this.tipo]+':'+this.id+'('+this.arrayTipos()+')"];'
        graphviz.declaraciones.push("node [shape=record,width=.1,height=.1];");
        graphviz.declaraciones.push(decl);
        this.sentencias?.graficar(scope,graphviz,subName,node);
    }

    private arrayTipos():string{
        let t:string[]=[];
        for (const iterator of this.parametros) {
            t.push(TipoString[iterator.getTipo()]);
        }
        return t.toString();
    }
}