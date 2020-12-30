<?php

@include "../config/script_config.php";

$filenum = $_GET['filenum'];

$call = $PyPath.' '.$scriptPath.' '. $filenum. " 2>&1";
exec( $call, $resArr );

echo json_encode( $resArr );

?>