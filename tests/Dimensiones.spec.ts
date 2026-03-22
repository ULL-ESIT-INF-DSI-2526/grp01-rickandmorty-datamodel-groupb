import { describe, it, expect } from 'vitest';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';

describe('Clase Dimensiones', () => {
  it('Debe crearse correctamente con datos válidos', () => {
    const dimension = new Dimensiones("D1", "Tierra C-137", EstadoDimensiones.ACTIVA, 8, "Dimensión original de Rick");
    
    expect(dimension.getId()).toBe("D1");
    expect(dimension.getNombre()).toBe("Tierra C-137");
    expect(dimension.getEstado()).toBe(EstadoDimensiones.ACTIVA);
    expect(dimension.getNivelTec()).toBe(8);
  });

  it('Debe aceptar nivel tecnológico en los límites 1 y 10', () => {
    const min = new Dimensiones('D_MIN', 'Min', EstadoDimensiones.ACTIVA, 1, 'Nivel mínimo');
    const max = new Dimensiones('D_MAX', 'Max', EstadoDimensiones.ACTIVA, 10, 'Nivel máximo');

    expect(min.getNivelTec()).toBe(1);
    expect(max.getNivelTec()).toBe(10);
  });

  it('Debe lanzar error si el nivel tecnológico no está entre 1 y 10', () => {
    expect(() => {
      new Dimensiones("D2", "Dimensión Basura", EstadoDimensiones.ACTIVA, 15, "Nivel tec inválido");
    }).toThrowError("El nivel tecnológico tiene que estar entre 1 y 10");
  });

  it('Debe lanzar error para nivel tecnológico menor al mínimo', () => {
    expect(() => {
      new Dimensiones('D3', 'Dimensión Baja', EstadoDimensiones.ACTIVA, 0, 'Nivel tec inválido');
    }).toThrowError('El nivel tecnológico tiene que estar entre 1 y 10');
  });

  it('Debe lanzar error si algún string está vacío (Herencia de AtributosComunes)', () => {
    expect(() => {
      new Dimensiones("", "Dimensión Vacía", EstadoDimensiones.DESTRUIDA, 5, "Sin ID");
    }).toThrowError("Ninguna entrada puede estar vacía");
  });

  it('Debe cambiar correctamente estado y nivel tecnológico con setters', () => {
    const dimension = new Dimensiones('D4', 'Tierra C-500A', EstadoDimensiones.ACTIVA, 6, 'Desc');

    dimension.setEstado(EstadoDimensiones.CUARENTENA);
    dimension.setLvlTecnologico(9);

    expect(dimension.getEstado()).toBe(EstadoDimensiones.CUARENTENA);
    expect(dimension.getNivelTec()).toBe(9);
  });

  it('Debe lanzar error si setLvlTecnologico recibe un valor inválido', () => {
    const dimension = new Dimensiones('D5', 'Tierra C-131', EstadoDimensiones.ACTIVA, 5, 'Desc');

    expect(() => dimension.setLvlTecnologico(11)).toThrowError('El nivel tecnológico tiene que estar entre 1 y 10');
  });

  it('Debe validar estados válidos con comprobarEstado', () => {
    const dimension = new Dimensiones('D6', 'Tierra Test', EstadoDimensiones.ACTIVA, 4, 'Desc');

    expect(dimension.comprobarEstado('activa')).toBe(EstadoDimensiones.ACTIVA);
    expect(dimension.comprobarEstado('destruida')).toBe(EstadoDimensiones.DESTRUIDA);
    expect(dimension.comprobarEstado('cuarentena')).toBe(EstadoDimensiones.CUARENTENA);
  });

  it('Debe lanzar error si comprobarEstado recibe un estado inválido', () => {
    const dimension = new Dimensiones('D7', 'Tierra Test 2', EstadoDimensiones.ACTIVA, 4, 'Desc');

    expect(() => dimension.comprobarEstado('inestable')).toThrowError(
      'El estado de la dimensión sólo puede ser activa/destruida/cuarentena',
    );
  });
});