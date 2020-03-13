<?php
header('Content-Type: application/json');
$file = file_get_contents('../data/data.json');
$list = json_decode($file,TRUE); 

$postfiles = $_POST;




foreach ($postfiles as $objPpost) {
    $patchDir = end($objPpost);
    foreach ($list as $index => $objList) {
       
        if ($objPpost == $objList) {
            unset($list[$index]);
            if ($patchDir != "") {
                delDir("../data/photo/" . $patchDir);
            }
        }
        
    }  
}
$new_list = [];
$i = 0;

    foreach($list as $obj_list) {
        $new_list[$i++] = $obj_list;
    } 

    function delDir($dir) {
        $files = array_diff(scandir($dir), ['.','..']);
        foreach ($files as $file) {
            (is_dir($dir.'/'.$file)) ? delDir($dir.'/'.$file) : unlink($dir.'/'.$file);
        }
        return rmdir($dir);
    }


file_put_contents('../data/data.json',json_encode($new_list));

unset($list);
echo "true";
?>