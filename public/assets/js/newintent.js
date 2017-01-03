
// Funciona de manera igual creador de editoneintent.js, se repite el codigo con diferentes ID, para evitar la necesidad re re-hacer el código en caso de querer mas adelante editar y agregar intent en una misma vista
function edit_rowVariations(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="inline";
    
 var variation=document.getElementById("variation_row"+no);
 var variation_data=variation.innerHTML;    
 variation.innerHTML="<input type='text' class='form-control' placeholder='Editar' id='variation_text"+no+"' value='"+variation_data+"'>";
}

// Guardar cambios generados en la fila de variantes
function save_rowVariations(no)
{
 var variation_val=document.getElementById("variation_text"+no).value;
 document.getElementById("variation_row"+no).innerHTML=variation_val;
 document.getElementById("edit_button"+no).style.display="inline";
 document.getElementById("save_button"+no).style.display="none";
}

// Eliminar variante del formulario
function delete_rowVariations(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

//Agregar nueva variante
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

// Create an unique ID for Intent ID
function generateUUID(){
    var d = new Date().getTime();
    if(window.performance && typeof window.performance.now === "function"){
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
  //console.log(uuid);
  document.getElementById("intentID").innerHTML=uuid;
}
// call the function
generateUUID();


// Nuevamente sección parecida a editoneintent, pero para hacer separación de ids de divs se hacen por separado

function delete_rowAnswer(no)
{
 document.getElementById("Ansrow"+no+"").outerHTML="";
}

function add_rowAnswer()
{
 var new_Answer=document.getElementById("new_Answer").value;
 var new_Irony=document.getElementById("rangeIrony").value;
 var new_Formal=document.getElementById("rangeFormal").value;
 var new_Humor=document.getElementById("rangeHumor").value
 console.log(new_Irony + "," + new_Formal + "," + new_Humor);

    
 var table=document.getElementById("Answer_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='Ansrow"+table_len+"'><td class='text-center' id='Answer_row_Answer"+table_len+"'>"+new_Answer+"</td><td class='text-center' id='Answer_row_Irony"+table_len+"'>"+new_Irony+"</td><td class='text-center' id='Answer_row_Formal"+table_len+"'>"+new_Formal+"</td><td class='text-center' id='Answer_row_Humor"+table_len+"'>"+new_Humor+"</td><td class='text-center' id='Answer_row_Actions"+table_len+"'><a class='delete' onclick='delete_rowAnswer("+table_len+")'><i class='pe-7s-trash'></i></a><a id='answer_edit_button"+table_len+"' class='edit' onclick='edit_rowAnswer_table("+table_len+")'><i class='pe-7s-pen'></i></a><a id='answer_save_button"+table_len+"' class='save' onclick='save_rowAnswer_table("+table_len+")'><i class='pe-7s-diskette'></i></a><a id='tars_recomend_button"+table_len+"' class='magic'><i class='pe-7s-magic-wand'></i></a></td></tr>";
 var outputAnswer = table_len;
 document.getElementById("new_Answer").value="";
 document.getElementById("rangeIrony").value=new_Irony;
 document.getElementById("rangeFormal").value=new_Formal;
 document.getElementById("rangeHumor").value=new_Humor;
 document.getElementById("answer_save_button"+table_len).style.display="none";


}


function edit_rowAnswer_table(no)
{
    document.getElementById("answer_edit_button"+no).style.display="none";
    document.getElementById("answer_save_button"+no).style.display="inline";
    
    var Answer=document.getElementById("Answer_row_Answer"+no);
    var Irony=document.getElementById("Answer_row_Irony"+no);
    var Formal=document.getElementById("Answer_row_Formal"+no);
    var Humor=document.getElementById("Answer_row_Humor"+no);
    
    var Answer_data=Answer.innerHTML;
    Answer.innerHTML="<input type='text' class='form-control' placeholder='Editar respuesta' id='Answer_text"+no+"' value='"+Answer_data+"'>";

    var Irony_data=Irony.innerHTML;
    Irony.innerHTML="<input type='text' class='form-control' placeholder='Editar ironía' id='Irony_text"+no+"' value='"+Irony_data+"'>";

    var Formal_data=Formal.innerHTML;
    Formal.innerHTML="<input type='text' class='form-control' placeholder='Editar formalidad' id='Formal_text"+no+"' value='"+Formal_data+"'>";

    var Humor_data=Humor.innerHTML;
    Humor.innerHTML="<input type='text' class='form-control' placeholder='Editar Humor' id='Humor_text"+no+"' value='"+Humor_data+"'>";
}

// Guardar cambios generados en la fila de variantes
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



// click event function

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

// add new answer when the user click the enter button
$('#new_Answer').on('keypress', function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();
    add_rowAnswer();
  }
});




