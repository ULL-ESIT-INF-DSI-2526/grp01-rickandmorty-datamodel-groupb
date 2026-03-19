import { Personajes } from "./Personajes";
import { Dimensiones } from "./Dimensiones";

export type ViajeInterdimensional = {
  personaje: Personajes;
  dimensionDestino: Dimensiones;
  fechaViaje: Date;
  motivo: string;
}

export interface ViajeInterdimensionalDatos {
  personajeId: string;
  dimensionDestinoId: string;
  fechaViaje: Date;
  motivo: string;
}