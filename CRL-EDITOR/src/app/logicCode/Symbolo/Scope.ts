import { Tipo } from "../Abstracto/Retorno";
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

    public guardar(id: string, valor: any, tipo: Tipo) {
        let scope: Scope | null = this;
        while (scope != null) {
            if (scope.variables.has(id)) {
                scope.variables.set(id, new Simbolo(valor, id, tipo));
                return;
            }
            scope = scope.anterior;
        }
        this.variables.set(id, new Simbolo(valor, id, tipo));
    }

    public guardarFuncion(id: string, funcion: Funcion) {
        this.funciones.set(id, funcion);
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
}