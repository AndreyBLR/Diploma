

function initializeResources() {
    var resources;

    if (localStorage.getItem('language') == null)
        localStorage.setItem('language', 'en');

    var lang = localStorage.getItem('language');
    var page = window.location.pathname.split("/").pop().split('.')[0];

    $.ajax({ 
        url:  'lang/' + lang + '/' + page + '.json', 
        dataType: 'json', async: false, dataType: 'json', 
        success: function (jsonContent) { 
            console.log('success');
            resources = jsonContent
        },
        error: function (jqXHR, textStatus, errorThrown) { 
            console.log('error');
        }
    });

    return resources;
}
        
function setLanguage(lang) {            
    localStorage.setItem('language', lang);
    window.location.reload(true); 
}

$(document).ready(function(){
    var resources = initializeResources();

    for (var property in resources) {
        $('#'+ property).text(resources[property])
    }
});