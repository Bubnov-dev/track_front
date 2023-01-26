export default {
    formatTime(sec) {
        let hours = Math.floor(sec / (60 * 60))
        sec = sec % (60 * 60)
        let minutes = Math.floor(sec / 60)
        sec = sec % 60
        return ('0' + hours).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' + ('0' +sec).slice(-2)
    }
}