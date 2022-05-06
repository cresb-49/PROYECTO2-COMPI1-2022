import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";


export class ObtenerValFuncion extends Exprecion {

    constructor(private id: string, private parametros: Array<Exprecion>, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        let code = this.codigoReferencia(scope);
        const funcion = scope.obtenerFuncion(this.id);
        if (funcion == undefined) {
            throw new Error("No existe la funcion \"" + this.id + "\" en el programa ,Linea: " + this.linea + " ,Columna: " + this.columna);
        } else {
            if (funcion.getTipo() == Tipo.VOID) {
                throw new Error("No puede llamar a operar con una funcion de tipo Void ,Linea: " + this.linea + " ,Columna: " + this.columna);
            } else {
                try {
                    let r = funcion.ejecutarFuncion(this.parametros, scope);
                    // console.log("Verificacion llamada")
                    // console.log(r)
                    return { value: r.value, tipo: r.tipo };
                } catch (error) {
                    if (error instanceof Error) {
                        throw new Error("Error en ejecucion de funcion ,Linea: " + this.linea + " ,Columna: " + this.columna + " " + error.message);
                    }
                }
            }
        }
        return { value: null, tipo: Tipo.ERROR };
    }

    public graficar(scope: Scope, graphviz: GraficoDot, padre: string) {
        let num = graphviz.declaraciones.length + 1;
        let node = "nodo" + num + ' [label="<f0> Funcion |<f1> ' + this.id + '"];';
        graphviz.declaraciones.push(node);
        if (padre.length != 0) {
            let relacion = padre + ' -> ' + "nodo" + num
            graphviz.relaciones.push(relacion);
        }
    }

    public codigoReferencia(scope:Scope):string{
        let contInt = 0;
        let contBool = 0;
        let contChar = 0;
        let contString = 0;
        let contDouble = 0;

        for (const param of this.parametros) {
            const exp = param.ejecutar(scope);
            switch (exp.tipo) {
                case Tipo.INT:
                    contInt++;
                    break;
                case Tipo.BOOLEAN:
                    contBool++;
                    break;
                case Tipo.CHAR:
                    contChar++;
                    break;
                case Tipo.STRING:
                    contString++;
                    break;
                case Tipo.DOUBLE:
                    contDouble++;
                    break;
            }
        }
        let code = "-"+String(contInt)+String(contBool)+String(contChar)+String(contString)+String(contDouble)
        console.log("Rev code: "+code);
        return code;
    }
}