<?php

namespace Unrelated\Amplify\CustomizerPlugin;

use Madebymunsters\Gutenberg\Support\Registration\SimpleBlockRegistrar;
use Madebymunsters\Gutenberg\Support\Registration\BlockMetadataPathBuilder;

class PluginLoader
{
    private $plugin_root_file;
    private $plugin_root;

    public function __construct($plugin_root_file)
    {
        $this->plugin_root_file = $plugin_root_file;
        $this->plugin_root = untrailingslashit(plugin_dir_path($plugin_root_file));
    }

    public function start(): void
    {
        add_action(
            'init',
            [$this, 'init'],
            10,
            0
        );

        (new WebAssetRegistrar(plugin_base_dir_file: $this->plugin_root_file))->register();

        $block_locations = BlockMetadataPathBuilder::buildBlockPaths(
            base_dir: dirname($this->plugin_root_file) . "/src/Blocks",
            relative_block_paths: [],
        );

        (new SimpleBlockRegistrar($block_locations))->register();
    }

    public function init(): void
    {
        return;
    }
}
