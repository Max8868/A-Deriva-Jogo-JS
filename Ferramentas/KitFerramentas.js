import { validate } from "bycontract";
import { Ferramenta } from "../Base/Ferramenta.js";

/**
 * @class KitFerramentas
 * @description Ferramenta que representa um kit de ferramentas.
 * @augments Ferramenta
 */
class KitFerramentas extends Ferramenta {
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
 * Exporta o módulo KitFerramentas.
 * @module KitFerramentas
 */
export { KitFerramentas };