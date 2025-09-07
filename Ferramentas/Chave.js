import { validate } from "bycontract";
import { Ferramenta } from "../Base/Ferramenta.js";


/**
 * @class Chave
 * @description Ferramenta que representa a Chave.
 * @augments Ferramenta
 */
class Chave extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

/**
 * Exporta o módulo Chave.
 * @module Chave
 */
export { Chave };