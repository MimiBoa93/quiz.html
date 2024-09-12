let punkte;
const anzahlRunden = 10;
let rundenZaehler;
const arrayFragen = [];
let richtigeAntwort;
let gesperrt;

document.getElementById("idStarte").addEventListener("click", starteQuiz);

function starteQuiz() {
    punkte = 0;
    rundenZaehler = 0;
    
    mischeFragen();
    
    document.getElementById("idStarte").style.display = "none";
    
    starteRunden();
}

function mischeFragen() {
    arrayFragen.push(
        "Wo wurde George Sand geboren?# Paris# London# Potsdam# Paris",
        "Womit schmecken Hummer?# Fühler# Scheren# Füße# Fühler",
        "Welches Spurenelement verhindert die Zinkaufnahme?# Eisen# Vitamin C# Natrium# Eisen",
        "Wie nennt man die Angst vor langen Wörtern?# Largophobie# Sesquiphobie# Verbophobie# Sesquiphobie",
        "Welches Wort ist ein Oxymoron?# Fußleiste# Handschuh# Kopfschmerz# Handschuh",
        "Welche Frucht galt im 18. Jh. als Statussymbol?# Kirsche# Kumquat# Ananas# Ananas",
        "Wie viel wiegt ein Cumulus (Schönwetterwolke)?# 100 kg# 100.000 kg# 1.000.000 kg# 1.000.000 kg",
        "In welchem Land wurde 1647 Weihnachten verboten?# GB# Guatemala# Guyana# GB",
        "Wie lange kann ein Mensch urinieren?# 2 Minuten# 8,5 Minuten# 1,5 Minuten# 8,5 Minuten",
        "Wen haben die Hasen in Waterloo angegriffen?# Fürst Wellington# Bonaparte# G.L. von Blücher# Bonaparte"
    );
    arrayFragen.sort(() => Math.random() - 0.5);
}

function starteRunden() {
    if (rundenZaehler < anzahlRunden) {
        // Setzt alle Buttons auf die Hintergrundfarbe grün
        document.querySelectorAll(".classAntworten").forEach(button => {
            button.style.backgroundColor = "lightgreen";
        });

        gesperrt = false;
        const aktuelleFrage = arrayFragen.shift();
        const arrayFragenAufbereitet = aktuelleFrage.split("#");

        richtigeAntwort = arrayFragenAufbereitet[4];

        document.getElementById("idFrage").innerText = arrayFragenAufbereitet[0];
        document.getElementById("idAntwort1").innerText = arrayFragenAufbereitet[1];
        document.getElementById("idAntwort2").innerText = arrayFragenAufbereitet[2];
        document.getElementById("idAntwort3").innerText = arrayFragenAufbereitet[3];

        // Warte auf die Antwort des Benutzers
        document.querySelectorAll(".classAntworten").forEach(button => {
            button.addEventListener("click", tippeButton);
        });

        // Stoppt das Quiz nach 6 Sekunden, wenn keine Antwort gewählt wurde
        setTimeout(() => {
            document.querySelectorAll(".classAntworten").forEach(button => {
                button.removeEventListener("click", tippeButton);
            });
            if (!gesperrt) {
                // Wenn keine Antwort gewählt wurde, wird das Quiz automatisch fortgesetzt
                starteRunden();
            }
        }, 6000);

        rundenZaehler++;
    } else {
        document.getElementById("idFrage").innerText = `Das Spiel ist beendet. Du hast ${punkte} Punkte erreicht!`;
    }
}

function tippeButton(event) {
    if (gesperrt) {
        return;
    }
    gesperrt = true;
    const getippterButton = event.target;
    const buttons = document.querySelectorAll(".classAntworten");
    
    buttons.forEach(button => {
        button.style.backgroundColor = button.innerText === richtigeAntwort ? "lightgreen" : "lightcoral";
    });

    if (getippterButton.innerText === richtigeAntwort) {
        punkte++;
    }
    
    // Stoppt das Quiz für eine kurze Zeit, um die Antwort zu zeigen
    setTimeout(starteRunden, 2000);
}
