import { describe, it, expect } from 'vitest';
import { ViajeInterdimensional } from '../src/ViajeInterdimensional';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';

describe('Tests de la clase ViajeInterdimensional', () => {
  it('Debe instanciarse correctamente un viaje entre dos dimensiones', () => {
    const dimOrigen = new Dimensiones("D-1", "Tierra C-137", EstadoDimensiones.ACTIVA, 10, "Origen");
    const dimDestino = new Dimensiones("D-2", "Dimensión Cronenberg", EstadoDimensiones.CUARENTENA, 4, "Destino");

    const viaje: ViajeInterdimensional = {
      id: "V-1",
      origen: dimOrigen,
      destino: dimDestino
    } as any;
  });
});