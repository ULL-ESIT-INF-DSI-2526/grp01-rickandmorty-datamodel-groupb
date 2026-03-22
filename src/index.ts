const prompts = require('prompts');
import { GestorMultiverso } from './GestorMultiverso';
import { Dimensiones, EstadoDimensiones } from './Dimensiones';

async function iniciarMenu() {
  const gestor = await GestorMultiverso.getInstance();
  let salir = false;

  while (!salir) {
    const respuesta = await prompts({
      type: 'select',
      name: 'opcion',
      message: '¿Qué deseas hacer en el Multiverso?',
      choices: [
        { title: '1. Ver Dimensiones Activas', value: 'dimensiones' },
        { title: '2. Ver Personajes con más versiones alternativas', value: 'personajes' },
        { title: '3. Ver Inventos Peligrosos (Nivel >= 8)', value: 'inventos' },
        { title: '5. Salir', value: 'salir' }
      ]
    });

    switch (respuesta.opcion) {
      case 'dimensiones':
        const dims = gestor.getDimensionesActivas();
        console.log("\n--- DIMENSIONES ACTIVAS ---\n");
        if (dims.length === 0) console.log("No hay dimensiones registradas aún");
        dims.forEach(d => console.log(`- [${d.getId()}] ${d.getNombre()} (Nivel Tec: ${d.getNivelTec()})`));
        console.log("\n");
        break;

      case 'personajes':
        const pers = gestor.getPersonajesConMasVersionesAlternativas();
        console.log("\n--- PERSONAJES MÁS REPETIDOS ---\n");
        if (pers.length === 0) console.log("No hay personajes registrados aún");
        pers.forEach(p => console.log(`- ${p.getNombre()} (Origen: ${p.getDimensionOrigen().getNombre()})`));
        console.log("\n");
        break;

      case 'inventos':
        const invs = gestor.getInventosPeligrososEnDimensionesActivas();
        console.log("\n--- INVENTOS PELIGROSOS ---\n");
        if (invs.length === 0) console.log("No hay inventos registrados aún");
        invs.forEach(i => console.log(`- ${i.getNombre()} (Peligro: ${i.getNivelPeligrosidad()} - Inventor: ${i.getInventor().getNombre()})`));
        console.log("\n");
        break;

      case 'salir':
      default:
        salir = true;
        console.log("\n¡Wubba Lubba Dub Dub! Apagando el portal...\n");
        break;
    }
  }
}

iniciarMenu();