import { validate } from "bycontract";
import { Ferramenta } from "../Base/Ferramenta.js";

/**
 * @class LaserCutter
 * @description Ferramenta que representa um cortador a laser.
 * @augments Ferramenta
 */
class LaserCutter extends Ferramenta {
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
 * Exporta o módulo LaserCutter.
 * @module LaserCutter
 */
export { LaserCutter };