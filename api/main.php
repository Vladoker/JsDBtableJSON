<?php 
header('Content-Type: application/json');
$file = file_get_contents('../data/data.json');
$list = json_decode($file,TRUE); 

$list[] = $_POST;
file_put_contents('../data/data.json',json_encode($list));

unset($list);
?>