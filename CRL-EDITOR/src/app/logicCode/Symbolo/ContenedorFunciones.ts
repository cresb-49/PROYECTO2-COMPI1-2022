import { Funcion } from "../Instrucciones/Funcion";

export class ContenedorFunciones {
    private funciones:Map<string,Funcion>[]=[]
    constructor() {
        this.funciones.push(new Map());
    }

    public has(id:string){

        for (const map of this.funciones) {
            if(map.has(id)){
                return true;
            }
        }
        return false;
    }

    public get(id:string):Funcion|undefined{
        for (const map of this.funciones) {
            if(map.has(id)){
                return map.get(id);
            }
            
        }
        return undefined;
    }

    public set(id:string,funcion:Funcion){
        this.funciones[0].set(id,funcion);
    }

    public hasLocal(id:string){
        return this.funciones[0].has(id);
    }

    public getArrayMapFunciones():any{
        this.funciones;
    }

    public agregarRefOtrosArchivos(contenedorRef:ContenedorFunciones){
        for (const iterator of contenedorRef.funciones) {
            this.funciones.push(iterator);
        }
    }
}