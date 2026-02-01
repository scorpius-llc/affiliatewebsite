$versionFile = "public/version.json"

# Ensure directory exists
$publicDir = "public"
if (-not (Test-Path $publicDir)) {
    New-Item -ItemType Directory -Path $publicDir | Out-Null
}

# Get current date and time
$currentDate = (Get-Date).ToString("yyyy-MM-dd")
$currentTime = (Get-Date).ToString("HH:mm:ss")

# Create the JSON object
$data = @{
    "date" = $currentDate
    "time" = $currentTime
}

# Save to file
$data | ConvertTo-Json | Set-Content $versionFile

Write-Host "Updated build time to $currentDate $currentTime in $versionFile"