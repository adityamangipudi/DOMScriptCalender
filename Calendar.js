

document.addEventListener('DOMContentLoaded', function () {
    var month = [];
    var hours= ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var months = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    var front_offset;
    var back_offset;
    var dayClicked =false
    function createDaysArr(){




        var today = new Date();

        var first_day = (new Date(today.getFullYear(), today.getMonth(), 1)).getDay();
        var first_date = (new Date(today.getFullYear(), today.getMonth(), 1));
        var last_date = (new Date(today.getFullYear(), today.getMonth()+1, 0))

        var last_day = last_date.getDay();

         front_offset=first_day
         back_offset=last_day


        var monthTitle= createElement('div', document.querySelector('div.calendar-title'), 'month',months[new Date().getMonth()]);
        createElement('span', monthTitle, 'year', new Date().getFullYear())

        var last_month_date = new Date(today.getFullYear(), today.getMonth(),0).getDate();


        for(var i = 0, len = 6-first_day; i< len; i++){
            month.unshift(new CustomDate(last_month_date-i, 0));
        }
        for(var i = 1, len =last_date.getDate(); i<=len; i++){
            month.push(new CustomDate(i, 1, new Schedule(i, [])));
        }
        for(var i = 0, len = 6-last_day; i<len; i++){
            month.push(new CustomDate((i+1), 2));
        }
        return month;

    }

    function createCalendar(){
        var month = createDaysArr()
        var cal_div = document.querySelector('div.calendar-days')
        month.forEach(function(day){
            var classname;
            switch(day.monthType){
                case 0:
                    classname='day prev-month'
                    break;
                case 1:
                    classname='day curr-month'
                    break;
                case 2:
                    classname='day next-month'
                    break;
            }
            createElement('div', cal_div, classname,day.day)
        })
        return cal_div;

    }


    var calendar_div = createCalendar();
    var tableElem = document.querySelector('table.times');
    var tablePos = createTable(tableElem);

    function createTable(tableElem){


        var count=-1;
        for (var i =0; i <48; i++){
            var mins;
            var ampm;
            if(i%2===0){
                mins = '00'
                count++
            }
            else{
                mins = '30'
            }

            if (i<24){
                ampm=' am'
            }else{
                ampm=' pm'
            }


            var tr =createElement('tr',tableElem, hours[count]+':' +mins+ ampm, '')
            var td =createElement('td', tr, hours[count]+':' +mins+ ampm+ ' tdtime',hours[count]+':' +mins+ ampm)
            td.style.width = '5em'
            var tdapp =createElement('td', tr, hours[count]+':' +mins+ ampm+ ' td2','')
            if(i==23){
                count = -1;
            }
        }
        return tableElem

    }


    var schedTitle= document.querySelector('div.schedule-title');

     var currObj;



    calendar_div.addEventListener('click', function(event){

            if(event.target.classList.contains('curr-month')){
                dayClicked=true
                var obj = month[parseInt(event.target.innerHTML)+(front_offset-1)]
                schedTitle.innerHTML='Schedule for: ' + months[new Date().getMonth()] + ' ' + event.target.innerHTML + ' ' + new Date().getFullYear()
                currObj=obj
                console.log(obj)

            }


    })





    function createElement(elementType, parent, className, innerHTML){
        var element = document.createElement(elementType);
        if(parent) parent.appendChild(element);
        if(className) element.className=className;
        if(innerHTML) element.innerHTML=innerHTML;
        return element;

    }


    function CustomDate(day, monthType, schedules){
        this.day = day,
        this.monthType = monthType,
        this.schedules=schedules || []
    }


    function Appointment (start, end, content){
        this.start=start,
        this.end =end,
        this.content = content

    }

    function Schedule(date, appointments){
        this.date=date
        this.appointments =appointments || []
    }

    var appdiv = document.querySelector('table.times')

    appdiv.addEventListener('mousedown', function(event){

        event.preventDefault()


        if(dayClicked){
            move.initPos=event.target.classList


            appdiv.addEventListener('mouseup', move);
        }


    })



    function move(event){
        event.preventDefault()
        var currPos = event.target.classList
        var endTime = event.target.classList
        var time = endTime[0]
        var times= time.split(':')
        var timeNums=[]
        times.forEach(function(x){
            timeNums.push(parseInt(x))
        })
        if(timeNums[1]==0){
            timeNums[1]=30
        }else{
            if(timeNums[0] ===12){
                timeNums[0]=1
            }else{
                timeNums[0]++
            }
            timeNums[1] = 0
        }

        getAppointment(move.initPos, currPos, timeNums);

    }


    function getAppointment(start,endPos , endTimeArr){
        var startTime=start[0]+ ' ' + start[1]
       var endHr = endTimeArr[0]
        var endMin = endTimeArr[1]
        var ampm=endPos[1]

        if(endHr ===12) {

            if (ampm === 'am') {
                ampm = 'pm'
            }else{
                ampm= 'am'
            }
        }


        if (endHr<10){
            endHr = '0'+endHr
        }
        else{
            endHr = ''+endHr
        }
        if(endMin ===0){
            endMin='00'
        }else{
            endMin='30'
        }


        var endTime = endHr+':'+endMin + ' ' + ampm
        var appointmentContent= prompt('Create Appointment from ' + startTime + ' to ' + endTime+ ' for this day', '' )

        console.log(appointmentContent)
        if(appointmentContent){
            var appointment = new Appointment(startTime, endTime,appointmentContent)
            console.log(appointment)
            currObj.schedules.appointments.push(appointment)
            console.log('currObj',currObj)
            console.log('month',month)
            renderSchedule(currObj)
        }

    }
    function renderSchedule(obj){
        obj.schedules.appointments.forEach(function(x){
            console.log(x)
        })
    }

})
    /**
     * Created by adityamangipudi1 on 4/15/15.
     */


