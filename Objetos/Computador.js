import { validate } from "bycontract";
import { Objeto } from '../Base/Objeto.js';
import { CartaoAcesso } from '../Ferramentas/CartaoAcesso.js';

/**
 * @class Computador
 * @description Um objeto que pode ser ativado com o Cartão de Acesso para obter a Chave 1.
 * @augments Objeto
 */
class Computador extends Objeto {
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
     * @description Tenta usar uma ferramenta no computador.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} True se a ação for bem-sucedida, false caso contrário.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        if (ferramenta instanceof CartaoAcesso) {
            console.log("Você usou o cartão de acesso para ligar o computador.");
            
            // Tenta pegar a chave que JÁ ESTÁ no computador
            // Esta é a chave que você adicionou em Jogo.js
            const chave = this.pegaFerramenta('chave-1'); 

            if (chave) {
                this.engine.mochila.guarda(chave); // Se a chave foi encontrada, adiciona à mochila
                this.engine.mochila.remove(ferramenta); // Remove o cartão de acesso da mochila
                console.log("Você pegou a chave que estava no computador e a guardou na mochila.");
                // Remove a chave do inventário do computador para que não possa ser pega de novo
                this.removeFerramenta('chave-1');
                return true;
            } else {
                // Se a chave não foi encontrada (talvez já tenha sido pega antes)
                console.log("O computador ligou, mas a chave não está mais aqui.");
                return false;
            }
        } else {
            console.log("O computador não pode ser usado com esta ferramenta.");
            return false;
        }
    }
}

/**
 * Exporta o módulo Computador.
 * @module Computador
 */
export { Computador };