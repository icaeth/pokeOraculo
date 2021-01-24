/* Variables */
let tamañoPoke = ""
let pesoPoke = ""
let idPoke = ""
let idNamae = ""


/* Llamadas a la api */

/* Llamada 1 - GET height + Modificar gráfico con los datos */

function llamada1() {
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + idPoke + '',
        success: function (data) {
            tamañoPoke = data.height
            return tamañoPoke
        }
    })
};



/* Llamada 2 - GET weight + Incorporarlos a un dropdown */


function llamada2() {
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + idPoke + '',
        success: function (data) {
            pesoPoke = data.weight
            return pesoPoke
        }
    })
};



/* Llamada 3 - GET Tipos + Recorrer arreglo + Incorporarlos a un dropdown */

$.ajax({
    type: 'GET',
    url: 'https://pokeapi.co/api/v2/type',
    success: function (data) {
        const { results } = data;
        results.forEach(function (name) {
            $('<option>' + name.name + '</option>').appendTo('#pokeTipo');
        });
    }
});


/* Llamada 4 - GET Names + Recorrer arreglo + Incorporarlos a un form input sugerencia */



$.ajax({
    type: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=900',
    success: function (data) {
        const { results } = data;
        results.forEach(function (name, index) {
            id = index + 1
            $('<option value="' + name.name + '">' + name.name + '</option>"').appendTo('.pokeName');
            $('<option value="' + id + '">' + id + '</option>"').appendTo('.pokeNumber');
        });
    }
});

/* Llamada 5 - GET Datos del pokemon para Estilizar la card */


function llamada5() {
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + idPoke + '',
        success: function (data) {
            comparador = []
            const { sprites: { other: { dream_world: { front_default } } } } = data
            const { name } = data
            const { id } = data
            const { stats: { 0: { base_stat: pHp } } } = data
            const { stats: { 1: { base_stat: pAtk } } } = data
            const { stats: { 2: { base_stat: pDef } } } = data
            const { stats: { 3: { base_stat: pSatk } } } = data
            const { stats: { 4: { base_stat: pSdef } } } = data
            const { stats: { 5: { base_stat: pSpd } } } = data
            const { types: { 0: { type: { name: type } } } } = data
            $(".poke-card__imageFloat").attr("src", front_default)
            $(".poke-card__name__h4").text(name)
            $(".poke-card__pt_tipo").text(type)
            $(".poke-card__pt_numero").text(id)
            comparador.push(pHp, pAtk, pDef, pSatk, pSdef, pSpd)
            return comparador
        }
    })
};


/* Llamada 6 - GET Datos del pokemon para Estilizar la card */

function llamada6() {
    $.ajax({
        type: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + idNamae + '',
        success: function (data) {
            comparador = []
            const { sprites: { other: { dream_world: { front_default } } } } = data
            const { name } = data
            const { id } = data
            const { stats: { 0: { base_stat: pHp } } } = data
            const { stats: { 1: { base_stat: pAtk } } } = data
            const { stats: { 2: { base_stat: pDef } } } = data
            const { stats: { 3: { base_stat: pSatk } } } = data
            const { stats: { 4: { base_stat: pSdef } } } = data
            const { stats: { 5: { base_stat: pSpd } } } = data
            const { types: { 0: { type: { name: type } } } } = data
            $(".poke-card__imageFloat").attr("src", front_default)
            $(".poke-card__name__h4").text(name)
            $(".poke-card__pt_tipo").text(type)
            $(".poke-card__pt_numero").text(id)
            comparador.push(pHp, pAtk, pDef, pSatk, pSdef, pSpd)
            return comparador
        }
    })
};



/* Función Asignadora de array a Stats */

function asignar() {
    eHp = parseInt($('.hp').val())
    eAtk = parseInt($('.atk').val())
    eDef = parseInt($('.def').val())
    eSatk = parseInt($('.satk').val())
    eSdef = parseInt($('.sdef').val())
    eSpd = parseInt($('.speed').val())
}

/* Función comparadora de stats vs pokemon */

function comparar() {
    resultado = Math.abs(eHp - comparador[0]) + Math.abs(eAtk - comparador[1]) +
        Math.abs(eDef - comparador[2]) + Math.abs(eSatk - comparador[3]) +
        Math.abs(eSdef - comparador[4]) + Math.abs(eSpd - comparador[5]);
    return
}




/* Destructurar objeto comparador */



function draw() {
    var chart = new CanvasJS.Chart("chartContainer",
        {

            animationEnabled: true,
            animationDuration: 2000,
            title: {
                text: "¿Cuánto conoce " + maestroPokemon + " a su pokemón " + nickPokemon + "? \n Fallaste por: " + resultado + " puntos"
            },
            axisY: {
                title: "Stats",
                maximum: 1010
            },
            data: [
                {
                    type: "bar",
                    showInLegend: true,
                    legendText: "Entrenador",
                    color: "gold",
                    dataPoints: [
                        { y: eHp, label: "HP" },
                        { y: eAtk, label: "ATK" },
                        { y: eDef, label: "DEF" },
                        { y: eSatk, label: "S.ATK" },
                        { y: eSdef, label: "S.DEF" },
                        { y: eSpd, label: "SPD" }

                    ]
                },
                {
                    type: "bar",
                    showInLegend: true,
                    legendText: "Pokemon",
                    color: "silver",
                    dataPoints: [
                        { y: comparador[0], label: "HP" },
                        { y: comparador[1], label: "ATK" },
                        { y: comparador[2], label: "DEF" },
                        { y: comparador[3], label: "S.ATK" },
                        { y: comparador[4], label: "S.DEF" },
                        { y: comparador[5], label: "SPD" }
                    ]
                }
            ]
        });
    chart.render();
}




/* Gráfico + Botón*/

$('.boton_grafico').click(function () {

    event.preventDefault()
    asignar()
    comparar()
    draw()



})

/* Botón Invocar */

$('.boton_invocar').click(function () {
    event.preventDefault()
    if ($('#idPoke').val() != "") {
        idPoke = $('#idPoke').val()
        maestroPokemon = $('#maestroPokemon').val()
        nickPokemon = $('#nickPokemon').val()
        llamada1()
        llamada2()
        llamada5()
        setTimeout(function () { $('.pokeCardContainer').toggleClass("show"); }, 3000);
        setTimeout(function () { $('.pokeCardContainer2').toggleClass("hide") }, 3000);
        $('.pokeCardContainer2').toggleClass("bounce-out-top")
        return idPoke
    }
    else if ($('#exampleDataList').val() != "") {
        event.preventDefault()
        idNamae = $('#exampleDataList').val()
        maestroPokemon = $('#maestroPokemon').val()
        nickPokemon = $('#nickPokemon').val()
        llamada1()
        llamada2()
        llamada6()
        setTimeout(function () { $('.pokeCardContainer').toggleClass("show"); }, 3000);
        setTimeout(function () { $('.pokeCardContainer2').toggleClass("hide") }, 3000);
        $('.pokeCardContainer2').toggleClass("bounce-out-top")
        return idNamae
    }
    else { alert("Ingresa el nombre de un pokemon o su numero") }

})

