<?php
//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Method: DELETE');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Access-Control-Allow-Method,Content-Type,Authorization,X-Requested-With');


//include Files
include_once '../../config/Database.php';
include_once '../../modules/route.php';

//create instance of Database class and call connect function in it
$database = new Database();
$dbConn = $database->connect();
$tbName = "trips";
//create instance of route Class and pass database conn to it and call getRoute function in it
$route = new Route($dbConn , $tbName);
$data = json_decode(file_get_contents('php://input'));

/* $route->rowId = 13;
$route->arr = ["tripType" =>"Ship" , "name" => "Roma"]; */

if($data){
    $route->rowId = htmlspecialchars($data['rowId']);
    $res = $route->updateRoute();
    if($res) return true;
    else return false;
}
?>
