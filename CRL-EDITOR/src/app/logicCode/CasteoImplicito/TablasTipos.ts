import { Tipo } from "../Abstracto/Retorno";

export const castSuma =[
                /*  DOUBLE      BOOLEAN     STRING      INT         CHAR       VOID      ERROR*/
    /*DOUBLE*/  [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.STRING,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*BOOLEAN*/ [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.STRING,Tipo.INT   ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*STRING*/  [Tipo.STRING,Tipo.STRING,Tipo.STRING,Tipo.STRING,Tipo.STRING,Tipo.ERROR,Tipo.ERROR],
    /*INT*/     [Tipo.DOUBLE,Tipo.INT   ,Tipo.STRING,Tipo.INT   ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
    /*CHAR*/    [Tipo.DOUBLE,Tipo.ERROR ,Tipo.STRING,Tipo.INT   ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
    /*VOID*/    [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*ERROR*/   [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR]
];
export const castMenos =[
                /*  DOUBLE      BOOLEAN     STRING      INT         CHAR       VOID      ERROR*/
    /*DOUBLE*/  [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*BOOLEAN*/ [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.INT   ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*STRING*/  [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*INT*/     [Tipo.DOUBLE,Tipo.INT   ,Tipo.ERROR,Tipo.INT   ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
    /*CHAR*/    [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.INT   ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
    /*VOID*/    [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*ERROR*/   [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR]
];
export const castPor =[
                /*  DOUBLE      BOOLEAN     STRING      INT         CHAR       VOID      ERROR*/
    /*DOUBLE*/  [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*BOOLEAN*/ [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.INT   ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*STRING*/  [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*INT*/     [Tipo.DOUBLE,Tipo.INT   ,Tipo.ERROR,Tipo.INT   ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
    /*CHAR*/    [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.INT   ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
    /*VOID*/    [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*ERROR*/   [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR]
];
export const castDiv =[
                /*  DOUBLE      BOOLEAN     STRING      INT         CHAR       VOID      ERROR*/
    /*DOUBLE*/  [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*BOOLEAN*/ [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*STRING*/  [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*INT*/     [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*CHAR*/    [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*VOID*/    [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*ERROR*/   [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR]
];

export const castMod =[
                /*  DOUBLE      BOOLEAN     STRING      INT         CHAR       VOID      ERROR*/
    /*DOUBLE*/  [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*BOOLEAN*/ [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*STRING*/  [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*INT*/     [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*CHAR*/    [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*VOID*/    [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*ERROR*/   [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR]
];

export const castPot =[
                /*  DOUBLE      BOOLEAN     STRING      INT         CHAR       VOID      ERROR*/
    /*DOUBLE*/  [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.ERROR],
    /*BOOLEAN*/ [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*STRING*/  [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*INT*/     [Tipo.DOUBLE,Tipo.DOUBLE,Tipo.ERROR,Tipo.INT   ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
    /*CHAR*/    [Tipo.DOUBLE,Tipo.ERROR ,Tipo.ERROR,Tipo.INT   ,Tipo.INT   ,Tipo.ERROR,Tipo.ERROR],
    /*VOID*/    [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR],
    /*ERROR*/   [Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR ,Tipo.ERROR ,Tipo.ERROR,Tipo.ERROR]
];