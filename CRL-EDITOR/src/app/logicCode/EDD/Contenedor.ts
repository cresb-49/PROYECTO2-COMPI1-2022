export class Contenedor<T> {
    private drive:Map<string,Map<string,T>>;
    constructor() {
        this.drive = new Map();
    }
    public has(key1:string,key2:string){
        if(this.drive.has(key1)){
            if(this.drive.get(key1)?.has(key2)){
                return true;
            }
        }
        return false;
    }

    public has2(key1:string){
        if(this.drive.has(key1)){
            return true;
        }
        return false;
    }
    public get(key1:string,key2:string){
        return this.drive.get(key1)?.get(key2);
    }

    public get2(key1:string){
        return this.drive.get(key1);
    }
    public set(key1:string,key2:string,value:T){
        if(this.drive.has(key1)){
            this.drive.get(key1)?.set(key2,value);
        }else{
            this.drive.set(key1,new Map());
            this.drive.get(key1)?.set(key2,value);
        }
    }
}