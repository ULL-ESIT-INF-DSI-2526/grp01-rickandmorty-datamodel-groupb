import { Dimensiones } from "./Dimensiones";
import { Especies } from "./Especies";
import { InventosArtefactos } from "./InventosArtefactos";
import { Personajes } from "./Personajes";
import { PlanetasLocalizaciones } from "./PlanetasLocalizaciones";

type ViajeInterdimensional = {
  personaje: Personajes;
  dimensionDestino: Dimensiones;
  fechaViaje: Date;
  motivo: string;
};

export class GestorMultiverso {
  private dimensiones: Dimensiones[] = [];
  private personajes: Personajes[] = [];
  private especies: Especies[] = [];
  private planetasLocalizaciones: PlanetasLocalizaciones[] = [];
  private inventosArtefactos: InventosArtefactos[] = [];
  private viajesInterdimensionales: ViajeInterdimensional[] = [];

  // En el constructor hay que cargar la base de datos
  // constructor(db) {}

  // Getters
  getDimensiones(): Dimensiones[] { return this.dimensiones; }
  getPersonajes(): Personajes[] { return this.personajes; }
  getEspecies(): Especies[] { return this.especies; }
  getPlanetasLocalizaciones(): PlanetasLocalizaciones[] { return this.planetasLocalizaciones; }
  getInventosArtefactos(): InventosArtefactos[] { return this.inventosArtefactos; }

  // Añadir datos
  pushDimension(nuevaDimension: Dimensiones) { this.dimensiones.push(nuevaDimension); }
  pushPersonaje(nuevoPersonaje: Personajes) { this.personajes.push(nuevoPersonaje); }
  pushEspecie(nuevaEspecie: Especies) { this.especies.push(nuevaEspecie); }
  pushPlanetaLocalizacion(nuevoPlanetaLocalizacion: PlanetasLocalizaciones) { this.planetasLocalizaciones.push(nuevoPlanetaLocalizacion); }
  pushInventosArtefactos(nuevoInventoArtefacto: InventosArtefactos) { this.inventosArtefactos.push(nuevoInventoArtefacto); }

  //Listado de dimensiones activas con su nivel tecnonlogico
  getDimensionesActivas(): Dimensiones[] {
    return this.dimensiones.filter( d => d.getEstado() === "activa");
  }

  // Personajes con mayor numero de versiones alternativas
  // Mismo nombre con diferente id
  getPersonajesConMasVersionesAlternativas(): Personajes[] {
    let maxVersiones: number = Math.max(...this.personajes.map( p => this.personajes.filter( p2 => p2.getNombre() === p.getNombre()).length));
    return this.personajes.filter( p => this.personajes.filter( p2 => p2.getNombre() === p.getNombre()).length === maxVersiones);   
  }

  // Inventos mas peligrosos desplegados en dimensiones activas | implementacion actual retorna cuando peligro >= 8
  // Para sacar la dimension de un artefacto acceder al atributo de dimension de origen del inventor
  getInventosPeligrososEnDimensionesActivas(): InventosArtefactos[] {
    let inventosEnDimensionesActivas: InventosArtefactos[] = this.inventosArtefactos.filter( invento => this.dimensiones.some( dimension => dimension.getId() === invento.getInventor().getDimensionOrigen().getId() && dimension.getEstado() === "activa"));
    return inventosEnDimensionesActivas.filter( invento => invento.getNivelPeligrosidad() >= 8);
  }

  // Viajes interdimensionales de un personaje especifico por ID
  getViajesInterdimensionales(personajeId: string): ViajeInterdimensional[] {
    return this.viajesInterdimensionales.filter( viaje => viaje.personaje.getId() === personajeId);
  }
}