import { describe, it, expect } from 'vitest';
import { InventosArtefactos, TipoArtefacto } from '../src/InventosArtefactos'; 
import { Personajes, Estados, Afiliaciones } from '../src/Personajes';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';
import { Especies, TipoEspecie } from '../src/Especies';
import { PlanetasLocalizaciones, TiposPlanetas } from '../src/PlanetasLocalizaciones';

describe('Clase InventosArtefactos', () => {
  const dimTest = new Dimensiones("D1", "Tierra C-137", EstadoDimensiones.ACTIVA, 8, "Desc");
  const espTest = new Especies("E1", "Humano", "Tierra", TipoEspecie.HUMANOIDE, 80, "Desc");
  const rick = new Personajes("P1", "Rick Sanchez", espTest, dimTest, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, "Inventor");
  const loc = new PlanetasLocalizaciones('L1', 'Ciudadela', TiposPlanetas.ESTACIONESPACIAL, dimTest, 1000000, 'Base principal');

  it('Debe crearse correctamente con datos válidos', () => {
    const portalGun = new InventosArtefactos("I1", "Portal Gun", "Permite viajar entre dimensiones", rick, TipoArtefacto.DISPOSITIVO_DE_VIAJE, 10);
    
    expect(portalGun.getNombre()).toBe("Portal Gun");
    expect(portalGun.getInventor().getNombre()).toBe("Rick Sanchez");
    expect(portalGun.getTipo()).toBe(TipoArtefacto.DISPOSITIVO_DE_VIAJE);
    expect(portalGun.getNivelPeligrosidad()).toBe(10); 
    expect(portalGun.getLocalizacionDespliegue()).toBeNull();
  });

  it('Debe permitir asignar localización de despliegue en el constructor', () => {
    const artefacto = new InventosArtefactos('I_LOC', 'Rayo', 'Con localización', rick, TipoArtefacto.ARMA, 8, loc);

    expect(artefacto.getLocalizacionDespliegue()?.getId()).toBe('L1');
  });

  it('Debe lanzar error si la peligrosidad no está entre 1 y 10', () => {
    expect(() => {
      new InventosArtefactos("I2", "Invento Roto", "Demasiado peligroso", rick, TipoArtefacto.ARMA, 15);
    }).toThrowError("El nivel de peligrosidad tiene que estar entre 1 y 10");
  });

  it('Debe lanzar error si el inventor es null', () => {
    expect(() => {
      new InventosArtefactos('I3', 'Invento sin creador', 'Sin inventor', null as unknown as Personajes, TipoArtefacto.ARMA, 4);
    }).toThrowError('El inventor no puede estar vacío');
  });

  it('Debe actualizar correctamente inventor, tipo, peligrosidad y localización', () => {
    const dimAlt = new Dimensiones('D2', 'Tierra C-500A', EstadoDimensiones.ACTIVA, 9, 'Desc');
    const espAlt = new Especies('E2', 'Robot', 'Planeta Gear', TipoEspecie.ROBOTICO, 300, 'Desc');
    const inventorAlt = new Personajes('P2', 'Gearhead', espAlt, dimAlt, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 7, 'Mecánico');
    const locAlt = new PlanetasLocalizaciones('L2', 'Planeta Gear', TiposPlanetas.PLANETA, dimAlt, 500000, 'Desc');
    const artefacto = new InventosArtefactos('I4', 'Herramienta', 'Desc', rick, TipoArtefacto.OCA, 3);

    artefacto.setInventor(inventorAlt);
    artefacto.setTipo(TipoArtefacto.BIOTECNOLOGIA);
    artefacto.setNivelPeligrosidad(9);
    artefacto.setLocalizacionDespliegue(locAlt);

    expect(artefacto.getInventor().getId()).toBe('P2');
    expect(artefacto.getTipo()).toBe(TipoArtefacto.BIOTECNOLOGIA);
    expect(artefacto.getNivelPeligrosidad()).toBe(9);
    expect(artefacto.getLocalizacionDespliegue()?.getId()).toBe('L2');
  });

  it('Debe lanzar error si setNivelPeligrosidad recibe valor fuera de rango', () => {
    const artefacto = new InventosArtefactos('I5', 'Artefacto Test', 'Desc', rick, TipoArtefacto.ARMA, 6);

    expect(() => artefacto.setNivelPeligrosidad(0)).toThrowError('El nivel de peligrosidad tiene que estar entre 1 y 10');
    expect(artefacto.getNivelPeligrosidad()).toBe(6);
  });

  it('Debe permitir limpiar la localización con null', () => {
    const artefacto = new InventosArtefactos('I6', 'Artefacto Desplegable', 'Desc', rick, TipoArtefacto.ARMA, 8, loc);

    artefacto.setLocalizacionDespliegue(null);

    expect(artefacto.getLocalizacionDespliegue()).toBeNull();
  });
});