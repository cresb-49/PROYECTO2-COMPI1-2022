export class Pila {
    private pila:any[];
    constructor() {
        this.pila=[];
    }

    public push(element:any){
        this.pila.push(element);
    }

    public pop(){
        return this.pila.pop();
    }

    public peek(){
        return this.pila[this.pila.length-1];
    }

    public size(){
        return this.pila.length;
    }
    
    public print(){
        console.log(this.pila);
    }
}