<?php

// Composer autoload.
require_once( __DIR__ . '/vendor/autoload.php' );

define("AMP_CHILD_THEME_DIR", __DIR__);


(new \Unrelated\Amplify\ChildTheme\Theme(AMP_CHILD_THEME_DIR))->init();
