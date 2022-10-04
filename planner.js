function Planner(save_name) {
    if (save_name===null||save_name===undefined) {
        save_name="planner";
    }
    let raw_hours=localStorage.getItem(save_name);
    if (raw_hours===null||raw_hours===undefined) {
        // set it to a blank list of 24 strings
        raw_hours="[]";
    }
    let hours=JSON.parse(raw_hours);
    if (hours.length!==24) {
        hours=["","","","","","","","","","","","","","","","","","","","","","","",""];
    }
    return {
        save_name:save_name,
        // 24 hours of empty plans
        hours:hours,
        clear:()=>{
            for (let i=0;i<24;i+=1) {
                this.hours[i]="";
            }
        },
        set:(hour,string)=>{
            this.hours[hour]=string;
        },
        get:(hour)=>{
            return this.hours[hour];
        },
        save:()=>{
            let raw_hours=JSON.toString(this.hours);
            localStorage.setItem(this.save_name,raw_hours);
        },
    };
}
