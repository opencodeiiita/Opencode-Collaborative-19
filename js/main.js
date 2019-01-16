$(document).ready(function () {
    var mentors;
    var participants;
    var projects;

    var mentorsJson = 'data/mentors.json';
    var participantsJson = 'data/participants.json';
    var projectsJson = 'data/projects.json';
    
  
    var preloader = document.getElementById('loading');

     function myfunction(){
    preloader.style.display = "none";
  }

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
