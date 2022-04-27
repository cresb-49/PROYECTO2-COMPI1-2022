import { Component, OnInit } from '@angular/core';
import { ErrorCRL } from '../models/ErrorCRL';
import { tipoErrores } from '../models/ErrorCRL';

@Component({
  selector: 'app-consola-crl',
  templateUrl: './consola-crl.component.html',
  styleUrls: ['./consola-crl.component.css']
})
export class ConsolaCRLComponent implements OnInit {
  errores : Array<ErrorCRL>= new Array();
  constructor() { }

  ngOnInit(): void {
    //Prueba unitaria del comportamiento de un error
    this.pruebaError();
  }

  clearConsole() {
    this.errores = [];
  }

  pruebaError(){
    let errorP = "jhgjkdfhgashjdfjksdgasdhfgkasdjghfkasjdgfashjkdfahjsdfhjasdfhjkas"
    let tmp = new ErrorCRL(1,1,tipoErrores.SEMANTICO,errorP);
    this.agregarError(tmp);
  }

  agregarError(error:ErrorCRL){
    this.errores.push(error);
  }
}
