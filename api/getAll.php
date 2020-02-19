<?php 
header('Content-Type: application/json');
$file = file_get_contents('../data/data.json');


echo $file;



?>