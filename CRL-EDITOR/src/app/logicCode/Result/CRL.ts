import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Declaracion } from "../Instrucciones/Declaracion";
import { Importar } from "../Instrucciones/Importar";
import { Principal } from "../Instrucciones/Principal";
import { Scope } from "../Symbolo/Scope";

export class CRL {
    private scopeGlobal:Scope;
    constructor(private consoleCRL:ConsolaCRLComponent,private funciones:Instruccion[],private principal:Principal|null,private varaiblesGlobales:Array<Declaracion>,private imports:Array<Importar>){}

    public ejecutar(){
        this.scopeGlobal = new Scope(null);
        this.varaiblesGlobales.forEach(variable => {
            variable.ejecutar(this.scopeGlobal);
        });
        if(this.principal!=null){
            this.principal.ejecutar(this.scopeGlobal);
        }
    }
}
