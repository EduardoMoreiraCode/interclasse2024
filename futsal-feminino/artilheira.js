const jogadores = [
    {
        cor: '',
        rank: '',
        nome: 'Jogadora aí',
        time: 'Time',
        golsFeitos: 0,
        assist: 0,
        
    },
    {
        cor: '',
        rank: '',
        nome: 'Jogadora 2',
        time: 'Time',
        golsFeitos: 0,
        assist: 0,
    },
    {
        cor: '',
        rank: '',
        nome: 'Jogadora 3',
        time: 'Time',
        golsFeitos: 0,
        assist: 0,
    },
];

const tabelaArtilheiro = document.getElementById("artilheiro-table");
const tableBody = tabelaArtilheiro.getElementsByTagName("tbody")[0];
// Limpa a tabela, para evitar copia de dados
tableBody.innerHTML = '';

const jogadoresOrd = jogadores.sort((a, b) => {
    const golsA = a.golsFeitos;
    const golsB = b.golsFeitos;

    if(golsA === golsB)
    {
        const assistA = a.assist;
        const assistB = b.assist;

        return assistB - assistA;
    }
    else{
        return golsB - golsA;
    }
});

let posTable = 1;

for (const jogador of jogadoresOrd) {
    const novaLinha = tableBody.insertRow();

    jogador.rank = posTable;
    posTable++;

    for (const prop in jogador) {
        const novaCell = novaLinha.insertCell();

        // if(prop === 'time')
        // {
        //     novaCell.textContent = jogador[prop];
        //     novaCell.classList.add("sumir");
        // }
         if(prop === 'nome') {
            novaCell.textContent = jogador[prop];
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
        else if(prop === 'assist')
        {
                novaCell.textContent = jogador[prop]; //garantir q seja preenchida na tab antes de
                novaCell.classList.add("sumir"); //colocar a classe .sumir
        }
        else
        {
            novaCell.textContent = jogador[prop];
        }
    }
}