#!/bin/bash
# VPS Initial Setup Script for DriveHub
# Run as root on Ubuntu 22.04
# Usage: bash setup-vps.sh

set -e

echo "=== DriveHub VPS Setup ==="

# 1. Update system
apt-get update -y && apt-get upgrade -y

# 2. Install Docker
if ! command -v docker &>/dev/null; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable docker
  systemctl start docker
fi

# 3. Install Docker Compose plugin (v2)
if ! docker compose version &>/dev/null; then
  echo "Installing Docker Compose plugin..."
  apt-get install -y docker-compose-plugin
fi

# 4. Create app directory
mkdir -p /opt/drivehub
cd /opt/drivehub

# 5. Open firewall ports
if command -v ufw &>/dev/null; then
  ufw allow 22/tcp
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw allow 8080/tcp
  ufw --force enable
  echo "UFW rules applied."
fi

echo ""
echo "=== Setup Complete ==="
echo "App directory: /opt/drivehub"
echo ""
echo "Next steps:"
echo "  1. Push to GitHub to trigger the CI/CD pipeline"
echo "  2. Ensure these GitHub Secrets are set (Settings > Secrets > Actions):"
echo ""
echo "  --- VPS ---"
echo "  VPS_HOST          = 167.172.78.124"
echo "  VPS_USER          = root"
echo "  VPS_PASSWORD      = <your VPS password>"
echo ""
echo "  --- Backend ---"
echo "  JWT_SECRET        = <strong random string>"
echo "  MEZON_CLIENT_ID   = 2031930783584751616"
echo "  MEZON_CLIENT_SECRET = <from Mezon dashboard>"
echo "  MEZON_AUTHORIZE_URL = https://oauth2.mezon.ai/oauth2/auth"
echo "  MEZON_TOKEN_URL   = https://oauth2.mezon.ai/oauth2/token"
echo "  MEZON_USERINFO_URL = https://oauth2.mezon.ai/userinfo"
echo ""
echo "  --- Frontend ---"
echo "  REACT_APP_MEZON_BACKEND_URL  = https://167.172.78.124:8080"
echo "  REACT_APP_MEZON_REDIRECT_URI = http://167.172.78.124/mezon-callback"
echo "  REACT_APP_MEZON_AUTHORIZE_URL = https://oauth2.mezon.ai/oauth2/auth"
echo "  CORS_ORIGINS = http://167.172.78.124,https://167.172.78.124"
echo ""
echo "  --- Database ---"
echo "  DB_NAME            = drivehub"
echo "  DB_USER            = drivehub_user"
echo "  DB_PASS            = <strong password>"
echo "  MYSQL_ROOT_PASSWORD = <strong root password>"
