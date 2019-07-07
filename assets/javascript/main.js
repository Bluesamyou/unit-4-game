$( document ).ready(function() {
   const characters = {
       yoda : {
           displayName : "Yoda", 
           image : "http://comic-cons.xyz/wp-content/uploads/Star-Wars-avatar-icon-Yoda.png"
       }, 
       luke : {
        displayName : "Luke Skywalker", 
        image : "http://comic-cons.xyz/wp-content/uploads/Star-Wars-avatar-icon-Luke-Skywalker.png"
       }, 
        chewie : {
        displayName : "Chewbacca", 
        image : "http://comic-cons.xyz/wp-content/uploads/Star-Wars-avatar-icon-Chewbacca.png"
       }, 
       han : {
        displayName : "Han Solo", 
        image : "http://comic-cons.xyz/wp-content/uploads/Star-Wars-avatar-icon-Han-Solo.png"
       },
       r2 : {
        displayName : "R2-D2", 
        image : "http://comic-cons.xyz/wp-content/uploads/Star-Wars-avatar-icon-R2D2.png"
       }
       

   }


    Object.keys(characters).map(function(character){
        var appendCard = $('<div>').attr({class: "card", value : character})
        
        appendCard.append(`<img src="${characters[character].image}" alt="card image" class="rounded-circle card-image" width="120" height="120"> `)

        appendCard.append(`<h5 class="title">${characters[character].displayName}</h5>`)

        $('.container-card').append(appendCard)

    })

    $('.card').on("click", function(){
        alert($(this).attr("value"));
    });
    





});

