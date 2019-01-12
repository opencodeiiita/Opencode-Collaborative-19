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
            var participantDiv = "<div class='col-lg-3 col-sm-6 text-center mb-4'>" + 
                                "<div class='card participant-card'>" +
                                "<img class='card-img-top participant-img' src=" + participant.imageurl + " alt=''>" +
                                "<div class='card-body'>" +
                                "<h4 class='card-title'>" +
                                participant.name +
                                "</h4>" +
                                "<h5 class='card-text'>" +
                                participant.college +
                                "</h5>" +
                                "<p class='card-text'>" + participant.about + "</p>" +
                                "</div>" +
                                "<div class='social-media-links'>"+
                                    "<a href="+ participant.facebook +"><i class='fab fa-facebook-f'></i></a>"+
                                    "<a href="+ participant.github +"><i class='fab fa-github'></i></a>"+
                                    "<a href="+ participant.twitter +"><i class='fab fa-twitter'></i></a>"+
                                "</div>"+
                                "</div>" +
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