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

  // Listado de dimensiones activas con su nivel tecnonlogico
  getDimensionesActivas(): Dimensiones[] {
    return this.dimensiones.filter(d => d.getEstado() === "activa");
  }

  // Personajes con mayor número de versiones alternativas
  // Mismo nombre con diferente id
  getPersonajesConMasVersionesAlternativas(): Personajes[] {
    let maxVersiones: number = Math.max(...this.personajes.map(p => this.personajes.filter( p2 => p2.getNombre() === p.getNombre()).length));
    return this.personajes.filter(p => this.personajes.filter(p2 => p2.getNombre() === p.getNombre()).length === maxVersiones);   
  }

  // Inventos más peligrosos desplegados en dimensiones activas | implementación actual retorna cuando peligro >= 8
  // Para sacar la dimensión de un artefacto acceder al atributo de dimensión de origen del inventor
  getInventosPeligrososEnDimensionesActivas(): InventosArtefactos[] {
    let inventosEnDimensionesActivas: InventosArtefactos[] = this.inventosArtefactos.filter(invento => this.dimensiones.some(dimension => dimension.getId() === invento.getInventor().getDimensionOrigen().getId() && dimension.getEstado() === "activa"));
    return inventosEnDimensionesActivas.filter(invento => invento.getNivelPeligrosidad() >= 8);
  }

  // Viajes interdimensionales de un personaje especifico por ID
  getViajesInterdimensionales(personajeId: string): ViajeInterdimensional[] {
    return this.viajesInterdimensionales.filter(viaje => viaje.personaje.getId() === personajeId);
  }
}