import { JSONFilePreset } from 'lowdb/node'
import { Low } from 'lowdb'

import { Dimensiones, DimensionDatos } from "./Dimensiones";
import { Especies, EspecieDatos } from "./Especies";
import { InventosArtefactos, InventoArtefactoDatos } from "./InventosArtefactos";
import { Personajes, PersonajeDatos } from "./Personajes";
import { PlanetasLocalizaciones, PlanetaLocalizacionDatos } from "./PlanetasLocalizaciones";
import { ViajeInterdimensional, ViajeInterdimensionalDatos } from "./ViajeInterdimensional";

interface EsquemaMultiverso {
  dimensiones: DimensionDatos[];
  personajes: PersonajeDatos[];
  especies: EspecieDatos[];
  planetasLocalizaciones: PlanetaLocalizacionDatos[];
  inventosArtefactos: InventoArtefactoDatos[];
  viajesInterdimensionales: ViajeInterdimensionalDatos[];
  eventosGlobales: string[];
}

export class GestorDataBase {
  private dataBase!: Low<EsquemaMultiverso>;

  protected dimensiones: Dimensiones[] = [];
  protected personajes: Personajes[] = [];
  protected especies: Especies[] = [];
  protected planetasLocalizaciones: PlanetasLocalizaciones[] = [];
  protected inventosArtefactos: InventosArtefactos[] = [];
  protected viajesInterdimensionales: ViajeInterdimensional[] = [];
  protected eventosGlobales: string[] = [];

  // Función que inicializa la DB
  protected async InicializarDB() {
    const defaultData: EsquemaMultiverso = {
      dimensiones: [],
      personajes: [],
      especies: [],
      planetasLocalizaciones: [],
      inventosArtefactos: [],
      viajesInterdimensionales: [],
      eventosGlobales: []
    }

    this.dataBase = await JSONFilePreset<EsquemaMultiverso>("../db/db.json", defaultData);    

    // Cargamos los datos que no tienen dependencias
    this.eventosGlobales = this.dataBase.data.eventosGlobales || [];

    this.dimensiones = this.dataBase.data.dimensiones.map(d => 
      new Dimensiones(d.id, d.nombre, d.estado, d.nivelTec, d.descripcion)
    );

    this.especies = this.dataBase.data.especies.map(e => 
      new Especies(e.id, e.nombre, e.origen, e.tipo, e.esperanzaVida, e.descripcion)
    );

    // Cargamos los datos que dependen de otros
    this.planetasLocalizaciones = this.dataBase.data.planetasLocalizaciones.map(p => {
      const dimReal = this.dimensiones.find(d => d.getId() === p.dimensionId);

      if (!dimReal) { throw new Error(`Dimensión ${p.dimensionId} no encontrada para el planeta ${p.nombre}`)}
      return new PlanetasLocalizaciones(p.id, p.nombre, p.tipoPlaneta, dimReal, p.poblacion, p.descripcion);
    });

    this.personajes = this.dataBase.data.personajes.map(p => {
      const dimReal = this.dimensiones.find(d => d.getId() === p.dimensionOrigenId);
      const espReal = this.especies.find(e => e.getId() === p.especieId);

      if (!dimReal || !espReal) { throw new Error(`Dimensión ${p.dimensionOrigenId} no existe o bien especie ${p.especieId} no existe`)}
      return new Personajes(p.id, p.nombre, espReal, dimReal, p.estado, p.afiliacion, p.nivelInteligencia, p.descripcion);
    });

    this.inventosArtefactos = this.dataBase.data.inventosArtefactos.map(i => {
      const perReal = this.personajes.find(p => p.getId() === i.inventorId);
      if (!perReal) { throw new Error(`Inventor con ${i.inventorId} no encontrado para el invento ${i.id}`); }

      let locReal = null;
      if (i.localizacionDespliegueId) {
        locReal = this.planetasLocalizaciones.find(l => l.getId() === i.localizacionDespliegueId) || null;
      }

      return new InventosArtefactos(i.id, i.nombre, i.descripcion, perReal, i.tipo, i.nivelPeligrosidad, locReal);
    });

    // Cargamos los viajes interdimensionales
    this.viajesInterdimensionales = this.dataBase.data.viajesInterdimensionales.map(v => {
      const perReal = this.personajes.find(p => p.getId() === v.personajeId);
      const dimReal = this.dimensiones.find(d => d.getId() === v.dimensionDestinoId);

      if (!perReal || !dimReal) { throw new Error(`Personaje ${v.personajeId} o Dimensión ${v.dimensionDestinoId} no encontrados para el viaje`); }
      return {
        personaje: perReal,
        dimensionDestino: dimReal,
        fechaViaje: new Date(v.fechaViaje), // Convertimos el string del JSON a Date
        motivo: v.motivo
      };
    });
  }

  // Función que guarda datos a la DB
  protected async guardarDatos(): Promise<void> {
    this.dataBase.data.dimensiones = this.dimensiones.map(d => ({
      id: d.getId(), nombre: d.getNombre(), estado: d.getEstado(), nivelTec: d.getNivelTec(), descripcion: d.getDesc()
    }));

    this.dataBase.data.especies = this.especies.map(e => ({
      id: e.getId(), nombre: e.getNombre(), origen: e.getOrigen(), tipo: e.getTipo(), esperanzaVida: e.getEsperanzaVida(), descripcion: e.getDesc()
    }));

    this.dataBase.data.planetasLocalizaciones = this.planetasLocalizaciones.map(p => ({
      id: p.getId(), nombre: p.getNombre(), tipoPlaneta: p.getTipoPlaneta(), dimensionId: p.getDimension().getId(), poblacion: p.getPoblacion(), descripcion: p.getDesc()
    }));

    this.dataBase.data.personajes = this.personajes.map(p => ({
      id: p.getId(), nombre: p.getNombre(), dimensionOrigenId: p.getDimensionOrigen().getId(), especieId: p.getEspecie().getId(), estado: p.getEstado(), afiliacion: p.getAfiliacion(), nivelInteligencia: p.getNivelInteligencia(), descripcion: p.getDesc()
    }));

    this.dataBase.data.inventosArtefactos = this.inventosArtefactos.map(i => ({
      id: i.getId(), nombre: i.getNombre(), inventorId: i.getInventor().getId(), tipo: i.getTipo(), nivelPeligrosidad: i.getNivelPeligrosidad(), descripcion: i.getDesc(),
      localizacionDespliegueId: i.getLocalizacionDespliegue()?.getId() || null
    }));

    this.dataBase.data.viajesInterdimensionales = this.viajesInterdimensionales.map(v => ({
      personajeId: v.personaje.getId(), dimensionDestinoId: v.dimensionDestino.getId(), fechaViaje: v.fechaViaje, motivo: v.motivo
    }));

    this.dataBase.data.eventosGlobales = this.eventosGlobales;

    await this.dataBase.write();
  }
}