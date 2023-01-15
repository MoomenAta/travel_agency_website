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
    $user->firstName = htmlspecialchars($userData['firstName']);
    $user->lastName = htmlspecialchars($userData['lastName']);
    $user->email = htmlspecialchars($userData['email']);
    $user->password = htmlspecialchars($userData['password']);
    $user->isAdmin = htmlspecialchars($userData['isAdmin']);

    $res = $user->createUser();
    if($res){
      echo json_encode($res);
    }
    else {
      header("HTTP/1.0 405");
    }
  }

?>
