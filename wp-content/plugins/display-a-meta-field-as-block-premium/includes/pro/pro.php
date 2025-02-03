<?php
/**
 * The Pro
 *
 * @package   MetaFieldBlock
 * @author    Phi Phan <mrphipv@gmail.com>
 * @copyright Copyright (c) 2023, Phi Phan
 */

namespace MetaFieldBlock;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( Pro::class ) ) :
	/**
	 * The Pro class.
	 */
	class Pro extends CoreComponent {
		/**
		 * The script handle for the premium version
		 *
		 * @var string
		 */
		public $premium_script_handle = 'mfb-meta-field-block-premium-editor-script';

		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Add premium attributes.
			add_filter( 'register_block_type_args', [ $this, 'register_pro_attributes' ], 10, 2 );

			// Register the sub block.
			add_action( 'init', [ $this, 'register_block' ] );

			// Add namespace to sub blocks.
			add_filter( 'render_block', [ $this, 'add_namespace_to_sub_blocks' ], 10, 3 );

			// Register scripts.
			add_action( 'init', [ $this, 'register_scripts' ] );

			// Add rest api endpoint to get an entity by id.
			add_action( 'rest_api_init', [ $this, 'register_endpoint_for_getting_entity_by_id' ] );

			// Add rest api endpoint to expose public object types.
			add_action( 'rest_api_init', [ $this, 'register_endpoint_for_expose_public_object_types' ] );

			// Expose other public types.
			add_filter( 'meta_field_block_get_additional_public_types_for_rest', [ $this, 'get_other_public_object_types' ] );

			// Flush the mfb cache.
			add_action( 'acf/save_post', [ $this, 'flush_mfb_cache' ] );

			// Register block bindings.
			add_action( 'init', [ $this, 'register_block_bindings' ] );
		}

		/**
		 * Add premium attributes to the block
		 *
		 * @param array  $args
		 * @param string $block_name
		 * @return array
		 */
		public function register_pro_attributes( $args, $block_name ) {
			if ( 'mfb/meta-field-block' === $block_name ) {
				$args['attributes']['metaType'] = [
					'type'    => 'string',
					'default' => '',
				];

				$args['attributes']['isCustomSource'] = [
					'type'    => 'boolean',
					'default' => false,
				];

				$args['attributes']['objectId'] = [
					'type' => 'integer',
				];

				$args['editor_script_handles'][0] = $this->premium_script_handle;
			} elseif ( 'mfb/sub-field-block' === $block_name ) {
				$args['editor_script_handles'][] = $this->premium_script_handle;
			}

			return $args;
		}

		/**
		 * Register the block
		 *
		 * @return void
		 */
		public function register_block() {
			// Register block.
			register_block_type(
				MFB_PATH . '/build/premium-only/sub-field-block',
				[
					'render_callback'   => [ $this, 'render_block' ],
					'skip_inner_blocks' => true,
				]
			);
		}

		/**
		 * Renders the `mbf/sub-field-block` block on the server.
		 *
		 * @param  array    $attributes Block attributes.
		 * @param  string   $content    Block default content.
		 * @param  WP_Block $block      Block instance.
		 * @return string   Returns the value for a sub field.
		 */
		public function render_block( $attributes, $content, $block ) {
			// Get object id.
			$object_id = $block->context['mfb/objectId'] ?? '';

			// Get object type.
			$object_type = $block->context['mfb/objectType'] ?? '';

			// Get block value.
			$block_value = $this->the_plugin_instance->get_component( ACFFieldsPro::class )->get_sub_block_value( $attributes, $block );

			$field_label = '';
			if ( ! $this->is_dynamic_block( $attributes ) ) {
				// For SFB only.
				// Handle empty value for fields that are not layout fields like group, repeater, flexible_content.
				if ( ( $block_value['field']['type'] ?? '' ) && ! ( $block_value['value'] ?? '' ) ) {
					return $this->handle_empty_value( $content, $attributes, $block );
				}

				$classes = '';

				// Get an instance of the current block.
				$block_instance = $block->parsed_block;

				// Set the block name to one that does not correspond to an existing registered block.
				// This ensures that for the inner instances of the block, we do not render any block supports.
				$block_instance['blockName'] = 'core/null';

				if ( 'repeater' === ( $attributes['fieldSettings']['type'] ?? '' ) ) {
					if ( $block_value ) {
						$field_path    = $attributes['fieldPath'] ?? [];
						$repeater_name = '';
						if ( $field_path && is_array( $field_path ) && count( $field_path ) > 0 ) {
							$repeater_name = end( $field_path );
						}

						$content = '';
						foreach ( $block_value as $item_value ) {
							$filter_block_context = static function ( $context ) use ( $repeater_name, $item_value ) {
								$context['mfb/value'] = [ $repeater_name => $item_value ];
								return $context;
							};

							// Use an early priority to so that other 'render_block_context' filters have access to the values.
							add_filter( 'render_block_context', $filter_block_context, 1 );
							$content .= sprintf( '<div class="mfb-repeater-item">%s</div>', ( new \WP_Block( $block_instance ) )->render( array( 'dynamic' => false ) ) );
							remove_filter( 'render_block_context', $filter_block_context, 1 );
						}

						$classes = 'mfb-repeater';
					}
				} elseif ( 'flexible_content' === ( $attributes['fieldSettings']['type'] ?? '' ) ) {
					if ( $block_value ) {
						$field_path = $attributes['fieldPath'] ?? [];

						$content = '';
						foreach ( $block_value as $item_value ) {
							if ( ! $item_value ) {
								continue;
							}

							$layout_value = reset( $item_value );
							$layout_name  = key( $item_value );

							$filter_block_context = static function ( $context ) use ( $field_path, $layout_name, $layout_value ) {
								$layout_value_path = [ $layout_name => $layout_value ];
								// Add full path.
								if ( $field_path ) {
									$reversed_field_path = array_reverse( $field_path );
									foreach ( $reversed_field_path as $path ) {
										$layout_value_path = [ $path => $layout_value_path ];
									}
								}
								$context['mfb/value'] = $layout_value_path;
								return $context;
							};

							// Use an early priority to so that other 'render_block_context' filters have access to the values.
							add_filter( 'render_block_context', $filter_block_context, 1 );
							$content .= ( new \WP_Block( $block_instance ) )->render( array( 'dynamic' => false ) );
							remove_filter( 'render_block_context', $filter_block_context, 1 );
						}
					}
				} elseif ( 'flexible_content-layout' === ( $attributes['fieldSettings']['type'] ?? '' ) ) {
					if ( $block_value ) {
						$content = ( new \WP_Block( $block_instance ) )->render( array( 'dynamic' => false ) );
					}

					// Always hide empty layouts.
					if ( empty( $content ) ) {
						return '';
					}
				} else {
					$content = ( new \WP_Block( $block_instance ) )->render( array( 'dynamic' => false ) );
				}

				// Allow altering the result.
				$content = apply_filters( '_meta_field_block_get_inner_block_content', $content, $block_value, $attributes, $block, $object_id, $object_type );

				// Handle empty value for dynamic fields render as static.
				if ( ! trim( $content ) ) {
					return $this->handle_empty_value( $content, $attributes, $block );
				}

				// Get the block wrapper.
				$content = $this->get_block_wrapper( $content, $attributes, $classes );

				// Maybe add the flex child layout styles.
				return $this->get_child_layout_style( $content, $attributes );
			} else {
				if ( $block_value ) {
					$content     = $block_value['value'] ?? '';
					$field_label = $block_value['field']['label'] ?? '';
					if ( 'oembed' === ( $block_value['field']['type'] ?? '' ) ) {
						if ( $content ) {
							$field = $block_value['field'] ?? [];
							$res   = array(
								'width'  => empty( $field['width'] ) ? 640 : $field['width'],
								'height' => empty( $field['height'] ) ? 390 : $field['height'],
							);

							$content = wp_oembed_get( $content, $res );
						}
					}
				}

				$content = apply_filters( '_meta_field_block_render_dynamic_block', $content, $block_value, $object_id, $object_type, $attributes, $block );
			}

			// CSS class.
			$classes   = '';
			$data_type = $attributes['fieldSettings']['type'] ?? '';
			if ( $data_type ) {
				$classes = "is-{$data_type}-field";
			}

			// Get the block markup.
			return meta_field_block_get_block_markup( $content, $attributes, $block, $object_id, $object_type, $classes, $this->is_dynamic_block( $attributes ), [ 'label' => $field_label ] );
		}

		/**
		 * Add namespace to sub blocks.
		 *
		 * @param string   $block_content
		 * @param array    $block
		 * @param WP_Block $block_instance
		 * @return string
		 */
		public function add_namespace_to_sub_blocks( $block_content, $block, $block_instance ) {
			if ( ! in_array( $block['blockName'] ?? '', [ 'core/button', 'core/heading', 'core/paragraph', 'core/image' ], true ) ) {
				return $block_content;
			}

			if ( $block['attrs']['mfb']['namespace'] ?? false ) {
				// Prep the processor for modifying the block output.
				$processor = new \WP_HTML_Tag_Processor( $block_content );

				// Having no tags implies there are no tags onto which to add class names.
				if ( ! $processor->next_tag() ) {
					return $block_content;
				}

				$processor->set_attribute( 'data-mfb-namespace', $block['attrs']['mfb']['namespace'] );

				return $processor->get_updated_html();
			}

			return $block_content;
		}

		/**
		 * Get flex child layout style
		 *
		 * @param string $block_content
		 * @param array  $attributes
		 * @return string
		 */
		public function get_child_layout_style( $block_content, $attributes ) {
			if ( 'flex' !== ( $attributes['layout']['type'] ?? '' ) ) {
				return $block_content;
			}

			// Get flex size.
			$flex_size = $attributes['fieldSettings']['layout']['flex']['flexSize'] ?? '';
			if ( '' === $flex_size ) {
				return $block_content;
			}

			$container_class = wp_unique_id( 'sfb-container-' );
			$style           = ".{$container_class}>*{flex:{$flex_size};}";

			if ( wp_is_block_theme() ) {
				wp_add_inline_style( 'mfb-sub-field-block-style', $style );
			} else {
				wp_register_style( 'mfb-sub-field-block-style-classic', false );
				wp_enqueue_style( 'mfb-sub-field-block-style-classic' );
				wp_add_inline_style( 'mfb-sub-field-block-style-classic', $style );
			}

			// Prep the processor for modifying the block output.
			$processor = new \WP_HTML_Tag_Processor( $block_content );

			// Having no tags implies there are no tags onto which to add class names.
			if ( ! $processor->next_tag() ) {
				return $block_content;
			}

			$processor->add_class( $container_class );

			return $processor->get_updated_html();
		}

		/**
		 * Check whether if the block is dynamic of static
		 *
		 * @param array    $attributes
		 * @param mixed    $content
		 * @param WP_Block $block
		 * @return boolean
		 */
		private function is_dynamic_block( $attributes ) {
			if ( $attributes['fieldSettings']['isStatic'] ?? false ) {
				return false;
			}

			return true;
		}

		/**
		 * Register scripts
		 *
		 * @return void
		 */
		public function register_scripts() {
			// Plugin instance.
			$mfb = $this->the_plugin_instance;

			// Premium asset file.
			$premium_asset = $mfb->include_file( 'build/premium.asset.php' );

			// Scripts.
			wp_register_script(
				$this->premium_script_handle,
				$mfb->get_file_uri( 'build/premium.js' ),
				$premium_asset['dependencies'] ?? [],
				$mfb->get_script_version( $premium_asset ),
				false // Put this script at the top for MFBACF variable to work on both blocks.
			);

			// Add translation.
			wp_set_script_translations( $this->premium_script_handle, 'display-a-meta-field-as-block' );

			// Enqueue gallery style.
			wp_enqueue_block_style(
				'mfb/meta-field-block',
				[
					'handle' => 'mfb-premium-style',
					'src'    => $mfb->get_file_uri( 'build/style-premium.css' ),
					'ver'    => $mfb->get_script_version( $premium_asset ),
				]
			);
		}

		/**
		 * Build a custom endpoint to get an entity by id.
		 *
		 * @return void
		 */
		public function register_endpoint_for_getting_entity_by_id() {
			register_rest_route(
				'mfb/v1',
				'/getEntityById/',
				array(
					'methods'             => 'GET',
					'callback'            => [ $this, 'get_entity_by_id' ],
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}

		/**
		 * Get an entity by id and kind
		 *
		 * @param WP_Request $request
		 * @return array
		 */
		public function get_entity_by_id( $request ) {
			$id   = $request->get_param( 'id' );
			$kind = $request->get_param( 'type' );

			if ( ! in_array( $kind, [ 'post', 'term', 'user' ], true ) ) {
				$kind = 'post';
			}

			if ( empty( $id ) ) {
				return [
					'code'    => 400,
					'message' => __( 'Invalid rest parameters', 'display-a-meta-field-as-block' ),
				];
			}

			// Try cache.
			if ( in_array( $kind, [ 'term', 'user' ], true ) ) {
				$cache_key = "get_entity_{$kind}_{$id}";
			} else {
				$cache_key = "get_entity_{$id}";
			}
			$entity = wp_cache_get( $cache_key, 'mfb' );
			if ( $entity === false ) {
				$func = 'user' === $kind ? 'get_user_by' : "get_{$kind}";

				if ( is_callable( $func ) ) {
					if ( 'user' === $kind ) {
						$item = call_user_func( $func, 'id', $id );
					} else {
						$item = call_user_func( $func, $id );
					}

					$not_found_response = [
						'code'    => 404,
						'message' => __( 'No item with the given ID could be found', 'display-a-meta-field-as-block' ),
					];

					if ( empty( $item ) ) {
						$entity = $not_found_response;
					} elseif ( is_wp_error( $item ) ) {
						if ( 'term' === $kind ) {
							$entity = $not_found_response;
						} else {
							$entity = [
								'code'    => $item->get_error_code(),
								'message' => $item->get_error_message(),
							];
						}
					} else {
						$rest_route = '';
						if ( 'post' === $kind ) {
							$public_post_types = $this->get_public_object_types_by_kind( 'post_types' );
							if ( $public_post_types && ! isset( $public_post_types['code'] ) ) {
								if ( ! in_array( $item->post_type, array_keys( $public_post_types ), true ) ) {
									$entity = [
										'code'    => 400,
										'message' => sprintf( __( 'The "%s" post type is not supported! Please input another post ID that belongs to a public rest-enabled post type.', 'display-a-meta-field-as-block' ), $item->post_type ),
									];
								}
							}

							$rest_route = rest_get_route_for_post( $item->ID );
						} elseif ( 'term' === $kind ) {
							$taxonomies = $this->get_public_object_types_by_kind( 'taxonomies' );
							if ( $taxonomies && ! isset( $taxonomies['code'] ) ) {
								if ( ! in_array( $item->taxonomy, array_keys( $taxonomies ), true ) ) {
									$entity = [
										'code'    => 400,
										'message' => sprintf( __( 'The "%s" taxonomy is not supported! Please input another term ID that belongs to a public rest-enabled taxonomy.', 'display-a-meta-field-as-block' ), $item->taxonomy ),
									];
								}
							}
							$rest_route = rest_get_route_for_term( $item->term_id );
						} elseif ( 'user' === $kind ) {
							$rest_route = '/wp/v2/users/' . $item->id;
						}

						if ( ! $entity ) {
							$request  = new \WP_REST_Request( 'GET', $rest_route );
							$response = rest_do_request( $request );
							$server   = rest_get_server();
							$entity   = $server->response_to_data( $response, false );
						}
					}

					wp_cache_set( $cache_key, $entity, 'mfb' );
				}
			}

			return $entity;
		}

		/**
		 * Build a custom endpoint to get public types by kind.
		 *
		 * @return void
		 */
		public function register_endpoint_for_expose_public_object_types() {
			register_rest_route(
				'mfb/v1',
				'/getObjectTypes/',
				array(
					'methods'             => 'GET',
					'callback'            => [ $this, 'get_object_types' ],
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}

		/**
		 * Load all available public object types by kind
		 *
		 * @param WP_Request $request
		 * @return array
		 */
		public function get_object_types( $request ) {
			$kind = $request->get_param( 'kind' );

			if ( 'postType' === $kind ) {
				$kind = 'post_types';
			} elseif ( 'taxonomy' === $kind ) {
				$kind = 'taxonomies';
			}

			if ( empty( $kind ) ) {
				return [
					'code'    => 400,
					'message' => __( 'Invalid rest parameters', 'display-a-meta-field-as-block' ),
				];
			}

			return $this->get_public_object_types_by_kind( $kind );
		}

		/**
		 * Expose other public types
		 *
		 * @param array $object_types
		 * @return array
		 */
		public function get_other_public_object_types( $object_types = [] ) {
			$taxonomies = $this->get_public_object_types_by_kind( 'taxonomies' );

			if ( ! empty( $taxonomies ) && ! isset( $taxonomies['code'] ) ) {
				$object_types = array_merge( $object_types, array_keys( $taxonomies ) );
			}

			// Support user type.
			array_push( $object_types, 'user' );

			return $object_types;
		}

		/**
		 * Get public types by kind
		 *
		 * @param string $kind
		 * @return array
		 */
		private function get_public_object_types_by_kind( $kind ) {
			$object_types = [];
			$func         = "get_{$kind}";
			if ( is_callable( $func ) ) {
				$object_types = call_user_func(
					"get_{$kind}",
					[
						'public'       => true,
						'show_in_rest' => true,
					],
					'objects'
				);
				if ( empty( $object_types ) ) {
					$object_types = [
						'code'    => 404,
						'message' => __( 'No item found.', 'display-a-meta-field-as-block' ),
					];
				} elseif ( is_wp_error( $object_types ) ) {
					$object_types = [
						'code'    => $object_types->get_error_code(),
						'message' => $object_types->get_error_message(),
					];
				}
			}

			return $object_types;
		}

		/**
		 * Get block wrapper markup
		 *
		 * @param string $content   Block content.
		 * @param array  $attributes Block attributes.
		 * @param string $classes   CSS classes
		 * @return string
		 */
		public function get_block_wrapper( $content, $attributes, $classes = '' ) {
			$data_type = $attributes['fieldSettings']['type'] ?? '';

			if ( $data_type ) {
				$classes .= " is-{$data_type}-field";
			}

			if ( isset( $attributes['textAlign'] ) ) {
				$classes .= " has-text-align-{$attributes['textAlign']}";
			}

			$wrapper_attributes = get_block_wrapper_attributes( array( 'class' => trim( $classes ) ) );

			return sprintf( '<div %1$s>%2$s</div>', $wrapper_attributes, $content );
		}

		/**
		 * Handle empty value for static blocks
		 *
		 * @return string
		 */
		public function handle_empty_value( $content, $attributes, $block ) {
			if ( $attributes['hideEmpty'] ?? '' ) {
				return '';
			} elseif ( $attributes['emptyMessage'] ?? '' ) {
				$content = $attributes['emptyMessage'];
			}

			return $this->get_block_wrapper( $content, $attributes, 'is-empty-value' );
		}

		/**
		 * Flush the mfb cache when updating an item
		 *
		 * @param int $object_id
		 * @return void
		 */
		public function flush_mfb_cache( $object_id ) {
			// Flush the cache for this item.
			wp_cache_delete( "field_value_{$object_id}", 'mfb' );
			wp_cache_delete( "get_entity_{$object_id}", 'mfb' );
		}

		/**
		 * Register custom block bindings
		 *
		 * @return void
		 */
		public function register_block_bindings() {
			register_block_bindings_source(
				'mfb/bindings',
				array(
					'label'              => _x( 'MFB Bindings', 'block bindings source' ),
					'get_value_callback' => [ $this, 'block_bindings_get_value' ],
					'uses_context'       => array( 'mfb/value' ),
				)
			);
		}

		/**
		 * Get value callback for block binding attributes
		 *
		 * @param array    $source_args
		 * @param WP_Block $block_instance
		 * @param String   $attribute_name
		 * @return mixed
		 */
		public function block_bindings_get_value( array $source_args, $block_instance, string $attribute_name ) {
			$field_path = $source_args['path'] ?? [];
			if ( ! is_array( $field_path ) ) {
				return null;
			}

			// Get block value.
			$block_value = _wp_array_get( $block_instance->context['mfb/value'], $field_path, null );

			// For core/heading and core/paragraph.
			// Will add bindings to other blocks when the API is ready.
			if ( 'content' === $attribute_name ) {
				return $block_value ? $block_value['value'] : null;
			}
		}
	}
endif;
