import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class SalaDeControle
 * @description Uma sala que contém o armário com o Star Tracker.
 * @augments Sala
 */
class SalaDeControle extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Sala de Controle", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica da Sala de Controle.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está na Sala de Controle. O Star Tracker está em um armário trancado.";
    }
}

/**
 * Exporta o módulo SalaDeControle.
 * @module SalaDeControle
 */
export { SalaDeControle };