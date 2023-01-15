<?php
  //headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Method: Post');
  header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Method,Content-Type,Authorization,X-Requested-With');

  //include conn and users modules
  include_once '../../config/Database.php';
  include_once '../../modules/users.php';

  //create instance of db & users classes
  $database = new Database();
  $dbConn = $database->connect();
  $user = new users($dbConn);
  //When using JSON content-type the $_POST array will not populate (only with multi-part forms) this for fixing
  $userData = json_decode(file_get_contents("php://input"), true);

  if($userData){
    $user->email = htmlspecialchars($userData['email']);
    $user->password = htmlspecialchars($userData['password']);


    $res = $user->readUser();
    if($res){
      echo json_encode($res);
    }else{
      http_response_code(404);
    }
  }
  ?>
