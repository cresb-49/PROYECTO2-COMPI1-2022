import { AsigInstrucciones } from "../Abstracto/AsigIntrucciones";
import { Exprecion } from "../Abstracto/Exprecion";
import { Instruccion } from "../Abstracto/Instruccion";
import { Tipo } from "../Abstracto/Retorno";
import { Acceder } from "../Expresion/Acceder";
import { Literal } from "../Expresion/Literal";
import { OpcionOperacion, Operacion } from "../Expresion/Operacion";
import { Scope } from "../Symbolo/Scope";
import { Asignacion } from "./Asignacion";
import { Continuar } from "./Continuar";
import { Detener } from "./Detener";
import { Retornar } from "./Retornar";
import { Sentencias } from "./Sentencias";

export enum opcionPara {
    SUM_PARA,
    RES_PARA
}
export class Para extends Instruccion implements AsigInstrucciones {

    constructor(private varIterator: string, private valVar: Exprecion, private expr: Exprecion, private opPara: number,private sentencias:Sentencias|null,linea: number, columna: number) {
        super(linea, columna);
    }
    public ejecutar(scope: Scope):any {
        let newScope = new Scope(scope);
        let paso;
        if(this.opPara == opcionPara.SUM_PARA){
            paso = 1;
        }else{
            paso = -1;
        }
        let exp1 = new Acceder(this.varIterator,this.linea,this.columna);
        let exp2 = new Literal(paso,this.linea,this.columna,Tipo.INT);
        
        let value = this.valVar.ejecutar(newScope);
        newScope.declararVariable(this.varIterator,value.value,Tipo.INT);

        let newVal = new Operacion(exp1,exp2,OpcionOperacion.SUMA,this.linea,this.columna)
        let asignar = new Asignacion(this.varIterator,newVal,this.linea,this.columna);

        let condicion = this.expr.ejecutar(newScope);

        if(condicion.tipo != Tipo.BOOLEAN){
            throw new Error("La condicion de Para no es Boolean Linea: "+this.linea+" ,Columna: "+this.columna);
        }
        while (condicion.value) {
            const result = this.sentencias?.ejecutarPara(newScope);
            if(result instanceof Detener){
                break;
            }else if(result instanceof Continuar){
                asignar.ejecutar(newScope);
                condicion = this.expr.ejecutar(newScope);
                continue;
            }else if(result instanceof Retornar){
                return result.ejecutar(newScope);
            }
            asignar.ejecutar(newScope)
            condicion = this.expr.ejecutar(newScope);
            if(condicion.tipo != Tipo.BOOLEAN){
                throw new Error("La condicion de Para no es Boolean Linea: "+this.linea+" ,Columna: "+this.columna);
            }
        }
    }
    
    public agregar(instruccion: Instruccion) {
        this.sentencias?.agregarInstruccion(instruccion);
    }
    public getSentencias():Sentencias|null{
        return this.sentencias;
    }
}