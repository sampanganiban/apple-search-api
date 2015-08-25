<?php

// Require the config file
require '../../config.php';

// Get the search query
$searchQuery = urlencode($_GET['searchQuery']);

// Start a connection using cURL
$connection = curl_init();

// Prepare options for the connection
curl_setopt($connection, CURLOPT_URL, 'https://itunes.apple.com/search?term='.$searchQuery);
curl_setopt($connection, CURLOPT_RETURNTRANSFER, true); // RAW output

// Proxy settings
curl_setopt($connection, CURLOPT_PROXY, 'proxy');
curl_setopt($connection, CURLOPT_PROXYPORT, '3128');
curl_setopt($connection, CURLOPT_PROXYUSERPWD, YOOBEE_LOGIN.':'.YOOBEE_PASSWORD);

// Execute the connection
$dataFromApple = curl_exec($connection);

// Close the connection
curl_close($connection);

// Prepare the header
header('Content-Type: application/json');

// Send the result back to JavaScript
echo $dataFromApple;










