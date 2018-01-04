<?php 

// Getting the Variables for Secure API...

$Sunwater_Cipher = $_GET['cipher'];


if ($Sunwater_Cipher == "all") { 
	
	// 
	$data = file_get_contents("http://www.sunwater.com.au/__data/win/reports/WIN/Data/130354A.csv");
	$rows = explode(PHP_EOL,$data);
	$last_row = array_pop($rows);
	$s = array();
	foreach($rows as $row) {
	    $s[] = str_getcsv($row);
	    
	}
	$arr = $s[count($s)-1];
	$arrat = array_values($arr);
	//var_dump($arrat);
	//echo $arrat[2]; // This depends on the Columns Adjusted dependent on the Columns.

	echo json_encode(array(
		    'status' => 200, // success or not?
		    'vicinity' => $arrat[2]
		    ));

} else { 
	echo json_encode(array(
	    'status' => 500, // success or not?
	    'message' => "Something Went Wrong! Please Try Again"
	    ));		
}


// JSON Response...


// API For Getting the Water Levels for Sunwater
/*
$data = file_get_contents("http://www.sunwater.com.au/__data/win/reports/WIN/Data/130354A.csv");
$rows = explode(PHP_EOL,$data);
$last_row = array_pop($rows);
$s = array();
foreach($rows as $row) {
    $s[] = str_getcsv($row);
    
}
$arr = $s[count($s)-1];
$arrat = array_values($arr);
echo $arrat[2];
*/


?>
