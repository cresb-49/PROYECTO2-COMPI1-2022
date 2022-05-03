import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";


export class ObtenerValFuncion extends Exprecion{

    constructor(private id:string,private parametros:Array<Exprecion>,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const funcion = scope.obtenerFuncion(this.id);
        if(funcion == undefined){
            throw new Error("No existe la funcion \""+this.id+"\" en el programa ,Linea: "+this.linea+" ,Columna: "+this.columna);
        }else{
            try {
                let r = funcion.ejecutarFuncion(this.parametros,scope);
                // console.log("Verificacion llamada")
                // console.log(r)
                return{value:r.value,tipo:r.tipo};
            } catch (error) {
                if(error instanceof Error){
                    throw new Error("Error en ejecucion de funcion ,Linea: "+this.linea+" ,Columna: "+this.columna+" "+error.message);
                }
            }
        }
        return{value:null,tipo:Tipo.ERROR};
    }

}