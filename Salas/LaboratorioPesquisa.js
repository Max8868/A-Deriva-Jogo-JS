import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class LaboratorioPesquisa
 * @description Uma sala que contém um computador.
 * @augments Sala
 */
class LaboratorioPesquisa extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Laboratório de Pesquisa", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica do Laboratório de Pesquisa.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está no Laboratório de Pesquisa. Há um computador aqui.";
    }
}

/**
 * Exporta o módulo LaboratorioPesquisa.
 * @module LaboratorioPesquisa
 */
export { LaboratorioPesquisa };