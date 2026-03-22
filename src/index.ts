const prompts = require('prompts');
import { GestorMultiverso } from './GestorMultiverso';
import { Dimensiones, EstadoDimensiones } from './Dimensiones';
import { Personajes, Afiliaciones } from './Personajes';
import { InventosArtefactos } from './InventosArtefactos';

async function iniciarMenu() {
  const gestor = await GestorMultiverso.getInstance();
  let salir = false;

  while (!salir) {
    const respuesta = await prompts({
      type: 'select',
      name: 'opcion',
      message: '¿Qué quieres hacer?',
      choices: [
        { title: '\n1. Ver Dimensiones Activas', value: 'dimensiones' },
        { title: '2. Ver Personajes con más versiones alternativas', value: 'personajes' },
        { title: '3. Ver Inventos Peligrosos (Nivel >= 8)', value: 'inventos' },
        { title: '4. Añadir Nueva Dimensión', value: 'new_dimensiones' },
        { title: '5. Añadir Nuevo Personaje', value: 'new_personajes' },
        { title: '6. Añadir Nuevo Invento ', value: 'new_inventos' },
        { title: '7. Salir', value: 'salir' }
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
        const invs = gestor.getInventosPeligrososDesplegados();
        console.log("\n--- INVENTOS PELIGROSOS ---\n");
        if (invs.length === 0) console.log("No hay inventos registrados aún");
        invs.forEach(i => console.log(`- ${i.getNombre()} (Peligro: ${i.getNivelPeligrosidad()} - Inventor: ${i.getInventor().getNombre()})`));
        console.log("\n");
        break;
      
      case 'new_dimensiones':
        const rDim = await prompts([
          { type: 'text', name: 'id', message: 'ID (ej. D-1):' },
          { type: 'text', name: 'nombre', message: 'Nombre:' },
          {
            type: 'select', name: 'estado', message: 'Estado:',
            choices: [
              { title: 'Activa', value: EstadoDimensiones.ACTIVA },
              { title: 'Destruida', value: EstadoDimensiones.DESTRUIDA },
              { title: 'Cuarentena', value: EstadoDimensiones.CUARENTENA }
            ]
          },
          { type: 'number', name: 'tec', message: 'Nivel Tec (1-10):', min: 1, max: 10 },
          { type: 'text', name: 'desc', message: 'Descripción:' }
        ]);
        if (rDim.id && rDim.nombre) {
          const nDim = new Dimensiones(rDim.id, rDim.nombre, rDim.estado, rDim.tec, rDim.desc);
          await gestor.pushDimension(nDim);
          console.log("\nDimensión guardada\n");
        }
        break;
      
      case 'new_personajes':
        const misDims = gestor.getDimensionesActivas();
        const misEsps = gestor.getEspecies();

        const rPer = await prompts([
          { type: 'text', name: 'id', message: 'ID Personaje:' },
          { type: 'text', name: 'nombre', message: 'Nombre:' },
          {
            type: 'select', name: 'espIdx', message: 'Especie:',
            choices: misEsps.map((e, idx) => ({ title: e.getNombre(), value: idx }))
          },
          {
            type: 'select', name: 'dimIdx', message: 'Dimensión de Origen:',
            choices: misDims.map((d, idx) => ({ title: d.getNombre(), value: idx }))
          },
          { type: 'text', name: 'estado', message: 'Estado (vivo/muerto):' },
          { type: 'number', name: 'intel', message: 'Inteligencia (1-10):' }
        ]);

        if (rPer.nombre) {
          const nPer = new Personajes(
            rPer.id, rPer.nombre, misEsps[rPer.espIdx], misDims[rPer.dimIdx], 
            rPer.estado, Afiliaciones.INDEPENDIENTE, rPer.intel, "Sin descripción"
          );
          await gestor.pushPersonaje(nPer);
          console.log("\nPersonaje guardado\n");
        }
        break;

      case 'new_inventos':
        const misPers = gestor.getPersonajesConMasVersionesAlternativas();
        const misDims2 = gestor.getDimensionesActivas();

        const rInv = await prompts([
          { type: 'text', name: 'id', message: 'ID Invento:' },
          { type: 'text', name: 'nombre', message: 'Nombre del invento:' },
          {
            type: 'select', name: 'perIdx', message: 'Inventor:',
            choices: misPers.map((p, idx) => ({ title: p.getNombre(), value: idx }))
          },
          {
            type: 'select', name: 'dimIdx', message: 'Ubicación:',
            choices: misDims2.map((d, idx) => ({ title: d.getNombre(), value: idx }))
          },
          { type: 'text', name: 'tipo', message: 'Tipo (arma/biotecnología/dispositivo de viaje/objeto cotidiano absurdo):' },
          { type: 'number', name: 'peligro', message: 'Nivel Peligro (1-10):' }
        ]);

        if (rInv.nombre) {
          const nInv = new InventosArtefactos(
            rInv.id, rInv.nombre, "Descripción breve", misPers[rInv.perIdx], 
            rInv.tipo, rInv.peligro
          );
          await gestor.pushInventosArtefactos(nInv);
          console.log("\nInvento guardado\n");
        }
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