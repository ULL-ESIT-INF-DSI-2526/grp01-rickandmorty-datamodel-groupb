import { describe, it, expect, vi } from 'vitest';
import { GestorMultiverso } from '../src/GestorMultiverso';
import { Dimensiones, EstadoDimensiones } from '../src/Dimensiones';
import { Especies, TipoEspecie } from '../src/Especies';
import { Personajes, Estados, Afiliaciones } from '../src/Personajes';
import { InventosArtefactos, TipoArtefacto } from '../src/InventosArtefactos';
import { PlanetasLocalizaciones, TiposPlanetas } from '../src/PlanetasLocalizaciones';
import { ViajeInterdimensional } from '../src/ViajeInterdimensional';

type GestorMutable = {
    dimensiones: Dimensiones[];
    personajes: Personajes[];
    especies: Especies[];
    planetasLocalizaciones: PlanetasLocalizaciones[];
    inventosArtefactos: InventosArtefactos[];
    viajesInterdimensionales: ViajeInterdimensional[];
    eventosGlobales: string[];
};

function crearGestorVacio(): GestorMultiverso {
    const gestor = Object.create(GestorMultiverso.prototype) as GestorMultiverso;
    const estado = gestor as unknown as GestorMutable;

    estado.dimensiones = [];
    estado.personajes = [];
    estado.especies = [];
    estado.planetasLocalizaciones = [];
    estado.inventosArtefactos = [];
    estado.viajesInterdimensionales = [];
    estado.eventosGlobales = [];

    return gestor;
}

describe('GestorMultiverso', () => {
    it('Debe devolver solo dimensiones activas', () => {
        const gestor = crearGestorVacio();
        const d1 = new Dimensiones('D1', 'Activa 1', EstadoDimensiones.ACTIVA, 7, 'Desc');
        const d2 = new Dimensiones('D2', 'Destruida', EstadoDimensiones.DESTRUIDA, 4, 'Desc');
        const d3 = new Dimensiones('D3', 'Activa 2', EstadoDimensiones.ACTIVA, 9, 'Desc');

        (gestor as unknown as GestorMutable).dimensiones = [d1, d2, d3];

        const activas = gestor.getDimensionesActivas();
        expect(activas.map(d => d.getId())).toEqual(['D1', 'D3']);
    });

    it('Debe calcular correctamente el informe de dimensiones activas', () => {
        const gestor = crearGestorVacio();
        const d1 = new Dimensiones('D1', 'Activa 1', EstadoDimensiones.ACTIVA, 8, 'Desc');
        const d2 = new Dimensiones('D2', 'Activa 2', EstadoDimensiones.ACTIVA, 10, 'Desc');
        const d3 = new Dimensiones('D3', 'Cuarentena', EstadoDimensiones.CUARENTENA, 2, 'Desc');

        (gestor as unknown as GestorMutable).dimensiones = [d1, d2, d3];

        const informe = gestor.getInformeDimensionesActivas();
        expect(informe.activas.length).toBe(2);
        expect(informe.nivelMedio).toBe('9.00');
    });

    it('Debe devolver informe con media 0.00 si no hay dimensiones activas', () => {
        const gestor = crearGestorVacio();

        const informe = gestor.getInformeDimensionesActivas();
        expect(informe.activas).toEqual([]);
        expect(informe.nivelMedio).toBe('0.00');
    });

    it('Debe obtener personajes con más versiones alternativas', () => {
        const gestor = crearGestorVacio();
        const dim = new Dimensiones('D1', 'Activa', EstadoDimensiones.ACTIVA, 7, 'Desc');
        const esp = new Especies('E1', 'Humano', 'Tierra', TipoEspecie.HUMANOIDE, 80, 'Desc');

        const rick1 = new Personajes('P1', 'Rick Sanchez', esp, dim, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, 'Desc');
        const rick2 = new Personajes('P2', 'Rick Sanchez', esp, dim, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 9, 'Desc');
        const morty = new Personajes('P3', 'Morty Smith', esp, dim, Estados.VIVO, Afiliaciones.FAMILIA_SMITH, 5, 'Desc');

        (gestor as unknown as GestorMutable).personajes = [rick1, rick2, morty];

        const masVersiones = gestor.getPersonajesConMasVersionesAlternativas();
        expect(masVersiones.map(p => p.getId())).toEqual(['P1', 'P2']);
    });

    it('Debe buscar versiones alternativas ignorando mayúsculas/minúsculas', () => {
        const gestor = crearGestorVacio();
        const dim = new Dimensiones('D1', 'Activa', EstadoDimensiones.ACTIVA, 7, 'Desc');
        const esp = new Especies('E1', 'Humano', 'Tierra', TipoEspecie.HUMANOIDE, 80, 'Desc');

        (gestor as unknown as GestorMutable).personajes = [
            new Personajes('P1', 'Rick Sanchez', esp, dim, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, 'Desc'),
            new Personajes('P2', 'RICK SANCHEZ', esp, dim, Estados.VIVO, Afiliaciones.CONSEJO_RICKS, 9, 'Desc'),
            new Personajes('P3', 'Morty Smith', esp, dim, Estados.VIVO, Afiliaciones.FAMILIA_SMITH, 5, 'Desc'),
        ];

        const versiones = gestor.getVersionesAlternativas('rick sanchez');
        expect(versiones.length).toBe(2);
        expect(versiones.map(p => p.getId())).toEqual(['P1', 'P2']);
    });

    it('Debe devolver inventos peligrosos desplegados ordenados por peligrosidad', () => {
        const gestor = crearGestorVacio();
        const dim = new Dimensiones('D1', 'Activa', EstadoDimensiones.ACTIVA, 7, 'Desc');
        const esp = new Especies('E1', 'Humano', 'Tierra', TipoEspecie.HUMANOIDE, 80, 'Desc');
        const rick = new Personajes('P1', 'Rick Sanchez', esp, dim, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, 'Desc');
        const loc = new PlanetasLocalizaciones('L1', 'Ciudadela', TiposPlanetas.ESTACIONESPACIAL, dim, 5000, 'Desc');

        const i1 = new InventosArtefactos('I1', 'Portal Gun', 'Desc', rick, TipoArtefacto.DISPOSITIVO_DE_VIAJE, 10, loc);
        const i2 = new InventosArtefactos('I2', 'Rayo', 'Desc', rick, TipoArtefacto.ARMA, 8, loc);
        const i3 = new InventosArtefactos('I3', 'Bajo Peligro', 'Desc', rick, TipoArtefacto.OCA, 4, loc);
        const i4 = new InventosArtefactos('I4', 'Sin desplegar', 'Desc', rick, TipoArtefacto.ARMA, 9, null);

        (gestor as unknown as GestorMutable).inventosArtefactos = [i2, i3, i1, i4];

        const peligrosos = gestor.getInventosPeligrososDesplegados();
        expect(peligrosos.map(i => i.getId())).toEqual(['I1', 'I2']);
    });

    it('Debe devolver los viajes interdimensionales de un personaje por ID', () => {
        const gestor = crearGestorVacio();
        const dimOrigen = new Dimensiones('D1', 'Activa 1', EstadoDimensiones.ACTIVA, 8, 'Desc');
        const dimDestino = new Dimensiones('D2', 'Activa 2', EstadoDimensiones.ACTIVA, 7, 'Desc');
        const esp = new Especies('E1', 'Humano', 'Tierra', TipoEspecie.HUMANOIDE, 80, 'Desc');
        const rick = new Personajes('P1', 'Rick Sanchez', esp, dimOrigen, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, 'Desc');
        const morty = new Personajes('P2', 'Morty Smith', esp, dimOrigen, Estados.VIVO, Afiliaciones.FAMILIA_SMITH, 5, 'Desc');

        const viajeRick: ViajeInterdimensional = {
            personaje: rick,
            dimensionDestino: dimDestino,
            fechaViaje: new Date('2026-01-01T00:00:00.000Z'),
            motivo: 'Exploración'
        };

        const viajeMorty: ViajeInterdimensional = {
            personaje: morty,
            dimensionDestino: dimDestino,
            fechaViaje: new Date('2026-01-02T00:00:00.000Z'),
            motivo: 'Accidente'
        };

        (gestor as unknown as GestorMutable).viajesInterdimensionales = [viajeRick, viajeMorty];

        const viajesRick = gestor.getViajesInterdimensionales('P1');
        expect(viajesRick.length).toBe(1);
        expect(viajesRick[0].motivo).toBe('Exploración');
    });

    it('Debe generar alertas y registrar evento global si hay personajes vivos en dimensiones destruidas', async () => {
        const gestor = crearGestorVacio();
        const dimDestruida = new Dimensiones('D1', 'Destruida', EstadoDimensiones.DESTRUIDA, 3, 'Desc');
        const dimActiva = new Dimensiones('D2', 'Activa', EstadoDimensiones.ACTIVA, 8, 'Desc');
        const esp = new Especies('E1', 'Humano', 'Tierra', TipoEspecie.HUMANOIDE, 80, 'Desc');

        const vivoEnDestruida = new Personajes('P1', 'Rick', esp, dimDestruida, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, 'Desc');
        const muertoEnDestruida = new Personajes('P2', 'Morty', esp, dimDestruida, Estados.MUERTO, Afiliaciones.FAMILIA_SMITH, 5, 'Desc');
        const vivoEnActiva = new Personajes('P3', 'Summer', esp, dimActiva, Estados.VIVO, Afiliaciones.FAMILIA_SMITH, 7, 'Desc');

        (gestor as unknown as GestorMutable).dimensiones = [dimDestruida, dimActiva];
        (gestor as unknown as GestorMutable).personajes = [vivoEnDestruida, muertoEnDestruida, vivoEnActiva];

        const registrarSpy = vi.spyOn(gestor, 'registrarEventoGlobal').mockResolvedValue();

        const alertas = await gestor.controlarEstadoGlobal();

        expect(alertas.length).toBe(1);
        expect(alertas[0]).toContain('P1');
        expect(registrarSpy).toHaveBeenCalledTimes(1);
        expect(registrarSpy).toHaveBeenCalledWith('1 personajes afectados por destrucción de dimensiones.');
    });

    it('No debe registrar evento global si no hay alertas', async () => {
        const gestor = crearGestorVacio();
        const dimActiva = new Dimensiones('D1', 'Activa', EstadoDimensiones.ACTIVA, 8, 'Desc');
        const esp = new Especies('E1', 'Humano', 'Tierra', TipoEspecie.HUMANOIDE, 80, 'Desc');
        const personaje = new Personajes('P1', 'Rick', esp, dimActiva, Estados.VIVO, Afiliaciones.INDEPENDIENTE, 10, 'Desc');

        (gestor as unknown as GestorMutable).dimensiones = [dimActiva];
        (gestor as unknown as GestorMutable).personajes = [personaje];

        const registrarSpy = vi.spyOn(gestor, 'registrarEventoGlobal').mockResolvedValue();

        const alertas = await gestor.controlarEstadoGlobal();

        expect(alertas).toEqual([]);
        expect(registrarSpy).not.toHaveBeenCalled();
    });
});