<?php
/*
  - $attributes (array): The block attributes.
  - $content (string): The block (inner) content.
  - $block (WP_Block): The block instance.
*/

// Composer autoload.
require_once(MBM_GUTENBLOCKS_PLUGIN_DIR . '/vendor/autoload.php');

use Madebymunsters\Gutenblocks\Core\Blocks\TaxonomyFilter;


$wrapper_attrs = get_block_wrapper_attributes();

$taxonomy_slug = $attributes["taxonomySlug"] ?? NULL;

if (empty($taxonomy_slug)) {
  ?>
    <span <?= $wrapper_attrs ?>>
      No taxonomy is configured for this filter.
    </span>
  <?php

  return;
}

$taxonomy = get_taxonomy($taxonomy_slug);

if ($taxonomy === FALSE) {
  ?>
    <span <?= $wrapper_attrs ?>>
      Taxonomy with slug "<?= $taxonomy_slug ?>" could not be found.
    </span>
  <?php

  return;
}

$term_options_tree = TaxonomyFilter::getTermsTree($taxonomy_slug);

if (empty($term_options_tree)) {
  ?>
    <p>
      No terms could be found for <?= $taxonomy->label ?>.
    </p>
  <?php

  return;
}

// Not really sure what to do if there is no query ID...
$query_id = $block->context['queryId'] ?? NULL;

$query_param_key = "query-{$query_id}-{$taxonomy_slug}";
$query_param_value_raw = sanitize_text_field($_GET[$query_param_key] ?? NULL);
$query_param_values = array_filter(
  explode(',', $query_param_value_raw),
  function($value) {
    return !empty(trim($value));
  }
);

$interactive_context = [
  'queryParamKey' => $query_param_key,
  'formValues' => $query_param_values,
  'taxonomy' => [
    'singularName' => $taxonomy->labels->singular_name,
    'pluralName' => $taxonomy->labels->name,
  ],
  // Default to closed
  'isOpen' => FALSE,
];

$is_checked_attribute_fn = static function($cat_slug) use ($query_param_values) {
  return (in_array($cat_slug, $query_param_values)) ? 'checked' : '';
};

$render_term_option = static function($term_option) use ($query_id, $taxonomy_slug, &$is_checked_attribute_fn, &$render_term_option): void {
  $input_id = "query-{$query_id}-{$taxonomy_slug}-{$term_option->slug}";

  ?>
    <li>
      <label for="<?= $input_id ?>">
        <input
          type="checkbox"
          id="<?= $input_id ?>"
          name="<?= $term_option->slug ?>"
          <?= $is_checked_attribute_fn($term_option->slug) ?>
          data-wp-on--change="actions.onFilterChange"
        >
        <?= $term_option->name ?>
      </label>
      
      <?php if (!empty($term_option->children)): ?>
        <ul>
          <?php 
            foreach ($term_option->children as $child) {
              $render_term_option($child);
            }
          ?>
        </ul>
      <?php endif; ?>
    </li>
  <?php
};

?>

<div
  <?= $wrapper_attrs ?>
  data-wp-interactive='{ "namespace": "amplifyQueryFilter" }'
  data-wp-context='<?= json_encode($interactive_context) ?>'
  data-wp-init="actions.onInit"
  data-wp-class--wp-block-mbm-query-taxonomy-filter--open="context.isOpen"
  data-wp-on-document--click="actions.onClickOutside"
  role="listbox"
>
  <div 
    class="wp-block-mbm-query-taxonomy-filter__status"
    data-wp-on--click="actions.onToggleOpen"
  >
    <p style="margin: 0">
      <span data-wp-text="state.filterLabel"><?= $taxonomy->labels->singular_name ?> filter</span>
    </p>
    <?= $content ?>
  </div>
  <ul
    class="wp-block-mbm-query-taxonomy-filter__options"
  >
    <?php 
      foreach ($term_options_tree as $term_option) {
        $render_term_option($term_option);
      }
    ?>
  </ul>
</div>
