import { Contenedor } from "../EDD/Contenedor";
import { Funcion } from "../Instrucciones/Funcion";

export class Almacenador {
    private funciones:Contenedor<Funcion>[]=[]
    constructor() {
        this.funciones.push(new Contenedor());
    }

    public has(id:string,ref:string){
        for(const con of this.funciones){
            if(con.has(id,ref)){
                return true;
            }
        }
        return false;
    }


    public has2(id:string){
        for(const con of this.funciones){
            if(con.has2(id)){
                return true;
            }
        }
        return false;
    }

    public get(id:string,ref:string):Funcion|undefined{
        for(const con of this.funciones){
            if(con.has(id,ref)){
                return con.get(id,ref);
            }
        }
        return undefined;
    }

    public get2(id:string):Map<string,Funcion>|undefined{
        for(const con of this.funciones){
            if(con.has2(id)){
                return con.get2(id);
            }
        }
        return undefined;
    }

    public set(id:string,ref:string,funcion:Funcion){
        this.funciones[0].set(id,ref,funcion);
    }

    public hasLocal(id:string,ref:string){
        return this.funciones[0].has(id,ref);
    }

    public getArrayMapFunciones():any{
        this.funciones;
    }

    public agregarRefOtrosArchivos(contenedorRef:Almacenador){
        for (const iterator of contenedorRef.funciones) {
            this.funciones.push(iterator);
        }
    }
}