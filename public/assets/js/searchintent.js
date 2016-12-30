
// Se obtiene el JSON que envía mongoDB
MIntents = JSON.parse(document.getElementById('UserIntents').innerHTML);
// Se obtiene el número de intent que tiene el usuario
MintentsLen = MIntents.length;

// Master Function to create intent view
function Get_Intents_Collection(LengIntents){
	// Create a div for every Intent 
	for (var i = 0; i <= LengIntents - 1 ; i++) {
  	div = document.createElement("div");
    div.id = "Intent" + i;
    // create a row of the table in every loop (1 loop = 1 intent)
  	CreateIntentTable(i);
   	}
};

function CreateIntentTable(N_Intent)
{    
 var table=document.getElementById("intent_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr><td>"+MIntents[N_Intent].General_Question+"</td><td>"+MIntents[N_Intent].Intent_ID+"</td><td><button type='button' class='btn btn-warning pull-right' onclick=DeleteONeIntent('"+MIntents[N_Intent].Intent_ID+"'); ><i class='pe-7s-trash'></i>Borrar</button><button type='button' class='btn btn-info pull-right' onclick=SearchOneIntent('"+MIntents[N_Intent].Intent_ID+"');>Editar</button></td></tr>";
 var outputVariation = table_len;
}

// Call master function to create intent view
Get_Intents_Collection(MintentsLen);

var pathArray = window.location.pathname.split( '/' );


