export class StringBuilder {
    private _lines: string[] = [];
    appedend(line: string = ""): void {
        this._lines.push(line);
    }
    clear() {
        this._lines = [];
    }
    toString(): string {
        return this._lines.join("");
    }
}