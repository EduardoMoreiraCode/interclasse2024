// TABELA - FASE DE GRUPOS
// cor automática
// rank automático
// pontos automáticos
// saldo de gols automático
function alertOnLoad() {
    alert("Nenhum jogo ocorrendo no momento!");
}
const times = [
    {
        cor: "",
        rank: '',
        nome: "NGA Eletro",
        pontos: '',
        jogos: 10,
        vitorias: 3,
        empates: 4,
        derrotas: 3,
        golsFeitos: 13,
        golsSofridos: 14,
        saldoGols: '',
        ultimos: [
            "./assets/empate.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/empate.svg",
            "./assets/vitoria.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Saadicos",
        pontos: '',
        jogos: 10,
        vitorias: 6,
        empates: 2,
        derrotas: 2,
        golsFeitos: 15,
        golsSofridos: 6,
        saldoGols: '',
        ultimos: [
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/derrota.svg",
            "./assets/derrota.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Javax",
        pontos: '',
        jogos: 10,
        vitorias: 5,
        empates: 4,
        derrotas: 1,
        golsFeitos: 17,
        golsSofridos: 8,
        saldoGols: '',
        ultimos: [
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Mec da Gama",
        pontos: '',
        jogos: 10,
        vitorias: 3,
        empates: 5,
        derrotas: 2,
        golsFeitos: 13,
        golsSofridos: 12,
        saldoGols: '',
        ultimos: [
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Broca Juniors",
        pontos: '',
        jogos: 10,
        vitorias: 4,
        empates: 2,
        derrotas: 4,
        golsFeitos: 20,
        golsSofridos: 10,
        saldoGols: '',
        ultimos: [
            "./assets/derrota.svg",
            "./assets/empate.svg",
            "./assets/empate.svg",
            "./assets/empate.svg",
            "./assets/empate.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "É os D",
        pontos: '',
        jogos: 10,
        vitorias: 3,
        empates: 5,
        derrotas: 2,
        golsFeitos: 15,
        golsSofridos: 9,
        saldoGols: '',
        ultimos: [
            "./assets/vitoria.svg",
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/empate.svg",
            "./assets/derrota.svg"
        ],
    },
];


const tabela = document.getElementById("table");
const tbody = tabela.getElementsByTagName("tbody")[0];
// Limpa a tabela, para evitar copia de dados
tbody.innerHTML = '';

// const timesOrd = times.sort((a, b) => b.pontos - a.pontos); ordenar pelos pontos
const timesOrd = times.sort((a, b) => { //ORDENACAO POR PONTOS
    const ptsA = a.vitorias * 3 + a.empates * 1 + a.derrotas * 0;
    //a = primeiro objeto para comparar
    const ptsB = b.vitorias * 3 + b.empates * 1 + b.derrotas * 0;
    //b = segundo objeto para comparar
    if (ptsA === ptsB) //se os pontos forem iguais
    {
        const saldoGolsA = a.golsFeitos - a.golsSofridos;
        const saldoGolsB = b.golsFeitos - b.golsSofridos;

        if (saldoGolsA === saldoGolsB) //se os saldos forem iguais
        {//faz quem tem mais vitorias
            if (a.vitorias === b.vitorias) //se vitorias forem iguais
            {
                return b.empates - a.empates; //quem tiver mais empate, tera menos derrotas
            }
            else {
                return b.vitorias - a.vitorias; //caso não, ordena por vitorias
            }
        }
        else {
            return saldoGolsB - saldoGolsA; //ordena pelo saldo de gols
        }
    }
    else {
        return ptsB - ptsA; //caso não, ordena pelos pontos
    }
});

let posicaoTabela = 1; // como sera ordenado por quem tem + pontos, o 1o lugar tem rank 1 e vai

// for para adicionar um time por linha
for (const time of timesOrd) {
    const novaLinha = tbody.insertRow();

    //Coloca o valor da posicao no rank - RANK automatico
    time.rank = posicaoTabela; //são o mesmo que
    posicaoTabela++; //time.rank = posicaoNaTabela++;

    for (const prop in time) {
        const novaCell = novaLinha.insertCell();
        // novaCell.textContent = time[prop];
        // para não aparecer o path da imagem

        if (prop === 'ultimos') { //se a prop for essa

            const imagens = time[prop];
            for (const imgPath of imagens) {
                const img = document.createElement('img'); //cria um elemento
                img.src = imgPath; //e começa a tratar como img
                img.alt = 'resultado';
                novaCell.appendChild(img); //add a imagem dentro do novo td/cell
            }
        }
        else if (prop === 'saldoGols') { //CALCULO SALDO DE GOLS
            const SG = time.golsFeitos - time.golsSofridos; //SG é golsFeitos - golsSofridos
            novaCell.textContent = SG;
        }

        // add classe para sumir qdo for midia menor
        else if (
            prop === 'vitorias' ||
            prop === 'empates' ||
            prop === 'derrotas' ||
            prop === 'golsFeitos' ||
            prop === 'golsSofridos'
        ) {
            novaCell.textContent = time[prop]; //garantir q seja preenchida na tab antes de
            novaCell.classList.add("sumir"); //colocar a classe .sumir
        }

        else if (prop === 'cor') //adiciona classes
        {
            if ((novaLinha.rowIndex <= 3)) //menor igual a 1 ou seja só o primeiro objeto
            {
                novaCell.classList.add("classificados");
            }
            else if ((novaLinha.rowIndex > 3) && (novaLinha.rowIndex < 6)) //maior q 3
            //e menor que 4, ou seja, so o quarto colocado
            {
                novaCell.classList.add("repescagem");
            }
            else //restante
            {
                novaCell.classList.add("eliminados");
            }
        }

        else if (prop === 'pontos') //apenas para visualizacao na tabela
        //pois ja foi ordenado
        {
            const pontuacao = time.vitorias * 3 + time.empates * 1 + time.derrotas * 0;
            novaCell.textContent = pontuacao; //exibe na celula
        }

        else if (prop === 'nome') {
            novaCell.textContent = time[prop]; //garantir a exibição
            novaCell.colSpan = 2; //é 2 pois add a prop rank
            //q divide o espaço com o nome do time
        }
        else { //se não atender nenhuma das condições
            novaCell.textContent = time[prop];
        }
    }
}

// PROJETO FASE DE GRUPOS 2024
// AS TABELAS SERÃO FEITAS COM OBJETOS EM JS

//a diferença entre time.vitorias e time["vitorias"] é que

// a primeira forma é p string validada EX: time.vitorias

// já a segunda forma é para props q tem caracter especial ($) ou espaços
// aí fica: time["numero de vitorias"];