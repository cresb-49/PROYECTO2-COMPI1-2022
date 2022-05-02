import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Principal } from "../Instrucciones/Principal";
import { Scope } from "../Symbolo/Scope";

export class CRL {
    private scopeGlobal:Scope;
    constructor(private consoleCRL:ConsolaCRLComponent,private funciones:Instruccion[],private principal:Principal){}

    public ejecutar(){
        this.scopeGlobal = new Scope(null);
        this.principal.ejecutar(this.scopeGlobal);
    }

}
