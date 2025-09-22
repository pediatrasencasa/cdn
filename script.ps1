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

class Stats {
    [int]$clients
    [int]$beneficiaries
    [int]$consults
    [int]$diagnostics
    Stats (
        [int]$clients,
        [int]$beneficiaries,
        [int]$consults,
        [int]$diagnostics
    ) {
        $this.clients = $clients
        $this.beneficiaries = $beneficiaries
        $this.consults = $consults
        $this.diagnostics = $diagnostics
    }
}

function Get-Data {
    param(
        [Parameter(Mandatory=$true)][string]$ConnectionString
    )
    process
    {
        $scon = New-Object System.Data.SqlClient.SqlConnection;
        $cmd = New-Object System.Data.SqlClient.SqlCommand;
        $da = New-Object System.Data.SqlClient.SqlDataAdapter;
        $ds = New-Object System.Data.DataSet;

        $storedProcedure = "[dbo].[sp_website_statistics]";

        try
        {
            $scon.ConnectionString = $ConnectionString;
            $cmd.Connection = $scon;
            $cmd.CommandTimeout = 30;
            $cmd.CommandType = [System.Data.CommandType]::StoredProcedure;
            $cmd.CommandText = $storedProcedure;

            $da.SelectCommand = $cmd

            # Open connect 
            $scon.Open();

            # Fill the DataSet with the result
            $da.Fill($ds) | Out-Null
                       
            $row = $ds.Tables[0].Rows[0];

            $result = [Stats]::new(
                $row["clients"],
                $row["beneficiaries"],
                $row["consults"],
                $row["diagnostics"]
            );
            
            # Convert to json
            return $result | ConvertTo-Json -Compress;
        }
        catch [Exception]
        {
           Write-Output ("Error occured while calling $storedProcedure") $_.Exception.Message;
        }
        finally
        {
            $cmd.Dispose();

            if ($scon.State -eq [System.Data.ConnectionState]::Open){
                $scon.Close();
                $scon.Dispose();
            }
        }
    }
}


$ConnectionString = "Server='$Instance';Database='$DbName';User Id='$UID';Password='$Password';Encrypt=True;TrustServerCertificate=True;Connection Timeout=30;"

$dataResult = (Get-Data -ConnectionString $ConnectionString);

Write-Output ("["+ $dataResult +"]")

# Special GitHub Actions command to set output
"["+ $dataResult +"]" | Out-File -FilePath $env:GITHUB_OUTPUT
