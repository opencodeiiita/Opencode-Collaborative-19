$(document).ready(function () {
    var mentors;
    var participants;
    var projects;

    var mentorsJson = 'data/mentors.json';
    var participantsJson = 'data/participants.json';
    var projectsJson = 'data/projects.json';

    $.ajaxSetup({ beforeSend: function (xhr) {
        if (xhr.overrideMimeType) {
          xhr.overrideMimeType("application/json");
        }
      }
    });

    $.getJSON(mentorsJson, function (data) {
        mentors = data.mentors;
        $.each( mentors, function( i, mentor ) {
            var mentorDiv = "<div class='col-lg-2 col-sm-6 text-center mb-4'>" +
                            "<img class='img-fluid d-block mx-auto mb-4 profile-image' src=" + mentor.imageurl + " alt=''>" +
                            "<h4>" +
                            mentor.name +
                            "</h4>" +
                            "<p>" + mentor.about + "</p>" +
                            "</div>"

            $('#mentors').append(mentorDiv);
        });
    });

    $.getJSON(participantsJson, function (data) {
        participants = data.participants;
        $.each( participants, function( i, participant ) {


          if (/^ *$/.test(participant.imageurl) || participant.imageurl == "") {
         //regex to check empty string or spaces

          participant.imageurl =
         "https://image.flaticon.com/icons/svg/1141/1141771.svg";
           //Icon made by Freepik from www.flaticon.com *credits*
         }else{
           var url = participant.imageurl;
           console.log(url);

 try{
            var http = new XMLHttpRequest();
          http.open('HEAD', url, false);
          http.send();

           if (http.status == 404)
      {

                  participant.imageurl ="https://image.flaticon.com/icons/svg/1141/1141771.svg";

      }

}
catch(err) {

}



         }
            var participantDiv = "<div class='col-lg-2 col-sm-6 text-center mb-4'>" +
                                "<img class='img-fluid d-block mx-auto mb-4 profile-image' src=" + participant.imageurl + " alt=''>" +
                                "<h4>" +
                                participant.name +
                                "</h4>" +
                                "<h5>" +
                                participant.college +
                                "</h5>" +
                                "<p>" + participant.about + "</p>" +
                                "</div>"

            $('#participants').append(participantDiv);
        });
    });

    $.getJSON(projectsJson, function (data) {
        projects = data.projects;
        $.each( projects, function( i, project ) {
            var projectDiv = "<div class='col-lg-3 col-md-4 col-sm-6 portfolio-item'>" +
                                "<div class='card h-100'>" +
                                    "<a href=" + project.github +"><img class='card-img-top' src=" + project.imageurl + " alt=''></a>" +
                                    "<div class='card-body'>" +
                                        "<h4 class='card-title'>" +
                                            "<a href=" + project.github + ">" + project.name + "</a>" +
                                        "</h4>" +
                                        "<p class='card-text'>" + project.about + "</p>" +
                                        "</hr>" +
                                        "<h5>" +
                                            "Mentors" +
                                            "<p>" + project.mentors + "</p>" +
                                        "</h5>" +
                                        "</hr>" +
                                        "<h5>" +
                                            "Tech Stack" +
                                            "<p>" + project.lang + "</p>" +
                                        "</h5>" +
                                    "</div>"
                                "</div>"
                            "</div>"

            $('#projects').append(projectDiv);
        });
    });

});
