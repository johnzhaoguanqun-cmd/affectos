$ErrorActionPreference = "Stop"

$outDir = Join-Path $PSScriptRoot "..\assets\real-media"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$files = @(
  @{ url = "https://picsum.photos/id/180/1200/700.jpg"; name = "productivity.jpg" },
  @{ url = "https://picsum.photos/id/433/1200/700.jpg"; name = "wellness.jpg" },
  @{ url = "https://picsum.photos/id/669/1200/700.jpg"; name = "anxiety.jpg" },
  @{ url = "https://picsum.photos/id/1011/1200/700.jpg"; name = "comparison.jpg" },
  @{ url = "https://picsum.photos/id/1003/1200/700.jpg"; name = "ad.jpg" },
  @{ url = "https://picsum.photos/id/48/1200/700.jpg"; name = "performance-loop.jpg" },
  @{ url = "https://picsum.photos/id/429/1200/700.jpg"; name = "calm-buffer.jpg" },
  @{ url = "https://picsum.photos/id/870/1200/700.jpg"; name = "urgent-feed.jpg" },
  @{ url = "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif"; name = "work-rhythm.gif" },
  @{ url = "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif"; name = "body-performance.gif" }
)

Write-Host "Downloading media to $outDir ..."

foreach ($f in $files) {
  $target = Join-Path $outDir $f.name
  Write-Host " - $($f.name)"
  Invoke-WebRequest -Uri $f.url -OutFile $target -UseBasicParsing
}

Write-Host ""
Write-Host "Done. Downloaded files:"
Get-ChildItem $outDir | Select-Object Name, Length
