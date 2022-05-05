import { Scope } from "../Symbolo/Scope";
import { Retorno, Tipo } from "./Retorno";
import { castSuma,castDiv,castMenos,castMod,castPor,castPot } from "../CasteoImplicito/TablasTipos";
import { GraficoDot } from "../GraficosDot/GraficoDot";


export abstract class Exprecion{
    public linea:number;
    public columna:number;

    constructor(linea:number,columna:number){
        this.linea = linea;
        this.columna = columna;
    }

    public abstract ejecutar(scope:Scope):Retorno;

    public abstract graficar(scope:Scope,graphviz:GraficoDot,padre:string):any;

    public tipoDominanteSuma(tipo1:Tipo,tipo2:Tipo):Tipo{
        const tipo = castSuma[tipo1][tipo2];
        return tipo;
    }

    public tipoDominanteDiv(tipo1:Tipo,tipo2:Tipo):Tipo{
        const tipo = castDiv[tipo1][tipo2];
        return tipo;
    }

    public tipoDominanteMenos(tipo1:Tipo,tipo2:Tipo):Tipo{
        const tipo = castMenos[tipo1][tipo2];
        return tipo;
    }

    public tipoDominanteMod(tipo1:Tipo,tipo2:Tipo):Tipo{
        const tipo = castMod[tipo1][tipo2];
        return tipo;
    }

    public tipoDominantePor(tipo1:Tipo,tipo2:Tipo):Tipo{
        const tipo = castPor[tipo1][tipo2];
        return tipo;
    }
    
    public tipoDominantePot(tipo1:Tipo,tipo2:Tipo):Tipo{
        const tipo = castPot[tipo1][tipo2];
        return tipo;
    }
    
}