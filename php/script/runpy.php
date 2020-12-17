<?php

$filenum = $_GET['filenum'];

$PyPath = "C:\\Users\\lenovo\\AppData\\Local\\Programs\\Python\\Python36\\python.exe";
$scriptPath = "C:\\wamp64\\www\\quantumDB\\py\\pdfm.py";

$call = $PyPath.' '.$scriptPath.' '. $filenum. " 2>&1";
exec( $call, $resArr );

echo json_encode( $resArr );

?>