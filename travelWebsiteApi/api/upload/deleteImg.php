<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$data = json_decode(file_get_contents('php://input') , true);
$toDel = htmlspecialchars($data['toDelete']);
unlink("imgs/$toDel");
?>
