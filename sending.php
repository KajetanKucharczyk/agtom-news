<?php
require_once(dirname(__FILE__)."/../kajtek_init.php");

$_sending = Array();

$_name = $_GET["name"];
$_date = $_GET["date"];
$_reference = $_GET["reference"];

$_products = Array();
$_reference = rtrim($_reference, ';');
$_references = explode(";", $_reference);
foreach($_references as $_ref) {

	$_product_id = $reference->get_id_from_reference($_ref);
	$_product_name = $product->get_polish_name_by_product_id($_product_id);
	$_product_link = $product_link->get_product_link_by_id($_product_id);

	$_query = "SELECT id_image FROM image WHERE id_product=$_product_id AND cover=1";
	$_result = $connection->ExecuteS($_query);
	$_dir = implode('/',str_split($_result[0]['id_image'])); 
	$_product_image = "http://agtom.eu/img/p/".$_dir."/".$_result[0]['id_image'].".jpg";
	
	array_push(
		$_products,
		Array(
			"reference" => $_ref,
			"name" => $_product_name,
			"link" => $_product_link,
			"image" => $_product_image
		)
	);
}

$_products = json_encode($_products);
$query = "INSERT INTO `kajtek_news` (`NAME`, `DATE`, `DATA`) VALUES ('$_name', '$_date', '$_products')";
$connection->ExecuteS($query);

?>