import { validate } from "bycontract";
import { Objeto } from '../Base/Objeto.js';
import { CaboEnergia } from '../Ferramentas/CaboEnergia.js';
/**
 * @class TerminalReator
 * @description Um objeto que pode ser usado com o Cabo de Energia para ligar o reator.
 * @augments Objeto
 */
class TerminalReator extends Objeto {
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
     * @description Tenta usar uma ferramenta no terminal.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} True se a ação for bem-sucedida, false caso contrário.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        if (ferramenta instanceof CaboEnergia) {
            console.log("Você usou o cabo de energia para ligar o reator. A nave agora tem energia!");
            return true;
        } else {
            console.log("O terminal do reator não pode ser usado com esta ferramenta.");
            return false;
        }
    }
}

/**
 * Exporta o módulo Estufa.
 * @module TerminalReator
 */
export { TerminalReator };