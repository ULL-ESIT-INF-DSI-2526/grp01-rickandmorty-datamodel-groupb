import { AtributosComunes } from "./AtributosComunes";
import { Dimensiones } from "./Dimensiones";

/**
 * Tipos de localizaciones planetarias o equivalentes.
 */
export enum TiposPlanetas {
  PLANETA = "planeta",
  ESTACIONESPACIAL= "estación espacial",
  DIMENSIONDEBOLSILLO = "dimensión de bolsillo",
  SIMULACIONVIRTUAL = "simulación virtual"
}

/**
 * Estructura serializable de planetas y localizaciones.
 */
export interface PlanetaLocalizacionDatos {
  id: string;
  nombre: string;
  tipoPlaneta: TiposPlanetas;
  dimensionId: string;
  poblacion: number;
  descripcion: string;
}

/**
 * Representa una localizacion del multiverso con su dimension y poblacion.
 */
export class PlanetasLocalizaciones extends AtributosComunes {
  private tipoPlaneta: TiposPlanetas;
  private dimension: Dimensiones;
  private poblacion: number;

  /**
   * Crea una localizacion validando su poblacion.
   *
   * @param id Identificador unico.
   * @param nombre Nombre de la localizacion.
   * @param tipoPlaneta Tipo de localizacion.
   * @param dimension Dimension en la que existe.
   * @param poblacion Cantidad aproximada de habitantes.
   * @param descripcion Descripcion breve.
   */
  constructor(id: string, nombre: string, tipoPlaneta: TiposPlanetas, dimension: Dimensiones, poblacion: number, descripcion: string) {
    super(id, nombre, descripcion);
    this.tipoPlaneta = tipoPlaneta;
    this.dimension = dimension;
    this.poblacion = this.ComprobarPoblacion(poblacion);
  }

  /**
   * Obtiene el tipo de planeta o localizacion.
   * @returns Tipo de localizacion.
   */
  getTipoPlaneta(): TiposPlanetas { return this.tipoPlaneta; }

  /**
   * Obtiene la dimension asociada.
   * @returns Dimension de pertenencia.
   */
  getDimension(): Dimensiones { return this.dimension; }

  /**
   * Obtiene la poblacion registrada.
   * @returns Poblacion no negativa.
   */
  getPoblacion(): number { return this.poblacion; }

  /**
   * Actualiza el tipo de localizacion.
   * @param nuevoTipoPlaneta Nuevo tipo de planeta.
   */
  setTipoPlaneta(nuevoTipoPlaneta: TiposPlanetas) { this.tipoPlaneta = nuevoTipoPlaneta}

  /**
   * Actualiza la dimension asociada.
   * @param nuevaDimension Nueva dimension.
   */
  setDimension(nuevaDimension: Dimensiones) { this.dimension = nuevaDimension; }

  /**
   * Actualiza la poblacion tras validarla.
   * @param nuevaPoblacion Nueva poblacion.
   */
  setPoblacion(nuevaPoblacion: number) { this.poblacion = this.ComprobarPoblacion(nuevaPoblacion); }

  /**
   * Verifica que la poblacion no sea negativa.
   *
   * @param poblacion Valor a validar.
   * @returns El valor recibido si es valido.
   * @throws Error Se lanza si la poblacion es menor que cero.
   */
  ComprobarPoblacion(poblacion: number): number {
    if (poblacion < 0) {
      throw Error("La población no puede ser menor a 0");
    } else {
      return poblacion;
    }
  }

}