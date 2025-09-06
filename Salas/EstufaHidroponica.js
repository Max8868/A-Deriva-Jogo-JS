import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class EstufaHidroponica
 * @description Uma sala que representa a estufa da nave.
 * @augments Sala
 */
class EstufaHidroponica extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Estufa Hidropônica", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica da Estufa Hidropônica.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está na Estufa. Está escuro aqui.";
    }
}

/**
 * Exporta o módulo EstufaHidroponica.
 * @module EstufaHidroponica
 */
export { EstufaHidroponica };