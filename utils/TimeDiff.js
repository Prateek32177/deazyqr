export function getTimeDifference(expirationTime) {
    // Convert expiration time to JavaScript Date object
    const expirationDate = new Date(expirationTime);

    // Get the current time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDiff = expirationDate - currentDate;

       // Check if expiration time is in the past
       if (currentDate > expirationDate) {
        return {
            expired: true
        };
    }

    // Convert the time difference to a human-readable format (hours, minutes, seconds)
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const secondsDiff = Math.floor((timeDiff % (1000 * 60)) / 1000);

    return {
        hours: hoursDiff,
        minutes: minutesDiff,
        seconds: secondsDiff,
        expired: false
    };
}

