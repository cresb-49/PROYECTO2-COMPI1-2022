import { Tipo } from "../Abstracto/Retorno";

export class Simbolo{
    public valor:any;
    public id:string;
    public tipo:Tipo;
    public linea:number;
    public columna:number;

    constructor (valor:any,id:string,tipo:Tipo,linea:number,columna:number){
        this.valor = valor;
        this.id=id;
        this.tipo=tipo;
        this.linea=linea;
        this.columna=columna;
    }
}