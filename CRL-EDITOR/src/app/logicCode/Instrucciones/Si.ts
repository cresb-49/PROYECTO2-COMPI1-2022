import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export class Si extends Instruccion {
    
    private condicion: Exprecion;
    private codeTrue: Instruccion | null;
    private codeFalse: Instruccion | null;

    constructor(condicion:Exprecion,codeTrue:Instruccion|null,codeFalse:Instruccion|null,linea:number,columna:number){
        super(linea,columna);
        this.condicion = condicion;
        this.codeTrue = codeTrue;
        this.codeFalse = codeFalse;
    }

    public ejecutar(scope: Scope) {
        const condicion = this.condicion.ejecutar(scope);

        if(condicion.tipo != Tipo.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
        }

        if(condicion.value){
            return this.codeTrue?.ejecutar(scope);
        }else{
            return this.codeFalse?.ejecutar(scope);
        }
    }
}