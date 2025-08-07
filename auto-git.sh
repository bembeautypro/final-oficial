#!/bin/bash
MSG="📦 Atualização automática em $(date "+%d/%m/%Y %H:%M:%S")"
git add .
git commit -m "$MSG"
git push origin main