import { validate } from "bycontract";
import { Objeto } from '../Base/Objeto.js';
import { Chave } from '../Ferramentas/Chave.js';
import { KitFerramentas } from '../Ferramentas/KitFerramentas.js';

/**
 * @class ArmarioTrancado
 * @description Um objeto que pode ser destrancado com a Chave 1 para obter o Star Tracker.
 * @augments Objeto
 */
class ArmarioTrancado extends Objeto {
    #destrancado = false;
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
        if (this.#ehUsavel && !this.#destrancado) {
            console.log("Você destrancou o armário.");
            const starTracker = this.pegaFerramenta('star-tracker');
            this.engine.mochila.guarda(starTracker);
            this.#destrancado = true;
            this.removeFerramenta('star-tracker');
            console.log("O star-tracker foi adicionado a sua mochila.");
            return true;
        } else if (this.#destrancado) {
            console.log("O armário já está destrancado. O Star Tracker já foi pego.");
            return true;
        } else {
            console.log("A ferramenta não funciona para este objeto.");
            return false;
        }
    }

    #ehUsavel(ferramenta) {
        validate(ferramenta, "Ferramenta");
        if (ferramenta instanceof Chave || ferramenta instanceof KitFerramentas) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * Exporta o módulo ArmarioTrancado.
 * @module ArmarioTrancado
 */
export { ArmarioTrancado };