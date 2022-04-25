import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenedor-principal',
  templateUrl: './contenedor-principal.component.html',
  styleUrls: ['./contenedor-principal.component.css']
})
export class ContenedorPrincipalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  obtenerCodigo(){
    alert("Recuperando el codigo CRL");
  }

  obtenerProyectoCompleto(){
    alert("Descargando el proyecto completo");
  }

}
