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

    # Deteksi: pakai 'docker compose' (V2 plugin) atau 'docker-compose' (V1 standalone)
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

# Output git disembunyikan — URL, remote, dan author tidak ditampilkan
GIT_REMOTE="https://github.com/udinesia325/siakad-kabasa"
if ! git pull --rebase "$GIT_REMOTE" master --quiet 2>/dev/null; then
    fail "git pull gagal. Periksa koneksi internet dan pastikan tidak ada konflik."
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

# Simpan seluruh output build ke log, tampilkan filter ringkas
set +e
$COMPOSE_CMD build --progress=plain > "$BUILD_LOG" 2>&1 &
BUILD_PID=$!

# Tampilkan progress ringkas selama build berjalan
tail -f "$BUILD_LOG" --pid=$BUILD_PID 2>/dev/null | \
    grep --line-buffered -E "^#[0-9]+ \[" | \
    sed -u \
        -e 's/^#[0-9]\+ \[production[^]]*\] \(.*\)/  → Production · \1/' \
        -e 's/^#[0-9]\+ \[internal\] /  → /' \
        -e 's/^#[0-9]\+ \[\([0-9]\+\/[0-9]\+\)\] \(.*\)/  → [\1] \2/' \
    | while IFS= read -r line; do
        echo -e "  ${DIM}${line}${RESET}"
    done

wait $BUILD_PID
BUILD_EXIT=$?
set -e

if [ $BUILD_EXIT -ne 0 ]; then
    echo ""
    echo -e "  ${RED}✖  Build gagal. Output lengkap:${RESET}"
    echo -e "  ${DIM}─────────────────────────────────────────${RESET}"
    # Tampilkan 60 baris terakhir dari log build (biasanya berisi error)
    tail -n 60 "$BUILD_LOG" | while IFS= read -r line; do
        echo -e "  ${line}"
    done
    echo -e "  ${DIM}─────────────────────────────────────────${RESET}"
    echo -e "  ${DIM}Log lengkap tersimpan sementara di: $BUILD_LOG${RESET}"
    exit 1
fi

rm -f "$BUILD_LOG"
echo ""
ok "Docker image berhasil di-build"

# ── Step 3: Stop container lama ───────────────────────────────
step 3 $TOTAL_STEPS "Menghentikan container yang berjalan"

if $COMPOSE_CMD ps --quiet 2>/dev/null | grep -q .; then
    info "Menghentikan container sebelumnya..."
    $COMPOSE_CMD down --timeout 15 2>/dev/null || true
    ok "Container lama dihentikan"
else
    info "Tidak ada container aktif sebelumnya"
    ok "Lanjut ke langkah berikutnya"
fi

# ── Step 4: Start ─────────────────────────────────────────────
step 4 $TOTAL_STEPS "Menjalankan aplikasi"

info "Memulai semua service..."
$COMPOSE_CMD up -d 2>/dev/null

echo ""
info "Menunggu database siap..."

WAIT_SECS=0
MAX_WAIT=60
until $COMPOSE_CMD exec -T app php artisan db:show --json &>/dev/null; do
    WAIT_SECS=$((WAIT_SECS + 2))
    if [ $WAIT_SECS -ge $MAX_WAIT ]; then
        warn "Database tidak merespons dalam ${MAX_WAIT}s — cek log dengan: $COMPOSE_CMD logs db"
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
echo -e "  ${DIM}  ${COMPOSE_CMD} logs -f app   → lihat log aplikasi${RESET}"
echo -e "  ${DIM}  ${COMPOSE_CMD} exec app sh   → masuk ke shell container${RESET}"
echo -e "  ${DIM}  ${COMPOSE_CMD} down          → stop semua service${RESET}"
echo ""
