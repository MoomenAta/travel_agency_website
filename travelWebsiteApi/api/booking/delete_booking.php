<?php
//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Method: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Method,Content-Type,Authorization,X-Requested-With');


//include Files
include_once '../../config/Database.php';
include_once '../../modules/booked.php';

//create instance of Database class and call connect function in it
$database = new Database();
$dbConn = $database->connect();
//create instance of route Class and pass database conn to it and call getRoute function in it
$booked = new Booked($dbConn);
$data = json_decode(file_get_contents('php://input') , true);

if($data){
    $id = htmlspecialchars($data['id']);
    $res = $booked->deleteBooking($id);
    if($res) echo 'true';
    else header("HTTP/1.0 404");
}
?>
