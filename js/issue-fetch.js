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
                var link = 'https://github.com/'+user+'/'+repo+'/issues?q=is:issue is:open label:"' + this.name + '"';
                labels += '<a href=\'' + link + '\' target="_blank" class="btn label-btn btn-warning">' + this.name +'</a> &nbsp;';
            });

            var issue_markup = '<div class="col col-12 col-sm-4 col-md-4 col-lg-4 total">' +
                                    '<div class="issue">' +
                                         '<blockquote>' +
                                                '<p><a class="issue-a-title" href="'+issue_url+'" target="_blank">' + title + '</a></p>' +
                                                '<div><a class="issue-a" href="' + author_url +'" target="_blank">' + author + '</a>  <b> in </b>  <a href="' + repo_url + '" target="_blank">' + repo_name + '</a></div>' +
                                            '</blockquote>' +
                                            labels +
                                        '</div>' +
                                    '</div><br>' +
                                '</div>';


                                
              
            $('#' + user + '-' + repo + '-issues').append(issue_markup);
        });

        if ($('#' + user + '-' + repo + '-issues > div').length % per_page !== 0) {
            $('#' + user + '-' + repo + '-load-more').remove();
        }
    });
}