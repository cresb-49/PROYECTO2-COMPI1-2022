import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Declaracion } from "../Instrucciones/Declaracion";
import { Funcion } from "../Instrucciones/Funcion";
import { Importar } from "../Instrucciones/Importar";
import { Principal } from "../Instrucciones/Principal";
import { RefScope } from "../Symbolo/RefScope";
import { Scope } from "../Symbolo/Scope";

export class CRL {
    private scopeGlobal:Scope;
    private refOtherScope:RefScope[]=[];


    constructor(private nombre:String,private funciones:Instruccion[],private principal:Principal|null,private varaiblesGlobales:Array<Declaracion>,private imports:Array<Importar>){}

    public ejecutar(){
        if(this.principal!=null){
            this.principal.ejecutar(this.scopeGlobal);
        }
    }

    public inicializar(){
        this.scopeGlobal = new Scope(null);
        this.varaiblesGlobales.forEach(variable => {
            variable.ejecutar(this.scopeGlobal);
        });

        for (let fun of this.funciones) {
            if(!(fun instanceof Principal)){
                if(fun instanceof Funcion){
                    this.scopeGlobal.guardarFuncion(fun.getId(),fun);
                    fun.setRefFuncion(this.scopeGlobal.funciones);
                }
            }
        }
    }   

    public getPrincipal(){
        return this.principal;
    }

    public getNombre(){
        return this.nombre;
    }

    public getImports(){
        return this.imports;
    }

    public getScopeGlobal():Scope{
        return this.scopeGlobal;
    }
    
    public addRefScope(refScope:RefScope){
        this.refOtherScope.push(refScope);
    }

    public getRefOtherScope():RefScope[]{
        return this.refOtherScope;
    }
}
