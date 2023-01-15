<?php
//headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

//include Files
include_once '../../config/Database.php';
include_once '../../modules/route.php';
error_reporting(E_ALL ^ E_WARNING);
//create instance of Database class and call connect function in it
$database = new Database();
$dbConn = $database->connect();
$tbName = "trips";
//create instance of route Class and pass database conn to it and call getRoute function in it
$route = new Route($dbConn , $tbName);

$name =  ($_GET['name']);
$type = ($_GET['type']);
$id = $_GET['id'];
$star = ($_GET['star']);
$min = ($_GET['min']);
$max = ($_GET['max']);
$adate = ($_GET['adate']);
$ddate = ($_GET['ddate']);
$searchParams=[
  'name'=> "$name",
  'tableId'=> "$type",
  'rowId'=> "$id",
  'star'=> "$star",
  'min-price'=> "$min" ,
  'max-price'=> "$max",
  'adate'=> "$adate",
  'ddate'=> "$ddate",
];
$q='';
$sep='';
foreach ($searchParams as $param => $paramValue) {
  if($paramValue !==''){
    if($param == 'min-price'){
      $q .= "$sep price >= '$paramValue'";
    }elseif ($param == 'max-price') {
      $q .= "$sep price <= '$paramValue'";
    }else{
      $q .= "$sep$param = '$paramValue'";
    }
    $sep = " AND ";
  }
}

$res = $route->getResults($q);
$results = [...$res];
echo json_encode($results);


?>
