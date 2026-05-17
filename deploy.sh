#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
#  SIAKAD Kabasa — Deploy & Build Script
# ─────────────────────────────────────────────────────────────

# Colors & styles
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
WHITE='\033[1;37m'
BG_BLUE='\033[44m'
BG_GREEN='\033[42m'

START_TIME=$(date +%s)

# ── Helpers ──────────────────────────────────────────────────

print_banner() {
    echo ""
    echo -e "${BOLD}${BG_BLUE}                                                    ${RESET}"
    echo -e "${BOLD}${BG_BLUE}   SIAKAD Kabasa  ·  Deploy & Build                 ${RESET}"
    echo -e "${BOLD}${BG_BLUE}                                                    ${RESET}"
    echo ""
}

step() {
    local num=$1
    local total=$2
    local label=$3
    echo ""
    echo -e "${BOLD}${CYAN}┌─[ Step ${num}/${total} ]──────────────────────────────────────${RESET}"
    echo -e "${BOLD}${CYAN}│  ${WHITE}${label}${RESET}"
    echo -e "${BOLD}${CYAN}└───────────────────────────────────────────────────${RESET}"
}

ok() {
    echo -e "  ${GREEN}✔${RESET}  $1"
}

info() {
    echo -e "  ${BLUE}→${RESET}  ${DIM}$1${RESET}"
}

warn() {
    echo -e "  ${YELLOW}⚠${RESET}  $1"
}

fail() {
    echo ""
    echo -e "  ${RED}✖  ERROR: $1${RESET}"
    echo ""
    exit 1
}

spinner() {
    local pid=$1
    local label=$2
    local frames=('⠋' '⠙' '⠹' '⠸' '⠼' '⠴' '⠦' '⠧' '⠇' '⠏')
    local i=0
    while kill -0 "$pid" 2>/dev/null; do
        printf "\r  ${CYAN}%s${RESET}  ${DIM}%s${RESET}" "${frames[$((i % 10))]}" "$label"
        i=$((i + 1))
        sleep 0.08
    done
    printf "\r"
}

elapsed() {
    local end
    end=$(date +%s)
    echo $(( end - START_TIME ))
}

format_duration() {
    local secs=$1
    if [ "$secs" -lt 60 ]; then
        echo "${secs}s"
    else
        echo "$(( secs / 60 ))m $(( secs % 60 ))s"
    fi
}

# ── Preflight checks ─────────────────────────────────────────

preflight() {
    for cmd in git docker; do
        if ! command -v "$cmd" &>/dev/null; then
            fail "'$cmd' tidak ditemukan. Pastikan sudah terinstall."
        fi
    done

    if ! docker info &>/dev/null; then
        fail "Docker daemon tidak berjalan. Jalankan Docker terlebih dahulu."
    fi

    if [ ! -f ".env" ]; then
        if [ -f ".env.docker" ]; then
            warn ".env tidak ditemukan — menyalin dari .env.docker"
            cp .env.docker .env
            ok ".env dibuat dari .env.docker"
        else
            fail ".env tidak ditemukan. Salin dari .env.docker dan isi password yang diperlukan."
        fi
    fi
}

# ── Read port from .env ───────────────────────────────────────

get_port() {
    local port
    port=$(grep -E '^APP_PORT=' .env 2>/dev/null | cut -d= -f2 | tr -d '"' | tr -d "'")
    echo "${port:-80}"
}

# ─────────────────────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────────────────────

TOTAL_STEPS=4

print_banner

echo -e "  ${DIM}$(date '+%A, %d %B %Y — %H:%M:%S')${RESET}"
echo -e "  ${DIM}Direktori: $(pwd)${RESET}"

# ── Preflight ─────────────────────────────────────────────────
echo ""
info "Memeriksa dependensi sistem..."
preflight
ok "Semua dependensi tersedia"

APP_PORT=$(get_port)

# ── Step 1: Git Pull ─────────────────────────────────────────
step 1 $TOTAL_STEPS "Mengambil pembaruan kode"

info "Pulling code from GitHub ................................"

# Jalankan git pull -r tanpa output remote URL
if ! git pull --rebase origin master --quiet 2>&1 | grep -v "^$" | sed \
    -e 's|https://.*github\.com[^ ]*|[repository]|g' \
    -e 's|git@github\.com[^[:space:]]*|[repository]|g' \
    | while IFS= read -r line; do info "$line"; done; then
    fail "git pull gagal. Periksa koneksi dan pastikan tidak ada konflik."
fi

COMMIT_HASH=$(git rev-parse --short HEAD)
COMMIT_MSG=$(git log -1 --pretty=format:"%s")

ok "Kode berhasil diperbarui"
echo -e "  ${DIM}  Commit : ${COMMIT_HASH}${RESET}"
echo -e "  ${DIM}  Pesan  : ${COMMIT_MSG}${RESET}"

# ── Step 2: Docker Build ──────────────────────────────────────
step 2 $TOTAL_STEPS "Build Docker image"

info "Build dimulai — proses ini memakan beberapa menit pada build pertama..."
echo ""

BUILD_LOG=$(mktemp)

# Stream build dengan progress yang diformat, sembunyikan noise internal
docker compose build --progress=plain 2>&1 | \
    grep -E "^(#[0-9]|Step|Successfully)" | \
    sed \
        -e 's/^#[0-9]* \[frontend/  [1\/3] Frontend ·/' \
        -e 's/^#[0-9]* \[composer/  [2\/3] Composer ·/' \
        -e 's/^#[0-9]* \[production/  [3\/3] Production ·/' \
        -e 's/^#[0-9]* /  → /' \
    | while IFS= read -r line; do
        echo -e "  ${DIM}${line}${RESET}"
    done || {
        rm -f "$BUILD_LOG"
        fail "docker compose build gagal."
    }

rm -f "$BUILD_LOG"
echo ""
ok "Docker image berhasil di-build"

# ── Step 3: Stop container lama ───────────────────────────────
step 3 $TOTAL_STEPS "Menghentikan container yang berjalan"

if docker compose ps --quiet 2>/dev/null | grep -q .; then
    info "Menghentikan container sebelumnya..."
    docker compose down --timeout 15 --quiet 2>/dev/null || true
    ok "Container lama dihentikan"
else
    info "Tidak ada container aktif sebelumnya"
    ok "Lanjut ke langkah berikutnya"
fi

# ── Step 4: Start ─────────────────────────────────────────────
step 4 $TOTAL_STEPS "Menjalankan aplikasi"

info "Memulai semua service..."
docker compose up -d --quiet-pull 2>/dev/null

echo ""
info "Menunggu database siap..."

WAIT_SECS=0
MAX_WAIT=60
until docker compose exec -T app php artisan db:show --json &>/dev/null; do
    WAIT_SECS=$((WAIT_SECS + 2))
    if [ $WAIT_SECS -ge $MAX_WAIT ]; then
        warn "Database tidak merespons dalam ${MAX_WAIT}s — cek log dengan: docker compose logs db"
        break
    fi
    printf "\r  ${CYAN}⠿${RESET}  ${DIM}Menunggu database... (${WAIT_SECS}s)${RESET}"
    sleep 2
done
printf "\r"

ok "Service berjalan"

# ── Summary ───────────────────────────────────────────────────

DURATION=$(format_duration "$(elapsed)")

echo ""
echo -e "${BOLD}${BG_GREEN}                                                    ${RESET}"
echo -e "${BOLD}${BG_GREEN}   ✔  Deploy selesai                                 ${RESET}"
echo -e "${BOLD}${BG_GREEN}                                                    ${RESET}"
echo ""
echo -e "  ${BOLD}${WHITE}Aplikasi berjalan di:${RESET}  ${BOLD}${GREEN}http://localhost:${APP_PORT}${RESET}"
echo -e "  ${BOLD}${WHITE}Commit aktif      :${RESET}  ${DIM}${COMMIT_HASH} — ${COMMIT_MSG}${RESET}"
echo -e "  ${BOLD}${WHITE}Waktu build       :${RESET}  ${DIM}${DURATION}${RESET}"
echo ""
echo -e "  ${DIM}Perintah berguna:${RESET}"
echo -e "  ${DIM}  docker compose logs -f app   → lihat log aplikasi${RESET}"
echo -e "  ${DIM}  docker compose exec app sh   → masuk ke shell container${RESET}"
echo -e "  ${DIM}  docker compose down          → stop semua service${RESET}"
echo ""
