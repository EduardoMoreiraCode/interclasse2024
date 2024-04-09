const goleiros = [
    {
        cor: '',
        rank: '',
        nome: 'Goleiro 1',
        time: 'Saadicos',
        defesas: 21
    },
    {
        cor: '',
        rank: '',
        nome: 'Goleiro 2',
        time: 'Broca Juniors',
        defesas: 19
    },
    {
        cor: '',
        rank: '',
        nome: 'Goleiro 3',
        time: 'Javax',
        defesas: 15
    },
];

const tabelaGoleiro = document.getElementById("goleiro-table");
const tableBodyG = tabelaGoleiro.getElementsByTagName("tbody")[0];
// Limpa a tabela, para evitar copia de dados
tableBodyG.innerHTML = '';

const goleirosOrd = goleiros.sort((a, b) => {
    const defesasA = a.defesas;
    const defesasB = b.defesas;

    return defesasB - defesasA;
});

let posicaoParaRank = 1;

for (const goleiro of goleirosOrd) {
    const novaLinha = tableBodyG.insertRow();

    goleiro.rank = posicaoParaRank;
    posicaoParaRank++;

    for (const prop in goleiro) {
        const novaCell = novaLinha.insertCell();

        // if(prop === 'time')
        // {
        //     novaCell.textContent = goleiro[prop];
        //     novaCell.classList.add("sumir");
        // }
         if(prop === 'nome') {
            novaCell.textContent = goleiro[prop];
            novaCell.colSpan = 2;
        }
        else if (prop === 'cor') //adiciona classes
        {
            if ((novaLinha.rowIndex === 1)) //menor igual a 1 ou seja só o primeiro objeto
            {
                novaCell.classList.add("classificados");
            }
            else if ((novaLinha.rowIndex === 2)) //maior q 3
            //e menor que 4, ou seja, so o quarto colocado
            {
                novaCell.classList.add("repescagem");
            }
            else //restante
            {
                novaCell.classList.add("eliminados");
            }
        }
        else
        {
            novaCell.textContent = goleiro[prop];
        }
    }
}