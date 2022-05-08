export class Key {
    constructor(public key:string) {}
    public getIndex():number{
        let long = this.key.length
        let num = this.key.slice(1,long-1);
        return Number(num);
    }
}

export class Text{
    constructor(public text:string){}
}