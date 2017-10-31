
'user strict';
//document.getElementById('myForm').addEventListener("submit", saveBookmark());

document.forms[0].addEventListener("submit", saveBookmark);

function saveBookmark  (e) {
    var sitename = document.forms[0].elements[0].value;
    var siteurl=document.forms[0].elements[1].value;

    if(!validateForm(sitename,siteurl)){
        return false;
    } 
  
    var bookMark ={
        name: sitename,
        url: siteurl
    };

    if(localStorage.getItem('bookmarks')=== null){
        
        var bookMarks=[];
       bookMarks.push(bookMark);
      
       localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
      
    }else{
        var bookMarks=JSON.parse(localStorage.getItem('bookmarks'));

       bookMarks.push(bookMark);
       
        localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
       

    }
    
    document.forms[0].reset();
    fetchBookmarks();
   // e.preventDefault();
    
}

function deletebookMark(url){
    var bookMarks=JSON.parse(localStorage.getItem('bookmarks'));
    var bookMarksResults =document.getElementById('bookmarkResult');
    console.log(url);
    for(var i=0;i<bookMarks.length;i++){
        
        if(bookMarks[i].url==url){
         bookMarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
    bookMarksResults.innerHTML="";
    fetchBookmarks();
}
function fetchBookmarks(){
    var bookMarks=JSON.parse(localStorage.getItem('bookmarks'));
    var bookMarksResults =document.getElementById('bookmarkResult');
    bookMarksResults.innerHTML="";
    for(var i=0;i<bookMarks.length;i++){
        var name=bookMarks[i].name;
        var url=bookMarks[i].url;
        bookMarksResults.innerHTML += '<div class="card w-75 card-body bg-light">'+
                                        '<h3 class="card-title">'+name+'<a class="btn btn-primary" target="_blank" href="'+url+'">'+
                                        'Visit</a> '+' <a onclick="deletebookMark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'
                                        +'</h3>'+
                                        '</div>';
                                        
    }
}

function validateForm(sitename,siteurl){
  
    if(!siteurl||!sitename){
        alert('Please fill in the form');
        return false;
    }

    var expression=/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteurl.match(regex)){
        alert('Please give a valid url');
        return false;
    }
    return true;
}