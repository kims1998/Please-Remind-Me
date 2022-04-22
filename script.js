const currentTime = $('#currentDay');

let daily = [
    [09, ''],
    [10, ''],
    [11, ''],
    [12, ''],
    [13, ''],
    [14, ''],
    [15, ''],
    [16, ''],
    [17, '']
];


let rightNow = 0;

//This function is created so that it will note the change from 59 minutes going into the next hour and 0 minutes.
let currentHour = setInterval(function () {
    if (moment().hours() != rightNow) {
        rightNow = moment().hours();
        displayTable();
    }
}, 1000);


//When the user clicks the save button on the right, it will store the user's input into the localStorage through the saveMyDay function.
$('#myDisplay').on('click', '.btn', function() {
    saveMyDay();
})

//this function fetches the data from the local storage. In the event that there is no local storage, it will return an empty daily.
function getDaily() {
    daily = JSON.parse(localStorage.getItem('daily')) || daily;
}

//while this function stores the data into the localStorage.
function saveMyDay() {
    for (let hour of daily) {
        hour[1] = $(`#input-${hour[0]}`).val().trim();
    }
    localStorage.setItem('daily', JSON.stringify(daily));
}


//this function deals with the current time interval that is displayed up in the header at real time.
function displayTime() {
    currentTime.text(moment().format('MMM DD, YYYY [at] hh:mm:ss a'));
};
//Time interval is set to increase by 1000 milliseconds (1 second)
setInterval(displayTime, 1000);


//This function is created to help display the table. If user clicks on agenda, user can add input
function displayTable() {
    let htmlTemplate = ``;
    let divTemplate = ``;

    //if row[0] is less than or equal to 12, then row[0] is remainder of 12, which is 9:00.... if row[0] is less than 12, it will be AM || PM (line 58)
    //Included %12 so that the remainder can help display the time into 12hr format instead of 24hr format.
    for (let row of daily) {
        
        divTemplate += `
        <div class="row time-block my-1">
            <div class="col-2 hour text-end">
                <p class="h5">${row[0] <= 12? row[0]:row[0]%12}:00 ${row[0]<12? 'AM':'PM'}</p>
            </div>
            <textarea ${row[0]<rightNow? 'disabled':''} class="col-9 ${row[0]<rightNow? 'past':row[0]==rightNow? 'present':'future'}" id="input-${row[0]}" >${row[1].trim()}</textarea>
            <div class="saveBtn col-1" ${row[0] < rightNow ? 'disabled' : ''}>
                <button ${row[0] < rightNow ? 'disabled' : ''} type='button' class='btn text-white text-center'><i class="fas fa-font-awesome fa-save"></i></button>
            </div>       
        </div>
        `;

    }

    $('#myDisplay').html(divTemplate);

}

function holler() {
    getDaily();
    displayTable();


}

holler();



















//if the current time is less than the time of the calender, the color changes to gray

//else if current time is equal to the time of the calender, the color stays white

//else if current time is greater than the time of the calender, the color changes to green

