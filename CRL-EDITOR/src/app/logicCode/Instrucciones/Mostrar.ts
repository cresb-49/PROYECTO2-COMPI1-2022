import {Instruccion} from "../Abstracto/Instruccion";
import {Exprecion} from "../Abstracto/Exprecion";
import { Scope } from "../Symbolo/Scope";
import {ConsolaCRLComponent} from "../../consola-crl/consola-crl.component";
import { Key, Text } from "../Mostrar/RemplazoCadena";
const Parser = require('./../Grammar/cadenas')

export class Mostrar extends Instruccion{
    private valor:Exprecion;
    private expreciones:Array<Exprecion>;
    public consola:ConsolaCRLComponent;

    constructor(valor:Exprecion,expreciones : Array<Exprecion>,linea:number,columna:number){
        super(linea,columna);
        this.valor = valor;
        this.expreciones = expreciones;
    }
    public ejecutar(scope: Scope) {
        const valor = this.valor.ejecutar(scope);
        if(valor.value == null){
            this.consola.agregarPrint("null");
        }else{
            if(this.expreciones.length == 0){
                //console.log("Expreciones 0");
                this.consola.agregarPrint(valor.value);
            }else{
                //console.log("Expreciones n");
                this.consola.agregarPrint(this.arreglarParametros(valor.value,scope));
            }
        }
    }
    public setConsolaCRL(consola:ConsolaCRLComponent){
        this.consola = consola;
    }

    private arreglarParametros(cadena:any,scope:Scope){
        let cad:string = String(cadena);
        let result= Parser.parse(cad);
        let procesado:any[]=[]
        result.forEach((contenido:any) => {
            if(contenido instanceof Key){
                let index = contenido.getIndex();
                if(index < this.expreciones.length ){
                    let val = this.expreciones[index].ejecutar(scope);
                    procesado.push(val.value);
                }else{
                    procesado.push(contenido.key);
                }
            }else if(contenido instanceof Text){
                procesado.push(contenido.text);
            }
        });
        let res ="";
        for (const it of procesado) {
            res = res + it;
        }
        return res;
    }

    public setExpreciones(expreciones:Array<Exprecion>){
        this.expreciones = expreciones;
    }
}