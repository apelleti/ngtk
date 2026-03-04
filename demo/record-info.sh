#!/bin/bash
# Record ngpulse info demo
# Usage: ./demo/record-info.sh
# Requires: asciinema + agg

set -e

FIXTURES="$(dirname "$0")/../fixtures"
OUT_DIR="$(dirname "$0")"

echo "Recording ngpulse info..."
asciinema rec "$OUT_DIR/info.cast" \
  --cols 80 --rows 30 \
  --title "ngpulse info" \
  --command "bash -c 'sleep 0.5 && node $(dirname $0)/../packages/cli/dist/index.js info --root $FIXTURES && sleep 2'"

echo "Converting to GIF..."
/tmp/agg "$OUT_DIR/info.cast" "$OUT_DIR/info.gif" \
  --theme monokai \
  --font-size 14 \
  --speed 1.2

echo "Done → demo/info.gif"
