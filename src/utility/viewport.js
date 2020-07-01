const getViewPort =()=> {
	const { innerWidth: width } = window;
	if (width < 768) {
		return "small";
	} else if (width >= 768 && width < 1024) {
		return "medium";
	} else if (width >= 1024 && width < 1152) {
		return "large";
	} else {
		return "xlarge";
	}
}
export default getViewPort;
