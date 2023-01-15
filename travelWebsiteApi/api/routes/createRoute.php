<?php
  //headers
  header('Access-Control-Allow-Origin: *');
  header('Content-Type: application/json');
  header('Access-Control-Allow-Method: Post');
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
  $data = json_decode(file_get_contents('php://input') , true);

if($data){
    $route->tableId = htmlspecialchars($data['tableId']);
    $route->tripType = htmlspecialchars($data['tripType']);
    $route->img = htmlspecialchars($data['img']);
    $route->secondaryImg = json_encode($data['secondaryImg']);
    $route->name = htmlspecialchars($data['name']);
    $route->description = htmlspecialchars($data['description']);
    $route->star = htmlspecialchars($data['star']);
    $route->price = htmlspecialchars($data['price']);
    $route->adate = htmlspecialchars($data['adate']);
    $route->ddate = htmlspecialchars($data['ddate']);
    $route->atime = htmlspecialchars($data['atime']);
    $route->dtime = htmlspecialchars($data['dtime']);
    $route->ticketsAvailable = htmlspecialchars($data['ticketsAvailable']);
    $route->airLine = htmlspecialchars($data['airLine']);
    $route->dfrom = htmlspecialchars($data['dfrom']);

    $res = $route->createRoute();

    if($res){
        echo json_encode(
        array('ms'=>'route created'));
    }else{
        header("HTTP/1.0 404");
    }
}
?>
