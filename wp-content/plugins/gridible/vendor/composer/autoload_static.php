<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitc1bbab1d4c6be499cd529814d154d02d
{
    public static $prefixLengthsPsr4 = array (
        'M' => 
        array (
            'Madebymunsters\\Gutenberg\\' => 25,
        ),
        'G' => 
        array (
            'Gridible\\Plugin\\' => 16,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Madebymunsters\\Gutenberg\\' => 
        array (
            0 => __DIR__ . '/..' . '/madebymunsters/munsters-gutenberg-support/lib',
        ),
        'Gridible\\Plugin\\' => 
        array (
            0 => __DIR__ . '/../..' . '/lib',
        ),
    );

    public static $prefixesPsr0 = array (
        'U' => 
        array (
            'Ubench' => 
            array (
                0 => __DIR__ . '/..' . '/devster/ubench/src',
            ),
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitc1bbab1d4c6be499cd529814d154d02d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitc1bbab1d4c6be499cd529814d154d02d::$prefixDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInitc1bbab1d4c6be499cd529814d154d02d::$prefixesPsr0;
            $loader->classMap = ComposerStaticInitc1bbab1d4c6be499cd529814d154d02d::$classMap;

        }, null, ClassLoader::class);
    }
}
