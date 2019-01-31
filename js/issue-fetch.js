var per_page = 15;

function loadMoreIssues(user, repo) {
    // Which set of issues (page number) to be loaded is determined by how many issues are already loaded
    var page = Math.ceil($('#' + user + '-' + repo + '-issues > div').length / per_page) + 1;


    $.getJSON("https://api.github.com/repos/" + user + "/" + repo +"/issues?q=state:open&page=" + page + "&per_page=" + per_page, function(data) {
        // Callback function

        // Iterate over each issue
        $(data).each(function(index) {
            if (this.pull_request) {
                // If this issue is a pull request, append empty div and continue
                $('#' + user + '-' + repo + '-issues').append("<div></div>");
                return;     // Equivalent to continue in jQuery
            }

            var issue_url = this.html_url;
            var title = this.title;
            var author = this.user.login;
            var author_url = this.user.html_url;
            var labels = "";
            var issue_type = '<a href="' + issue_url + '" target="_tab"><i class="pull-right fa fa-2x fa-external-link"></i></a>';
            var repo_url = "https://github.com/" + user + "/" + repo;
            var repo_name = repo;

            $(this.labels).each(function(index) {
                labels += '<button class="btn btn-c btn-secondary btn-sm">' + this.name + ' </button> <br\>';
            });

            var issue_markup = 
            ' <div class="card-col col-md-4 col-xs-12">' +
            '<div class="card card-c pb-5" style="width: 18rem;height: 100%;">' +
            '<div class="card-body">' +
                '<a class="card-title card-title-c" href="' +issue_url+  '">' +title+ '</a> <br\>' +
                '<a class="card-subtitle card-subtitle-c mb-2 text-muted" href="' +author_url+ '">'+author+' in </a>' +
                '<a class="card-text card-text-c" href="'+repo_url+'">'+repo_name+'</a> <br\>' +
                '<a class="card-link card-link-c">' +labels+ '</a>' +
            '</div>' +
            '</div>' +
            '</div>' ;

            $('#' + user + '-' + repo + '-issues').append(issue_markup);
        });

        if ($('#' + user + '-' + repo + '-issues > div').length % per_page !== 0) {
            $('#' + user + '-' + repo + '-load-more').remove();
        }
    });
}