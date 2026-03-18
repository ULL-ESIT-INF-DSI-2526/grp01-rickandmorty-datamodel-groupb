import { AtributosComunes } from "./AtributosComunes";

enum TipoArtefacto {
  ARMA = "arma",
  DISPOSITIVO_DE_VIAJE = "dispositivo de viaje",
  BIOTECNOLOGIA = "biotecnología",
  OCA= "objeto catidiano absurdo"
}

export class InventosArtefactos extends AtributosComunes {
  private invetor: string;
  private tipo: TipoArtefacto;
  private nivelPeligrosidad: number;

  constructor(id: string, nombre: string, descripcion: string, inventor: string, tipo: TipoArtefacto, nivelPeligrosidad: number) {
    super(id, nombre, descripcion);
    this.invetor = this.comprobarVacio(inventor);
    this.tipo = this.comprobarTipo(tipo);
    this.nivelPeligrosidad = this.comprobarNivelPeligrosidad(nivelPeligrosidad);
  }

  // Getters
  getInventor(): string { return this.invetor; }
  getTipo(): TipoArtefacto { return this.tipo; }
  getNivelPeligrosidad(): number { return this.nivelPeligrosidad; }

  // Setters
  setInventor(inventor: string) { this.invetor = this.comprobarVacio(inventor); }
  setTipo(tipo: TipoArtefacto) { this.tipo = this.comprobarTipo(tipo); }
  setNivelPeligrosidad(nivel: number) { this.nivelPeligrosidad = this.comprobarNivelPeligrosidad(nivel); }

  // Comprobaciones
  comprobarTipo(tipo: string): TipoArtefacto {
    if (tipo === "arma" || tipo === "dispositivo de viaje" || tipo === "biotecnología" || tipo === "objeto catidiano absurdo") {
      return tipo as TipoArtefacto;
    } else {
      throw new Error("El tipo de artefacto sólo puede ser arma/dispositivo de viaje/biotecnología/objeto catidiano absurdo");
    }
  }

  comprobarNivelPeligrosidad(nivel: number): number {
    if (nivel < 1 || nivel > 10) {
      throw new Error("El nivel de peligrosidad tiene que estar entre 1 y 10");
    } else {
      return nivel;
    }
  }
}