var database = firebase.database();
var myDataRef = new Firebase("https://{}.firebaseio.com/");

var fire_uid = [];

myDataRef.orderByChild("uid").on("value", function(data) {
    data.forEach(function(element) {
        fire_uid.push(element.key());
    });
    domo.get(`/data/v1/data_ds?filter=buzz=y`,{format: 'array-of-objects'}).then(function(data){
        if (data.length > 0){
            console.log(data);
            for(var i = 0; i < data.length; i++){
                if(fire_uid.includes(data[i].uid)){
    
                }
                else{
                    setTimeout(function timer(){
                    var bucket = data[i].bucket;
                    var comment = data[i].comment2;
                    var message = `@all ${bucket}: ${comment}`;
                    request = $.ajax({
                        url: `https://script.google.com/macros/s/{}/exec?msg=${message}`,
                        error: function(error){
                            console.log(error);
                        },
                        dataType: 'json',
                        success: function(data) {
                            console.log('success SPAM ALL THE PEOPLE!!');
                        },
                        type: "post"
                    });  
                    var id = data[i].uid;
                    firebase.database().ref(`${id}`).push({    
                        data: comment
                    });
                    }, i * 5000);
                }
            
                
            }
        }
    });
});
