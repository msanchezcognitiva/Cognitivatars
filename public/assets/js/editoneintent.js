// Se obtiene el JSON enviado desde node.js, para hacer manejo de los intent
MIntents = JSON.parse(document.getElementById('UserIntents').innerHTML);
// Creación del constructor 

function CreateCollapsIntent(){
	Get_Intent_Card();

};

// Se crea el HTML correspondiente al card de respuestas
function Get_Intent_Card(){
	var div = document.createElement("div");
   	div.id ="GeneralIntentCard";
	var divHtml = "<div class='card col-md-12 text-center'><div class='header'><h4 class='title'><strong>Intent ID :</strong>"+MIntents.Intent_ID+"</h4></div><div class='row'><div class='col-md-12'><div class='row'><div class='col-md-10 text-center'><div class='form-group'><label><strong>Pregunta General: </strong></label><input type='text' class='form-control' placeholder='Insertar pregunta general' value='"+MIntents.General_Question+"' id='generalquestion' name='GeneralQuestion' required></div></div></div><div id='Variations'></div><div id='Tags'></div></div></div></div>";
  	document.getElementById("Intents_Collection").appendChild(div).outerHTML = divHtml;
  	// llamada a las funciones de crear tag y variantes
  	Get_Tags();
  	Get_Variations();
};
// Se anida el HTML de los tag al HTML de respuesta
function Get_Tags(){
	var div = document.createElement("div");
   	div.id ="CreateHTMLTags";

	var divHtml = "<div class='row'><div class='col-md-6 text-center'><div class='form-group'><label class='col-md-6 control-label'>Tags</label><div class='col-md-12'><select multiple data-role='tagsinput' id='tags' required></select></div></div></div></div>";
  	document.getElementById("Tags").appendChild(div).outerHTML = divHtml;	

  	// largo de la cadena de tags de un intent específico 
  	Mtagslen = MIntents.Tags.length;
  		// Ingresa los intent al campo
  		for (var i = 0; i <= Mtagslen - 1 ; i++) {
  				var opt = document.createElement("option");
  				opt.id = "tagopt";
  				opt.value= MIntents.Tags[i];
  			  	opt.selected = true;
  			  	document.getElementById("tags").appendChild(opt);
   		}

};
// Se anida la funcionalidad de las variaciones a la sección de respuestas 
function Get_Variations(){
	Mvariationlen = MIntents.Variations.length;
	var div = document.createElement("div");
   	div.id = "createHtmlvariations";
	var divHtml = "<div class='col-md-6 text-center pull-left'><div class='content table-responsive table-full-width'><table class='table table-hover table-striped' id='variations_table'><thead><th>Variantes</th></thead><tbody><tr><td><div class='form-group'><input type='text' class='form-control' placeholder='Insertar variante' value='' id='new_variation'></div></td><td><a class='add' onclick='add_rowVariations();' ><i class='pe-7s-plus'></i></a></td></tr></tbody></table></div></div>";
  	document.getElementById("Variations").appendChild(div).outerHTML = divHtml;
  		// Agrega las filas a la tabla variation 
		for (var i = 0; i <= Mvariationlen - 1 ; i++) {
			 var new_variation=document.getElementById("new_variation").value;
 			 var table=document.getElementById("variations_table");
 			 var table_len=(table.rows.length)-1;
 			 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='variation_row"+table_len+"'>"+MIntents.Variations[i]+"</td><td><a id='edit_button"+table_len+"' class='edit' onclick='edit_rowVariations("+table_len+")'><i class='pe-7s-pen'></i></a> <a id='save_button"+table_len+"' class='save' onclick='save_rowVariations("+table_len+")'><i class='pe-7s-diskette'></i></a> <a class='delete' onclick='delete_rowVariations("+table_len+")'><i class='pe-7s-trash'></i></a></td></tr>";
 			 var outputVariation = table_len;

 			 document.getElementById("save_button"+table_len).style.display="none";
   		}
};

// Editar variantes en Update Intent cuando es apretado el lapiz
function edit_rowVariations(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="inline";
 var variation=document.getElementById("variation_row"+no);
 var variation_data=variation.innerHTML;
 variation.innerHTML="<input type='text' class='form-control' placeholder='Editar' id='variation_text"+no+"' value='"+variation_data+"'>";
}

// Guardar cambios generados en la fila de variantes cuando es apretado el diskette
function save_rowVariations(no)
{
 var variation_val=document.getElementById("variation_text"+no).value;
 document.getElementById("variation_row"+no).innerHTML=variation_val;
 document.getElementById("edit_button"+no).style.display="inline";
 document.getElementById("save_button"+no).style.display="none";
}


// Eliminar un fila de la tabla de variaciones  
function delete_rowVariations(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

//Agregar nueva variante cuando se hace clic en el (+)
function add_rowVariations()
{
 var new_variation=document.getElementById("new_variation").value;
 var table=document.getElementById("variations_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='variation_row"+table_len+"'>"+new_variation+"</td><td><a id='edit_button"+table_len+"' class='edit' onclick='edit_rowVariations("+table_len+")'><i class='pe-7s-pen'></i></a> <a id='save_button"+table_len+"' class='save' onclick='save_rowVariations("+table_len+")'><i class='pe-7s-diskette'></i></a> <a class='delete' onclick='delete_rowVariations("+table_len+")'><i class='pe-7s-trash'></i></a></td></tr>";
 var outputVariation = table_len;
 document.getElementById("new_variation").value="";
 document.getElementById("save_button"+table_len).style.display="none";
}


// Construcción de la tabla de respuestas 
function CreateAnswers(){
	//Largo de la cadena de respuestas 
	Manswerlen = MIntents.Answers.length;
		for (var i = 0; i <= Manswerlen - 1 ; i++) {
 			var table=document.getElementById("Answer_table");
 			var table_len=(table.rows.length)-1;
 			var row = table.insertRow(table_len).outerHTML="<tr id='Ansrow"+table_len+"'><td class='text-center' id='Answer_row_Answer"+table_len+"'>"+MIntents.Answers[i].Answer+"</td><td class='text-center' id='Answer_row_Irony"+table_len+"'>"+MIntents.Answers[i].Irony+"</td><td class='text-center' id='Answer_row_Formal"+table_len+"'>"+MIntents.Answers[i].Formal+"</td><td class='text-center' id='Answer_row_Humor"+table_len+"'>"+MIntents.Answers[i].Humor+"</td><td class='text-center' id='Answer_row_Actions"+table_len+"'><a class='delete' onclick='delete_rowAnswer("+table_len+")'><i class='pe-7s-trash'></i></a><a id='answer_edit_button"+table_len+"' class='edit' onclick='edit_rowAnswer_table("+table_len+")'><i class='pe-7s-pen'></i></a><a id='answer_save_button"+table_len+"' class='save' onclick='save_rowAnswer_table("+table_len+")'><i class='pe-7s-diskette'></i></a><a id='tars_recomend_button"+table_len+"' class='magic'><i class='pe-7s-magic-wand'></i></a></td></tr>";
 			var outputAnswer = table_len;
      document.getElementById("answer_save_button"+table_len).style.display="none";
   		}
}

// Eliminar una fila de respuestas
function delete_rowAnswer(no)
{
 document.getElementById("Ansrow"+no+"").outerHTML="";
}

// Agregar una fila de respuestas 
function add_rowAnswer()
{
 // Obtención del valor al moment de hacer el click
 var new_Answer=document.getElementById("new_Answer").value;
 var new_Irony=document.getElementById("rangeIrony").value;
 var new_Formal=document.getElementById("rangeFormal").value;
 var new_Humor=document.getElementById("rangeHumor").value
 // se crea el row de la tabla con los valores obtenidos
 var table=document.getElementById("Answer_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='Ansrow"+table_len+"'><td class='text-center' id='Answer_row_Answer"+table_len+"'>"+new_Answer+"</td><td class='text-center' id='Answer_row_Irony"+table_len+"'>"+new_Irony+"</td><td class='text-center' id='Answer_row_Formal"+table_len+"'>"+new_Formal+"</td><td class='text-center' id='Answer_row_Humor"+table_len+"'>"+new_Humor+"</td><td class='text-center' id='Answer_row_Actions"+table_len+"'><a class='delete' onclick='delete_rowAnswer("+table_len+")'><i class='pe-7s-trash'></i></a><a id='answer_edit_button"+table_len+"' class='edit' onclick='edit_rowAnswer_table("+table_len+")'><i class='pe-7s-pen'></i></a><a id='answer_save_button"+table_len+"' class='save' onclick='save_rowAnswer_table("+table_len+")'><i class='pe-7s-diskette'></i></a><a id='tars_recomend_button"+table_len+"' class='magic'><i class='pe-7s-magic-wand'></i></a></td></tr>";
 var outputAnswer = table_len;
 // se resetean valores para que el formulario aparezca vacío
 document.getElementById("new_Answer").value="";
 document.getElementById("rangeIrony").value=50;
 document.getElementById("rangeFormal").value=50;
 document.getElementById("rangeHumor").value=50;
 document.getElementById("answer_save_button"+table_len).style.display="none";


}

// Editar una fila de la tabla 
function edit_rowAnswer_table(no)
{
	// Cambia el style para que se haga dinámico la muestra de botones 
    document.getElementById("answer_edit_button"+no).style.display="none";
    document.getElementById("answer_save_button"+no).style.display="inline";
    // Se obtienen los elementos de la respuesta al hacerle click editar 
    var Answer=document.getElementById("Answer_row_Answer"+no);
    var Irony=document.getElementById("Answer_row_Irony"+no);
    var Formal=document.getElementById("Answer_row_Formal"+no);
    var Humor=document.getElementById("Answer_row_Humor"+no);
    // se cambian los campos el interior de los campos <td> creando un elemento input
    var Answer_data=Answer.innerHTML;
    Answer.innerHTML="<input type='text' class='form-control' placeholder='Editar respuesta' id='Answer_text"+no+"' value='"+Answer_data+"'>";
    var Irony_data=Irony.innerHTML;
    Irony.innerHTML="<input type='text' class='form-control' placeholder='Editar ironía' id='Irony_text"+no+"' value='"+Irony_data+"'>";
    var Formal_data=Formal.innerHTML;
    Formal.innerHTML="<input type='text' class='form-control' placeholder='Editar formalidad' id='Formal_text"+no+"' value='"+Formal_data+"'>";
    var Humor_data=Humor.innerHTML;
    Humor.innerHTML="<input type='text' class='form-control' placeholder='Editar Humor' id='Humor_text"+no+"' value='"+Humor_data+"'>";
}

// Cuando se hace click en grabar,se cambia la forma de input obtenida por el boton editar y vuelve al formato string 
function save_rowAnswer_table(no)
{
 var Answer_val=document.getElementById("Answer_text"+no).value;
 document.getElementById("Answer_row_Answer"+no).innerHTML=Answer_val;

 var Irony_val=document.getElementById("Irony_text"+no).value;
 document.getElementById("Answer_row_Irony"+no).innerHTML=Irony_val;

 var Formal_val=document.getElementById("Formal_text"+no).value;
 document.getElementById("Answer_row_Formal"+no).innerHTML=Formal_val;

 var Humor_val=document.getElementById("Humor_text"+no).value;
 document.getElementById("Answer_row_Humor"+no).innerHTML=Humor_val;

 document.getElementById("answer_edit_button"+no).style.display="inline";
 document.getElementById("answer_save_button"+no).style.display="none";
}

// llamada al constructor CRíTICO
CreateCollapsIntent();
CreateAnswers();


// Función para obtener todos los valores en forma de JSON y luego enviarlos a node.js para hacer el insert en mongoDB
function get_all_update(form){
	// Obtención de los largos de las tablas de variantes y respuestas, para luego poder hacer un for y crear el JSON
	var tableV=document.getElementById("variations_table");
 	var table_len_variation=(tableV.rows.length)-1;
 	var outputVariation = table_len_variation;
	var tableA=document.getElementById("Answer_table");
 	var table_len_answers=(tableA.rows.length)-1;
 	var outputanswer = table_len_answers;
 	// Valor del campo pregunta general
	var General_Question = document.getElementById("generalquestion").value;
	// JSON del campo tags
	var tag_values = $('#tags').val();
	// Se obtiene el intent ID de la llamada a mongoDB 
    var uuid = MIntents.Intent_ID;
    // Fecha en segundos de cuándo se creó el intent
    Created_in_seconds = Math.floor(Date.now() / 1000);

	// Excepción para evitar error por falta de selección del campo de tags
  	if (tag_values == null) {
    	alert('Necesitas a lo menos un tag para completar el formulario');
  	}
        
	// Creations of arrays
    var Answer=[];
    var Variation=[];
    var Irony=[];
    var Formal=[];
    var Humor=[];
    var Answers=[[]];
 	// Creation of JSON objects
    VariationJSON = [];
    AnswersJSON = [];
    var intent = {};


    // Obtención de las variantes que estan dentro de la tabla
    for (var i = 1; i <= outputVariation - 1; i++) {
       Variation[i] = document.getElementById("variation_row" + i).innerHTML;

       VariationJSON[i] = Variation[i];
    }
    addRow_variation = document.getElementById("new_variation").value;
    VariationJSON[outputVariation] = addRow_variation;
    //console.log(Variation);
    

    // Obtención de las respuestas que se encuentran en la tabla
    for (var i = 1; i <= outputanswer - 1; i++) {
       Answer[i] = document.getElementById("Answer_row_Answer" + i).innerHTML;
       Irony[i] = document.getElementById("Answer_row_Irony" + i).innerHTML;
       Formal[i] = document.getElementById("Answer_row_Formal" + i).innerHTML;
       Humor[i] = document.getElementById("Answer_row_Humor" + i).innerHTML;
       // Creación del JSON correspondiente a cada fila de la tabla
       AnswersJSON[i] = {"Answer": Answer[i], "Irony": Irony[i], "Formal": Formal[i], "Humor": Humor[i]};
    }
    // Condición de borde, es decir que si la persona dejael campo de ingreso de datos con un valor, este igual es tomado
    Answer[outputanswer] = document.getElementById("new_Answer").value;     
    Irony[outputanswer] = document.getElementById("rangeIrony").value;       
    Formal[outputanswer] = document.getElementById("rangeFormal").value;    
    Humor[outputanswer] = document.getElementById("rangeHumor").value;      

    // Creación del JSON de condición de borde
    AnswersJSON[outputanswer] = {"Answer": Answer[outputanswer], "Irony": Irony[outputanswer], "Formal": Formal[outputanswer], "Humor": Humor[outputanswer]} ;

    // Se realiza un corte al primer valor del vector de respuestas y variantes para evitar el valor nulo, esto pasa porque el for parte del número 1
  	AnswersJSON .splice(0, 1);
  	VariationJSON.splice(0, 1);

  	// Creación del JSON para ser enviado a mongoDB
  	intent = {"Intent_ID": uuid ,"Time_Seconds":Created_in_seconds,"User": pathArray[3], "General_Question": General_Question, "Variations":VariationJSON, "Tags": tag_values, "Answers": AnswersJSON};
  	// tratamiento para enviarlo al mongoDB
  	var intentString = JSON.stringify(intent);
	var output = intentString;

	// Envío de la respuesta mediante un hidden input
  	document.getElementById("output_hidden").value = output;
  	// valores necesarios a ser pasados al node.js para poder mantener las credenciales 
  	document.getElementById("email").value = pathArray[3];
  	document.getElementById("token").value = pathArray[2];
  	document.getElementById("Intent_ID").value = uuid;
}

// Manejo de teclas
//Deactivate enter submit
$('#myForm').on('keyup keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    return false;
  }
});

// add new variation when the user click entert
$('#new_variation').keypress(function(event){
  if(event.keyCode == 13){
    add_rowVariations();
  }
});

// se agrega una nueva respuesta al hacer click cuando el focus esta en el text input
$('#new_Answer').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    add_rowAnswer();
  }
});


