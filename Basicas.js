import { validate, typedef } from "bycontract";
import promptsync from 'prompt-sync';

// ---------------------------------------------
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

// ---------------------------------------------
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
     * @param {string} nomeFerramenta - O nome da ferramenta a ser removida.
     */
    remove(ferramenta) {
        validate(ferramenta, "Ferramenta");
        this.#ferramentas = this.#ferramentas.filter(f => f.nome !== ferramenta.nome);
    }
}

// ---------------------------------------------
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

// ---------------------------------------------
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

    /**
     * @method textoDescricao
     * @description Retorna a descrição textual da sala.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return this.#descricao;
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
            const { sala, trancada } = this.#portas.get(direcao);
            if (!trancada) {
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
// ---------------------------------------------












// Definições de tipos (Typedefs)
typedef("Ferramenta", Ferramenta);
typedef("Mochila", Mochila);
typedef("Objeto", Objeto);
typedef("Sala", Sala);

// ---------------------------------------------
// Exportações das classes
export { Ferramenta, Mochila, Objeto, Sala };