import { validate } from "bycontract";
import { Objeto } from '../Base/Objeto.js';

/**
 * @class Estufa
 * @description Um objeto que pode ser usado com a Lanterna para encontrar um cilindro de oxigênio.
 * @augments Objeto
 */
class Estufa extends Objeto {
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
     * @description Tenta usar uma ferramenta na estufa.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} True se a ação for bem-sucedida, false caso contrário.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        if (ferramenta.nome === 'lanterna') {
            console.log("Você usou a lanterna na estufa e encontrou um cilindro de oxigênio.");
            const cilindro = this.pegaFerramenta('cilindro');
            this.engine.mochila.guarda(cilindro);
            return true;
        } else {
            console.log("A ferramenta não funciona aqui.");
            return false;
        }
    }
}

/**
 * Exporta o módulo Estufa.
 * @module Estufa
 */
export { Estufa };