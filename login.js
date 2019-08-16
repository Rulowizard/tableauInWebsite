console.log("Login");

function click_log(){
    console.log("Entra click_log");
    var col2 = d3.select("#col2").html("")

    var texto = col2.append("h1")
        .text("Ingresa tus credenciales")
        .attr("id","titulo")

    var form = col2.append("div")
        .attr("id","form")

    var div1 = form.append("div")
        .attr("class","row")
        .attr("id","div1")
    var label_user = div1.append("label").attr("for","input_user")
        .text("Email")
        .attr("id","label_user")
    var input_user = div1.append("input").attr("type","text")
        .attr("id","input_user")
        .attr("name","input_user")

    var div2 = form.append("div")
        .attr("class","row")
        .attr("id","div2")
    var label_password = div2.append("label").attr("for","input_pass")
        .text("Contraseña")
        .attr("id","label_pass")
    var input_pass = div2.append("input").attr("type","password")
        .attr("id","input_pass")
        .attr("name","input_pass")

    var div4 = form.append("div")
        .attr("class","row")
        .attr("id","div4")

    var button = div4.append("button")
        .attr("id","submit")
        .text("Ingresar")
        .attr("class","boton")

    var submit = document.getElementById("submit").addEventListener("click", click_submit, false )
}

function click_sign(){
    console.log("Entra click_sign ");

    var col2 = d3.select("#col2").html("")

    var texto = col2.append("h1")
        .text("Registrate")
        .attr("id","titulo")

    var form = col2.append("div")
        .attr("id","form")

    var div1 = form.append("div")
        .attr("class","row")
        .attr("id","div1")
    var label_user = div1.append("label").attr("for","input_user")
        .text("Email")
        .attr("id","label_user")
    var input_user = div1.append("input").attr("type","text")
        .attr("id","input_user")
        .attr("name","input_user")


    var div2 = form.append("div")
        .attr("class","row")
        .attr("id","div2")
    var label_password = div2.append("label").attr("for","input_pass")
        .text("Contraseña")
        .attr("id","label_pass")
    var input_pass = div2.append("input").attr("type","password")
        .attr("id","input_pass")
        .attr("name","input_pass")

    var div3 = form.append("div")
        .attr("class","row")
        .attr("id","div3")
    var label_profile = div3.append("label").attr("for","input_profile")
        .text("Perfil")
        .attr("id","label_profile")
    var input_profile = div3.append("select")
        .attr("id","input_profile")
        .attr("name","input_profile")
        .attr("form","form")

    var option0 = input_profile.append("option")
        .attr("style","display:none")
    
    var option1 = input_profile.append("option")
        .attr("value","Dirección")
        .text("Dirección")
    var option2 = input_profile.append("option")
        .attr("value","Ejecutivo")
        .text("Ejecutivo")

    var div4 = form.append("div")
        .attr("class","row")
        .attr("id","div4")

    var button = div4.append("button")
        .attr("id","submit")
        .text("Registrarse")
        .attr("class","boton")

    var submit = document.getElementById("submit").addEventListener("click", click_submit, false )
}

function email_correcto(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function click_submit(){
    console.log("Entra submit")
    var perfil;
    var usuario = document.getElementById("input_user").value
    var contraseña = document.getElementById("input_pass").value
    var tipo = this.firstChild.nodeValue

    if (email_correcto(usuario) ){
        console.log("Email correcto")

        if( tipo == "Ingresar" ){
            console.log("Enviar info")

            $.get("login_info", {usuario:usuario,pass:contraseña} ,function(data){
                if( data == false ){
                    alert("No existe usuario. Favor de registrarse")
                    click_sign()
                    document.getElementById("input_user").value = usuario
                    document.getElementById("input_pass").value = contraseña
                }else{
                    window.location.href= "/load_tableau"
                }
            });
        
        } else{
            var selected = document.getElementById("input_profile")
            perfil = selected.options[selected.selectedIndex].value

            $.get("sign_up", {usuario:usuario,pass:contraseña,perfil:perfil},function(data){
                if(data == false){
                    alert("Usuario duplicado. Favor de revisar su información.")
                }else{
                    window.location.href= "/load_tableau"
                }

            });


        }



    }else{
        console.log("Email incorrecto")
        alert("Valor incorrecto para el usuario o contraseña. Favor de verificar sus datos.")
    }









}



d3.select("#log").on("click" , click_log  );

d3.select("#sign").on("click" , click_sign );

d3.select("#submit").on("click", click_submit );
