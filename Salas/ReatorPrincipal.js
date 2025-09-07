import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class ReatorPrincipal
 * @description Uma sala que contém o terminal do reator.
 * @augments Sala
 */
class ReatorPrincipal extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Reator Principal", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica do Reator Principal.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está no Reator. O terminal de energia está aqui.";
    }
}

/**
 * Exporta o módulo ReatorPrincipal.
 * @module ReatorPrincipal
 */
export { ReatorPrincipal };