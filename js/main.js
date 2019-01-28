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

        //variables for pagination
        let current_page = 1;
        var per_page = 12;
        var  participants = [];
        all_participants = data.participants;

        // sort participants alphabetically
        all_participants.sort((p1, p2) => {
            if (p1.name.toLowerCase() < p2.name.toLowerCase()) {
                return -1;
            }
            if (p1.name.toLowerCase() > p2.name.toLowerCase()) {
                return 1;
            }
        });
        
        // for first page
        if(current_page === 1){
            let no_pages = numPages();
            let shw_no_pages = [];
            for(let i = 1 ; i<=no_pages; i++){
                    var data  = "<li class='page-item'>"+
                                    "<a class='page-link page-click'"+ 
                                    ">"+
                                    i+
                                    "</a>"+
                                    "</li>";
                    shw_no_pages.push(data);
                 
            }
            
            $("#pagination").after(shw_no_pages);
             participants = all_participants.slice(current_page-1, (current_page-1)+per_page);
             loadpage();
        }

        //this function count number of pages are required 
        function numPages(){
            let no_pages = Math.ceil(all_participants.length/per_page);
            return parseInt(no_pages);  
        }

        //when click the next
        $('.next').bind("click",function(event){
        if (current_page < numPages()) {
                current_page++;
            $(this).removeClass('disabled');
            $('.prev').removeClass('disabled');
            $("#participants").empty();
            participants = all_participants.slice((current_page-1)*per_page, (current_page-1)*per_page+per_page);
            loadpage();
        }
        });

        //when click the previous
        $('.prev').bind("click",function(event){
            if (current_page > 1) {
                current_page--;
            $('.prev').removeClass('disabled');
            $(this).removeClass('disabled');
            participants = all_participants.slice((current_page-1)*per_page, (current_page-1)*per_page+per_page);
            loadpage(); 
            }
        });

        //when click the page number
        $('.page-click').bind("click", function(event) {
            event.preventDefault();
            $('.next').removeClass('disabled');
            $('.prev').removeClass('disabled');
            current_page = $(this).text();
            current_page = parseInt(current_page);
            $("#participants").empty();
            participants = all_participants.slice((current_page-1)*per_page, (current_page-1)*per_page+per_page);
            loadpage();
        }); 

    //this function load the data
    function loadpage(){
        //show the active page
        let active_page = ".pagination-participants li:nth-child(" + (current_page+1) + ")";
        $('.pagination-participants').find('.active').removeClass('active');
        $(active_page).addClass('active');

        //disable previous button when page number is 1
        if(current_page === 1){
            $('.prev').addClass('disabled');
        }

        //disable next button
        if(current_page === numPages()){
            $('.next').addClass('disabled');
        }

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

            // check if social media links available otherwise disable them 
            
            if (
                /^ *$/.test(participant.facebook) ||
                participant.facebook == ""
            ) {
                //regex to check empty string or spaces
                participant.facebook = "javascript:void(0);";

            } else {
                var url = participant.facebook;

                try {
                    var http = new XMLHttpRequest();
                    http.open("HEAD", url, false);
                    http.send();

                    if (http.status == 404) {
                        participant.facebook = "javascript:void(0);";
                    }
                } catch (err) {}
            }

            if (
                /^ *$/.test(participant.github) ||
                participant.github == ""
            ) {
                //regex to check empty string or spaces
                participant.github = "javascript:void(0);";

            } else {
                var url = participant.github;

                try {
                    var http = new XMLHttpRequest();
                    http.open("HEAD", url, false);
                    http.send();

                    if (http.status == 404) {
                        participant.github = "javascript:void(0);";
                    }
                } catch (err) {}
            }

            if (
                /^ *$/.test(participant.twitter) ||
                participant.twitter == ""
            ) {
                //regex to check empty string or spaces
                participant.twitter = "javascript:void(0);";

            } else {
                var url = participant.twitter;

                try {
                    var http = new XMLHttpRequest();
                    http.open("HEAD", url, false);
                    http.send();

                    if (http.status == 404) {
                        participant.twitter = "javascript:void(0);";
                    }
                } catch (err) {}
            }

            var participantDiv =
                  "<div class='col-lg-2 col-sm-6 text-center mb-4'>" +
                "<div class='card participant-card'>" +
                "<div class = 'side'>" +
                "<img class='card-img-top participant-img img-fluid' src=" +
                participant.imageurl +
                " alt=''>" +
                "<div class='card-body project-card-body'>" +
                "<h4 class='card-title card-name'>" +
                participant.name +
                "</h4>" +
                "<p class='card-text card-college'>" +
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
    }
    });

    $.getJSON(projectsJson, function(data) {
        //variables for pagination
        let current_page = 1;
        var per_page = 8;
        var  projects = [];
        all_projects = data.projects;

        // for first page
        if(current_page === 1){
            let no_pages = numPages();
            let shw_no_pages = [];
            for(let i = 1 ; i<=no_pages; i++){
                    var data  = "<li class='page-item'>"+
                                    "<a class='page-link project-page-click'"+ 
                                    ">"+
                                    i+
                                    "</a>"+
                                    "</li>";
                    shw_no_pages.push(data);
                 
            }
            
            $("#pagination-project").after(shw_no_pages);
             projects = all_projects.slice(current_page-1, (current_page-1)+per_page);
             loadpage();
        }

        //this function count number of pages are required 
        function numPages(){
            let no_pages = Math.ceil(all_projects.length/per_page);
            return parseInt(no_pages);  
        }

        //when click the next
        $('.next-project').bind("click",function(event){
        if (current_page < numPages()) {
                current_page++;
            $(this).removeClass('disabled');
            $('.prev-project').removeClass('disabled');
            $("#projects").empty();
            projects = all_projects.slice((current_page-1)*per_page, (current_page-1)*per_page+per_page);
            loadpage();
        }
        });

        //when click the previous
        $('.prev-project').bind("click",function(event){
            if (current_page > 1) {
                current_page--;
            $(this).removeClass('disabled');
            $('.next-project').removeClass('disabled');
            $("#projects").empty();
            projects = all_projects.slice((current_page-1)*per_page, (current_page-1)*per_page+per_page);
            loadpage(); 
            }
        });

        //when click the page number
        $('.project-page-click').bind("click", function(event) {
            event.preventDefault();
            $('.next-project').removeClass('disabled');
            $('.prev-project').removeClass('disabled');
            current_page = $(this).text();
            current_page = parseInt(current_page);
            $("#projects").empty();
            projects = all_projects.slice((current_page-1)*per_page, (current_page-1)*per_page+per_page);
            loadpage();
        }); 
       
      //this function load the data
    function loadpage(){
        //show the active page
        let active_page = ".pagination-project li:nth-child(" + (current_page+1) + ")";
        $('.pagination-project').find('.active').removeClass('active');
        $(active_page).addClass('active');

        //disable previous button when page number is 1
        if(current_page === 1){
            $('.prev-project').addClass('disabled');
        }

        //disable next button
        if(current_page === numPages()){
            $('.next-project').addClass('disabled');
        }
        $.each(projects, function(i, project) {
            var projectDiv =
                "<div class='col-lg-3 col-md-4 col-sm-6 4 d-flex align-items-stretch portfolio-item'>" +
                "<div class='card h-100'>" +
                "<a href=" +
                project.github +
                "><img class='card-img-top card-img-project' src=" +
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
                "</div>"+
                "<div class='card-footer card-footer-project'>"+
                "<h5>"+
                "Mentors" +
                "</h5>"+
                "<p>" +
                project.mentors +
                "</p>" +
                "<h5>"+
                "Tech Stack" +
                "</h5>"
                "<p>" +
                project.lang +
                "</p>" +
                "</div>"+
                "</div>";
            ("</div>");
            ("</div>");

            $("#projects").append(projectDiv);
        });
    }
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

// dark mode
$(document).ready(function(){
    $('.slider').click(function(){
        $('body').toggleClass('dark')
        $('.jumbotron').toggleClass('dark-bg-img')
        $('.dark-scrl-btn').toggleClass('dark')
        $('nav,div,footer').toggleClass('dark')
        $('h2,h3,h5').toggleClass('dark')
        $('span,img,ul,li').toggleClass('dark')
        $('h1,h4,a').toggleClass('dark-landing-text')
        $('footer').toggleClass('night-footer')
        $('.footer_media').toggleClass('footer-dark')
        $('.fab-night').toggleClass('footer-dark')
        $('.night-footer-ref').toggleClass('footer-dark')
    })
})

//fork and star
var jsonData = {};
		$.ajax({
    url: "https://api.github.com/search/repositories?q=Opencode-Collaborative-19",
    type: 'GET',
    processData: false,
    success: function (data) {
    jsonData = JSON.stringify(data);
    jsonData = JSON.parse(jsonData)
    forks_count = jsonData.items[0].forks_count
    star_count    = jsonData.items[0].stargazers_count
    var fork = "<p class='badge badge-dark' style='margin:0;'>"+forks_count+"</p>";
    var star = "<p class='badge badge-dark' style='margin:0;'>"+star_count+"</p>";
    $("#fork").after(fork);
    $("#star").after(star);
    },
    error: function(){
      console.log("Cannot get data");
    }
});

// typing animation
$(function(){
    setTimeout(function() { 
      $('.typing-anim-ref').show().addClass('typing-anim');
    }, 500);
    
});

