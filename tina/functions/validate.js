export const validateIdYoutube = (value) => {
	// If the input is exactly 11 characters long, it might be a YouTube ID
	if (value.length <= 11) {
		return value;
	}
	const regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
	if (regex.test(value)) {
		const videoIdMatch = value.match(regex);
		const videoId = videoIdMatch && videoIdMatch[7].length == 11 ? videoIdMatch[7] : false;
		if (videoId) {
			return videoId;
		}
	}
	return false;
};
