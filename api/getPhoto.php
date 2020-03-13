<?php 
 
$patch = key($_POST);

$allPhotos = glob("../data/photo/" . $patch . "/*");


echo json_encode($allPhotos);
?>