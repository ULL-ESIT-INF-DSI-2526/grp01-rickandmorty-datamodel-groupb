import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GestorDataBase } from '../src/GestorDB';
import { Dimensiones, EstadoDimensiones, DimensionDatos } from '../src/Dimensiones';
import { Especies, TipoEspecie, EspecieDatos } from '../src/Especies';
import { Personajes, Estados, Afiliaciones, PersonajeDatos } from '../src/Personajes';
import { PlanetasLocalizaciones, TiposPlanetas, PlanetaLocalizacionDatos } from '../src/PlanetasLocalizaciones';
import { InventosArtefactos, TipoArtefacto, InventoArtefactoDatos } from '../src/InventosArtefactos';
import { ViajeInterdimensional, ViajeInterdimensionalDatos } from '../src/ViajeInterdimensional';

interface EsquemaMultiverso {
  dimensiones: DimensionDatos[];
  personajes: PersonajeDatos[];
  especies: EspecieDatos[];
  planetasLocalizaciones: PlanetaLocalizacionDatos[];
  inventosArtefactos: InventoArtefactoDatos[];
  viajesInterdimensionales: ViajeInterdimensionalDatos[];
  eventosGlobales: string[];
}

let mockDBData: EsquemaMultiverso | null = null;
const mockWrite = vi.fn();

vi.mock('lowdb/node', () => {
  return {
    JSONFilePreset: vi.fn().mockImplementation((_path: string, defaultData: EsquemaMultiverso) => {
      return Promise.resolve({
        data: mockDBData ? mockDBData : defaultData,
        write: mockWrite
      });
    })
  };
});

class TestGestorDB extends GestorDataBase {
  public async testInit() { await this.InicializarDB(); }
  public async testGuardar() { await this.guardarDatos(); }
  public getTestDimensiones() { return this.dimensiones; }
  public getTestInventos() { return this.inventosArtefactos; }
  public getTestEventosGlobales() { return this.eventosGlobales; }
}

describe('GestorDB', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockDBData = null;
  });

  it('Debe inicializar y mapear datos correctamente', async () => {
    mockDBData = {
      dimensiones: [{ id: 'D1', nombre: 'Dim', estado: EstadoDimensiones.ACTIVA, nivelTec: 1, descripcion: 'Desc' }],
      especies: [{ id: 'E1', nombre: 'Esp', origen: 'Ori', tipo: TipoEspecie.HUMANOIDE, esperanzaVida: 100, descripcion: 'Desc' }],
      planetasLocalizaciones: [{ id: 'L1', nombre: 'Loc', tipoPlaneta: TiposPlanetas.PLANETA, dimensionId: 'D1', poblacion: 10, descripcion: 'Desc' }],
      personajes: [{ id: 'P1', nombre: 'Per', dimensionOrigenId: 'D1', especieId: 'E1', estado: Estados.VIVO, afiliacion: Afiliaciones.INDEPENDIENTE, nivelInteligencia: 10, descripcion: 'Desc' }],
      inventosArtefactos: [{ id: 'I1', nombre: 'Inv', inventorId: 'P1', tipo: TipoArtefacto.ARMA, nivelPeligrosidad: 5, descripcion: 'Desc', localizacionDespliegueId: 'L1' }],
      viajesInterdimensionales: [{ personajeId: 'P1', dimensionDestinoId: 'D1', fechaViaje: new Date(), motivo: 'test' }],
      eventosGlobales: ['Evento 1']
    };

    const gestor = new TestGestorDB();
    await gestor.testInit();

    expect(gestor.getTestDimensiones().length).toBe(1);
    expect(gestor.getTestInventos()[0].getLocalizacionDespliegue()?.getId()).toBe('L1');
  });

  it('Debe lanzar error si faltan dependencias (Planeta sin Dimensión)', async () => {
    mockDBData = {
      dimensiones: [],
      especies: [],
      planetasLocalizaciones: [{ id: 'L1', nombre: 'Fallo', tipoPlaneta: TiposPlanetas.PLANETA, dimensionId: 'D999', poblacion: 0, descripcion: 'Desc' }],
      personajes: [], inventosArtefactos: [], viajesInterdimensionales: [], eventosGlobales: []
    };

    const gestor = new TestGestorDB();
    await expect(gestor.testInit()).rejects.toThrow('no encontrada para el planeta');
  });

  it('Debe lanzar error si faltan dependencias (Personaje sin Especie/Dimensión)', async () => {
    mockDBData = {
      dimensiones: [{ id: 'D1', nombre: 'Dim', estado: EstadoDimensiones.ACTIVA, nivelTec: 1, descripcion: 'Desc' }],
      especies: [],
      planetasLocalizaciones: [],
      personajes: [{ id: 'P1', nombre: 'Fallo', dimensionOrigenId: 'D1', especieId: 'E999', estado: Estados.VIVO, afiliacion: Afiliaciones.INDEPENDIENTE, nivelInteligencia: 10, descripcion: 'Desc' }],
      inventosArtefactos: [], viajesInterdimensionales: [], eventosGlobales: []
    };

    const gestor = new TestGestorDB();
    await expect(gestor.testInit()).rejects.toThrow('no existe o bien especie');
  });

  it('Debe asegurar la ejecución de los métodos map al guardar datos', async () => {
    const gestor = new TestGestorDB();
    await gestor.testInit();

    const dim = new Dimensiones('D1', 'Dim1', EstadoDimensiones.ACTIVA, 1, 'Desc');
    const esp = new Especies('E1', 'Humano', 'Tierra', TipoEspecie.HUMANOIDE, 80, 'Desc');
    const per = new Personajes('P1', 'Rick', esp, dim, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, 'Desc');
    const loc = new PlanetasLocalizaciones('L1', 'Tierra', TiposPlanetas.PLANETA, dim, 100, 'Desc');
    const inv1 = new InventosArtefactos('I1', 'Portal', 'Desc', per, TipoArtefacto.DISPOSITIVO_DE_VIAJE, 10, loc); // Con localización
    const inv2 = new InventosArtefactos('I2', 'Rayo', 'Desc', per, TipoArtefacto.ARMA, 8, null); // Sin localización
    const viaje: ViajeInterdimensional = { personaje: per, dimensionDestino: dim, fechaViaje: new Date(), motivo: 'Test' };

    type DBInternals = {
      dimensiones: Dimensiones[]; especies: Especies[]; planetasLocalizaciones: PlanetasLocalizaciones[];
      personajes: Personajes[]; inventosArtefactos: InventosArtefactos[]; viajesInterdimensionales: ViajeInterdimensional[];
      eventosGlobales: string[];
    };

    const internals = gestor as unknown as DBInternals;
    internals.dimensiones.push(dim);
    internals.especies.push(esp);
    internals.planetasLocalizaciones.push(loc);
    internals.personajes.push(per);
    internals.inventosArtefactos.push(inv1, inv2);
    internals.viajesInterdimensionales.push(viaje);
    internals.eventosGlobales.push("Evento Forzado");

    await gestor.testGuardar();
    expect(mockWrite).toHaveBeenCalled();
  });

  it('Debe asignar un array vacío a eventosGlobales si no existe en el JSON', async () => {
    const mockSinEventos: unknown = {
      dimensiones: [], especies: [], planetasLocalizaciones: [],
      personajes: [], inventosArtefactos: [], viajesInterdimensionales: []
    };

    mockDBData = mockSinEventos as EsquemaMultiverso;
    const gestor = new TestGestorDB();
    await gestor.testInit();

    expect(gestor.getTestEventosGlobales()).toEqual([]);
  });
});