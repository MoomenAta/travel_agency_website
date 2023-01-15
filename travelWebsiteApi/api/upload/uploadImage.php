<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PUT");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $filename = $_FILES['img']['name'];
    $ext = pathinfo($filename , PATHINFO_EXTENSION);
    $timeNow = time();
    $imgDBName = "photo-$timeNow.$ext";
    move_uploaded_file($_FILES['img']['tmp_name'], "imgs/$imgDBName");

    $data = array(
		'imgSrc'		=>	"$imgDBName"
    );
  	echo json_encode($data);

/*
    $DIR = "imgs/";
    $httpPost = file_get_contents("php://input");
    $req = json_decode($httpPost);
    echo $req;
    $file_chunks = explode(";base64,", $req->image);
    $fileType = explode("image/", $file_chunks[0]);
    //print_r($fileType);
    $image_type = $fileType[1];
    //echo ($image_type);

    //$base64Img = base64_decode($file_chunks[1]);

    //$file = $DIR . uniqid() . '.png';

    //file_put_contents($file, $base64Img);*/
?>
