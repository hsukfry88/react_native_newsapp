export const Color = {
	black: '#000',
	graye: '#fafafa',
	// graye:'#eee',
	gray3: '#333',
	gray6: '#666',
	gray9: '#999',
	orange: '#ff5e4f',
	orange2: '#6b3cba',
	blue: '#01a6e8',
	red: '#fb404b',
	darkRed: '#ec082e',
	green: '#7dc641',
	yellow: '#f8ac1a',
	white: '#fff'
}

export const FS = {
	fs24: 24,
	fs27: 27,
	fs18: 18,
	fs16: 16,
	fs14: 14,
	fs12: 12,
	fs10: 10,
}

export const CommonStyle = {
	container: {
		marginTop: 60,
		flex: 1,
		flexDirection: 'column',
	}
}

export const Margin = {
	top60: {
		marginTop: 90
	}
}
export const ScrollBottom = {
	bottom40: {
		marginBottom: 49
	}
}

export const Flex = {
	row: {
		flexDirection: 'row'
	}
}
export const Input = {

}
export const Form = {
	IconType: 'font-awesome',
	errorIconColor: '#ec082e',
	errorIconSize: 14,
	InputIconColor: '#ccc',
	errorText: {
		marginLeft: 5,
		color: '#ec082e'
	},
	errorAlert: {
		marginLeft: 15,
		marginTop: 10,
		flexDirection: 'row',
		marginBottom: 5
	},
	Container: {
		flex: 1,
		paddingTop: 80,
		backgroundColor: Color.graye,
	},
	lable: {
		fontSize: 14,
		marginLeft: 10,
		marginTop: 7,
		marginBottom: 7
	},
	IconSize: 18,
	InputStyle: {
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#fff',
		height: 40,
		paddingLeft: 40,
		lineHeight: 42,
	},
	InputStyleIOS: {
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#fff',
		height: 40,
		paddingLeft: 40,
		lineHeight: 40,
	},
	InputIcon: {
		position: 'absolute',
		left: 30,
		top: 12,
	},
	FormIcon: {
		position: 'absolute',
		left: 25,
		top: 12,
	},
	InputContainer: {
		borderBottomColor: Color.graye,
		borderBottomWidth: 0,
		marginLeft: 10,
		marginRight: 10,
	},
	TextArea: {
		paddingTop: 3,
		paddingLeft: 10,
		marginLeft: 10,
		marginRight: 10,
		fontSize: 14,
		lineHeight: 40,
		color: '#333',
		borderWidth: 1,
		borderColor: '#eaeaea',
		backgroundColor: '#fff'
	}
}
export const theam = {
	Container: {
		flex: 1,
	},
	content: {
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20,
		backgroundColor: '#fff',
	},
	navigationBar: {
		backgroundColor: Color.darkRed,
		borderBottomWidth: 0,
	},
	NavIcon: Color.gray6,
	NavText: Color.gray6,
	row: {
		flexDirection: 'row'
	}
}