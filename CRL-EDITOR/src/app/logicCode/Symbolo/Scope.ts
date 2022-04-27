export class Scope{
    private variables : Map<string,Symbol>
    public funciones:Map<string,Function>

    constructor(public anterior : Scope | null){
        this.variables = new Map();
        this.funciones = new Map();
    }
}