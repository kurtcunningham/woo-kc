<?php
/**
 * The ACFFieldsPro
 *
 * @package   MetaFieldBlock
 * @author    Phi Phan <mrphipv@gmail.com>
 * @copyright Copyright (c) 2023, Phi Phan
 */

namespace MetaFieldBlock;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( ACFFieldsPro::class ) ) :
	/**
	 * The ACFFieldsPro class.
	 */
	class ACFFieldsPro extends CoreComponent {
		/**
		 * The basic formatter instance
		 *
		 * @var ACFFields
		 */
		private $basic_formatter;

		/**
		 * The list of ACF basic fields
		 *
		 * @var array
		 */
		private $basic_fields = [
			'email',
			'number',
			'password',
			'range',
			'text',
			'textarea',
			'url',
			'file',
			'image',
			'gallery',
			'oembed',
			'wysiwyg',
			'color_picker',
			'date_picker',
			'date_time_picker',
			'time_picker',
			'link',
			'page_link',
			'taxonomy',
			'user',
		];

		/**
		 * The list of ACF choice fields
		 *
		 * @var array
		 */
		private $choice_fields = [
			'button_group',
			'checkbox',
			'radio',
			'select',
			'true_false',
		];

		/**
		 * The list of ACF choice fields
		 *
		 * @var array
		 */
		private $query_fields = [
			'relationship',
			'post_object',
		];

		/**
		 * The list of ACF choice fields
		 *
		 * @var array
		 */
		private $layout_fields = [
			'group',
			'flexible_content',
			'flexible_content-layout',
			'repeater',
		];

		/**
		 * Store all supported fields
		 *
		 * @var array
		 */
		private $all_supported_fields = [];

		/**
		 * The constructor
		 */
		public function __construct( $the_plugin_instance ) {
			parent::__construct( $the_plugin_instance );

			// Get the basic formatter.
			$this->basic_formatter = $the_plugin_instance->get_component( ACFFields::class );
		}

		/**
		 * Run main hooks
		 *
		 * @return void
		 */
		public function run() {
			// Add data for JS.
			add_action( 'init', [ $this, 'add_data_for_the_editor_script' ] );

			// Add rest api endpoint to display all REST enabled global fields.
			add_action( 'rest_api_init', [ $this, 'register_endpoint_for_acf_global_fields' ] );

			// Add rest api endpoint to get a field by key.
			add_action( 'rest_api_init', [ $this, 'register_endpoint_for_getting_acf_field_by_key' ] );

			// Add additional data to rest value.
			add_filter( 'meta_field_block_acf_field_format_value_for_rest', [ $this, 'add_additional_data_to_rest_value' ] );

			// Render static block.
			add_filter( '_meta_field_block_render_static_block', [ $this, 'render_static_block' ], 10, 6 );

			// Render static block.
			add_filter( '_meta_field_block_render_dynamic_block', [ $this, 'render_dynamic_block' ], 10, 6 );

			// Get setting value.
			add_filter( '_meta_field_block_get_field_value_other_type', [ $this, 'get_setting_value' ], 10, 6 );

			// Customize the Query Loop block.
			add_action( 'init', [ $this, 'customize_query_loop_for_mfb' ], PHP_INT_MAX );

			// Render meta field as a heading.
			add_filter( '_meta_field_block_get_inner_block_content', [ $this, 'render_heading_block' ], 10, 4 );

			// Render meta field as a paragraph.
			add_filter( '_meta_field_block_get_inner_block_content', [ $this, 'render_paragraph_block' ], 10, 4 );

			// Render meta field as button.
			add_filter( '_meta_field_block_get_inner_block_content', [ $this, 'render_button_block' ], 10, 4 );

			// Render a video.
			add_filter( '_meta_field_block_get_inner_block_content', [ $this, 'render_video_block' ], 10, 4 );

			// Render meta field as image.
			add_filter( '_meta_field_block_get_inner_block_content', [ $this, 'render_image_block' ], 10, 6 );

			// Should be kses content.
			add_filter( 'meta_field_block_kses_content', [ $this, 'is_kses_content' ], 10, 2 );

			// Flush the server cache for ACF fields.
			add_action( 'save_post', [ $this, 'flush_acf_cache' ], 10, 2 );
		}

		/**
		 * Build a custom endpoint to get a field by id.
		 *
		 * @return void
		 */
		public function register_endpoint_for_getting_acf_field_by_key() {
			register_rest_route(
				'mfb/v1',
				'/getACFFieldByKey/',
				array(
					'methods'             => 'GET',
					'callback'            => [ $this, 'get_acf_field_by_key' ],
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}

		/**
		 * Get a field by key
		 *
		 * @param WP_Request $request
		 * @return array
		 */
		public function get_acf_field_by_key( $request ) {
			if ( ! function_exists( 'acf_is_field_key' ) ) {
				return [
					'code'    => 400,
					'message' => __( 'This feature requires the ACF plugin installed and activated!', 'display-a-meta-field-as-block' ),
				];
			}

			$key = $request->get_param( 'key' );
			if ( empty( $key ) || ! acf_is_field_key( $key ) ) {
				return [
					'code'    => 400,
					'message' => __( 'Invalid rest parameters. You have to provide an ACF field key as the parameter', 'display-a-meta-field-as-block' ),
				];
			}

			// Get id.
			$id = $request->get_param( 'id' );

			$formatted_field = [];
			$object_id       = $id ? $id : false;
			$field           = \get_field_object( $key, $object_id, false, true );
			if ( $field ) {
				$formatted_field = acf_format_value_for_rest( $field['value'], $object_id, $field, 'light' );
			}

			return $formatted_field;
		}

		/**
		 * Build a custom endpoint to display all REST enabled global fields.
		 *
		 * @return void
		 */
		public function register_endpoint_for_acf_global_fields() {
			register_rest_route(
				'mfb/v1',
				'/getACFGlobalFields/',
				array(
					'methods'             => 'GET',
					'callback'            => [ $this, 'get_acf_global_fields' ],
					'permission_callback' => function () {
						return current_user_can( 'edit_posts' );
					},
				)
			);
		}

		/**
		 * Load all available setting fields for ACF
		 *
		 * @return array
		 */
		public function get_acf_global_fields() {
			// Try cache.
			$cache_key = 'get_acf_global_fields';
			$fields    = wp_cache_get( $cache_key, 'mfb' );
			if ( $fields === false ) {
				$all_groups   = acf_get_field_groups();
				$valid_groups = array_filter(
					$all_groups,
					function ( $field_group ) {
						return ( $field_group['active'] ?? false ) && ( $field_group['show_in_rest'] ?? false ) && ( $field_group['location'] ?? false );
					}
				);

				$setting_groups = $this->get_all_setting_groups( $valid_groups );

				$fields = array();
				foreach ( $setting_groups as $field_group ) {
					if ( $field_group['ID'] ?? false ) {
						$acf_fields = acf_get_fields( $field_group['ID'] );
						foreach ( $acf_fields as $field ) {
							// Get the value.
							$value = acf_get_value( 'options', $field );

							// Format the field value.
							$value = acf_format_value_for_rest( $value, 'options', $field, 'light' );

							$fields[ $field['name'] ] = $value;
						}
					}
				}

				wp_cache_set( $cache_key, $fields, 'mfb' );
			}

			return $fields;
		}

		/**
		 * Get all setting groups
		 *
		 * @param array $field_groups
		 * @return array
		 */
		private function get_all_setting_groups( $field_groups ) {
			$filtered = [];
			if ( $field_groups ) {
				foreach ( $field_groups as $field_group ) {
					if ( $this->is_setting_group( $field_group ) ) {
						$filtered[] = $field_group;
					}
				}
			}

			// Return filtered.
			return $filtered;
		}

		/**
		 * Detect whether the setting group is a setting group or not
		 *
		 * @param array $field_group
		 * @return boolean
		 */
		private function is_setting_group( $field_group ) {
			// Loop through location groups.
			foreach ( $field_group['location'] as $group ) {

				// ignore group if no rules.
				if ( empty( $group ) ) {
					continue;
				}

				// Loop over rules and determine if all rules match.
				$match_group = false;
				foreach ( $group as $rule ) {
					if ( 'options_page' === $rule['param'] && '==' === $rule['operator'] ) {
						$match_group = true;
						break;
					}
				}

				if ( $match_group ) {
					return true;
				}
			}

			return false;
		}

		/**
		 * Add additional data to rest value.
		 *
		 * @param array $rest_formatted_value
		 * @return array
		 */
		public function add_additional_data_to_rest_value( $rest_formatted_value ) {
			$field      = $rest_formatted_value['field'] ?? [];
			$field_type = $field['type'] ?? '';

			if ( in_array( $field_type, [ 'relationship', 'post_object' ], true ) ) {
				$post_ids = $rest_formatted_value['value_formatted'] ?? [];

				$block_contexts      = [];
				$filtered_post_types = $field['post_type'] ?? [];
				if ( $post_ids ) {
					if ( ! is_array( $post_ids ) ) {
						$post_ids = [ $post_ids ];
					}

					$post_id   = absint( $post_ids[0] );
					$post_type = get_post_type( $post_id );

					if ( ! $post_type ) {
						if ( count( $post_ids ) > 1 ) {
							$post_id   = absint( $post_ids[1] );
							$post_type = get_post_type( $post_id );
						}
					}

					if ( $post_type ) {
						$block_contexts = [
							'postType' => $post_type,
							'postIds'  => $post_ids,
						];
					} else {
						$block_contexts = [
							'postType' => $filtered_post_types[0] ?? 'post',
							'postIds'  => $post_ids,
						];
					}
				}

				$rest_formatted_value['field']['blockContexts'] = $block_contexts;
			} elseif ( 'image' === $field_type ) {
				$image_id = $rest_formatted_value['value'] ?? '';
				if ( $image_id ) {
					$rest_formatted_value['value_formatted'] = $this->get_attachement_data( $image_id, true );
				}
			} elseif ( 'file' === $field_type ) {
				$file_id = $rest_formatted_value['value'] ?? 0;
				if ( $file_id ) {
					$file_data = $this->get_attachement_data( $file_id );
					if ( $file_data ) {
						$rest_formatted_value['simple_value_formatted'] = sprintf( '<a href="%1$s" target="_blank">%2$s</a>', esc_attr( $file_data['url'] ), esc_html( $file_data['title'] ) );
						$rest_formatted_value['value_formatted']        = $file_data;
					}
				}
			} elseif ( 'gallery' === $field_type ) {
				$rest_formatted_value['simple_value_formatted'] = '';

				$image_ids = $rest_formatted_value['value'] ?? [];
				if ( is_array( $image_ids ) && count( $image_ids ) > 0 ) {
					$rest_formatted_value['value_formatted'] = array_map(
						function( $image_id ) {
							return $this->get_attachement_data( $image_id, true );
						},
						$image_ids
					);
				}
			}

			return $rest_formatted_value;
		}

		/**
		 * Get value for a setting field
		 *
		 * @param string   $content
		 * @param string   $field_name
		 * @param int      $object_id
		 * @param string   $object_type
		 * @param array    $attributes
		 * @param WP_Block $block
		 * @return mixed
		 */
		public function get_setting_value( $content, $field_name, $object_id, $object_type, $attributes, $block ) {
			if ( 'option' === $object_type ) {
				$content = get_option( $field_name );
			}

			return $content;
		}

		/**
		 * Render static block
		 *
		 * @param string   $content
		 * @param string   $field_name
		 * @param int      $object_id
		 * @param string   $object_type
		 * @param array    $attributes
		 * @param WP_Block $block
		 *
		 * @return string
		 */
		public function render_static_block( $content, $field_name, $object_id, $object_type, $attributes, $block ) {
			// Get root value.
			$block_value = $this->get_block_value( $field_name, $object_id, $object_type );

			// No value.
			if ( ! $block_value || ( is_array( $block_value ) && empty( $block_value[ $field_name ] ) ) ) {
				if ( ( $attributes['fieldSettings']['type'] ?? '' ) && in_array( $attributes['fieldSettings']['type'], $this->layout_fields, true ) ) {
					// Handle empty value for MFB layout fields, they don't have field property of the $block_value.
					return $this->the_plugin_instance->get_component( Pro::class )->handle_empty_value( $content, $attributes, $block );
				}

				return '';
			}

			// For MFB only not SFB.
			// Handle empty value for fields that are not layout fields like group, repeater, flexible_content.
			if ( ( $block_value[ $field_name ]['field']['type'] ?? '' ) && ! ( $block_value[ $field_name ]['value'] ?? '' ) ) {
				return $this->the_plugin_instance->get_component( Pro::class )->handle_empty_value( $content, $attributes, $block );
			}

			// Add it to the context.
			$filter_block_context = static function ( $context ) use ( $block_value, $object_id, $object_type ) {
				$context['mfb/value']      = $block_value;
				$context['mfb/objectId']   = $object_id;
				$context['mfb/objectType'] = $object_type;
				return $context;
			};

			// Use an early priority to so that other 'render_block_context' filters have access to the values.
			add_filter( 'render_block_context', $filter_block_context, 1 );
			$content = $block->render( array( 'dynamic' => false ) );
			remove_filter( 'render_block_context', $filter_block_context, 1 );

			// Allow altering the result.
			$content = apply_filters( '_meta_field_block_get_inner_block_content', $content, $block_value[ $field_name ], $attributes, $block, $object_id, $object_type );

			// Handle empty value for dynamic fields render as static.
			if ( ! trim( $content ) ) {
				return $this->the_plugin_instance->get_component( Pro::class )->handle_empty_value( $content, $attributes, $block );
			}

			return $this->the_plugin_instance->get_component( Pro::class )->get_block_wrapper( $content, $attributes, '' );
		}

		/**
		 * Render dynamic block
		 *
		 * @param string   $content
		 * @param mixed    $block_value
		 * @param int      $object_id
		 * @param string   $object_type
		 * @param array    $attributes
		 * @param WP_Block $block
		 *
		 * @return string
		 */
		public function render_dynamic_block( $content, $block_value, $object_id, $object_type, $attributes, $block ) {
			$field_settings = $attributes['fieldSettings'] ?? [];
			if ( $field_settings['type'] ?? false ) {
				$type          = $field_settings['type'];
				$setting_value = $field_settings['options'][ $type ] ?? [];
				if ( 'url' === $type ) {
					$as = $field_settings['as'] ?? '';
					if ( $as === 'link' ) {
						if ( ! $content ) {
							return $content;
						}

						$title  = ! empty( $setting_value['title'] ) ? $setting_value['title'] : $content;
						$target = ! empty( $setting_value['target'] ) ? ' target="' . esc_attr( $setting_value['target'] ) . '" rel="noreferrer noopener"' : '';

						$content = sprintf( '<a href="%1$s"%3$s>%2$s</a>', esc_attr( $content ), esc_html( $title ), $target );
					}
				} elseif ( 'email' === $type ) {
					$as = $field_settings['as'] ?? '';
					if ( $as === 'link' ) {
						if ( ! $content ) {
							return $content;
						}

						$mailto = "mailto:{$content}";

						$title  = ! empty( $setting_value['title'] ) ? $setting_value['title'] : $content;
						$target = ! empty( $setting_value['target'] ) ? ' target="' . esc_attr( $setting_value['target'] ) . '" rel="noreferrer noopener"' : '';

						$content = sprintf( '<a href="%1$s"%3$s>%2$s</a>', esc_attr( $mailto ), esc_html( $title ), $target );
					}
				} elseif ( 'true_false' === $type ) {
					$on_text  = $setting_value['onText'] ?? '';
					$off_text = $setting_value['offText'] ?? '';
					if ( $on_text || $off_text ) {
						$content = ( $block_value['field']['value'] ?? false ) ? $on_text : $off_text;
					}
				} elseif ( 'file' === $type ) {
					$file_data = $this->get_attachement_data( $block_value['field']['value'] ?? 0 );
					if ( $file_data ) {
						$title  = ! empty( $setting_value['title'] ) ? $setting_value['title'] : $file_data['title'];
						$target = ! empty( $setting_value['target'] ) ? ' target="' . esc_attr( $setting_value['target'] ) . '" rel="noreferrer noopener"' : '';

						$content = sprintf( '<a href="%1$s"%3$s>%2$s</a>', esc_attr( $file_data['url'] ), esc_html( $title ), $target );
					}
				} elseif ( 'link' === $type ) {
					$use_custom_title = $setting_value['useCustomTitle'] ?? false;
					if ( $use_custom_title ) {
						$link_value = $block_value['field']['value'] ?? false;
						if ( $link_value && is_array( $link_value ) ) {
							$title  = ! empty( $setting_value['title'] ) ? $setting_value['title'] : $link_value['title'] ?? '';
							$target = ! empty( $setting_value['target'] ) ? ' target="' . esc_attr( $setting_value['target'] ) . '" rel="noreferrer noopener"' : '';

							$content = sprintf( '<a href="%1$s"%3$s>%2$s</a>', esc_attr( $link_value['url'] ?? '' ), esc_html( $title ), $target );
						}
					}
				} elseif ( 'image' === $type ) {
					$content = $this->wrap_link_around_image( $content, $setting_value, $object_id, $object_type, $block );
				} elseif ( 'gallery' === $type ) {
					$image_ids = $block_value['field']['value'] ?? [];
					if ( $image_ids ) {
						$size_slug = $setting_value['sizeSlug'] ?? 'large';
						$lightbox  = $setting_value['lightbox'] ?? false;

						if ( $setting_value['randomOrder'] ?? false ) {
							shuffle( $image_ids );
						}

						$block_attributes = [
							'lightbox'        => [
								'enabled' => $lightbox ? true : false,
							],
							'sizeSlug'        => $size_slug,
							'linkDestination' => 'none',
						];

						$images_html = array_reduce(
							$image_ids,
							function( $prev, $image_id ) use ( $block_attributes, $size_slug ) {
								$image_url = wp_get_attachment_image_url( $image_id, $size_slug );
								if ( $image_url ) {
									$block_attributes['id'] = $image_id;
									$image_html             = '<figure class="wp-block-image size-' . $size_slug . '"><img src="' . $image_url . '" alt="" class="wp-image-' . $image_id . '"/></figure>';

									$prev .= ( new \WP_Block(
										[
											'blockName'    => 'core/image',
											'attrs'        => $block_attributes,
											'innerHTML'    => $image_html,
											'innerContent' => [ $image_html ],
										]
									) )->render();
								}

								return $prev;
							},
							''
						);

						$layout  = $setting_value['layout'] ?? 'cropped';
						$columns = $setting_value['columns'] ?? 3;
						$gap     = $setting_value['gap']['top'] ?? '1em';

						$basis         = $columns > 0 ? round( 100 / ( $columns + 1 ) + 0.1, 2 ) : 100;
						$gallery_style = '--mfb-gallery-columns:' . $columns . ';--mfb-gallery-gap:' . $gap . ';--mfb-gallery-item-width:' . $basis . '%;';

						$content = '<figure class="mfb-block-gallery is-' . $layout . '" style="' . $gallery_style . '">' . $images_html . '</figure>';
					}
				}
			}

			return $content;
		}

		/**
		 * Wrap a link around an image
		 *
		 * @param string $content
		 * @param array  $setting_value
		 * @param mixed  $object_id
		 * @param string $object_type
		 * @param array  $block
		 * @return string
		 */
		private function wrap_link_around_image( $content, $setting_value, $object_id, $object_type, $block ) {
			if ( $setting_value['linkToPost'] ?? false ) {
				if ( 'post' === $object_type ) {
					$context_post_id = $object_id;
				} else {
					if ( isset( $block->context['postId'] ) ) {
						// Get value from the context.
						$context_post_id = $block->context['postId'];
					} elseif ( is_singular() ) {
						// Fallback to the current queried object id.
						$context_post_id = get_queried_object_id();
					}
				}

				if ( $context_post_id ) {
					$permalink = get_permalink( $context_post_id );
					if ( $permalink ) {
						$content = sprintf( '<a href="%1$s" rel="bookmark">%2$s</a>', esc_url( $permalink ), $content );
					}
				}
			} elseif ( ( $setting_value['linkToField'] ?? false ) && ( $setting_value['fieldPath'] ?? '' ) ) {
				// Get field path.
				$field_path = $setting_value['fieldPath'];

				// Root value.
				$root_value = $block->context['mfb/value'] ?? '';

				// Custom url.
				$url = '';

				// Is a nested field.
				if ( $root_value ) {
					// Get field by path.
					$field = $this->get_value_by_key_path( $root_value, explode( '/', $field_path ) );

					$url = $field ? ( $field['value'] ?? '' ) : '';
				} else {
					if ( in_array( $object_type, [ 'post', 'term', 'user' ], true ) ) {
						$get_meta_callback = "get_{$object_type}_meta";

						$url = $get_meta_callback( $object_id, $field_path, true );
					} elseif ( 'option' === $object_type ) {
						$url = get_option( $field_path );
					} else {
						$url = get_post_meta( $object_id, $field_path, true );
					}
				}

				if ( $url ) {
					$custom_attrs = '';
					if ( $setting_value['openInNewTab'] ?? '' ) {
						$custom_attrs = ' target="_blank" rel="noreferrer"';
					}

					$content = sprintf( '<a href="%1$s"%3$s>%2$s</a>', esc_url( $url ), $content, esc_attr( $custom_attrs ) );
				}
			}

			return $content;
		}

		/**
		 * Add data for JS.
		 * We need this data for both MFB and NFB.
		 *
		 * @return void
		 */
		public function add_data_for_the_editor_script() {
			// Add field types for JS.
			wp_add_inline_script(
				$this->the_plugin_instance->get_component( Pro::class )->premium_script_handle,
				'const MFBACF=' . wp_json_encode(
					[
						'BASIC_FIELDS'         => $this->basic_fields,
						'CHOICE_FIELDS'        => $this->choice_fields,
						'QUERY_FIELDS'         => $this->query_fields,
						'LAYOUT_FIELDS'        => $this->layout_fields,
						'ALL_SUPPORTED_FIELDS' => $this->get_all_supported_fields(),
					]
				) . ';',
				'before'
			);
		}

		/**
		 * Get all supported ACF fields.
		 *
		 * @return array
		 */
		private function get_all_supported_fields() {
			if ( ! $this->all_supported_fields ) {
				$this->all_supported_fields = array_merge( $this->basic_fields, $this->choice_fields, $this->query_fields, $this->layout_fields );
			}

			return $this->all_supported_fields;
		}

		/**
		 * Refine the value
		 *
		 * @param mixed $field
		 * @param mixed $object_id
		 * @return void
		 */
		private function refine_field_value( $field, $object_id ) {
			$array_value = [];
			if ( ! is_array( $field ) ) {
				return $array_value;
			}

			$type = $field['type'] ?? '';
			$name = $field['name'] ?? '';

			if ( ! $type || ! $name || ! in_array( $type, $this->get_all_supported_fields(), true ) ) {
				return $array_value;
			}

			$raw_value = $field['value'];

			if ( in_array( $type, $this->basic_fields, true ) ) {
				$array_value[ $name ] = [
					'value' => $this->basic_formatter->render_acf_field( $raw_value, $object_id, $field, $raw_value ),
					'field' => $field,
				];
			} elseif ( in_array( $type, $this->choice_fields, true ) ) {
				$array_value[ $name ] = [
					'value' => $this->basic_formatter->render_acf_field( $raw_value, $object_id, $field, $raw_value ),
					'field' => $field,
				];
			} elseif ( in_array( $type, $this->query_fields, true ) ) {
				$array_value[ $name ] = [
					'value' => $this->basic_formatter->render_acf_field( $raw_value, $object_id, $field, $raw_value ),
					'field' => $field,
				];
			} elseif ( in_array( $type, $this->layout_fields, true ) ) {
				$inner_value = [];
				if ( 'group' === $type ) {
					$sub_fields = $field['sub_fields'] ?? [];
					foreach ( $sub_fields as $sub_field ) {
						if ( ! isset( $raw_value[ $sub_field['key'] ] ) ) {
							continue;
						}
						// Add the raw value to the sub field.
						$sub_field['value'] = $raw_value[ $sub_field['key'] ];

						// Refine it.
						$sub_array_value = $this->refine_field_value( $sub_field, $object_id );
						$inner_value     = array_merge( $inner_value, $sub_array_value );
					}
				} elseif ( 'repeater' === $type ) {
					$sub_fields = $field['sub_fields'] ?? [];
					if ( $raw_value ) {
						foreach ( $raw_value as $index => $row_raw_value ) {
							$repeater_item_value = [];
							foreach ( $sub_fields as $sub_field ) {
								if ( ! isset( $row_raw_value[ $sub_field['key'] ] ) ) {
									continue;
								}

								// Add the raw value to the sub field.
								$sub_field['value'] = $row_raw_value[ $sub_field['key'] ];

								// Refine it.
								$sub_array_value     = $this->refine_field_value( $sub_field, $object_id );
								$repeater_item_value = array_merge( $repeater_item_value, $sub_array_value );
							}

							$inner_value = [
								...$inner_value,
								...[ $index => $repeater_item_value ],
							];
						}
					}
				} elseif ( 'flexible_content' === $type ) {
					$layout_fields = [];
					$layouts       = $field['layouts'];
					foreach ( $layouts as $layout ) {
						$layout_fields[ $layout['name'] ] = $layout;
					}

					if ( $raw_value ) {
						foreach ( $raw_value as $index => $layout_value ) {
							$flexible_item_value = [];
							$layout_name         = $layout_value['acf_fc_layout'] ?? '';
							$sub_fields          = $layout_fields[ $layout_name ]['sub_fields'] ?? [];
							foreach ( $sub_fields as $sub_field ) {
								if ( ! isset( $layout_value[ $sub_field['key'] ] ) ) {
									continue;
								}

								// Add the raw value to the sub field.
								$sub_field['value'] = $layout_value[ $sub_field['key'] ];

								// Refine it.
								$sub_array_value     = $this->refine_field_value( $sub_field, $object_id );
								$flexible_item_value = array_merge( $flexible_item_value, $sub_array_value );
							}

							$inner_value = [
								...$inner_value,
								...[ $index => [ $layout_name => $flexible_item_value ] ],
							];
						}
					}
				}

				$array_value[ $name ] = $inner_value;
			}

			return $array_value;
		}

		/**
		 * Get the root value of the field
		 *
		 * @param  string $field_name  Field name
		 * @param  mixed  $object_id   Object id
		 * @param  string $object_type Object type
		 * @return array
		 */
		private function get_block_value( $field_name, $object_id, $object_type ) {
			// Build cache key.
			if ( 'option' === $object_type ) {
				$cache_key = 'field_value_options';
			} elseif ( in_array( $object_type, [ 'term', 'user' ], true ) ) {
				$cache_key = "field_value_{$object_type}_{$object_id}";
			} else {
				$cache_key = "field_value_{$object_id}";
			}

			// Try cache.
			$cache_data = wp_cache_get( $cache_key, 'mfb' );

			if ( false === $cache_data ) {
				$cache_data = [];
			}

			if ( isset( $cache_data[ $field_name ] ) ) {
				// Has data in cache.
				$field_value = $cache_data[ $field_name ];
			} else {
				// Set false as the default value.
				$field_value = false;

				// Get the id with object type.
				$object_id_with_type = $this->basic_formatter->get_object_id_with_type( $object_id, $object_type, $field_name );

				$root_field_object = '';
				if ( function_exists( 'get_field_object' ) ) {
					$root_field_object = get_field_object( $field_name, $object_id_with_type, false, true );
				}

				if ( $root_field_object ) {
					// Refine value.
					$field_value = $this->refine_field_value( $root_field_object, $object_id_with_type );
				}

				// Update cache.
				if ( ! empty( $field_value ) ) {
					// Update cache.
					$cache_data[ $field_name ] = $field_value;
					wp_cache_set( $cache_key, $cache_data, 'mfb' );
				}
			}

			return $field_value;
		}

		/**
		 * Get value for sub block
		 *
		 * @param array    $attributes Block attributes.
		 * @param WP_Block $block      Block instance.
		 *
		 * @return mixed
		 */
		public function get_sub_block_value( $attributes, $block ) {
			// Get field path.
			$field_path = $attributes['fieldPath'] ?? [];

			// Root value.
			$root_value = $block->context['mfb/value'] ?? '';

			// Get field by path.
			$field = $this->get_value_by_key_path( $root_value, $field_path );

			return $field;
		}

		/**
		 * Get value from array by path
		 *
		 * @param array $array_data
		 * @param array $key_path
		 * @return mixed
		 */
		private function get_value_by_key_path( $array_data, $key_path ) {
			if ( count( $key_path ) === 0 || ! is_array( $array_data ) ) {
				return $array_data;
			}

			$key = array_shift( $key_path );

			return $this->get_value_by_key_path( $array_data[ $key ] ?? [], $key_path );
		}

		/**
		 * Customize Query Loop
		 *
		 * @return void
		 */
		public function customize_query_loop_for_mfb() {
			// Get public post types.
			$post_types = get_post_types(
				[
					'public'       => true,
					'show_in_rest' => true,
				]
			);

			foreach ( $post_types as $post_type ) {
				add_filter( 'rest_' . $post_type . '_collection_params', [ $this, 'query_loop_support_custom_sorting' ], 10 );
				add_filter( 'rest_' . $post_type . '_query', [ $this, 'query_loop_add_custom_query_params' ], 10, 2 );
			}

			add_filter( 'query_loop_block_query_vars', [ $this, 'query_loop_customize_query_vars' ], 10, 2 );
		}

		/**
		 * Support sorting by post__in.
		 *
		 * @param array $query_params
		 * @return array
		 */
		public function query_loop_support_custom_sorting( $query_params ) {
			$query_params['orderby']['enum'][] = 'post__in';

			return $query_params;
		}

		/**
		 * Customize query args for frontend.
		 *
		 * @param array    $query_args
		 * @param WP_Block $block
		 * @return array
		 */
		public function query_loop_customize_query_vars( $query_args, $block ) {
			$query_context = $block->context['query'] ?? [];
			$mfb_args      = $query_context['mfb'] ?? false;

			if ( ! $mfb_args ) {
				return $query_args;
			}

			$field_path = $mfb_args['field_path'] ?? [];

			// Get block value by path.
			$block_value = $this->get_sub_block_value( [ 'fieldPath' => $field_path ], $block );

			$post_ids = $block_value ? $block_value['field']['value'] ?? [] : false;
			if ( $post_ids ) {
				if ( $block_value['field']['post_type'] ?? false ) {
					$query_args['post_type'] = $block_value['field']['post_type'];
				} else {
					$query_args['post_type'] = get_post_types( [ 'public' => true ], 'names' );
				}
				$query_args['post__in']       = (array) $post_ids;
				$query_args['posts_per_page'] = max( 12, count( $post_ids ) );
				if ( ! isset( $query_args['orderby'] ) ) {
					$query_args['orderby'] = 'post__in';
				}
				$query_args['ignore_sticky_posts'] = true;

				if ( isset( $query_args['order'] ) ) {
					unset( $query_args['order'] );
				}
			} else {
				$query_args['post_type'] = 'attachment';
				$query_args['post__in']  = [ PHP_INT_MAX ];
			}

			// Allow third-party to alter the final result.
			$query_args = apply_filters( 'mfb_query_loop_block_query_vars', $query_args, $mfb_args, $query_context, $block );

			return $query_args;
		}

		/**
		 * Add custom query parameters to the Query Loop.
		 *
		 * @param array           $query_args
		 * @param WP_REST_Request $request
		 * @return array
		 */
		public function query_loop_add_custom_query_params( $query_args, $request ) {
			$mfb_args = $request->get_param( 'mfb' ) ?? [];
			if ( ! $mfb_args ) {
				return $query_args;
			}

			$meta_type  = $mfb_args['meta_type'] ?? '';
			$root_name  = $mfb_args['root_name'] ?? '';
			$object_id  = $mfb_args['object_id'] ?? '';
			$field_path = $mfb_args['field_path'] ?? [];

			if ( ! $field_path || ! $root_name || ! $object_id ) {
				return $query_args;
			}

			// Ignore query fields inside a repeater.
			if ( $root_name !== ( $field_path[0] ?? '' ) ) {
				return $query_args;
			}

			$object_type = in_array( $meta_type, [ 'option', 'term', 'user' ], true ) ? $meta_type : 'post';
			$root_value  = $this->get_block_value( $root_name, $object_id, $object_type );

			// Get block value by path.
			$block_value = $this->get_value_by_key_path( $root_value, $field_path );

			$post_ids = $block_value ? $block_value['field']['value'] ?? [] : false;
			if ( $post_ids ) {
				$query_args['post__in']            = (array) $post_ids;
				$query_args['posts_per_page']      = max( 12, count( $post_ids ) );
				$query_args['orderby']             = 'post__in';
				$query_args['ignore_sticky_posts'] = true;

				if ( isset( $query_args['order'] ) ) {
					unset( $query_args['order'] );
				}
			}

			return $query_args;
		}

		/**
		 * Update block markup
		 *
		 * @param string   $content
		 * @param string   $query
		 * @param array    $attrs
		 * @param string   $text_content
		 * @param array    $attributes
		 * @param function $cb
		 * @return string
		 */
		private function update_block_markup( $content, $query, $attrs, $text_content = '', $attributes = [], $cb = null ) {
			// This will be replaced by WP_HTML_Processor when it fully supports HTML manipulation.
			$dom = $this->get_dom( $content );
			if ( $dom ) {
				$nodes = $dom->getElementsByTagName( $query );
				if ( $nodes->length ) {
					$block_node = null;
					if ( $nodes->length === 1 ) {
						$block_node = $nodes->item( 0 );
					} else {
						$field_name = $attributes['fieldName'] ?? '';
						if ( ! $field_name ) {
							$field_path = $attributes['fieldPath'] ?? [];
							if ( $field_path && is_array( $field_path ) ) {
								$field_name = end( $field_path );
							}
						}

						if ( $field_name ) {
							$is_processing_button = 'a' === $query && 'core/button' === ( $attributes['fieldSettings']['as'] ?? '' );
							$processing_nodes     = [];

							if ( $is_processing_button ) {
								foreach ( $nodes as $node ) {
									$processing_nodes[] = $node->parentNode;
								}
							} else {
								$processing_nodes = $nodes;
							}

							for ( $index = 0; $index < count( $processing_nodes ); $index ++ ) {
								$namespace = $processing_nodes[ $index ]->getAttribute( 'data-mfb-namespace' );
								if ( $namespace === $field_name ) {
									$block_node = $nodes[ $index ];
									break;
								}
							}
						}

						if ( ! $block_node ) {
							$block_node = $nodes->item( 0 );
						}
					}

					foreach ( $attrs as $attr => $val ) {
						$block_node->setAttribute( $attr, $val );
					}

					if ( $block_node && $text_content ) {
						$this->update_text_content( $block_node, $text_content );
					}

					if ( is_callable( $cb ) ) {
						$cb( $block_node, $dom );
					}

					$content = str_replace( array( '<html>', '</html>' ), '', $dom->saveHTML() );
				}
			}

			return $content;
		}

		/**
		 * Update text content for a node
		 *
		 * @param DOMElement $node
		 * @param string     $text_content
		 * @return void
		 */
		private function update_text_content( $node, $text_content ) {
			while ( $node->childNodes->length === 1 && $node->childNodes->item( 0 )->nodeType === XML_ELEMENT_NODE ) {
				$node = $node->childNodes->item( 0 );
			}

			$node->textContent = $text_content;
		}

		/**
		 * Render field as heading
		 *
		 * @param string   $content
		 * @param array    $block_value
		 * @param array    $attributes
		 * @param WP_Block $block
		 * @return string
		 */
		public function render_heading_block( $content, $block_value, $attributes, $block ) {
			$field_settings = $attributes['fieldSettings'] ?? [];

			if ( ! $field_settings ) {
				return $content;
			}

			// Ignore binding blocks since 1.3.
			if ( ! empty( $field_settings['isBinding'] ) ) {
				return $content;
			}

			if ( 'core/heading' === ( $field_settings['as'] ?? '' ) ) {
				$type       = $field_settings['type'] ?? '';
				$node_value = '';
				$level      = 2;
				if ( 'text' === $type ) {
					// Find the heading block.
					$heading_block = $this->find_block( $block, 'core/heading' );

					if ( ! $heading_block ) {
						return '';
					}

					$level      = $heading_block->attributes['level'] ?? 2;
					$node_value = $block_value['value'] ?? '';
				}

				if ( $node_value ) {
					$content = $this->update_block_markup( $content, 'h' . $level, [], $node_value, $attributes );
				} else {
					return '';
				}
			}

			return $content;
		}

		/**
		 * Render field as paragraph
		 *
		 * @param string   $content
		 * @param array    $block_value
		 * @param array    $attributes
		 * @param WP_Block $block
		 * @return string
		 */
		public function render_paragraph_block( $content, $block_value, $attributes, $block ) {
			$field_settings = $attributes['fieldSettings'] ?? [];

			if ( ! $field_settings ) {
				return $content;
			}

			// Ignore binding blocks since 1.3.
			if ( ! empty( $field_settings['isBinding'] ) ) {
				return $content;
			}

			if ( 'core/paragraph' === ( $field_settings['as'] ?? '' ) ) {
				$type       = $field_settings['type'] ?? '';
				$node_value = '';
				if ( 'text' === $type ) {
					$node_value = $block_value['value'] ?? '';
				}

				if ( $node_value ) {
					$content = $this->update_block_markup( $content, 'p', [], $node_value, $attributes );
				} else {
					return '';
				}
			}

			return $content;
		}

		/**
		 * Render field as button
		 *
		 * @param string   $content
		 * @param array    $block_value
		 * @param array    $attributes
		 * @param WP_Block $block
		 * @return string
		 */
		public function render_button_block( $content, $block_value, $attributes, $block ) {
			$field_settings = $attributes['fieldSettings'] ?? [];

			if ( ! $field_settings ) {
				return $content;
			}

			if ( 'core/button' === ( $field_settings['as'] ?? '' ) ) {
				$type       = $field_settings['type'] ?? '';
				$attrs      = [];
				$node_value = '';
				if ( 'link' === $type ) {
					$value = $block_value['field']['value'] ?? '';

					if ( ! $value ) {
						return '';
					}

					$title = $value['title'] ?? '';
					$url   = $value['url'] ?? '';

					if ( ! $url ) {
						return '';
					}

					$attrs      = [ 'href' => $url ];
					$node_value = empty( $field_settings['options']['link']['useCustomTitle'] ) && $title ? $title : '';
				} elseif ( 'url' === $type ) {
					$value = $block_value['field']['value'] ?? '';

					if ( ! $value ) {
						return '';
					}

					$attrs      = [ 'href' => $value ];
					$node_value = ! empty( $field_settings['options']['url']['useValueAsText'] ) ? $value : '';
				} elseif ( 'email' === $type ) {
					$value = $block_value['field']['value'] ?? '';

					if ( ! $value ) {
						return '';
					}

					$attrs      = [ 'href' => "mailto:{$value}" ];
					$node_value = ! empty( $field_settings['options']['email']['useValueAsText'] ) ? $value : '';
				} elseif ( 'file' === $type ) {
					$file_id = $block_value['value'] ?? 0;

					if ( ! $file_id ) {
						return '';
					}

					$file_data = $this->get_attachement_data( $file_id );
					if ( ! $file_data ) {
						return '';
					}

					$attrs = [ 'href' => $file_data['url'] ?? '' ];
				}

				if ( $attrs || $node_value ) {
					$content = $this->update_block_markup( $content, 'a', $attrs, $node_value, $attributes );
				}
			}

			return $content;
		}

		/**
		 * Render field as video
		 *
		 * @param string   $content
		 * @param array    $block_value
		 * @param array    $attributes
		 * @param WP_Block $block
		 * @return string
		 */
		public function render_video_block( $content, $block_value, $attributes, $block ) {
			$field_settings = $attributes['fieldSettings'] ?? [];

			if ( ! $field_settings ) {
				return $content;
			}

			if ( 'core/video' === ( $field_settings['as'] ?? '' ) ) {
				$type  = $field_settings['type'] ?? '';
				$attrs = [];
				if ( 'file' === $type ) {
					$file_id = $block_value['value'] ?? 0;

					if ( ! $file_id ) {
						return '';
					}

					$file_data = $this->get_attachement_data( $file_id );
					if ( ! $file_data ) {
						return '';
					}

					$attrs = [
						'src'    => $file_data['url'] ?? '',
						'poster' => $file_data['poster'] ?? '',
					];

					if ( $attrs ) {
						$content = $this->update_block_markup( $content, 'video', $attrs, '', $attributes );
					}

					$caption = $file_data['caption'] ?? '';
					$content = $this->update_block_markup(
						$content,
						'figcaption',
						[],
						$caption,
						$attributes,
						function( $block_node, $dom ) use ( $caption ) {
							if ( $block_node && ! $caption ) {
								$figure = $dom->getElementsByTagName( 'figure' );
								if ( $figure ) {
									$figure = $figure->item( 0 );
									$figure->removeChild( $block_node );
								}
							}
						}
					);
				}
			}

			return $content;
		}

		/**
		 * Render field as image
		 *
		 * @param string   $content
		 * @param array    $block_value
		 * @param array    $attributes
		 * @param WP_Block $block
		 * @param mixed    $object_id
		 * @param string   $object_type
		 * @return string
		 */
		public function render_image_block( $content, $block_value, $attributes, $block, $object_id, $object_type ) {
			$field_settings = $attributes['fieldSettings'] ?? [];

			if ( ! $field_settings ) {
				return $content;
			}

			if ( 'core/image' === ( $field_settings['as'] ?? '' ) ) {
				$type     = $field_settings['type'] ?? '';
				$attrs    = [];
				$src_full = '';
				if ( 'image' === $type ) {
					$value = $block_value['field']['value'] ?? '';

					if ( ! $value ) {
						return '';
					}

					// Find the image block.
					$image_block = $this->find_block( $block, 'core/image' );

					$size = 'full';
					if ( $image_block ) {
						$size = $image_block->attributes['sizeSlug'] ?? 'full';
					}

					// Get image data.
					$image_data = $this->get_attachement_data( $value, true );

					// Bail if there is no data.
					if ( ! $image_data ) {
						return '';
					}

					// Get image attributes.
					$src    = $image_data['url'] ?? '';
					$width  = 0;
					$height = 0;
					if ( ! empty( $image_data['sizes'][ $size ] ) ) {
						$src    = $image_data['sizes'][ $size ]['src'];
						$width  = $image_data['sizes'][ $size ]['width'];
						$height = $image_data['sizes'][ $size ]['height'];
					}

					// Bail if there is no data.
					if ( ! $src ) {
						return '';
					}

					$attrs = [
						'src'    => $src,
						'srcset' => wp_get_attachment_image_srcset( $value, $size ),
						'sizes'  => wp_get_attachment_image_sizes( $value, $size ),
					];

					if ( $width ) {
						$attrs['width'] = $width;
					}

					if ( $height ) {
						$attrs['height'] = $height;
					}

					$src_full = $image_data['url'];
				} elseif ( 'url' === $type ) {
					$value = $block_value['field']['value'] ?? '';

					if ( ! $value ) {
						return '';
					}

					$attrs    = [ 'src' => $value ];
					$src_full = $value;
				}

				if ( $attrs ) {
					// Update image.
					$content = $this->update_block_markup( $content, 'img', $attrs, '', $attributes );

					// Wrapped link.
					$wrap_link_attrs = $this->get_link_around_image_attrs( $field_settings['options'][ $type ] ?? [], $object_id, $object_type, $block );

					// Update lightbox.
					$dom = $this->get_dom( $content );
					if ( $dom ) {
						$figure = $this->get_node_by_tagname( $dom, 'figure' );
						if ( $figure ) {
							// Handle expanding interactivity.
							$context_data = $figure->getAttribute( 'data-wp-context' );
							if ( $context_data ) {
								if ( $wrap_link_attrs ) {
									$figure->removeAttribute( 'data-wp-interactive' );
									$figure->removeAttribute( 'data-wp-context' );
									$figure_class = $figure->getAttribute( 'class' );
									$figure_class = str_replace( 'wp-lightbox-container', '', $figure_class );
									$figure->setAttribute( 'class', $figure_class );
									$button = $this->get_node_by_tagname( $figure, 'button' );
									if ( $button ) {
										$button->parentNode->removeChild( $button );
									}
								} else {
									$context_data = json_decode( $context_data, true );

									$context_data['uploadedSrc']                       = $src_full;
									$context_data['core']['image']['imageUploadedSrc'] = $src_full;

									$figure->setAttribute( 'data-wp-context', wp_json_encode( $context_data ) );
								}
							}

							// The wrapped link.
							if ( $wrap_link_attrs ) {
								$wrapped_link = $this->get_node_by_tagname( $figure, 'a' );
								if ( $wrapped_link ) {
									foreach ( $wrap_link_attrs as $attr_name => $attr_value ) {
										$wrapped_link->setAttribute( $attr_name, $attr_value );
									}
								} else {
									$wrapped_link = $dom->createElement( 'a' );
									foreach ( $wrap_link_attrs as $attr_name => $attr_value ) {
										$wrapped_link->setAttribute( $attr_name, $attr_value );
									}

									// Get the img tag.
									$img = $this->get_node_by_tagname( $figure, 'img' );

									if ( $img ) {
										$img->parentNode->replaceChild( $wrapped_link, $img );
										$wrapped_link->appendChild( $img );
									}
								}
							}
						}

						$content = $dom->saveHTML();
					}
				}
			}

			return $content;
		}

		/**
		 * Get the link's attributes that wraps around the image block
		 *
		 * @param array  $setting_value
		 * @param mixed  $object_id
		 * @param string $object_type
		 * @param array  $block
		 * @return array
		 */
		private function get_link_around_image_attrs( $setting_value, $object_id, $object_type, $block ) {
			$url = '';
			if ( $setting_value['linkToPost'] ?? false ) {
				if ( 'post' === $object_type ) {
					$context_post_id = $object_id;
				} else {
					if ( isset( $block->context['postId'] ) ) {
						// Get value from the context.
						$context_post_id = $block->context['postId'];
					} elseif ( is_singular() ) {
						// Fallback to the current queried object id.
						$context_post_id = get_queried_object_id();
					}
				}

				if ( $context_post_id ) {
					$url = get_permalink( $context_post_id );
				}
			} elseif ( ( $setting_value['linkToField'] ?? false ) && ( $setting_value['fieldPath'] ?? '' ) ) {
				// Get field path.
				$field_path = $setting_value['fieldPath'];

				// Root value.
				$root_value = $block->context['mfb/value'] ?? '';

				// Is a nested field.
				if ( $root_value ) {
					// Get field by path.
					$field = $this->get_value_by_key_path( $root_value, explode( '/', $field_path ) );

					$url = $field ? ( $field['value'] ?? '' ) : '';
				} else {
					if ( in_array( $object_type, [ 'post', 'term', 'user' ], true ) ) {
						$get_meta_callback = "get_{$object_type}_meta";

						$url = $get_meta_callback( $object_id, $field_path, true );
					} elseif ( 'option' === $object_type ) {
						$url = get_option( $field_path );
					} else {
						$url = get_post_meta( $object_id, $field_path, true );
					}
				}
			}

			// Escape the url.
			$url = esc_url( $url );

			if ( $url ) {
				$link_attrs = [
					'href' => $url,
				];
				if ( $setting_value['openInNewTab'] ?? '' ) {
					$link_attrs['target'] = '_blank';
					$link_attrs['rel']    = 'noreferrer';
				}

				return $link_attrs;
			}

			return [];
		}

		/**
		 * Should or should not kses the content.
		 *
		 * @param boolean $should_kses
		 * @param array   $attributes
		 * @return boolean
		 */
		public function is_kses_content( $should_kses, $attributes ) {
			if ( 'gallery' === ( $attributes['fieldSettings']['type'] ?? '' ) ) {
				return false;
			}

			return $should_kses;
		}

		/**
		 * Get properties for an attachment
		 *
		 * @param int     $attachment_id
		 * @param boolean $sizes
		 * @return array
		 */
		private function get_attachement_data( $attachment_id, $sizes = false ) {
			// Get the attachment post object.
			$attachment = get_post( $attachment_id );
			if ( ! $attachment ) {
				return false;
			}

			if ( 'attachment' !== $attachment->post_type ) {
				return false;
			}

			if ( strpos( $attachment->post_mime_type, '/' ) !== false ) {
				list( $type, $subtype ) = explode( '/', $attachment->post_mime_type );
			} else {
				list( $type, $subtype ) = array( $attachment->post_mime_type, '' );
			}

			// Generate response.
			$response = array(
				'ID'          => $attachment->ID,
				'id'          => $attachment->ID,
				'url'         => wp_get_attachment_url( $attachment->ID ),
				'title'       => $attachment->post_title,
				'alt'         => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
				'description' => $attachment->post_content,
				'caption'     => $attachment->post_excerpt,
				'mime_type'   => $attachment->post_mime_type,
				'type'        => $type,
				'subtype'     => $subtype,
				'icon'        => wp_mime_type_icon( $attachment->ID ),
			);

			if ( 'video' === $type ) {
				if ( $poster = get_the_post_thumbnail_url( $attachment->ID ) ) {
					$response['poster'] = $poster;
				}
			}

			if ( $sizes ) {
				$image_sizes = get_intermediate_image_sizes();
				$sizes_data  = array();
				foreach ( $image_sizes as $size ) {
					$src = wp_get_attachment_image_src( $attachment->ID, $size );
					if ( $src ) {
						$sizes_data[ $size ] = [
							'src'    => $src[0],
							'width'  => $src[1],
							'height' => $src[2],
						];
					}
				}
				$response['sizes'] = $sizes_data;
			}

			return $response;
		}

		/**
		 * Build a DOM document from the HTML markup string
		 *
		 * @param string $html
		 * @return DOMDocument
		 */
		private function get_dom( $html ) {
			$dom = new \DOMDocument();

			// Suppress errors.
			libxml_use_internal_errors( true );
			$dom->loadHTML( '<html>' . $html . '</html>', LIBXML_HTML_NODEFDTD | LIBXML_HTML_NOIMPLIED );
			// Clear errors.
			libxml_clear_errors();

			return $dom;
		}

		/**
		 * Query a node from the dom object or from a parent node
		 *
		 * @param DOMNode $wrapperNode
		 * @param string  $tag_name
		 * @return DOMNode
		 */
		private function get_node_by_tagname( $wrapperNode, $tag_name ) {
			$tags = $wrapperNode->getElementsByTagName( $tag_name );

			if ( $tags->length ) {
				return $tags->item( 0 );
			}

			return null;
		}

		/**
		 * Find a specific nested block from a parent block
		 *
		 * @param WP_Block $block
		 * @param string   $block_name
		 * @return mixed
		 */
		private function find_block( $block, $block_name ) {
			if ( $block->name === $block_name ) {
				return $block;
			}

			foreach ( $block->inner_blocks as $inner_block ) {
				$result = $this->find_block( $inner_block, $block_name );

				if ( $result ) {
					return $result;
				}
			}

			return;
		}

		/**
		 * Flush the server cache for ACF fields
		 *
		 * @param int     $post_id
		 * @param WP_Post $post
		 * @return void
		 */
		public function flush_acf_cache( $post_id, $post ) {
			if ( 'acf-field-group' === $post->post_type ) {
				wp_cache_delete( 'get_acf_global_fields', 'mfb' );
			}
		}
	}
endif;
