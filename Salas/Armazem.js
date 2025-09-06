import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class Armazem
 * @description Uma sala que contém uma caixa lacrada.
 * @augments Sala
 */
class Armazem extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Armazém", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica do Armazém.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está no Armazém. Há uma caixa lacrada.";
    }
}

/**
 * Exporta o módulo Armazem.
 * @module Armazem
 */
export { Armazem };