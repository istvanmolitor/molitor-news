#!/bin/sh
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RESET='\033[0m'

for base in "$SCRIPT_DIR/packages" "$SCRIPT_DIR/resources/js/packages"; do
  [ -d "$base" ] || continue

  for pkg in "$base"/*/; do
    [ -d "$pkg/.git" ] || continue

    name="$(basename "$pkg")"

    if git -C "$pkg" diff --quiet && \
       git -C "$pkg" diff --cached --quiet && \
       [ -z "$(git -C "$pkg" ls-files --others --exclude-standard)" ]; then
      continue
    fi

    printf "${CYAN}=== $name ===${RESET}\n"
    git -C "$pkg" diff
    git -C "$pkg" diff --cached
    git -C "$pkg" ls-files --others --exclude-standard | while read -r f; do
      printf "${YELLOW}Untracked: $f${RESET}\n"
    done
  done
done
