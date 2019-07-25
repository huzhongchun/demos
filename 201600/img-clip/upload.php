<?php
	$aa=$_POST['pic'];
	define('UPLOAD_DIR', dirname(__FILE__).'/upload/'); 			//图片保存路径 
    $img = $aa;
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
	$filename = date('YmdHis',time()) . '.jpg';
    $file = UPLOAD_DIR . $filename;
    $success = file_put_contents($file, $data);
	exit ($success ? $filename: 'error');
?>
