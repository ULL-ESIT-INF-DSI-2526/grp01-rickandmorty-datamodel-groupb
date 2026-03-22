import { describe, it, expect } from 'vitest';
import { PlanetasLocalizaciones, TiposPlanetas } from '../src/PlanetasLocalizaciones';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';

describe('Clase PlanetasLocalizaciones', () => {
  const dimTest = new Dimensiones("D1", "Tierra C-137", EstadoDimensiones.ACTIVA, 8, "Dimensión original");
  const dimAlt = new Dimensiones('D2', 'Tierra C-500A', EstadoDimensiones.CUARENTENA, 6, 'Dimensión alternativa');

  it('Debe crearse correctamente enlazando la Dimensión', () => {
    const lugar = new PlanetasLocalizaciones("L1", "Citadel of Ricks", TiposPlanetas.ESTACIONESPACIAL, dimTest, 50000, "Sede del Consejo");
    
    expect(lugar.getNombre()).toBe("Citadel of Ricks");
    expect(lugar.getTipoPlaneta()).toBe(TiposPlanetas.ESTACIONESPACIAL);
    expect(lugar.getDimension().getId()).toBe("D1");
    expect(lugar.getPoblacion()).toBe(50000);
  });

  it('Debe permitir población en 0', () => {
    const lugar = new PlanetasLocalizaciones('L2', 'Simulador Zigerion', TiposPlanetas.SIMULACIONVIRTUAL, dimTest, 0, 'Sin población real');

    expect(lugar.getPoblacion()).toBe(0);
  });

  it('Debe lanzar error si la población es negativa en el constructor', () => {
    expect(() => {
      new PlanetasLocalizaciones('L3', 'Planeta Imposible', TiposPlanetas.PLANETA, dimTest, -1, 'Población inválida');
    }).toThrowError('La población no puede ser menor a 0');
  });

  it('Debe actualizar tipo de planeta, dimensión y población con setters', () => {
    const lugar = new PlanetasLocalizaciones('L4', 'Lugar Test', TiposPlanetas.PLANETA, dimTest, 1000, 'Desc');

    lugar.setTipoPlaneta(TiposPlanetas.DIMENSIONDEBOLSILLO);
    lugar.setDimension(dimAlt);
    lugar.setPoblacion(2500);

    expect(lugar.getTipoPlaneta()).toBe(TiposPlanetas.DIMENSIONDEBOLSILLO);
    expect(lugar.getDimension().getId()).toBe('D2');
    expect(lugar.getPoblacion()).toBe(2500);
  });

  it('Debe lanzar error si setPoblacion recibe un valor negativo', () => {
    const lugar = new PlanetasLocalizaciones('L5', 'Lugar Test 2', TiposPlanetas.PLANETA, dimTest, 1000, 'Desc');

    expect(() => lugar.setPoblacion(-300)).toThrowError('La población no puede ser menor a 0');
    expect(lugar.getPoblacion()).toBe(1000);
  });
});