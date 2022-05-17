import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Literal } from "../Expresion/Literal";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";
import { Asignacion } from "./Asignacion";
import { Continuar } from "./Continuar";
import { Declaracion } from "./Declaracion";
import { Detener } from "./Detener";
import { Retornar } from "./Retornar";

export class Sentencias extends Instruccion {
    
    private consolaErrores: ConsolaCRLComponent;
    private viewScope: Scope | null;

    private VARAIBLES_DECLARADAS: Declaracion[] = [];

    constructor(private instrucciones: Array<Instruccion>, linea: number, columna: number) {
        super(linea, columna);
    }
    public ejecutar(scope: Scope): any {
        const newScope = new Scope(scope);
        this.viewScope = newScope;
        for (const instr of this.instrucciones) {
            try {
                if (instr instanceof Detener) {
                    return instr;
                } else if (instr instanceof Continuar) {
                    return instr;
                } else if (instr instanceof Retornar) {
                    let elemento = instr.ejecutar(newScope);
                    return new Retornar(new Literal(elemento.value,instr.linea,instr.columna,elemento.tipo),instr.linea,instr.columna);
                }else{
                    const elemento = instr.ejecutar(newScope);
                    if(elemento instanceof Detener){
                        return elemento;
                    }else if(elemento instanceof Continuar){
                        return elemento;
                    }else if(elemento instanceof Retornar){
                        let ele = elemento.ejecutar(newScope);
                        return new Retornar(new Literal(ele.value,instr.linea,instr.columna,ele.tipo),instr.linea,instr.columna);
                    }
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (instr instanceof Declaracion) {
                        throw new Error("Error al declarar variable \"" + instr.getId() + "\" ,Linea: " + instr.linea + " ,Columna: " + instr.columna + " " + error.message);
                    } else if (instr instanceof Asignacion) {
                        throw new Error("Error al asignar valor a \"" + instr.getId() + "\" ,Linea: " + instr.linea + " ,Columna: " + instr.columna + " " + error.message);
                    } else {
                        throw new Error(error.message);
                    }
                }
                break;
            }
        }
    }
    
    public ejecutarPara(scope: Scope):any {
        this.viewScope = scope;
        for (const instr of this.instrucciones) {
            try {
                if (instr instanceof Detener) {
                    return instr;
                } else if (instr instanceof Continuar) {
                    return instr;
                } else if (instr instanceof Retornar) {
                    let elemento = instr.ejecutar(scope);
                    return new Retornar(new Literal(elemento.value,instr.linea,instr.columna,elemento.tipo),instr.linea,instr.columna);
                }else{
                    const elemento = instr.ejecutar(scope);
                    if(elemento instanceof Detener){
                        return elemento;
                    }else if(elemento instanceof Continuar){
                        return elemento;
                    }else if(elemento instanceof Retornar){
                        let ele = elemento.ejecutar(scope);
                        return new Retornar(new Literal(ele.value,instr.linea,instr.columna,ele.tipo),instr.linea,instr.columna);
                    }
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (instr instanceof Declaracion) {
                        throw new Error("Error al declarar variable \"" + instr.getId() + "\" ,Linea: " + instr.linea + " ,Columna: " + instr.columna + " " + error.message);
                    } else if (instr instanceof Asignacion) {
                        throw new Error("Error al asignar valor a \"" + instr.getId() + "\" ,Linea: " + instr.linea + " ,Columna: " + instr.columna + " " + error.message);
                    } else {
                        throw new Error(error.message);
                    }
                }
                break;
            }
        }
    }

    public setConsola(consolaErrores: ConsolaCRLComponent) {
        this.consolaErrores = consolaErrores;
    }

    public agregarInstruccion(instruccion: Instruccion) {
        this.instrucciones.push(instruccion);
    }

    public verrificarExistenciaVar(nueva: Declaracion): boolean {
        let result = this.VARAIBLES_DECLARADAS.filter((n: Declaracion) => n.getId() == nueva.getId());
        this.VARAIBLES_DECLARADAS.push(nueva);
        if (result.length == 0) {
            return false
        } else {
            return true
        }
    }

    public agregarVarsPrecedencia(vars: Declaracion[]) {
        this.VARAIBLES_DECLARADAS = this.VARAIBLES_DECLARADAS.concat(vars);
    }

    public graficar(scope: Scope, graphviz: GraficoDot, subNameNode: string, padre: string) {
        for (const intructions of this.instrucciones) {
            intructions.graficar(scope,graphviz,subNameNode,padre);
        }
    }
}