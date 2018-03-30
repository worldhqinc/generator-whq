<?php

require 'classes/WHQAssets.php';

$GLOBALS['assets'] = new WHQAssets(get_template_directory() . '/build/manifest.json');
