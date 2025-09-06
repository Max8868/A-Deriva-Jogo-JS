import { validate, typedef } from "bycontract";

/**
 * @class Mochila
 * @description Representa a mochila do jogador, onde as ferramentas são armazenadas.
 */
class Mochila {
    #ferramentas;

    /**
     * @constructor
     * @description Inicializa a mochila com um array vazio.
     */
    constructor() {
        this.#ferramentas = [];
    }

    /**
     * @method guarda
     * @description Adiciona uma ferramenta à mochila.
     * @param {Ferramenta} ferramenta - A ferramenta a ser guardada.
     */
    guarda(ferramenta) {
        validate(ferramenta, "Ferramenta");
        this.#ferramentas.push(ferramenta);
    }

    /**
     * @method pega
     * @description Busca uma ferramenta na mochila pelo nome.
     * @param {string} nomeFerramenta - O nome da ferramenta.
     * @returns {Ferramenta|undefined} A ferramenta encontrada ou undefined se não existir.
     */
    pega(nomeFerramenta) {
        validate(arguments, ["String"]);
        let ferramenta = this.#ferramentas.find(f => f.nome === nomeFerramenta);
        return ferramenta;
    }

    /**
     * @method tem
     * @description Verifica se uma ferramenta com um nome específico está na mochila.
     * @param {string} nomeFerramenta - O nome da ferramenta a ser verificada.
     * @returns {boolean} True se a ferramenta estiver na mochila, caso contrário, false.
     */
    tem(nomeFerramenta) {
        validate(arguments, ["String"]);
        return this.#ferramentas.some(f => f.nome === nomeFerramenta);
    }

    /**
     * @method inventario
     * @description Retorna uma string com todos os nomes das ferramentas na mochila.
     * @returns {string} Uma string contendo os nomes das ferramentas, separados por vírgula.
     */
    inventario() {
        return this.#ferramentas.map(obj => obj.nome).join(", ");
    }

    /**
     * @method remove
     * @description Remove uma ferramenta da lista de ferramentas pelo nome.
     * @param {Ferramenta} Ferramenta - O nome da ferramenta a ser removida.
     */
    remove(ferramenta) {
        validate(ferramenta, "Ferramenta");
        this.#ferramentas = this.#ferramentas.filter(f => f.nome !== ferramenta.nome);
    }
}

// Definição de tipos (Typedefs)
typedef("Mochila", Mochila);
// Exportação da classe
export { Mochila };