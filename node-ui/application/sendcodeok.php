<?php
if (!defined('BASEPATH'))
    exit('No direct script access allowed');

/**
* 阿里云 短信验证
*/
class Sendcodeok extends CI_Controller{

    public function __construct() {
        parent::__construct();
        $this->load->model('sendcode_mdl');
    }

    /**
    *短信发送接口
    * @param $phone    手机号码
    */
    public function sendcode($accessKeySecret=null,$phone=null){

        if(!$phone || $phone==null || !preg_match("/^1[34578]{1}\d{9}$/",$phone)){ 
            echo "错误的手机号码";
            exit;
        }

        if (!$accessKeySecret || $accessKeySecret==null){
            echo '错误的接口';
            exit;
        }
        //if (!$accessKeySecret) $accessKeySecret='pu8WNw3c5Ueq8BGtnYEQ7Q1chTVMEb';
        $mobile_code = $this->random(6,1);

        //删除一个月前的数据
        $this->sendcode_mdl->delete('sendtime<date_sub(sysdate(),interval 1 MONTH)');

        //查询当前手机号是否有60秒内生成的验证码
        $where = 'phone = "'.$phone.'" and sendtime>=date_sub(sysdate(),interval 60 second)';
        $data = $this->sendcode_mdl->get($where);
        
        //判断此手机号是否在60秒内发送过验证码
        if(empty($data)){
            $result = $this->SendSMS($phone,$mobile_code,$accessKeySecret);
            if($result==1){
                $senddata = array(
                    'code' => $mobile_code,
                    'phone' => $phone,
                    'sendtime' => date('Y-m-d H:i:s'),
                    'sendrequest' => '成功'
                );
                $sendcodeid = $this->sendcode_mdl->add($senddata);
                return $senddata;
            }else{
                return false;
            }
        }
        else
            return false;
    }

    /**
    *短信验证接口
    * @param $phone    手机号码
    * @param $code    验证码
    */
    public function smsvalidation($phone=null,$code=null){
        
        //验证手机号是否有效
        if(!$phone || $phone==null || !preg_match("/^1[34578]{1}\d{9}$/",$phone)){ 
            echo '失败';
            exit;
        }

        //验证验证码是否有效
        if(!$code || $code==null || !is_numeric($code)){ 
            echo '失败';
            exit;
        }

        //查询当前输入的手机号、验证码是否有效
        $where = 'phone = "'.$phone.'" and code = "'.$code.'" and sendtime>=date_sub(sysdate(),interval 900 second)';
        $data = $this->sendcode_mdl->get($where);
        if(empty($data)){
            echo '失败';
            exit;
        }else{
            echo '成功';
            exit;
        }
    }

    //生成6位随机数
    public function random($length = 6 , $numeric = 0) {
        PHP_VERSION < '4.2.0' && mt_srand((double)microtime() * 1000000);
        if($numeric) {
            $hash = sprintf('%0'.$length.'d', mt_rand(0, pow(10, $length) - 1));
        } else {
            $hash = '';
            /* $chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghjkmnpqrstuvwxyz';*/
            $chars = '0123456789';
            $max = strlen($chars) - 1;
            for($i = 0; $i < $length; $i++) {
                $hash .= $chars[mt_rand(0, $max)];
            }
        }
        return $hash;
    }

    //参数说明
    //$RecNum 目标手机号
    //$mobile_code 验证码
    //返回值
    //发送成功返回true,结果仅供参数，不保证完全正确
    public function SendSMS($RecNum,$mobile_code,$accessKeySecret)
    {
        $url='https://sms.aliyuncs.com/';//短信网关地址
        $Params['Action']='SingleSendSms';//操作接口名，系统规定参数，取值：SingleSendSms
        //$Params['RegionId']='cn-hangzhou';//机房信息
        $Params['AccessKeyId']='bvErhn4jEMCbMLSA';//阿里云颁发给用户的访问服务所用的密钥ID
        //$Params['Format']='JSON';//返回值的类型，支持JSON与XML。默认为XML
        $Params['ParamString']=rawurlencode("{\"checkcode\":\"".strval($mobile_code)."\"}");//短信模板中的变量；数字需要转换为字符串；个人用户每个变量长度必须小于15个字符。
        $Params['RecNum']=$RecNum;//目标手机号
        $Params['SignatureMethod']='HMAC-SHA1';//签名方式，目前支持HMAC-SHA1
        $Params['SignatureNonce']=time();//唯一随机数
        $Params['SignatureVersion']='1.0';//签名算法版本，目前版本是1.0
        $Params['SignName']=rawurlencode('政策百晓生');//管理控制台中配置的短信签名（状态必须是验证通过）
        $Params['TemplateCode']='SMS_53160221';//管理控制台中配置的审核通过的短信模板的模板CODE（状态必须是验证通过）
        $Params['Timestamp']=rawurlencode(gmdate("Y-m-d\TH:i:s\Z"));//请求的时间戳。日期格式按照ISO8601标准表示
                                                                  //并需要使用UTC时间。格式为YYYY-MM-DDThh:mm:ssZ
        $Params['Version']='2016-09-27';//API版本号，当前版本2016-09-27
        ksort($Params);
        $PostData='';
        foreach ($Params as $k => $v) $PostData.=$k.'='.$v.'&';
        $PostData.='&Signature='.rawurlencode(base64_encode(hash_hmac('sha1','POST&%2F&'.rawurlencode(substr($PostData,0,-1)),$accessKeySecret.'&',true)));
        $httphead['http']['method']="POST";
        $httphead['http']['header']="Content-type:application/x-www-form-urlencoded\n";
        $httphead['http']['header'].="Content-length:".strlen($PostData)."\n";
        $httphead['http']['content']=$PostData;
        $httphead=stream_context_create($httphead);
        $result=@simplexml_load_string(file_get_contents($url,false,$httphead));
        return !isset($result->Code);
    }
}
?>