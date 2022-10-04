// Requires jQuery


// Set the time in all of the clocks
function set_time() {
    let second=moment().second();
    let minute=moment().minute();
    let hour24=moment().hour()+(minute/60);
    let hour=hour24%12;
    let am_pm=$(".analogClockFinished")
        .children()
        .filter(".am_pm");
    if (hour24>=12) {
        am_pm.text("PM");
    } else {
        am_pm.text("AM");
    }
    $(".analogClockFinished")
        .children()
        .filter(".minute")
        // offers smooth movement
        .css("transform","rotate("+String((6*minute)+(0.1*second))+"deg)");
    $(".analogClockFinished")
        .children()
        .filter(".second")
        .css("transform","rotate("+String(6*second)+"deg)");
    $(".analogClockFinished")
        .children()
        .filter(".hour24")
        .children()
        .filter(".hour24Hand")
        .css("transform","rotate("+String(15*hour24)+"deg)");
    $(".analogClockFinished")
        .children()
        .filter(".hour")
        .css("transform","rotate("+String(30*hour24)+"deg)");
}
// Add any new clocks to the update list and initialize them
function add_clocks() {
    let hour24_clocks=$(".analogClock")
        .children()
        .filter(".hour24");
    hour24_clocks.append($("<div>").addClass("hour24Hand"));
    for (let i=0;i<24;i+=1) {
        hour24_clocks.append($("<div>").addClass("tick").css("transform","rotate("+String(15*i)+"deg)"));
    }
    let clocks=$(".analogClock");
    clocks.addClass("analogClockFinished");
    clocks.removeClass("analogClock");
    for (let i=0;i<60;i+=1) {
        let tick=$("<div>").addClass("tick").css("transform","rotate("+String(6*i)+"deg)");
        if (i%5==0) {
            tick.addClass("longTick");
        }
        clocks.append(tick);
    }
}


// Start ticking
setInterval(set_time,1000);
add_clocks();
// Set the time so it doesn't take a second for it to update
set_time();
