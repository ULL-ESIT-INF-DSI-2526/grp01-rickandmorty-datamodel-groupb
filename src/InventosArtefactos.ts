import { AtributosComunes } from "./AtributosComunes";
import { Personajes } from "./Personajes";

enum TipoArtefacto {
  ARMA = "arma",
  DISPOSITIVO_DE_VIAJE = "dispositivo de viaje",
  BIOTECNOLOGIA = "biotecnología",
  OCA= "objeto catidiano absurdo"
}

export class InventosArtefactos extends AtributosComunes {
  private inventor: Personajes;
  private tipo: TipoArtefacto;
  private nivelPeligrosidad: number;

  constructor(id: string, nombre: string, descripcion: string, inventor: Personajes, tipo: TipoArtefacto, nivelPeligrosidad: number) {
    super(id, nombre, descripcion);
    this.inventor = this.comprobarInventor(inventor);
    this.tipo = this.comprobarTipo(tipo);
    this.nivelPeligrosidad = this.comprobarNivelPeligrosidad(nivelPeligrosidad);
  }

  // Getters
  getInventor(): Personajes { return this.inventor; }
  getTipo(): TipoArtefacto { return this.tipo; }
  getNivelPeligrosidad(): number { return this.nivelPeligrosidad; }

  // Setters
  setInventor(inventor: Personajes) { this.inventor = this.comprobarInventor(inventor); }
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

  comprobarInventor(inventor: Personajes): Personajes {
    if (inventor === null || inventor === undefined) {
      throw new Error("El inventor no puede estar vacío");
    } else {
      return inventor;
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