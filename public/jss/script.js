function init() {
    

    $.ajax({
		url: "/blog-posts",
		method: 'GET',
		dataType: 'json', 
		success: function(responseJSON){
					console.log(responseJSON);

					$("#blogLists").empty();

					for (let i = 0; i< responseJSON.length; i++) {
                        $("#blogLists").append(`<div> <h3> ${responseJSON[i].title} </h3>
                                                <p> ${responseJSON[i].id} </p>
                                                <h4> ${responseJSON[i].author} </h4>
                                                <p> ${responseJSON[i].content} </p>
                                                <p> ${responseJSON[i].publishDate} </p>
                                                </div>`);
                        console.log("hola2");
					}

				},
		error: function(err){
					console.log(err);
				
				}
    });    
}

$("#newPost").on("click", function(event){
event.preventDefault();

let title = $("#title").val();
let content= $("#content").val();
let author = $("#author").val();
let publishDate = new Date();


let post = {
    title: title,
    content: content,
    publishDate: publishDate,
    author: author
    
};

//console.log(post);
$.ajax({
    url: "/blog-posts",
    data : JSON.stringify(post),
    method: 'POST',
    dataType: 'json', 
    contentType: 'application/json',
    success: function(responseJSON){
                console.log("sucess psot");
                init();
            },
    error: function(err){
                console.log(err);
                $("#errorpost").text(err.statusText);
                
            
            }
});
        $("#title").val("");
	    $("#content").val("");
	   	$("#author").val("");
	    $("#publishDate").val(""); 
});



$("#deletebtn").on("click", function(event){
event.preventDefault;
id = $("#idDelete").val();

$.ajax({
    url: "/blog-posts/" + id,
    //data : JSON.stringify(post),
    method: 'DELETE',
    dataType: 'json', 
    //contentType: 'application/json',
    success: function(responseJSON){
                console.log("sucess delete");
                init();
            },
    error: function(err){
                console.log(err);
                $("#errordelete").text(err.statusText);
            
            }
});
$("#idDelete").val("");

});

$("#updatebtn").on("click", function(event){
    event.preventDefault();
    //console.log("adentro del update");
    idUpd = $("#idUpdate").val();
    titleUpd = $("#titleUpdate").val();
    contentUpd = $("#contentUpdate").val();
    authorUpd = $("#authorUpdate").val();
    publishDateUpd = $("#publishDateUpdate").val();

    let updPost = {
        id: idUpd,
        title: titleUpd,
        content: contentUpd,
        author: authorUpd,
        publishDate: publishDateUpd
    }

    $.ajax({
        url: "/blog-posts/" + idUpd,
        data : JSON.stringify(updPost),
        method: 'PUT',
        dataType: 'json', 
        contentType: 'application/json',
        success: function(responseJSON){
                    console.log("sucess update");
                    init();
                },
        error: function(err){
                    console.log(err);
                    $("#errorupdate").text(err.statusText);
                
                }
    });

    $("#idUpdate").val("");
    $("#textUpdate").val("");
    $("#contentUpdate").val("");
    $("#authorUpdate").val("");
    $("#publishDate").val("");

    });




$(init);//of init(); for native js