import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

import * as ace from "ace-builds";

@Component({
  selector: 'app-editor-crl',
  templateUrl: './editor-crl.component.html',
  styleUrls: ['./editor-crl.component.css']
})

export class EditorCrlComponent implements AfterViewInit {
  @ViewChild("editor") private editor!: ElementRef<HTMLElement>;
  ngAfterViewInit(): void {
    ace.config.set("fontSize", "14px");
    const aceEditor = ace.edit(this.editor.nativeElement);
    aceEditor.session.setValue("<h1>Ace Editor works great in Angular!</h1>");
  }
}