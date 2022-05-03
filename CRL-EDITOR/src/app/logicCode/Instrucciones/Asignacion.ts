import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Asignacion extends Instruccion{

    constructor(private id:string,private valor:Exprecion,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        const result = this.valor.ejecutar(scope);
        scope.guardar(this.id,result.value,result.tipo);
    }

    public ejecutarDiferido(scopeGuadardado: Scope,scopeOrigenInfo:Scope) {
        const result = this.valor.ejecutar(scopeOrigenInfo);
        scopeGuadardado.guardar(this.id,result.value,result.tipo);
    }

    public getId(){
        return this.id;
    }
    
}