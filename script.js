class MatrixCalculator {
	constructor() {
		this.matrixA = [];
		this.matrixB = [];
		for(var i=0; i<3; i++) {
			this.matrixA[i] = [];
			this.matrixB[i] = [];
		}
		
		this.AxDimension = 3;
		this.AyDimension = 3;
		this.BxDimension = 3;
		this.ByDimension = 3;
	}
	calculateDimensions() {
		//Calculando as dimensões da matriz A
		this.AxDimension = 3;
		this.AyDimension = 3;
		
		var count = 2;
		//Se houver uma coluna inteira de 0s, diminuiremos a dimensão e veremos a próxima.
		while (count>=0 && this.matrixA[0][count]==0 && this.matrixA[1][count]==0 && this.matrixA[2][count]==0) {
			this.AxDimension--;
			count--;
		}
		count = 2;
		//Se houver uma linha inteira de 0's, diminuiremos a dimensão e observaremos a próxima.
		while (count>=0 && this.matrixA[count][0]==0 && this.matrixA[count][1]==0 && this.matrixA[count][2]==0) {
			this.AyDimension--;
			count--;
		}
		
		//Calculando as dimensões da matriz B da mesma maneira.
		this.BxDimension = 3;
		this.ByDimension = 3;
		
		var count = 2;
		//Se houver uma coluna inteira de 0s, diminuiremos a dimensão e veremos a próxima.
		while (count>=0 && this.matrixB[0][count]==0 && this.matrixB[1][count]==0 && this.matrixB[2][count]==0) {
			this.BxDimension--;
			count--;
		}
		count = 2;
		//Se houver uma linha inteira de 0's, diminuiremos a dimensão e observaremos a próxima.
		while (count>=0 && this.matrixB[count][0]==0 && this.matrixB[count][1]==0 && this.matrixB[count][2]==0) {
			this.ByDimension--;
			count--;
		}		
	}

    rebuildMatrix() {
		var row1 = document.getElementsByClassName("m1r1");
		var row2 = document.getElementsByClassName("m1r2");
		var row3 = document.getElementsByClassName("m1r3");
		for (var i=0; i<3; i++) {
			this.matrixA[0][i] = row1[i].value;
			this.matrixA[1][i] = row2[i].value;
			this.matrixA[2][i] = row3[i].value;
		}
		row1 = document.getElementsByClassName("m2r1");
		row2 = document.getElementsByClassName("m2r2");
		row3 = document.getElementsByClassName("m2r3");
		for (var i=0; i<3; i++) {
			this.matrixB[0][i] = row1[i].value;
			this.matrixB[1][i] = row2[i].value;
			this.matrixB[2][i] = row3[i].value;
		}
		this.calculateDimensions();
	}
	
    calDeterminantA() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.determinantA=null;
			this.printOnConsole("Matriz não quadrada, determinante não pode ser calculado.");
			return;
		}
		var determinant;
		if (this.AxDimension==1) {
			determinant = this.matrixA[0][0];
		}
		if (this.AxDimension==2) {
			determinant = (this.matrixA[0][0]*this.matrixA[1][1])-(this.matrixA[0][1]*this.matrixA[1][0]);
		}
		if (this.AxDimension==3) {
			//Calcular determinante de uma matriz 3*3
			//      |a b c|
			// |A|= |d e f|  = ( a*e*i + b*f*g + c*d*h - a*f*h -b*f*g - c*e*g)
			//      |g h i|

			var op1, op2, op3, r1, r2, r3;
			op1 = this.matrixA[0][0]*this.matrixA[1][1]*this.matrixA[2][2];
			op2 = this.matrixA[0][1]*this.matrixA[1][2]*this.matrixA[2][0];
			op3 = this.matrixA[0][2]*this.matrixA[1][0]*this.matrixA[2][1];
			r1 = this.matrixA[0][2]*this.matrixA[1][1]*this.matrixA[2][0];
			r2 = this.matrixA[0][0]*this.matrixA[1][2]*this.matrixA[2][1];
			r3 = this.matrixA[0][1]*this.matrixA[1][0]*this.matrixA[2][2];
			determinant = Math.round((op1+op2+op3-r1-r2-r3)*100)/100;
		}
		this.determinantA = determinant;
		//adicionando determinante de A no armazenamento local
		let det;
		if(localStorage.getItem('Determinante (A)')===null){
			det=[];
		}else{
			det=JSON.parse(localStorage.getItem('Determinante (A)'));
		}
		det.push(determinant);
		localStorage.setItem('Determinante (A)',JSON.stringify(det));

		this.printOnConsole("O determinante da matriz A é: "+determinant)
		return;
	}

    transposeMatrixA() {
		this.rebuildMatrix();
		var string = "Resultado de transposição da matriz A:\r";
		for (var i =0; i<this.AxDimension; i++) {
			for (var j=0; j<this.AyDimension; j++) {
				string=string+"\t"+this.matrixA[j][i];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	calRankA() {
		this.rebuildMatrix();
		
		var rank = this.AxDimension;
		var row = this.AyDimension;
		var mat = this.matrixA;
		
		for (row = 0; row < rank; row++) { 
			if (mat[row][row]) { 
			   for (var col = 0; col < this.AyDimension; col++) { 
				   if (col != row) { 
					 var mult = Math.round(mat[col][row] / mat[row][row]*100)/100; 
					 for (var i = 0; i < rank; i++) 
					   mat[col][i] -= mult * mat[row][i]; 
				  } 
			   } 
			} 
			else
			{ 
				var reduce = true; 
				for (var i = row + 1; i < this.AyDimension;  i++) 
				{ 
					if (mat[i][row]) 
					{ 
						var aux = mat[row];
						mat[row] = math[i];
						math[i] = aux;
						reduce = false; 
						break; 
					} 
				} 
				if (reduce) 
				{ 
					rank--; 
					for (i = 0; i < this.AyDimension; i++) 
						mat[i][row] = mat[i][rank]; 
				} 
				row--; 
			} 
		} 
		let rankA;
		if(localStorage.getItem('Ordem (A)')===null){
			rankA=[];
		}else{
			rankA=JSON.parse(localStorage.getItem('Ordem (A)'));
		}
		rankA.push(rank);
		localStorage.setItem('Ordem (A)',JSON.stringify(rankA));
		this.printOnConsole("A ordem da matriz A é: "+rank); 		
	}

	clear(){
       this.printOnConsole(document.getElementById('console').value = 'Resultado:');

	}
    addMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.printOnConsole("As matrizes têm dimensões diferentes.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				//A análise é necessária aqui, pois o operador de adição também pode concatenar strings
				result[i][j]=Math.round((parseFloat(this.matrixA[i][j])+parseFloat(this.matrixB[i][j]))*100)/100;
			}
		}
		var string = "Resultado da adição:\r";
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
    
	subtractMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.AyDimension) {
			this.printOnConsole("As matrizes têm dimensões diferentes.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				result[i][j]=Math.round((parseFloat(this.matrixA[i][j])-parseFloat(this.matrixB[i][j]))*100)/100;
			}
		}
		var string = "Resultado da subtração:\r";
		for (i =0; i<this.AyDimension; i++) {
			for (var j=0; j<this.AxDimension; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	multiplyMatrix() {
		this.rebuildMatrix();
		if (this.AxDimension!=this.ByDimension) {
			this.printOnConsole("O número de colunas em A é diferente do número de linhas em B.");
			return;
		}
		var result = [];
		for(var i=0; i<3; i++) 
			result[i]=[];
		i=0;
		var j=0;
		//x refere-se a colunas, y refere-se a linhas
		var rowsRes = this.AyDimension;
		var columnsRes = this.BxDimension;
		
		for (i=0; i<rowsRes; i++) {
			for (j=0; j<columnsRes; j++) {
				result[i][j] = this.matrixA[i][0]*this.matrixB[0][j]+this.matrixA[i][1]*this.matrixB[1][j]+this.matrixA[i][2]*this.matrixB[2][j];
				result[i][j] = Math.round(result[i][j]*100)/100;
			}
		}
		var string = "Resultado da multiplicação:\r";
		for (i=0; i<rowsRes; i++) {
			for (j=0; j<columnsRes; j++) {
				string=string+"\t"+result[i][j];
			}
			string=string+"\r";
		}
	// 	let old=[
	// 		[result[0][0] ,result[0][1],result[0][2]],
	// 	    [result[1][0] ,result[1][1],result[1][2]],
	// 		[result[2][0] ,result[2][1],result[2][2]]  
	
	// ]
	// 	let str;
	// 	if(localStorage.getItem('multiplied_matrix')===null){
	// 		str=[];
	// 	}else{
	// 		str=JSON.parse(localStorage.getItem('multiplied_matrix'));
	// 	}
	// 	str.push(old);
	// 	localStorage.setItem('multiplied_matrix',JSON.stringify(str));
		this.printOnConsole(string);
	}
	calDeterminantB() {
		this.rebuildMatrix();
		if (this.BxDimension!=this.ByDimension) {
			this.determinantB=null;
			this.printOnConsole("Matriz não quadrada, determinante não pode ser calculado.");
			return;
		}
		var determinant;
		if (this.BxDimension==1) {
			determinant = this.matrixB[0][0];
		}
		if (this.BxDimension==2) {
			determinant = (this.matrixB[0][0]*this.matrixB[1][1])-(this.matrixB[0][1]*this.matrixB[1][0]);
		}
		if (this.BxDimension==3) {
			var op1, op2, op3, r1, r2, r3;
			op1 = this.matrixB[0][0]*this.matrixB[1][1]*this.matrixB[2][2];
			op2 = this.matrixB[0][1]*this.matrixB[1][2]*this.matrixB[2][0];
			op3 = this.matrixB[0][2]*this.matrixB[1][0]*this.matrixB[2][1];
			r1 = this.matrixB[0][2]*this.matrixB[1][1]*this.matrixB[2][0];
			r2 = this.matrixB[0][0]*this.matrixB[1][2]*this.matrixB[2][1];
			r3 = this.matrixB[0][1]*this.matrixB[1][0]*this.matrixB[2][2];
			determinant = Math.round((op1+op2+op3-r1-r2-r3)*100)/100;
		}
		this.determinantB = determinant;
		let det;
		if(localStorage.getItem('Determinante (B)')===null){
			det=[];
		}else{
			det=JSON.parse(localStorage.getItem('Determinante (B)'));
		}
		det.push(determinant);
		localStorage.setItem('Determinante (B)',JSON.stringify(det));
		this.printOnConsole("Determinante da matriz B: "+determinant)
		return;
	}

    transposeMatrixB() {
		this.rebuildMatrix();
		var string = "Resultado da transposição da matriz B:\r";
		for (var i =0; i<this.BxDimension; i++) {
			for (var j=0; j<this.ByDimension; j++) {
				string=string+"\t"+this.matrixB[j][i];
			}
			string=string+"\r";
		}
		this.printOnConsole(string);
	}
	
	calRankB() {
		this.rebuildMatrix();
		
		var rank = this.BxDimension;
		var row = this.ByDimension;
		var mat = this.matrixB;
		
		for (row = 0; row < rank; row++) { 
			if (mat[row][row]) { 
			   for (var col = 0; col < this.ByDimension; col++) { 
				   if (col != row) { 
					 var mult = Math.round(mat[col][row] / mat[row][row]*100)/100; 
					 for (var i = 0; i < rank; i++) 
					   mat[col][i] -= mult * mat[row][i]; 
				  } 
			   } 
			} 
			else
			{ 
				var reduce = true; 
				for (var i = row + 1; i < this.ByDimension;  i++) 
				{ 
					if (mat[i][row]) 
					{ 
						var aux = mat[row];
						mat[row] = math[i];
						math[i] = aux;
						reduce = false; 
						break; 
					} 
				} 
				if (reduce) 
				{ 
					rank--; 
					for (i = 0; i < this.ByDimension; i++) 
						mat[i][row] = mat[i][rank]; 
				} 
				row--; 
			} 
		} 
		let rankB;
		if(localStorage.getItem('Ordem ( B )')===null){
			rankB=[];
		}else{
			rankB=JSON.parse(localStorage.getItem('Ordem ( B )'));
		}
		rankB.push(rank);
		localStorage.setItem('Ordem ( B )',JSON.stringify(rankB));
		this.printOnConsole("A Ordem da matriz B: "+rank); 		
	}
    
	printOnConsole(val) {
		document.getElementById("console").value = val;
	}
	
	
	
}

var mc = new MatrixCalculator();