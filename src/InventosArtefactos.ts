import { AtributosComunes } from "./AtributosComunes";
import { Personajes } from "./Personajes";
import { PlanetasLocalizaciones } from "./PlanetasLocalizaciones";

/**
 * Clasifica los artefactos segun su uso principal.
 */
export enum TipoArtefacto {
  ARMA = "arma",
  DISPOSITIVO_DE_VIAJE = "dispositivo de viaje",
  BIOTECNOLOGIA = "biotecnología",
  OCA = "objeto cotidiano absurdo"
}

/**
 * Estructura serializable de inventos y artefactos.
 */
export interface InventoArtefactoDatos {
  id: string;
  nombre: string;
  inventorId: string;
  tipo: TipoArtefacto;
  nivelPeligrosidad: number;
  descripcion: string;
  localizacionDespliegueId: string | null;
}

/**
 * Representa un invento o artefacto del multiverso.
 */
export class InventosArtefactos extends AtributosComunes {
  private inventor: Personajes;
  private tipo: TipoArtefacto;
  private nivelPeligrosidad: number;
  private localizacionDespliegue: PlanetasLocalizaciones | null;

  /**
   * Crea un invento asociando inventor, tipo y peligrosidad.
   *
   * @param id Identificador del invento.
   * @param nombre Nombre del artefacto.
   * @param descripcion Descripcion funcional.
   * @param inventor Personaje responsable del invento.
   * @param tipo Tipo de artefacto.
   * @param nivelPeligrosidad Nivel de riesgo en escala 1..10.
   * @param localizacionDespliegue Localizacion actual o null.
   */
  constructor(id: string, nombre: string, descripcion: string, inventor: Personajes, tipo: TipoArtefacto, nivelPeligrosidad: number, localizacionDespliegue: PlanetasLocalizaciones | null = null) {
    super(id, nombre, descripcion);
    this.inventor = this.comprobarInventor(inventor);
    this.tipo = tipo;
    this.nivelPeligrosidad = this.comprobarNivelPeligrosidad(nivelPeligrosidad);
    this.localizacionDespliegue = localizacionDespliegue;
  }

  /**
   * Obtiene el personaje inventor asociado.
   * @returns Instancia del inventor.
   */
  getInventor(): Personajes { return this.inventor; }

  /**
   * Obtiene el tipo de artefacto.
   * @returns Tipo del artefacto.
   */
  getTipo(): TipoArtefacto { return this.tipo; }

  /**
   * Obtiene el nivel de peligrosidad.
   * @returns Nivel en escala 1..10.
   */
  getNivelPeligrosidad(): number { return this.nivelPeligrosidad; }

  /**
   * Obtiene la localizacion de despliegue actual.
   * @returns Localizacion o null si no esta desplegado.
   */
  getLocalizacionDespliegue(): PlanetasLocalizaciones | null { return this.localizacionDespliegue; }

  /**
   * Actualiza el inventor tras validarlo.
   * @param inventor Nuevo inventor.
   */
  setInventor(inventor: Personajes) { this.inventor = this.comprobarInventor(inventor); }

  /**
   * Actualiza el tipo del artefacto.
   * @param tipo Nuevo tipo.
   */
  setTipo(tipo: TipoArtefacto) { this.tipo = tipo; }

  /**
   * Actualiza la peligrosidad tras validarla.
   * @param nivel Nuevo nivel de peligrosidad.
   */
  setNivelPeligrosidad(nivel: number) { this.nivelPeligrosidad = this.comprobarNivelPeligrosidad(nivel); }

  /**
   * Actualiza la localizacion de despliegue del invento.
   * @param loc Nueva localizacion o null para retirarlo.
   */
  setLocalizacionDespliegue(loc: PlanetasLocalizaciones | null) { this.localizacionDespliegue = loc; }

  /**
   * Comprueba que exista un inventor asociado.
   *
   * @param inventor Inventor a validar.
   * @returns El inventor si es valido.
   * @throws Error Se lanza si es null o undefined.
   */
  comprobarInventor(inventor: Personajes): Personajes {
    if (inventor === null || inventor === undefined) {
      throw new Error("El inventor no puede estar vacío");
    } else {
      return inventor;
    }
  }

  /**
   * Comprueba que la peligrosidad este en el rango permitido.
   *
   * @param nivel Nivel a validar.
   * @returns Nivel si es valido.
   * @throws Error Se lanza si el valor esta fuera de 1..10.
   */
  comprobarNivelPeligrosidad(nivel: number): number {
    if (nivel < 1 || nivel > 10) {
      throw new Error("El nivel de peligrosidad tiene que estar entre 1 y 10");
    } else {
      return nivel;
    }
  }
}