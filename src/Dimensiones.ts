import { AtributosComunes } from "./AtributosComunes";

/**
 * Estados operativos posibles para una dimension
 */
export enum EstadoDimensiones {
  ACTIVA = "activa",
  DESTRUIDA = "destruida",
  CUARENTENA = "cuarentena"
}

/**
 * Estructura serializable de una dimension para persistencia
 */
export interface DimensionDatos {
  id: string;
  nombre: string;
  estado: EstadoDimensiones;
  nivelTec: number;
  descripcion: string;
}

/**
 * Representa una dimension del multiverso con su estado y nivel tecnologico
 */
export class Dimensiones extends AtributosComunes {
  private estado: EstadoDimensiones;
  private nivelTec: number;

  /**
   * Crea una nueva dimension validando su estado y nivel tecnologico
   *
   * @param id - Identificador unico de la dimension
   * @param nombre - Nombre visible de la dimension
   * @param estado - Estado actual de la dimension
   * @param nivelTec - Nivel tecnologico de 1 a 10
   * @param descripcion - Descripcion breve de la dimension
   */
  constructor(id: string, nombre: string, estado: EstadoDimensiones, nivelTec: number, descripcion: string) {
    super(id, nombre, descripcion);
    this.estado = this.comprobarEstado(estado);
    this.nivelTec = this.comprobarNivelTec(nivelTec);
  }

  /**
   * Obtiene el estado actual de la dimension
   * @returns El estado almacenado
   */
  getEstado(): EstadoDimensiones { return this.estado; }

  /**
   * Obtiene el nivel tecnologico actual
   * @returns Nivel tecnologico entre 1 y 10
   */
  getNivelTec(): number { return this.nivelTec; }

  /**
   * Actualiza el estado de la dimension
   * @param estado - Nuevo estado valido
   */
  setEstado(estado: EstadoDimensiones) { this.estado = estado; }

  /**
   * Actualiza el nivel tecnologico tras validarlo
   * @param nivelTec - Nuevo nivel tecnologico
   */
  setLvlTecnologico(nivelTec: number) { this.nivelTec = this.comprobarNivelTec(nivelTec); }

  /**
   * Verifica que el estado sea uno de los permitidos
   *
   * @param estado - Estado a validar
   * @returns Estado convertido al enum correspondiente
   * @throws Error Se lanza si el estado no es valido
   */
  comprobarEstado(estado: string): EstadoDimensiones {
    if (estado === "activa" || estado === "destruida" || estado === "cuarentena") {
      return estado as EstadoDimensiones;
    } else {
      throw new Error("El estado de la dimensión sólo puede ser activa/destruida/cuarentena");
    }
  }

  /**
   * Verifica que el nivel tecnologico este en el rango permitido
   *
   * @param nivel - Nivel a validar
   * @returns El nivel si es valido
   * @throws Error Se lanza si esta fuera del rango 1..10
   */
  comprobarNivelTec(nivel: number): number {
    if (nivel < 1 || nivel > 10) {
      throw new Error("El nivel tecnológico tiene que estar entre 1 y 10");
    } else {
      return nivel;
    }
  }
}