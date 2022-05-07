import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";

export class DrawTS extends Instruccion{

    public ejecutado:boolean = false
    public dotCode:string ='';

    constructor(private s1:number,private s2:number,linea:number,columna:number){
        super(linea,columna);
    }

    public ejecutar(scope: Scope) {
        let code = scope.graficar(this.linea,this.columna);
        this.ejecutado = true;
        this.dotCode = code;
    }
}