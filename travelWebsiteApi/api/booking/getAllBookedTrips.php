<?php
//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//include Files
include_once '../../config/Database.php';
include_once '../../modules/booked.php';

//create instance of Database class and call connect function in it
$database = new Database();
$dbConn = $database->connect();
$booked = new Booked($dbConn);

$req = $booked->getBookedTrips();
echo json_encode($req);


?>
