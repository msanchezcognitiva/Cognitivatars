
// Se obtiene todo lo que esta en el formulario, esta función es usada en la vista new intent
function get_all(form){
	var tableV=document.getElementById("variations_table");
 	var table_len_variation=(tableV.rows.length)-1;
 	var outputVariation = table_len_variation;
	console.log(outputVariation + ": N_variations");

	var tableA=document.getElementById("Answer_table");
 	var table_len_answers=(tableA.rows.length)-1;
 	var outputanswer = table_len_answers;
	console.log(outputanswer + ": N_Answers");

	// Intent data

    // Creations of array
    var Answer=[];
    var Variation=[];
    var Irony=[];
    var Formal=[];
    var Humor=[];
    var Answers=[[]];
	//General Question

	var General_Question = form["GeneralQuestion"].value;
  var tag_values = $('#tags').val();

  if (tag_values == null) {
    alert('Necesitas a lo menos un tag para completar el formulario');

  }

 // Creation of JSON objects
    VariationJSON = [];
    AnswersJSON = [];
    var variation_counter_aux = 1;

  // Variations Section
    for (var i = 1; i <= outputVariation - 1; i++) {
       Variation[i] = document.getElementById("variation_row" + i).innerHTML;

       if (Variation[i]!=""){
        VariationJSON[variation_counter_aux] = Variation[i];
        variation_counter_aux = variation_counter_aux + 1;
       }       
    }

    addRow_variation = document.getElementById("new_variation").value;
    Variation[outputVariation] = addRow_variation;

    if(Variation[outputVariation]!=null){
      VariationJSON[variation_counter_aux] = Variation[outputVariation];
      variation_counter_aux = variation_counter_aux + 1;
    }




  // Answer Section
  var counter_answer_aux = 1;
  // For to create the JSON answersJson
    for (var i = 1; i <= outputanswer - 1; i++) {
       Answer[i] = document.getElementById("Answer_row_Answer" + i).innerHTML;
       Irony[i] = document.getElementById("Answer_row_Irony" + i).innerHTML;
       Formal[i] = document.getElementById("Answer_row_Formal" + i).innerHTML;
       Humor[i] = document.getElementById("Answer_row_Humor" + i).innerHTML;

       if(Answer[i]!=""){
        AnswersJSON[counter_answer_aux] = {"Answer": Answer[i], "Irony": Irony[i], "Formal": Formal[i], "Humor": Humor[i]};
        counter_answer_aux = counter_answer_aux + 1;
       }
    }
    // Border Condition

    Answer[outputanswer]=document.getElementById("new_Answer").value;
    Irony[outputanswer]=document.getElementById("rangeIrony").value;
    Formal[outputanswer]=document.getElementById("rangeFormal").value;
    Humor[outputanswer]=document.getElementById("rangeHumor").value;

    if(Answer[outputanswer]!=""){
      AnswersJSON[counter_answer_aux] = {"Answer": Answer[outputanswer], "Irony": Irony[outputanswer], "Formal": Formal[outputanswer], "Humor": Humor[outputanswer]} ;
      counter_answer_aux = counter_answer_aux + 1;
    }

    var uuid = document.getElementById("intentID").innerHTML;
    
  AnswersJSON .splice(0, 1);
  VariationJSON.splice(0, 1);
  VariationJSON.splice(variation_counter_aux -2, 1);


  var intent = {};

  Created_in_seconds = Math.floor(Date.now() / 1000);


  intent = {"Intent_ID": uuid ,"Time_Seconds":Created_in_seconds,"User": pathArray[3], "General_Question": General_Question, "Variations":VariationJSON, "Tags": tag_values, "Answers": AnswersJSON};
  var intentString = JSON.stringify(intent);
	var output = intentString;

  document.getElementById("output_hidden").value = output;
  document.getElementById("email").value = pathArray[3];
  document.getElementById("token").value = pathArray[2];
}

// -------------------  END  -----------------------//

var pathArray = window.location.pathname.split( '/' );

// manage of all post operations to authenticate the session 

function NewIntent(){
  post('/newintent', {token: pathArray[2], email: pathArray[3]});
};

function NewIntentview(){
  post('/newintentview', {token: pathArray[2], email: pathArray[3]});
};

function SearchIntentview(){
  post('/searchintent', {token: pathArray[2], email: pathArray[3]});
};


function DeleteONeIntent(MIntent_ID){
  post('/deleteoneintent', {token: pathArray[2], email: pathArray[3], Intent_ID: MIntent_ID});
};

function SearchOneIntent(MIntent_ID){
  post('/editoneintent', {token: pathArray[2], email: pathArray[3], Intent_ID: MIntent_ID});
};

// Generate post operations
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }
    document.body.appendChild(form);
    form.submit();
};







