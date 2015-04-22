/**
 * Created by adityamangipudi1 on 4/21/15.
 */
document.addEventListener('DOMContentLoaded', function () {





    function createElement(elementType, parent, className, innerHTML) {
        var element = document.createElement(elementType);
        if (parent) parent.appendChild(element);
        if (className) element.className = className;
        if (innerHTML) element.innerHTML = innerHTML;
        return element;

    }

    function CustomDate(day, monthType, schedules) {
        this.day = day,
            this.monthType = monthType,
            this.schedules = schedules || []
    }

    function Appointment(start, end, content) {
        this.start = start,
            this.end = end,
            this.content = content

    }

    function Schedule(date, appointments) {
        this.date = date
        this.appointments = appointments || []
    }

    function Calendar() {
        Calendar.month = Calendar.month || []
    }

    Calendar.prototype.createDaysArr = function (year, calMonth, day) {
        var date = day || (new Date().getDate())
        //
        // console.log(year, calMonth, date)


        var today = new Date(year, calMonth, date);


        var first_day = (new Date(today.getFullYear(), today.getMonth(), 1)).getDay();
        var first_date = (new Date(today.getFullYear(), today.getMonth(), 1));
        var last_date = (new Date(today.getFullYear(), today.getMonth() + 1, 0))

        var last_day = last_date.getDay();
        //console.log('first ', first_date, first_day)
        //console.log('last ', last_date, 13-last_day)
        front_offset = first_day
        back_offset = last_day

        while (document.querySelector('div.calendar-title').hasChildNodes()) {
            document.querySelector('div.calendar-title').removeChild(document.querySelector('div.calendar-title').childNodes[0])
        }
        right = createElement('span', document.querySelector('div.calendar-title'), 'right', '<');
        var monthTitle = createElement('div', document.querySelector('div.calendar-title'), 'month', months[calMonth]);
        left = createElement('span', document.querySelector('div.calendar-title'), 'left', '>');
        createElement('span', document.querySelector('div.calendar-title'), 'year', year)

        var last_month_date = new Date(today.getFullYear(), today.getMonth(), 0).getDate();

        //console.log(last_month_date)
        for (var i = 0, len = first_day; i < len; i++) {
            month.unshift(new CustomDate(last_month_date - i, 0));
        }
        for (var i = 1, len = last_date.getDate(); i <= len; i++) {
            month.push(new CustomDate(i, 1, new Schedule(i, [])));
        }
        for (var i = 0, len = 42 - month.length; i < len; i++) {
            month.push(new CustomDate((i + 1), 2));
        }
        return month;

    }

    Calendar.prototype.createCalendar = function(year, calMonth, day){
        var month = this.createDaysArr(year, calMonth, day)
        var cal_div = document.querySelector('div.calendar-days')
        while(cal_div.hasChildNodes()){
            cal_div.removeChild(cal_div.childNodes[0])
        }
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

    Calendar.prototype.createTable = function(tableElem){


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


            var tr =createElement('div',tableElem, hours[count]+':' +mins+ ampm + ' clearfix', '')
            var td =createElement('div', tr, hours[count]+':' +mins+ ampm+ ' tdtime',hours[count]+':' +mins+ ampm)
            td.style.width = '5em'
            var tdapp =createElement('div', tr, hours[count]+':' +mins+ ampm+ ' td2','')
            if(i==23){
                count = -1;
            }
        }
        return tableElem

    }

    Calendar.prototype.renderSchedule =  function ( obj){
        //month..schedules.appointments.forEach(function(x){
        //    console.log(x)
        this.reset()
        if (month[currDayClicked].day === obj.day){
            month[currDayClicked].schedules.appointments.forEach(function(appt){
                //console.log(appt)
                var td2All = document.querySelectorAll('div.td2');
                var times = []
                var select = false
                var startTime=appt.start.split(' ')
                var endTime=appt.end.split(' ')

                /*   if(startTime[0].contains('undefined') || startTime[0].contains( 'NaN') ||endTime[0].contains('undefined') || endTime[0].contains('NaN' )){
                 alert("Please click on valid rows to select correct time.")
                 }else {
                 */

                //console.log(td2All)

                for (var i = 0; i < td2All.length; i++) {
                    // console.log(' in here' , td2All[i])
                    if (td2All[i].classList.contains(startTime[0]) && td2All[i].classList.contains(startTime[1])) {
                        // console.log('in true')

                        select = true
                    }
                    // console.log(td2All[i])
                    if (td2All[i].classList.contains(endTime[0]) && td2All[i].classList.contains(endTime[1])) {
                        // console.log('in false')
                        select = false
                    }
                    if (select) {
                        //  console.log('in push', endTime)

                        times.push(td2All[i])
                    }


                }
                ///console.log(times)

                times.forEach(function (x) {
                    //console.log(x)

                    x.style.backgroundColor = '#8ddcb1'
                    x.innerHTML === '' ? x.innerHTML = appt.content : x.innerHTML = x.innerHTML + ', ' + appt.content

                })
                // }

            });
        }

    }

    Calendar.prototype.getAppointment = function (start,endPos , endTimeArr){
        //console.log(start, ' start endPos', endPos, 'endTArr', endTimeArr)
        if(start[0] ==='times' || endPos ==='times' || isNaN(endTimeArr[0])){

            return
        }
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

        var popup = document.querySelector('div.popUpAppt');
        document.querySelector('textarea#appointment').value=''
        document.querySelector('#appointment').setAttribute('placeholder', 'Appointment')
        popup.style.display = 'block';

        var popupTime = document.querySelectorAll('h4')

        popupTime[0].innerHTML="Start time: " + startTime
        popupTime[1].innerHTML="End time: " + endTime
        //console.log('start', startTime)
        //console.log('end', endTime)

        this.addListeners(startTime, endTime)





    }

    Calendar.prototype.addListeners =function (startTime, endTime){
        var apptForm =document.querySelector('div.apptForm')
        apptForm.addEventListener('click', function(event){
            if(event.target.id ==='submit'){
                var appointmentContent;
                appointmentContent =calObj.check_fields()
                var b  = calObj.createAppt(appointmentContent, startTime, endTime)
                b? this.removeEventListener('click',arguments.callee,false):'';
            }
            if(event.target.id ==='close'){
                document.querySelector('div.popUpAppt').style.display = "none";
                this.removeEventListener('click',arguments.callee,false);
            }

        })




    }

    Calendar.prototype.createAppt = function (appointmentContent, startTime, endTime){

        if(appointmentContent){
            var appointment = new Appointment(startTime, endTime,appointmentContent)
            currObj.schedules.appointments.push(appointment)
            this.renderSchedule( currObj)
            return true
        }
        return false;

    }

    Calendar.prototype.reset = function (){
        var td2All = document.querySelectorAll('div.td2');
        for (var i =0; i<td2All.length;i++){
            td2All[i].innerHTML=''
            td2All[i].style.backgroundColor='rgb(72, 186, 206)'
        }
    }

    Calendar.prototype.close = function (){
        document.querySelector('div.popUpAppt').style.display = "none";
    }

    Calendar.prototype.check_fields = function (){
        var apptCont = document.querySelector('textarea#appointment')
        if(apptCont.value===""){
            apptCont.setAttribute('placeholder', 'Required Field. Please Enter Info!')
        }else{
            this.close()
            var ret= apptCont.value
            return ret
        }
    }

    var calObj = new Calendar()
    var month = []
    var hours = ['12', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    var months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    var currDayClicked;
    var front_offset;
    var back_offset;
    var dayClicked = false
    var right, left;

    var currMonth = new Date().getMonth()
    var currYear = new Date().getFullYear()

    var calendar_div = calObj.createCalendar(currYear, currMonth);
    var tableElem = document.querySelector('div.times');
    var tablePos = calObj.createTable(tableElem);

    var schedTitle= document.querySelector('div.schedule-title');

    var currObj;

    var calendar = document.querySelector('div.calendar-info')
    calendar.addEventListener('click', function(event){
        if(event.target.classList.contains('right')){
            month = []

            if(currMonth===0){
                currMonth=11
                currYear--;
            }else{
                currMonth--;
            }
            dayClicked=false
            schedTitle.innerHTML='Schedule '
            document.querySelector('div.appointments').style.display = "none"
            calendar_div=calObj.createCalendar(currYear, currMonth,1);
        }
        if(event.target.classList.contains('left')){
            month = []
            if(currMonth===11){
                currMonth=0
                currYear++;



            }else{
                currMonth++;



            }
            dayClicked=false
            schedTitle.innerHTML='Schedule '
            document.querySelector('div.appointments').style.display = "none"
            calendar_div=calObj.createCalendar(currYear, currMonth,1);
        }

        if(event.target.classList.contains('curr-month')){
            //console.log('clicked')
            document.querySelector('div.appointments').style.display = "block"
            dayClicked=true
            currDayClicked=parseInt(event.target.innerHTML)+(front_offset-1)

            var obj = month[currDayClicked]
            schedTitle.innerHTML='Schedule for: ' + months[currMonth] + ' ' + event.target.innerHTML + ' ' +currYear
            currObj=obj

            calObj.renderSchedule( obj)
            //console.log(obj)

        }


    })




    //--------------------------------------------------------------------------------
    function move(event){
        event.preventDefault()
        appdiv.removeEventListener('mouseover', highlight)
        //appdiv.removeEventListener('mouseover', highlight)

        for(var i =elems.length-1; i>=0 ;i--){
         elems[i].classList.remove('highlight')
         elems.pop();
         }
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

        calObj.getAppointment(move.initPos, currPos, timeNums);

    }







   var appdiv = document.querySelector('div.times')

    appdiv.addEventListener('mousedown', function(event){

        //event.preventDefault()


        if(dayClicked){

            elems.push(event.target)
            event.target.classList.add('highlight')
            move.initPos=event.target.classList


            appdiv.addEventListener('mouseover', highlight);
            appdiv.addEventListener('mouseup', move);
        }


    })

    var elems=[]
    var reversing=false;

    function highlight(event){

        //console.log(event.target.classList)

        if(event.target.classList.contains('highlight')){

            elems[elems.length-1].classList.remove('highlight')
            elems.pop()


        }else{
            if(event.target.classList.contains('td2'))
                reversing=false
            event.target.classList.add('highlight')
            elems.push(event.target)
        }


    }

    //--------------------------------------------------------------------------------



});