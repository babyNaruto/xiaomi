<?php
    header('content-type:text/html;charset="utf-8"');
    //定义统一的返回格式
    $responseData = array("code" => 0, "message" => "");
    //将通过post提交的数据全部取出来
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createtime = $_POST['createtime'];

    //对后台接收到的数据进行判断
    if(!$username){
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        //将数据按照统一返回格式返回
        echo json_encode($responseData);
        exit;
    }
    if(!$password){
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        //将数据按照统一返回格式返回
        echo json_encode($responseData);
        exit;
    }
    if($password != $repassword){
        $responseData["code"] = 3;
        $responseData["message"] = "2次密码输入不一致";
        //将数据按照统一返回格式返回
        echo json_encode($responseData);
        exit;
    }
    //连接数据库，判断用户名是否之前注册过
    //天龙八部 PHP7连接数据库
    //1.连接数据库
    $link = mysqli_connect("127.0.0.1", "root", "971020");

    //2.判断数据库是否连接成功
    if(!$link){
        $responseData["code"] = 4;
        $responseData["message"] = "服务器忙";
        //将数据按照统一返回格式返回
        echo json_encode($responseData);
        exit;
    }

    //3.设置字符集
    mysqli_set_charset($link, "utf-8");

    //4.选择数据库
    mysqli_select_db($link, "xiaomi");

    //5.准备sql语句验证是否注册过
    $sql = "SELECT * FROM users WHERE username='{$username}'";

    $res = mysqli_query($link, $sql);

    $row = mysqli_fetch_assoc($res);

    if(!$row){
        /*
            密码要加密
        */
        $str = md5(md5(md5($password).'beijing').'china');
        //准备sql语句进行注册
        $sql2 = "INSERT INTO users(username,password,createTime) VALUES('{$username}','{$str}',{$createtime})";

        $res = mysqli_query($link, $sql2);
            if($res){
                $responseData['message'] = "注册成功";
                echo json_encode($responseData);
            }else{
                $responseData['code'] = 5;
                $responseData['message'] = "注册失败";
                echo json_encode($responseData);
            }
        }else{
            $responseData['code'] = 6;
            $responseData['message'] = "用户名重名";
            echo json_encode($responseData);
            exit;
        }
    //8.关闭数据库
    mysqli_close($link);




    




?>