import { describe, it, expect } from 'vitest';
import { Personajes, Estados, Afiliaciones } from '../src/Personajes';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';
import { Especies, TipoEspecie } from '../src/Especies';

describe('Clase Personajes', () => {
  const dimTest = new Dimensiones("D1", "Tierra C-137", EstadoDimensiones.ACTIVA, 8, "Desc");
  const espTest = new Especies("E1", "Humano", "Tierra", TipoEspecie.HUMANOIDE, 80, "Desc");

  it('Debe crearse correctamente enlazando Especie y Dimensión', () => {
    const rick = new Personajes("P1", "Rick Sanchez", espTest, dimTest, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, "Genio");
    
    expect(rick.getNombre()).toBe("Rick Sanchez");
    expect(rick.getEspecie().getNombre()).toBe("Humano");
    expect(rick.getDimensionOrigen().getId()).toBe("D1");
    expect(rick.getNivelInteligencia()).toBe(10);
  });

  it('Debe lanzar error si el nivel de inteligencia es inválido', () => {
    expect(() => {
      new Personajes("P2", "Morty Smith", espTest, dimTest, Estados.VIVO, Afiliaciones.FAMILIA_SMITH, 11, "Inteligencia irreal");
    }).toThrowError("El nivel de inteligencia es en escala del 1 al 10");
  });
});