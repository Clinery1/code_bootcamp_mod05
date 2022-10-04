function Planner(save_name) {
    if (typeof save_name!=="string") {
        save_name="planner";
    }
    let raw_hours=localStorage.getItem(save_name);
    if (raw_hours===null||raw_hours===undefined) {
        // set it to a blank list of 24 strings
        raw_hours="[]";
    }
    let hours=JSON.parse(raw_hours);
    if (hours.length!==24||hours===undefined||hours===null) {
        hours=["","","","","","","","","","","","","","","","","","","","","","","",""];
    }
    for (let i=0;i<24;i+=1) {
        if (typeof hours[i]!=="string") {
            hours[i]="";
        }
    }
    return {
        save_name:save_name,
        // 24 hours of empty plans
        hours:hours,
        clear:function() {
            for (let i=0;i<24;i+=1) {
                this.hours[i]="";
            }
        },
        set:function(hour,string) {
            this.hours[hour]=string;
        },
        get:function(hour) {
            return this.hours[hour];
        },
        save:function() {
            let raw_hours=JSON.stringify(this.hours);
            localStorage.setItem(this.save_name,raw_hours);
        },
    };
}
