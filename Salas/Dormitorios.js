import { Sala } from '../Base/Sala.js';
import { validate } from "bycontract";

/**
 * @class Dormitorios
 * @description Uma sala que representa os dormitórios da nave.
 * @augments Sala
 */
class Dormitorios extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Dormitórios", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica dos Dormitórios.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está nos Dormitórios. Há um armário destrancado aqui.";
    }
}

/**
 * Exporta o módulo Dormitorios.
 * @module Dormitorios
 */
export { Dormitorios };