export const LoginSchema = {
	name: 'Login',
	primaryKey: 'uid',
	properties: {
		uid: 'int',
		phone: 'string'
	}
}



export const RegisterSchema = {
	name: 'User',
	primaryKey: 'uid',
	properties: {
		uid: 'int',
		name: 'string',
		phone: 'string',
		company: 'string',
		industry: 'string',
		region: 'string'
	}
}


export const BannerSchema = {
	name: 'Banner',
	primaryKey: 'id',
	properties: {
		"id": "int",
		"name": "string",
		"intro": "string",
		"bannerfile": "string",
		"type": "int",
		"dataid": "int",
		"orderby": "int",
		"isshow": "int"
	}
}

export const AnnouncementSchema = {
	name: 'Announcement',
	primaryKey: 'id',
	properties: {
		"id": "int",
		"title": "string",
		"startdate": "string",
		"enddate": "string",
		"keywords": "string"
	}
}
export const HotPolicySchema = {
	name: 'HotPolicy',
	primaryKey: 'id',
	properties: {
		"id": "int",
		"title": "string",
		"city": "string",
		"createtime": "string",
		"keywords": "string",
		"issuer": "string"
	}
}

export const StartPolicySchema = {
	name: 'StartPolicy',
	primaryKey: 'policyid',
	properties: {
		policyid: "int",
		policytitle: "string",
		articaltype: "int"
	}
}