<?php
//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Method: PUT');
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


if($data){
    $route->rowId = htmlspecialchars($data['rowId']);
    $route->data = $data;
    $res = $route->updateRoute();
    if($res) echo 'true';
    else echo 'false';
}
?>
