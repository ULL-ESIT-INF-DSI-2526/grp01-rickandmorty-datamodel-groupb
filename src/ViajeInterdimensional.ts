import { Personajes } from "./Personajes";
import { Dimensiones } from "./Dimensiones";

/**
 * Representa un viaje interdimensional completo en memoria.
 */
export type ViajeInterdimensional = {
  personaje: Personajes;
  dimensionDestino: Dimensiones;
  fechaViaje: Date;
  motivo: string;
}

/**
 * Estructura serializable de un viaje interdimensional.
 */
export interface ViajeInterdimensionalDatos {
  personajeId: string;
  dimensionDestinoId: string;
  fechaViaje: Date;
  motivo: string;
}