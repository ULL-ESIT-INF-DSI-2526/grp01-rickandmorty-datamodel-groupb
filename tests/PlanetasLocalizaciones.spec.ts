import { describe, it, expect } from 'vitest';
import { PlanetasLocalizaciones, TiposPlanetas } from '../src/PlanetasLocalizaciones';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';

describe('Clase PlanetasLocalizaciones', () => {
  const dimTest = new Dimensiones("D1", "Tierra C-137", EstadoDimensiones.ACTIVA, 8, "Dimensión original");

  it('Debe crearse correctamente enlazando la Dimensión', () => {
    const lugar = new PlanetasLocalizaciones("L1", "Citadel of Ricks", TiposPlanetas.ESTACIONESPACIAL, dimTest, 50000, "Sede del Consejo");
    
    expect(lugar.getNombre()).toBe("Citadel of Ricks");
    expect(lugar.getTipoPlaneta()).toBe(TiposPlanetas.ESTACIONESPACIAL);
    expect(lugar.getDimension().getId()).toBe("D1");
    expect(lugar.getPoblacion()).toBe(50000);
  });
});