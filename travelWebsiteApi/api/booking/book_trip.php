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
$bookTrip = new Booked($dbConn);

$bookData = json_decode(file_get_contents('php://input') , true);
if($bookData){

  $userId = htmlspecialchars($bookData['userId']);
  $tripId = htmlspecialchars($bookData['tripId']);
  $name   = htmlspecialchars($bookData['name']);
  $img    = htmlspecialchars($bookData['img']);
  $adate  = htmlspecialchars($bookData['adate']);
  $ddate  = htmlspecialchars($bookData['ddate']);
  $email  = htmlspecialchars($bookData['email']);
  $price  = htmlspecialchars($bookData['price']);
  $seat   = htmlspecialchars($bookData['seat']);

  $res = $bookTrip->insertBooking($userId , $email , $tripId , $name , $img , $adate , $ddate , $seat , $price);
  if($res){
    echo 'true';
  }else{
    header("HTTP/1.0 404");
  }
}

?>
