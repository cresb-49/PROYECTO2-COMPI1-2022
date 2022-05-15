import { Tipo, TipoString } from "../Abstracto/Retorno";
import { CAST_IMPLICITO, tablaAsignacion } from "../CasteoImplicito/CasteoImplicito";
import { Contenedor } from "../EDD/Contenedor";
import { Funcion } from "../Instrucciones/Funcion";
import { Almacenador } from "./Almacenador";
import { ContenedorFunciones } from "./ContenedorFunciones";
import { Simbolo } from "./Simbolo";

export class Scope {
    private variables: Map<string, Simbolo>;
    //public funciones: Map<string, Funcion>;
    public contenedorFunciones:ContenedorFunciones;
    public funciones:Almacenador;
    public anterior: Scope | null;

    constructor(anterior: Scope | null) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Almacenador();
        //this.funciones = new Map();
        this.contenedorFunciones = new ContenedorFunciones();
    }

    public declararVariable(id:string,valor:any,tipo:Tipo,linea:number,columna:number){
        if(!this.variables.has(id)){
            this.variables.set(id,new Simbolo(valor,id,tipo,linea,columna));
        }else{
            throw new Error("La variable \""+id+"\" ya esta definida en este ambito");
        }
    }

    public guardar(id: string, valor: any, tipo: Tipo) {
        let scope: Scope | null = this;
        let bandera = true;

        while (scope != null) {
            if (scope.variables.has(id)) {
                let re = scope.variables.get(id);
                bandera = false;
                if(re!=undefined){
                    let tipoAsig = tablaAsignacion[re.tipo][tipo];
                    if(tipoAsig!=Tipo.ERROR){
                        const valFinal = CAST_IMPLICITO(re.tipo,tipo,valor);
                        if(re.tipo == tipoAsig){
                            re.valor = valFinal;
                        }else{
                            throw new Error("No se puede asignar un valor de tipo \""+TipoString[tipo]+"\" a la variable \""+id+"\"");
                        }
                    }else{
                        throw new Error("No se puede asignar un valor de tipo \""+TipoString[tipo]+"\" a la variable \""+id+"\"");
                    }
                }
            }
            scope = scope.anterior;
        }
        if(bandera){
            throw new Error("La variable \""+id+"\" no esta definida en el porgrama");
        }
    }

    public guardarFuncion(id: string, funcion: Funcion) {
        if(!this.contenedorFunciones.hasLocal(id)){
            this.contenedorFunciones.set(id,funcion);
        }else{
            throw new Error("La funcion \""+id+"\" ya esta definida en el archivo");
        }
    }
    
    public saveFuncion(funcion:Funcion){
        let refCode = funcion.codigoReferencia();
        let id = funcion.getId();
        if(!this.funciones.hasLocal(id,refCode)){
            this.funciones.set(id,refCode,funcion);
        }else{
            throw new Error("La funcion \""+id+"\" ya esta definida en el archivo");
        }
    }

    // public guardarFuncion(id: string, funcion: Funcion) {
    //     if(!this.funciones.has(id)){
    //         this.funciones.set(id,funcion);
    //     }else{
    //         throw new Error("La funcion \""+id+"\" ya esta definida en el archivo");
    //     }
    // }

    public obtenerVariable(id: string): Simbolo | undefined | null {
        let scope: Scope | null = this;
        while (scope != null) {
            if(scope.variables.has(id)){
                return scope.variables.get(id);
            }
            scope = scope.anterior;
        }
        return null;
    }

    public obtenerFuncion(id:string):Funcion|undefined{
        let scope : Scope | null = this;
        while (scope != null) {
            if (scope.contenedorFunciones.has(id)) {
                return scope.contenedorFunciones.get(id);
            }
            scope = scope.anterior;
        }
        return undefined;
    }

    public getFuncion(id:string,ref:string):Funcion|undefined{
        let scope:Scope|null=this;
        while(scope != null){
            if(scope.funciones.has(id,ref)){
                return scope.funciones.get(id,ref);
            }
            scope = scope.anterior;
        }
        return undefined;
    }


    public getFunciones(id:string):Map<string,Funcion>|undefined{
        let scope:Scope|null=this;
        while(scope != null){
            if(scope.funciones.has2(id)){
                return scope.funciones.get2(id);
            }
            scope = scope.anterior;
        }
        return undefined;
    }

    // public setMapFunciones(mapFun:Map<string,Funcion>){
    //     this.funciones = mapFun;
    // }

    public setFunciones(funciones:ContenedorFunciones){
        this.contenedorFunciones = funciones;
    }

    public graficar(linea:number,columna:number):string{
        let columna1:string[]=[]
        let columna2:string[]=[]
        columna1.push("Origen Ejecucion");
        columna2.push("Linea: "+linea+" ,Columna: "+columna);
        let keys = this.variables.keys();
        for (const key of keys) {
            let val = this.variables.get(key);
            if(val != undefined){
                columna1.push(key);
                columna2.push('Valor: '+val.valor+' ,Linea: '+val.linea+' ,Columna: '+val.columna+' ,Tipo: '+TipoString[val.tipo])
            }
        }
        let c1 ='';
        let c2 ='';
        for (const col1 of columna1) {
            c1+=col1+'|';
        }
        for (const col2 of columna2) {
            c2+=col2+'|';
        }
        c1=c1.slice(0,-1);
        c2=c2.slice(0,-1);
        return 'digraph TS {node [shape=record];ts [label="{'+c1+'}|{'+c2+'}"];}';
    }
}