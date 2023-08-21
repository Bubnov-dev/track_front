export default {
    formatPriceWithSpace(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },

    formatTime(sec) {
        let hours = Math.floor(sec / (60 * 60))
        sec = sec % (60 * 60)
        let minutes = Math.floor(sec / 60)
        sec = sec % 60
        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' + sec).slice(-2)
    },

    formatMySQLDate(mysqlDatetime) {
        const dateObj = new Date(mysqlDatetime + 'Z');  // 'Z' ensures UTC time is used

        const day = String(dateObj.getUTCDate()).padStart(2, '0');
        const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0');  // getUTCMonth() starts from 0
        const year = dateObj.getUTCFullYear();

        const hours = String(dateObj.getUTCHours()).padStart(2, '0');
        const minutes = String(dateObj.getUTCMinutes()).padStart(2, '0');
        const seconds = String(dateObj.getUTCSeconds()).padStart(2, '0');

        return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    },

    formatTimeFromTimestamp(phpTimestamp) {
        // Convert PHP timestamp to JavaScript Date object
        let date = new Date(phpTimestamp * 1000); // JavaScript uses milliseconds, so multiply by 1000

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        // Add leading zero if needed
        hours = (hours < 10) ? "0" + hours : hours;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minutes + ":" + seconds;
    }

}