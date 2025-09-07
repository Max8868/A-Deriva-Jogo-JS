import { validate } from "bycontract";
import { Objeto } from '../Base/Objeto.js';

/**
 * @class LeitoEnfermaria
 * @description Um objeto que não tem uma função específica para ser usado.
 * @augments Objeto
 */
class LeitoEnfermaria extends Objeto {
    /**
     * @constructor
     * @param {string} nome - O nome do objeto.
     * @param {string} descricao - A descrição do objeto.
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(nome, descricao, engine) {
        validate(arguments, ["String", "String", "Engine"]);
        super(nome, descricao, engine);
    }
    /**
     * @method usar
     * @description Tenta usar uma ferramenta no leito.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} Sempre retorna false.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        return true;
    }
}

/**
 * Exporta o módulo LeitoEnfermaria.
 * @module LeitoEnfermaria
 */
export { LeitoEnfermaria };