import { Dimensiones } from "./Dimensiones";
import { Especies } from "./Especies";
import { InventosArtefactos } from "./InventosArtefactos";
import { Personajes } from "./Personajes";
import { PlanetasLocalizaciones } from "./PlanetasLocalizaciones";

export class GestorMultiverso {
  private dimensiones: Dimensiones[] = [];
  private personajes: Personajes[] = [];
  private especies: Especies[] = [];
  private planetasLocalizaciones: PlanetasLocalizaciones[] = [];
  private inventosArtefactos: InventosArtefactos[] = [];

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
}