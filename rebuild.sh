#!/usr/bin/env bash
set -euo pipefail

# ─────────────────────────────────────────────────────────────
#  SIAKAD Kabasa — Force Rebuild Script
#  Gunakan saat: salah env, image korup, dependency berubah,
#  atau ingin reset bersih tanpa git pull.
# ─────────────────────────────────────────────────────────────

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
BG_YELLOW='\033[43m'

START_TIME=$(date +%s)

# ── Helpers ──────────────────────────────────────────────────

ok()   { echo -e "  ${GREEN}✔${RESET}  $1"; }
info() { echo -e "  ${BLUE}→${RESET}  ${DIM}$1${RESET}"; }
warn() { echo -e "  ${YELLOW}⚠${RESET}  $1"; }
fail() { echo ""; echo -e "  ${RED}✖  ERROR: $1${RESET}"; echo ""; exit 1; }

step() {
    local num=$1 total=$2 label=$3
    echo ""
    echo -e "${BOLD}${CYAN}┌─[ Step ${num}/${total} ]──────────────────────────────────────${RESET}"
    echo -e "${BOLD}${CYAN}│  ${WHITE}${label}${RESET}"
    echo -e "${BOLD}${CYAN}└───────────────────────────────────────────────────${RESET}"
}

elapsed() { local end; end=$(date +%s); echo $(( end - START_TIME )); }

format_duration() {
    local s=$1
    [ "$s" -lt 60 ] && echo "${s}s" || echo "$(( s / 60 ))m $(( s % 60 ))s"
}

get_port() {
    local port
    port=$(grep -E '^APP_PORT=' .env 2>/dev/null | cut -d= -f2 | tr -d '"' | tr -d "'")
    echo "${port:-80}"
}

# ── Banner ────────────────────────────────────────────────────

echo ""
echo -e "${BOLD}${BG_YELLOW}\033[30m                                                    ${RESET}"
echo -e "${BOLD}${BG_YELLOW}\033[30m   SIAKAD Kabasa  ·  Force Rebuild                  ${RESET}"
echo -e "${BOLD}${BG_YELLOW}\033[30m                                                    ${RESET}"
echo ""
echo -e "  ${DIM}$(date '+%A, %d %B %Y — %H:%M:%S')${RESET}"
echo -e "  ${DIM}Direktori: $(pwd)${RESET}"
echo ""
warn "Mode rebuild paksa — semua image dan cache Docker akan dihapus."
warn "Data database (volume MySQL) ${BOLD}tidak${RESET}${YELLOW} akan dihapus.${RESET}"

# ── Preflight ─────────────────────────────────────────────────

for cmd in docker; do
    command -v "$cmd" &>/dev/null || fail "'$cmd' tidak ditemukan."
done

docker info &>/dev/null || fail "Docker daemon tidak berjalan."

# Deteksi: pakai '$COMPOSE_CMD' (V2) atau fallback 'docker-compose' (V1)
if docker compose version &>/dev/null; then
    COMPOSE_CMD="docker compose"
elif command -v docker-compose &>/dev/null; then
    COMPOSE_CMD="docker-compose"
else
    fail "Docker Compose tidak ditemukan. Install dengan: sudo apt install docker-compose-plugin"
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

APP_PORT=$(get_port)

# ── Konfirmasi interaktif ─────────────────────────────────────

echo ""
echo -e "  ${BOLD}${WHITE}Lanjutkan rebuild? Ini akan menghapus image lama.${RESET}"
echo -ne "  ${DIM}Ketik 'y' untuk lanjut, lainnya untuk batal: ${RESET}"
read -r CONFIRM

if [[ "$CONFIRM" != "y" && "$CONFIRM" != "Y" ]]; then
    echo ""
    info "Rebuild dibatalkan."
    echo ""
    exit 0
fi

TOTAL_STEPS=4

# ── Step 1: Stop dan hapus container + image lama ─────────────
step 1 $TOTAL_STEPS "Menghapus container dan image lama"

info "Menghentikan container yang sedang berjalan..."
$COMPOSE_CMD down --timeout 15 2>/dev/null || true
ok "Container dihentikan"

info "Menghapus image lama agar build benar-benar bersih..."
# Hapus image yang terkait project ini saja (bukan seluruh system)
IMAGE_NAME=$($COMPOSE_CMD config --images 2>/dev/null | grep -v "^$" | head -5 || true)
if [ -n "$IMAGE_NAME" ]; then
    echo "$IMAGE_NAME" | while read -r img; do
        docker rmi "$img" --force 2>/dev/null && info "Dihapus: $img" || true
    done
fi

# Hapus build cache Docker untuk project ini
docker builder prune -f --filter "until=1h" &>/dev/null || true
ok "Image dan cache lama dihapus"

# ── Step 2: Tampilkan env aktif (tanpa nilai sensitif) ────────
step 2 $TOTAL_STEPS "Verifikasi konfigurasi .env"

info "Konfigurasi yang akan digunakan:"
echo ""

show_env() {
    local key=$1
    local val
    val=$(grep -E "^${key}=" .env 2>/dev/null | cut -d= -f2- | tr -d '"' | tr -d "'")
    if [ -z "$val" ]; then
        echo -e "  ${YELLOW}  %-25s${RESET} ${DIM}(kosong)${RESET}" "$key"
    else
        echo -e "  ${DIM}  %-25s${RESET} ${WHITE}%s${RESET}" "$key" "$val"
    fi
}

show_env_masked() {
    local key=$1
    local val
    val=$(grep -E "^${key}=" .env 2>/dev/null | cut -d= -f2- | tr -d '"' | tr -d "'")
    if [ -z "$val" ]; then
        echo -e "  ${YELLOW}  %-25s${RESET} ${DIM}(kosong — wajib diisi!)${RESET}" "$key"
    else
        local masked="${val:0:2}$(printf '*%.0s' $(seq 1 $((${#val} - 2))))"
        echo -e "  ${DIM}  %-25s${RESET} ${WHITE}%s${RESET}" "$key" "$masked"
    fi
}

# shellcheck disable=SC2059
printf "  ${DIM}  %-25s  %s${RESET}\n" "KEY" "VALUE"
printf "  ${DIM}  %-25s  %s${RESET}\n" "─────────────────────────" "──────────────────────"
show_env     "APP_NAME"
show_env     "APP_ENV"
show_env     "APP_URL"
show_env     "APP_PORT"
show_env     "DB_CONNECTION"
show_env     "DB_HOST"
show_env     "DB_DATABASE"
show_env     "DB_USERNAME"
show_env_masked "DB_PASSWORD"
show_env_masked "DB_ROOT_PASSWORD"
show_env     "QUEUE_CONNECTION"
show_env     "CACHE_STORE"
show_env     "SESSION_DRIVER"
echo ""

APP_KEY_VAL=$(grep -E "^APP_KEY=" .env 2>/dev/null | cut -d= -f2- | tr -d '"' | tr -d "'")
if [ -z "$APP_KEY_VAL" ]; then
    warn "APP_KEY kosong — akan di-generate otomatis saat container boot."
else
    ok "APP_KEY sudah terset"
fi

DB_PASS_VAL=$(grep -E "^DB_PASSWORD=" .env 2>/dev/null | cut -d= -f2- | tr -d '"' | tr -d "'")
if [ -z "$DB_PASS_VAL" ]; then
    warn "DB_PASSWORD kosong — pastikan ini benar jika MySQL memerlukan password."
fi

ok "Konfigurasi ditampilkan"

# ── Step 3: Build ulang dari nol ──────────────────────────────
step 3 $TOTAL_STEPS "Build Docker image dari awal (no cache)"

info "Build dimulai — proses ini lebih lama dari build biasa..."
echo ""

$COMPOSE_CMD build --no-cache --progress=plain 2>&1 | \
    grep -E "^(#[0-9]|Step|Successfully)" | \
    sed \
        -e 's/^#[0-9]* \[frontend/  [1\/3] Frontend ·/' \
        -e 's/^#[0-9]* \[composer/  [2\/3] Composer ·/' \
        -e 's/^#[0-9]* \[production/  [3\/3] Production ·/' \
        -e 's/^#[0-9]* /  → /' \
    | while IFS= read -r line; do
        echo -e "  ${DIM}${line}${RESET}"
    done || fail "$COMPOSE_CMD build gagal."

echo ""
ok "Image baru berhasil di-build"

# ── Step 4: Jalankan ──────────────────────────────────────────
step 4 $TOTAL_STEPS "Menjalankan aplikasi"

info "Memulai semua service dengan konfigurasi baru..."
$COMPOSE_CMD up -d --quiet-pull 2>/dev/null

echo ""
info "Menunggu database siap..."

WAIT_SECS=0
MAX_WAIT=90
until $COMPOSE_CMD exec -T app php artisan db:show --json &>/dev/null; do
    WAIT_SECS=$((WAIT_SECS + 2))
    if [ $WAIT_SECS -ge $MAX_WAIT ]; then
        warn "Database tidak merespons dalam ${MAX_WAIT}s — cek log: $COMPOSE_CMD logs db"
        break
    fi
    printf "\r  ${CYAN}⠿${RESET}  ${DIM}Menunggu database... (${WAIT_SECS}s)${RESET}"
    sleep 2
done
printf "\r"

ok "Service berjalan"

# ── Summary ───────────────────────────────────────────────────

COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "n/a")
COMMIT_MSG=$(git log -1 --pretty=format:"%s" 2>/dev/null || echo "n/a")
DURATION=$(format_duration "$(elapsed)")

echo ""
echo -e "${BOLD}${BG_GREEN}                                                    ${RESET}"
echo -e "${BOLD}${BG_GREEN}   ✔  Rebuild selesai                                ${RESET}"
echo -e "${BOLD}${BG_GREEN}                                                    ${RESET}"
echo ""
echo -e "  ${BOLD}${WHITE}Aplikasi berjalan di:${RESET}  ${BOLD}${GREEN}http://localhost:${APP_PORT}${RESET}"
echo -e "  ${BOLD}${WHITE}Commit aktif      :${RESET}  ${DIM}${COMMIT_HASH} — ${COMMIT_MSG}${RESET}"
echo -e "  ${BOLD}${WHITE}Waktu build       :${RESET}  ${DIM}${DURATION}${RESET}"
echo ""
echo -e "  ${DIM}Perintah berguna:${RESET}"
echo -e "  ${DIM}  $COMPOSE_CMD logs -f app   → lihat log aplikasi${RESET}"
echo -e "  ${DIM}  $COMPOSE_CMD exec app sh   → masuk ke shell container${RESET}"
echo -e "  ${DIM}  $COMPOSE_CMD down          → stop semua service${RESET}"
echo ""
