import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { Instruccion } from "../Abstracto/Instruccion";
import { Funcion } from "../Instrucciones/Funcion";
import { Importar } from "../Instrucciones/Importar";
import { Mostrar } from "../Instrucciones/Mostrar";
import { Principal } from "../Instrucciones/Principal";

export class Organizar {

    private subAST: any[] = [];
    private imports:any[] = [];

    constructor(private ast: any[],private consolaCRL:ConsolaCRLComponent) { }

    public start():any[] {
        return this.calcularSubsAST();
    }

    private calcularSubsAST():any[] {
        let funcionesPadre: any[] = [];
        let restoInstrucciones: any[] = [];
        this.ast.forEach((instruccion: any) => {
            if (instruccion instanceof Principal) {
                funcionesPadre.push(instruccion)
            } else if (instruccion instanceof Funcion) {
                funcionesPadre.push(instruccion)
            } else if(instruccion instanceof Importar){
                this.imports.push(instruccion);
            }else if(instruccion instanceof Mostrar){
                instruccion.setConsolaCRL(this.consolaCRL);
                restoInstrucciones.push(instruccion);
            }else {
                restoInstrucciones.push(instruccion);
            }
        });
        console.log("Funciones padre:");
        console.log(funcionesPadre);
        return funcionesPadre;
    }

    private segmentarCodigo(instrucciones:any[],padres:any[]){
        let result:any[] = [];
        let t1:any[] = []
        let t2:any[] = []
        let temp2:any[] = instrucciones;
        padres.forEach((padre:Instruccion)=>{
            temp2.forEach((inst:any)=>{
                if(inst.linea <= padre.linea){
                    t1.push(inst);
                }else{
                    t2.push(inst);
                }
            })
            result.push(t1);
            t1=[];
            temp2=t2;
            t2=[];
        });
        return result;
    }
}