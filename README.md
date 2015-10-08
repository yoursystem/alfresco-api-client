# Documentation

## Config

var config = {
      "host": "",
      "user": "",
      "password": ""
};

## Login
   alfresco.loginPromise(config).then(function(alf_ticket){
    console.log(alf_ticket)
   })


## Validate ticket
   alfresco.ticket(function(result){
    console.log(result)
});

## Get thumbnail
   alfresco.getThumbnailsContentPromise('workspace://SpacesStore/102e7e21-26fd-4f5f-9413-499bed115ae8', 'imgpreview').then(function(result) {
     console.log(result);
   }, function(err){console.log(err)});


## Get site by shortname"
   alfresco.getSiteByShortnamePromise(shortname).then( function(site){
       console.log(site);
   },function(err){console.log(err)});
 });


## Process get site document Library
   alfresco.getDocumentLibraryForSiteByShortname(shortname).then( function(result){
      console.log(result);
   },function(err){console.log(err)});



## create folder site via API

   alfresco.createFolderPromise( nodeRef, 'test', 'test-title' , 'test-description').then( function(result){
     console.log(result);
   },function(err){console.log(err)});
 })

## create file site via API"
   var path = PATHTOFILE;
   alfresco.createDocumentPromise(folder.nodeRef, path).then( function(file){
      console.log(result);
   },function(err){console.log(err)});
 })


## Logout ticket
   alfresco.logout(function(result){
    console.log(result);
   });


# Use cases

## Get content

  alfresco.loginPromise(config).then(function(alf_ticket) {
    console.log("GET content for alfresco nodeRef -> " + nodeRef);
    alfresco.getContentPromise(nodeRef).then(function(result) {
       console.log(result);
    }, function(err) {
      console.log(err);
    });
  }


## Get content URL

    alfresco.loginPromise(config).then(function(alf_ticket) {
      console.log("GET content for alfresco nodeRef -> " + nodeRef);
      alfresco.getContentUrl(nodeRef)
    }, function(err) {
      console.log(err);
    });



## Get thumbnail

   alfresco.loginPromise(config).then(function(alf_ticket) {
      console.log("GET content for alfresco nodeRef -> " + nodeRef);
      alfresco.getContentPromise(nodeRef).then(function(result) {
         console.log(result);
      }, function(err) {
        console.log(err);
      });
    }
