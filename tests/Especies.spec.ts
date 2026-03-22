import { describe, it, expect } from 'vitest';
import { Especies, TipoEspecie } from '../src/Especies';

describe('Clase Especies', () => {
  it('Debe crearse correctamente con datos válidos', () => {
    const especie = new Especies("E1", "Cromulon", "Sector Cygnus", TipoEspecie.AMORFO, 1000000, "Cabezas gigantes que exigen música");
    
    expect(especie.getId()).toBe("E1");
    expect(especie.getNombre()).toBe("Cromulon");
    expect(especie.getOrigen()).toBe("Sector Cygnus");
    expect(especie.getTipo()).toBe(TipoEspecie.AMORFO);
    expect(especie.getEsperanzaVida()).toBe(1000000);
  });

  it('Debe lanzar error si la esperanza de vida es negativa', () => {
    expect(() => {
      new Especies("E2", "Especie Efímera", "Tierra", TipoEspecie.HUMANOIDE, -5, "Viven muy poco");
    }).toThrowError("La esperanza de vida no puede ser menor a 0");
  });
});