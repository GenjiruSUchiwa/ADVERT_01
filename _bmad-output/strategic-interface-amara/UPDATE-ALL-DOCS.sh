#!/bin/bash
# Script de migration automatique des documents

echo "🚀 Migration des documents AMARA..."

# Backup des anciens documents
mkdir -p documents/backup-original
cp documents/document-*.html documents/backup-original/ 2>/dev/null || true
echo "✅ Backup créé dans documents/backup-original/"

# Remplacer les anciens par les nouveaux
for doc in documents/document-*-new.html; do
  if [ -f "$doc" ]; then
    base=$(basename "$doc" -new.html)
    cp "$doc" "documents/${base}.html"
    echo "✅ Mis à jour: ${base}.html"
  fi
done

echo "✨ Migration terminée!"
echo "📁 Anciens documents sauvegardés dans: documents/backup-original/"
