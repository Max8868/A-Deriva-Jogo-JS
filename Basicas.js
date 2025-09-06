import { validate, typedef } from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });

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
        console.log(`Você está em ${this.#nome}.`);
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
/**
 * @class Engine
 * @description A classe principal que gerencia a lógica do jogo, estado e loop de jogo.
 */
class Engine {
    #salaCorrente;
    #mochila;
    #ferramentasNoCenario;
    #fim;

    /**
     * @constructor
     * @description Inicializa a engine, criando a mochila, o cenário e iniciando o loop do jogo.
     */
    constructor() {
        this.#mochila = new Mochila();
        this.#ferramentasNoCenario = new Map();
        this.#fim = false;
        this.criaCenario();
        this.joga();
    }

    /**
     * @method setSalaCorrente
     * @description Define a sala atual do jogador.
     * @param {Sala} sala - A nova sala corrente.
     */
    setSalaCorrente(sala) {
        validate(sala, "Sala");
        this.#salaCorrente = sala;
    }

    /**
     * @method addFerramentaParaCenario
     * @description Adiciona uma ferramenta ao mapa de ferramentas do cenário.
     * @param {Ferramenta} ferramenta - A ferramenta a ser adicionada.
     */
    addFerramentaParaCenario(ferramenta) {
        validate(ferramenta, "Ferramenta");
        this.#ferramentasNoCenario.set(ferramenta.nome, ferramenta);
    }

    /**
     * @method criaCenario
     * @description Método virtual que deve ser implementado pelas subclasses para criar o mundo do jogo.
     */
    criaCenario() {
        const { ArmarioTrancado, ArmarioDestrancado, CaixaLacrada, Computador, TerminalReator, Estufa, LeitoEnfermaria, Nave } = require('./Objetos.js');
        const { CilindroOxigenio, StarTracker, Lanterna, CaboEnergia, LaserCutter, KitFerramentas, Chave1, Chave2, CartaoAcesso } = require('./Ferramentas.js');

        const hangar = new Sala("Hangar", this);
        hangar.setDescricao("Você está no Hangar. O ponto de início da sua jornada.");
        const laboratorio = new Sala("Laboratório de Pesquisa", this);
        laboratorio.setDescricao("Você está no Laboratório de Pesquisa. Há um computador aqui.");
        const salaControle = new Sala("Sala de Controle", this);
        salaControle.setDescricao("Você está na Sala de Controle. O Star Tracker está em um armário trancado.");
        const enfermaria = new Sala("Enfermaria", this);
        enfermaria.setDescricao("Você está na Enfermaria. Há leitos e equipamentos médicos por toda a sala.");
        const estufa = new Sala("Estufa Hidropônica", this);
        estufa.setDescricao("Você está na Estufa Hidropônica. Plantas brilham com uma luz fraca.");
        const deposito = new Sala("Depósito", this);
        deposito.setDescricao("Você está no Depósito. Pilhas de caixas e equipamentos.");
        const dormitorio = new Sala("Dormitórios", this);
        dormitorio.setDescricao("Você está nos Dormitórios. Cheira a mofo e a ar viciado.");
        const camaraSuprimentos = new Sala("Câmara de Suprimentos", this);
        camaraSuprimentos.setDescricao("Você está na Câmara de Suprimentos.");
        const armazem = new Sala("Armazém", this);
        armazem.setDescricao("Você está no Armazém. Há uma caixa lacrada.");
        const salaReator = new Sala("Sala do Reator", this);
        salaReator.setDescricao("Você está na Sala do Reator. O cheiro de ozônio é forte aqui.");

        hangar.criaPorta("norte", laboratorio, false);
        hangar.criaPorta("leste", dormitorio, false);
        laboratorio.criaPorta("norte", salaControle, false);
        laboratorio.criaPorta("leste", estufa, false);
        laboratorio.criaPorta("sul", hangar, false);
        salaControle.criaPorta("sul", laboratorio, false);
        salaControle.criaPorta("leste", armazem, false);
        estufa.criaPorta("sul", laboratorio, false);
        estufa.criaPorta("oeste", deposito, false);
        estufa.criaPorta("norte", camaraSuprimentos, false);
        deposito.criaPorta("leste", estufa, false);
        deposito.criaPorta("oeste", enfermaria, false);
        enfermaria.criaPorta("leste", deposito, false);
        dormitorio.criaPorta("oeste", hangar, false);
        dormitorio.criaPorta("leste", camaraSuprimentos, true);
        camaraSuprimentos.criaPorta("sul", estufa, false);
        camaraSuprimentos.criaPorta("oeste", dormitorio, true);
        armazem.criaPorta("oeste", salaControle, false);
        armazem.criaPorta("norte", estufa, false);
        armazem.criaPorta("sul", salaReator, false);
        salaReator.criaPorta("norte", armazem, false);

        const cilindro = new CilindroOxigenio("cilindro", "Um cilindro de oxigênio.");
        const starTracker = new StarTracker("star-tracker", "O Star Tracker, necessário para consertar a nave.");
        const lanterna = new Lanterna("lanterna", "Uma lanterna comum.");
        const caboEnergia = new CaboEnergia("cabo-de-energia", "Um cabo de energia.");
        const laserCutter = new LaserCutter("laser-cutter", "Um cortador a laser.");
        const kitFerramentas = new KitFerramentas("kit-de-ferramentas", "Um kit de ferramentas.");
        const chave1 = new Chave1("chave-1", "Uma chave estranha com o número 1.");
        const chave2 = new Chave2("chave-2", "Uma chave estranha com o número 2.");
        const cartaoAcesso = new CartaoAcesso("cartao-de-acesso", "Um cartão de acesso.");

        const nave = new Nave("nave", "Sua nave, à deriva no espaço. Está precisando de reparos.", this);
        const armarioTrancado = new ArmarioTrancado("armario-trancado", "Um armário com uma tranca eletrônica.", this);
        armarioTrancado.addFerramenta(chave1);
        armarioTrancado.addFerramenta(starTracker);
        const computador = new Computador("computador", "Um computador antigo, precisa de um cartão de acesso.", this);
        const caixaLacrada = new CaixaLacrada("caixa-lacrada", "Uma caixa lacrada, precisa de um cortador a laser.", this);
        caixaLacrada.addFerramenta(chave2);

        hangar.addFerramenta(cilindro);
        hangar.addObjeto(nave);
        laboratorio.addFerramenta(cartaoAcesso);
        laboratorio.addObjeto(computador);
        salaControle.addFerramenta(lanterna);
        salaControle.addObjeto(armarioTrancado);
        armazem.addObjeto(caixaLacrada);

        this.setSalaCorrente(hangar);
    }

    /**
     * @method joga
     * @description Inicia o loop principal do jogo, processando as entradas do jogador.
     */
    joga() {
        console.log("Bem-vindo(a) ao jogo A Deriva!");
        console.log("Digite 'ajuda' para ver os comandos.");

        while (!this.#fim) {
            console.log("\n-------------------------");
            this.#salaCorrente.mostraDescricao();
            this.#salaCorrente.mostraPortas();
            this.#salaCorrente.mostraFerramentas();
            this.#salaCorrente.mostraObjetos();
            console.log("\n-------------------------");
            const acao = prompt("O que você deseja fazer? ").toLowerCase().split(" ");

            const comando = acao[0];
            const argumento = acao[1];
            const argumento2 = acao[2];

            switch (comando) {
                case "ir":
                    this.#salaCorrente.sai(argumento);
                    break;
                case "pegar":
                    const ferramenta = this.#salaCorrente.pega(argumento);
                    if (ferramenta) {
                        this.#mochila.guarda(ferramenta);
                        console.log(`Você pegou ${ferramenta.nome} e guardou na mochila.`);
                    } else {
                        console.log("Isso não pode ser pego aqui.");
                    }
                    break;
                case "usar":
                    const ferramentaParaUsar = this.#mochila.pega(argumento);
                    if (ferramentaParaUsar) {
                        if (argumento2) { // Verifica se um objeto foi especificado para usar a ferramenta
                            const objetoDestino = this.#salaCorrente.objetos.get(argumento2);
                            if (objetoDestino) {
                                const usoBemSucedido = objetoDestino.usar(ferramentaParaUsar);
                                console.log(usoBemSucedido); // Remover este log

                                // Verifica condições de vitória APÓS o uso ter sido tentado
                                if (usoBemSucedido && ferramentaParaUsar.nome === 'star-tracker' && objetoDestino.nome === 'nave') {
                                    console.log("\n*************************");
                                    console.log("\nVocê conseguiu! Sua nave foi consertada, agora com os Star Tracker você pode voltar para casa!");
                                    this.indicaFimDeJogo();
                                    console.log("\n*************************");
                                }

                            } else {
                                console.log("Não há esse objeto aqui para usar a ferramenta.");
                            }
                        } else { // Se nenhum objeto foi especificado, tenta usar a ferramenta por si só
                            const sucessoFerramenta = ferramentaParaUsar.usar();
                            if (sucessoFerramenta) {
                                // Adicione aqui lógica caso a ferramenta usada sozinha tenha um efeito especial
                                // Por exemplo, se usar 'lanterna' sozinha ligasse a lanterna
                            }
                        }
                    } else {
                        console.log("Você não tem essa ferramenta na mochila.");
                    }
                    break;
                case "inventario":
                    console.log("Na sua mochila: " + this.#mochila.inventario());
                    break;
                case "ajuda":
                    console.log("Comandos: ir [direcao], pegar [item], usar [item] [objeto], inventario, sair");
                    break;
                case "sair":
                case "fim":
                    this.indicaFimDeJogo();
                    break;
                default:
                    console.log("Comando inválido.");
            }
        }
    }

    /**
     * @method indicaFimDeJogo
     * @description Define a flag de fim de jogo para encerrar o loop principal.
     */
    indicaFimDeJogo() {
        this.#fim = true;
        console.log("Fim de jogo.");
    }

    /**
     * @method mochila
     * @description Retorna a referência à mochila do jogador.
     * @returns {Mochila} A mochila do jogador.
     */
    get mochila() {
        return this.#mochila;
    }
}

// ---------------------------------------------
// Definições de tipos (Typedefs)
typedef("Ferramenta", Ferramenta);
typedef("Mochila", Mochila);
typedef("Objeto", Objeto);
typedef("Sala", Sala);
typedef("Engine", Engine);

// ---------------------------------------------
// Exportações das classes
export { Ferramenta, Mochila, Objeto, Sala, Engine };