import { AtributosComunes } from "./AtributosComunes";

export enum TipoEspecie {
  HUMANOIDE = "humanoide",
  AMORFO = "amorfo",
  ROBOTICO = "robotico",
  PARASITO = "parasito",
  HIVEMIND = "hivemind"
}

export interface EspecieDatos {
  id: string;
  nombre: string;
  origen: string;
  tipo: TipoEspecie;
  esperanzaVida: number;
  descripcion: string;
}

export class Especies extends AtributosComunes {
  private origen: string;
  private tipo: TipoEspecie;
  private esperanzaVida: number;

  constructor(id: string, nombre: string, origen: string, tipo: TipoEspecie, esperanzaVida: number, descripcion: string) {
    super(id, nombre, descripcion);
    this.origen = this.comprobarVacio(origen);
    this.tipo = tipo;
    this.esperanzaVida = this.comprobarEsperanzaVida(esperanzaVida);
  }

  // Getters
  getOrigen(): string { return this.origen; }
  getTipo(): TipoEspecie { return this.tipo; }
  getEsperanzaVida(): number { return this.esperanzaVida; }

  // Setters
  setOrigen(origen: string) { this.origen = this.comprobarVacio(origen); }
  setTipo(tipo: TipoEspecie) { this.tipo = tipo; }
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