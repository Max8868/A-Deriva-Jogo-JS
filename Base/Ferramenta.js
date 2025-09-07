import { validate, typedef } from "bycontract";

/**
 * @class Ferramenta
 * @description Representa uma ferramenta que pode ser usada pelo jogador.
 */
class Ferramenta {
    #nome;
    #descricao;

    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        this.#nome = nome;
        this.#descricao = descricao;
    }

    /**
     * @method nome
     * @description Retorna o nome da ferramenta.
     * @returns {string} O nome da ferramenta.
     */
    get nome() {
        return this.#nome;
    }

    /**
     * @method descricao
     * @description Retorna a descrição da ferramenta.
     * @returns {string} A descrição da ferramenta.
     */
    get descricao() {
        return this.#descricao;
    }

    /**
     * @method usar
     * @description O método padrão para usar uma ferramenta. Subclasses podem sobrescrevê-lo.
     * @returns {boolean} Sempre retorna true.
     */
    usar() {
        return true;
    }
}

// Definição de tipos (Typedefs)
typedef("Ferramenta", Ferramenta);
// Exportação da classe
export { Ferramenta };