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

  it('Debe lanzar error si el nivel tecnológico no está entre 1 y 10', () => {
    expect(() => {
      new Dimensiones("D2", "Dimensión Basura", EstadoDimensiones.ACTIVA, 15, "Nivel tec inválido");
    }).toThrowError("El nivel tecnológico tiene que estar entre 1 y 10");
  });

  it('Debe lanzar error si algún string está vacío (Herencia de AtributosComunes)', () => {
    expect(() => {
      new Dimensiones("", "Dimensión Vacía", EstadoDimensiones.DESTRUIDA, 5, "Sin ID");
    }).toThrowError("Ninguna entrada puede estar vacía");
  });
});