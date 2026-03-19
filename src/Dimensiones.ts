import { AtributosComunes } from "./AtributosComunes";

enum EstadoDimensiones {
  ACTIVA = "activa",
  DESTRUIDA = "destruida",
  CUARENTENA = "cuarentena"
}

export interface DimensionDatos {
  id: string;
  nombre: string;
  estado: EstadoDimensiones;
  nivelTec: number;
  descripcion: string;
}

export class Dimensiones extends AtributosComunes {
  private estado: EstadoDimensiones;
  private nivelTec: number;

  constructor(id: string, nombre: string, estado: EstadoDimensiones, nivelTec: number, descripcion: string) {
    super(id, nombre, descripcion);
    this.estado = this.comprobarEstado(estado);
    this.nivelTec = this.comprobarNivelTec(nivelTec);
  }

  // Getters
  getEstado(): EstadoDimensiones { return this.estado; }
  getNivelTec(): number { return this.nivelTec; }

  // Setters
  setEstado(estado: EstadoDimensiones) { this.estado = estado; }
  setLvlTecnologico(nivelTec: number) { this.nivelTec = this.comprobarNivelTec(nivelTec); }

  // Comprobaciones
  comprobarEstado(estado: string): EstadoDimensiones {
    if (estado === "activa" || estado === "destruida" || estado === "cuarentena") {
      return estado as EstadoDimensiones;
    } else {
      throw new Error("El estado de la dimensión sólo puede ser activa/destruida/cuarentena");
    }
  }

  comprobarNivelTec(nivel: number): number {
    if (nivel < 1 || nivel > 10) {
      throw new Error("El nivel tecnológico tiene que estar entre 1 y 10");
    } else {
      return nivel;
    }
  }
}