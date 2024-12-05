function CalculateAge(year, month, day) {

    year = Number(year);
    month = Number(month);
    day = Number(day);

    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    // Validate inputs
    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        throw new Error('Invalid input');
    }
    // Validate month and day ranges
    if (month < 1 || month > 12 || day < 1 || day > 31) {
        throw new Error('Invalid month or day');
    }
    if (birthDate.getFullYear() !== year ||
        birthDate.getMonth() !== month - 1 ||
        birthDate.getDate() !== day) {
        throw new Error('Invalid date');
    }

    // Validate that the birthdate is valid and not in the future
    if (birthDate > currentDate) {
        throw new Error('Birthdate cannot be in the future');
    }



    let ageDiff = currentDate.getFullYear() - birthDate.getFullYear();
    let monthDiff = currentDate.getMonth() - birthDate.getMonth();
    let dayDiff = currentDate.getDate() - birthDate.getDate();
    if (monthDiff < 0) {
        ageDiff--; // Reduce one year
        monthDiff += 12; // Add 12 months
    }

    // Adjust days if the current day is before the birth day
    if (dayDiff < 0) {
        monthDiff--; // Reduce one month
        const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate(); // Days in the previous month
        dayDiff += previousMonth;
    }

    return { year: ageDiff, month: monthDiff, day: dayDiff };
}

function styleFirstWord(text) {
    const words = text.split(':');
    return `<span style="color: #e97f0d; font-weight: bold; display: block;">${words[0]}</span>${words[1]}`;
}


function ageCalculate() {
    const Day = document.getElementById('Day').value;
    const Month = document.getElementById('Month').value;
    const Year = document.getElementById('Year').value;


    const yearsResult = document.getElementById('yearsResult');
    const monthsResult = document.getElementById('monthsResult');
    const daysResult = document.getElementById('daysResult');


    if (!Year || !Month || !Day) {
        yearsResult.textContent = 'Please enter a complete birthdate.';
        monthsResult.textContent = '';
        daysResult.textContent = '';
        return;
    }


    try {
        const age = CalculateAge(Year, Month, Day)
        yearsResult.innerHTML = styleFirstWord(`Years:  ${age.year}`);
        monthsResult.innerHTML = styleFirstWord(`Months:  ${age.month}`);
        daysResult.innerHTML = styleFirstWord(`Days:  ${age.day}`);
    } catch (error) {
        yearsResult.textContent = 'Invalid Years. Please check your inputs.';
        monthsResult.textContent = 'Invalid Months. Please check your inputs.';
        daysResult.textContent = 'Invalid Days. Please check your inputs.';
        console.error(error);
    }

}


