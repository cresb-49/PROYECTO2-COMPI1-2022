import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo, TipoString } from "../Abstracto/Retorno";
import { castDiv, castMenos, castMod, castPor, castPot, castSuma } from "../CasteoImplicito/TablasTipos";
import { Scope } from "../Symbolo/Scope";

export enum OpcionOperacion{
    SUMA,
    RESTA,
    MUL,
    DIV,
    MOD,
    POT,
}

export const TipoOperacion =['+','-','*','/','%','^'];

export class Operacion extends Exprecion{
    
    constructor (private izquierda:Exprecion,private derecha:Exprecion,private tipo:OpcionOperacion,linea:number,columna:number){
        super(linea,columna);
    }
    public ejecutar(scope: Scope): Retorno {
        let result : Retorno;
        const valIzquierdo = this.izquierda.ejecutar(scope);
        const valDerecho = this.derecha.ejecutar(scope);
        if(valDerecho.value == null||valIzquierdo.value == null){
            if(valIzquierdo.value == null){
                throw new Error("No se puede operar con un valor nulo Linea: "+this.linea+" ,Columna: "+this.columna+" ->  null "+TipoOperacion[this.tipo]+" "+valDerecho.value);
            }else{
                throw new Error("No se puede operar con un valor nulo Linea: "+this.linea+" ,Columna: "+this.columna+" ->  "+valDerecho.value+" "+TipoOperacion[this.tipo]+" null");
            }
        }
        let resultCast;
        switch (this.tipo) {
            case OpcionOperacion.SUMA:
                resultCast = castSuma[valIzquierdo.tipo][valDerecho.tipo];
                if(resultCast == Tipo.ERROR || resultCast == Tipo.VOID){
                    throw new Error("La suma de un \""+TipoString[valIzquierdo.tipo]+"\" y \""+TipoString[valDerecho.tipo]+"\" no es correcta ,Linea: "+this.linea+" ,Columna: "+this.columna);
                }else{
                    //let val = valIzquierdo.value+valDerecho.value
                    let val = this.valueSuma(valIzquierdo)+this.valueSuma(valDerecho);
                    result = {value:val,tipo:resultCast};
                }
                break;
            case OpcionOperacion.RESTA:
                resultCast = castMenos[valIzquierdo.tipo][valDerecho.tipo];
                if(resultCast == Tipo.ERROR || resultCast == Tipo.VOID){
                    throw new Error("La resta de un \""+TipoString[valIzquierdo.tipo]+"\" y \""+TipoString[valDerecho.tipo]+"\" no es correcta ,Linea: "+this.linea+" ,Columna: "+this.columna);
                }else{
                    let val = valIzquierdo.value-valDerecho.value
                    result = {value:val,tipo:resultCast};
                }
                break;
            case OpcionOperacion.MUL:
                resultCast = castPor[valIzquierdo.tipo][valDerecho.tipo];
                if(resultCast == Tipo.ERROR || resultCast == Tipo.VOID){
                    throw new Error("La multiplicacion de un \""+TipoString[valIzquierdo.tipo]+"\" y \""+TipoString[valDerecho.tipo]+"\" no es correcta ,Linea: "+this.linea+" ,Columna: "+this.columna);
                }else{
                    let val = valIzquierdo.value*valDerecho.value
                    result = {value:val,tipo:resultCast};
                }
                break;
            case OpcionOperacion.DIV:
                resultCast = castDiv[valIzquierdo.tipo][valDerecho.tipo];
                if(resultCast == Tipo.ERROR || resultCast == Tipo.VOID){
                    throw new Error("La divicion de un \""+TipoString[valIzquierdo.tipo]+"\" y \""+TipoString[valDerecho.tipo]+"\" no es correcta ,Linea: "+this.linea+" ,Columna: "+this.columna);
                }else{
                    let val = valIzquierdo.value/valDerecho.value
                    result = {value:val,tipo:resultCast};
                }
                break;
            case OpcionOperacion.MOD:
                resultCast = castMod[valIzquierdo.tipo][valDerecho.tipo];
                if(resultCast == Tipo.ERROR || resultCast == Tipo.VOID){
                    throw new Error("El modulo de un \""+TipoString[valIzquierdo.tipo]+"\" y \""+TipoString[valDerecho.tipo]+"\" no es correcta ,Linea: "+this.linea+" ,Columna: "+this.columna);
                }else{
                    let val = valIzquierdo.value%valDerecho.value
                    result = {value:val,tipo:resultCast};
                }
                break;
            case OpcionOperacion.POT:
                resultCast = castPot[valIzquierdo.tipo][valDerecho.tipo];
                if(resultCast == Tipo.ERROR || resultCast == Tipo.VOID){
                    throw new Error("La potencia de un \""+TipoString[valIzquierdo.tipo]+"\" y \""+TipoString[valDerecho.tipo]+"\" no es correcta ,Linea: "+this.linea+" ,Columna: "+this.columna);
                }else{
                    let val = Math.pow(valIzquierdo.value,valDerecho.value);
                    result = {value:val,tipo:resultCast};
                }
                break;
            default:
                result={value:null,tipo:Tipo.ERROR};
                break;
        }
        return result;
    }


    public valueSuma(element:any):any{
        if(element.tipo == Tipo.BOOLEAN){
            return this.getBooleanNumeric(element.value);
        }else if(element.tipo == Tipo.CHAR){
            return this.getCharNumeric(element.value);
        }else{
            return element.value;
        }
    }

    public getBooleanNumeric(state:boolean){
        if(state){
            return 1;
        }
        else{
            return 0;
        }
    }

    public getCharNumeric(caracter:String){
        return caracter.charCodeAt(0);
    }
}
