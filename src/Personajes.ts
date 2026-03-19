import { AtributosComunes } from "./AtributosComunes";
import { Especies } from "./Especies";
import { Dimensiones } from "./Dimensiones";

enum Estados {
  VIVO = "vivo",
  MUERTO = "muerto",
  DESCONOCIDO = "desconocido",
  ROBOT_SUSTITUTO = "robot-sustituto"
}

enum Afiliaciones {
  FEDERACION_GALACTICA = "federación galáctica",
  CONSEJO_RICKS = "consejo de ricks",
  FAMILIA_SMITH = "familia smith",
  INDEPENDIENTE = "independiente"
}

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

export class Personajes extends AtributosComunes {
  private especie: Especies;
  private dimensionOrigen: Dimensiones;
  private estado: Estados;
  private afiliacion: Afiliaciones;
  private nivelInteligencia: number;

  constructor(id: string, nombre: string, especie: Especies, dimensionOrigen: Dimensiones, 
    estado: Estados, afiliacion: Afiliaciones, nivelInteligencia: number, descripcion: string) {
      super(id, nombre, descripcion);
      this.especie = especie;
      this.dimensionOrigen = dimensionOrigen;
      this.estado = estado;
      this.afiliacion = afiliacion;
      this.nivelInteligencia = this.comprobarNivelInteligencia(nivelInteligencia);
  }

  // Getters
  getEspecie(): Especies { return this.especie; }
  getDimensionOrigen(): Dimensiones { return this.dimensionOrigen; }
  getEstado(): Estados { return this.estado; }
  getAfiliacion(): Afiliaciones { return this.afiliacion; }
  getNivelInteligencia(): number { return this.nivelInteligencia; }

  // Setters
  setEspecie(nuevaEspecie: Especies) { this.especie = nuevaEspecie; }
  setDimensionOrigen(nuevaDimension: Dimensiones) { this.dimensionOrigen = nuevaDimension; }
  setEstado(nuevoEstado: Estados) { this.estado = nuevoEstado; }
  setAfiliacion(nuevaAfiliacion: Afiliaciones) { this.afiliacion = nuevaAfiliacion; }
  setNivelInteligencia(nuevoNivel: number) {
    this.comprobarNivelInteligencia(nuevoNivel);
    this.nivelInteligencia = nuevoNivel;
  }

  // Comprobaciones
  comprobarNivelInteligencia(nivelInteligencia: number): number {
    if (nivelInteligencia < 1 || nivelInteligencia > 10) {
      throw Error("El nivel de inteligencia es en escala del 1 al 10");
    } else {
      return nivelInteligencia;
    }
  }
}