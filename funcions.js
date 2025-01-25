let puntuacio = [0, 0];
let faltes = [0, 0];
let id_punts_equip = ["points-a", "points-b"];
let id_faltes_equip = ["fouls-a", "fouls-b"];
let mode_restar = false;
let partit_finalitzat = false;
let periode = 1;

function reiniciar_faltes(){
    for(let i = 0; i<2; i++){
        faltes[i]=0;
        document.getElementById(id_faltes_equip[i]).innerHTML = faltes[i];
    }
}

function iniciar_partida(){
    for(let i = 0; i<2; i++){
        puntuacio[i]=0;
        document.getElementById(id_punts_equip[i]).innerHTML = puntuacio[i];
        document.getElementById("historial").innerHTML = "<p> Inici del partit </p>";
    }
    reiniciar_faltes();
    if(mode_restar){
        alternar_mode();
    }
    periode = 1
    document.getElementById("period").innerHTML = periode;
    partit_finalitzat = false;
}

function alternar_mode(){
    id_botons_puntuacio_faltes = [
        "canviar_puntuacio_local_1", "canviar_puntuacio_local_2", "canviar_puntuacio_local_3", "canviar_faltes_local",
        "canviar_puntuacio_visitant_1", "canviar_puntuacio_visitant_2", "canviar_puntuacio_visitant_3", "canviar_faltes_visitant"
    ]
    let texte_botons_puntuacio_faltes = ["+1", "+2", "+3", "Falta"];
    let color_botons_puntuacio_faltes = ["green", "green", "green", "red"];

    if (mode_restar){
        mode_restar = false;
    }
    else{
        mode_restar = true;
        //Passar botons a negatiu
        texte_botons_puntuacio_faltes = ["-1", "-2", "-3", "Llevar falta"];
        color_botons_puntuacio_faltes = ["red", "red", "red", "green"];
    }
    for(let i = 0; i < id_botons_puntuacio_faltes.length; i++){
        let index = i % texte_botons_puntuacio_faltes.length; //La llista es llegeig dues vegades per aplicar-se als dos equips
        document.getElementById(id_botons_puntuacio_faltes[i]).innerHTML = texte_botons_puntuacio_faltes[index];
        document.getElementById(id_botons_puntuacio_faltes[i]).style.background = color_botons_puntuacio_faltes[index];
    }
}

function numero_equip(nom){
    if(nom == "local"){
        return 0;
    }
    else if(nom == "visitant"){
        return 1;
    }
    else{
        alert("ERROR: No s'ha trobat l'equip");
    }
}

function canviar_puntuacio(n, equip){
    let num_equip = numero_equip(equip);
    if(mode_restar){
        if(puntuacio[num_equip] < n){
            alert("ERROR: La puntuació no pot ser negativa");
            n = 0;
        }
        else{
            n = -n;
        }
    }
    puntuacio[num_equip] += n;
    document.getElementById(id_punts_equip[num_equip]).innerHTML = puntuacio[num_equip];
    document.getElementById("historial").innerHTML += "<p>" + puntuacio[0] + "-" + puntuacio[1] + "</p>"
}

function canviar_faltes(n, equip){
    let num_equip = numero_equip(equip);
    if(mode_restar){
        if(faltes[num_equip] < n){
            alert("ERROR: Les faltes no poden ser negatives");
            n = 0;
        }
        else{
            n = -n;
        }
    }
    faltes[num_equip] += n;
    document.getElementById(id_faltes_equip[num_equip]).innerHTML = faltes[num_equip];
    document.getElementById("historial").innerHTML += "<p> Falta " + equip + " " + faltes[num_equip] + "</p>";
}

function canviar_periode(){
    if(periode < 4){
        periode ++;
        document.getElementById("period").innerHTML = periode;
        reiniciar_faltes();
        document.getElementById("historial").innerHTML += "<p>" + "Inici del periode " + periode + "</p>";
        reiniciar_contador(); //Reiniciar el contador automaticament al canviar de periode
    }
    else{
        if(puntuacio[0] == puntuacio[1]){
            document.getElementById("period").innerHTML = "PE";
            reiniciar_faltes();
            document.getElementById("historial").innerHTML += "<p>" + "Inici del periode extra" + "</p>";
            reiniciar_contador(); //Reiniciar el contador automaticament al canviar de periode
        }
        else if(!partit_finalitzat){
            document.getElementById("period").innerHTML = "FI DEL PARTIT";
            document.getElementById("historial").innerHTML += "<p>" + "Fi del partit" + "</p>";
            if(puntuacio[0] > puntuacio[1]){
                document.getElementById("historial").innerHTML += "<p>" + "Victòria de local" + "</p>";
            }
            else if(puntuacio[0] < puntuacio[1]){
                document.getElementById("historial").innerHTML += "<p>" + "Victòria de visitant" + "</p>";
            }
            partit_finalitzat = true;
        }
        else{
            alert("ERROR: No es pot canviar de periode, el partit ja ha acabat");
        }
    }
}