import { validate } from "bycontract";
import { Objeto } from '../Base/Objeto.js';
import { KitFerramentas } from '../Ferramentas/KitFerramentas.js';

/**
 * @class ArmarioDestrancado
 * @description Um objeto que pode ser usado com o Kit de Ferramentas para encontrar algo.
 * @augments Objeto
 */
class ArmarioDestrancado extends Objeto {
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
        if (ferramenta instanceof KitFerramentas) {
            console.log("Você usou o kit de ferramentas no armário e encontrou um cilindro de oxigênio.");
            const cilindroEscondido = this.pegaFerramenta('cilindro-escondido');
            this.engine.mochila.guarda(cilindroEscondido);
            return true;
        } else {
            console.log("A ferramenta não funciona para este objeto.");
            return false;
        }
    }
}

/**
 * Exporta o módulo ArmarioDestrancado.
 * @module ArmarioDestrancado
 */
export { ArmarioDestrancado };