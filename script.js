/* Variables */


/* Llamadas a la api */

/* $.getJSON("https://pokeapi.co/api/v2/pokemon/ditto", function (data) {
    var name = [];
    console.log('success', data);
    name.push(data.name, data.base_experience, data.weight);
    console.log(name);
    $('.poke-card__description').html(name[1])
    console.log(name[1])
    console.log(name[2])
});
 */

/* Gráfico */

const tamaño = 3;

window.onload = function () {
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
}