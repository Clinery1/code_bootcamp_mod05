const CONTAINER=$("#container");
const DAY_CONTAINER=$("#currentDay");


var planner=Planner();


// Update the date, localStorage, and planner if it needs to be updated.
function update_day() {
    let day=Number(localStorage.getItem("day"));
    // If the current day is not the day stored in localStorage, then reset the planner
    if (day!==moment().date()) {
        localStorage.setItem("day",String(moment().date()));
        planner.clear();
        planner.save();
    }
    let now=moment();
    DAY_CONTAINER.text(moment().format("dddd, MMMM Do YYYY"));
    display_planner();
}
// Displays all 24 hours of the planner
function display_planner() {
    for (let i=0;i<24;i+=1) {
        CONTAINER.children().eq(i).children().eq(1).val(planner.get(i));
    }
}
// Updates the hour's colors
function update_hour() {
    let hour=moment().hour();
    for (let i=0;i<24;i+=1) {
        let hour_el=CONTAINER.children().eq(i).children().eq(1);
        if (hour===i) {
            hour_el.addClass("present");
            hour_el.removeClass("future");
        } else if (hour>i) {
            hour_el.addClass("past");
            hour_el.removeClass("present");
            hour_el.prop("disabled",true);
        } else if (hour<i) {
            hour_el.addClass("future");
        }
    }
}
// Saves the planner
function save() {
    planner.save();
}
// Updates the planner with the textarea's value
function update_planner(i) {
    planner.set(i,CONTAINER.children().eq(i).children().eq(1).val());
}
// Set a timeout to update the hour's colors and day, if needed.
function set_hourly_update() {
    update_hour();
    let now=moment();
    let seconds_till_next_hour=((59-now.minute())*60)+(59-now.second());
    let day=Number(localStorage.getItem("day"));
    if (day!==now.day()) {
        update_day();
    }
    setTimeout(set_hourly_update,seconds_till_next_hour*1000);
}


// Create the 24 hour boxes
for (let i=0;i<24;i+=1) {
    CONTAINER.append(
        $("<section>")
            .addClass("time_block")
            .append(
                $("<h1>")
                .addClass("hour")
                .text(String(i))
            )
            .append($("<textarea>").focusout(function(){update_planner(i)}))
            .append(
                $("<button>")
                .addClass("save_btn")
                .click(save)
                .append(
                    $("<i>")
                        .addClass("fa-solid")
                        .addClass("fa-floppy-disk")
                )
            )
    );
}
// Start the hourly update timer
set_hourly_update();
// Set the data
update_day();
// Display the planner's values in the textareas
display_planner();
