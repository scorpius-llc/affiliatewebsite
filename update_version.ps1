$versionFile = "version.json"

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

Write-Host "Updated build time to $currentDate $currentTime"