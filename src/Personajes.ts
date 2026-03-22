import { AtributosComunes } from "./AtributosComunes";
import { Especies } from "./Especies";
import { Dimensiones } from "./Dimensiones";

/**
 * Estados vitales y operativos posibles de un personaje
 */
export enum Estados {
  VIVO = "vivo",
  MUERTO = "muerto",
  DESCONOCIDO = "desconocido",
  ROBOT_SUSTITUTO = "robot-sustituto"
}

/**
 * Organizaciones o bloques de pertenencia de un personaje
 */
export enum Afiliaciones {
  FEDERACION_GALACTICA = "federación galáctica",
  CONSEJO_RICKS = "consejo de ricks",
  FAMILIA_SMITH = "familia smith",
  INDEPENDIENTE = "independiente"
}

/**
 * Estructura serializable de un personaje para persistencia
 */
export interface PersonajeDatos {
  id: string;
  nombre: string;
  especieId: string;
  dimensionOrigenId: string;
  estado: Estados;
  afiliacion: Afiliaciones;
  nivelInteligencia: number;
  descripcion: string;
}

/**
 * Representa un personaje del multiverso con sus datos narrativos y tecnicos
 */
export class Personajes extends AtributosComunes {
  private especie: Especies;
  private dimensionOrigen: Dimensiones;
  private estado: Estados;
  private afiliacion: Afiliaciones;
  private nivelInteligencia: number;

  /**
   * Crea un personaje validando su nivel de inteligencia.
   *
   * @param id - Identificador unico
   * @param nombre - Nombre del personaje
   * @param especie - Especie asociada
   * @param dimensionOrigen - Dimension de origen
   * @param estado - Estado actual del personaje
   * @param afiliacion - Afiliacion principal
   * @param nivelInteligencia - Nivel de inteligencia de 1 a 10
   * @param descripcion - Descripcion general
   */
  constructor(id: string, nombre: string, especie: Especies, dimensionOrigen: Dimensiones, 
    estado: Estados, afiliacion: Afiliaciones, nivelInteligencia: number, descripcion: string) {
      super(id, nombre, descripcion);
      this.especie = especie;
      this.dimensionOrigen = dimensionOrigen;
      this.estado = estado;
      this.afiliacion = afiliacion;
      this.nivelInteligencia = this.comprobarNivelInteligencia(nivelInteligencia);
  }

  /**
   * Obtiene la especie del personaje
   * @returns Especie asociada
   */
  getEspecie(): Especies { return this.especie; }

  /**
   * Obtiene la dimension de origen
   * @returns Dimension origen
   */
  getDimensionOrigen(): Dimensiones { return this.dimensionOrigen; }

  /**
   * Obtiene el estado actual del personaje
   * @returns Estado almacenado
   */
  getEstado(): Estados { return this.estado; }

  /**
   * Obtiene la afiliacion actual
   * @returns Afiliacion registrada
   */
  getAfiliacion(): Afiliaciones { return this.afiliacion; }

  /**
   * Obtiene el nivel de inteligencia
   * @returns Entero entre 1 y 10
   */
  getNivelInteligencia(): number { return this.nivelInteligencia; }

  /**
   * Actualiza la especie asociada
   * @param nuevaEspecie - Nueva especie
   */
  setEspecie(nuevaEspecie: Especies) { this.especie = nuevaEspecie; }

  /**
   * Actualiza la dimension de origen
   * @param nuevaDimension - Nueva dimension
   */
  setDimensionOrigen(nuevaDimension: Dimensiones) { this.dimensionOrigen = nuevaDimension; }

  /**
   * Actualiza el estado del personaje
   * @param nuevoEstado - Nuevo estado
   */
  setEstado(nuevoEstado: Estados) { this.estado = nuevoEstado; }

  /**
   * Actualiza la afiliacion del personaje
   * @param nuevaAfiliacion - Nueva afiliacion
   */
  setAfiliacion(nuevaAfiliacion: Afiliaciones) { this.afiliacion = nuevaAfiliacion; }

  /**
   * Actualiza la inteligencia tras validarla
   * @param nuevoNivel - Nuevo nivel de inteligencia
   */
  setNivelInteligencia(nuevoNivel: number) {
    this.comprobarNivelInteligencia(nuevoNivel);
    this.nivelInteligencia = nuevoNivel;
  }

  /**
   * Comprueba que la inteligencia este en escala valida
   *
   * @param nivelInteligencia - Valor a validar
   * @returns El nivel si es valido
   * @throws Error Se lanza si esta fuera de 1..10
   */
  comprobarNivelInteligencia(nivelInteligencia: number): number {
    if (nivelInteligencia < 1 || nivelInteligencia > 10) {
      throw Error("El nivel de inteligencia es en escala del 1 al 10");
    } else {
      return nivelInteligencia;
    }
  }
}