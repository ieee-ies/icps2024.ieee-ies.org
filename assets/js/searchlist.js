 document.getElementById("submitSearch").addEventListener("click", function(event){
    event.preventDefault();
     var foundslots=0;
     input = document.getElementById("filterInput");
     filter = input.value.toUpperCase();
     
     // check for empty value 
     if(filter.length<1) return;

     lis=document.getElementsByClassName("timeslotgroup");
     
     Array.prototype.filter.call(lis,function(schev) {
         var thisslotgroup=false;
         lisslots=schev.getElementsByClassName("slotinlist");
         Array.prototype.filter.call(lisslots,function(sl) {
            if(sl.nodeName==="SPAN") return; // ignore span elements and use only li
            content=sl.getElementsByClassName("cd-schedule__content")[0];
            textcontent=content.textContent || content.innerText;
            title=sl.getElementsByClassName("cd-schedule__name")[0];
            titlecontent=title.textContent || title.innerText;

            if (textcontent.toUpperCase().indexOf(filter) <= -1 && titlecontent.toUpperCase().indexOf(filter) <= -1) { // not there
                sl.style.display="none";
                //schev.style.filter="opacity(15%)";
            } else {
              sl.style.display="block";
              //schev.style.filter="brightness(100%)";
              foundslots++;
              thisslotgroup=true;
            }
        });
        if(!thisslotgroup) {
            schev.style.display="none";
            
        }
         
    });
    res=document.getElementById("searchResults")
    res.innerHTML="Found "+foundslots+" slots";
  
});
 
 document.getElementById("resetSearch").addEventListener("click", function(event){
    event.preventDefault();
    input = document.getElementById("filterInput");
    input.value="";
    
    lis=document.getElementsByClassName("timeslotgroup");
     
    Array.prototype.filter.call(lis,function(schev) {
            lisslots=schev.getElementsByClassName("slotinlist");
            Array.prototype.filter.call(lisslots,function(sl) {
                sl.style.display="block";
            });
            //schev.style.filter="brightness(100%)";
            schev.style.display="block";

    });   
    
    res=document.getElementById("searchResults")
    res.innerHTML="";
    
 });
 
