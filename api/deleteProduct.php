<?php
header('Content-Type: application/json');
$file = file_get_contents('../data/data.json');
$list = json_decode($file,TRUE); 

$postfiles = $_POST;



foreach ($postfiles as $objPpost) {
    
    foreach ($list as $index => $objList) {
       
        if ($objPpost == $objList) {
            unset($list[$index]);
        }
        
    }  
}
$new_list = [];
$i = 0;

    foreach($list as $obj_list) {
        $new_list[$i++] = $obj_list;
    } 


file_put_contents('../data/data.json',json_encode($new_list));

unset($list);
?>