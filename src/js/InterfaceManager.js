/**
 * Returns the time as a string to paste in HTML.
 * @param  {number} millisec - Time in milliseconds.
 */
export function displayTime(millisec) {
    const normalizeTime = (time) => (time.length === 1) ? time.padStart(2, '0') : time;
    let seconds = (millisec / 1000).toFixed(0);
    let minutes = Math.floor(parseInt(seconds) / 60).toString();
    let hours = '';
   
    if (parseInt(minutes) > 59) {
      hours = normalizeTime(Math.floor(parseInt(minutes) / 60).toString());
      minutes = normalizeTime((parseInt(minutes) - (parseInt(hours) * 60)).toString());
    }
    seconds = normalizeTime(Math.floor(parseInt(seconds) % 60).toString());
   
    if (hours !== '') {
       return `${hours}:${minutes}:${seconds}`;
    }
      return `${minutes}:${seconds}`;
}