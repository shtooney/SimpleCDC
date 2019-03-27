({
    //Inspired from: http://bobbuzzard.blogspot.com/2018/08/lightning-emp-api-in-winter-19.html
    
    init : function(component, event, helper) {
        var empApi = component.find("empApi");
        
        // Error handler function that prints the error to the console.
        var errorHandler = function (message) {
            console.log("Received error ", message);
        }.bind(this);
        
        // Register error listener and pass in the error handler function.
        empApi.onError(errorHandler);
        
        var channel='/data/Quote__ChangeEvent';
        var sub;
        
        // new events
        var replayId=-1;
        

        
        var callback = function (message, data) {

            var infoDescribe = message.data.payload.Name;
            if(infoDescribe == null){
                infoDescribe = ""
            }
            
			component.find('notifLib').showToast({
            	"variant": "success",
                "title": "Quote Changed!",
                "message":  message.data.payload.ChangeEventHeader.changeType + 
                			" of Quote " + 
                			infoDescribe + " for " + 
                            message.data.payload.Amount__c + " of type " +
                            message.data.payload.Type__c
        		});        
        }.bind(this);

        

        empApi.subscribe(channel, replayId, callback).then(function(value) {
            console.log("Subscribed to channel " + channel);
            sub = value;
            component.set("v.sub", sub);
        });
    }
 })
