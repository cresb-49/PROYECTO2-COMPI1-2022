export enum tipoErrores {
    LEXICO = 'Lexico',
    SINTACTICO = 'Sintactico',
    SEMANTICO = 'Semantico'
}

export class ErrorCRL {
    linea: number;
    columna: number
    tipo: string;
    mensaje: string;
    constructor(linea: number, columna: number, tipo: string, mensaje: string) {
        this.linea = linea;
        this.columna = columna;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
}