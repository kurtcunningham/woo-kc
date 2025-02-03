<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block default content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
// require_once(get_template_directory() . '/vendor/autoload.php');


// Enqueue the view file.
// wp_enqueue_script_module( 'mbm-gutenblocks-view' );

/*
wordpress-1   | [Wed Dec 20 03:44:11.605555 2023] [php:warn] [pid 268] [client 192.168.65.1:16003] PHP Warning:  Undefined variable $query_param_key_root in /var/www/html/wp-content/plugins/mbm-gutenblocks/src/blocks/query-filter-container/render.php on line 24, referer: http://gutenblocks.test/wp-admin/post.php?post=237&action=edit
*/

// Get block wrapper attributes.
$wrapper_attrs = get_block_wrapper_attributes();

// Not really sure what to do if there is no query ID...
$query_id = $block->context['queryId'] ?? NULL;

$query_param_key_root = "query-{$query_id}";
$matching_query_param_keys = array_filter(
  array_keys($_GET),
  function($param_key) use ($query_param_key_root) {
    return str_starts_with($param_key, $query_param_key_root);
  },
);

$query_param_values = array_reduce(
  $matching_query_param_keys,
  function($values, $param_key) {
    $value = sanitize_text_field($_GET[$param_key]);

    $values[$param_key] = $value;

    return $values;
  },
  [],
);

$interactive_context = [
  'queryId' => $query_id,
  // 'formValues' => $query_param_values,
  'serializedFormValues' => [],
  'initFormValues' => $query_param_values,
  'emptyFormValues' => [],
];
?>

<form
  <?= $wrapper_attrs ?>
  data-wp-interactive='{ "namespace": "amplifyQueryFilter" }'
  data-wp-context='<?= json_encode($interactive_context) ?>'
>
  <?= $content ?>
</form>
