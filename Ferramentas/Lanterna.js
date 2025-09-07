import { validate } from "bycontract";
import { Ferramenta } from "../Base/Ferramenta.js";

/**
 * @class Lanterna
 * @description Ferramenta que representa uma lanterna.
 * @augments Ferramenta
 */
class Lanterna extends Ferramenta {
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
 * Exporta o módulo Lanterna.
 * @module Lanterna
 */
export { Lanterna };