import { GestorDataBase } from "./GestorDB";

import { Dimensiones } from "./Dimensiones";
import { Especies } from "./Especies";
import { InventosArtefactos } from "./InventosArtefactos";
import { Personajes } from "./Personajes";
import { PlanetasLocalizaciones } from "./PlanetasLocalizaciones";
import { ViajeInterdimensional } from "./ViajeInterdimensional";

export class GestorMultiverso extends GestorDataBase {
  private static gestorMultiversoInstance: GestorMultiverso;

  private constructor() { super(); }

  // Cargamos la base de datos junto con el singleton
  public static async getInstance(): Promise<GestorMultiverso> {
    if(!this.gestorMultiversoInstance) {
      this.gestorMultiversoInstance = new GestorMultiverso();
      await this.gestorMultiversoInstance.InicializarDB();
    }
    return this.gestorMultiversoInstance;
  }

  // Getters
  getDimensiones(): Dimensiones[] { return this.dimensiones; }
  getPersonajes(): Personajes[] { return this.personajes; }
  getEspecies(): Especies[] { return this.especies; }
  getPlanetasLocalizaciones(): PlanetasLocalizaciones[] { return this.planetasLocalizaciones; }
  getInventosArtefactos(): InventosArtefactos[] { return this.inventosArtefactos; }
  getEventosGlobales(): string[] { return this.eventosGlobales; }

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

  async pushViajeInterdimensional(nuevoViaje: ViajeInterdimensional) {
    this.viajesInterdimensionales.push(nuevoViaje);
    await this.guardarDatos();
  }

  public async registrarEventoGlobal(mensaje: string) {
    const fecha = new Date().toISOString();
    this.eventosGlobales.push(`[${fecha}] ${mensaje}`);
    await this.guardarDatos();
  }

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

  // Listado de dimensiones activas con su nivel tecnológico medio
  getDimensionesActivas(): Dimensiones[] {
    return this.dimensiones.filter(d => d.getEstado() === "activa");
  }

  getInformeDimensionesActivas() {
    const activas = this.getDimensionesActivas();
    const media = activas.length > 0 ? activas.reduce((sum, dim) => sum + dim.getNivelTec(), 0) / activas.length : 0;
    return { activas, nivelMedio: media.toFixed(2) };
  }

  // Personajes con mayor número de versiones alternativas
  // Mismo nombre con diferente id
  getPersonajesConMasVersionesAlternativas(): Personajes[] {
    if (this.personajes.length === 0) { return []; }
    let maxVersiones: number = Math.max(...this.personajes.map(p => this.personajes.filter(p2 => p2.getNombre() === p.getNombre()).length));
    return this.personajes.filter(p => this.personajes.filter(p2 => p2.getNombre() === p.getNombre()).length === maxVersiones);   
  }

  getVersionesAlternativas(nombrePersonaje: string): Personajes[] {
    return this.personajes.filter(p => p.getNombre().toLowerCase() === nombrePersonaje.toLowerCase());
  }

  // Inventos más peligrosos desplegados en dimensiones activas | implementación actual retorna cuando peligro >= 8
  // Para sacar la dimensión de un artefacto acceder al atributo de dimensión de origen del inventor
  getInventosPeligrososDesplegados(): InventosArtefactos[] {
    return this.inventosArtefactos.filter(i => i.getNivelPeligrosidad() >= 8 && i.getLocalizacionDespliegue() !== null).sort((a, b) => b.getNivelPeligrosidad() - a.getNivelPeligrosidad());
  }

  // Viajes interdimensionales de un personaje especifico por ID
  getViajesInterdimensionales(personajeId: string): ViajeInterdimensional[] {
    return this.viajesInterdimensionales.filter(viaje => viaje.personaje.getId() === personajeId);
  }
}