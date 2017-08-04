function getData(){
    var searchtext = $("#searchBox").val();
    console.log(searchtext);
    var remoteUrlWithOrigin = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
    remoteUrlWithOrigin = remoteUrlWithOrigin + searchtext;
    $.ajax({
        url: remoteUrlWithOrigin,
        dataType: 'jsonP',
        type: 'GET',
        success: function(r) {
            console.log(r);
            if (typeof r === 'string') {
                r = JSON.parse(r); 
            }
            //alert(r.query.pages.length);
            var search_result_list = [];
            // convert object into a list
            Object.keys(r.query.pages).forEach(function(key) {
                // pushed results into a list array
                search_result_list.push(r.query.pages[key]);
            });
            // console.log(search_result_list);
            // delete any existing table data
            var table = $('#results_table').DataTable();    
            table.destroy();
            // repopulate the table
            $('#results_table').DataTable({
                data: search_result_list,
                columns: [
                    { data: "title" },
                    { data: "extract" }
                ]
            });
        }, 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(textStatus + " : " + errorThrown);
        }
    });
}


    
