#!/bin/sh
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RESET='\033[0m'

if [ $# -eq 0 ]; then
  printf "${RED}Hiba: commit üzenet szükséges${RESET}\n"
  echo "Használat: $0 \"commit üzenet\""
  exit 1
fi

COMMIT_MSG="$*"

committed=0
skipped=0
failed=0

commit_package() {
  dir="$1"
  name="$(basename "$dir")"

  if [ ! -d "$dir/.git" ]; then
    return
  fi

  printf "${CYAN}→ $name${RESET} ($dir)\n"

  if git -C "$dir" diff --quiet && \
     git -C "$dir" diff --cached --quiet && \
     [ -z "$(git -C "$dir" ls-files --others --exclude-standard)" ]; then
    printf "  ${YELLOW}Nincs változás, kihagyva${RESET}\n"
    skipped=$((skipped + 1))
    return
  fi

  git -C "$dir" add -A

  branch="$(git -C "$dir" rev-parse --abbrev-ref HEAD)"

  if git -C "$dir" commit -m "$COMMIT_MSG"; then
    printf "  ${GREEN}✓ Commitolva (branch: $branch)${RESET}\n"
    committed=$((committed + 1))
    if git -C "$dir" push; then
      printf "  ${GREEN}✓ Pusholva${RESET}\n"
    else
      printf "  ${RED}✗ Push sikertelen${RESET}\n"
      failed=$((failed + 1))
    fi
  else
    printf "  ${RED}✗ Commit sikertelen${RESET}\n"
    failed=$((failed + 1))
  fi
}

commit_package "$SCRIPT_DIR"

for base in "$SCRIPT_DIR/packages" "$SCRIPT_DIR/resources/js/packages"; do
  if [ ! -d "$base" ]; then
    printf "${YELLOW}Figyelmeztetés: könyvtár nem létezik: $base${RESET}\n"
    continue
  fi

  for pkg in "$base"/*/; do
    [ -d "$pkg" ] && commit_package "$pkg"
  done
done

printf "\nÖsszesítés: ${GREEN}$committed commitolva${RESET}, ${YELLOW}$skipped kihagyva${RESET}, ${RED}$failed sikertelen${RESET}\n"

[ $failed -gt 0 ] && exit 1 || exit 0
