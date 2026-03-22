import { GestorDataBase } from "./GestorDB";

import { Dimensiones, EstadoDimensiones } from "./Dimensiones";
import { Especies } from "./Especies";
import { InventosArtefactos } from "./InventosArtefactos";
import { Personajes } from "./Personajes";
import { PlanetasLocalizaciones } from "./PlanetasLocalizaciones";
import { ViajeInterdimensional } from "./ViajeInterdimensional";

/**
 * Fachada principal para operar con las entidades del multiverso.
 *
 * Implementa el patron Singleton y expone operaciones CRUD, consultas
 * especializadas e integracion de eventos interdimensionales.
 */
export class GestorMultiverso extends GestorDataBase {
  private static gestorMultiversoInstance: GestorMultiverso;

  private constructor() { super(); }

  /**
   * Obtiene la unica instancia del gestor y carga la base de datos si procede.
   * @returns Instancia inicializada de GestorMultiverso.
   */
  public static async getInstance(): Promise<GestorMultiverso> {
    if(!this.gestorMultiversoInstance) {
      this.gestorMultiversoInstance = new GestorMultiverso();
      await this.gestorMultiversoInstance.InicializarDB();
    }
    return this.gestorMultiversoInstance;
  }

  /** Devuelve todas las dimensiones registradas. */
  getDimensiones(): Dimensiones[] { return this.dimensiones; }
  /** Devuelve todos los personajes registrados. */
  getPersonajes(): Personajes[] { return this.personajes; }
  /** Devuelve todas las especies registradas. */
  getEspecies(): Especies[] { return this.especies; }
  /** Devuelve todas las localizaciones registradas. */
  getPlanetasLocalizaciones(): PlanetasLocalizaciones[] { return this.planetasLocalizaciones; }
  /** Devuelve todos los inventos y artefactos registrados. */
  getInventosArtefactos(): InventosArtefactos[] { return this.inventosArtefactos; }
  /** Devuelve el historial de eventos globales. */
  getEventosGlobales(): string[] { return this.eventosGlobales; }

  /**
   * Inserta una nueva dimension y persiste cambios.
   * @param nuevaDimension - Dimension a registrar.
   */
  async pushDimension(nuevaDimension: Dimensiones) { 
    this.dimensiones.push(nuevaDimension); 
    await this.guardarDatos();
  }

  /**
   * Inserta un nuevo personaje y persiste cambios.
   * @param nuevoPersonaje - Personaje a registrar.
   */
  async pushPersonaje(nuevoPersonaje: Personajes) { 
    this.personajes.push(nuevoPersonaje); 
    await this.guardarDatos();
  }

  /**
   * Inserta una nueva especie y persiste cambios.
   * @param nuevaEspecie - Especie a registrar.
   */
  async pushEspecie(nuevaEspecie: Especies) { 
    this.especies.push(nuevaEspecie); 
    await this.guardarDatos();
  }

  /**
   * Inserta una nueva localizacion y persiste cambios.
   * @param nuevoPlanetaLocalizacion - Localizacion a registrar.
   */
  async pushPlanetaLocalizacion(nuevoPlanetaLocalizacion: PlanetasLocalizaciones) { 
    this.planetasLocalizaciones.push(nuevoPlanetaLocalizacion); 
    await this.guardarDatos();
  }

  /**
   * Inserta un nuevo invento o artefacto y persiste cambios.
   * @param nuevoInventoArtefacto - Artefacto a registrar.
   */
  async pushInventosArtefactos(nuevoInventoArtefacto: InventosArtefactos) { 
    this.inventosArtefactos.push(nuevoInventoArtefacto); 
    await this.guardarDatos();
  }

  /**
   * Inserta un viaje interdimensional y persiste cambios.
   * @param nuevoViaje - Viaje a registrar.
   */
  async pushViajeInterdimensional(nuevoViaje: ViajeInterdimensional) {
    this.viajesInterdimensionales.push(nuevoViaje);
    await this.guardarDatos();
  }

  /**
   * Registra un evento global con sello temporal ISO.
   * @param mensaje - Mensaje del evento.
   */
  public async registrarEventoGlobal(mensaje: string) {
    const fecha = new Date().toISOString();
    this.eventosGlobales.push(`[${fecha}] ${mensaje}`);
    await this.guardarDatos();
  }

  /**
   * Elimina una dimension por su identificador.
   * @param id - ID de la dimension.
   */
  async deleteDimension(id: string) {
    this.dimensiones = this.dimensiones.filter(d => d.getId() !== id);
    await this.guardarDatos();
  }

  /**
   * Elimina un personaje por su identificador.
   * @param id - ID del personaje.
   */
  async deletePersonaje(id: string) {
    this.personajes = this.personajes.filter(p => p.getId() !== id);
    await this.guardarDatos();
  }

  /**
   * Elimina una especie por su identificador.
   * @param id - ID de la especie.
   */
  async deleteEspecie(id: string) {
    this.especies = this.especies.filter(e => e.getId() !== id);
    await this.guardarDatos();
  }

  /**
   * Elimina una localizacion por su identificador.
   * @param id - ID de la localizacion.
   */
  async deleteLocalizacion(id: string) {
    this.planetasLocalizaciones = this.planetasLocalizaciones.filter(l => l.getId() !== id);
    await this.guardarDatos();
  }

  /**
   * Elimina un invento por su identificador.
   * @param id - ID del invento.
   */
  async deleteInvento(id: string) {
    this.inventosArtefactos = this.inventosArtefactos.filter(i => i.getId() !== id);
    await this.guardarDatos();
  }

  /**
   * Fuerza el guardado de todas las estructuras en memoria.
   */
  async guardarCambios() {
    await this.guardarDatos();
  }

  /**
   * Detecta personajes afectados por dimensiones destruidas y genera alertas.
   *
   * @returns Lista de mensajes de alerta generados.
   */
  public async controlarEstadoGlobal(): Promise<string[]> {
    let alertas: string[] = [];
    const dimensionesDestruidas = this.dimensiones.filter(d => d.getEstado() === "destruida");

    dimensionesDestruidas.forEach(dim => {
      const personajesMuertos = this.personajes.filter(p => p.getDimensionOrigen().getId() === dim.getId() && p.getEstado() !== "muerto");
      personajesMuertos.forEach(p => {
        alertas.push(`ALERTA: El personaje ${p.getNombre()} (${p.getId()}) proviene de una dimensión DESTRUIDA (${dim.getNombre()}).`);
      });
    });

    if (alertas.length > 0) {
      await this.registrarEventoGlobal(`${alertas.length} personajes afectados por destrucción de dimensiones.`);
    }
    return alertas;
  }

  /**
   * Filtra solo las dimensiones que siguen activas.
   * @returns Arreglo de dimensiones activas.
   */
  getDimensionesActivas(): Dimensiones[] {
    return this.dimensiones.filter(d => d.getEstado() === "activa");
  }

  /**
   * Resume dimensiones activas y su nivel tecnologico medio.
   * @returns Objeto con listado de activas y media formateada.
   */
  getInformeDimensionesActivas() {
    const activas = this.getDimensionesActivas();
    const media = activas.length > 0 ? activas.reduce((sum, dim) => sum + dim.getNivelTec(), 0) / activas.length : 0;
    return { activas, nivelMedio: media.toFixed(2) };
  }

  /**
   * Obtiene los personajes con mayor numero de versiones alternativas.
   *
   * Se considera version alternativa a personajes con igual nombre y distinto ID.
   *
   * @returns Arreglo con los personajes empatados en el maximo de versiones.
   */
  getPersonajesConMasVersionesAlternativas(): Personajes[] {
    if (this.personajes.length === 0) { return []; }
    let maxVersiones: number = Math.max(...this.personajes.map(p => this.personajes.filter(p2 => p2.getNombre() === p.getNombre()).length));
    return this.personajes.filter(p => this.personajes.filter(p2 => p2.getNombre() === p.getNombre()).length === maxVersiones);   
  }

  /**
   * Busca todas las versiones de un personaje por nombre (sin importar mayusculas).
   * @param nombrePersonaje - Nombre base a buscar.
   * @returns Arreglo con coincidencias.
   */
  getVersionesAlternativas(nombrePersonaje: string): Personajes[] {
    return this.personajes.filter(p => p.getNombre().toLowerCase() === nombrePersonaje.toLowerCase());
  }

  /**
   * Devuelve inventos desplegados con alta peligrosidad (\>= 8), ordenados desc.
   * @returns Arreglo de inventos peligrosos desplegados.
   */
  getInventosPeligrososDesplegados(): InventosArtefactos[] {
    return this.inventosArtefactos.filter(i => i.getNivelPeligrosidad() >= 8 && i.getLocalizacionDespliegue() !== null).sort((a, b) => b.getNivelPeligrosidad() - a.getNivelPeligrosidad());
  }

  /**
   * Consulta los viajes registrados de un personaje concreto.
   * @param personajeId - ID del personaje.
   * @returns Historial de viajes del personaje.
   */
  getViajesInterdimensionales(personajeId: string): ViajeInterdimensional[] {
    return this.viajesInterdimensionales.filter(viaje => viaje.personaje.getId() === personajeId);
  }

  /**
   * Filtra personajes por un conjunto opcional de criterios.
   * @param filtros - Criterios de busqueda combinables.
   * @returns Personajes que cumplen los filtros.
   */
  filtrarPersonajes(filtros: { nombre?: string, especieId?: string, afiliacion?: string, estado?: string, dimensionId?: string }): Personajes[] {
    return this.personajes.filter(p => {
      let coincide = true;
      if (filtros.nombre && !p.getNombre().toLowerCase().includes(filtros.nombre.toLowerCase())) coincide = false;
      if (filtros.especieId && p.getEspecie().getId() !== filtros.especieId) coincide = false;
      if (filtros.afiliacion && p.getAfiliacion() !== filtros.afiliacion) coincide = false;
      if (filtros.estado && p.getEstado() !== filtros.estado) coincide = false;
      if (filtros.dimensionId && p.getDimensionOrigen().getId() !== filtros.dimensionId) coincide = false;
      return coincide;
    });
  }

  /**
   * Filtra localizaciones por nombre, tipo y/o dimension.
   * @param filtros - Criterios de busqueda combinables.
   * @returns Localizaciones que cumplen los filtros.
   */
  filtrarLocalizaciones(filtros: { nombre?: string, tipo?: string, dimensionId?: string }): PlanetasLocalizaciones[] {
    return this.planetasLocalizaciones.filter(l => {
      let coincide = true;
      if (filtros.nombre && !l.getNombre().toLowerCase().includes(filtros.nombre.toLowerCase())) coincide = false;
      if (filtros.tipo && l.getTipoPlaneta() !== filtros.tipo) coincide = false;
      if (filtros.dimensionId && l.getDimension().getId() !== filtros.dimensionId) coincide = false;
      return coincide;
    });
  }

  /**
   * Filtra inventos por nombre, tipo, inventor o peligrosidad exacta.
   * @param filtros - Criterios de busqueda combinables.
   * @returns Inventos que cumplen los filtros.
   */
  filtrarInventos(filtros: { nombre?: string, tipo?: string, inventorId?: string, peligrosidad?: number }): InventosArtefactos[] {
    return this.inventosArtefactos.filter(i => {
      let coincide = true;
      if (filtros.nombre && !i.getNombre().toLowerCase().includes(filtros.nombre.toLowerCase())) coincide = false;
      if (filtros.tipo && i.getTipo() !== filtros.tipo) coincide = false;
      if (filtros.inventorId && i.getInventor().getId() !== filtros.inventorId) coincide = false;
      if (filtros.peligrosidad && i.getNivelPeligrosidad() !== filtros.peligrosidad) coincide = false;
      return coincide;
    });
  }

  /**
   * Registra un viaje y lo anota en el historial de eventos globales.
   * @param viaje - Viaje a registrar.
   */
  async registrarViajeInterdimensional(viaje: ViajeInterdimensional) {
    this.viajesInterdimensionales.push(viaje);
    await this.registrarEventoGlobal(`VIAJE: ${viaje.personaje.getNombre()} viajó a ${viaje.dimensionDestino.getNombre()}. Motivo: ${viaje.motivo}`);
    await this.guardarDatos();
  }

  /**
   * Marca una dimension como destruida y actualiza efectos globales.
   * @param dimensionId - ID de la dimension a destruir.
   * @param motivo - Motivo narrativo/operativo de la destruccion.
   */
  async destruirDimension(dimensionId: string, motivo: string) {
    const dim = this.dimensiones.find(d => d.getId() === dimensionId);
    if (dim) {
      dim.setEstado(EstadoDimensiones.DESTRUIDA); 
      await this.registrarEventoGlobal(`DESTRUCCIÓN: La dimensión ${dim.getNombre()} ha sido destruida. Motivo: ${motivo}`);
      await this.controlarEstadoGlobal(); 
      await this.guardarDatos();
    }
  }

  /**
   * Despliega un invento en una localizacion y registra el evento.
   * @param inventoId - ID del invento.
   * @param localizacionId - ID de la localizacion destino.
   */
  async desplegarInvento(inventoId: string, localizacionId: string) {
    const invento = this.inventosArtefactos.find(i => i.getId() === inventoId);
    const localizacion = this.planetasLocalizaciones.find(l => l.getId() === localizacionId);
    
    if (invento && localizacion) {
      invento.setLocalizacionDespliegue(localizacion);
      await this.registrarEventoGlobal(`DESPLIEGUE: Artefacto [${invento.getNombre()}] desplegado en [${localizacion.getNombre()}].`);
      await this.guardarDatos();
    }
  }

  /**
   * Neutraliza un invento retirandolo de su localizacion actual.
   * @param inventoId - ID del invento a neutralizar.
   */
  async neutralizarInvento(inventoId: string) {
    const invento = this.inventosArtefactos.find(i => i.getId() === inventoId);
    if (invento && invento.getLocalizacionDespliegue()) {
      await this.registrarEventoGlobal(`NEUTRALIZACIÓN: Artefacto [${invento.getNombre()}] neutralizado/retirado de [${invento.getLocalizacionDespliegue()?.getNombre()}].`);
      invento.setLocalizacionDespliegue(null);
      await this.guardarDatos();
    }
  }
}