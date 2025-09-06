import { Objeto } from './Basicas.js';
import { validate } from "bycontract";
import { CilindroOxigenio, Chave1, Chave2, StarTracker } from './Ferramentas.js';

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
        if (ferramenta.nome === 'chave-1' && !this.#destrancado) {
            console.log("Você destrancou o armário.");
            const starTracker = this.pegaFerramenta('star-tracker');
            this.engine.mochila.guarda(starTracker);
            this.#destrancado = true;
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
}

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
        if (ferramenta.nome === 'kit-de-ferramentas') {
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
        if (ferramenta.nome === 'laser-cutter') {
            console.log("Você usou o cortador a laser para abrir a caixa e encontrou a Chave 2.");
            const chave2 = this.pegaFerramenta('chave-2');
            this.engine.mochila.guarda(chave2);
            return true;
        } else {
            console.log("A ferramenta não funciona para este objeto.");
            return false;
        }
    }
}

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
        if (ferramenta.nome === 'cartao-de-acesso') {
            console.log("Você usou o cartão de acesso para ligar o computador.");
            const chave1 = this.pegaFerramenta('chave-1');
            this.engine.mochila.guarda(chave1);
            return true;
        } else {
            console.log("O computador não pode ser usado com esta ferramenta.");
            return false;
        }
    }
}

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
        if (ferramenta.nome === 'cabo-de-energia') {
            console.log("Você usou o cabo de energia para ligar o reator. A nave agora tem energia!");
            return true;
        } else {
            console.log("O terminal do reator não pode ser usado com esta ferramenta.");
            return false;
        }
    }
}

/**
 * @class Estufa
 * @description Um objeto que pode ser usado com a Lanterna para encontrar um cilindro de oxigênio.
 * @augments Objeto
 */
class Estufa extends Objeto {
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
     * @description Tenta usar uma ferramenta na estufa.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} True se a ação for bem-sucedida, false caso contrário.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        if (ferramenta.nome === 'lanterna') {
            console.log("Você usou a lanterna na estufa e encontrou um cilindro de oxigênio.");
            const cilindro = this.pegaFerramenta('cilindro');
            this.engine.mochila.guarda(cilindro);
            return true;
        } else {
            console.log("A ferramenta não funciona aqui.");
            return false;
        }
    }
}

/**
 * @class LeitoEnfermaria
 * @description Um objeto que não tem uma função específica para ser usado.
 * @augments Objeto
 */
class LeitoEnfermaria extends Objeto {
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
     * @description Tenta usar uma ferramenta no leito.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} Sempre retorna false.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        console.log("Você tentou usar a ferramenta no leito, mas nada aconteceu.");
        return false;
    }
}

/**
 * @class Nave
 * @description O objeto principal do jogo, que agora não tem lógica de uso. A vitória é validada pela `Engine`.
 * @augments Objeto
 */
class Nave extends Objeto {
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
     * @description Tenta usar uma ferramenta na nave.
     * @param {Ferramenta} ferramenta - A ferramenta a ser usada.
     * @returns {boolean} Sempre retorna false.
     */
    usar(ferramenta) {
        validate(ferramenta, "Ferramenta");
        console.log("A ferramenta não funciona aqui.");
        return false;
    }
}

export { ArmarioTrancado, ArmarioDestrancado, CaixaLacrada, Computador, TerminalReator, Estufa, LeitoEnfermaria, Nave };