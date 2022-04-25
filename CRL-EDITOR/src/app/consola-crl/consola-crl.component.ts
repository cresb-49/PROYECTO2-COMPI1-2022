import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consola-crl',
  templateUrl: './consola-crl.component.html',
  styleUrls: ['./consola-crl.component.css']
})
export class ConsolaCRLComponent implements OnInit {
  errores: any[] = [
    {
      "error": "Erroe en linea 1"
    },
    {
      "error": "Erroe en linea 2"
    },
    {
      "error": "Erroe en linea 3"
    },
    {
      "error": "Erroe en linea 4"
    },
    {
      "error": "Erroe en linea 5"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  clearConsole() {
    this.errores = [];
  }

}
