import { Tipo, TipoString } from "../Abstracto/Retorno";
import { Funcion } from "../Instrucciones/Funcion";
import { Simbolo } from "./Simbolo";

export class Scope {
    private variables: Map<string, Simbolo>;
    public funciones: Map<string, Funcion>;
    public anterior: Scope | null;

    constructor(anterior: Scope | null) {
        this.anterior = anterior;
        this.variables = new Map();
        this.funciones = new Map();
    }

    public declararVariable(id:string,valor:any,tipo:Tipo){
        if(!this.variables.has(id)){
            this.variables.set(id,new Simbolo(valor,id,tipo));
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
                if(re?.tipo == tipo){
                    re.valor = valor;
                }else{
                    throw new Error("No se puede asignar un valor de tipo \""+TipoString[tipo]+"\" a la varaible");
                }
            }
            scope = scope.anterior;
        }
        if(bandera){
            throw new Error("La variable \""+id+"\" no esta definida en el porgrama");
        }
    }

    public guardarFuncion(id: string, funcion: Funcion) {
        if(!this.funciones.has(id)){
            this.funciones.set(id,funcion);
        }else{
            throw new Error("La funcion \""+id+"\" ya esta definida en el archivo");
        }
    }

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
            if (scope.funciones.has(id)) {
                return scope.funciones.get(id);
            }
            scope = scope.anterior;
        }
        return undefined;
    }

    public obtenerGlobal():Scope{
        let scope : Scope | null = this;
        while (scope?.anterior!= null) {
            scope = scope.anterior;
        }
        return scope;
    }

    public setMapFunciones(mapFun:Map<string,Funcion>){
        this.funciones = mapFun;
    }
}