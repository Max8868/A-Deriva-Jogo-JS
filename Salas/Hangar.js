import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class Hangar
 * @description Uma sala que representa o ponto de partida e de vitória do jogo.
 * @augments Sala
 */
class Hangar extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Hangar", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica do Hangar.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está no Hangar. O ponto de início da sua jornada.";
    }
}

/**
 * Exporta o módulo Hangar.
 * @module Hangar
 */
export { Hangar };