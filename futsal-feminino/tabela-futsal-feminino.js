// TABELA - FASE DE GRUPOS
// cor automática
// rank automático
// pontos automáticos
// saldo de gols automático
const times = [
    {
        cor: "",
        rank: '',
        logo: "../assets/aut-logo.png",
        nome: "Computaria",
        pontos: '',
        jogos: 1,
        vitorias: 0,
        empates: 0,
        derrotas: 1,
        golsFeitos: 0,
        golsSofridos: 7,
        saldoGols: '',
        ultimos: [
            "../assets/derrota.svg",
            "../assets/empate.svg",
            "../assets/empate.svg",
        ],
    },
    {
        cor: "",
        rank: '',
        logo: "../assets/eletro-logo.png",
        nome: "Eletro Girls",
        pontos: '',
        jogos: 1,
        vitorias: 0,
        empates: 0,
        derrotas: 1,
        golsFeitos: 1,
        golsSofridos: 3,
        saldoGols: '',
        ultimos: [
            "../assets/derrota.svg",
            "../assets/empate.svg",
            "../assets/empate.svg",
        ],
    },
    {
        cor: "",
        rank: '',
        logo: "../assets/eletronica-logo.png",
        nome: "Milantrônicas",
        pontos: '',
        jogos: 1,
        vitorias: 1,
        empates: 0,
        derrotas: 0,
        golsFeitos: 7,
        golsSofridos: 0,
        saldoGols: '',
        ultimos: [
            "../assets/vitoria.svg",
            "../assets/empate.svg",
            "../assets/empate.svg",
        ],
    },
    {
        cor: "",
        rank: '',
        logo: "../assets/mec-logo.png",
        nome: "MecSteel",
        pontos: '',
        jogos: 1,
        vitorias: 1,
        empates: 0,
        derrotas: 0,
        golsFeitos: 3,
        golsSofridos: 1,
        saldoGols: '',
        ultimos: [
            "../assets/vitoria.svg",
            "../assets/empate.svg",
            "../assets/empate.svg",
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
        
        if(prop === 'logo') { // IMPORTANTE!
            const logoImg = document.createElement('img');
            logoImg.src = time[prop];
            logoImg.alt = `${time.nome}`;
            logoImg.style.width = '25px';
            logoImg.style.marginTop = '5px';
            novaCell.appendChild(logoImg);
        }
        else if (prop === 'ultimos') { //se a prop for essa

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
            if ((novaLinha.rowIndex <= 2)) //menor igual a 1 ou seja só o primeiro objeto
            {
                novaCell.classList.add("classificados");
            }
            // else if ((novaLinha.rowIndex > 2) && (novaLinha.rowIndex < 6)) //maior q 3
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
            novaCell.colSpan = 1; //é 2 pois add a prop rank
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