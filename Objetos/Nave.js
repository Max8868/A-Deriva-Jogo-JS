import { validate } from "bycontract";
import { Objeto } from '../Base/Objeto.js';
import { StarTracker } from '../Ferramentas/StarTracker.js';

/**
 * @class Nave
 * @description O objeto principal do jogo, precisa do star tracker. A vitória é validada pela `Engine`.
 * @augments Objeto
 */
class Nave extends Objeto {
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
     * @description Tenta usar uma ferramenta no armário.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} True se a ação for bem-sucedida, false caso contrário.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        if (ferramenta instanceof StarTracker) {
            return true;
        } else {
           console.log("Esta ferramenta não funciona para consertar a nave.");
           return false;
        }
    }
}

/**
 * Exporta o módulo Nave.
 * @module Nave
 */
export { Nave };