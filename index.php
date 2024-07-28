<?php
// Der Titel der Seite
$pageTitle = 'Turnierpaare - Club Ceronne';
// Der Inhalt, der spezifisch für die Turnierpaare-Seite ist
ob_start();
?>
<!-- Spezifischer Inhalt für die Turnierpaare-Seite -->
<div class="filters-container">
    <select id="age-group-filter" class="custom-select">
        <option value="all">Alle Alterklassen</option>
        <option value="Jugend">Jugend</option>
        <option value="HGR">HGR</option>
        <option value="HGR II">HGR II</option>
        <option value="Masters I">Masters I</option>
        <option value="Masters II">Masters II</option>
        <option value="Masters III">Masters III</option>
        <option value="Masters IV">Masters IV</option>
        <option value="EQT Frauen 16+">EQT Frauen 16+</option>
    </select>

    <select id="latin-level-filter" class="custom-select">
        <option value="all">Alle Latein Leistungsklassen</option>
        <option value="S">S</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="none">keine</option>
    </select>

    <select id="ballroom-level-filter" class="custom-select">
        <option value="all">Alle Standard Leistungsklassen</option>
        <option value="S">S</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="none">keine</option>
    </select>

    <input type="text" id="name-filter" class="custom-input" placeholder="Nach Namen suchen...">

    <button id="reset-filters" class="reset-filters-btn">Reset</button>
</div>
<div id="couple-list">
    <!-- Die Turnierpaare werden hier per JavaScript eingefügt -->
</div>
<script src="coupleFiltering.js"></script>

<!-- Zusätzliche Informationen am Ende der Seite -->
<div class="additional-info">
    <h3>
        Einen aktuellen Eindruck über unsere Paare und deren Turniere findest Du auf unserer 
        <a href="https://www.instagram.com/etv.ceronne" target="_blank">Instagram-Seite</a>.
    </h3>
</div>
<button id="download-csv">Download CSV</button>

<?php
$content = ob_get_clean();

// Das gemeinsame Layout einbinden
include('layout.php');
?>
<link rel="stylesheet" href="couples.css">
