let machine1 = {
    name : "machine1",
    user : "",
    lock : [],
    basket : ""
};

let machine2 = {
    name : "machine2",
    user : "",
    lock : [],
    basket : ""
};
let index = 0 ; //for new machine name -> ex: Machine+${index}



function setup() {
    createCanvas(400, 400);


    io().on('new_user', function (message) {
        console.log(message);
        switch(message.machine){
            case "machine1" :
                machine1.lock.push(message.username);
                console.log(machine1.lock)
                break;
            case "machine2":
                machine2.lock.push(message.username);
                console.log(machine2.lock)
                break;
            default:
                console.log("something error");
                break;
        }
    });

}

function draw() {
    // stroke(c);
    // ellipse(x, y, r); // 畫出圓形
    background(100);
    textSize(32);
    text("123",25,60);
}
