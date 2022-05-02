import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Instruccion } from "../Abstracto/Instruccion";
import { Scope } from "../Symbolo/Scope";
import { Sentencias } from "./Sentencias";

export class Principal extends Instruccion implements AsigInstrucciones {
    
    constructor(private file:string,private sentencias:Sentencias|null,linea:number,columna:number) {
        super(linea,columna);
        this.setScope2(0);
    }
    
    public ejecutar(scope: Scope) {
        //TODO: Realiozar la logica de la instruccion principal
    }

    public agregar(instruccion: Instruccion) {
        this.sentencias?.agregarInstruccion(instruccion);
    }
}