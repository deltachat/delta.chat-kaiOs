#!/bin/bash

# if you want to run this make sure you are located at the project root

cd node_modules
cat /dev/null > ../src/definitions/icon_definitons.d.ts

cat <<EOF > ../src/definitions/icon_definitons.d.ts
// This file is generated and only exists for auto completion purposes
// Its generated with the bash script in tools/generate_ts_definiton_of_fa.sh
declare module "@fortawesome/fontawesome-free/svgs/*.svg" {
    const url: string;
    export default url;
}
EOF

for path in @fortawesome/fontawesome-free/svgs/*/*.svg; do
    name=${path##*/}
    base=${name%%.*}
    result=${base//-/_}
    # if [[ $result =~ ^[0-9] ]]; then
    #     result=$( echo $result | sed -E -r "s/^([0-9].*\$)/_\\1/" )
    # fi
    echo "declare module \"$path\"{const fa_$result: string;export default fa_$result;}" >> ../src/definitions/icon_definitons.d.ts
done
