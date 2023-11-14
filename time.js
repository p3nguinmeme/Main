function getTime(){
    const date = new Date();

    const time = document.getElementById("time");
    let hour = date.getHours();
    let min = date.getMinutes();

    //add leading 0
    if (hour < 10){
        hour = "0"+ hour.toString();
    }
    if (min < 10){
        min = "0"+ min.toString();
    }
    let result = hour + ":" + min;
    time.innerHTML = result;

    const time2 = document.getElementById("time2");
    let day = date.getDay();
    let month = date.getMonth();
    //add leading 0
    if (day < 10){
        day = "0"+ day.toString();
    }
    if (month < 10){
        month = "0"+ month.toString();
    }
    result = day + "/" + month;
    time2.innerHTML = result
    console.log("ping!");
}
getTime();
//continuously fires script every 60 seconds
setInterval(getTime, 1000 * 60);