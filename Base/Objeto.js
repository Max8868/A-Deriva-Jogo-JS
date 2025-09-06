import { validate, typedef } from "bycontract";

/**
 * @class Objeto
 * @description Classe base para objetos interativos no jogo.
 */
class Objeto {
    #nome;
    #descricao;
    #ferramentas;
    #acaoOk;
    #engine;

    /**
     * @constructor
     * @param {string} nome - O nome do objeto.
     * @param {string} descricao - A descrição do objeto.
     * @param {Engine} engine - Uma referência à engine do jogo.
     */
    constructor(nome, descricao, engine) {
        validate(arguments, ["String", "String", "Engine"]);
        this.#nome = nome;
        this.#descricao = descricao;
        this.#ferramentas = new Map();
        this.#acaoOk = false;
        this.#engine = engine;
    }

    /**
     * @method nome
     * @description Retorna o nome do objeto.
     * @returns {string} O nome do objeto.
     */
    get nome() {
        return this.#nome;
    }

    /**
     * @method descricao
     * @description Retorna a descrição do objeto.
     * @returns {string} A descrição do objeto.
     */
    get descricao() {
        return this.#descricao;
    }

    /**
     * @method addFerramenta
     * @description Adiciona uma ferramenta escondida dentro do objeto.
     * @param {Ferramenta} ferramenta - A ferramenta a ser adicionada.
     */
    addFerramenta(ferramenta) {
        validate(ferramenta, "Ferramenta");
        this.#ferramentas.set(ferramenta.nome, ferramenta);
    }

    /**
     * @method pegaFerramenta
     * @description Remove e retorna uma ferramenta escondida do objeto pelo nome.
     * @param {string} nomeFerramenta - O nome da ferramenta a ser pega.
     * @returns {Ferramenta|null} A ferramenta ou null se não for encontrada.
     */
    pegaFerramenta(nomeFerramenta) {
        validate(nomeFerramenta, "String");
        if (this.#ferramentas.has(nomeFerramenta)) {
            let ferramenta = this.#ferramentas.get(nomeFerramenta);
            this.#ferramentas.delete(nomeFerramenta);
            return ferramenta;
        }
        return null;
    }

    removeFerramenta(nomeFerramenta) {
        validate(nomeFerramenta, "String");
        this.#ferramentas.delete(nomeFerramenta);
    }

    /**
     * @method engine
     * @description Retorna a referência à engine do jogo.
     * @returns {Engine} A engine do jogo.
     */
    get engine() {
        return this.#engine;
    }

    /**
     * @method usar
     * @description O método padrão para usar uma ferramenta em um objeto. Subclasses devem sobrescrevê-lo.
     * @returns {boolean} Sempre retorna false.
     */
    usar() {
        return false;
    }
}

// Definição de tipos (Typedefs)
typedef("Objeto", Objeto);
// Exportação da classe
export { Objeto };