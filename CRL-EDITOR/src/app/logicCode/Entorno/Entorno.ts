import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { CRL } from "../Result/CRL";

export class Entorno {
    constructor(private script:Array<CRL>,private consola: ConsolaCRLComponent) {}

    ejecutar(){
        //Verificacion de solo exista una funcion principal
        let principalCRL:CRL|null = null;
        let bandera = false;
        let bandera2 = false;
        let oderCRL:CRL[] =[];
        this.script.forEach((crl:CRL)=>{
            if(crl.getPrincipal()!= null){
                if(!bandera){
                    principalCRL = crl;
                    bandera = true;
                    bandera2 = true;
                }else{
                    this.consola.agregarError("El archivo "+principalCRL?.getNombre()+" posee ya la funcion principal el archivo "+crl.getNombre()+" no puede tener una funcion principal");
                    bandera2 = false
                }
            }else{
                oderCRL.push(crl);
            }
        });
        if(principalCRL==null){
            this.consola.agregarError("No existe funcion principal en el proyecto por ende no se ejecutara!!!!");
        }else{
            if(bandera2){
                console.log("hola me ejecute");
            }
        }   
    }
}