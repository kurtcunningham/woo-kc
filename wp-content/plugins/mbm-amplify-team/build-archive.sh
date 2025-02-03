#!/bin/bash


# Variables, can configure per project.
version_file="plugin.php"
archive_name=$TEAM_PLUGIN_DIR
source_dir_name=$archive_name

excludes=(
  "${source_dir_name}/node_modules\*"
  "${source_dir_name}/src\*.js"
  "${source_dir_name}\*.mjs"
  "${source_dir_name}\*.scss"
)

includes=(
  "${source_dir_name}/"
)


# Everything below here should be pretty much the same between projects...

archive_version=$(perl -lne 'print $1 if /Version:\s+(.+)$/' < $version_file)
archive_file="${archive_name}-${archive_version}.zip"

echo "Building version ${archive_version} as ${archive_file}..."

initial_dir=$(pwd)
cd ../

includes_clauses=""
for c in ${includes[@]}; do
  includes_clauses+=" ${c}"
done

excludes_clauses=""
for c in ${excludes[@]}; do
  excludes_clauses+=" -x ${c}"
done

zip_command="zip -r ${source_dir_name}/${archive_file} ${includes_clauses} ${excludes_clauses}"
echo "Running zip command: ${zip_command}"
eval "${zip_command}"

cd $initial_dir

echo
echo "Version ${archive_version} built into archive ${archive_file}"
echo
