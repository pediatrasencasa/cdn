param (
    [Parameter(Mandatory = $true)]
    [string]$Instance,
    [Parameter(Mandatory = $true)]
    [string]$DbName,
    [Parameter(Mandatory = $true)]
    [string]$UID,
    [Parameter(Mandatory = $true)]
    [string]$Password
)

# Set location if necessary
# Set-Location "Path to the directory which contains your SQL Script ..."

$logs = @()
$ConnectionString = "Server='$Instance';Database='$DbName';User Id='$UID';Password='$Password';Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;"
$SqlFiles = Get-ChildItem -Path . -File -Filter *.sql

for ($i = 0; $i -lt $SqlFiles.Count; $i++) {
    $SqlFile = $SqlFiles[$i]
    try {
        Invoke-Sqlcmd -ConnectionString $ConnectionString -InputFile $SqlFile -ErrorAction 'Stop'
        $LogMessage = ($SqlFile.Name + " Executed Successfully.")
    }
    catch {
        $LogMessage = "Error executing $($SqlFile.Name): $_"
    }
    $row = [PSCustomObject]@{
        "File" = $SqlFile.Name
        "Date" = (Get-Date -UFormat "%d-%m-%Y")
        "Log"  = $LogMessage
    }
    $logs += $row  
}

Write-Output ($logs | Format-Table -AutoSize -Wrap | Out-String)
