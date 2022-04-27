/*

    Nume: Maces Andrei
    Specializare: Informatica Anul 1
    Grupa 3
    Disciplina: Logica Matematica si Computationala
    Profesor: Rusu Andrei
    Laborator: 03 - 04

    Obiective:
        Construirea formelor normale pentru formulele calculului propozitional clasic
        Elaborarea și implementarea programului pentru calculul formelor normale.

    Condiții de rezolvare și predare a lucrării:
    1.Dacă formula este o tautologie, atunci se va considera conjuncția ei cu formula ((A -> B) v (B ~ C) v (C -> D)). 
      Dacă formula este o contradicție, atunci se va considera disjuncția ei cu formula ((A -> B) v (B ~ C) v (C -> D)).
    2.Dacă formula conține mai puțin de 4 variabile distincte, atunci se va considera conjuncția sau disjuncția ei cu formula 
      ((A -> B) v (B ~ C) v (C -> D)), dar ținânduse cont de faptul că formula rezultată nu trebuie să fie nici tautologie, nici constradicție. 

    Formula care mi-a fost atribuita este formula 7: ((B -> A) & (B -> (A -> C)) ~ (B -> C)) 

    unde:
    -> : implicatie   // In limbajul de programare Javascript implicatia poate fi reprezentata astfel: !A || B
    &  : conjunctie   // In limbajul de programare Javascript conjunctia poate fi reprezentata astfel: A && B
    v  : disjunctie  // In limbajul de programare Javascript disjunctia poate fi reprezentata astfel: A || B
    !  : negatie     // In limbajul de programare Javascript negatia poate fi reprezentata astfel: !A
    ~  : echivalenta // In limbajul de programare Javascript echivalenta poate fi reprezentata astfel: A == B
    ---

    Mai jos avem tabelul formulei noastre din care reiese ca aceasta nu este nici tautologie nici contradictie, motiv pentru care
    indeplineste conditia 1.

    A  B  C | F
    --------------
    0  0  0 | 1
    0  0  1 | 1
    0  1  0 | 1
    0  1  1 | 0
    1  0  0 | 1
    1  0  1 | 1
    1  1  0 | 1
    1  1  1 | 1

    Formula mea are 3 variabile deci fac conjunctia ei cu formula ((A -> B) v (B ~ C) v (C -> D)) si obtin formula 
    (((B -> A) & (B -> (A -> C)) ~ (B -> C)) & ((A -> B) v (B ~ C) v (C -> D)))
    Tabelul noii formule este:
    
    A B C D | F
    -----------
    0 0 0 0 | 1
    0 0 0 1 | 1
    0 0 1 0 | 1
    0 0 1 1 | 1
    0 1 0 0 | 0
    0 1 0 1 | 0
    0 1 1 0 | 0
    0 1 1 1 | 0
    1 0 0 0 | 1
    1 0 0 1 | 1
    1 0 1 0 | 0
    1 0 1 1 | 1
    1 1 0 0 | 1
    1 1 0 1 | 1
    1 1 1 0 | 1
    1 1 1 1 | 1

    Sarcinile lucrării:
    Să se consruiască tabelul de adevăr al formulei (1p). 
    Să se construiască forma normală conjunctivă perfectă (2p) şi forma normală disjunctivă perfectă pentru formulă (2p). 
    Elaborarea programelor respective. (restul punctelor -:) )

*/

//Lista de functii

function implicatie(a, b) {
    if (a == 1 && b == 0) return 1;
    return 0;
}

function eval(A, B, C, D) {
    //Se evalueaza functia: ( ( (B -> A) & (B -> (A -> C)) ~ (B -> C) ) & ( (A -> B) v (B ~ C) v (C -> D) ) )
    return (((!B || A) && (!B || (!A || C)) == (!B || C)) && ((!A || B) || (B == C) || (!C || D)))
}

function tabel() {
    n = 0;
    console.log("A B C D | F");
    console.log("-----------");
    for (A of [0, 1])
        for (B of [0, 1])
            for (C of [0, 1])
                for (D of [0, 1]) {
                    m[n][0] = A;
                    m[n][1] = B;
                    m[n][2] = C;
                    m[n][3] = D;
                    m[n][4] = eval(A, B, C, D) ? 1 : 0;
                    n++;
                }
}

function afisare() {
    console.log("A B C D | F");
    console.log("-----------");
    for (let i = 0; i < 16; i++)
        console.log(m[i][0], m[i][1], m[i][2], m[i][3], '|', m[i][4]);
}

let caracter = (a, l) => (a ? l : "!" + l)


function FNDP() {
    console.log("========================");
    console.log("Forma Normală Disjunctivă Perfectă (FNDP) este:");
    for (let i = 0; i < 16; i++)
        if (m[i][4] == 0) {
            let linie = "";
            linie += '(';
            linie += caracter(m[i][0], 'A ');
            linie += '& ';
            linie += caracter(m[i][1], 'B ');
            linie += '& ';
            linie += caracter(m[i][2], 'C ');
            linie += '& ';
            linie += caracter(m[i][3], 'D ');
            linie += ') v\n';
            console.log(linie);
        }

}


function FNCP() {
    console.log("========================");
    console.log("Forma Normală Conjunctivă Perfectă (FNCP) este:");
    for (let i = 0; i < 16; i++)
        if (m[i][4] == 1) {
            let linie = "";
            linie += '(';
            linie += caracter(!m[i][0], 'A ');
            linie += 'v ';
            linie += caracter(!m[i][1], 'B ');
            linie += 'v ';
            linie += caracter(!m[i][2], 'C ');
            linie += 'v ';
            linie += caracter(!m[i][3], 'D ');
            linie += ') &\n';
            console.log(linie);
        }

}

//Lista de variabile globale
let m = [], n;

function main() {
    for (let i = 0; i < 16; i++)
        m[i] = [];
    tabel();
    afisare();
    FNDP();
    FNCP();
}

main()
