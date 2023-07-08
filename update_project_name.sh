#!/bin/bash

# Enable error detail
# set -eo pipefail
# set -x

folder_path="${PWD}"
old_string="dfx_react_template"
new_string="${1:-demo}"
script_filename="$(basename "$0")"
# Set LANG environment variable to a specific encoding
export LANG="en_US.UTF-8"
# Replace string in file contents without creating backup files

# Find and replace files recursively
echo "Renaming files from $old_string to $new_string"
find "$folder_path" -depth -name "*$old_string*" -execdir bash -c 'new_name="${1//$2/$3}"; mv "$1" "$new_name"' _ {} "$old_string" "$new_string" \;
# Find and replace files recursively

find "$folder_path" -type f ! -name "$script_filename" -exec grep -l "$old_string" {} + | while IFS= read -r file; do
    sed -i "" "s/$old_string/$new_string/g" "$file"
    echo "Replaced content in: $file"
done

echo "Regenerating .dfx folder"
dfx start --clean --background
dfx stop
