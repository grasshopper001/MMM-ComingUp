Module.register("MMM-ComingUp",{
    defaults:{
        post:{
            number: 0,
			content: "no posts yet",
			name: "Schindler",
			avatar: "./modules/MMM-ComingUp/public/Schindler.jpg",
			id: undefined
        }
    },
    start:function(){
        this.post=this.config.post;
    },
    getStyles:function(){
        return ["MMM-ComingUp.css"];
    },
    getDom:function(){
        var wrapper=document.createElement("div");
        wrapper.id="ComingUp-wrapper";
        var html=`
            <div id="ComingUp">
            <p id="title"><img id="photo" src=${this.post.avatar} alt="not connected"></img>${this.post.name}:</p>
            <p id="text">${this.post.content}</p>
            </div>
        `;
        wrapper.insertAdjacentHTML("afterbegin",html);
        return wrapper;
    },
    notificationReceived:function(notification,payload,sender){
        switch(notification){
            case "DOM_OBJECTS_CREATED":
                setInterval(()=>{
                    this.sendSocketNotification("update comingUp");
                },3000)
            break;
            default:
                break;
        }
    },
    socketNotificationReceived:function(notification,payload){
        switch(notification){
            case "comingUp":
                this.post=payload;
                this.updateDom();
                break;
            default:
                break;
        }
    },
})