import { validate } from "bycontract";
import { Ferramenta } from "../Base/Ferramenta.js";

/**
 * @class CartaoAcesso
 * @description Ferramenta que representa um cartão de acesso.
 * @augments Ferramenta
 */
class CartaoAcesso extends Ferramenta {
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
 * Exporta o módulo CartaoAcesso.
 * @module CartaoAcesso
 */
export { CartaoAcesso };