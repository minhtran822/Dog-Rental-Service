<?php
/**
 * Establish a connection to the mysql database
 * Stored in protected directory
 */
$conn = new mysqli('sapphire.otago.ac.nz', 'mtrn', '123456789',
    'mtrn_dev');

if ($conn->connect_errno) {
    echo "Error";
}