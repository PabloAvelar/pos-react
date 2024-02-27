<?php
	include('../connect.php');
	$id=$_GET['id'];
	$result = $db->prepare("DELETE FROM products WHERE product_id= :memid");
	$result->bindParam(':memid', $id);
	$result->execute();
?>