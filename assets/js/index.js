$(document).ready(function() {

    $("form").submit(function (evento) {//$( 'form' ).on( 'submit' , (event) => {
        evento.preventDefault(); // se previene el comportamiento por defecto del formulario
        let valueInput = $("#heroInput").val();
        
            //ejecutar metodo ajax de jQuery
        $.ajax({
            url:`https://www.superheroapi.com/api.php/10225881889890871/${valueInput}`,
            success:function(data){ //atributo que recibe como parametro la data que corresponde a la api
                let nombre= data.name;
                let conexiones= data.connections['group-affiliation'];
                let publicado=data.biography.publisher;
                let ocupacion= data.work.occupation;
                let imagen= data.image.url;
                let primeraAparicion = data.biography['first-appearance'];
                let altura=parseInt(data.appearance.height[1])/100;
                let peso=data.appearance.weight[1];
                let alianzas=data.biography.aliases;


                $("#infoHero").html(`<div class="card my-3 mx-auto" style="max-width: 720px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${imagen}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${nombre}</h5>
                      <p class="card-text">Conexiones: ${conexiones}</p><br>
                      <p class="card-text"><i>Publicado por: </i> ${publicado}</p>
                      <hr>
                      <p class="card-text"><i>Ocupación: </i> ${ocupacion}</p>
                      <hr>
                      <p class="card-text"><i>Primera Aparicion: </i> ${primeraAparicion}</p>
                      <hr>
                      <p class="card-text"><i>Altura: </i>${altura}</p>
                      <hr>
                      <p class="card-text"><i>Peso: </i>${peso}</p>
                      <hr>
                      <p class="card-text"><i>Alianzas: </i>${alianzas}</p>
                      
                    </div>
                  </div>
                </div>
              </div>`);

                /* canvasJs*/
                //preparando datapiont
                var dataPointsTrabajados=[];
                for (const key in data.powerstats) {
                    dataPointsTrabajados.push({label:key, y: parseInt(data.powerstats[key])});
                }
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de poder para ${nombre}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 240,
                        yValueFormatString: "##0",
                        indexLabel: "{label} {y}",
                        //datapoints es un arreglo de objetos que contempla los valores de cada columna 
                        dataPoints:dataPointsTrabajados
                        /*  [
                           {y: 79.45, label: "Google"},
                            {y: 7.31, label: "Bing"},
                            {y: 7.06, label: "Baidu"},
                            {y: 4.91, label: "Yahoo"},
                            {y: 1.26, label: "Others"}
                        ]*/
                    }]
                });
                chart.render();
                /* fin canvasJs */

               


            },
            error:(error) => {
                alert( "Error al consultar los datos" );
            }
        });
    });
});




