import { AtributosComunes } from "./AtributosComunes";

/**
 * Tipologias biologicas principales de una especie.
 */
export enum TipoEspecie {
  HUMANOIDE = "humanoide",
  AMORFO = "amorfo",
  ROBOTICO = "robotico",
  PARASITO = "parasito",
  HIVEMIND = "hivemind"
}

/**
 * Estructura serializable de una especie para persistencia.
 */
export interface EspecieDatos {
  id: string;
  nombre: string;
  origen: string;
  tipo: TipoEspecie;
  esperanzaVida: number;
  descripcion: string;
}

/**
 * Representa una especie con su origen, tipo y esperanza de vida.
 */
export class Especies extends AtributosComunes {
  private origen: string;
  private tipo: TipoEspecie;
  private esperanzaVida: number;

  /**
   * Crea una instancia de especie con validaciones basicas.
   *
   * @param id Identificador unico.
   * @param nombre Nombre de la especie.
   * @param origen Mundo o dimension de origen.
   * @param tipo Tipo taxonomico de la especie.
   * @param esperanzaVida Anios de vida esperados.
   * @param descripcion Descripcion general.
   */
  constructor(id: string, nombre: string, origen: string, tipo: TipoEspecie, esperanzaVida: number, descripcion: string) {
    super(id, nombre, descripcion);
    this.origen = this.comprobarVacio(origen);
    this.tipo = tipo;
    this.esperanzaVida = this.comprobarEsperanzaVida(esperanzaVida);
  }

  /**
   * Obtiene el origen de la especie.
   * @returns Origen registrado.
   */
  getOrigen(): string { return this.origen; }

  /**
   * Obtiene el tipo principal de la especie.
   * @returns Valor del enum de tipo.
   */
  getTipo(): TipoEspecie { return this.tipo; }

  /**
   * Obtiene la esperanza de vida actual.
   * @returns Esperanza de vida en anios.
   */
  getEsperanzaVida(): number { return this.esperanzaVida; }

  /**
   * Actualiza el origen tras validar que no este vacio.
   * @param origen Nuevo origen.
   */
  setOrigen(origen: string) { this.origen = this.comprobarVacio(origen); }

  /**
   * Actualiza el tipo de especie.
   * @param tipo Nuevo tipo.
   */
  setTipo(tipo: TipoEspecie) { this.tipo = tipo; }

  /**
   * Actualiza la esperanza de vida tras validarla.
   * @param esperanzaVida Nuevo valor de esperanza de vida.
   */
  setEsperanzaVida(esperanzaVida: number) { this.esperanzaVida = this.comprobarEsperanzaVida(esperanzaVida); }

  /**
   * Comprueba que la esperanza de vida no sea negativa.
   *
   * @param esperanzaVida Valor a validar.
   * @returns El mismo valor si es valido.
   * @throws Error Se lanza si el valor es menor que cero.
   */
  comprobarEsperanzaVida(esperanzaVida: number): number {
    if (esperanzaVida < 0) {
      throw new Error("La esperanza de vida no puede ser menor a 0");
    } else {
      return esperanzaVida; 
    }
  }
}