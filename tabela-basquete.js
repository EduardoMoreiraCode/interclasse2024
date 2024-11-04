// TABELA - FASE DE GRUPOS
// cor automática
// rank automático
// saldo de pontos automático


//IMPORTANTE! tabela 1
const times1 = [
    {
        cor: "",
        rank: '',
        nome: "Time 1",
        jogos: 10,
        vitorias: 8,
        derrotas: 2,
        vitPercentual: '',
        ptsFeitos: 76,
        ptsSofridos: 24,
        saldoPts: '',
        ultimos: [
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Time 2",
        jogos: 10,
        vitorias: 8,
        derrotas: 2,
        vitPercentual: '',
        ptsFeitos: 63,
        ptsSofridos: 36,
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
        jogos: 10,
        vitorias: 6,
        derrotas: 4,
        vitPercentual: '',
        ptsFeitos: 52,
        ptsSofridos: 32,
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
        jogos: 10,
        vitorias: 1,
        derrotas: 9,
        vitPercentual: '',
        ptsFeitos: 12,
        ptsSofridos: 67,
        saldoPts: '',
        ultimos: [
            "./assets/derrota.svg",
            "./assets/derrota.svg",
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/derrota.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Time 5",
        jogos: 10,
        vitorias: 5,
        derrotas: 5,
        vitPercentual: '',
        ptsFeitos: 43,
        ptsSofridos: 41,
        saldoPts: '',
        ultimos: [
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg"
        ],
    },
];


const tabela = document.getElementById("table1");
const tbody = tabela.getElementsByTagName("tbody")[0];
// Limpa a tabela, para evitar copia de dados
tbody.innerHTML = '';

const timesOrd = times1.sort((a, b) => { //ORDENACAO POR PONTOS
    const ptsA = a.vitorias - a.derrotas;
    //a = primeiro objeto para comparar
    const ptsB = b.vitorias - b.derrotas;
    //b = segundo objeto para comparar
    if (ptsA === ptsB) //se os pontos forem iguais
    {
        const percentA = a.vitorias/a.jogos;
        const percentB = b.vitorias/b.jogos;

        if(percentA === percentB)
        {
            const saldoPtsA = a.ptsFeitos - a.ptsSofridos; 
            const saldoPtsB = b.ptsFeitos - b.ptsSofridos;
            
            return saldoPtsB - saldoPtsA;
        }
        else
        {
            return percentB - percentA;
        }
        
    }
    else {
        return ptsB - ptsA; //caso não, qm tiver mais fica em primeiro
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
                img.classList.add("sumir");
                novaCell.appendChild(img); //add a imagem dentro do novo td/cell
            }
        }
        else if (prop === 'saldoPts') { //CALCULO SALDO DE PONTOS
            const SP = time.ptsFeitos - time.ptsSofridos; //SP é ptsFeitos - ptsSofridos
            novaCell.textContent = SP;
        }
        
        // add classe para sumir qdo for midia menor
        else if (
            prop === 'jogos' ||
            // prop === 'ultimos' ||
            prop === 'ptsFeitos' ||
            prop === 'ptsSofridos'
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
            // else if ((novaLinha.rowIndex > 3) && (novaLinha.rowIndex < 6)) //maior q 3
            // //e menor que 4, ou seja, so o quarto colocado
            // {
            //     novaCell.classList.add("repescagem");
            // }
            else //restante
            {
                novaCell.classList.add("eliminados");
            }
        }
        else if(prop === 'vitPercentual') //ja foi ordenado
        { //somente para exibição
            const percent = (time.vitorias / time.jogos).toFixed(2);
            //toFixed é tantas casas decimais
            novaCell.textContent = percent; 
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
        nome: "Time 1",
        jogos: 10,
        vitorias: 6,
        derrotas: 4,
        vitPercentual: '',
        ptsFeitos: 82,
        ptsSofridos: 76,
        saldoPts: '',
        ultimos: [
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Time 2",
        jogos: 10,
        vitorias: 5,
        derrotas: 5,
        vitPercentual: '',
        ptsFeitos: 70,
        ptsSofridos: 75,
        saldoPts: '',
        ultimos: [
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/derrota.svg",
            "./assets/derrota.svg",
            "./assets/derrota.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Time 3",
        jogos: 10,
        vitorias: 7,
        derrotas: 3,
        vitPercentual: '',
        ptsFeitos: 92,
        ptsSofridos: 78,
        saldoPts: '',
        ultimos: [
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/derrota.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Time 4",
        jogos: 10,
        vitorias: 8,
        derrotas: 2,
        vitPercentual: '',
        ptsFeitos: 100,
        ptsSofridos: 60,
        saldoPts: '',
        ultimos: [
            "./assets/vitoria.svg",
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/derrota.svg"
        ],
    },
    {
        cor: "",
        rank: '',
        nome: "Time 5",
        jogos: 10,
        vitorias: 6,
        derrotas: 4,
        vitPercentual: '',
        ptsFeitos: 85,
        ptsSofridos: 80,
        saldoPts: '',
        ultimos: [
            "./assets/derrota.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg",
            "./assets/vitoria.svg"
        ],
    },
];


const tabela2 = document.getElementById("table2");
const tbody2 = tabela2.getElementsByTagName("tbody")[0];
// Limpa a tabela, para evitar copia de dados
tbody2.innerHTML = '';

const timesOrd2 = times2.sort((a, b) => { //ORDENACAO POR PONTOS
    const ptsA = a.vitorias - a.derrotas;
    //a = primeiro objeto para comparar
    const ptsB = b.vitorias - b.derrotas;
    //b = segundo objeto para comparar
    if (ptsA === ptsB) //se os pontos forem iguais
    {
        const percentA = a.vitorias/a.jogos;
        const percentB = b.vitorias/b.jogos;

        if(percentA === percentB)
        {
            const saldoPtsA = a.ptsFeitos - a.ptsSofridos; 
            const saldoPtsB = b.ptsFeitos - b.ptsSofridos;
            
            return saldoPtsB - saldoPtsA;
        }
        else
        {
            return percentB - percentA;
        }
        
    }
    else {
        return ptsB - ptsA; //caso não, qm tiver mais fica em primeiro
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
                img.classList.add("sumir");
                novaCell.appendChild(img); //add a imagem dentro do novo td/cell
            }
        }
        else if (prop === 'saldoPts') { //CALCULO SALDO DE PONTOS
            const SP = time.ptsFeitos - time.ptsSofridos; //SP é ptsFeitos - ptsSofridos
            novaCell.textContent = SP;
        }
        
        // add classe para sumir qdo for midia menor
        else if (
            prop === 'jogos' ||
            // prop === 'ultimos' ||
            prop === 'ptsFeitos' ||
            prop === 'ptsSofridos'
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
            // else if ((novaLinha.rowIndex > 3) && (novaLinha.rowIndex < 6)) //maior q 3
            // //e menor que 4, ou seja, so o quarto colocado
            // {
            //     novaCell.classList.add("repescagem");
            // }
            else //restante
            {
                novaCell.classList.add("eliminados");
            }
        }
        else if(prop === 'vitPercentual') //ja foi ordenado
        { //somente para exibição
            const percent = (time.vitorias / time.jogos).toFixed(2);
            //toFixed é tantas casas decimais
            novaCell.textContent = percent; 
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