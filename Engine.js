import { validate, typedef } from "bycontract";
import promptsync from 'prompt-sync';

import { Sala } from "./Base/Sala.js";
import { Mochila } from "./Base/Mochila.js";
import { Ferramenta } from "./Base/Ferramenta.js";

import { CilindroOxigenio } from './Ferramentas/CilindroOxigenio.js';

const prompt = promptsync({ sigint: true });

// estilização do terminal
import c from 'ansi-colors';
const checkIcon = c.green('✔');
const crossIcon = c.red('✖');
/**
 * @class Engine
 * @description A classe principal que gerencia a lógica do jogo, estado e loop de jogo.
 */
class Engine {
    #salaCorrente;
    #mochila;
    #ferramentasNoCenario;
    #oxigenioDisponivel;
    #fim;

    /**
     * @constructor
     * @description Inicializa a engine, criando a mochila, o cenário e iniciando o loop do jogo.
     */
    constructor() {
        this.#mochila = new Mochila();
        this.#ferramentasNoCenario = new Map();
        this.#oxigenioDisponivel = 0; // Começa sem o2
        this.#fim = false;
        this.criaCenario();
        this.joga();
    }

    /**
     * @method addOxigenioSala
     * @description Método para adicionar O2 quando um cilindro é usado
     * @param {quantidadeSalas} Double - Quantidade de salas que o O2 deve durar (padrão 1.5)
     */
    addOxigenioSala(quantidadeSalas = 1.5) {
        this.#oxigenioDisponivel = quantidadeSalas;
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
     * @method joga
     * @description Inicia o loop principal do jogo, processando as entradas do jogador.
     */
    joga() {

        console.log("\nBem-vindo(a) ao jogo A Deriva!");
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

                    if (ferramentaParaUsar instanceof CilindroOxigenio) {
                        this.#confereCilindro(ferramentaParaUsar);
                    }

                    if (ferramentaParaUsar) {
                        if (argumento2) { // Verifica se um objeto foi especificado para usar a ferramenta
                            const objetoDestino = this.#salaCorrente.objetos.get(argumento2);
                            if (objetoDestino) {
                                const usoBemSucedido = objetoDestino.usar(ferramentaParaUsar);

                                // Verifica condições de vitória APÓS o uso ter sido tentado
                                if (usoBemSucedido && ferramentaParaUsar.nome === 'star-tracker' && objetoDestino.nome === 'nave') {
                                    console.log("🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀 🚀 ");
                                    console.log(c.bgCyan.white.yellow("Você conseguiu! Sua nave foi consertada, agora com os Star Tracker você pode voltar para casa!"));
                                    console.log("🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀  🚀 🚀 ");
                                    this.indicaFimDeJogo();
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
                    this.#exibeAjuda();
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

    #exibeAjuda() {
        console.log(`\n${c.bgBlueBright(`------------AJUDA-------------`)}`);
        console.log(`\nO objetivo do jogo é consertar sua nave e voltar para casa, para isso você precisa encontrar o ${c.green.italic.inverse(` Star Tracker `)} que está escondido em algum lugar da base.`);
        console.log(`\n${c.italic(`Cuidado com os cilindros de oxigênio contaminados! Se você usar um cilindro contaminado, o jogo acaba imediatamente!`)}`);
        console.log(`\nComandos:\nir [direcao] ${c.yellow.italic(`(ex: ir norte, sul, leste, oeste)`)}`);
        console.log(`pegar [item] ${c.green.italic(`(ex: pegar cilindro)`)}`);
        console.log(`usar [item] [objeto] ${c.cyan.italic(`(ex: usar cilindro hangar)`)}`);
        console.log(`inventario ${c.blue.italic(`(lista os itens na sua mochila)`)}`);
        console.log(`sair ou fim ${c.red.italic(`(Finalizam o jogo)`)}`);
        console.log(`\n${c.bgBlueBright(`------------AJUDA-------------`)}`);
    }

    #confereCilindro(cilindro) {
        validate(cilindro, "Ferramenta");
        if (cilindro.usar()) {
            console.log("\n")
            console.log(c.bgRed("☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  "));
            console.log(c.bgRed(`${c.bold.black("Infelizmente, você usou o cilindro contaminado e perdeu o jogo!")}`));
            console.log(c.bgRed("☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  ☠️  "));
            this.indicaFimDeJogo();
        } else {
            this.addOxigenioSala(); // Inicializa O2 para durar 1.5 salas 
            this.#mochila.remove(cilindro);
            console.log(`${checkIcon} Você agora tem oxigênio suficiente para seguir explorando.`);
        }
        return;
    }

    /**
     * @method indicaFimDeJogo
     * @description Define a flag de fim de jogo para encerrar o loop principal.
     */
    indicaFimDeJogo() {
        this.#fim = true;
        console.log(c.bold.white(`\n${crossIcon} Fim de jogo!${crossIcon}\n`));
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
typedef("Engine", Engine);

// ---------------------------------------------
// Exportações das classes
export { Engine };