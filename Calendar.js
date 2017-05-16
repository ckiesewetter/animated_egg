var Calendar = React.createClass ({
    getInitialState: function() {
        var today = new Date();
        return {
            day: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear()
        };
    },
    prevMonth: function(){
       this.setState({ month: this.state.month - 1 })
    },
    nextMonth: function() {
        this.setState({ month: this.state.month + 1 })
    },
    today: function() {
        this.setState(this.getInitialState())
    },
    render() {
        var today = new Date(this.state.year, this.state.month, this.state.day);
        var month = today.getMonth();
        var year = today.getFullYear();

        var beginCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        var endCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

        //calculating offsets
        // offset tells us on which day the first of the month falls

        var offset = -(beginCurrentMonth.getDay());
        var daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
        //weekOffSet combines the offset and days in the month to calculate how many days in total a month took up on the calendar
        var weekOffSet = Math.abs(offset) + daysInCurrentMonth;
        //by dividing weekoffset by 7 we can see how many weeks a month took up on the calendar
        var currentNumWeeks = Math.ceil(weekOffSet/7);

        var weeks = [];
        var names=[];
        for (var i=0; i<7; i++) {
            names.push(<td className="dayNames" key={ i }>{ Calendar.DAY_NAMES[i] }</td>)
        }
            //pushing names of days into weeks array
            weeks.push(<tr> { names } </tr>);

            for (y=0; y< currentNumWeeks ; y++){
                var days = [];
                var result = [];

                    for (var i=0; i<7; i++) {
                        result=[];
                        var currentDay = today.getDate();
                        var dayCount = (i + 1) + (y * 7) + offset;
                        if (dayCount < 1 || dayCount > endCurrentMonth) {
                            dayCount = ""
                        }
                        else {
                            var today = new Date(this.state.year, this.state.month, dayCount)
                            var newdate = strftime("%Y-%m-%d", today)
                            var filterDate = _.filter(this.props.dataArray, function(num, index) {
                                if (num.date == newdate) {
                                   result.push(<p key={ index } className="data-result">{ num.item }</p>)
                                }
                            });
                        }
                        if (dayCount == currentDay) {
                            var cellClass = 'dayBlank todayHighLight';
                        }
                        else {
                            var cellClass = 'dayBlank';
                        }
                        days.push(<td className={ cellClass } key={ i }>
                                    <p>{ dayCount }</p>
                                    <div className="data-result-all">{ result }</div>
                                  </td>
                        )
                    }
                //pushing the day numbers into weeks array
            weeks.push(<tr key={ y }>{ days }</tr>
                        );
        }
        return (
          <div className="Calendar">
              <div className="header">
                  <h1 className="currentMonth"> <strong>{ Calendar.MONTH_NAMES[month] }</strong>{" "}  { year }</h1>
                      <div className="btngroup">

                          <button onClick={ this.prevMonth } type="button" >
                              <span className="glyphicon glyphicon-chevron-left"></span>
                          </button>

                          <button onClick={ this.today } className="button">Today</button>

                          <button onClick={ this.nextMonth } type="button" >
                              <span className="glyphicon glyphicon-chevron-right"></span>
                          </button>

                      </div>
              </div>

                  <table>
                      <tbody>
                        { weeks }
                      </tbody>
                  </table>
            </div>

        )
    }
});

Calendar.DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
Calendar.MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
