import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class Enfermaria
 * @description Uma sala que contém o leito de enfermaria.
 * @augments Sala
 */
class Enfermaria extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Enfermaria", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica da Enfermaria.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está na Enfermaria. Há um leito aqui.";
    }
}

/**
 * Exporta o módulo Armazem.
 * @module Enfermaria
 */
export { Enfermaria };