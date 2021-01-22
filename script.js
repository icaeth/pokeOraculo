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
            $('<option value="' + name.name + '">').appendTo('.pokeName');
            $('<option value="' + index + '">').appendTo('.pokeNumber');
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
            console.log(data)
            const { sprites: { other: { dream_world: { front_default } } } } = data
            const { name } = data
            const { id } = data
            const { stats } = data
            const { types: { 0: { type: { name: type } } } } = data
            $(".poke-card__imageFloat").attr("src", front_default)
            $(".poke-card__name__h4").text(name)
            $(".poke-card__pt_tipo").text(type)
            $(".poke-card__pt_numero").text(id)
            comparador.push(stats)
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
            const { stats } = data
            const { types: { 0: { type: { name: type } } } } = data
            $(".poke-card__imageFloat").attr("src", front_default)
            $(".poke-card__name__h4").text(name)
            $(".poke-card__pt_tipo").text(type)
            $(".poke-card__pt_numero").text(id)
            comparador.push(stats)
            return comparador
        }
    })
};



/* Función Asignadora de array a Stats */

function asignar() {
    eHp = $('.hp').val()
    eAtk = $('.atk').val()
    eDef = $('.def').val()
    eSatk = $('.satk').val()
    eSdef = $('.sdef').val()
    eSpd = $('.speed').val()


    /* Destructurar objeto comparador */

}



/* Gráfico + Botón*/

$('.boton_grafico').click(function () {
    asignar();
    event.preventDefault()
    var chart = new CanvasJS.Chart("chartContainer",

        {
            animationEnabled: true,
            animationDuration: 2000,
            title: {
                text: "¿Cuánto conoce " + maestroPokemon + " a su pokemón " + nickPokemon + "?"
            },
            axisY: {
                title: "Medals won",
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
                        { y: 125, label: "ATK" },
                        { y: 112, label: "DEF" },
                        { y: 132, label: "S.ATK" },
                        { y: 7, label: "S.DEF" },
                        { y: 5, label: "SPD" }
                    ]
                },
                {
                    type: "bar",
                    showInLegend: true,
                    legendText: "Pokemon",
                    color: "silver",
                    dataPoints: [
                        { y: 198, label: "HP" },
                        { y: 201, label: "ATK" },
                        { y: 202, label: "DEF" },
                        { y: 236, label: "S.ATK" },
                        { y: 395, label: "S.DEF" },
                        { y: 957, label: "SPD" }
                    ]
                }
            ]
        });
    chart.render();
})

/* Botón Invocar */

$('.boton_invocar').click(function () {
    if ($('#idPoke').val() != "") {
        event.preventDefault()
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

