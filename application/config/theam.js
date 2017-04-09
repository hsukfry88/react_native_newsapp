import { Platform,
} from 'react-native';


const border = 1; /*边框宽度*/
const borderColor = '#eaeaea'; /*边框颜色*/
const pd20 = 20; /*左右边距*/
const inputLineHeight = 40; /*行高*/
const lableMarginBottom = 7;
const lableMarginTop = 7;
const errorAlertLeft = 7;
const errorMargin = 5;

/*基础颜色配置*/
export const Color = {
    black: '#000',
    graye: '#fafafa',
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
    white: '#fff',
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
    welcome: {
        flex: 1,
        justifyContent: 'center'
    },
    container: {
        marginTop: 65,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Color.graye
    },
    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    wait: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200
    },
    buttonStyle: {
        backgroundColor: Color.darkRed,
        marginTop: 15,
        marginRight: pd20,
        marginLeft: pd20,
    },
    refershContainer: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eaeaea',
        marginBottom: 45
    },
    refershText: {
        fontSize: 13,
        paddingLeft: 5,
        color: '#666'
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
export const IconGroupTheam = {
    Container: {
        height: 70,
        padding: 7,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: Color.white,
    },
    titleStyle: {
        color: Color.gray3,
        fontSize: FS.fs12
    },
    titleCenter: {
        flex: 1,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    size: 14
}
export const Form = {
    IconType: 'font-awesome',
    errorIconColor: Color.darkRed,
    errorIconSize: FS.fs14,
    InputIconColor: Color.gray6,
    errorText: {
        marginLeft: errorMargin,
        color: Color.darkRed
    },
    errorAlert: {
        marginLeft: errorAlertLeft,
        marginTop: errorMargin,
        flexDirection: 'row',
        marginBottom: errorMargin
    },
    Container: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: Color.graye,
    },
    lable: {
        fontSize: FS.fs14,
        marginLeft: pd20,
        marginTop: lableMarginTop,
        marginBottom: lableMarginBottom
    },
    IconSize: FS.fs18,
    InputStyle: {
        borderWidth: border,
        borderColor: borderColor,
        backgroundColor: Color.white,
        height: inputLineHeight,
        paddingLeft: 40,
        lineHeight: inputLineHeight,
    },
    InputStyleIOS: {
        borderWidth: border,
        borderColor: borderColor,
        backgroundColor: Color.white,
        height: inputLineHeight,
        paddingLeft: 40,
        lineHeight: inputLineHeight,
    },
    InputIcon: {
        position: 'absolute',
        left: 30,
        top: 12,
    },
    FormIcon: {
        position: 'absolute',
        left: 35,
        top: 12,
    },
    InputContainer: {
        borderBottomColor: Color.graye,
        borderBottomWidth: 0,
        marginLeft: pd20,
        marginRight: pd20,
        marginBottom: 5,
    },
    TextArea: {
        paddingTop: 3,
        paddingLeft: 10,
        marginLeft: pd20,
        marginRight: pd20,
        fontSize: FS.fs14,
        lineHeight: inputLineHeight,
        color: Color.gray3,
        borderWidth: border,
        borderColor: borderColor,
        backgroundColor: Color.white,
    },
}
export const theam = {
    Container: {
        flex: 1,
        backgroundColor: Color.graye
    },
    content: {
        padding: pd20,
        backgroundColor: Color.white,
    },
    navigationBar: {
        backgroundColor: Color.darkRed,
        borderBottomWidth: 0,
    },
    NavIcon: Color.gray6,
    NavText: Color.gray6,
    row: {
        flexDirection: 'row'
    },
    buttonStyle: {
        borderWidth: border,
        borderColor: borderColor,
        width: 150,
        position: 'absolute',
        height: inputLineHeight,
        right: pd20,
        top: Platform.OS === 'ios' ? -45 : 0,
    },
    disableButton: {
        backgroundColor: '#fafafa',
        borderColor: borderColor,
        borderWidth: border,
    },
    /*欢迎页面*/
    welcomeImg: {
        width: 82,
        height: 82,
        marginTop: 50,
        marginBottom: 50
    },
    IconWarp: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fafafa',
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 0
    },
    SearchIconStyle: {
        flex: 1,
        marginBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    SearchIconTitle: {
        color: Color.gray3,
        fontSize: FS.fs12
    },
    PullList: {
        borderTopWidth: .5,
        borderTopColor: '#eaeaea',
        backgroundColor: '#fff'
    }
}