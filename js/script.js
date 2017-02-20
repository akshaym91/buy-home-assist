function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    var streetview_url = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=" + address + "";

    $body.append('<img class="bgimg" src="' + streetview_url + '">');

    var url_nyt = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    url_nyt += '?' + $.param({
        'api-key': 'f9d9a8c5454247eb857af4ae7c99cf99'
    });
    $.getJSON(url_nyt, function(data) {
        var items = [];
        var articles = data.response.docs;
        $.each(articles, function(index, val) {
            items.push("<li id='" + index + "'>" + val.snippet + "</li>");
        });
        $('<ul/>', {
            'class': 'my-new-list',
            html: items.join('')
        }).appendTo($nytHeaderElem);
    }).error(function() {
        console.log('Error');
        $('<h2/>', {
            'class': 'error',
            html: 'Failed to load NY Times articles.'
        }).appendTo('body');
    });

    var url_wiki = 'https://en.wikipedia.org/w/api.php';
    url_wiki += '?' + $.param({
        'action': 'opensearch',
        'search': city,
        'prop': 'revisions',
        'rvprop': 'content',
        'format': 'json',
        'callback': '?'
    });
    $.ajax(url_wiki, {
        dataType: 'jsonp',
        success: function(result_wiki) {
            console.log(result_wiki);
            var items =[];
            $.each(result_wiki[1], function(index, val) {
                items.push("<li id='" + index + "'><a href='"+result_wiki[3]+"'>" + val + "</a></li>");
            });
            $('<ul/>', {
                'class': 'wiki-article-links',
                html: items.join('')
            }).appendTo($wikiElem);
        }
    });



    return false;
};

$('#form-container').submit(loadData);