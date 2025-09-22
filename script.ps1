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

Function Get-Data {
    Param(
        [Parameter(Mandatory=$true)][string]$ConnectionString
    )
    Process
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

            # Convert to json
            $jsonResult = $ds.Tables[0] | ConvertTo-Json -Compress

            return $jsonResult;
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

Write-Output ($dataResult)
