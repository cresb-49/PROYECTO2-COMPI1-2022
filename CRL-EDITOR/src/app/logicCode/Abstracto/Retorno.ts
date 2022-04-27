export enum Tipo{
    DOUBLE =0,
    BOOLEAN =1,
    STRING =2,
    INT =3,
    CHAR =4,
    VOID =5,
    ERROR =6,
}

export type Retorno ={
    value: any,
    tipo: Tipo
}