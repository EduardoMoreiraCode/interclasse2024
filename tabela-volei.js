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
        nome: "Time 1",
        pontos: '',
        jogos: 10,
        vitorias: 4,
        derrotas: 6,
        setsFavor: 21,
        setsContra: 24,
        saldoSets: '',
        ptsFeitos: 280,
        ptsSofridos: 290,
        saldoPts: '',
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
        nome: "Time 2",
        pontos: '',
        jogos: 10,
        vitorias: 6,
        derrotas: 4,
        setsFavor: 23,
        setsContra: 17,
        saldoSets: '',
        ptsFeitos: 300,
        ptsSofridos: 270,
        saldoPts: '',
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
        nome: "Time 3",
        pontos: '',
        jogos: 10,
        vitorias: 8,
        derrotas: 2,
        setsFavor: 28,
        setsContra: 12,
        saldoSets: '',
        ptsFeitos: 320,
        ptsSofridos: 250,
        saldoPts: '',
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
        nome: "Time 4",
        pontos: '',
        jogos: 10,
        vitorias: 5,
        derrotas: 5,
        setsFavor: 22,
        setsContra: 20,
        saldoSets: '',
        ptsFeitos: 290,
        ptsSofridos: 280,
        saldoPts: '',
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
        nome: "Time 5",
        pontos: '',
        jogos: 10,
        vitorias: 7,
        derrotas: 3,
        setsFavor: 25,
        setsContra: 15,
        saldoSets: '',
        ptsFeitos: 310,
        ptsSofridos: 270,
        saldoPts: '',
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
        nome: "Time 6",
        pontos: '',
        jogos: 10,
        vitorias: 3,
        derrotas: 7,
        setsFavor: 18,
        setsContra: 25,
        saldoSets: '',
        ptsFeitos: 270,
        ptsSofridos: 300,
        saldoPts: '',
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
    const ptsA = a.vitorias * 3 + a.derrotas * 0;
    //a = primeiro objeto para comparar
    const ptsB = b.vitorias * 3 + b.derrotas * 0;
    //b = segundo objeto para comparar
    if (ptsA === ptsB) //se os pontos forem iguais
    {
        const saldoPtsA = a.ptsFeitos - a.ptsSofridos;
        const saldoPtsB = b.ptsFeitos - b.ptsSofridos;

        if (saldoPtsA === saldoPtsB) //se os saldos forem iguais
        {
            const saldoSetsA = a.setsFavor - a.setsContra;
            const saldoSetsB = b.setsFavor - b.setsContra;

            return saldoSetsB - saldoSetsA;
        }
        else {
            return saldoPtsB - saldoPtsA; //ordena pelo saldo de gols
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
        else if (prop === 'saldoPts') { //CALCULO SALDO DE PONTOS
            const SP = time.ptsFeitos - time.ptsSofridos;
            novaCell.textContent = SP;
        }
        else if (prop === 'saldoSets') {
            const SS = time.setsFavor - time.setsContra;
            novaCell.textContent = SS;
        }

        // add classe para sumir qdo for midia menor
        else if (
            prop === 'jogos' ||
            prop === 'setsFavor' ||
            prop === 'vitorias' ||
            prop === 'derrotas' ||
            prop === 'setsContra' ||
            prop === 'ptsFeitos' ||
            prop === 'ptsSofridos'
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
            const pontuacao = time.vitorias * 3 + time.derrotas * 0;
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