import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";
import { Sentencias } from "./Sentencias";

export class Si extends Instruccion implements AsigInstrucciones{
    
    private condicion: Exprecion;
    private codeTrue: Sentencias | null;
    private codeFalse: Sentencias | null;

    constructor(condicion:Exprecion,codeTrue:Sentencias|null,codeFalse:Sentencias|null,linea:number,columna:number){
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
    
    public agregar(instruccion: Instruccion) {
        this.codeTrue?.agregarInstruccion(instruccion);
    }

    public setCodeFalse(codeFalse:Sentencias|null){
        this.codeFalse = codeFalse;
    }
}