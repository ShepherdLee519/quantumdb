<?php

$filename = $_GET['filename'];

$PyPath = "C:\\Users\\lenovo\\AppData\\Local\\Programs\\Python\\Python36\\python.exe";
$scriptPath = "C:\\wamp64\\www\\quantumDB\\py\\pdfm.py";

$call = $PyPath.' '.$scriptPath.' '. $filename. " 2>&1";
exec( $call, $resArr );

print_r( $resArr );

?>