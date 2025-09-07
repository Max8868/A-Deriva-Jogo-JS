import { validate } from "bycontract";
import { Objeto } from '../Base/Objeto.js';
import { LaserCutter } from '../Ferramentas/LaserCutter.js';
/**
 * @class CaixaLacrada
 * @description Um objeto que pode ser aberto com o Laser Cutter para obter a Chave 2.
 * @augments Objeto
 */
class CaixaLacrada extends Objeto {
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
     * @description Tenta usar uma ferramenta na caixa.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} True se a ação for bem-sucedida, false caso contrário.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        if (ferramenta instanceof LaserCutter) {
            console.log("Você usou o cortador a laser para abrir a caixa e encontrou a segunda Chave.");
            const chave2 = this.pegaFerramenta('chave-2');
            this.engine.mochila.guarda(chave2);
            this.removeFerramenta('chave-2');
            return true;
        } else {
            console.log("A ferramenta não funciona para este objeto.");
            return false;
        }
    }
}

/**
 * Exporta o módulo CaixaLacrada.
 * @module CaixaLacrada
 */
export { CaixaLacrada };