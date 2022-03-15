const timeOfAnAction = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const timeFormat = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${hours}:${minutes} ${timeFormat}`;
}

const isFileValid = (req, res) => {
    // Organization of the format
    if (req.files === null) return false
    const file = req.files.filePath;
    const format = file.mimetype.split('/')
    const allowedFormats = ['webp', 'png', 'jpg', 'jpeg', 'tiff']

    // Check if image's size not ove then 1.5 MB and if its the right format
    if (!allowedFormats.includes(format[1])) return false
    if (file.size >= 1500000) return false
    return file
}

module.exports = {
    timeOfAnAction,
    isFileValid
}