export let from = (val) =>
	(val === undefined || val===null) ? [] :
	Array.isArray(val) ? val :
	[val]
