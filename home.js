console.log("Test 2");

var globalperfil="";

function initViz() {
    console.log(globalperfil)


    switch(globalperfil){
        case "Dirección":
            var options={
                hideTabs:true,
                width:"100%",
                height:"100%"
            }
            break;

        case "Ejecutivo":
            var options ={
                hideTabs:true,
                width:"100%",
                height:"100%",
                "Region":"Central US"
            }
            break;

        default:
        var options ={
            hideTabs:true,
            width:"100%",
            height:"100%",
            "Region":"Falso"
        }
    }

    var containerDiv = document.getElementById("vizContainer"),
    url = "https://public.tableau.com/views/Bootcamp-Ejer-1/Sheet5"
    var viz = new tableau.Viz(containerDiv, url,options);
}


function init_grafica(){

    $.get("get_perfil",function(data){
        globalperfil=data;
        initViz();
    });
}


function click_logo(){
    window.location.href= "/"
}


init_grafica();

d3.select("#logo").on("click" , click_logo  );