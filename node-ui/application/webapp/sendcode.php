<?php
    // 此文档适用于阿里云短信(非阿里大于)
    // 文档地址：https://help.aliyun.com/document_detail/44364.html?spm=5176.2020520168.101.4.lzXArI
    // 需要参数 ：
    // 1 $accessKeyId 申请开通的ID
    // 2 $accessKeySecret 申请开通的密匙
    // 3 TemplateCode 模板代码(在阿里后台申请)
    // 4 $sign 签名
    // 请求参数：
    // 1 $mobile 接受短信的手机号

    session_start();
    header("Content-type:text/html; charset=UTF-8");
    $target = "https://sms.aliyuncs.com/?";

    $mobile = '18600416627';
    $send_code = $_POST['send_code'];

    $mobile_code = random(6,1);

    if(empty($mobile)){
        exit('手机号码不能为空');
    }

    if(empty($_SESSION['send_code']) or $send_code!=$_SESSION['send_code']){
        exit('请求超时，请刷新页面后重试');
    }

    // 注意使用GMT时间
    date_default_timezone_set("GMT");
    // ISO8601规范
    $dateTimeFormat = 'Y-m-d\TH:i:s\Z';
    // 这里填写您的Access Key ID
    $accessKeyId = 'AAAA';
    // 这里填写您的Access Key Secret
    $accessKeySecret = 'BBB';
    // 模板替换参数 eg： 尊敬的{$name},欢迎使用XXX。 $name 的替换参数就是 {"name":"张三"} 这样的写法
    $ParamString="{\"name\":\"用户\"}";
    // 公共参数
    $data = array(
        // 签名
        'SignName'          =>'签名',
        // 返回格式
        'Format'            => 'XML',
        // 版本号
        'Version'           => '2016-09-27',
        // ID
        'AccessKeyId'       => $accessKeyId,
        // 签名版本
        'SignatureVersion'  => '1.0',
        // 加密方式
        'SignatureMethod'   => 'HMAC-SHA1',
        // 随机数
        'SignatureNonce'    => uniqid(),
        // 时间
        'Timestamp'         => date($dateTimeFormat),
        // 接口参数
        'Action'            => 'SingleSendSms',
        // 模板代码
        'TemplateCode'      => 'SMS_33685217',
        // 接受手机号
        'RecNum'            => $mobile,
        // 替换参数
        'ParamString'       => $ParamString
    );
    // 计算签名并把签名结果加入请求参数
    $data['Signature'] = computeSignature($data, $accessKeySecret);

    // 发送请求
    $result = xml_to_array(https_request($target.http_build_query($data)));
    // 打印返回错误代码
    echo $result['Error']['Code']."--->".$result['Error']['Message'];
    // 打印请求地址
    echo "<br><br>".$target . http_build_query($data);

    /**
     * CURL请求
     * @param $url
     * @return mixed|string
     */
    function https_request($url)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $url);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $data = curl_exec($curl);
        if (curl_errno($curl)) {return 'ERROR '.curl_error($curl);}
        curl_close($curl);
        return $data;
    }

    /**
     * xml数据转换成数组
     * @param $xml
     * @return mixed
     */
    function xml_to_array($xml)
    {
        $reg = "/<(\w+)[^>]*>([\\x00-\\xFF]*)<\\/\\1>/";
        if(preg_match_all($reg, $xml, $matches)){
            $count = count($matches[0]);
            for($i = 0; $i < $count; $i++){
            $subxml= $matches[2][$i];
            $key = $matches[1][$i];
                if(preg_match( $reg, $subxml )){
                    $arr[$key] = xml_to_array( $subxml );
                }else{
                    $arr[$key] = $subxml;
                }
            }
        }
        return @$arr;
    }

    /**
     * 获取随机数
     * @param int $length
     * @param int $numeric
     * @return string
     */
    function random($length = 6 , $numeric = 0) 
    {
        PHP_VERSION < '4.2.0' && mt_srand((double)microtime() * 1000000);
        if($numeric) {
            $hash = sprintf('%0'.$length.'d', mt_rand(0, pow(10, $length) - 1));
        } else {
            $hash = '';
            //$chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789abcdefghjkmnpqrstuvwxyz';
            $chars = '0123456789';
            $max = strlen($chars) - 1;
            for($i = 0; $i < $length; $i++) {
                $hash .= $chars[mt_rand(0, $max)];
            }
        }
        return $hash;
    }

    /**
     * 处理编码
     * @param $str
     * @return mixed|string
     */
    function percentEncode($str)
    {
        // 使用urlencode编码后，将"+","*","%7E"做替换即满足ECS API规定的编码规范
        $res = urlencode($str);
        $res = preg_replace('/\+/', '%20', $res);
        $res = preg_replace('/\*/', '%2A', $res);
        $res = preg_replace('/%7E/', '~', $res);
        return $res;
    }

    /**
     * 签名
     * @param $parameters
     * @param $accessKeySecret
     * @return string
     */
    function computeSignature($parameters, $accessKeySecret)
    {
        // 将参数Key按字典顺序排序
        ksort($parameters);
        // 生成规范化请求字符串
        $canonicalizedQueryString = '';
        foreach($parameters as $key => $value)
        {
            $canonicalizedQueryString .= '&' . percentEncode($key) . '=' . percentEncode($value);
        }
        // 生成用于计算签名的字符串 stringToSign
        $stringToSign = 'GET&%2F&' . percentencode(substr($canonicalizedQueryString, 1));
        //echo "<br>".$stringToSign."<br>";
        // 计算签名，注意accessKeySecret后面要加上字符'&'
        $signature = base64_encode(hash_hmac('sha1', $stringToSign, $accessKeySecret . '&', true));
        return $signature;
    }

?>