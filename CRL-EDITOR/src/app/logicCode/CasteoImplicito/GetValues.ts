export class GetValues{
    constructor(){

    }
    public getBooleanNumeric(state:boolean){
        if(state){
            return 1;
        }
        else{
            return 0;
        }
    }

    public getCharNumeric(caracter:String){
        return caracter.charCodeAt(0);
    }

    public getCharAtString(caracter:string){
        let legth = caracter.length;
        return caracter.substring(1,(legth-2));
    }

    public getSubString(cadena:string){
        let length = cadena.length;
        return cadena.substring(1,(length-2));
    }

}