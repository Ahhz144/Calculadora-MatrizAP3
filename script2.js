

// Programa Javascript para calcular soluções de lineares
// equações usando a regra de Cramer
 
// Esta função encontra o determinante de Matrix
const console1=document.getElementById("console")
const itensDaMatriz=document.querySelectorAll(".itens").value
console.log(itensDaMatriz)

var row1 = document.getElementsByClassName("m1r1");
var row2 = document.getElementsByClassName("m1r2");
var row3 = document.getElementsByClassName("m1r3");
var row3 = document.getElementsByClassName("m1r4");
let matrixA;

function rebuildMatrix(){
    for (var i=0; i<3; i++) {
        matrixA[0][i] = row1[i].value;
        matrixA[1][i] = row2[i].value;
        matrixA[2][i] = row3[i].value;
        matrixA[3][i] = row4[i].value;
        determinantOfMatrix(matrixA)
    }

 }

function determinantOfMatrix(matrixA)
{
    let ans;
    ans = matrixA[0][i] * (matrixA[1][i] * matrixA[2][i] - matrixA[2][i] * matrixA[1][i])
        - matrixA[0][i] * (matrixA[1][i] * matrixA[2][i] - matrixA[1][i] * matrixA[2][i])
        + matrixA[0][i] * (matrixA[1][i] * matrixA[2][i] - matrixA[1][i] * matrixA[2][i]);
    return ans;
}
 
// Esta função encontra a solução do sistema de
// equações lineares usando a regra de Cramer
function findSolution(matrixA)
{
// Matriz D usando coef como dado na regra de Cramer
    let d = [[matrixA[0][0], matrixA[0][1], matrixA[0][2]],
             [matrixA[1][0], matrixA[1][1], matrixA[1][2]],
             [matrixA[2][0], matrixA[2][1], matrixA[2][2]]];
     
    //Matriz d1 usando coef como dado na regra de Cramer
    let d1 = [[matrixA[0][3], matrixA[0][1], matrixA[0][2]],
              [matrixA[1][3], matrixA[1][1], matrixA[1][2]],
              [matrixA[2][3], matrixA[2][1], matrixA[2][2]]];
           
    // Matriz d2 usando coef como dado na regra de Cramer    
    let d2 = [[matrixA[0][0], matrixA[0][3], matrixA[0][2]],
              [matrixA[1][0], matrixA[1][3], matrixA[1][2]],
              [matrixA[2][0], matrixA[2][3], matrixA[2][2]]];
     
    // Matriz d3 usando coef como dado na regra de Cramer
    let d3 = [[matrixA[0][0], matrixA[0][1], matrixA[0][3]],
              [matrixA[1][0], matrixA[1][1], matrixA[1][3]],
              [matrixA[2][0], matrixA[2][1], matrixA[2][3]]];
     
    // Cálculo do Determinante das Matrizes d, d1, d2, d3
    let D = determinantOfMatrix(d);
    let D1 = determinantOfMatrix(d1);
    let D2 = determinantOfMatrix(d2);
    let D3 = determinantOfMatrix(d3);
     
    console1.innerHTML += `<p>D é :   ${D.toFixed(6)}</p>`
    console1.innerHTML += `<p>D1 é :  ${D1.toFixed(6)}</p>`
    console1.innerHTML += `<p>D2 é :  ${D2.toFixed(6)}</p>`
    console1.innerHTML += `<p>D3 é :  ${D3.toFixed(6)}</p>`

     
    // Case 1
    if (D != 0)
    {
        // matrixA tem uma solução única. Aplicar a regra de Cramer
        let x = D1 / D;
        let y = D2 / D;
        let z = D3 / D; // calculando z usando a regra de Cramer

        console1.innerHTML += `<p>O valor de x é ${x.toFixed(6)}</p>`
        console1.innerHTML += `<p>O valor de y é ${y.toFixed(6)}</p>`
        console1.innerHTML += `<p>O valor de z é ${z.toFixed(6)}</p>`
    }
      
    // Caso 2
    else
    {
        if (D1 == 0 && D2 == 0 && D3 == 0)
        console1.innerHTML += `<p>Soluções infinitas</p>`
        else if (D1 != 0 || D2 != 0 || D3 != 0)
        console1.innerHTML += `<p>Sem soluções</p>`
    }
}
 
//Código do motorista
let matrixB = [[2, -1, 3, 9],
             [1, 1, 1, 6],
             [1, -1, 1, 2]]
  
findSolution(matrixA);
     
     
    //Este código é uma contribuição de avanitrachhadiya2155