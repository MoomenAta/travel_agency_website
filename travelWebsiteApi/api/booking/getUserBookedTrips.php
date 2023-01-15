<?php

//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Method: Post');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Method,Content-Type,Authorization,X-Requested-With');

//include Files
include_once '../../config/Database.php';
include_once '../../modules/booked.php';

$database = new Database();
$dbConn = $database->connect();
$booked = new Booked($dbConn);

$userData = json_decode(file_get_contents('php://input') , true);
if($userData){
  $userId= htmlspecialchars($userData['id']);
  $req = $booked->getUserBookedTrips($userId);
  if($req){
    echo json_encode($req);
  }else{
    header("HTTP/1.0 404");
  }
}

?>
