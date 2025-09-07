import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class CamaraDeSuprimentos
 * @description Uma sala que representa a câmara de suprimentos.
 * @augments Sala
 */
class CamaraDeSuprimentos extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Câmara de Suprimentos", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica da Câmara de Suprimentos.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está na Câmara de Suprimentos.";
    }
}

/**
 * Exporta o módulo CamaraDeSuprimentos.
 * @module CamaraDeSuprimentos
 */
export { CamaraDeSuprimentos };