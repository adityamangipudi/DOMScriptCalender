

    document.addEventListener('DOMContentLoaded', function () {
        var hours= ['12', '12:30', '1']
        function createDaysArr(){

            var month = [];
            var months = [ "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ];

            var today = new Date();

            var first_day = (new Date(today.getFullYear(), today.getMonth(), 1)).getDay();
            var first_date = (new Date(today.getFullYear(), today.getMonth(), 1));
            var last_date = (new Date(today.getFullYear(), today.getMonth()+1, 0))
            var last_day = last_date.getDay();
            //document.querySelector('div.month').innerHTML=months[today.getMonth()]
            //document.querySelector('span.year').innerHTML=today.getYear()
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
            //console.log(month);
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

        }
        createCalendar();
        function createElement(elementType, parent, className, innerHTML){
            var element = document.createElement(elementType);
            if(parent) parent.appendChild(element);
            if(className) element.className=className;
            if(innerHTML) element.innerHTML=innerHTML;
            return element;

        }


    function CustomDate(day, monthType, schedule){
        this.day = day,
        this.monthType = monthType,
        this.schedule=schedule || []
    }


    function Appointment (){
        this.start=start,
        this.end =end,
        this.content = content

    }

    function Schedule(date, appointments){
        this.date=date
        this.appointments =appointments || []
    }

    var appdiv = document.querySelector('div.appointments')

    appdiv.addEventListener('mousedown', function(event){
        var div =document.createElement('div');
        div.className='rectangle';
        appdiv.appendChild(div);
        move.initPos=[event.clientX, event.clientY];


        appdiv.addEventListener('mousemove', move);


    })
        appdiv.addEventListener('mouseup', function(event){
            appdiv.removeEventListener('mousemove', move);
        });

        function move(event){

            var currPos = [event.clientX, event.clientY];

            this.lastChild.style.width = Math.abs(currPos[0]-move.initPos[0]) + 'px';
            this.lastChild.style.height = Math.abs(currPos[1]-move.initPos[1]) + 'px';
            this.lastChild.style.left =move.initPos[0]<currPos[0]? (move.initPos[0]-appdiv.offsetLeft) + 'px':currPos[0]-appdiv.offsetLeft +'px' ;
            this.lastChild.style.top = move.initPos[1]<currPos[1]? (move.initPos[1]) + 'px':currPos[1] +'px';




        }
})
    /**
     * Created by adityamangipudi1 on 4/15/15.
     */


