<?php
if (isset($scriptList) && is_array($scriptList)) {
    foreach ($scriptList as $script) {
        echo "<script src='$script'></script>";
    }
}

if (isset($currentPage)){
    echo "
        <nav><ul>";
    if ($currentPage === 'index.php') {
        echo "<li>Home";
    } else {
        echo "<li><a href=\"index.php\">Home</a>";
    }

    if ($currentPage === 'classic.php') {
        echo "<li>Classics";
    } else {
        echo "<li><a href=\"classic.php\">Classics</a>";
    }

    if ($currentPage === 'scifi.php') {
        echo "<li>Sci&nbsp;Fi";
    } else {
        echo "<li><a href=\"scifi.php\">Sci&nbsp;Fi</a>";
    }

    if ($currentPage === 'hitchcock.php') {
        echo "<li>Hitchcock";
    } else {
        echo "<li><a href=\"hitchcock.php\">Hitchcock</a>";
    }

    if ($currentPage === 'contact.php'){
        echo "<li> Contact";
    } else {
        echo "<li><a href=\"contact.php\">Contact</a>";
    }

    if ($currentPage === 'cart.php'){
        echo "<li>View&nbsp;Cart";
    } else {
        echo "<li><a href=\"cart.php\">View&nbsp;Cart</a>";
    }

    echo "
        </ul>
    </nav>";
}
?>