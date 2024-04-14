// Variáveis para armazenar valores de entrada
let ultimoValorIni = '';
let ultimoTaxaAno = '';
let ultimoTempo = '';

// Função que verifica se os valores de entrada foram alterados.
function inputsAlterados() {
    const valorIni = document.getElementById('valorIni').value;
    const taxaAno = document.getElementById('taxaAno').value;
    const tempo = document.getElementById('tempo').value;

    return valorIni !== ultimoValorIni || taxaAno !== ultimoTaxaAno || tempo !== ultimoTempo;
}

document.getElementById('calculate').addEventListener('click', () => {
    // Verifica se os valores dos inputs foram alterados
    if (!inputsAlterados()) {
        return; // Se os valores não foram alterados, não faz nada.
    }

    // Registre os valores adicionais dos inputs.
    ultimoValorIni = document.getElementById('valorIni').value;
    ultimoTaxaAno = document.getElementById('taxaAno').value;
    ultimoTempo = document.getElementById('tempo').value;
    // Registre os valores adicionais dos inputs fim

    const value = parseFloat(document.getElementById('valorIni').value);
    const taxaAno = parseFloat(document.getElementById('taxaAno').value) / 100;
    const taxaMes = ((1 + taxaAno) ** (1 / 12) - 1);
    const tempo = parseInt(document.getElementById('tempo').value);

    const taxaAnoTransform = ((1 + taxaAno) ** (1 / 12) - 1) * 100;

    const total = formulajs.CUMIPMT(taxaMes, tempo, value, 1, tempo, 0) * -1;
    const resultadofinal = value + total;

    const inputtaxames = document.getElementById('taxaMes');
    inputtaxames.value = taxaAnoTransform.toFixed(4);

    const parcelas = resultadofinal / tempo;

    document.getElementById('total').innerHTML = "R$ " + resultadofinal.toFixed(2).replace('.', ',');
    document.getElementById('parcelas').innerHTML = "R$ " + parcelas.toFixed(2).replace('.', ','); 

    // SCRIPTS DA TABELA ABAIXO V V V V V V V V V

	// Pega os elementos span usando seus IDs
    var capitalSpan = document.getElementById("capital");
    var montanteJurosSpan = document.getElementById("montanteJuros");
    var totalEstimadoSpan = document.getElementById("totalEstimado");

    // Define os valores dos espaços.
    var capital = parseFloat(document.getElementById('valorIni').value); 
    var montanteJuros = total; 
    var totalEstimado = capital + montanteJuros;

    // O texto dentro dos spans é atualizado
    capitalSpan.textContent = "R$ " + capital.toFixed(2);
    montanteJurosSpan.textContent = "R$ " + montanteJuros.toFixed(2);
    totalEstimadoSpan.textContent = "R$ " + totalEstimado.toFixed(2);

    // Teste se a tabela já existe.
    let tabelaJurosDiaExistente = document.getElementById('tabelaJurosDia');
    if (!tabelaJurosDiaExistente) {
        // Cria uma nova tabela caso não exista
        tabelaJurosDiaExistente = document.createElement('table');
        tabelaJurosDiaExistente.id = 'tabelaJurosDia';
        tabelaJurosDiaExistente.classList.add('table', 'table-bordered', 'table-hover', 'table-striped', 'table-dark');
        
        // Configura o cabeçalho da tabela
        const theadJurosDia = document.createElement('thead');
        theadJurosDia.innerHTML = `
            <tr>
                <th>Dia</th>
                <th>Vendas</th>
                <th>Retenção</th>
                <th>Soma da Retenção</th>
            </tr>
        `;
        tabelaJurosDiaExistente.appendChild(theadJurosDia);
        
        // Acrescenta o corpo da tabela.
        const tbodyJurosDia = document.createElement('tbody');
        tabelaJurosDiaExistente.appendChild(tbodyJurosDia);
        
        // Adiciona uma tabela a página.
        const divTabelaJurosDia = document.getElementById('printfinal');
        divTabelaJurosDia.appendChild(tabelaJurosDiaExistente);
    }

    // pega o tbody da tabela
    const tbodyJurosDia = tabelaJurosDiaExistente.querySelector('tbody');
    
    // Verifica se os trs já estão na tabela e remove caso sim
    const trs = tbodyJurosDia.querySelectorAll('tr');
    if (trs.length > 0) {
        trs.forEach(tr => {
            tbodyJurosDia.removeChild(tr);
        });
    }
    
    // Adiciona novos dados do dia 1 ao dia 31
    let somaRetencao = 0;
    for (let dia = 1; dia <= 30; dia++) {
        const vendas = parcelas / 30; 
        const retencao = vendas * 0.05;
        somaRetencao += retencao;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${dia}</td>
            <td>R$ ${vendas.toFixed(2)}</td>
            <td>R$ ${retencao.toFixed(2)}</td>
            <td>R$ ${somaRetencao.toFixed(2)}</td>
        `;
        tbodyJurosDia.appendChild(tr);
    }
    // FIM DO CÓDIGO DA TABELA GRAÇAS A DEUS

});
