export const getTitleID = (title) => {
	return title
		.replace(/\?/g,"")
		.replace(/\s/g, "-").toLowerCase()
}
