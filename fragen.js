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
        // Setzt alle Buttons auf transparente Farbe und entfernt alte Event-Listener
        document.querySelectorAll(".classAntworten").forEach(button => {
            button.style.backgroundColor = "transparent";
            button.removeEventListener("click", tippeButton); // Entfernt alte Event-Listener
        });

        gesperrt = false;
        const aktuelleFrage = arrayFragen.shift();
        const arrayFragenAufbereitet = aktuelleFrage.split("#");

        richtigeAntwort = arrayFragenAufbereitet[4];

        document.getElementById("idFrage").innerText = arrayFragenAufbereitet[0];
        document.getElementById("idAntwort1").innerText = arrayFragenAufbereitet[1];
        document.getElementById("idAntwort2").innerText = arrayFragenAufbereitet[2];
        document.getElementById("idAntwort3").innerText = arrayFragenAufbereitet[3];

        // Event-Listener für die Buttons setzen
        document.querySelectorAll(".classAntworten").forEach(button => {
            button.addEventListener("click", tippeButton);
        });

        setTimeout(() => {
            if (!gesperrt) {
                // Entfernen der Event-Listener, wenn keine Antwort gewählt wurde
                document.querySelectorAll(".classAntworten").forEach(button => {
                    button.removeEventListener("click", tippeButton);
                });
                starteRunden(); // Gehe zur nächsten Runde
            }
        }, 6000); // 6 Sekunden für jede Runde

        rundenZaehler++;
    } else {
        document.getElementById("idFrage").innerText = `Das Spiel ist beendet. Du hast ${punkte} Punkte erreicht!`;
        document.getElementById("idStarte").style.display = "block"; // Zeige den Start-Button wieder an
    }
}

function tippeButton(event) {
    if (gesperrt) {
        return;
    }
    gesperrt = true;
    const getippterButton = event.target;

    // Farbe des angeklickten Buttons ändern
    if (getippterButton.innerText === richtigeAntwort) {
        getippterButton.style.backgroundColor = "lightgreen"; // Richtige Antwort grün
        punkte++;
    } else {
        getippterButton.style.backgroundColor = "lightcoral"; // Falsche Antwort rot
    }

    // Verzögerung, um das Ergebnis zu zeigen und dann zur nächsten Runde überzugehen
    setTimeout(starteRunden, 2000);
}
