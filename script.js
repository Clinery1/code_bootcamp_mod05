const CONTAINER=$("#container");
var planner=Planner();


let day=Number(localStorage.getItem("day"));
// If the current day is not the day stored in localStorage, then reset the planner
if (day===moment().date()) {
    localStorage.setItem("day",String(moment().date()));
    planner.clear();
    planner.save();
}
/*
<section class="time_block">
    <h1 class="hour">1</h1>
    <textarea></textarea>
    <button class="saveBtn">
        <i class="fa-solid fa-floppy-disk"></i>
    </button>
</section>
*/
for (let i=0;i<24;i+=1) {
}
