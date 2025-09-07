import { validate } from "bycontract";
import { Ferramenta } from "../Base/Ferramenta.js";

/**
 * @class CaboEnergia
 * @description Ferramenta que representa um cabo de energia.
 * @augments Ferramenta
 */
class CaboEnergia extends Ferramenta {
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
 * Exporta o módulo CaboEnergia.
 * @module CaboEnergia
 */
export { CaboEnergia };