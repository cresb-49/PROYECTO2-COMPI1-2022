import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export class Mientras extends Instruccion{
    private condicion : Instruccion;
    private codeMientras : Instruccion|null;
    constructor(condicion : Instruccion, codeMientras : Instruccion|null, linea : number, columna : number){
        super(linea, columna);
        this.condicion=condicion;
        this.codeMientras = codeMientras;
    }

    public ejecutar(scope: Scope) {
        let condicion = this.condicion.ejecutar(scope);
        if(condicion.tipo != Tipo.BOOLEAN){
            throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
        }

        while (condicion.valor) {
            const elementos = this.codeMientras?.ejecutar(scope);
            if(elementos != null || elementos != undefined){
                if(elementos.tipo == 'Detener'){
                    break;
                }else if(elementos.tipo == 'Continuar'){
                    condicion = this.condicion.ejecutar(scope);
                    continue;
                }else{
                    return elementos;
                }
            }
            condicion = this.condicion.ejecutar(scope);
            if(condicion.tipo != Tipo.BOOLEAN){
                throw {error: "La condicion no es booleana", linea: this.linea, columna : this.columna};
            }
        }
    }
    
}