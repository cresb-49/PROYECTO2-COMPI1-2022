import { Scope } from "./Scope";

export class RefScope {
    constructor(private nameFile:string,private scope:Scope) {}
    public getNameFile() : string {
        return this.nameFile;
    }
    public getScope() : Scope {
        return this.scope
    }
}
