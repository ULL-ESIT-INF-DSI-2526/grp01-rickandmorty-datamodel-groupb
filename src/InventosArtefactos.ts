import { AtributosComunes } from "./AtributosComunes";
import { Personajes } from "./Personajes";
import { PlanetasLocalizaciones } from "./PlanetasLocalizaciones";

export enum TipoArtefacto {
  ARMA = "arma",
  DISPOSITIVO_DE_VIAJE = "dispositivo de viaje",
  BIOTECNOLOGIA = "biotecnología",
  OCA = "objeto cotidiano absurdo"
}

export interface InventoArtefactoDatos {
  id: string;
  nombre: string;
  inventorId: string;
  tipo: TipoArtefacto;
  nivelPeligrosidad: number;
  descripcion: string;
  localizacionDespliegueId: string | null;
}

export class InventosArtefactos extends AtributosComunes {
  private inventor: Personajes;
  private tipo: TipoArtefacto;
  private nivelPeligrosidad: number;
  private localizacionDespliegue: PlanetasLocalizaciones | null;

  constructor(id: string, nombre: string, descripcion: string, inventor: Personajes, tipo: TipoArtefacto, nivelPeligrosidad: number, localizacionDespliegue: PlanetasLocalizaciones | null = null) {
    super(id, nombre, descripcion);
    this.inventor = this.comprobarInventor(inventor);
    this.tipo = tipo;
    this.nivelPeligrosidad = this.comprobarNivelPeligrosidad(nivelPeligrosidad);
    this.localizacionDespliegue = localizacionDespliegue;
  }

  // Getters
  getInventor(): Personajes { return this.inventor; }
  getTipo(): TipoArtefacto { return this.tipo; }
  getNivelPeligrosidad(): number { return this.nivelPeligrosidad; }
  getLocalizacionDespliegue(): PlanetasLocalizaciones | null { return this.localizacionDespliegue; }

  // Setters
  setInventor(inventor: Personajes) { this.inventor = this.comprobarInventor(inventor); }
  setTipo(tipo: TipoArtefacto) { this.tipo = tipo; }
  setNivelPeligrosidad(nivel: number) { this.nivelPeligrosidad = this.comprobarNivelPeligrosidad(nivel); }
  setLocalizacionDespliegue(loc: PlanetasLocalizaciones | null) { this.localizacionDespliegue = loc; }

  // Comprobaciones
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