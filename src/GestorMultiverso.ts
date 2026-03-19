import { JSONFilePreset } from 'lowdb/node'
import { Low } from 'lowdb'

import { Dimensiones, DimensionDatos } from "./Dimensiones";
import { Especies, EspecieDatos } from "./Especies";
import { InventosArtefactos, InventoArtefactoDatos } from "./InventosArtefactos";
import { Personajes, PersonajeDatos } from "./Personajes";
import { PlanetasLocalizaciones, PlanetaLocalizacionDatos } from "./PlanetasLocalizaciones";

type ViajeInterdimensional = {
  personaje: Personajes;
  dimensionDestino: Dimensiones;
  fechaViaje: Date;
  motivo: string;
}

interface ViajeInterdimensionalDatos {
  personajeId: string;
  dimensionDestinoId: string;
  fechaViaje: Date;
  motivo: string;
}

interface EsquemaMultiverso {
  dimensiones: DimensionDatos[];
  personajes: PersonajeDatos[];
  especies: EspecieDatos[];
  planetasLocalizaciones: PlanetaLocalizacionDatos[];
  inventosArtefactos: InventoArtefactoDatos[];
  viajesInterdimensionales: ViajeInterdimensionalDatos[];
}

export class GestorMultiverso {
  private static gestorMultiversoInstance: GestorMultiverso;
  private dataBase!: Low<EsquemaMultiverso>;

  private dimensiones: Dimensiones[] = [];
  private personajes: Personajes[] = [];
  private especies: Especies[] = [];
  private planetasLocalizaciones: PlanetasLocalizaciones[] = [];
  private inventosArtefactos: InventosArtefactos[] = [];
  private viajesInterdimensionales: ViajeInterdimensional[] = [];

  private constructor() {}

  // Cargamos la base de datos junto con el singleton
  public static async getInstance(): Promise<GestorMultiverso> {
    if(!this.gestorMultiversoInstance) {
      this.gestorMultiversoInstance = new GestorMultiverso();
      await this.gestorMultiversoInstance.InicializarDB();
    }
    return this.gestorMultiversoInstance;
  }

  // Función que inicializa la DB
  private async InicializarDB() {
    const defaultData: EsquemaMultiverso = {
      dimensiones: [],
      personajes: [],
      especies: [],
      planetasLocalizaciones: [],
      inventosArtefactos: [],
      viajesInterdimensionales: []
    }

    this.dataBase = await JSONFilePreset<EsquemaMultiverso>("db.json", defaultData);    

    // Cargamos los datos que no tienen dependencias
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
      return new InventosArtefactos(i.id, i.nombre, i.descripcion, perReal, i.tipo, i.nivelPeligrosidad);
    });
  }

  // Función que guarda datos a la DB
  public async guardarDatos(): Promise<void> {
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
      id: i.getId(), nombre: i.getNombre(), inventorId: i.getInventor().getId(), tipo: i.getTipo(), nivelPeligrosidad: i.getNivelPeligrosidad(), descripcion: i.getDesc()
    }));

    await this.dataBase.write();
  }

  // Getters
  getDimensiones(): Dimensiones[] { return this.dimensiones; }
  getPersonajes(): Personajes[] { return this.personajes; }
  getEspecies(): Especies[] { return this.especies; }
  getPlanetasLocalizaciones(): PlanetasLocalizaciones[] { return this.planetasLocalizaciones; }
  getInventosArtefactos(): InventosArtefactos[] { return this.inventosArtefactos; }

  // Añadir datos
  async pushDimension(nuevaDimension: Dimensiones) { 
    this.dimensiones.push(nuevaDimension); 
    await this.guardarDatos();
  }

  async pushPersonaje(nuevoPersonaje: Personajes) { 
    this.personajes.push(nuevoPersonaje); 
    await this.guardarDatos();
  }

  async pushEspecie(nuevaEspecie: Especies) { 
    this.especies.push(nuevaEspecie); 
    await this.guardarDatos();
  }

  async pushPlanetaLocalizacion(nuevoPlanetaLocalizacion: PlanetasLocalizaciones) { 
    this.planetasLocalizaciones.push(nuevoPlanetaLocalizacion); 
    await this.guardarDatos();
  }

  async pushInventosArtefactos(nuevoInventoArtefacto: InventosArtefactos) { 
    this.inventosArtefactos.push(nuevoInventoArtefacto); 
    await this.guardarDatos();
  }

  // Listado de dimensiones activas con su nivel tecnonlogico
  getDimensionesActivas(): Dimensiones[] {
    return this.dimensiones.filter( d => d.getEstado() === "activa");
  }

  // Personajes con mayor número de versiones alternativas
  // Mismo nombre con diferente id
  getPersonajesConMasVersionesAlternativas(): Personajes[] {
    let maxVersiones: number = Math.max(...this.personajes.map( p => this.personajes.filter( p2 => p2.getNombre() === p.getNombre()).length));
    return this.personajes.filter( p => this.personajes.filter( p2 => p2.getNombre() === p.getNombre()).length === maxVersiones);   
  }

  // Inventos más peligrosos desplegados en dimensiones activas | implementación actual retorna cuando peligro >= 8
  // Para sacar la dimensión de un artefacto acceder al atributo de dimensión de origen del inventor
  getInventosPeligrososEnDimensionesActivas(): InventosArtefactos[] {
    let inventosEnDimensionesActivas: InventosArtefactos[] = this.inventosArtefactos.filter(invento => this.dimensiones.some( dimension => dimension.getId() === invento.getInventor().getDimensionOrigen().getId() && dimension.getEstado() === "activa"));
    return inventosEnDimensionesActivas.filter(invento => invento.getNivelPeligrosidad() >= 8);
  }

  // Viajes interdimensionales de un personaje especifico por ID
  getViajesInterdimensionales(personajeId: string): ViajeInterdimensional[] {
    return this.viajesInterdimensionales.filter(viaje => viaje.personaje.getId() === personajeId);
  }
}