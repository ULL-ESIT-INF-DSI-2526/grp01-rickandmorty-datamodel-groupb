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
  getPlanetasLocalizaciones(): 

}