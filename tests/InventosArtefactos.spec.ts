import { describe, it, expect } from 'vitest';
import { InventosArtefactos, TipoArtefacto } from '../src/InventosArtefactos'; 
import { Personajes, Estados, Afiliaciones } from '../src/Personajes';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';
import { Especies, TipoEspecie } from '../src/Especies';

describe('Clase InventosArtefactos', () => {
  const dimTest = new Dimensiones("D1", "Tierra C-137", EstadoDimensiones.ACTIVA, 8, "Desc");
  const espTest = new Especies("E1", "Humano", "Tierra", TipoEspecie.HUMANOIDE, 80, "Desc");
  const rick = new Personajes("P1", "Rick Sanchez", espTest, dimTest, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, "Inventor");

  it('Debe crearse correctamente con datos válidos', () => {
    const portalGun = new InventosArtefactos("I1", "Portal Gun", "Permite viajar entre dimensiones", rick, TipoArtefacto.DISPOSITIVO_DE_VIAJE, 10);
    
    expect(portalGun.getNombre()).toBe("Portal Gun");
    expect(portalGun.getInventor().getNombre()).toBe("Rick Sanchez");
    expect(portalGun.getTipo()).toBe(TipoArtefacto.DISPOSITIVO_DE_VIAJE);
    expect(portalGun.getNivelPeligrosidad()).toBe(10); 
  });

  it('Debe lanzar error si la peligrosidad no está entre 1 y 10', () => {
    expect(() => {
      new InventosArtefactos("I2", "Invento Roto", "Demasiado peligroso", rick, TipoArtefacto.ARMA, 15);
    }).toThrowError("El nivel de peligrosidad tiene que estar entre 1 y 10");
  });
});