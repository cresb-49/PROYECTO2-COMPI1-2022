import { StringBuilder } from "./StringBuilder";
export class Ejecutor {
    
    constructor() {   
    }

    public ejecucion(){
        console.log("That code its works");
        let stringBuilder = new StringBuilder();

        stringBuilder.appedend("Hola");
        stringBuilder.appedend(" como estas");
        
        console.log(stringBuilder.toString());
    }
}