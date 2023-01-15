<?php
//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//include Files
include_once '../../config/Database.php';
include_once '../../modules/route.php';

//create instance of Database class and call connect function in it
$database = new Database();
$dbConn = $database->connect();
$tbName = "trips";
//create instance of route Class and pass database conn to it and call getRoute function in it
$route = new Route($dbConn , $tbName);
$res = $route->getRoute();

//check if database has rows
$rowsNum = $res->rowCount();
if($rowsNum){
    $route = [];
    $route['data'] = [];
    while($row = $res->fetch(PDO::FETCH_ASSOC)){
        extract($row);
        //$route['data'] = [...$route['data'],$row];
        array_push($route['data'], $row);
    }

    echo json_encode($route);
} else {
    //No Routes
    header("HTTP/1.0 404");
}
?>
