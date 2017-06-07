import { Platform, Dimensions} from 'react-native';
import normalize from '../components/helps/normalize';

const border = 1; /*边框宽度*/
const borderColor = '#eaeaea'; /*边框颜色*/
const pd18 = 18; /*左右边距*/
const inputLineHeight = 40; /*行高*/
const lableMarginBottom = 11.25;
const lableMarginTop = 11.25;
const errorAlertLeft = 18;
const errorMargin = 11.25;

/*基础颜色配置*/
export const Color = {
    black: '#000',
    graye: '#efefef',
    gray3: '#333',
    gray6: '#666',
    gray9: '#999',
    grayc: '#eaeaea',
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
export const HeaderBar = {
    container: {
        marginTop: 45,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#ec082e',
    },
    box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    boxTitle: {
        color: '#fff',
    },
    companyTxt: {
        color: '#fff',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    }
}
export const CommonStyle = {
    red: {
        color: Color.red
    },
    policy: {
        lineHeight: 24,
        color: Color.red,
        textAlign: 'center'
    },
    borderRadius: 4,
    Item: {
        paddingLeft: 7,
        paddingRight: 7,
        borderBottomColor: '#eaeaea',
        borderBottomWidth: .5,
        backgroundColor: 'transparent'
    },
    ItemContainer: {
        flexDirection: 'row',
        paddingLeft: 7,
        backgroundColor: 'transparent'
    },
    ItemContent: {
        paddingTop: 7,
        paddingBottom: 7,
        justifyContent: 'center',
    },
    ItemTitle: {
        lineHeight: 24,
        fontSize: 13 || normalize(13),
        color: Color.gray3
    },
    fullScreen: {
        flex: 1
    },
    rightButton: {
        height: 24,
        width: 28
    },
    headerTitle: {
        color: Color.white
    },
    welcome: {
        flex: 1,
        justifyContent: 'center'
    },
    listWarp: {
        marginTop: 5,
        backgroundColor: Color.white,
        borderTopWidth: .5,
        borderTopColor: '#eaeaea',
    },
    timer: {
        textAlign: 'right',
        color: '#ccc',
        marginTop: 5,
        fontSize: FS.fs12
    },
    center: {
        position: 'absolute',
        zIndex: 90,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        marginTop: 65,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Color.graye
    },
    container2: {
        marginTop: 65,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Color.white
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
        marginRight: pd18,
        marginLeft: pd18,
        borderRadius: 4
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
    },
    itemText: {
        fontSize: 13
    },
    progress: {
        width: 180,
        height: 90,
        marginTop: -105,
        backgroundColor: '#333',
        borderRadius: 7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .85,
    },
    progress2: {
        width: 180,
        height: 90,
        marginTop: -(Dimensions.get('window').height / 2 - 90),
        backgroundColor: '#333',
        borderRadius: 7,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .85,
    },
    ActivityIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    progressText: {
        color: Color.white
    },
    subTitle: {
        flex: 1,
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 13,
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderBottomColor: '#eaeaea',
        borderTopColor: '#eaeaea',
    },
    subTitleColor: {
        color: '#ec082e',
    },
    webViewWapper: {
        height: Dimensions.get('window').height - 80,
    },
    webView: {
        height: Dimensions.get('window').height - 80,
        marginBottom: 60,
    },
    IconSize: FS.fs18,
    panelPostion: {
        position: 'absolute',
        height: 80,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        borderTopWidth: .5,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    panelContent: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    tel: {
        fontSize: 15,
        color: Color.darkRed,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center'
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
        borderTopWidth: .5,
        borderBottomWidth: .5,
        borderTopColor: Color.grayc,
        borderBottomColor: Color.grayc,
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
    InputIconColor: Color.gray9,
    errorText: {
        marginLeft: 5,
        color: Color.darkRed,
        fontSize: FS.fs12
    },
    errorAlert: {
        marginLeft: errorAlertLeft,
        marginTop: 0,
        flexDirection: 'row',
        marginBottom: errorMargin
    },
    Container: {
        flex: 1,
        paddingTop: 80,
        backgroundColor: Color.white,
    },
    lable: {
        color: Color.gray3,
        fontSize: FS.fs14,
        marginLeft: pd18,
        marginTop: lableMarginTop,
        marginBottom: lableMarginBottom,
    },
    InputStyle: {
        borderRadius: 4,
        borderWidth: border,
        borderColor: borderColor,
        backgroundColor: Color.white,
        height: inputLineHeight,
        paddingLeft: 40,
        fontSize: 14,
        lineHeight: inputLineHeight,
        color: Color.gray3,
        marginBottom: 10,
    },
    InputStyleIOS: {
        borderWidth: border,
        borderColor: borderColor,
        backgroundColor: Color.white,
        height: inputLineHeight,
        paddingLeft: 40,
        lineHeight: inputLineHeight,
        color: Color.gray9,
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
    declare: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 18,
        paddingRight: 18,
    },
    InputContainer: {
        borderBottomColor: Color.white,
        borderBottomWidth: 0,
        marginLeft: pd18,
        marginRight: pd18,
    //marginBottom: 5,
    },
    TextArea: {
        paddingTop: 3,
        paddingLeft: 10,
        borderRadius: 4,
        marginLeft: pd18,
        marginRight: pd18,
        fontSize: FS.fs14,
        lineHeight: inputLineHeight,
        color: Color.gray3,
        borderWidth: border,
        borderColor: borderColor,
        backgroundColor: Color.white,
    }
}
export const theam = {
    Container: {
        flex: 1,
        backgroundColor: Color.graye
    },
    content: {
        padding: pd18,
        backgroundColor: Color.white,
    },
    navigationBar: {
        backgroundColor: Color.darkRed,
        borderBottomWidth: 0,
    },
    tabIcon: {
        color: Color.gray3
    },
    tabText: {
        color: Color.gray3,
        fontSize: FS.fs12,
    },
    tabSelected: {
        color: Color.darkRed
    },
    textSelected: {
        color: Color.darkRed,
        fontSize: FS.fs12
    },
    row: {
        flexDirection: 'row'
    },
    buttonStyle: {
        borderWidth: border,
        borderColor: borderColor,
        width: 135,
        position: 'absolute',
        height: inputLineHeight,
        right: pd18,
        backgroundColor: Color.white,
        top: Platform.OS === 'ios' ? -50 : 0,
        borderRadius: 4,
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
        marginTop: 20,
        marginBottom: 30
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
        marginTop: -1,
        borderTopWidth: .5,
        borderTopColor: '#eaeaea',
        backgroundColor: '#fff',
    }
}
export const ListGroup = {
    container: {
        //marginTop: 10,
        borderTopColor: '#ededed',
        borderTopWidth: 1,
    }
}
export const SelectTitle = {
    container: {
        paddingLeft: 7,
        paddingTop: 15,
        paddingRight: 7,
        paddingBottom: 15,
        borderBottomColor: '#ededed',
        borderBottomWidth: 1,
        backgroundColor: 'transparent',
        backgroundColor: Color.white
    },
    //chevronColor: '#bdc6cf',
    wrapper: {
        flexDirection: 'row',
        marginLeft: 7,
    },
    titleSubtitleContainer: {
        justifyContent: 'center',
        flex: 1,
    },
    chevronContainer: {
        flex: 0.05,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    rightTitleContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    rightTitleStyle: {
        marginRight: 5,
        color: '#bdc6cf'
    },
    title: {
        color: '#333'
    },
    iconType: 'simple-line-icon',
    iconSize: 14,
    iconName: 'arrow-right',
    iconColor: '#bdc6cf'
}
export const Setting = {
    bgGray: {
        flex: 1,
        backgroundColor: '#eeeeee'
    },
    container: {
        marginTop: 50,
        paddingTop: 20,
        paddingBottom: 20,
    },
    red: {
        color: '#ec082e',
    },
    buttonStyle: {
        borderWidth: .5,
        borderColor: '#ccc',
        backgroundColor: '#fff'
    },
    innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
    },
    row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },
    modalButton: {
        marginTop: 10,
    },
    modalHeader: {
        //flex: 1,
        marginBottom: 20,
    },
    modalBottm: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    makeSure: {
        marginRight: 20,
    },
    modalContainer: {
        height: 125,
        width: 250,
        borderRadius: 4,
        padding: 14,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    modalHeaderText: {
        textAlign: 'left',
    },
    text: {
        color: '#666'
    }
}