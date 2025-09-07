import { Engine } from './Engine.js';
// import das ferramentas
import { CilindroOxigenio } from './Ferramentas/CilindroOxigenio.js';
import { Chave } from './Ferramentas/Chave.js';
import { StarTracker } from './Ferramentas/StarTracker.js';
import { Lanterna } from './Ferramentas/Lanterna.js';
import { CartaoAcesso } from './Ferramentas/CartaoAcesso.js';
import { CaboEnergia } from './Ferramentas/CaboEnergia.js';
import { LaserCutter } from './Ferramentas/LaserCutter.js';
import { KitFerramentas } from './Ferramentas/KitFerramentas.js';

// import dos objetos
import { Nave } from './Objetos/Nave.js';
import { ArmarioTrancado } from './Objetos/ArmarioTrancado.js';
import { ArmarioDestrancado } from './Objetos/ArmarioDestrancado.js';
import { CaixaLacrada } from './Objetos/CaixaLacrada.js';
import { Computador } from './Objetos/Computador.js';
import { TerminalReator } from './Objetos/TerminalReator.js';
import { Estufa } from './Objetos/Estufa.js';
import { LeitoEnfermaria } from './Objetos/LeitoEnfermaria.js';

// import das salas
import { Hangar } from './Salas/Hangar.js';
import { LaboratorioPesquisa } from './Salas/LaboratorioPesquisa.js';
import { EstufaHidroponica } from './Salas/EstufaHidroponica.js';
import { Dormitorios } from './Salas/Dormitorios.js';
import { SalaDeControle } from './Salas/SalaDeControle.js';
import { Armazem } from './Salas/Armazem.js';
import { Enfermaria } from './Salas/Enfermaria.js';
import { ReatorPrincipal } from './Salas/ReatorPrincipal.js';
import { CamaraDeSuprimentos } from './Salas/CamaraDeSuprimentos.js';

/**
 * @class Jogo
 * @description Representa o jogo em si. Estende a classe Engine para configurar e executar o cenário.
 * @augments Engine
 */
class Jogo extends Engine {
    /**
     * @method criaCenario
     * @description Sobrescreve o método da classe base para criar as salas, objetos e ferramentas do cenário.
     */
    criaCenario() {
        // Instanciação das salas
        const hangar = new Hangar(this);
        const laboratorio = new LaboratorioPesquisa(this);
        const estufa = new EstufaHidroponica(this);
        const dormitorios = new Dormitorios(this);
        const salaDeControle = new SalaDeControle(this);
        const armazem = new Armazem(this);
        const enfermaria = new Enfermaria(this);
        const reator = new ReatorPrincipal(this);
        const camara = new CamaraDeSuprimentos(this);

        // Conecta as salas
        // Coordenadas ao norte
        hangar.criaPorta("norte", armazem, false); // Inicio do jogo
        enfermaria.criaPorta("norte", salaDeControle, false);
        reator.criaPorta("norte", estufa, false);
        estufa.criaPorta("norte", laboratorio, false);

        // Coordenadas ao sul
        armazem.criaPorta("sul", hangar, false);
        salaDeControle.criaPorta("sul", enfermaria, false);
        estufa.criaPorta("sul", reator, false);
        laboratorio.criaPorta("sul", estufa, false);

        // Coordenadas a leste
        laboratorio.criaPorta("leste", dormitorios, false);
        salaDeControle.criaPorta("leste", armazem, false);
        estufa.criaPorta("leste", salaDeControle, false);
        reator.criaPorta("leste", enfermaria, false);
        camara.criaPorta("leste", laboratorio, false);

        // Coordenadas a oeste
        armazem.criaPorta("oeste", salaDeControle, false);
        laboratorio.criaPorta("oeste", camara, false);
        dormitorios.criaPorta("oeste", laboratorio, false);
        salaDeControle.criaPorta("oeste", estufa, false);
        enfermaria.criaPorta("oeste", reator, false);


        // Adiciona O2 disponível no inicio do jogo
        hangar.addO2Sala(1.5); // 1.5 salas de O2 no hangar

        // Coloca ferramentas e objetos nas salas
        hangar.addObjeto(new Nave('nave', 'Sua nave danificada. Você precisa do Star Tracker para repará-la.', this));
        hangar.addFerramenta(new CilindroOxigenio('cilindro-1', 'Um cilindro de oxigênio.', false));

        armazem.addObjeto(new CaixaLacrada('caixa-lacrada', 'Uma caixa de suprimentos lacrada.', this));
        armazem.addFerramenta(new CilindroOxigenio('cilindro-2', 'Um cilindro de oxigênio.', false));

        salaDeControle.addObjeto(new ArmarioTrancado('armario-trancado', 'Um armário trancado que contém o Star Tracker.', this));
        salaDeControle.addFerramenta(new Lanterna('lanterna', 'Uma lanterna com 3 usos.'));
        salaDeControle.addFerramenta(new CilindroOxigenio('cilindro-3', 'Um cilindro de oxigênio.', false));

        estufa.addObjeto(new Estufa('estufa', 'A estufa da nave. Parece haver um item escondido aqui.', this));

        laboratorio.addFerramenta(new CartaoAcesso('cartao-de-acesso', 'Cartão para ativar o computador.'));
        laboratorio.addObjeto(new Computador('computador', 'Um computador de pesquisa. Precisa de um cartão de acesso.', this));

        dormitorios.addFerramenta(new KitFerramentas('kit-de-ferramentas', 'Um kit de ferramentas para abrir armários.'));
        dormitorios.addObjeto(new ArmarioDestrancado('armario', 'Um armário destrancado. Está vazio.', this));
        dormitorios.addFerramenta(new CilindroOxigenio('cilindro', 'Um cilindro de oxigênio.', false));
        
        enfermaria.addFerramenta(new CaboEnergia('cabo-de-energia', 'Um cabo de energia para o Reator.'));
        enfermaria.addObjeto(new LeitoEnfermaria('leito', 'Um leito de enfermaria.', this));

        reator.addFerramenta(new LaserCutter('laser-cutter', 'Um cortador a laser com 3 usos.'));
        reator.addObjeto(new TerminalReator('terminal', 'O terminal do reator principal.', this));
        
        camara.addFerramenta(new CilindroOxigenio('cilindro', 'Um cilindro de oxigênio.', true));

        // Coloca ferramentas em objetos
        const chave1 = new Chave('chave-1', 'Chave para a porta Laboratório -> Dormitórios.');
        laboratorio.objetos.get('computador').addFerramenta(chave1);

        const starTracker = new StarTracker('star-tracker', 'O Star Tracker. A chave para a sua vitória.');
        salaDeControle.objetos.get('armario-trancado').addFerramenta(starTracker);

        const chave2 = new Chave('chave-2', 'Chave para a porta Reator -> Estufa.');
        armazem.objetos.get('caixa-lacrada').addFerramenta(chave2);
        
        const cilindroEscondido = new CilindroOxigenio('cilindro-escondido', 'Um cilindro de oxigênio.', false);
        estufa.objetos.get('estufa').addFerramenta(cilindroEscondido);

        this.setSalaCorrente(hangar);
    }
}

export { Jogo };