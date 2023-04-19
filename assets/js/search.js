 document.getElementById("submitSearch").addEventListener("click", function(event){
    event.preventDefault();
     var foundslots=0;
     input = document.getElementById("filterInput");
     filter = input.value.toUpperCase();
     
     // check for empty value 
     if(filter.length<1) return;
                                                          
     lis=document.getElementsByClassName("cd-schedule__event");
     
     Array.prototype.filter.call(lis,function(schev) {
            content=schev.getElementsByClassName("cd-schedule__content")[0];
            textcontent=content.textContent || content.innerText;
            title=schev.getElementsByClassName("cd-schedule__name")[0];
            titlecontent=title.textContent || title.innerText;
            if (textcontent.toUpperCase().indexOf(filter) <= -1 && titlecontent.toUpperCase().indexOf(filter) <= -1) { // not there
                //schev.style.display="none";
                schev.style.filter="opacity(15%)";
            } else {
              //schev.style.display="block";
              schev.style.filter="brightness(100%)";
              foundslots++;
            }
    });
    res=document.getElementById("searchResults")
    res.innerHTML="Found "+foundslots+" slots";
  
});
 
 document.getElementById("resetSearch").addEventListener("click", function(event){
    event.preventDefault();
    input = document.getElementById("filterInput");
    input.value="";
    
    lis=document.getElementsByClassName("cd-schedule__event");
     
    Array.prototype.filter.call(lis,function(schev) {
            content=schev.getElementsByClassName("cd-schedule__content")[0];
            schev.style.filter="brightness(100%)";
            //schev.style.display="block";

    });   
    
    res=document.getElementById("searchResults")
    res.innerHTML="";
    
 });
 
