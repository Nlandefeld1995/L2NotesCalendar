function get_data(){
    var input = document.getElementById("text_search");
    text = input.value;
    if(text.length > 0 ){
        alertsData = [];
        carduiData = [];
        connectorData = [];
        dataflowData = [];
        dataqueryData = [];
        workbenchData = [];
        otherData = [];
        var ull = `/data/v1/data_ds?filter=comment~'${text}',bucket=`;
        request_data(ull);
    }
    else {
        alertsData = [];
        carduiData = [];
        connectorData = [];
        dataflowData = [];
        dataqueryData = [];
        workbenchData = [];
        otherData = [];
        var ull = `/data/v1/data_ds?filter=bucket=`;
        request_data(ull);
    }
}
function request_data(ull){
    domo.get(`${ull}Alerts-Mobile`,{format: 'array-of-objects'}).then(function(data){
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].date_1).valueOf();
            var j = {
                eventType: 'alerts',
                title: 'Alerts/Mobile',
                start: date,
                entries: [
                    {
                        id: i,
                        name: data[i].name,
                        status: data[i].date,
                        comment: data[i].comment
                    }

                ]
            }
            alertsData.push(j);
        }		
        calendar.fetchEvents();
    });
    domo.get(`${ull}Card-UI`,{format: 'array-of-objects'}).then(function(data){
        console.log(    `${ull}Card-UI`);
        console.log(data)
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].date_1).valueOf();
            var j = {
                eventType: 'cardui',
                title: 'Cards/UI',
                start: date,
                entries: [
                    {
                        id: i,
                        name: data[i].name,
                        status: data[i].date,
                        comment: data[i].comment
                    }

                ]
            }
            carduiData.push(j);
        }		
        calendar.fetchEvents();
    });

    domo.get(`${ull}Connector`,{format: 'array-of-objects'}).then(function(data){
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].date_1).valueOf();
            var j = {
                eventType: 'connector',
                title: 'Connectors',
                start: date,
                entries: [
                    {
                        id: i,
                        name: data[i].name,
                        status: data[i].date,
                        comment: data[i].comment
                    }

                ]
            }
            connectorData.push(j);
        }	
        calendar.fetchEvents();	
    });

    domo.get(`${ull}Dataflow`,{format: 'array-of-objects'}).then(function(data){
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].date_1).valueOf();
            var j = {
                eventType: 'dataflow',
                title: 'DataFlows',
                start: date,
                entries: [
                    {
                        id: i,
                        name: data[i].name,
                        status: data[i].date,
                        comment: data[i].comment
                    }

                ]
            }
            dataflowData.push(j);
        }		
        calendar.fetchEvents();
    });

    domo.get(`${ull}DataQuery`,{format: 'array-of-objects'}).then(function(data){
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].date_1).valueOf();
            var j = {
                eventType: 'dataquery',
                title: 'DataQuery',
                start: date,
                entries: [
                    {
                        id: i,
                        name: data[i].name,
                        status: data[i].date,
                        comment: data[i].comment
                    }

                ]
            }
            dataqueryData.push(j);
        }		
        calendar.fetchEvents();
    });
    domo.get(`${ull}WorkBench`,{format: 'array-of-objects'}).then(function(data){
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].date_1).valueOf();
            var j = {
                eventType: 'workbench',
                title: 'WorkBench',
                start: date,
                entries: [
                    {
                        id: i,
                        name: data[i].name,
                        status: data[i].date,
                        comment: data[i].comment
                    }

                ]
            }
            workbenchData.push(j);
        }
        calendar.fetchEvents();		
    });
    domo.get(`${ull}Other`,{format: 'array-of-objects'}).then(function(data){
        for(var i = 0; i < data.length; i++){
            var date = new Date(data[i].date_1).valueOf();
            var j = {
                eventType: 'other',
                title: 'Other',
                start: date,
                entries: [
                    {
                        id: i,
                        name: data[i].name,
                        status: data[i].date,
                        comment: data[i].comment
                    }

                ]
            }
            otherData.push(j);
        }		
        calendar.fetchEvents();
    });
}