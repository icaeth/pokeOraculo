/* Variables */


/* Llamadas a la api */

let tamañoPoke = ""
let pesoPoke = ""
let tipoPoke = 5

$.ajax({
    type: 'GET',
    url: 'https://pokeapi.co/api/v2/pokemon/cubone',
    success: function (data) {
        tamañoPoke = data.height
        pesoPoke = data.weight
        /* tipoPoke = data.type */
        return tamañoPoke
    }
})


/* 

*/



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

