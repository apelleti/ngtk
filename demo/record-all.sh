#!/bin/bash
# Record all ngpulse demo GIFs
# Usage: ./demo/record-all.sh

set -e

FIXTURES="$(dirname "$0")/../fixtures"
CLI="node $(dirname $0)/../packages/cli/dist/index.js"
OUT="$(dirname "$0")"
AGG="/tmp/agg"

record() {
  local name=$1
  local cmd=$2
  echo "▶ Recording $name..."
  asciinema rec "$OUT/$name.cast" \
    --cols 90 --rows 35 \
    --title "ngpulse $name" \
    --command "bash -c 'sleep 0.3 && $cmd && sleep 2'"
  $AGG "$OUT/$name.cast" "$OUT/$name.gif" --theme monokai --font-size 13 --speed 1.5
  echo "  ✓ $OUT/$name.gif"
}

# Demo 1: info — the flagship command
record "demo-info" "$CLI info --root $FIXTURES"

# Demo 2: info --more — detailed breakdown
record "demo-info-more" "$CLI info --root $FIXTURES --more"

# Demo 3: debt-log — tech debt overview
record "demo-debt" "$CLI debt-log --root $FIXTURES"

# Demo 4: route-tree — visual route structure
record "demo-routes" "$CLI route-tree --root $FIXTURES"

# Demo 5: hardcoded-secrets — security scan
record "demo-secrets" "$CLI hardcoded-secrets --root $FIXTURES"

# Demo 6: migration-hints — modernization guide
record "demo-migration" "$CLI migration-hints --root $FIXTURES"

echo ""
echo "All GIFs generated in demo/"
ls -lh "$OUT"/*.gif
