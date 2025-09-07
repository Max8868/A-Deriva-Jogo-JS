import { validate, typedef } from "bycontract";

/**
 * @class Sala
 * @description Representa um local no jogo com portas, ferramentas e objetos.
 */

class Sala {
    #nome;
    #descricao;
    #engine;
    #portas;
    #ferramentas;
    #objetos;
    #o2Disponivel; // Quantidade de O2 disponível na sala
    /**
     * @constructor
     * @param {string} nome - O nome da sala.
     * @param {Engine} engine - Uma referência à engine do jogo.
     */
    constructor(nome, engine) {
        validate(arguments, ["String", "Engine"]);
        this.#nome = nome;
        this.#engine = engine;
        this.#portas = new Map();
        this.#ferramentas = new Map();
        this.#objetos = new Map();
        this.#o2Disponivel = 0; // Inicializa com 0
    }

    /**
     * @method nome
     * @description Retorna o nome da sala.
     * @returns {string} O nome da sala.
     */
    get nome() {
        return this.#nome;
    }

    /**
     * @method objetos
     * @description Retorna os objetos presentes na sala.
     * @returns {Map<string, Objeto>} O mapa de objetos na sala.
     */
    get objetos() {
        return this.#objetos;
    }

    get o2Disponivel() {
        return this.#o2Disponivel;
    }

    /**
     * @method textoDescricao
     * @description Retorna a descrição textual da sala.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return this.#descricao;
    }

    /**
     * Adiciona uma quantidade de O2 à sala.
     * 
     * Valida se o valor é um número positivo e se a sala não está cheia de O2.
     * 
     * @param {number} valor - Quantidade de O2 a ser adicionada.
     * @returns {boolean} Retorna true se o O2 foi adicionado com sucesso, false caso contrário.
     */
    addO2Sala(valor) {
        validate(valor, "Number");
        if (valor < 0) {
            console.log("O valor de O2 não pode ser negativo.");
            return false
        } else if (this.#o2Disponivel >= 1) {
            console.log("A sala já está com o O2 cheio.");
            return false;
        } else {
            this.#o2Disponivel += valor;
            return true;
        }
    }

    /**
     * @method setDescricao
     * @description Define a descrição da sala.
     * @param {string} descricao - A nova descrição.
     */
    setDescricao(descricao) {
        validate(descricao, "String");
        this.#descricao = descricao;
    }

    /**
     * @method criaPorta
     * @description Cria uma porta para outra sala em uma direção específica.
     * @param {string} direcao - A direção da porta (ex: "norte", "sul").
     * @param {Sala} salaDestino - A sala de destino.
     * @param {boolean} trancada - Indica se a porta está trancada.
     */
    criaPorta(direcao, salaDestino, trancada) {
        validate(arguments, ["String", "Sala", "Boolean"]);
        this.#portas.set(direcao, { sala: salaDestino, trancada: trancada });
    }

    /**
     * @method mostraDescricao
     * @description Exibe a descrição da sala no console.
     */
    mostraDescricao() {
        console.log(this.textoDescricao());
    }

    /**
     * @method mostraPortas
     * @description Exibe as portas disponíveis na sala.
     */
    mostraPortas() {
        let portasAbertas = [];
        let portasFechadas = [];
        for (const [direcao, { sala, trancada }] of this.#portas) {
            if (trancada) {
                portasFechadas.push(`${direcao} (trancada)`);
            } else {
                portasAbertas.push(`${direcao} (${sala.nome})`);
            }
        }
        if (portasAbertas.length > 0) {
            console.log(`\nVocê pode ir para: ${portasAbertas.join(", ")}.`);
        }
        if (portasFechadas.length > 0) {
            console.log(`\nPortas trancadas: ${portasFechadas.join(", ")}.`);
        }
    }

    /**
     * @method mostraFerramentas
     * @description Exibe as ferramentas que podem ser pegas na sala.
     */
    mostraFerramentas() {
        if (this.#ferramentas.size > 0) {
            console.log("Você pode pegar: " + Array.from(this.#ferramentas.keys()).join(", ") + ".");
        }
    }

    /**
     * @method mostraObjetos
     * @description Exibe os objetos presentes na sala.
     */
    mostraObjetos() {
        if (this.#objetos.size > 0) {
            console.log("Há objetos aqui: " + Array.from(this.#objetos.keys()).join(", ") + ".");
        }
    }

    /**
     * @method pega
     * @description Remove uma ferramenta da sala e a retorna.
     * @param {string} nomeFerramenta - O nome da ferramenta a ser pega.
     * @returns {Ferramenta|null} A ferramenta ou null se não for encontrada.
     */
    pega(nomeFerramenta) {
        validate(nomeFerramenta, "String");
        if (this.#ferramentas.has(nomeFerramenta)) {
            let ferramenta = this.#ferramentas.get(nomeFerramenta);
            this.#ferramentas.delete(nomeFerramenta);
            return ferramenta;
        }
        console.log("Essa ferramenta não existe aqui.");
        return null;
    }

    /**
     * @method addFerramenta
     * @description Adiciona uma ferramenta à sala.
     * @param {Ferramenta} ferramenta - A ferramenta a ser adicionada.
     */
    addFerramenta(ferramenta) {
        validate(ferramenta, "Ferramenta");
        this.#ferramentas.set(ferramenta.nome, ferramenta);
    }

    /**
     * @method addObjeto
     * @description Adiciona um objeto à sala.
     * @param {Objeto} objeto - O objeto a ser adicionado.
     */
    addObjeto(objeto) {
        validate(objeto, "Objeto");
        this.#objetos.set(objeto.nome, objeto);
    }

    /**
     * @method sai
     * @description Tenta mover o jogador para uma sala em uma direção específica.
     * @param {string} direcao - A direção a ser seguida.
     * @returns {Sala|null} A sala de destino ou null se a saída não for possível.
     */
    sai(direcao) {
        validate(direcao, "String");
        if (this.#portas.has(direcao)) {
            const o2Destino = this.#o2Disponivel === 1.5 ? 0.5 : 0;
            this.#o2Disponivel -= 0.5;
            const { sala, trancada } = this.#portas.get(direcao);
            if (!trancada) {
                sala.addO2Sala(o2Destino);
                this.#engine.setSalaCorrente(sala);
                return sala;
            } else {
                console.log("A porta está trancada.");
            }
        } else {
            console.log("Não há uma porta nessa direção.");
        }
        return null;
    }

    /**
     * @method usa
     * @description Método padrão para usar uma ferramenta em um objeto na sala.
     * @param {string} ferramenta - O nome da ferramenta a ser usada.
     * @param {string} objeto - O nome do objeto.
     * @returns {boolean} Sempre retorna false.
     */
    usa(ferramenta, objeto) {
        validate(arguments, ["String", "String"]);
        return false;
    }
}

// Definição de tipos (Typedefs)
typedef("Sala", Sala);
// Exportação da classe
export { Sala };