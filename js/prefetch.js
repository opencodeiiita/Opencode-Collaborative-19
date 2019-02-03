$(document).ready(function() {

    var folder = "../assets/img/participants/";

    $.ajax({
        url : folder,
        success: function (data) {
            $(data).find("img").attr("href", function (i, val) {
                if( val.match(/\.(jpe?g|png|gif)$/) ) { 
                    $("body").append( "<img src='"+ folder + val +"'>" );
                } 
            });
        }
    });
});