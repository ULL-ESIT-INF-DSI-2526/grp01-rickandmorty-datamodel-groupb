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

  it('Debe permitir esperanza de vida igual a 0', () => {
    const especie = new Especies('E0', 'Temporal', 'Nexo', TipoEspecie.PARASITO, 0, 'Vida instantánea');

    expect(especie.getEsperanzaVida()).toBe(0);
  });

  it('Debe lanzar error si la esperanza de vida es negativa', () => {
    expect(() => {
      new Especies("E2", "Especie Efímera", "Tierra", TipoEspecie.HUMANOIDE, -5, "Viven muy poco");
    }).toThrowError("La esperanza de vida no puede ser menor a 0");
  });

  it('Debe lanzar error si el origen está vacío', () => {
    expect(() => {
      new Especies('E3', 'Sin origen', '', TipoEspecie.ROBOTICO, 100, 'Sin datos de origen');
    }).toThrowError('Ninguna entrada puede estar vacía');
  });

  it('Debe actualizar correctamente origen, tipo y esperanza de vida con setters', () => {
    const especie = new Especies('E4', 'Gear Person', 'Planeta Gear', TipoEspecie.ROBOTICO, 300, 'Desc');

    especie.setOrigen('Ciudadela');
    especie.setTipo(TipoEspecie.HIVEMIND);
    especie.setEsperanzaVida(1200);

    expect(especie.getOrigen()).toBe('Ciudadela');
    expect(especie.getTipo()).toBe(TipoEspecie.HIVEMIND);
    expect(especie.getEsperanzaVida()).toBe(1200);
  });

  it('Debe lanzar error si setEsperanzaVida recibe valor negativo', () => {
    const especie = new Especies('E5', 'Prueba', 'Origen', TipoEspecie.AMORFO, 40, 'Desc');

    expect(() => especie.setEsperanzaVida(-1)).toThrowError('La esperanza de vida no puede ser menor a 0');
    expect(especie.getEsperanzaVida()).toBe(40);
  });

  it('Debe lanzar error si setOrigen recibe string vacío', () => {
    const especie = new Especies('E6', 'Prueba 2', 'Origen', TipoEspecie.AMORFO, 40, 'Desc');

    expect(() => especie.setOrigen('')).toThrowError('Ninguna entrada puede estar vacía');
  });
});