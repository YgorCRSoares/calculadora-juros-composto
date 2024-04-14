document.getElementById('calculate').addEventListener('click', function(){
    const value = document.getElementById('valorIni').value;
    const taxaAno = parseFloat(document.getElementById('taxaAno').value) / 100;
    const taxaMes = ((1 + taxaAno) ** (1/12) - 1);
    const tempo = document.getElementById('tempo').value;

    const taxaAnoTransform = ((1 + taxaAno) ** (1/12)-1) * 100;

    const total = formulajs.CUMIPMT(taxaMes, tempo, value, 1, tempo, 0) * -1;
    const resultadofinal = parseFloat(value) + parseFloat(total);
    
    const inputtaxames = document.getElementById('taxaMes');
    inputtaxames.value = taxaAnoTransform.toFixed(4);

    document.getElementById('total').innerHTML = ("R$ "  + resultadofinal.toFixed(2).replace('.',','));
});
