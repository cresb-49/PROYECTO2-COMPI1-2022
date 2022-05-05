import { runInThisContext } from "vm";
import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno } from "../Abstracto/Retorno";
import { GraficoDot } from "../GraficosDot/GraficoDot";
import { Scope } from "../Symbolo/Scope";

export class Acceder extends Exprecion {

    constructor(private id: string, linea: number, columna: number) {
        super(linea, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        const recuperacion = scope.obtenerVariable(this.id);
        if (recuperacion == null) {
            throw new Error("La variable \"" + this.id + "\" no existe, Linea: " + this.linea + " ,Columna: " + this.columna);
        }
        return { value: recuperacion.valor, tipo: recuperacion.tipo }
    }

    public graficar(scope: Scope, graphviz: GraficoDot, padre: string) {
        let num = graphviz.declaraciones.length + 1;
        let node = "nodo" + num + ' [label="<f0> ID |<f1> ' + this.id + '"];';
        graphviz.declaraciones.push(node);
        if (padre.length != 0) {
            let relacion = padre + ' -> ' + "nodo" + num
            graphviz.relaciones.push(relacion);
        }
    }
}