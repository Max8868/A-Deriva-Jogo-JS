import { Sala } from './Basicas.js';
import { validate } from "bycontract";

/**
 * @class Hangar
 * @description Uma sala que representa o ponto de partida e de vitória do jogo.
 * @augments Sala
 */
class Hangar extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Hangar", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica do Hangar.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está no Hangar. O ponto de início da sua jornada.";
    }
}

/**
 * @class LaboratorioPesquisa
 * @description Uma sala que contém um computador.
 * @augments Sala
 */
class LaboratorioPesquisa extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Laboratório de Pesquisa", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica do Laboratório de Pesquisa.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está no Laboratório de Pesquisa. Há um computador aqui.";
    }
}

/**
 * @class EstufaHidroponica
 * @description Uma sala que representa a estufa da nave.
 * @augments Sala
 */
class EstufaHidroponica extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Estufa Hidropônica", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica da Estufa Hidropônica.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está na Estufa. Está escuro aqui.";
    }
}

/**
 * @class Dormitorios
 * @description Uma sala que representa os dormitórios da nave.
 * @augments Sala
 */
class Dormitorios extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Dormitórios", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica dos Dormitórios.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está nos Dormitórios. Há um armário destrancado aqui.";
    }
}

/**
 * @class SalaDeControle
 * @description Uma sala que contém o armário com o Star Tracker.
 * @augments Sala
 */
class SalaDeControle extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Sala de Controle", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica da Sala de Controle.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está na Sala de Controle. O Star Tracker está em um armário trancado.";
    }
}

/**
 * @class Armazem
 * @description Uma sala que contém uma caixa lacrada.
 * @augments Sala
 */
class Armazem extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Armazém", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica do Armazém.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está no Armazém. Há uma caixa lacrada.";
    }
}

/**
 * @class Enfermaria
 * @description Uma sala que contém o leito de enfermaria.
 * @augments Sala
 */
class Enfermaria extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Enfermaria", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica da Enfermaria.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está na Enfermaria. Há um leito aqui.";
    }
}

/**
 * @class ReatorPrincipal
 * @description Uma sala que contém o terminal do reator.
 * @augments Sala
 */
class ReatorPrincipal extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Reator Principal", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica do Reator Principal.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está no Reator. O terminal de energia está aqui.";
    }
}

/**
 * @class CamaraDeSuprimentos
 * @description Uma sala que representa a câmara de suprimentos.
 * @augments Sala
 */
class CamaraDeSuprimentos extends Sala {
    /**
     * @constructor
     * @param {Engine} engine - A engine do jogo.
     */
    constructor(engine) {
        validate(arguments, ["Engine"]);
        super("Câmara de Suprimentos", engine);
    }
    /**
     * @method textoDescricao
     * @description Retorna a descrição específica da Câmara de Suprimentos.
     * @returns {string} A descrição.
     */
    textoDescricao() {
        return "Você está na Câmara de Suprimentos.";
    }
}

export { Hangar, LaboratorioPesquisa, EstufaHidroponica, Dormitorios, SalaDeControle, Armazem, Enfermaria, ReatorPrincipal, CamaraDeSuprimentos };