import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export enum opcionPara {
    SUM_PARA,
    RES_PARA
}
export class Para extends Instruccion {

    constructor(private varIterator: string, private valVar: Exprecion, private expr: Exprecion, private opPara: number,private instrucciones:Instruccion|null,linea: number, columna: number) {
        super(linea, columna);
    }
    public ejecutar(scope: Scope) {
        //return {linea : this.linea, columna: this.columna, type : 'Parar'};
    }

}