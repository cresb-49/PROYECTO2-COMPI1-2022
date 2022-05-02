import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";
import { Sentencias } from "./Sentencias";

export class Mientras extends Instruccion implements AsigInstrucciones{

    constructor(private condicion : Exprecion, private sentencias : Sentencias|null, linea : number, columna : number){
        super(linea, columna);
    }
    
    public ejecutar(scope: Scope) {
        //TODO: realizar logica de ciclo mientras
    }
    public agregar(instruccion: Instruccion) {
        this.sentencias?.agregarInstruccion(instruccion);
    }
    public getSentencias():Sentencias|null{
        return this.sentencias;
    }
    
}