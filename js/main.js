window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 2000 ||
        document.documentElement.scrollTop > 2000
    ) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

$(document).ready(function() {
    var mentors;
    var participants;
    var projects;

    var mentorsJson = "data/mentors.json";
    var participantsJson = "data/participants.json";
    var projectsJson = "data/projects.json";

    $.ajaxSetup({
        beforeSend: function(xhr) {
            if (xhr.overrideMimeType) {
                xhr.overrideMimeType("application/json");
            }
        }
    });

    $.getJSON(mentorsJson, function(data) {
        mentors = data.mentors;
        mentors.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
        });
        console.log(mentors);
        $.each(mentors, function(i, mentor) {
            if (/^ *$/.test(mentor.imageurl) || mentor.imageurl == "") {
                //regex to check empty string or spaces

                mentor.imageurl =
                    "https://image.flaticon.com/icons/svg/1141/1141771.svg";
                //Icon made by Freepik from www.flaticon.com *credits*
            } else {
                var url = mentor.imageurl;
                //console.log(url);

                try {
                    var http = new XMLHttpRequest();
                    http.open("HEAD", url, false);
                    http.send();

                    if (http.status == 404) {
                        mentor.imageurl =
                            "https://image.flaticon.com/icons/svg/1141/1141771.svg";
                    }
                } catch (err) {}
            }
            var mentorDiv =
                "<div class='col-lg-3 col-sm-6 text-center mb-4'>" +
                "<div class='card mentor-card'>" +
                "<img class='card-img-top participant-img' src=" +
                mentor.imageurl +
                " alt=''>" +
                "<div class='card-body'>" +
                "<h4 class='card-title'>" +
                mentor.name +
                "</h4>" +
                "<p class='card-text'>" +
                mentor.about +
                "</p>" +
                "</div>" +
                "<div class='social-media-links'>" +
                "<a href=" +
                mentor.facebook +
                "><i class='fab fa-facebook-f'></i></a>" +
                "<a href=" +
                mentor.github +
                "><i class='fab fa-github'></i></a>" +
                "<a href=" +
                mentor.twitter +
                "><i class='fab fa-twitter'></i></a>" +
                "</div>" +
                "</div>" +
                "</div>";

            $("#mentors").append(mentorDiv);
        });
    });

    $.getJSON(participantsJson, function(data) {
        participants = data.participants;
        $.each(participants, function(i, participant) {
            if (
                /^ *$/.test(participant.imageurl) ||
                participant.imageurl == ""
            ) {
                //regex to check empty string or spaces

                participant.imageurl =
                    "https://image.flaticon.com/icons/svg/1141/1141771.svg";
                //Icon made by Freepik from www.flaticon.com *credits*
            } else {
                var url = participant.imageurl;
                //console.log(url);

                try {
                    var http = new XMLHttpRequest();
                    http.open("HEAD", url, false);
                    http.send();

                    if (http.status == 404) {
                        participant.imageurl =
                            "https://image.flaticon.com/icons/svg/1141/1141771.svg";
                    }
                } catch (err) {}
            }
            var participantDiv =
                  "<div class='col-lg-3 col-sm-6 text-center mb-4'>" +
                "<div class='card participant-card'>" +
                "<div class = 'side'>" +
                "<img class='card-img-top participant-img' src=" +
                participant.imageurl +
                " alt=''>" +
                "<div class='card-body'>" +
                "<h4 class='card-title'>" +
                participant.name +
                "</h4>" +
                "<p class='card-text'>" +
                participant.college +
                "</p>" +
                "</div>"+
                "</div>" +
                "<div class='side back'>" +
                "<p class='card-about'>" +
                participant.about +
                "</p>" +
                "<div class='social-media-links'>" +
                "<a href=" +
                participant.facebook +
                "><i class='fab fa-facebook-f'></i></a>" +
                "<a href=" +
                participant.github +
                "><i class='fab fa-github'></i></a>" +
                "<a href=" +
                participant.twitter +
                "><i class='fab fa-twitter'></i></a>" +
                "</div>" +
                "</div>";


            $("#participants").append(participantDiv);
        });
    });

    $.getJSON(projectsJson, function(data) {
        projects = data.projects;
        $.each(projects, function(i, project) {
            var projectDiv =
                "<div class='col-lg-3 col-md-4 col-sm-6 portfolio-item'>" +
                "<div class='card h-100'>" +
                "<a href=" +
                project.github +
                "><img class='card-img-top' src=" +
                project.imageurl +
                " alt=''></a>" +
                "<div class='card-body'>" +
                "<h4 class='card-title'>" +
                "<a href=" +
                project.github +
                ">" +
                project.name +
                "</a>" +
                "</h4>" +
                "<p class='card-text'>" +
                project.about +
                "</p>" +
                "</hr>" +
                "<h5>" +
                "Mentors" +
                "<p>" +
                project.mentors +
                "</p>" +
                "</h5>" +
                "</hr>" +
                "<h5>" +
                "Tech Stack" +
                "<p>" +
                project.lang +
                "</p>" +
                "</h5>" +
                "</div>";
            ("</div>");
            ("</div>");

            $("#projects").append(projectDiv);
        });
    });


    //smooth scrolling
        $('a[href^="#"]').on('click', function (e) {
                    e.preventDefault();

                    var target = this.hash;
                    var $target = $(target);

                    $('html, body').animate({
                        'scrollTop': $target.offset().top
                    }, 500, 'swing');
                });

});



// landing page animation
$(function(){
    $('.a-landing-header-text').addClass('animated-4s fadeInUp');
  
    setTimeout(function() { 
      $('.a-landing-sub-text').show().addClass('animated-3s slideInUp');
    }, 500);

    setTimeout(function() { 
        $('.a-nav').show().addClass('animated-2s bounceInDown');
      }, 500);

      setTimeout(function() { 
        $('.a-btn').show().addClass('animated-2s bounceInUp');
      }, 500);
      
  });

