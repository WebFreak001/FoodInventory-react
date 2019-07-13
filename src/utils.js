export function dateDiff(a, b) {
	if (typeof a === "string")
		a = new Date(a);
	if (typeof b === "string")
		b = new Date(b);

	return Math.round((a.getTime() - b.getTime()) / 1000 / 60 / 60 / 24);
}

/**
 * @param {Date | string | undefined} d
 * @param {string} past
 * @param {string} future
 */
export function relativeDate(d, past, future) {
	if (!d)
		return future + " never";

	if (typeof d === "string")
		d = new Date(d);

	var dt = dateDiff(d, new Date());
	if (dt < -1)
		return past + " " + (-dt) + " days ago";
	else if (dt == -1)
		return past + " yesterday";
	else if (dt == 0)
		return future + " today";
	else if (dt == 1)
		return future + " tomorrow";
	if (dt > 1)
		return future + " in " + dt + " days";
}