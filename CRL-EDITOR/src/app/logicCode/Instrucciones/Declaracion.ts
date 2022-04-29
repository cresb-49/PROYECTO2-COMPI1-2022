import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class Declaracion extends Instruccion{

    private id : string;
    private valor : Exprecion;
    private tipo:number;

    constructor(id:string,tipo:number,valor: Exprecion, linea : number, columna: number){
        super(linea, columna);
        this.id = id;
        this.valor = valor;
        this.tipo=tipo;
    }

    public setTipo(tipo:number){
        this.tipo=tipo;
    }

    public ejecutar(scope: Scope) {
        
        //TODO:Realizar la logica del la declaracion de variables
        
        
        // if(this.valor==null){
        //     scope.guardar(this.id, this.valor,Tipo.ERROR);
        // }else{
        //     const val = this.valor.ejecutar(scope);
        //     scope.guardar(this.id, val.value, val.tipo);
        // }
    }

}