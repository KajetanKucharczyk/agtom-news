<?php

require_once(dirname(__FILE__)."/../kajtek_init.php");

$_counter = $_POST["last"];

$_query = "SELECT * FROM `kajtek_news` ORDER BY `DATE` DESC";
$_results = $connection->ExecuteS($_query);

$_content_container = Array();
	
$_name = $_results[$_counter]["NAME"];
$_date = $_results[$_counter]["DATE"];
$_data = json_decode($_results[$_counter]["DATA"], true);

foreach($_data as $_product) {
	
	$_content = Array(
		"name" => $_product["name"],
		"url" => $_product["link"],
		"image" => $_product["image"],
		"reference" => $_product["reference"]
	);
	array_push($_content_container, $_content);
	
}

$array = [
	"title" => $_name,
	"date" => $_date,
	"content" => $_content_container	
];

print_r(json_encode($array));

?>