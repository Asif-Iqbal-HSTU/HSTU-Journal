<?php
require 'vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$paper = \App\Models\Paper::whereNotNull('doi')->first();
$doiService = new \App\Services\DoiService();
$username = config('services.crossref.username');
$password = config('services.crossref.password');
$xmlContent = $doiService->generateXml($paper);

$tempFile = sys_get_temp_dir() . '/crossref_test.xml';
file_put_contents($tempFile, $xmlContent);

$url = 'https://doi.crossref.org/servlet/deposit?' . http_build_query([
    'operation' => 'doMDUpload',
    'login_id' => $username,
    'login_passwd' => $password,
]);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, [
    'fname' => new CURLFile($tempFile, 'application/xml', 'test.xml'),
]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

unlink($tempFile);

file_put_contents('crossref_response.html', "STATUS: " . $httpcode . "\n\n" . $response);
