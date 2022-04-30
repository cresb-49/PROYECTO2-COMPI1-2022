import { Component, OnInit } from '@angular/core';
import { ErrorCRL } from '../models/ErrorCRL';
import { tipoErrores } from '../models/ErrorCRL';

@Component({
  selector: 'app-consola-crl',
  templateUrl: './consola-crl.component.html',
  styleUrls: ['./consola-crl.component.css']
})
export class ConsolaCRLComponent implements OnInit {
  errores : any= new Array();
  constructor() { }

  ngOnInit(): void {
    //Prueba unitaria del comportamiento de un error
    //this.pruebaError();
  }

  clearConsole() {
    this.errores = [];
  }

  pruebaError(){
    let errorP = "jhgjkdfhgashjdfjksdgasdhfgkasdjghfkasjdgfashjkdfahjsdfhjasdfhjkas"
    this.agregarError(errorP);
  }

  agregarError(error:any){
    this.errores.push(error);
  }

  agregarErrores(error:any[]){
    for (const iterator of error) {
      this.errores.push(iterator);
    }
  }

  agregarPrint(value:any){
    this.errores.push(value);
  }
}
