
function Get_Intent_Card(N_Intent){
	var div = document.createElement("div");
   	div.id ="GeneralIntentCard" + N_Intent;

	var divHtml = "<div class='card col-md-10 text-center'><div class='header'><h4 class='title'>Intent ID :"+MIntents[N_Intent].Intent_ID+"</h4></div><div class='row'><form action='/updateIntent' method='POST'><div class='col-md-12'><div class='row'><div class='col-md-10 text-center'><div class='form-group'><label><strong>Pregunta General: </strong></label><input type='text' class='form-control' placeholder='Insertar pregunta general' value='"+MIntents[N_Intent].General_Question+"' name='GeneralQuestion'></div></div></div><div id='Variations"+N_Intent+"'></div><div id='Tags"+N_Intent+"'></div></div></div></div>";
  	document.getElementById("IntentID" + N_Intent).appendChild(div).outerHTML = divHtml;

  	Get_Tags(N_Intent);
  	Get_Variations(N_Intent);
};


function Get_Answer_Card(N_Intent){
	var div = document.createElement("div");
   	div.id ="GeneralAnswerCard" + N_Intent;

	var divHtml = "<div class='card col-md-10'><div class='header'><h4 class='title'>Respuestas</h4></div><div class='row'><div class='col-md-12'><div class='content table-responsive table-full-width'><div id='"+N_Intent+"IntentAnswers'></div></div></div></div></div>";
  	document.getElementById("IntentID" + N_Intent).appendChild(div).outerHTML = divHtml;

  	Get_Answers(N_Intent);
};



// Get Tags for the intent card 
function Get_Tags(N_Intent){
	var div = document.createElement("div");
   	div.id ="CreateHTMLTags" + N_Intent;

	var divHtml = "<div class='row'><div class='col-md-6 text-center'><div class='form-group'><label><strong>Tags:</strong></label><input type='text' class='form-control' placeholder='Insertar Tags' value='"+MIntents[N_Intent].Tags+"' name='Tags'></div></div></div>";
  	document.getElementById("Tags" + N_Intent).appendChild(div).outerHTML = divHtml;	
};

// Get Variations for the intent card  
function Get_Variations(N_Intent){

	Mvariationlen = MIntents[N_Intent].Variations.length;
	var div = document.createElement("div");
   	div.id = "createHtmlvariations" + N_Intent;

	var divHtml = "<div class='col-md-6 text-center pull-left'><div class='content table-responsive table-full-width'><table class='table table-hover table-striped' id='update_variations_table"+N_Intent+"'><thead><th>Variantes</th></thead><tbody><tr><td><div class='form-group'><input type='text' class='form-control' placeholder='Insertar variante' value='"+MIntents[N_Intent].Variations[0]+"' id='update_new_variation"+N_Intent+"'></div></td><td><a class='add' onclick='update_add_rowVariations("+N_Intent+");' >Add</a></td></tr></tbody></table></div></div>";
  	document.getElementById("Variations" + N_Intent).appendChild(div).outerHTML = divHtml;

  	if (Mvariationlen>1){
		for (var i = 1; i <= Mvariationlen - 1 ; i++) {

			 var new_variation=document.getElementById("update_new_variation" + N_Intent).value;
 			 var table=document.getElementById("update_variations_table" + N_Intent);
 			 var table_len=(table.rows.length)-1;
 			 var row = table.insertRow(table_len).outerHTML="<tr id='"+N_Intent+"row"+table_len+"'><td id='"+N_Intent+"update_variation_row"+table_len+"'>"+MIntents[N_Intent].Variations[i]+"</td><td><a id='"+N_Intent+"edit_button"+table_len+"' class='edit' onclick='update_edit_rowVariations("+N_Intent+","+table_len+")'>Edit</a> <a id='"+N_Intent+"save_button"+table_len+"' class='save' onclick='update_save_rowVariations("+N_Intent+","+table_len+")'>Save</a> <a class='delete' onclick='update_delete_rowVariations("+N_Intent+","+table_len+")'>Delete</a></td></tr>";
 			 var outputVariation = table_len;

 			 document.getElementById(N_Intent+"save_button"+table_len).style.display="none";
   		}
  	}
};

function Get_Answers(N_Intent){

	MAnswerslen = MIntents[N_Intent].Answers.length;
	var div = document.createElement("div");
   	div.id = "createHtmlAnswers" + N_Intent;

	var divHtml = "<table class='table table-hover table-striped' id='"+N_Intent+"Answer_table'><thead><th class='text-center'><strong>Administrar Respuestas</strong></th></thead><tbody><tr><td><div class='rowAns'><div class='col-md-10'><input type='text' class='form-control' id='"+N_Intent+"new_Answer' name='Answer' placeholder='Insertar respuesta' value='"+MIntents[N_Intent].Answers[0].Answer+"' ></div><div class='col-md-2'><a onclick='update_add_rowAnswer("+N_Intent+");'><i class='pe-7s-plus'></i></a></div></div><div class='row'><div class='col-md-2 text-center'><label>Ironía</label><div id='slider'><input class='bar' type='range' id='"+N_Intent+"rangeIrony' value='"+MIntents[N_Intent].Answers[0].Irony+"' name='Irony' onchange='"+N_Intent+"rangeIronyvalue.value=value'/><span class='highlight'></span><output id='"+N_Intent+"rangeIronyvalue'>"+MIntents[N_Intent].Answers[0].Irony+"</output></div></div><div class='col-md-2 text-center'><label>Formalidad</label><div id='slider'><input class='bar' type='range' id='"+N_Intent+"rangeFormal' value='"+MIntents[N_Intent].Answers[0].Formal+"' name='Formal' onchange='"+N_Intent+"rangeFormalvalue.value=value'/><span class='highlight'></span><output id='"+N_Intent+"rangeFormalvalue'>"+MIntents[N_Intent].Answers[0].Formal+"</output></div></div><div class='col-md-2 text-center'><label>Humor</label><div id='slider'><input class='bar' type='range' id='"+N_Intent+"rangeHumor' value='"+MIntents[N_Intent].Answers[0].Humor+"' name='Humor' onchange='"+N_Intent+"rangeHumorvalue.value=value'/><span class='highlight'></span><output id='"+N_Intent+"rangeHumorvalue'>"+MIntents[N_Intent].Answers[0].Humor+"</output></div></div></div></td></tr></tbody></table>";

  	document.getElementById(N_Intent + "IntentAnswers").appendChild(div).outerHTML = divHtml;

  	if (MAnswerslen>1){

		for (var i = 1; i <= MAnswerslen - 1 ; i++) {

			var table=document.getElementById(N_Intent+"Answer_table");
 			var table_len=(table.rows.length)-1;
 			var varplus = table_len;
 			var row = table.insertRow(table_len).outerHTML="<tr id='"+N_Intent+"rowAns"+varplus+"'><td id='"+N_Intent+"Answer_row"+varplus+"'><div class='row'><div class='col-md-10'><input type='text' name='Answer"+varplus+"' class='form-control' id='"+N_Intent+"new_Answer"+varplus+"' value='"+MIntents[N_Intent].Answers[0].Answer+"'></div><div class='col-md-2'><a onclick='update_delete_rowAnswer("+N_Intent+","+varplus+")'><i class='pe-7s-hammer'></i></a></div></div><div class='row'><div class='col-md-4 text-center'><label>Ironía</label><div id='sliderirony"+varplus+"'><input class='bar' type='range' name='Irony"+varplus+"' id='rangeIrony"+varplus+"' value='"+MIntents[N_Intent].Answers[i].Irony+"' onchange='rangeIrony"+varplus+"value.value=value'/><span class='highlight'></span><output id='rangeIrony"+varplus+"value'>"+MIntents[N_Intent].Answers[i].Irony+"</output></div></div><div class='col-md-4 text-center'><label>Formalidad</label><div id='sliderformal"+varplus+"'><input class='bar' type='range' name='Formal"+varplus+"' id='rangeFormal"+varplus+"' value='"+MIntents[N_Intent].Answers[i].Formal+"' onchange='rangeFormal"+varplus+"value.value=value'/><span class='highlight'></span><output id='rangeFormal"+varplus+"value'>"+MIntents[N_Intent].Answers[i].Formal+"</output></div></div><div class='col-md-4 text-center'><label>Humor</label><div id='sliderhumor'><input class='bar' type='range' name='Humor"+varplus+"' id='rangeHumor"+varplus+"' value='"+MIntents[N_Intent].Answers[i].Humor+"' onchange='rangeHumor"+varplus+"value.value=value'/><span class='highlight'></span><output id='rangeHumor"+varplus+"value'>"+MIntents[N_Intent].Answers[i].Humor+"</output></div></div></div></td></tr>";

   		}
  	}
}



function update_delete_rowAnswer(N_Intent,no)
{
 document.getElementById(N_Intent+"rowAns"+no+"").outerHTML="";
}

function update_add_rowAnswer(N_Intent)
{
 var new_Answer=document.getElementById(N_Intent+"new_Answer").value;
 var new_Irony=document.getElementById(N_Intent+"rangeIrony").value;
 var new_Formal=document.getElementById(N_Intent+"rangeFormal").value;
 var new_Humor=document.getElementById(N_Intent+"rangeHumor").value

    
 var table=document.getElementById(N_Intent+"Answer_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='"+N_Intent+"rowAns"+table_len+"'><td id='"+N_Intent+"Answer_row"+table_len+"'><div class='row'><div class='col-md-10'><input type='text' name='Answer"+table_len+"' class='form-control' id='"+N_Intent+"new_Answer"+table_len+"' value='"+new_Answer+"'></div><div class='col-md-2'><a onclick='update_delete_rowAnswer("+N_Intent+","+table_len+")'><i class='pe-7s-hammer'></i></a></div></div><div class='row'><div class='col-md-4 text-center'><label>Ironía</label><div id='sliderirony"+table_len+"'><input class='bar' type='range' name='Irony"+table_len+"' id='rangeIrony"+table_len+"' value='"+new_Irony+"' onchange='rangeIrony"+table_len+"value.value=value'/><span class='highlight'></span><output id='rangeIrony"+table_len+"value'>"+new_Irony+"</output></div></div><div class='col-md-4 text-center'><label>Formalidad</label><div id='sliderformal"+table_len+"'><input class='bar' type='range' name='Formal"+table_len+"' id='rangeFormal"+table_len+"' value='"+new_Formal+"' onchange='rangeFormal"+table_len+"value.value=value'/><span class='highlight'></span><output id='rangeFormal"+table_len+"value'>"+new_Formal+"</output></div></div><div class='col-md-4 text-center'><label>Humor</label><div id='sliderhumor'><input class='bar' type='range' name='Humor"+table_len+"' id='rangeHumor"+table_len+"' value='"+new_Humor+"' onchange='rangeHumor"+table_len+"value.value=value'/><span class='highlight'></span><output id='rangeHumor"+table_len+"value'>"+new_Humor+"</output></div></div></div></td></tr>";
 var outputAnswer = table_len;
 document.getElementById(N_Intent+"new_Answer").value="";
 document.getElementById(N_Intent+"rangeIrony").value=50;
 document.getElementById(N_Intent+"rangeFormal").value=50;
 document.getElementById(N_Intent+"rangeHumor").value=50;

}

















// Check


// Editar variantes en Update Intent
function update_edit_rowVariations(N_Intent,no)
{
 document.getElementById(N_Intent+"edit_button"+no).style.display="none";
 document.getElementById(N_Intent+"save_button"+no).style.display="block";
	
 var variation=document.getElementById(N_Intent+"update_variation_row"+no);
	
 var variation_data=variation.innerHTML;

 variation.innerHTML="<input type='text' class='form-control' placeholder='Editar' id='"+N_Intent+"update_variation_text"+no+"' value='"+variation_data+"'>";
}

// Guardar cambios generados en la fila de variantes
function update_save_rowVariations(N_Intent,no)
{
 var variation_val=document.getElementById(N_Intent+"update_variation_text"+no).value;

 document.getElementById(N_Intent+"update_variation_row"+no).innerHTML=variation_val;

 document.getElementById(N_Intent+"edit_button"+no).style.display="block";
 document.getElementById(N_Intent+"save_button"+no).style.display="none";
}


// Eliminar variante del formulario
function update_delete_rowVariations(N_Intent,no)
{
 document.getElementById(N_Intent+"row"+no+"").outerHTML="";
}

// END Check


//Agregar nueva variante
function update_add_rowVariations(N_Intent)
{
 var new_variation=document.getElementById("update_new_variation"+ N_Intent).value;
	
 var table=document.getElementById("update_variations_table" + N_Intent);
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='"+N_Intent+"row"+table_len+"'><td id='"+N_Intent+"update_variation_row"+table_len+"'>"+new_variation+"</td><td><a id='"+N_Intent+"edit_button"+table_len+"' class='edit' onclick='update_edit_rowVariations("+N_Intent+","+table_len+")'>Edit</a> <a id='"+N_Intent+"save_button"+table_len+"' class='save' onclick='update_save_rowVariations("+N_Intent+","+table_len+")'>Save</a> <a class='delete' onclick='update_delete_rowVariations("+N_Intent+","+table_len+")'>Delete</a></td></tr>";
 var outputVariation = table_len;
 document.getElementById("update_new_variation"+ N_Intent).value="";

}



















