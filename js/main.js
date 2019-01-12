$(document).ready(function () {
    var mentors;
    var participants;
    var projects;

    var mentorsJson = 'data/mentors.json';
    var participantsJson = 'data/participants.json';

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

});