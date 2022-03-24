const yesBtn = document.querySelector("[data-yes]");
const noBtn = document.querySelector("[data-no]");

// const WORD_LIST = ["équipe", "curiosité", "créativité", "développement", "programmation", "autonomie"];
let questionNum = 0;
const questions = [
    "Apprécies-tu les travaux de groupes ?",
    "Es-tu curieux ?",
    "Aimes-tu créer des choses ?",
    "L'informatique est un domaine qui t'intéresse ?",
];

const main = async () => {
    let formationArray = await fetchJson();
    let newFormationArray = null;

    const nextQuestion = (valid) => {
        if (questionNum > questions.length - 1) return;
        if (valid) newFormationArray = matchWord(newFormationArray ? newFormationArray : formationArray);

        questionNum++;
        displayQuestion();
    };

    noBtn.addEventListener("click", () => nextQuestion(true));
    yesBtn.addEventListener("click", () => nextQuestion(false));
};

const displayList = (array) => {
    let list = document.getElementById("formation-list");
    list.innerHTML = "";

    const newArray = array.sort((a, b) => b.score - a.score);

    newArray.forEach((element, index) => {
        if (index > 100) return;
        const li = document.createElement("li");
        li.innerHTML = `<b>${element.score}</b> : ${element.libelle_complet._text}`;

        list.append(li);
    });
};

const fetchJson = async () => {
    const response = await fetch("./out/Onisep_Ideo_Fiches_Formations_14032022.json");
    const json = await response.json();

    return json.formations.formation;
};

const matchWord = (array) => {
    console.log(array.length);

    const newArray = array.map((formation) => {
        let score = formation?.score || 0;

        switch (questionNum) {
            case 0:
                const matchTeam = JSON.stringify(formation).match(/équipe/gm);
                if (matchTeam) score++;
                break;
            case 1:
                const matchCuriosity = JSON.stringify(formation).match(/curiosité|curieux|curieuse/gm);
                if (matchCuriosity) score++;
                break;
            case 2:
                const matchCreativity = JSON.stringify(formation).match(/créativité|créatif|créative/gm);
                if (matchCreativity) score++;
                break;
            case 3:
                const matchDevelopment = JSON.stringify(formation).match(/programmation|codage/gm);
                if (matchDevelopment) score++;
                break;
        }

        return { ...formation, score };
    });

    displayList(newArray);
    return newArray;
};

const displayQuestion = () =>
    (document.getElementById("question").innerText =
        questionNum < questions.length ? questions[questionNum] : "Vous avez fini...");

main();
displayQuestion();
