import { ConsolaCRLComponent } from "src/app/consola-crl/consola-crl.component";
import { CRL } from "../Result/CRL";
import { RefScope } from "../Symbolo/RefScope";

export class Entorno {
    constructor(private script: Array<CRL>, private consola: ConsolaCRLComponent) { }

    public ejecutar() {
        //Inicializacion de cada uno de los archivos
        this.script.forEach((crl:CRL)=>{
            crl.inicializar();
        });
        //Verificacion de los imports de los archivos
        let banderaImport = true;
        this.script.forEach((crl: CRL) => {
            crl.getImports().forEach(impr => {
                if ((impr.getId() + '.crl') === crl.getNombre()) {
                    this.consola.agregarError("Error de Importacion: El archivo: " + crl.getNombre() + " hace referencia a si mismo ,Linea: " + impr.linea + " ,Columna: " + impr.columna);
                    banderaImport = false;
                } else {
                    let result = this.privateBuscarArchivo(impr.getId() + ".crl");
                    if (result != null) {
                        crl.addRefScope(new RefScope(impr.getId() + '.crl', result.getScopeGlobal()));
                    } else {
                        this.consola.agregarError("Error de Importacion: El archivo: " + crl.getNombre() + " hace referencia a \"" + impr.getId() + ".crl\" pero este no existe ,Linea: " + impr.linea + " ,Columna: " + impr.columna);
                        banderaImport = false;
                    }
                }
            });
        });
        if (banderaImport) {
            console.log(this.script);
            //Verificacion de funciones repetidas por archivo
            let banderaFunciones = false;
            if(banderaFunciones){
                //Verificacion de solo exista una funcion principal
                let principalCRL: CRL | null = null;
                let bandera = false;
                let bandera2 = false;
                let oderCRL: CRL[] = [];
                this.script.forEach((crl: CRL) => {
                    if (crl.getPrincipal() != null) {
                        if (!bandera) {
                            principalCRL = crl;
                            bandera = true;
                            bandera2 = true;
                        } else {
                            this.consola.agregarError("El archivo " + principalCRL?.getNombre() + " posee ya la funcion principal el archivo " + crl.getNombre() + " no puede tener una funcion principal");
                            bandera2 = false
                        }
                    } else {
                        oderCRL.push(crl);
                    }
                });
                if (principalCRL == null) {
                    this.consola.agregarError("No existe funcion principal en el proyecto por ende no se ejecutara!!!!");
                } else {
                    if (bandera2) {
                        console.log("hola me ejecute");
                    }
                }
            }
        }
    }



    private privateBuscarArchivo(nombre: string): CRL | null {
        for (const scr of this.script) {
            if (scr.getNombre() === nombre) {
                return scr;
            }
        }
        return null;
    }
}