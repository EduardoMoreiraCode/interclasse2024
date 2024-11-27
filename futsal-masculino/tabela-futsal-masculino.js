// TABELA - FASE DE GRUPOS
// cor automática
// rank automático
// pontos automáticos
// saldo de gols automático
const times1 = [
    {
        cor: "",
        rank: '',
        nome: "DG",
        pontos: '',
        jogos: 3,
        vitorias: 0,
        empates: 0,
        derrotas: 3,
        golsFeitos: 4,
        golsSofridos: 34,
        saldoGols: '',
        ultimos: [
            "../assets/derrota.svg",
            "../assets/derrota.svg",
            "../assets/derrota.svg",
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "BD7",
        pontos: '',
        jogos: 2,
        vitorias: 1,
        empates: 1,
        derrotas: 0,
        golsFeitos: 17,
        golsSofridos: 4,
        saldoGols: '',
        ultimos: [
            "../assets/vitoria.svg",
            "../assets/empate.svg",
            "../assets/empate.svg",
        ],
    },{
        cor: "",
        rank: '',
        nome: "É os D pt. 2",
        pontos: '',
        jogos: 2,
        vitorias: 1,
        empates: 1,
        derrotas: 0,
        golsFeitos: 8,
        golsSofridos: 3,
        saldoGols: '',
        ultimos: [
            "../assets/vitoria.svg",
            "../assets/empate.svg",
            "../assets/empate.svg",
        ],
    },{
        cor: "",
        rank: '',
        nome: "NGA FC",
        pontos: '',
        jogos: 3,
        vitorias: 0,
        empates: 1,
        derrotas: 1,
        golsFeitos: 7,
        golsSofridos: 7,
        saldoGols: '',
        ultimos: [
            "../assets/derrota.svg",
            "../assets/empate.svg",
            "../assets/empate.svg",
        ],
    },{
        cor: "",
        rank: '',
        nome: "Computaria",
        pontos: '',
        jogos: 3,
        vitorias: 1,
        empates: 0,
        derrotas: 1,
        golsFeitos: 10,
        golsSofridos: 9,
        saldoGols: '',
        ultimos: [
            "../assets/derrota.svg",
            "../assets/vitoria.svg",
            "../assets/empate.svg",
        ],
    },{
        cor: "",
        rank: '',
        nome: "West Ohm",
        pontos: '',
        jogos: 3,
        vitorias: 2,
        empates: 1,
        derrotas: 0,
        golsFeitos: 17,
        golsSofridos: 6,
        saldoGols: '',
        ultimos: [
            "../assets/vitoria.svg",
            "../assets/empate.svg",
            "../assets/empate.svg",
        ],
    }
];


const tabela = document.getElementById("table");
const tbody = tabela.getElementsByTagName("tbody")[0];
// Limpa a tabela, para evitar copia de dados
tbody.innerHTML = '';

// const timesOrd = times.sort((a, b) => b.pontos - a.pontos); ordenar pelos pontos
const timesOrd = times1.sort((a, b) => { //ORDENACAO POR PONTOS
    const ptsA = a.vitorias * 3 + a.empates * 1 + a.derrotas * 0;
    //a = primeiro objeto para comparar
    const ptsB = b.vitorias * 3 + b.empates * 1 + b.derrotas * 0;
    //b = segundo objeto para comparar
    if (ptsA === ptsB) //se os pontos forem iguais
    {

        if (a.vitorias === b.vitorias) //se as vitorias forem iguais
        {//faz quem tem mais gols
            const saldoGolsA = a.golsFeitos - a.golsSofridos;
            const saldoGolsB = b.golsFeitos - b.golsSofridos;

            if(saldoGolsA === saldoGolsB)
            {
                b.empates - a.empates;
            }
            else {
                return saldoGolsB - saldoGolsA;
            }
        }
        else {
            return b.vitorias - a.vitorias; //ordena pelo saldo de gols
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
            prop === 'golsSofridos' ||
            prop === 'jogos'
        ) {
            novaCell.textContent = time[prop]; //garantir q seja preenchida na tab antes de
            novaCell.classList.add("sumir"); //colocar a classe .sumir
        }

        else if (prop === 'cor') //adiciona classes
        {
            if ((novaLinha.rowIndex <= 4)) //menor igual a 1 ou seja só o primeiro objeto
            {
                novaCell.classList.add("classificados");
            }
            // else if ((novaLinha.rowIndex > 4) && (novaLinha.rowIndex < 9)) //maior q 3
            // //e menor que 4, ou seja, so o quarto colocado
            // {
            //     novaCell.classList.add("repescagem");
            // }
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

//IMPORTANTE! TABELA 2

const times2 = [
    {
        cor: "",
        rank: '',
        nome: "DG",
        pontos: '',
        jogos: 2,
        vitorias: 0,
        empates: 0,
        derrotas: 2,
        golsFeitos: 5,
        golsSofridos: 22,
        saldoGols: '',
        ultimos: [
            "../assets/derrota.svg",
            "../assets/derrota.svg",
            "../assets/empate.svg",
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Pretônicos",
        pontos: '',
        jogos: 2,
        vitorias: 2,
        empates: 0,
        derrotas: 0,
        golsFeitos: 11,
        golsSofridos: 5,
        saldoGols: '',
        ultimos: [
            "../assets/vitoria.svg",
            "../assets/vitoria.svg",
            "../assets/empate.svg",
        ],
    },{
        cor: "",
        rank: '',
        nome: "Javentus",
        pontos: '',
        jogos: 2,
        vitorias: 1,
        empates: 1,
        derrotas: 0,
        golsFeitos: 6,
        golsSofridos: 3,
        saldoGols: '',
        ultimos: [
            "../assets/empate.svg",
            "../assets/vitoria.svg",
            "../assets/empate.svg",
        ],
    },{
        cor: "",
        rank: '',
        nome: "MecSteel",
        pontos: '',
        jogos: 3,
        vitorias: 1,
        empates: 0,
        derrotas: 2,
        golsFeitos: 12,
        golsSofridos: 16,
        saldoGols: '',
        ultimos: [
            "../assets/derrota.svg",
            "../assets/vitoria.svg",
            "../assets/derrota.svg",
        ],
    },{
        cor: "",
        rank: '',
        nome: "Tikaplaus",
        pontos: '',
        jogos: 3,
        vitorias: 2,
        empates: 0,
        derrotas: 1,
        golsFeitos: 19,
        golsSofridos: 8,
        saldoGols: '',
        ultimos: [
            "../assets/vitoria.svg",
            "../assets/derrota.svg",
            "../assets/vitoria.svg",
        ],
    },{
        cor: "",
        rank: '',
        nome: "Mec Bull Graxantino",
        pontos: '',
        jogos: 2,
        vitorias: 0,
        empates: 1,
        derrotas: 1,
        golsFeitos: 2,
        golsSofridos: 5,
        saldoGols: '',
        ultimos: [
            "../assets/empate.svg",
            "../assets/derrota.svg",
            "../assets/empate.svg",
        ],
    }
];

const tabela2 = document.getElementById("table2");
const tbody2 = tabela2.getElementsByTagName("tbody")[0];
// Limpa a tabela, para evitar copia de dados
tbody2.innerHTML = '';

// const timesOrd = times.sort((a, b) => b.pontos - a.pontos); ordenar pelos pontos
const timesOrd2 = times2.sort((a, b) => { //ORDENACAO POR PONTOS
    const ptsA = a.vitorias * 3 + a.empates * 1 + a.derrotas * 0;
    //a = primeiro objeto para comparar
    const ptsB = b.vitorias * 3 + b.empates * 1 + b.derrotas * 0;
    //b = segundo objeto para comparar
    if (ptsA === ptsB) //se os pontos forem iguais
    {

        if (a.vitorias === b.vitorias) //se as vitorias forem iguais
        {//faz quem tem mais gols
            const saldoGolsA = a.golsFeitos - a.golsSofridos;
            const saldoGolsB = b.golsFeitos - b.golsSofridos;

            if(saldoGolsA === saldoGolsB)
            {
                b.empates - a.empates;
            }
            else {
                return saldoGolsB - saldoGolsA;
            }
        }
        else {
            return b.vitorias - a.vitorias; //ordena pelo saldo de gols
        }
    }
    else {
        return ptsB - ptsA; //caso não, ordena pelos pontos
    }
});

let posicaoTabela2 = 1; // como sera ordenado por quem tem + pontos, o 1o lugar tem rank 1 e vai

// for para adicionar um time por linha
for (const time of timesOrd2) {
    const novaLinha = tbody2.insertRow();

    //Coloca o valor da posicao no rank - RANK automatico
    time.rank = posicaoTabela2; //são o mesmo que
    posicaoTabela2++; //time.rank = posicaoNaTabela++;

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
            prop === 'golsSofridos' ||
            prop === 'jogos'
        ) {
            novaCell.textContent = time[prop]; //garantir q seja preenchida na tab antes de
            novaCell.classList.add("sumir"); //colocar a classe .sumir
        }

        else if (prop === 'cor') //adiciona classes
        {
            if ((novaLinha.rowIndex <= 4)) //menor igual a 1 ou seja só o primeiro objeto
            {
                novaCell.classList.add("classificados");
            }
            // else if ((novaLinha.rowIndex > 4) && (novaLinha.rowIndex < 9)) //maior q 3
            // //e menor que 4, ou seja, so o quarto colocado
            // {
            //     novaCell.classList.add("repescagem");
            // }
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