import { Instruccion } from "../Abstracto/Instruccion";
import { Pila } from "../EDD/Pila";

export class EmpaquetarInstrucciones {
    constructor(private instrucciones:any[]) {}

    public start(){
        this.logica(this.instrucciones)
    }
    private logica(instrucciones:any[]){
        let pila = new Pila();
        pila.push(0);
        instrucciones.forEach((inst:Instruccion)=>{
            if(inst.getScope2()>pila.peek()){
                pila.push(inst.getScope2());
            }
        });
        let actualScope = pila.pop()
        let innerScope = pila.pop()
        
        console.log("Scope mas alto: "+actualScope);
        console.log("Scope anterior: "+innerScope);

        
        
        
    }
}