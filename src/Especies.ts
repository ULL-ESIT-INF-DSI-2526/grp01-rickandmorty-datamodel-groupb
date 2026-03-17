import { AtributosComunes } from "./AtributosComunes";

export class Especies extends AtributosComunes {
  private origen: string;
  private tipo: string;
  private esperanzaVida: number;

  constructor(id: string, nombre: string, origen: string, tipo: string, esperanzaVida: number, descripcion: string) {
    super(id, nombre, descripcion);
    this.origen = this.comprobarVacio(origen);
    this.tipo = this.comprobarVacio(tipo);
    this.esperanzaVida = this.comprobarEsperanzaVida(esperanzaVida);
  }

  // Getters
  getOrigen(): string { return this.origen; }
  getTipo(): string { return this.tipo; }
  getEsperanzaVida(): number { return this.esperanzaVida; }

  // Setters
  setOrigen(origen: string) { this.origen = this.comprobarVacio(origen); }
  setTipo(tipo: string) { this.tipo = this.comprobarVacio(tipo); }
  setEsperanzaVida(esperanzaVida: number) { this.esperanzaVida = this.comprobarEsperanzaVida(esperanzaVida); }

  // Comprobaciones
  comprobarEsperanzaVida(esperanzaVida: number): number {
    if (esperanzaVida < 0) {
      throw new Error("La esperanza de vida no puede ser menor a 0");
    } else {
      return esperanzaVida; 
    }
  }
}