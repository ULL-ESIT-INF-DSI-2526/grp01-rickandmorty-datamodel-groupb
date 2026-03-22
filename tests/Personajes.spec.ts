import { describe, it, expect } from 'vitest';
import { Personajes, Estados, Afiliaciones } from '../src/Personajes';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';
import { Especies, TipoEspecie } from '../src/Especies';

describe('Clase Personajes', () => {
  const dimTest = new Dimensiones("D1", "Tierra C-137", EstadoDimensiones.ACTIVA, 8, "Desc");
  const espTest = new Especies("E1", "Humano", "Tierra", TipoEspecie.HUMANOIDE, 80, "Desc");
  const dimAlt = new Dimensiones('D2', 'Tierra C-500A', EstadoDimensiones.CUARENTENA, 7, 'Desc');
  const espAlt = new Especies('E2', 'Cromulon', 'Sector Cygnus', TipoEspecie.AMORFO, 1000, 'Desc');

  it('Debe crearse correctamente enlazando Especie y Dimensión', () => {
    const rick = new Personajes("P1", "Rick Sanchez", espTest, dimTest, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, "Genio");
    
    expect(rick.getNombre()).toBe("Rick Sanchez");
    expect(rick.getEspecie().getNombre()).toBe("Humano");
    expect(rick.getDimensionOrigen().getId()).toBe("D1");
    expect(rick.getNivelInteligencia()).toBe(10);
  });

  it('Debe aceptar nivel de inteligencia en límites 1 y 10', () => {
    const bajo = new Personajes('P_MIN', 'Morty Mínimo', espTest, dimTest, Estados.VIVO, Afiliaciones.FAMILIA_SMITH, 1, 'Desc');
    const alto = new Personajes('P_MAX', 'Rick Máximo', espTest, dimTest, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, 'Desc');

    expect(bajo.getNivelInteligencia()).toBe(1);
    expect(alto.getNivelInteligencia()).toBe(10);
  });

  it('Debe lanzar error si el nivel de inteligencia es inválido', () => {
    expect(() => {
      new Personajes("P2", "Morty Smith", espTest, dimTest, Estados.VIVO, Afiliaciones.FAMILIA_SMITH, 11, "Inteligencia irreal");
    }).toThrowError("El nivel de inteligencia es en escala del 1 al 10");
  });

  it('Debe lanzar error si el nivel de inteligencia es menor que 1', () => {
    expect(() => {
      new Personajes('P3', 'Jerry Smith', espTest, dimTest, Estados.VIVO, Afiliaciones.FAMILIA_SMITH, 0, 'Desc');
    }).toThrowError('El nivel de inteligencia es en escala del 1 al 10');
  });

  it('Debe actualizar especie, dimensión, estado, afiliación y nivel con setters', () => {
    const personaje = new Personajes('P4', 'Personaje Test', espTest, dimTest, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 6, 'Desc');

    personaje.setEspecie(espAlt);
    personaje.setDimensionOrigen(dimAlt);
    personaje.setEstado(Estados.DESCONOCIDO);
    personaje.setAfiliacion(Afiliaciones.CONSEJO_RICKS);
    personaje.setNivelInteligencia(9);

    expect(personaje.getEspecie().getId()).toBe('E2');
    expect(personaje.getDimensionOrigen().getId()).toBe('D2');
    expect(personaje.getEstado()).toBe(Estados.DESCONOCIDO);
    expect(personaje.getAfiliacion()).toBe(Afiliaciones.CONSEJO_RICKS);
    expect(personaje.getNivelInteligencia()).toBe(9);
  });

  it('Debe lanzar error al intentar asignar un nivel inválido con setNivelInteligencia', () => {
    const personaje = new Personajes('P5', 'Personaje Test 2', espTest, dimTest, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 7, 'Desc');

    expect(() => personaje.setNivelInteligencia(20)).toThrowError('El nivel de inteligencia es en escala del 1 al 10');
    expect(personaje.getNivelInteligencia()).toBe(7);
  });
});