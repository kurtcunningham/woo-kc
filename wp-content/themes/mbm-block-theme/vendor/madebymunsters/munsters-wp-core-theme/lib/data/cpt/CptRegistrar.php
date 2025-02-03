<?php
namespace mbm\data\cpt;


class CptRegistrar {
  protected $config = NULL;
  public static $default_text_domain = 'mbm';

  public function __construct($config = []) {
    $this->config = $config;
  }

  public function register() {
    $text_domain = $this->config['text_domain'] ?? self::$default_text_domain;
    $post_types = $this->config['post_types'] ?? [];
    $taxonomies = $this->config['taxonomies'] ?? [];

    foreach ($post_types as $post_type_config) {
      $post_type = $post_type_config['post_type'];
      $singular = $post_type_config['name_singular'];
      $plural = $post_type_config['name_plural'];
      $config = $post_type_config['config'] ?? [];

      CptSupport::registerCpt($post_type, $singular, $plural, $text_domain, $config);
    }

    foreach ($taxonomies as $tax_config) {
      $tax_type = $tax_config['tax_type'];
      $singular = $tax_config['name_singular'];
      $plural = $tax_config['name_plural'];
      $assoc_post_types = $tax_config['assoc_post_types'];
      $config = $tax_config['config'] ?? [];

      CptSupport::registerTaxonomy($tax_type, $assoc_post_types, $singular, $plural, $text_domain, $config);
    }
  }
}

?>
