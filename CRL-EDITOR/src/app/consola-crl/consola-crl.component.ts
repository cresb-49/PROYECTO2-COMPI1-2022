import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consola-crl',
  templateUrl: './consola-crl.component.html',
  styleUrls: ['./consola-crl.component.css']
})
export class ConsolaCRLComponent implements OnInit {
  errores: any[] = [
    {
      "error": "Douglas  Pace"
    },
    {
      "error": "Mcleod  Mueller"
    },
    {
      "error": "Day  Meyers"
    },
    {
      "error": "Aguirre  Ellis"
    },
    {
      "error": "Cook  Tyson"
    }
  ];

constructor() { }

ngOnInit(): void {
}

}
