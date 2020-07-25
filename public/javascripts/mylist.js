document.getElementById("nav-mylist").classList.add("active");

$(document).ready(function () {
	$("#sidebar-toggle").click(function(e) {
	    e.preventDefault();	
	    $("#list-sidebar-wrapper").toggleClass("active");

	    if($("#list-sidebar-wrapper").hasClass("active")) {
			$("#list-sidebar").show();
			$("#list-sidebar").css({opacity: 1});
			$("#list-div").css({width: "60%"});
		}
		else { 
			$("#list-sidebar").hide();
			$("#list-sidebar").css({opacity: 0});
			$("#list-div").css({width: "80%"});
		}
	});

	if($(window).width() < 768) {
	  $('#list-sidebar-wrapper').toggleClass('active');

		if($("#list-sidebar-wrapper").hasClass("active")) {
			$("#list-sidebar").show();
			$("#list-sidebar").css({opacity: 1});
			$("#list-div").css({width: "60%"});
		}
		else {
			$("#list-sidebar").hide();
			$("#list-sidebar").css({opacity: 0});
			$("#list-div").css({width: "80%"});
		}
	}
   
   getAllData();
  // addAllItems(items);
	
});



var items;
var newItemId = 14;




function addElement() {
	var item = document.getElementById("list-new-input").value;

	if(item == "") {
		alert("Please write something!");
		return;
	}

	// call backend function to add in database
	addThisInList(item,"Pending");

	// var mylist = document.getElementById("list");

	// var listItems = mylist.innerHTML;

	// listItems += `
	// 	<li id="`+newItemId+`">`+item+`<span class="cross"><i class="fas fa-times-circle"></i></span></li>
	// `;

	// newItemId++;

	// mylist.innerHTML = listItems;

    document.getElementById("list-new-input").value = "";


	$("#list li").click(function(){
  $(this).toggleClass('checked');
  if($(this).hasClass('checked'))
  {
  	markDone($(this).attr("id"));
  }	
  else
  {
  	markPending($(this).attr("id"));
  }
});

}
//Edit data fuctions ---------------------------------------------------------------------
$('#list').on('click', '.edit', function() {
	//var des = document.getElementById("7").value;
	getDescription($(this).parent().attr("id"),$(this).parent());
  // $(this).parent().html(`<input id="edited" type="text" value=`+des+`><span class="done"><i class="fas fa-check-circle"></i>`);
  });

 $('#list').on('click', '.done', function() {
  // markDeleted($(this).parent().attr("id"));
  var desc = document.getElementById("edited").value;
  editDataInList($(this).parent().attr("id"),desc);
  });


 //---------------------------------------------------------------------------------------------------------
 
$("#list li").click(function(){
  $(this).toggleClass('checked');
  if($(this).hasClass('checked'))
  {
  	markDone($(this).attr("id"));
  }	
  else
  {
  	markPending($(this).attr("id"));
  }
});


$('#list').on('click', '.cross', function() {
  markDeleted($(this).parent().attr("id"));
  $(this).parent().remove();
  });

$('#list').on('click', '.restore', function() {
  markPending($(this).parent().attr("id"));
  $(this).parent().remove();
  });


// var items=[
//  {
//      "id":1,
//      "description":"Create a new web page",
//      "status":"Pending"
//  },
//  {
// "id":2,
// "description":"Lean java",
// "status":"Pending"
//  },
//  {
// "id":3,
// "description":"Learn anything",
// "status":"Pending"
//  },
//  {
// "id":4,
// "description":"learn c++",
// "status":"Done"
//  },
//  {
// "id":5,
// "description":"Create somthing",
// "status":"Deleted"
//  }
//  ];


function showItems(category)
{
	$("#categories li").removeClass("active");
	if(category=="All")
	{
		$(".list-new").show();
       getAllData();
       $("#all").addClass("active");
	}

	//getPendingData(category);
	else if(category=="Pending")
	{
		$(".list-new").show();
         getPendingData("Pending");
		//addPendingItems(items);
	    $("#pending").addClass("active");
	}
	else if(category=="Done")
	{
		$(".list-new").show();
		getPendingData("Done");
		$("#done").addClass("active");
	}
	else if(category=="Deleted")
	{
	    $(".list-new").hide();	
		getPendingData("Deleted");
		$("#deleted").addClass("active");
	}
}

function addAllItems(items)
{
	var mylist = document.getElementById("list").innerHTML="";
	var l=items.length;
	for(var i=0;i<l;i++)
	{
       var item=items[i];
       addItems(item,"All");
	}

	$("#list li").click(function(){
  $(this).toggleClass('checked');
  if($(this).hasClass('checked'))
  {
  	markDone($(this).attr("id"));
  }	
  else
  {
  	markPending($(this).attr("id"));
  }
  });
}


function addDoneItems(items)
{
	var mylist = document.getElementById("list").innerHTML="";
	var l=items.length;
	for(var i=0;i<l;i++)
	{
       var item=items[i];
       if(item.status=="Done")
       {
         addItems(item,"Done");
       }
	}

	$("#list li").click(function(){
  $(this).toggleClass('checked');
  if($(this).hasClass('checked'))
  {
  	markDone($(this).attr("id"));
  }	
  else
  {
  	markPending($(this).attr("id"));
  }
  });
}

function addPendingItems(items)
{
	var mylist = document.getElementById("list").innerHTML="";
	var l=items.length;
	for(var i=0;i<l;i++)
	{
       var item=items[i];
       if(item.status=="Pending")
       {
        addItems(item,"Pending");
       }
	}
	$("#list li").click(function(){
  $(this).toggleClass('checked');
  if($(this).hasClass('checked'))
  {
  	markDone($(this).attr("id"));
  }	
  else
  {
  	markPending($(this).attr("id"));
  }
  });
}

function addDeletedItems(items)
{
	var mylist = document.getElementById("list").innerHTML="";
	var l=items.length;
	for(var i=0;i<l;i++)
	{
       var item=items[i];
       if(item.status=="Deleted")
       {
        addItems(item,"Deleted");
       }
	}
}

function addItems(item,category)
{
	var mylist = document.getElementById("list");

	var listItems = mylist.innerHTML;
    
    if(item.status=="Done")
    {
       listItems += `
		<li id="`+item.id+`" class='checked'>`+item.description+`<span class="edit"><i class="fas fa-edit"></i></span><span class="cross"><i class="fas fa-times-circle"></i></span></li>
	`;
    }
    else if(item.status=="Pending")
    {
      listItems += `
		<li id="`+item.id+`">`+item.description+`<span class="edit"><i class="fas fa-edit"></i></span><span class="cross"><i class="fas fa-times-circle"></i></span></li>
	`;
    }
    
    else if(item.status=="Deleted"&&category=="Deleted")
    {
      listItems += `
		<li id="`+item.id+`">`+item.description+`<span class="restore"><i class="fas fa-trash-restore"></i></span></li>
	`;
    }
	mylist.innerHTML = listItems;	
}

function markDone(id)
{
	changeStatus(id, "Done");
	//items[id-1].status="Done";
}

function markPending(id)
{
	changeStatus(id, "Pending");
	//items[id-1].status="Pending";
}

function markDeleted(id)
{
	changeStatus(id, "Deleted");
	//items[id-1].status="Deleted";
}
// function addThisInList(id,description,status){
// 	items[id-1]={
// 		"id":id,
// 		"description":description,
// 		"status":status
// 	}
// }

function getAllData()
{
	// var xhttp = new XMLHttpRequest();
	// xhttp.open("POST","http://localhost:3000/backend/getData",false);
	// xhttp.send();

	// console.log(xhttp.responseText);
	// return JSON.parse(xhttp.responseText).data.items;

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({}),
		url: "http://localhost:3000/backend/getData",
		success: function(response) {
			if(response.status == "success") {
				 console.log(response.status);
				 console.log(response.data.items);
				console.log("Bottom print");
				items = response.data.items;
				addAllItems(items);
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}


function changeStatus(myId, myStatus)
{
	 
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"id": myId,"status": myStatus}),
		url: "http://localhost:3000/backend/changeStatus",
		success: function(response) {
			if(response.status == "success") {
				console.log(response.status)
				//getAllData();
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}



function getPendingData(myStatus)
{
	 
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"status": myStatus}),
		url: "http://localhost:3000/backend/getPendingData",
		success: function(response) {
			if(response.status == "success") {
				 console.log(response.status);
				 console.log(response.data.items);
				console.log("Bottom print");
				items = response.data.items;
				if(myStatus=="Pending")
				addPendingItems(items);
			    else if(myStatus=="Done")
			    addDoneItems(items);
			    else if(myStatus=="Deleted")
			    addDeletedItems(items);
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}


function addThisInList(Description, myStatus)
{
	 
	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"description": Description,"status": myStatus}),
		url: "http://localhost:3000/backend/addThisInList",
		success: function(response) {
			if(response.status == "success") {
				console.log(response.status)
				getAllData();
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}

function editDataInList(id,description)
{

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"id": id,"description": description}),
		url: "http://localhost:3000/backend/editDataInList",
		success: function(response) {
			if(response.status == "success") {
				console.log(response.status)
				getAllData();
			}
			else {
				console.log(response);
				//getAllData();
                //console.log("edited print");
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}

function getDescription(id,p)
{

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify({"id": id}),
		url: "http://localhost:3000/backend/getDescription",
		success: function(response) {
			if(response.status == "success") {
				 console.log(response.status);
				 console.log(response.data.items[0].description);
				items = response.data.items[0].description;
				p.html(`<input id="edited" type="text" value=`+items+`><span class="done"><i class="fas fa-check-circle"></i>`);
			}
			else {
				console.log(response);
			}
		},
		error: function(xhr, status, err) {
			console.log(err.toString());
		}
	});
}