

    document.addEventListener('DOMContentLoaded', function () {
        function createDaysArr(){

            var month = [];


            var today = new Date();

            var first_day = (new Date(today.getFullYear(), today.getMonth(), 1)).getDay();
            var first_date = (new Date(today.getFullYear(), today.getMonth(), 1));
            var last_date = (new Date(today.getFullYear(), today.getMonth()+1, 0))
            var last_day = last_date.getDay();
            document.querySelector('div.month').innerHTML

            var last_month_date = new Date(today.getFullYear(), today.getMonth(),0).getDate();


            for(var i = 0, len = 6-first_day; i< len; i++){
                month.unshift(new CustomDate(last_month_date-i, 0));
            }
            for(var i = 1, len =last_date.getDate(); i<=len; i++){
                month.push(new CustomDate(i, 1));
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
                        classname='day'
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
    });

    function CustomDate(day, monthType){
        this.day = day,
        this.monthType = monthType
    }


    /**
     * Created by adityamangipudi1 on 4/15/15.
     */


