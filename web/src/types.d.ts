declare namespace Data {
	interface User {
		email: string,
		sub: string,
		name: string,
		picture?: string
	}

	interface Event {
		category: string,
		title: string,
		org: string,
		place: string,
		description: string,
		xp: number,
		date: number

		src_thumbnail?: string,
		src_css?: string,
		src_page?: string
	}

	interface Organisation {
		name: string,
		description: string,

		src_css?: string,
		src_page?: string
	}
}
