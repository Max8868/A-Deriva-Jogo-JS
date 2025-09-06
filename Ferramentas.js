import { validate } from "bycontract";
import { Ferramenta } from "./Basicas.js";

/**
 * @class CilindroOxigenio
 * @description Ferramenta que representa um cilindro de oxigênio.
 * @augments Ferramenta
 */
class CilindroOxigenio extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
    
    /**
     * @method usar
     * @description Sobrescreve o método usar para mostrar uma mensagem específica.
     * @returns {boolean} Sempre retorna true.
     */
    usar() {
        console.log("Você usou o cilindro de oxigênio e encheu seu traje. Você pode respirar novamente.");
        return true;
    }
}

/**
 * @class Chave1
 * @description Ferramenta que representa a Chave 1.
 * @augments Ferramenta
 */
class Chave1 extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

/**
 * @class Chave2
 * @description Ferramenta que representa a Chave 2.
 * @augments Ferramenta
 */
class Chave2 extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

/**
 * @class StarTracker
 * @description Ferramenta que representa o Star Tracker, item de vitória.
 * @augments Ferramenta
 */
class StarTracker extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

/**
 * @class CartaoAcesso
 * @description Ferramenta que representa um cartão de acesso.
 * @augments Ferramenta
 */
class CartaoAcesso extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

/**
 * @class CaboEnergia
 * @description Ferramenta que representa um cabo de energia.
 * @augments Ferramenta
 */
class CaboEnergia extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

/**
 * @class LaserCutter
 * @description Ferramenta que representa um cortador a laser.
 * @augments Ferramenta
 */
class LaserCutter extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

/**
 * @class KitFerramentas
 * @description Ferramenta que representa um kit de ferramentas.
 * @augments Ferramenta
 */
class KitFerramentas extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

/**
 * @class Lanterna
 * @description Ferramenta que representa uma lanterna.
 * @augments Ferramenta
 */
class Lanterna extends Ferramenta {
    /**
     * @constructor
     * @param {string} nome - O nome da ferramenta.
     * @param {string} descricao - A descrição da ferramenta.
     */
    constructor(nome, descricao) {
        validate(arguments, ["String", "String"]);
        super(nome, descricao);
    }
}

export { CilindroOxigenio, Chave1, Chave2, StarTracker, CartaoAcesso, CaboEnergia, LaserCutter, KitFerramentas, Lanterna };