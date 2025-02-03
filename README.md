# Amplify - A WordPress Block Theme by Unrelated

Unrelated's Amplify WordPress Theme was built to help speed up site development for client-based WordPress projects.


## Required Plugins
The following are plugins that are required when using this theme:
1. ACF Pro
2. MBM Gutenberg Blocks
3. Gridible


## Installation
1. Install Docker - if you haven't already
2. Duplicate repository
3. Run `docker-compose up`
4. Follow the instructions to install WordPress
5. Finally, edit the `style.scss` file to ensure the theme meta information is up to date
6. Run `docker-compose down` to stop your Docker image

### Getting Up and Running with an Existing WP Multisite Backup

When fully configured for multisite mode, WP will fail if it finds an empty directory that is missing the site and blogs tables.

If you have a backup of an existing WP MU installation, but are trying to get that installation running on your machine for the first time, follow these steps:

1. Ensure that WP MU is fully configured (that is, constants `MULTISITE`, `SUBDOMAIN_INSTALL`, `DOMAIN_CURRENT_SITE`, etc. are all defined).
2. Start Docker Compose: `docker-compose up`
3. Open up the phpMyAdmin interface: `dba.test:8888` (your domain name might be different, but `dba.test` should work)
4. Login to phpMyAdmin (`wordpress`/`wordpress`), click on the `wordpress` database on the left, and then click on the Import tab.
5. From the "Choose File" interface, select the backup of the existing WP MU installation.
6. Click "Go" to start the import process. It should complete successfully.
7. Go to the configured main site domain name and log in as an admin. This will vary by project, but can be found by looking at the `domain` value of the (single) entry in the `wp_site` table.

Note that this technique works fine with--and has only been tested with--DBMP-produced database exports.


## Configuring New Projects

Make the following changes to customize this starter theme for new projects.

First, update the custom theme directory:
1. `CUSTOM_THEME_DIR` value in `.env`
2. Rename the directory `wp-content/themes/mbm-block-theme` to match the project name.

Make the following changes within the renamed custom theme directory:
1. Update `composer.json`:
    1. Change the name to `mbm/<project-name-slug>`
    2. Change the description to `<Project Name> theme`
    3. Change the namespace from `"madebymunsters\\BlockTheme\\": "lib"` to `"<projectName>\\BlockTheme\\": "src/php-lib"`
2. Update the namespace values (from the previous step) for any PHP classes in the  `src/php-lib` directory
3. Update the theme name, URI, description, and text domain in `src/style.scss`
4. Update the site logo in `images/site-logo.png`

Finally, tidy up Composer:
1. Jump into a wordpress container: `docker-compose run wordpress bash`
2. Nav to the custom directory: `cd wp-content/themes/<new-theme-name>`
3. Get the latest dependencies: `composer update` (note that you'll need a GH security token authorized to access any private MadeByMunsters repositories in order to complete this step)
4. Update the autoload configuration: `composer dump-autoload`

Done!
