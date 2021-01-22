/* Variables */




let tamañoPoke = ""
let pesoPoke = ""
let tipoPoke = 5
let idPoke = ""
let idNamae = ""


/* Listeners */




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
    url: 'https://pokeapi.co/api/v2/pokemon/?limit=1118',
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
            const { sprites: { other: { dream_world: { front_default } } } } = data
            const { name } = data
            $(".poke-card__imageFloat").attr("src", front_default)
            $(".poke-card__name__h4").text(name)
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
            $(".poke-card__imageFloat").attr("src", front_default)
            $(".poke-card__name__h4").text(name)
        }
    })
};




/* Gráfico */




/* window.onload = function () {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        animationDuration: 2000,
        title: {
            text: "Cual es mi afinidad con mi pokemón"
        },
        data: [
            {
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
                dataPoints: [
                    { label: "Tamaño", y: tamaño },
                    { label: "Tipo", y: 15 },
                    { label: "Experiencia", y: 25 },

                ]
            }
        ]
    });
    chart.render();
} */

$('.boton_grafico').click(function () {
    console.log($('#selectado'))
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        animationDuration: 2000,
        title: {
            text: "Cual es mi afinidad con mi pokemón"
        },
        data: [
            {
                // Change type to "doughnut", "line", "splineArea", etc.
                type: "column",
                dataPoints: [
                    { label: "Tamaño", y: tamañoPoke },
                    { label: "Peso", y: pesoPoke },
                    { label: "Tipo", y: tipoPoke },

                ]
            }
        ]
    });
    chart.render();
})

$('.boton_invocar').click(function () {
    if ($('#idPoke').val() != "") {
        idPoke = $('#idPoke').val()
        llamada1()
        llamada2()
        llamada5()
        setTimeout(function () { $('.pokeCardContainer').toggleClass("show"); }, 3000);
        setTimeout(function () { $('.pokeCardContainer2').toggleClass("hide") }, 3000);
        $('.pokeCardContainer2').toggleClass("bounce-out-top")
        return idPoke
    }
    else if ($('#exampleDataList').val() != "") {
        idNamae = $('#exampleDataList').val()
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

$('.boton_devolver').click(function () {
    $('.pokeCardContainer').toggleClass("bounce-out-top")
    setTimeout(function () { $('.pokeCardContainer2').toggleClass("show"); }, 3000);
    setTimeout(function () { $('.pokeCardContainer2').toggleClass("bounce-out-top") }, 3000);
    $('.boton_devolver').hide()
    $('.boton_invocar').show()

})



