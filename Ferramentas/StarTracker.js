import { validate } from "bycontract";
import { Ferramenta } from "../Base/Ferramenta.js";

/**
 * @class StarTracker
 * @description Ferramenta que representa o Star Tracker, item de vitória.
 * @augments Ferramenta
 */
class StarTracker extends Ferramenta {
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
 * Exporta o módulo StarTracker.
 * @module StarTracker
 */
export { StarTracker };