import { Exprecion } from "../Abstracto/Exprecion";
import { Retorno, Tipo } from "../Abstracto/Retorno";
import { Scope } from "../Symbolo/Scope";

export class Literal extends Exprecion {

    constructor(private valor: any, liena: number, columna: number, private tipo: number) {
        super(liena, columna);
    }

    public ejecutar(scope: Scope): Retorno {
        switch (this.tipo) {
            case Tipo.INT:
                return { value: Number(this.valor), tipo: Tipo.INT }
            case Tipo.DOUBLE:
                return { value: Number(this.valor), tipo: Tipo.DOUBLE }
            case Tipo.STRING:
                return { value: this.valor, tipo: Tipo.STRING }
            case Tipo.CHAR:
                return { value: this.valor, tipo: Tipo.CHAR }
            case Tipo.BOOLEAN:
                return { value: this.valor, tipo: Tipo.BOOLEAN }
            default:
                return { value: null, tipo: Tipo.ERROR }
        }
    }
}