var punkte;
var anzahlRunden;
var rundenZaehler;
const arrayFragen = [];
var richtigeAntwort;
var gesperrt;

function starteQuiz() {
    punkte = 0;
    anzahlRunden = 10;
    rundenZaehler = 0;
    
    
    mischeFragen();
    
    
    document.getElementById("idStarte").style.display = "none";

    
    starteRunden();
}

function mischeFragen() {
    
    arrayFragen[0] = "Wo wurde George Sand geboren?# Paris# London# Potsdam# Paris";
    arrayFragen[1] = "Womit schmecken Hummer?# Fühler# Scheren# Füße# Fühler";
    arrayFragen[2] = "Welches Spurenelement verhindert die Zinkaufnahme?# Eisen# Vitamin C# Natrium# Eisen";
    arrayFragen[3] = "Wie nennt man die Angst vor langen Wörtern?# Largophobie# Sesquiphobie# Verbophobie# Sesquiphobie";
    arrayFragen[4] = "Welches Wort ist ein Oxymoron?# Fußleiste# Handschuh# Kopfschmerz# Handschuh";
    arrayFragen[5] = "Welche Frucht galt im 18. Jh. als Statussymbol?# Kirsche# Kumquat# Ananas# Ananas";
    arrayFragen[6] = "Wie viel wiegt ein Cumulus (Schönwetterwolke)?# 100 kg# 100.000 kg# 1.000.000 kg# 1.000.000 kg";
    arrayFragen[7] = "In welchem Land wurde 1647 Weihnachten verboten?# GB# Guatemala# Guyana# GB";
    arrayFragen[8] = "Wie lange kann ein Mensch urinieren?# 2 Minuten# 8,5 Minuten# 1,5 Minuten# 8,5 Minuten";
    arrayFragen[9] = "Wen haben die Hasen in Waterloo angegriffen?# Fürst Wellington# Bonaparte# G.L. von Blücher# Bonaparte";
    
    
    arrayFragen.sort(() => Math.random() - 0.5);
}

function starteRunden() {
    if (rundenZaehler < anzahlRunden) {
        
        document.getElementById("idAntwort1").style.background = "initial";
        document.getElementById("idAntwort2").style.background = "initial";
        document.getElementById("idAntwort3").style.background = "initial";

        gesperrt = false;
        var aktuelleFrage = arrayFragen.shift();
        const arrayFragenAufbereitet = aktuelleFrage.split("#");

        richtigeAntwort = arrayFragenAufbereitet[4]; // Die letzte Antwort ist korrekt

        document.getElementById("idFrage").innerHTML = arrayFragenAufbereitet[0];
        document.getElementById("idAntwort1").innerHTML = arrayFragenAufbereitet[1];
        document.getElementById("idAntwort2").innerHTML = arrayFragenAufbereitet[2];
        document.getElementById("idAntwort3").innerHTML = arrayFragenAufbereitet[3];

        setTimeout(starteRunden, 6000);
        rundenZaehler++;
    } else {
        document.getElementById("idFrage").innerHTML = "Das Spiel ist beendet. Du hast " + punkte + " Punkte erreicht!";
    }
}

function tippeButton(getippterButton) {
    if (gesperrt) {
        return;
    }
    gesperrt = true;
    if (getippterButton.innerHTML === richtigeAntwort) {
        punkte++;
        getippterButton.style.background = "lightgreen";
    } else {
        getippterButton.style.background = "lightcoral";
    }
}

