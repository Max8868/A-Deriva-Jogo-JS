import { validate } from "bycontract";
import { Ferramenta } from "../Base/Ferramenta.js";

/**
 * @class CilindroOxigenio
 * @description Ferramenta que representa um cilindro de oxigênio.
 * @augments Ferramenta
 */
class CilindroOxigenio extends Ferramenta {
    #contaminado;
    totalO2 = 1.5; // Total de O2 que o cilindro fornece
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     * @param {boolean} contaminado - Registra se o cilindro está contaminado ou não.
     */
    constructor(nome, descricao, contaminado) {
        validate(arguments, ["String", "String", "Boolean"]);
        super(nome, descricao);
        this.#contaminado = contaminado;
    }

    /**
     * @method usar
     * @description Sobrescreve o método usar para mostrar uma mensagem específica.
     * @returns {boolean} Retorna se o cilindro está contaminado ou não.
     */
    usar() {
        return this.#contaminado;
    }
}

/**
 * Exporta o módulo CilindroOxigenio.
 * @module CilindroOxigenio
 */
export { CilindroOxigenio };