# ingest-kcd-potions.ps1
$workspace = "KCD-Potions"
$rootPath = "K:\404notfound-art\Kingdomcomedeliverance-potions"
$HASH_CACHE_FILE = "$rootPath\.ingest-hash-cache.json"

function Get-FileHashMap {
    $hashes = @{}
    Get-ChildItem -Path $rootPath -Recurse -File |
    Where-Object { $_.FullName -notmatch '\\node_modules\\' } |
    ForEach-Object {
        $hash = Get-FileHash -Path $_.FullName -Algorithm SHA256
        $relative = $_.FullName.Substring($rootPath.Length + 1)
        $hashes[$relative] = $hash.Hash
    }
    return $hashes
}

function Load-PreviousHashCache {
    if (Test-Path $HASH_CACHE_FILE) {
        return Get-Content $HASH_CACHE_FILE | ConvertFrom-Json
    }
    return @{}
}

function Save-HashCache($hashes) {
    $hashes | ConvertTo-Json | Set-Content $HASH_CACHE_FILE
}

function Upload-ChangedFiles($newHashes, $oldHashes) {
    foreach ($file in $newHashes.Keys) {
        if (-not $oldHashes.ContainsKey($file) -or $newHashes[$file] -ne $oldHashes[$file]) {
            $fullPath = Join-Path $rootPath $file
            Write-Host "Uploading: $file"
            Invoke-RestMethod -Uri "http://localhost:3001/api/workspaces/$workspace/documents/upload" `
                -Method Post -InFile $fullPath `
                -Headers @{ "Content-Type" = "application/octet-stream" } `
                -Body @{ filename = $file } `
                -ErrorAction SilentlyContinue
        }
    }
}

$newHashes = Get-FileHashMap
$oldHashes = Load-PreviousHashCache
Upload-ChangedFiles $newHashes $oldHashes
Save-HashCache $newHashes

Write-Host "`n[✓] Ingestion for '$workspace' complete.`n"
