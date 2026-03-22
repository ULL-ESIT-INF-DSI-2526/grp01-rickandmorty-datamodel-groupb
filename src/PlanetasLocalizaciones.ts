import { AtributosComunes } from "./AtributosComunes";
import { Dimensiones } from "./Dimensiones";

export enum TiposPlanetas {
  PLANETA = "planeta",
  ESTACIONESPACIAL= "estación espacial",
  DIMENSIONDEBOLSILLO = "dimensión de bolsillo",
  SIMULACIONVIRTUAL = "simulación virtual"
}

export interface PlanetaLocalizacionDatos {
  id: string;
  nombre: string;
  tipoPlaneta: TiposPlanetas;
  dimensionId: string;
  poblacion: number;
  descripcion: string;
}

export class PlanetasLocalizaciones extends AtributosComunes {
  private tipoPlaneta: TiposPlanetas;
  private dimension: Dimensiones;
  private poblacion: number;

  constructor(id: string, nombre: string, tipoPlaneta: TiposPlanetas, dimension: Dimensiones, poblacion: number, descripcion: string) {
    super(id, nombre, descripcion);
    this.tipoPlaneta = tipoPlaneta;
    this.dimension = dimension;
    this.poblacion = this.ComprobarPoblacion(poblacion);
  }

  // Getters
  getTipoPlaneta(): TiposPlanetas { return this.tipoPlaneta; }
  getDimension(): Dimensiones { return this.dimension; }
  getPoblacion(): number { return this.poblacion; }

  // Setters
  setTipoPlaneta(nuevoTipoPlaneta: TiposPlanetas) { this.tipoPlaneta = nuevoTipoPlaneta}
  setDimension(nuevaDimension: Dimensiones) { this.dimension = nuevaDimension; }
  setPoblacion(nuevaPoblacion: number) { this.poblacion = this.ComprobarPoblacion(nuevaPoblacion); }

  // Comprobaciones
  ComprobarPoblacion(poblacion: number): number {
    if (poblacion < 0) {
      throw Error("La población no puede ser menor a 0");
    } else {
      return poblacion;
    }
  }

}